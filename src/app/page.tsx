import Image from "next/image";
import { Contact } from "@/components/Contact";
import { Doctors } from "@/components/Doctors";
import { PlanDrawing, ToothDrawing } from "@/components/Drawings";
import { Faq } from "@/components/Faq";
import { FirstVisit } from "@/components/FirstVisit";
import { Hero } from "@/components/Hero";
import { Painless } from "@/components/Painless";
import { Picker } from "@/components/Picker";
import { Prices } from "@/components/Prices";
import { Reveal } from "@/components/Reveal";
import { Stage, type StageLayer } from "@/components/Stage";
import { asset } from "@/lib/asset";
import { credit } from "@/lib/data";
import { SITE } from "@/lib/site";

function photo(file: string, priority = false) {
  const c = credit(file);
  return <Image src={asset(`/images/${c.file}`)} alt={c.alt} width={1800} height={1200} unoptimized priority={priority} sizes="(min-width: 1024px) 50vw, 100vw" />;
}

const chapterA: StageLayer[] = [
  { id: "tooth", caption: "Контур зуба", kind: "draw", node: <ToothDrawing /> },
  { id: "mirror", caption: "Зеркало и зонд: с них начинается каждый осмотр", kind: "photo", node: photo("mirror-tooth.jpg") },
];

const chapterB: StageLayer[] = [
  { id: "xray", caption: "Панорамный снимок делаем на первом визите", kind: "photo", node: photo("xray.jpg") },
  { id: "plan", caption: "План лечения с зафиксированной ценой", kind: "draw", node: <PlanDrawing /> },
  { id: "tray", caption: "Лоток с инструментами перед стерилизацией", kind: "photo", node: photo("instruments.jpg") },
  { id: "model", caption: "Гипсовая модель челюстей", kind: "photo", node: photo("model.jpg") },
];

export default function Home() {
  return (
    <Reveal>
      <section data-chapter="a" className="chapter">
        <Stage
          chapter="a"
          layers={chapterA}
          bar={
            <>
              <span>{SITE.hours}</span>
              <span>{SITE.address}</span>
            </>
          }
        />
        <div className="reading">
          <div data-layer="tooth">
            <Hero />
          </div>
          <Prices />
        </div>
      </section>

      <Picker />

      <section data-chapter="b" className="chapter">
        <Stage chapter="b" layers={chapterB} right={<a href={SITE.phoneHref}>{SITE.phone}</a>} />
        <div className="reading">
          <FirstVisit />
          <Doctors />
          <Painless />
          <Faq />
        </div>
      </section>

      <Contact />
    </Reveal>
  );
}
