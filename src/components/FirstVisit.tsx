import { VISIT } from "@/lib/data";

export function FirstVisit() {
  return (
    <section id="visit" data-layer="xray" className="scroll-mt-header py-24 lg:py-32">
      <div className="reading__inner">
        <h2 data-reveal className="font-display text-head text-ink">
          Как проходит первый визит
        </h2>
        <p data-reveal className="mt-6 max-w-[30rem] text-lead text-ink">
          Первый визит занимает около часа. Вы уходите с планом лечения, в котором записаны этапы, сроки и цена, и она уже не изменится.
        </p>

        <div data-reveal className="mt-12 bg-sky px-4 py-8 sm:px-8 sm:py-10">
          <div className="slip mx-auto max-w-[29rem] px-5 pt-7 pb-10 sm:px-7">
            <p className="font-display text-lead leading-tight text-ink">Маршрут первого визита</p>
            <p className="mt-1 text-note text-muted">Приём по записи, время указано для визита на 9:00</p>
            <div className="mt-2">
              {VISIT.map((step) => (
                <div key={step.time} className="pt-7">
                  <p className="flex items-baseline gap-3 text-body font-semibold text-ink">
                    <span className="tnum">{step.time}</span>
                    <span>{step.title}</span>
                  </p>
                  <ul className="mt-2">
                    {step.rows.map((row) => (
                      <li key={row.what} className="flex items-baseline py-1.5 text-note text-ink">
                        <span className="max-w-[68%]">{row.what}</span>
                        <span className="leader" aria-hidden />
                        <span className="tnum shrink-0 text-muted">{row.minutes}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-8 flex items-baseline justify-between gap-4 bg-ink px-4 py-3 text-note text-paper">
              <span>Вы уходите с планом лечения и зафиксированной ценой</span>
              <span className="tnum shrink-0 font-semibold">10:00</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
