import Image from "next/image";
import { asset } from "@/lib/asset";
import { credit, PAINLESS } from "@/lib/data";

const photo = credit("instruments.jpg");

export function Painless() {
  return (
    <section id="painless" data-layer="tray" className="scroll-mt-header py-24 lg:py-32">
      <div className="reading__inner">
        <h2 data-reveal className="font-display text-head text-ink">
          Почему не больно
        </h2>
        <p data-reveal className="mt-6 max-w-[30rem] text-lead text-ink">
          Обезболивание начинается до укола и не заканчивается, когда вы встаёте с кресла. Вот что делаем в каждом случае.
        </p>

        <div data-reveal className="mt-12 bg-sky px-4 py-8 sm:px-8 sm:py-10">
          <div className="menu-sheet mx-auto max-w-[32rem] px-5 py-10 sm:px-8">
            <p className="text-center font-display text-lead leading-tight text-ink">Без боли</p>
            <div className="mt-8 flex flex-col gap-9">
              {PAINLESS.map((group) => (
                <div key={group.name}>
                  <p className="text-lead font-semibold text-ink">{group.name}</p>
                  <ul className="mt-3 flex flex-col gap-4">
                    {group.items.map((item) => (
                      <li key={item.name}>
                        <p className="flex items-baseline text-body text-ink">
                          <span className="font-semibold">{item.name}</span>
                          <span className="leader" aria-hidden />
                          <span className="shrink-0 text-note text-muted">{item.value}</span>
                        </p>
                        <p className="mt-1 max-w-[34ch] text-note text-muted">{item.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <figure data-reveal className="mt-10 lg:hidden">
          <Image src={asset(`/images/${photo.file}`)} alt={photo.alt} width={1800} height={1200} unoptimized className="block aspect-[3/2] w-full object-cover" sizes="100vw" />
          <figcaption className="mt-2 text-small text-muted">Лоток с зеркалами и зондами перед стерилизацией</figcaption>
        </figure>
      </div>
    </section>
  );
}
