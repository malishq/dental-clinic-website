import type { Doctor } from "@/lib/data";

export type Slot = { iso: string; label: string; hour: number };
export type Day = { iso: string; weekday: number; short: string; dayNum: number; month: string; closed: boolean; slots: Slot[] };

export const WEEKDAYS_SHORT = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
export const WEEKDAYS_FULL = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];
const MONTHS = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

function hash(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const pad = (n: number) => String(n).padStart(2, "0");
const ymd = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export function weekFor(doctor: Doctor, now: Date): Day[] {
  const days: Day[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    const weekday = d.getDay();
    const iso = ymd(d);
    const ranges = weekday === 0 ? [] : (doctor.grid[weekday as 1 | 2 | 3 | 4 | 5 | 6] ?? []);
    const slots: Slot[] = [];
    for (const [start, end] of ranges) {
      for (let hour = start; hour < end; hour++) {
        if (i === 0 && hour <= now.getHours()) continue;
        if (hash(`${doctor.id}|${iso}|${hour}`) % 10 < 4) continue;
        slots.push({ iso: `${iso}T${pad(hour)}:00`, label: `${hour}:00`, hour });
      }
    }
    days.push({ iso, weekday, short: WEEKDAYS_SHORT[weekday], dayNum: d.getDate(), month: MONTHS[d.getMonth()], closed: weekday === 0, slots });
  }
  return days;
}

export function slotLabel(day: Day, slot: Slot): string {
  return `${day.short}, ${day.dayNum} ${day.month}, ${slot.label}`;
}

export function receptionText(doctor: Doctor): string {
  const parts: string[] = [];
  const byRange = new Map<string, number[]>();
  for (let wd = 1; wd <= 6; wd++) {
    const ranges = doctor.grid[wd as 1 | 2 | 3 | 4 | 5 | 6];
    if (!ranges) continue;
    const key = ranges.map(([a, b]) => `${a}:00–${b}:00`).join(", ");
    byRange.set(key, [...(byRange.get(key) ?? []), wd]);
  }
  for (const [key, wds] of byRange) parts.push(`${wds.map((w) => WEEKDAYS_SHORT[w]).join(", ")} ${key}`);
  return parts.join("; ");
}
