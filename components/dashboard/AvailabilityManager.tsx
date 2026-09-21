"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Ban, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { upsertDaySchedule, addBlockedDate, removeBlockedDate } from "@/lib/dashboard/availability";
import { formatDateShort, formatTimeArabic } from "@/lib/utils/format";
import type { Availability, BlockedDate } from "@/types";

const DAY_LABELS = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

interface DayRow {
  day_of_week: number;
  start_time: string;
  end_time: string;
  active: boolean;
}

export function AvailabilityManager({
  availability,
  blockedDates,
}: {
  availability: Availability[];
  blockedDates: BlockedDate[];
}) {
  const router = useRouter();
  const { showToast } = useToast();

  const [rows, setRows] = useState<DayRow[]>(
    Array.from({ length: 7 }, (_, i) => {
      const existing = availability.find((a) => a.day_of_week === i);
      return {
        day_of_week: i,
        start_time: existing?.start_time.slice(0, 5) ?? "10:00",
        end_time: existing?.end_time.slice(0, 5) ?? "22:00",
        active: existing?.active ?? false,
      };
    })
  );
  const [savingSchedule, setSavingSchedule] = useState(false);

  const [blockDate, setBlockDate] = useState("");
  const [blockAllDay, setBlockAllDay] = useState(true);
  const [blockStart, setBlockStart] = useState("");
  const [blockEnd, setBlockEnd] = useState("");
  const [blockReason, setBlockReason] = useState("");
  const [savingBlock, setSavingBlock] = useState(false);

  function updateRow(index: number, patch: Partial<DayRow>) {
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, ...patch } : r)));
  }

  async function handleSaveSchedule() {
    setSavingSchedule(true);
    const results = await Promise.all(
      rows.map((row) =>
        upsertDaySchedule(row.day_of_week, {
          start_time: row.start_time,
          end_time: row.end_time,
          active: row.active,
        })
      )
    );
    setSavingSchedule(false);

    if (results.some((r) => !r.success)) {
      showToast("حدث خطأ أثناء حفظ الجدول", "error");
      return;
    }
    showToast("تم حفظ جدول العمل");
    router.refresh();
  }

  async function handleAddBlock() {
    if (!blockDate) {
      showToast("اختار التاريخ أولًا", "error");
      return;
    }
    setSavingBlock(true);
    const result = await addBlockedDate({
      date: blockDate,
      start_time: blockAllDay ? null : blockStart || null,
      end_time: blockAllDay ? null : blockEnd || null,
      reason: blockReason || null,
    });
    setSavingBlock(false);

    if (!result.success) {
      showToast(result.error || "حدث خطأ", "error");
      return;
    }

    showToast("تم حظر الموعد");
    setBlockDate("");
    setBlockStart("");
    setBlockEnd("");
    setBlockReason("");
    setBlockAllDay(true);
    router.refresh();
  }

  async function handleRemoveBlock(id: string) {
    const result = await removeBlockedDate(id);
    if (!result.success) {
      showToast(result.error || "حدث خطأ", "error");
      return;
    }
    showToast("تم إلغاء الحظر");
    router.refresh();
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card className="p-5 sm:p-6">
        <h3 className="mb-4 font-bold text-navy-deep">جدول العمل الأسبوعي</h3>
        <div className="space-y-3">
          {rows.map((row, i) => (
            <div
              key={row.day_of_week}
              className="flex flex-wrap items-center gap-3 rounded-xl border border-navy/8 p-3"
            >
              <label className="flex w-28 shrink-0 items-center gap-2 text-sm font-medium text-navy-deep">
                <input
                  type="checkbox"
                  className="size-4 accent-gold"
                  checked={row.active}
                  onChange={(e) => updateRow(i, { active: e.target.checked })}
                />
                {DAY_LABELS[row.day_of_week]}
              </label>
              <input
                type="time"
                value={row.start_time}
                disabled={!row.active}
                onChange={(e) => updateRow(i, { start_time: e.target.value })}
                className="h-9 rounded-lg border border-navy/12 px-2 text-sm disabled:opacity-40"
              />
              <span className="text-text-muted">إلى</span>
              <input
                type="time"
                value={row.end_time}
                disabled={!row.active}
                onChange={(e) => updateRow(i, { end_time: e.target.value })}
                className="h-9 rounded-lg border border-navy/12 px-2 text-sm disabled:opacity-40"
              />
            </div>
          ))}
        </div>
        <Button onClick={handleSaveSchedule} loading={savingSchedule} className="mt-5 w-full">
          حفظ الجدول
        </Button>
      </Card>

      <div className="space-y-6">
        <Card className="p-5 sm:p-6">
          <h3 className="mb-4 font-bold text-navy-deep">حظر يوم أو وقت</h3>
          <div className="space-y-3">
            <Input type="date" label="التاريخ" value={blockDate} onChange={(e) => setBlockDate(e.target.value)} />
            <label className="flex items-center gap-2 text-sm font-medium text-navy-deep">
              <input
                type="checkbox"
                className="size-4 accent-gold"
                checked={blockAllDay}
                onChange={(e) => setBlockAllDay(e.target.checked)}
              />
              حظر اليوم بالكامل
            </label>
            {!blockAllDay && (
              <div className="grid grid-cols-2 gap-3">
                <Input type="time" label="من" value={blockStart} onChange={(e) => setBlockStart(e.target.value)} />
                <Input type="time" label="إلى" value={blockEnd} onChange={(e) => setBlockEnd(e.target.value)} />
              </div>
            )}
            <Input
              label="السبب (اختياري)"
              value={blockReason}
              onChange={(e) => setBlockReason(e.target.value)}
              placeholder="إجازة، مناسبة خاصة..."
            />
            <Button onClick={handleAddBlock} loading={savingBlock} className="w-full">
              <Ban className="size-4" />
              حظر الموعد
            </Button>
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <h3 className="mb-4 font-bold text-navy-deep">المواعيد المحظورة</h3>
          {blockedDates.length === 0 ? (
            <p className="text-sm text-text-muted">لا توجد مواعيد محظورة حاليًا.</p>
          ) : (
            <div className="space-y-2">
              {blockedDates.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between rounded-xl border border-navy/8 p-3 text-sm"
                >
                  <div>
                    <p className="font-medium text-navy-deep">{formatDateShort(b.date)}</p>
                    <p className="text-xs text-text-muted">
                      {b.start_time && b.end_time
                        ? `${formatTimeArabic(b.start_time)} - ${formatTimeArabic(b.end_time)}`
                        : "اليوم بالكامل"}
                      {b.reason ? ` — ${b.reason}` : ""}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveBlock(b.id)}
                    className="rounded-lg p-1.5 text-text-muted hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
