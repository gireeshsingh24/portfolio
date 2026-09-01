export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.18]">
        <div
          className="animate-grid-pan absolute inset-x-0 -top-16 h-[calc(100%+8rem)]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 75%)",
          }}
        />
      </div>

      <div
        className="animate-spin-slow absolute -left-1/4 top-0 h-[70vh] w-[70vh] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "conic-gradient(from 0deg, transparent, var(--color-accent), transparent 60%)",
        }}
      />
      <div
        className="animate-spin-slower absolute -right-1/4 top-1/2 h-[60vh] w-[60vh] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "conic-gradient(from 180deg, transparent, #4f7cff, transparent 55%)",
        }}
      />
      <div className="absolute left-1/2 top-1/3 h-0 w-0">
        {[
          { radius: 180, delay: "0s", size: 4 },
          { radius: 260, delay: "-6s", size: 3 },
          { radius: 320, delay: "-12s", size: 5 },
        ].map((mote) => (
          <span
            key={mote.radius}
            className="animate-orbit absolute block rounded-full bg-accent"
            style={
              {
                "--orbit-radius": `${mote.radius}px`,
                width: mote.size,
                height: mote.size,
                animationDelay: mote.delay,
                boxShadow: "0 0 12px 2px var(--color-accent)",
                opacity: 0.5,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
