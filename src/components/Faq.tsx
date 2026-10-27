import Image from "next/image";
import { asset } from "@/lib/asset";
import { credit, FAQ } from "@/lib/data";

const photo = credit("model.jpg");

export function Faq() {
  return (
    <section id="faq" data-layer="model" className="scroll-mt-header py-24 lg:py-32">
      <div className="reading__inner">
        <h2 data-reveal className="font-display text-head text-ink">
          Частые вопросы
        </h2>
        <div data-reveal-group className="mt-10 flex flex-col gap-5">
          {FAQ.map((item) => (
            <p key={item.q} className="faq-item max-w-[36rem] text-body text-ink">
              <span className="font-semibold">{item.q}</span> {item.a}
            </p>
          ))}
        </div>
        <figure data-reveal className="mt-12 lg:hidden">
          <Image src={asset(`/images/${photo.file}`)} alt={photo.alt} width={1800} height={1202} unoptimized className="block aspect-[3/2] w-full object-cover" sizes="100vw" />
          <figcaption className="mt-2 text-small text-muted">Гипсовая модель челюстей: на такой ортопед показывает будущую форму зубов</figcaption>
        </figure>
      </div>
    </section>
  );
}
