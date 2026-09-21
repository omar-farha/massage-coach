import type { Availability, BlockedDate, TimeSlot } from "@/types";

const SLOT_STEP_MINUTES = 30;

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

export function addMinutesToTime(time: string, minutes: number): string {
  return minutesToTime(timeToMinutes(time) + minutes);
}

function rangesOverlap(aStart: number, aEnd: number, bStart: number, bEnd: number) {
  return aStart < bEnd && bStart < aEnd;
}

interface BusyRange {
  start_time: string;
  end_time: string;
}

interface GetAvailableSlotsParams {
  date: string; // YYYY-MM-DD
  durationMinutes: number;
  availability: Availability[];
  blockedDates: BlockedDate[];
  busyRanges: BusyRange[];
  now?: Date;
}

export function getAvailableSlots({
  date,
  durationMinutes,
  availability,
  blockedDates,
  busyRanges,
  now = new Date(),
}: GetAvailableSlotsParams): TimeSlot[] {
  const [year, month, day] = date.split("-").map(Number);
  const dayOfWeek = new Date(year, month - 1, day).getDay();

  const daySchedule = availability.find((a) => a.day_of_week === dayOfWeek && a.active);
  if (!daySchedule) return [];

  const dayBlocks = blockedDates.filter((b) => b.date === date);
  const isFullDayBlocked = dayBlocks.some((b) => !b.start_time && !b.end_time);
  if (isFullDayBlocked) return [];

  const partialBlocks = dayBlocks
    .filter((b) => b.start_time && b.end_time)
    .map((b) => ({
      start: timeToMinutes(b.start_time as string),
      end: timeToMinutes(b.end_time as string),
    }));

  const busy = busyRanges.map((b) => ({
    start: timeToMinutes(b.start_time),
    end: timeToMinutes(b.end_time),
  }));

  const scheduleStart = timeToMinutes(daySchedule.start_time);
  const scheduleEnd = timeToMinutes(daySchedule.end_time);

  const isToday =
    now.getFullYear() === year && now.getMonth() === month - 1 && now.getDate() === day;
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const slots: TimeSlot[] = [];

  for (
    let start = scheduleStart;
    start + durationMinutes <= scheduleEnd;
    start += SLOT_STEP_MINUTES
  ) {
    const end = start + durationMinutes;

    let available = true;

    if (isToday && start <= nowMinutes) {
      available = false;
    }

    if (available) {
      for (const b of busy) {
        if (rangesOverlap(start, end, b.start, b.end)) {
          available = false;
          break;
        }
      }
    }

    if (available) {
      for (const b of partialBlocks) {
        if (rangesOverlap(start, end, b.start, b.end)) {
          available = false;
          break;
        }
      }
    }

    slots.push({ time: minutesToTime(start), available });
  }

  return slots;
}
