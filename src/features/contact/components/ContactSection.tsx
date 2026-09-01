import { Container } from "@/components/ui/Container";
import { ContactForm } from "./ContactForm";

export function ContactSection() {
  return (
    <section id="contacts" className="py-20 md:py-28">
      <Container>
        <p data-reveal className="flex items-center gap-4 text-sm text-body">
          <span aria-hidden className="h-px w-16 bg-accent" />
          Contacts
        </p>

        <div className="mt-10 grid gap-14 md:grid-cols-2">
          <h2
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            className="text-3xl font-bold leading-tight text-heading sm:text-5xl"
          >
            Have a project?
            <br />
            Let&apos;s talk!
          </h2>

          <div
            data-reveal
            style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
          >
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
