"use client";

import { useState, type FormEvent } from "react";
import { useBooking } from "@/components/BookingContext";
import { DOCTORS } from "@/lib/data";

type Status = "idle" | "sending" | "sent" | "error";

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

export function ContactForm() {
  const { booking } = useBooking();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [doctorId, setDoctorId] = useState("any");
  const [time, setTime] = useState("");
  const [seenStamp, setSeenStamp] = useState(0);

  if (booking.stamp !== seenStamp) {
    setSeenStamp(booking.stamp);
    setDoctorId(booking.doctorId ?? "any");
    setTime(booking.time ?? "");
    setStatus("idle");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const next: Record<string, string> = {};
    if (!data.name?.trim()) next.name = "Как к вам обращаться?";
    if (!/^\+?[\d\s()-]{10,18}$/.test(data.phone ?? "")) next.phone = "Введите номер телефона";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
        if (!res.ok) throw new Error(String(res.status));
      } else {
        await new Promise((r) => setTimeout(r, 700));
      }
      setStatus("sent");
      form.reset();
      setTime("");
      setDoctorId("any");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex min-h-[18rem] flex-col justify-center" role="status">
        <p className="font-display text-title leading-tight text-paper">Заявка отправлена</p>
        <p className="mt-3 text-body text-paper">Администратор перезвонит в течение рабочего дня, подтвердит время и ответит на вопросы.</p>
        <button type="button" onClick={() => setStatus("idle")} className="press mt-6 self-start bg-sky px-5 py-3 text-body font-semibold text-ink hover:bg-sheet">
          Отправить ещё одну
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-2.5" aria-label="Форма записи на приём">
      <label className="block">
        <span className="sr-only">Имя</span>
        <input name="name" autoComplete="name" placeholder="Имя" className="field" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "err-name" : undefined} />
        {errors.name && (
          <span id="err-name" className="mt-1 block text-small text-sky">
            {errors.name}
          </span>
        )}
      </label>
      <label className="block">
        <span className="sr-only">Телефон</span>
        <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Телефон" className="field" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "err-phone" : undefined} />
        {errors.phone && (
          <span id="err-phone" className="mt-1 block text-small text-sky">
            {errors.phone}
          </span>
        )}
      </label>
      <label className="block">
        <span className="sr-only">Врач</span>
        <select name="doctor" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} className="field">
          <option value="any">Любой врач</option>
          {DOCTORS.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}, {d.role.toLowerCase()}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="sr-only">Удобное время</span>
        <input name="time" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Удобное время" className="field" />
      </label>
      <label className="block">
        <span className="sr-only">Комментарий</span>
        <textarea name="comment" rows={2} placeholder="Что беспокоит" className="field" />
      </label>
      {status === "error" && (
        <p className="text-small text-sky" role="alert">
          Не удалось отправить. Позвоните нам или попробуйте ещё раз.
        </p>
      )}
      <button type="submit" disabled={status === "sending"} className="press mt-1 min-h-14 w-full bg-ink-deep text-body font-semibold text-paper hover:bg-black disabled:opacity-60">
        {status === "sending" ? "Отправляем…" : "Записаться"}
      </button>
      <p className="text-small text-sky">Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</p>
    </form>
  );
}
