"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui";

type Status = "idle" | "sending" | "sent" | "error";

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

export function ContactForm({ services = [] as string[], title = "Оставить заявку" }: { services?: string[]; title?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-3xl bg-surface p-8" role="status">
        <p className="font-display text-2xl font-semibold text-ink">Заявка отправлена</p>
        <p className="mt-2 text-muted">Перезвоним в ближайшее время и подтвердим время.</p>
        <Button type="button" variant="ghost" className="mt-6" onClick={() => setStatus("idle")}>
          Отправить ещё одну
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-3xl bg-surface p-6 sm:p-8">
      <p className="font-display text-2xl font-semibold text-ink">{title}</p>
      <div className="mt-6 grid gap-4">
        <label className="grid gap-1.5">
          <span className="text-sm font-medium text-ink">Имя</span>
          <input name="name" autoComplete="name" className="h-12 rounded-2xl bg-ground px-4 text-ink outline-none ring-accent focus:ring-2" />
          {errors.name && <span className="text-sm text-accent">{errors.name}</span>}
        </label>
        <label className="grid gap-1.5">
          <span className="text-sm font-medium text-ink">Телефон</span>
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+7" className="h-12 rounded-2xl bg-ground px-4 text-ink outline-none ring-accent focus:ring-2" />
          {errors.phone && <span className="text-sm text-accent">{errors.phone}</span>}
        </label>
        {services.length > 0 && (
          <label className="grid gap-1.5">
            <span className="text-sm font-medium text-ink">Услуга</span>
            <select name="service" className="h-12 rounded-2xl bg-ground px-4 text-ink outline-none ring-accent focus:ring-2">
              {services.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
        )}
        <label className="grid gap-1.5">
          <span className="text-sm font-medium text-ink">Комментарий</span>
          <textarea name="comment" rows={3} className="rounded-2xl bg-ground px-4 py-3 text-ink outline-none ring-accent focus:ring-2" />
        </label>
      </div>
      {status === "error" && (
        <p className="mt-4 text-sm text-accent" role="alert">
          Не удалось отправить. Позвоните нам или попробуйте ещё раз.
        </p>
      )}
      <Button type="submit" className="mt-6 w-full sm:w-auto" disabled={status === "sending"}>
        {status === "sending" ? "Отправляем…" : "Отправить"}
      </Button>
      <p className="mt-3 text-xs text-muted">Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</p>
    </form>
  );
}
