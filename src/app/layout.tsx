import type { Metadata } from "next";
import { Golos_Text, Prata } from "next/font/google";
import "./globals.css";
import { BookingProvider } from "@/components/BookingContext";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SITE } from "@/lib/site";

const body = Golos_Text({ variable: "--font-body", subsets: ["latin", "cyrillic"], display: "swap" });
const display = Prata({ variable: "--font-display", subsets: ["latin", "cyrillic"], weight: "400", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s · ${SITE.name}` },
  description: SITE.description,
  openGraph: { title: `${SITE.name} — ${SITE.tagline}`, description: SITE.description, type: "website", locale: "ru_RU" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${body.variable} ${display.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans">
        <SmoothScroll>
          <BookingProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </BookingProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
