"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const links = [
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Work" },
  { href: "#engineering", label: "Engineering" },
  { href: "#about", label: "About" },
  { href: "#contacts", label: "Contact" },
] as const;

export function SiteHeader({ name }: { name: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-bg/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="#home" className="font-semibold text-heading">
          {name}
        </Link>

        <nav aria-label="Main" className="hidden gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-body transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="text-heading md:hidden"
        >
          <span aria-hidden className="text-xl">
            {open ? "✕" : "☰"}
          </span>
        </button>
      </Container>

      <div
        id="mobile-nav"
        hidden={!open}
        className={cn("border-t border-white/5 bg-surface md:hidden")}
      >
        <Container className="flex flex-col py-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 text-sm text-body transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </Container>
      </div>
    </header>
  );
}
