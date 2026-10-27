"use client";

import { useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, useGSAP);

export type StageLayer = { id: string; caption: string; kind: "draw" | "photo"; node: ReactNode };

export function Stage({ chapter, layers, bar, right }: { chapter: string; layers: StageLayer[]; bar?: ReactNode; right?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(layers[0].id);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const chapterEl = document.querySelector<HTMLElement>(`[data-chapter="${chapter}"]`);
      const layerEls = gsap.utils.toArray<HTMLElement>(".stage__layer", root);
      const mm = gsap.matchMedia();
      mm.add({ fine: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" }, (ctx) => {
        const reduce = Boolean(ctx.conditions?.reduce);
        const show = (id: string) => {
          layerEls.forEach((layer) => {
            const on = layer.dataset.id === id;
            gsap.to(layer, { autoAlpha: on ? 1 : 0, duration: reduce ? 0 : 1.4, ease: "power2.inOut", overwrite: true });
          });
          setActive(id);
        };
        if (chapterEl) {
          gsap.utils.toArray<HTMLElement>("[data-layer]", chapterEl).forEach((section) => {
            ScrollTrigger.create({
              trigger: section,
              start: "top 60%",
              end: "bottom 60%",
              onToggle: (self) => {
                if (self.isActive && section.dataset.layer) show(section.dataset.layer);
              },
            });
          });
        }
        if (reduce) return;
        const drawn = root.querySelectorAll<SVGGeometryElement>("[data-draw]");
        if (drawn.length) {
          gsap.set(drawn, { drawSVG: "0%" });
          gsap.to(drawn, { drawSVG: "100%", duration: 1.5, ease: "power2.inOut", stagger: 0.3, delay: 0.25 });
        }
        const fills = root.querySelectorAll("[data-fill]");
        if (fills.length) gsap.from(fills, { opacity: 0, duration: 1.2, delay: 1.4, ease: "power2.out" });
        if (chapterEl) {
          layerEls.forEach((layer) => {
            const img = layer.querySelector("img");
            if (!img) return;
            gsap.fromTo(img, { yPercent: -4 }, { yPercent: 4, ease: "none", scrollTrigger: { trigger: chapterEl, start: "top top", end: "bottom bottom", scrub: true } });
          });
        }
      });
    },
    { scope: ref, dependencies: [chapter] },
  );

  const caption = layers.find((layer) => layer.id === active)?.caption;

  return (
    <div ref={ref} className="stage" aria-label={caption}>
      {layers.map((layer) => (
        <div key={layer.id} data-id={layer.id} className={`stage__layer ${layer.kind === "draw" ? "stage__layer--draw" : ""}`}>
          {layer.node}
        </div>
      ))}
      <div className="stage__bar text-ink">
        {bar ?? (
          <>
            <span>{caption}</span>
            {right}
          </>
        )}
      </div>
    </div>
  );
}
