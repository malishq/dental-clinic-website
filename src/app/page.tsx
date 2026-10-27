import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Section } from "@/components/ui";
import { SITE } from "@/lib/site";

const services = [
  { title: "Услуга один", text: "Короткое описание услуги, одна–две строки.", price: "от 1 500 ₽" },
  { title: "Услуга два", text: "Короткое описание услуги, одна–две строки.", price: "от 2 500 ₽" },
  { title: "Услуга три", text: "Короткое описание услуги, одна–две строки.", price: "от 4 000 ₽" },
];

export default function Home() {
  return (
    <>
      <section className="relative isolate flex min-h-[calc(100svh-4.5rem)] items-center">
        <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
          <h1 className="max-w-4xl font-display text-[clamp(2.6rem,7vw,5.6rem)] font-semibold leading-[1.02] tracking-tight text-ink">
            {SITE.name}: заготовка сайта
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{SITE.tagline}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="#contact">Записаться</ButtonLink>
            <ButtonLink href="#services" variant="ghost">
              Услуги
            </ButtonLink>
          </div>
        </div>
      </section>

      <Reveal>
        <Section id="services">
          <h2 data-reveal className="max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Услуги и цены
          </h2>
          <div data-reveal-group className="mt-12 grid gap-4 md:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="rounded-3xl bg-surface p-7">
                <h3 className="font-display text-xl font-semibold text-ink">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{s.text}</p>
                <p className="mt-6 text-2xl font-semibold text-accent">{s.price}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="about" className="bg-surface">
          <div className="grid gap-10 lg:grid-cols-2">
            <h2 data-reveal className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
              О нас
            </h2>
            <p data-reveal className="text-lg leading-relaxed text-muted">
              Этот блок заменяется настоящим текстом о компании: чем занимается, где находится, почему к ней идут.
            </p>
          </div>
        </Section>

        <Section id="contact">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div data-reveal>
              <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">Записаться</h2>
              <p className="mt-5 text-lg text-muted">{SITE.address}</p>
              <p className="mt-1 text-lg text-muted">{SITE.hours}</p>
              <a href={SITE.phoneHref} className="mt-4 inline-block text-2xl font-semibold text-ink">
                {SITE.phone}
              </a>
            </div>
            <div data-reveal>
              <ContactForm services={services.map((s) => s.title)} />
            </div>
          </div>
        </Section>
      </Reveal>
    </>
  );
}
