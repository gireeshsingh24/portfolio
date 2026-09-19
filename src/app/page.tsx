import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { ScrollRevealProvider } from "@/components/layout/ScrollRevealProvider";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { TechStrip } from "@/components/layout/TechStrip";
import {
  getCapabilities,
  getProcessSteps,
  getProfile,
  getProjects,
  getServices,
  getStackGroups,
} from "@/data/repository";
import { AboutSection } from "@/features/about/components/AboutSection";
import { ChatWidget } from "@/features/chat/components/ChatWidget";
import { ContactSection } from "@/features/contact/components/ContactSection";
import { HeroSection } from "@/features/hero/components/HeroSection";
import { CapabilitiesSection } from "@/features/engineering/components/CapabilitiesSection";
import { ProcessSection } from "@/features/engineering/components/ProcessSection";
import { StackSection } from "@/features/engineering/components/StackSection";
import { ProjectsSection } from "@/features/projects/components/ProjectsSection";
import { ServicesSection } from "@/features/services/components/ServicesSection";

export default async function HomePage() {
  const [profile, projects, services, capabilities, stackGroups, processSteps] =
    await Promise.all([
      getProfile(),
      getProjects(),
      getServices(),
      getCapabilities(),
      getStackGroups(),
      getProcessSteps(),
    ]);

  // The mail social carries a "mailto:" href; the widget needs the address.
  const contactEmail =
    profile.socials
      .find((social) => social.icon === "mail")
      ?.href.replace(/^mailto:/, "") ?? "";

  return (
    <>
      <JsonLd
        profile={profile}
        skills={stackGroups.flatMap((group) => group.items)}
      />
      <AmbientBackground />
      <ScrollRevealProvider />
      <SiteHeader name={profile.name} />

      <main id="main" className="flex-1">
        <HeroSection
          profile={profile}
          skills={[
            ...new Set([
              ...profile.technologies,
              ...stackGroups.flatMap((group) => group.items),
            ]),
          ]}
        />
        <TechStrip items={profile.technologies} />
        <AboutSection profile={profile} />
        <ServicesSection services={services} />
        <ProjectsSection projects={projects} />
        <CapabilitiesSection capabilities={capabilities} projects={projects} />
        <ProcessSection steps={processSteps} />
        <StackSection groups={stackGroups} />
        <ContactSection />
      </main>

      <SiteFooter profile={profile} />

      {/* Outside <main>: it floats over the page and is not part of the
          document's reading order. */}
      <ChatWidget
        email={contactEmail}
        whatsapp={profile.whatsapp}
        portfolioUrl={profile.resumeUrl}
      />
    </>
  );
}
