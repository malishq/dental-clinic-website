import Link from "next/link";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-surface">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-semibold text-ink">{SITE.name}</p>
          <p className="mt-3 max-w-sm text-muted">{SITE.description}</p>
        </div>
        <div>
          <p className="font-semibold text-ink">Контакты</p>
          <p className="mt-3 text-muted">{SITE.address}</p>
          <p className="mt-1 text-muted">{SITE.hours}</p>
          <a href={SITE.phoneHref} className="mt-1 block text-ink transition hover:text-accent">
            {SITE.phone}
          </a>
        </div>
        <nav aria-label="Ссылки в подвале" className="flex flex-col gap-2">
          {SITE.nav.map((link) => (
            <Link key={link.href} href={link.href} className="text-muted transition hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mx-auto w-full max-w-6xl px-5 pb-8 text-sm text-muted sm:px-8">© {new Date().getFullYear()} {SITE.name}</div>
    </footer>
  );
}
