import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "كابتن سلطان للمساج المنزلي | راحة تستحقها",
  description:
    "كابتن سلطان للمساج المنزلي يقدم تجربة مساج احترافية ومريحة في بيتك، بخبرة تزيد عن 10 سنوات والتزام كامل بالمواعيد.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-text">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
