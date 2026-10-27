"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ButtonLink, TextLink } from "@/components/ui";
import { SITE } from "@/lib/site";

gsap.registerPlugin(SplitText, useGSAP);

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const title = ref.current?.querySelector("h1");
        if (!title) return;
        const split = SplitText.create(title, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          linesClass: "hero__line",
          onSplit: (self) => gsap.from(self.lines, { yPercent: 110, duration: 0.9, ease: "expo.out", stagger: 0.09, delay: 0.1 }),
        });
        gsap.from("[data-hero-fade]", { y: 18, autoAlpha: 0, duration: 0.8, ease: "power3.out", stagger: 0.1, delay: 0.5, clearProps: "all" });
        return () => split.revert();
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="hero reading__inner">
      <h1 className="font-display text-display text-ink">
        Всё ясно до
        <br />
        начала лечения
      </h1>
      <p data-hero-fade className="mt-8 max-w-[34rem] text-lead text-ink">
        Семейная стоматология в Москве. План и цену лечения вы получаете до того, как сядете в кресло. Лечим без боли и принимаем только по записи.
      </p>
      <div data-hero-fade className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
        <ButtonLink href={SITE.cta.href}>{SITE.cta.label}</ButtonLink>
        <TextLink href="#picker">Подобрать врача и время</TextLink>
      </div>
      <p data-hero-fade className="mt-12 max-w-[30rem] text-body text-muted lg:mt-auto lg:pt-14">
        Четыре кабинета в одном здании: взрослых и детей принимаем рядом. Любое лечение можно оплатить в рассрочку без переплаты.
      </p>
    </div>
  );
}
