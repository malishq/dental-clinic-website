"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { SITE } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  useEffect(() => {
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-paper">
      <div className="wrap flex h-header w-full items-center justify-between gap-6">
        <Link href="/" className="font-display text-lead leading-none text-ink" aria-label={`${SITE.name} — на главную`}>
          {SITE.name}
        </Link>

        <nav aria-label="Основная навигация" className="hidden items-center gap-7 lg:flex">
          {SITE.nav.map((link) => (
            <Link key={link.href} href={link.href} className="text-note font-medium text-ink transition-colors duration-200 hover:text-accent">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={SITE.cta.href}
            onClick={() => setOpen(false)}
            className="press inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-note font-semibold text-sheet hover:bg-accent-strong"
          >
            {SITE.cta.label}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="press inline-flex min-h-11 items-center rounded-full bg-sky px-4 text-note font-semibold text-ink lg:hidden"
          >
            {open ? "Закрыть" : "Меню"}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-header z-40 h-[calc(100dvh-var(--header-h))] bg-paper transition-opacity duration-300 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <nav aria-label="Мобильное меню" className="wrap flex h-full flex-col gap-1 overflow-y-auto py-6" data-lenis-prevent>
          {SITE.nav.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-2xl px-2 py-4 font-display text-[1.75rem] leading-none text-ink transition-colors hover:bg-sky">
              {link.label}
            </Link>
          ))}
          <p className="mt-auto text-muted">
            {SITE.address}
            <br />
            {SITE.hours}
            <br />
            <a href={SITE.phoneHref} className="text-ink">
              {SITE.phone}
            </a>
          </p>
        </nav>
      </div>
    </header>
  );
}
