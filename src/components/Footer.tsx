import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { CREDITS, credit } from "@/lib/data";
import { SITE } from "@/lib/site";

const sky = credit("sky.jpg");

export function Footer() {
  return (
    <footer className="relative isolate flex min-h-[88svh] flex-col justify-between overflow-clip text-paper lg:min-h-svh">
      <Image src={asset(`/images/${sky.file}`)} alt={sky.alt} width={1800} height={1350} unoptimized className="absolute inset-0 -z-10 h-full w-full object-cover brightness-[0.62]" sizes="100vw" />
      <div className="wrap flex flex-col gap-8 pt-8 sm:flex-row sm:justify-between">
        <nav aria-label="Ссылки в подвале" className="flex flex-col gap-2 text-body">
          {[...SITE.nav, SITE.cta].map((link) => (
            <Link key={link.href} href={link.href} className="transition-opacity duration-200 hover:opacity-80">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="text-body sm:text-right">
          <p>{SITE.address}</p>
          <p>{SITE.hours}</p>
          <a href={SITE.phoneHref} className="mt-1 inline-block">
            {SITE.phone}
          </a>
        </div>
      </div>
      <div className="wrap pb-8">
        <svg viewBox="0 0 1000 300" className="block w-full" role="img" aria-label={SITE.name}>
          <text x="0" y="284" textLength="1000" lengthAdjust="spacing" fontFamily="var(--font-display), Georgia, serif" fontSize="380" fill="var(--paper)">
            {SITE.name}
          </text>
        </svg>
        <div className="mt-6 flex flex-col gap-4 text-small text-paper sm:flex-row sm:items-end sm:justify-between">
          <p className="shrink-0">
            © {new Date().getFullYear()} {SITE.name}
            <br />
            {SITE.address}
          </p>
          <p className="max-w-[46rem] sm:text-right">
            Фотографии:{" "}
            {CREDITS.map((c, i) => (
              <span key={c.file}>
                <a href={c.page} className="underline underline-offset-2">
                  «{c.title}»
                </a>
                , {c.author},{" "}
                <a href={c.licenseUrl} className="underline underline-offset-2">
                  {c.license}
                </a>
                {i < CREDITS.length - 1 ? "; " : ", via Wikimedia Commons."}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
