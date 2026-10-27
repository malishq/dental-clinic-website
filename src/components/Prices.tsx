import Image from "next/image";
import { ImplantStage } from "@/components/Drawings";
import { asset } from "@/lib/asset";
import { credit, PRICE_GROUPS } from "@/lib/data";

const implantPhoto = credit("implants.jpg");

export function Prices() {
  return (
    <section id="prices" data-layer="mirror" className="scroll-mt-header py-24 lg:py-32">
      <div className="reading__inner">
        <h2 data-reveal className="font-display text-head text-ink">
          Цены известны заранее
        </h2>
        <p data-reveal className="mt-6 max-w-[32rem] text-lead text-ink">
          Все цены ниже — ориентир «от». Точную сумму врач записывает в план лечения после осмотра и снимка, и она не меняется до конца лечения.
        </p>

        <div className="mt-14 flex flex-col gap-10">
          {PRICE_GROUPS.map((group) => (
            <div key={group.id}>
              <p data-reveal className="text-note text-muted">
                {group.name}
              </p>
              <ul data-reveal-group className="mt-2">
                {group.items.map((item) => (
                  <li key={item.name} className="flex min-h-10 items-baseline gap-3 py-1.5">
                    <span aria-hidden className="relative top-[0.15em] block h-4 w-4 shrink-0 rounded-full bg-sky-deep" />
                    <span className="flex-1 text-body text-ink">{item.name}</span>
                    <span className="tnum shrink-0 text-right text-note text-muted">{item.price}</span>
                  </li>
                ))}
              </ul>
              {group.id === "implants" && (
                <div className="mt-6">
                  <ol data-reveal-group className="grid gap-2 sm:grid-cols-3 sm:gap-3">
                    {(["Имплант в кости", "Формирователь десны", "Коронка на импланте"] as const).map((label, i) => (
                      <li key={label} className="flex items-center gap-4 bg-sky p-3 sm:block sm:p-4">
                        <div className="w-24 shrink-0 sm:w-full">
                          <ImplantStage stage={(i + 1) as 1 | 2 | 3} />
                        </div>
                        <p className="text-note text-ink sm:mt-3">{label}</p>
                      </li>
                    ))}
                  </ol>
                  <figure data-reveal className="mt-4">
                    <Image src={asset(`/images/${implantPhoto.file}`)} alt={implantPhoto.alt} width={1800} height={1014} unoptimized className="block aspect-[3/2] w-full object-cover" sizes="(min-width: 1024px) 40rem, 100vw" />
                    <figcaption className="mt-2 text-small text-muted">Керамический и титановый импланты. Какой подходит вам, хирург решает по томограмме.</figcaption>
                  </figure>
                </div>
              )}
            </div>
          ))}
        </div>

        <p data-reveal className="mt-14 max-w-[32rem] text-body text-ink">
          Лечение дороже 30 000 ₽ можно оплатить в рассрочку без переплаты: сумма из плана делится на равные части на срок до года, график записан в самом плане.
        </p>
      </div>
    </section>
  );
}
