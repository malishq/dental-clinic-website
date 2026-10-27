import { DOCTORS } from "@/lib/data";

const tints = ["bg-sky text-ink", "bg-ink text-paper", "bg-sky-deep text-ink", "bg-accent text-sheet"];

export function Doctors() {
  return (
    <section id="doctors" data-layer="plan" className="scroll-mt-header py-24 lg:py-32">
      <div className="reading__inner">
        <h2 data-reveal className="font-display text-head text-ink">
          Кто вас лечит
        </h2>
        <p data-reveal className="mt-6 max-w-[30rem] text-lead text-ink">
          Четыре врача, четыре кабинета. На первом визите вас смотрит тот врач, который потом и будет лечить.
        </p>
        <ul data-reveal-group className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8">
          {DOCTORS.map((doctor, i) => (
            <li key={doctor.id}>
              <div className={`grid aspect-[4/5] place-items-center ${tints[i % tints.length]}`}>
                <svg viewBox="0 0 100 125" className="h-full w-full" aria-hidden>
                  <text x="50" y="78" textAnchor="middle" fontFamily="var(--font-display), Georgia, serif" fontSize="44" fill="currentColor">
                    {doctor.initials}
                  </text>
                </svg>
              </div>
              <p className="mt-3 text-body font-semibold text-ink">{doctor.name}</p>
              <p className="text-note text-muted">{doctor.role}</p>
              <p className="text-note text-muted">Стаж {doctor.years} лет</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
