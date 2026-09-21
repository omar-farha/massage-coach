import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getActiveServices } from "@/lib/booking/actions";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "احجز موعدك | كابتن سلطان للمساج المنزلي",
};

export default async function BookingPage({
  searchParams,
}: PageProps<"/booking">) {
  const services = await getActiveServices();
  const params = await searchParams;
  const preselectedService = typeof params.service === "string" ? params.service : undefined;

  return (
    <div className="relative min-h-screen overflow-hidden py-8 sm:py-12">
      <div className="pointer-events-none absolute -top-20 end-[-10%] -z-10 size-80 rounded-full bg-gold-light/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 start-[-10%] -z-10 size-72 rounded-full bg-navy/8 blur-3xl" />
      <Container className="max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-deep hover:text-gold"
          >
            <ArrowRight className="size-4" />
            العودة للرئيسية
          </Link>
          <Image
            src="/logo.png"
            alt="كابتن سلطان"
            width={40}
            height={40}
            className="size-10 rounded-full ring-1 ring-gold/30"
          />
        </div>

        <BookingFlow services={services} preselectedServiceId={preselectedService} />
      </Container>
    </div>
  );
}
