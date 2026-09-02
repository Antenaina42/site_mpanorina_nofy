import HeroSection from '@/sections/home/HeroSection';
import IntroSection from '@/sections/home/IntroSection';
import StatsSection from '@/sections/home/StatsSection';
import ServicesSection from '@/sections/home/ServicesSection';
import ApproachSection from '@/sections/home/ApproachSection';
import ProjectsSection from '@/sections/home/ProjectsSection';
import VideoSection from '@/sections/home/VideoSection';
import ExpertiseSection from '@/sections/home/ExpertiseSection';
import ProcessSection from '@/sections/home/ProcessSection';
import CTASection from '@/sections/home/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <StatsSection />
      <ServicesSection />
      <ApproachSection />
      <ProjectsSection />
      <VideoSection />
      <ExpertiseSection />
      <ProcessSection />
      <CTASection />
    </>
  );
}
