import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SITE } from "@/lib/site";

const body = Manrope({ variable: "--font-body", subsets: ["latin", "cyrillic"] });
const display = Unbounded({ variable: "--font-display", subsets: ["latin", "cyrillic"], weight: ["500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s · ${SITE.name}` },
  description: SITE.description,
  openGraph: { title: SITE.name, description: SITE.description, type: "website", locale: "ru_RU" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${body.variable} ${display.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans">
        <SmoothScroll>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
