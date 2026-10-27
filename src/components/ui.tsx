import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold transition duration-300 ease-out disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]";

const variants = {
  primary: "bg-accent text-accent-ink hover:bg-accent-strong",
  ghost: "bg-surface text-ink hover:bg-surface-2",
};

type Variant = keyof typeof variants;

export function ButtonLink({ variant = "primary", className = "", ...props }: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link {...props} className={`${base} ${variants[variant]} ${className}`} />;
}

export function Button({ variant = "primary", className = "", ...props }: ComponentProps<"button"> & { variant?: Variant }) {
  return <button {...props} className={`${base} ${variants[variant]} ${className}`} />;
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`scroll-mt-20 py-20 sm:py-28 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
