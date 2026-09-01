
export function TechStrip({ items }: { items: readonly string[] }) {
  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-surface py-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface to-transparent"
      />

      <div className="marquee-track flex w-max items-center gap-12 pr-12">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center gap-12 pr-12"
          >
            {items.map((item) => (
              <li
                key={item}
                className="cursor-default text-sm text-muted transition-colors duration-300 hover:text-accent sm:text-base"
              >
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
