import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline";

const base =
  "btn-shine relative inline-flex items-center justify-center gap-2 " +
  "overflow-hidden rounded-md px-6 py-3 text-sm font-medium " +
  "transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 " +
  "active:scale-[0.98] focus-visible:outline-2 " +
  "focus-visible:outline-offset-2 focus-visible:outline-accent " +
  "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  outline:
    "border border-white/70 text-heading hover:border-accent hover:text-accent",
};

export function Button({
  variant = "primary",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button {...props} className={cn(base, variants[variant], className)} />
  );
}

export function ButtonLink({
  variant = "primary",
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; children: ReactNode }) {
  return (
    <Link {...props} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );
}
