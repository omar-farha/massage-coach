import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { NAV_LINKS, SERVICE_AREAS, SITE } from "@/lib/constants";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16.6 5.82a4.28 4.28 0 0 1-3.16-1.4V15.4a5.3 5.3 0 1 1-4.53-5.24v2.35a2.98 2.98 0 1 0 2.1 2.85V2h2.42a4.28 4.28 0 0 0 3.17 4.14V5.82Z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.5 21v-7.5h2.5l.5-3H13.5V8.5c0-.9.25-1.5 1.55-1.5H16.5V4.35C16.2 4.3 15.2 4.2 14 4.2c-2.4 0-4 1.46-4 4.15V10.5H7.5v3H10V21h3.5Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy-deep pt-16 text-white/80">
      <Container>
        <div className="grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt={SITE.fullNameAr}
                width={44}
                height={44}
                className="size-11 rounded-full ring-1 ring-gold/40"
              />
              <span className="text-lg font-extrabold text-white">{SITE.nameAr}</span>
            </div>
            <p className="mt-4 text-sm leading-6">{SITE.fullNameAr}</p>
            <p className="mt-2 text-sm font-medium text-gold-light">{SITE.tagline}</p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold text-white">روابط سريعة</h4>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-gold-light">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/booking" className="transition-colors hover:text-gold-light">
                  احجز موعدك
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold text-white">تواصل معنا</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  className="flex items-center gap-2 transition-colors hover:text-gold-light"
                >
                  <Phone className="size-4 text-gold" />
                  <span dir="ltr">{SITE.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-gold-light"
                >
                  <FacebookIcon className="size-4 text-gold" />
                  فيسبوك
                </a>
              </li>
              <li>
                <a
                  href={SITE.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-gold-light"
                >
                  <TikTokIcon className="size-4 text-gold" />
                  تيك توك
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 flex items-center gap-1.5 text-sm font-bold text-white">
              <MapPin className="size-4 text-gold" />
              مناطق الخدمة
            </h4>
            <p className="text-sm leading-7 text-white/60">
              {SERVICE_AREAS.slice(0, 8).join(" · ")} وأكثر
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
          © {new Date().getFullYear()} {SITE.fullNameAr}. جميع الحقوق محفوظة.
        </div>
      </Container>
    </footer>
  );
}
