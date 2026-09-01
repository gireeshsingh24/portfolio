import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { ScrollRevealProvider } from "@/components/layout/ScrollRevealProvider";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { TechStrip } from "@/components/layout/TechStrip";
import { getProfile, getProjects } from "@/data/repository";
import { AboutSection } from "@/features/about/components/AboutSection";
import { ContactSection } from "@/features/contact/components/ContactSection";
import { HeroSection } from "@/features/hero/components/HeroSection";
import { ProjectsSection } from "@/features/projects/components/ProjectsSection";

export default async function HomePage() {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()]);

  return (
    <>
      <AmbientBackground />
      <ScrollRevealProvider />
      <SiteHeader name={profile.name} />

      <main className="flex-1">
        <HeroSection profile={profile} />
        <TechStrip items={profile.technologies} />
        <AboutSection profile={profile} />
        <ProjectsSection projects={projects} />
        <ContactSection />
      </main>

      <SiteFooter profile={profile} />
    </>
  );
}
