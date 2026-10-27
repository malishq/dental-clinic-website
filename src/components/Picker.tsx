"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useBooking } from "@/components/BookingContext";
import { doctorFor, DOCTORS, PROBLEMS, type ProblemId } from "@/lib/data";
import { receptionText, slotLabel, weekFor, type Day, type Slot } from "@/lib/slots";
import { SITE } from "@/lib/site";

gsap.registerPlugin(useGSAP);

const subscribeNoop = () => () => {};

export function Picker() {
  const [problem, setProblem] = useState<ProblemId>("pain");
  const [pickedRaw, setPicked] = useState<{ doctorId: string; day: Day; slot: Slot } | null>(null);
  const [dayChoice, setDayChoice] = useState<{ doctorId: string; index: number } | null>(null);
  const { book } = useBooking();
  const ref = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);

  const doctor = doctorFor(problem);
  const now = useMemo(() => (mounted ? new Date() : null), [mounted]);
  const week = useMemo(() => (now ? weekFor(doctor, now) : null), [doctor, now]);
  const picked = pickedRaw && pickedRaw.doctorId === doctor.id ? pickedRaw : null;
  const firstOpenDay = week ? Math.max(0, week.findIndex((d) => d.slots.length > 0)) : 0;
  const dayIndex = dayChoice && dayChoice.doctorId === doctor.id ? dayChoice.index : firstOpenDay;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-doctor-swap]", { y: 14, autoAlpha: 0, duration: 0.6, ease: "power3.out", stagger: 0.06, clearProps: "all" });
      });
    },
    { scope: ref, dependencies: [doctor.id] },
  );

  const pickedLabel = picked ? slotLabel(picked.day, picked.slot) : null;
  const slotClass = (on: boolean) => `press tnum min-h-11 text-note font-medium ${on ? "bg-ink text-paper" : "bg-sky text-ink hover:bg-sky-deep"}`;

  return (
    <section id="picker" ref={ref} className="scroll-mt-header bg-sky">
      <div className="wrap grid min-h-[88svh] gap-10 py-20 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-10 lg:py-24">
        <div className="lg:col-start-2">
          <h2 className="font-display text-head text-ink">Подберите врача и время</h2>
          <p className="mt-5 max-w-[30rem] text-lead text-ink">Выберите, что беспокоит. Покажем врача, который этим занимается, и его свободные часы на ближайшие семь дней.</p>
          <fieldset className="mt-8">
            <legend className="sr-only">Что беспокоит</legend>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {PROBLEMS.map((p) => {
                const on = p.id === problem;
                return (
                  <label key={p.id} className={`press cursor-pointer text-lead ${on ? "font-semibold text-ink" : "text-muted hover:text-ink"}`}>
                    <input type="radio" name="problem" value={p.id} checked={on} onChange={() => setProblem(p.id)} className="sr-only" />
                    {p.label}
                  </label>
                );
              })}
            </div>
          </fieldset>
        </div>

        <div className="bg-sheet p-5 sm:p-7 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-center lg:p-9">
          <p className="font-display text-lead leading-tight text-ink">Свободные часы на неделю</p>
          <p className="mt-1 text-note text-muted">Приём ведёт {doctor.name}. Нажмите на время, чтобы выбрать его.</p>

          {!week && (
            <p className="mt-8 text-body text-ink">
              Приём: {receptionText(doctor)}. Свободные часы на ближайшие семь дней появятся здесь, а уточнить время всегда можно по телефону{" "}
              <a href={SITE.phoneHref} className="font-semibold">
                {SITE.phone}
              </a>
              .
            </p>
          )}

          {week && (
            <>
              <div className="mt-7 hidden grid-cols-7 gap-1.5 md:grid" role="group" aria-label="Свободное время по дням">
                {week.map((day) => (
                  <div key={day.iso}>
                    <p className="mb-2 text-center text-note text-ink">
                      <span className="font-semibold">{day.short}</span> <span className="tnum">{day.dayNum}</span>
                    </p>
                    {day.closed && <p className="py-2 text-center text-small text-muted">выходной</p>}
                    {!day.closed && day.slots.length === 0 && <p className="py-2 text-center text-small text-muted">нет окон</p>}
                    <ul className="flex flex-col gap-1.5">
                      {day.slots.map((slot) => {
                        const on = picked?.slot.iso === slot.iso;
                        return (
                          <li key={slot.iso}>
                            <button type="button" aria-pressed={on} onClick={() => setPicked({ doctorId: doctor.id, day, slot })} className={`${slotClass(on)} block w-full`}>
                              {slot.label}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-6 md:hidden">
                <div className="grid grid-cols-7 gap-1" role="tablist" aria-label="День недели">
                  {week.map((day, i) => {
                    const on = i === dayIndex;
                    return (
                      <button
                        key={day.iso}
                        type="button"
                        role="tab"
                        aria-selected={on}
                        onClick={() => setDayChoice({ doctorId: doctor.id, index: i })}
                        className={`press flex min-h-12 flex-col items-center justify-center text-small leading-tight ${on ? "bg-ink text-paper" : "bg-sky text-ink"}`}
                      >
                        <span className="font-semibold">{day.short}</span>
                        <span className="tnum">{day.dayNum}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4 min-h-24" role="tabpanel">
                  {week[dayIndex].closed && <p className="text-body text-muted">Воскресенье, клиника закрыта.</p>}
                  {!week[dayIndex].closed && week[dayIndex].slots.length === 0 && <p className="text-body text-muted">В этот день у врача нет свободных часов.</p>}
                  <ul className="flex flex-wrap gap-2">
                    {week[dayIndex].slots.map((slot) => {
                      const on = picked?.slot.iso === slot.iso;
                      return (
                        <li key={slot.iso}>
                          <button type="button" aria-pressed={on} onClick={() => setPicked({ doctorId: doctor.id, day: week[dayIndex], slot })} className={`${slotClass(on)} min-w-[4.6rem] px-3`}>
                            {slot.label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="mt-8 text-note text-muted">
                <p>
                  Приём: {receptionText(doctor)}. Занятые часы скрыты; если ни одно время не подходит, позвоните{" "}
                  <a href={SITE.phoneHref} className="font-semibold text-ink">
                    {SITE.phone}
                  </a>
                  , администратор найдёт окно или поставит в лист ожидания.
                </p>
              </div>
            </>
          )}

          <noscript>
            <ul className="mt-8 flex flex-col gap-3 text-body text-ink">
              {DOCTORS.map((d) => (
                <li key={d.id}>
                  <span className="font-semibold">{d.name}</span>, {d.role.toLowerCase()}: {receptionText(d)}
                </li>
              ))}
            </ul>
          </noscript>
        </div>

        <div className="flex flex-col gap-8 lg:col-start-2">
          <div className="flex-1">
            <p data-doctor-swap className="text-note text-muted">
              {PROBLEMS.find((p) => p.id === problem)?.hint}
            </p>
            <h3 data-doctor-swap className="mt-3 font-display text-title text-ink">
              {doctor.name}
            </h3>
            <p data-doctor-swap className="mt-2 text-body text-ink">
              {doctor.role}. Стаж {doctor.years} лет.
            </p>
            <p data-doctor-swap className="mt-3 max-w-[34ch] text-body text-muted">
              {doctor.about}
            </p>
            <p className="mt-5 text-body text-ink" aria-live="polite">
              {pickedLabel ? `Выбрано: ${pickedLabel}` : "Время пока не выбрано. Можно записаться и без него, администратор подберёт час по телефону."}
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <a
              href="#contact"
              onClick={() => book({ doctorId: doctor.id, time: pickedLabel })}
              className="press flex min-h-16 items-center justify-center bg-ink px-5 text-center text-body font-semibold text-paper hover:bg-ink-deep lg:min-h-[4.5rem]"
            >
              {pickedLabel ? `Записаться на ${pickedLabel}` : "Записаться к врачу"}
            </a>
            <a href={SITE.phoneHref} className="press flex min-h-16 items-center justify-center bg-sky-deep px-5 text-center text-body font-semibold text-ink hover:bg-sheet lg:min-h-[4.5rem]">
              Позвонить {SITE.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
