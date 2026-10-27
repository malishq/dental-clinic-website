"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const reveal = (targets: gsap.TweenTarget, vars: gsap.TweenVars) => {
          gsap.set(targets, { transition: "none" });
          gsap.from(targets, { ...vars, onComplete: () => gsap.set(targets, { clearProps: "all" }) });
        };
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          reveal(element, {
            y: 28,
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: Number(element.dataset.revealDelay ?? 0),
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          });
        });
        gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
          reveal(group.children, {
            y: 24,
            autoAlpha: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
