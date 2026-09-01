/** Centered section title with the accent rule beneath it. */
export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-3xl font-bold text-heading sm:text-4xl">{children}</h2>
      <span aria-hidden className="h-12 w-px bg-accent" />
    </div>
  );
}
