import { HeroSection } from "@/components/hero-section"
import { Navigation } from "@/components/navigation"
import { ExperienceSection } from "@/components/experience-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { TechStackSection } from "@/components/tech-stack-section"
import { FreelancingSection } from "@/components/freelancing-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <TechStackSection />
      <FreelancingSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
