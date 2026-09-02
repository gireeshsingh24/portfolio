import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import type { StackGroup } from "@/features/about/types";

/**
 * §51 — grouped stack rather than a flat logo wall.
 *
 * Grouping communicates how the pieces relate; a wall of logos communicates
 * only that many words are known.
 */
export function StackSection({ groups }: { groups: StackGroup[] }) {
  return (
    <section id="stack" className="py-20 md:py-28">
      <Container>
        <div data-reveal>
          <SectionHeading>Technical Stack</SectionHeading>
        </div>

        <dl className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, index) => (
            <div
              key={group.id}
              data-reveal
              style={
                {
                  "--reveal-delay": `${(index % 3) * 90}ms`,
                } as React.CSSProperties
              }
            >
              <dt className="text-sm font-semibold text-accent">
                {group.label}
              </dt>
              <dd>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Tag label={item} />
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
