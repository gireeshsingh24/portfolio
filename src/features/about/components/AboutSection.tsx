import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { serviceIcons } from "@/components/ui/icons";
import type { Profile } from "@/features/about/types";

export function AboutSection({ profile }: { profile: Profile }) {
  return (
    // Asymmetric padding: the bottom value stacks with the Projects section's
    // top padding, so keeping py-28 on both sides doubled the visible gap.
    <section id="about" className="pt-20 pb-10 md:pt-28 md:pb-14">
      <Container className="grid gap-16 md:grid-cols-2">
        <ul className="flex flex-col gap-10">
          {profile.services.map((service, index) => {
            const Icon = serviceIcons[service.icon];
            return (
              <li
                key={service.id}
                data-reveal
                style={
                  { "--reveal-delay": `${index * 120}ms` } as React.CSSProperties
                }
                className="group flex items-center gap-5 border-l-2 border-accent pl-6 transition-transform duration-300 hover:translate-x-2"
              >
                <Icon className="h-9 w-9 shrink-0 text-heading transition-colors duration-300 group-hover:text-accent" />
                <span className="font-medium text-heading">{service.title}</span>
              </li>
            );
          })}
        </ul>

        <div>
          <h2
            data-reveal
            className="text-3xl font-bold text-heading sm:text-4xl"
          >
            About me
          </h2>

          <p
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            className="mt-6 max-w-prose text-sm leading-relaxed text-body"
          >
            {profile.about}
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3">
            {profile.stats.map((stat, index) => (
              <div
                key={stat.id}
                data-reveal
                style={
                  {
                    "--reveal-delay": `${240 + index * 120}ms`,
                  } as React.CSSProperties
                }
              >
                <dd className="text-3xl font-bold text-heading">
                  <CountUp value={stat.value} />
                  <span className="ml-1 text-accent">{stat.suffix}</span>
                </dd>
                <dt className="mt-2 text-xs text-muted">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
