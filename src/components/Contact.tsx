import { ContactForm } from "@/components/ContactForm";
import { SITE } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-header py-24 lg:py-32">
      <div className="wrap">
        <div data-reveal className="coupon mx-auto max-w-[72rem] lg:grid lg:grid-cols-[46fr_54fr]">
          <span aria-hidden className="coupon__notch top-[46%] -left-3.5 -translate-y-1/2 lg:top-0 lg:left-[46%] lg:-translate-x-1/2 lg:-translate-y-1/2" />
          <span aria-hidden className="coupon__notch top-[46%] -right-3.5 -translate-y-1/2 lg:top-auto lg:right-auto lg:bottom-0 lg:left-[46%] lg:-translate-x-1/2 lg:translate-y-1/2" />
          <div className="flex flex-col justify-between gap-10 p-6 sm:p-10 lg:p-12">
            <div>
              <h2 className="font-display text-head text-paper">Запишитесь на первый визит</h2>
              <p className="mt-5 max-w-[26rem] text-body text-paper">
                Оставьте имя и телефон. Администратор перезвонит в течение рабочего дня, подтвердит врача и время и ответит на вопросы.
              </p>
            </div>
            <div className="text-body text-paper">
              <p>{SITE.address}</p>
              <p>{SITE.hours}</p>
              <a href={SITE.phoneHref} className="mt-2 inline-block font-display text-lead leading-tight text-paper">
                {SITE.phone}
              </a>
            </div>
          </div>
          <div className="coupon__perf p-6 sm:p-10 lg:p-12">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
