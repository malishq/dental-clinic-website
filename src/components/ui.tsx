import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const base =
  "press inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-body font-semibold disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary: "bg-accent text-sheet hover:bg-accent-strong",
  ink: "bg-ink text-paper hover:bg-ink-deep",
  ghost: "bg-sky text-ink hover:bg-sky-deep",
};

type Variant = keyof typeof variants;

export function ButtonLink({ variant = "primary", className = "", ...props }: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link {...props} className={`${base} ${variants[variant]} ${className}`} />;
}

export function Button({ variant = "primary", className = "", ...props }: ComponentProps<"button"> & { variant?: Variant }) {
  return <button {...props} className={`${base} ${variants[variant]} ${className}`} />;
}

export function TextLink({ className = "", ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={`font-semibold text-ink underline decoration-sky-deep decoration-2 underline-offset-[0.25em] transition-colors duration-200 hover:decoration-accent ${className}`}
    />
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`wrap w-full ${className}`}>{children}</div>;
}
