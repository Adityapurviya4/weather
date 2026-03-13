import CustomCursor from "@/components/CustomCursor";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TechLogosShowcase from "@/components/TechLogosShowcase";
import AboutTeaser from "@/components/AboutTeaser";
import AboutSection from "@/components/AboutSection";
import TechSection from "@/components/TechSection";
import ExperienceSection from "@/components/ExperienceSection";
import CodingStats from "@/components/CodingStats";
import WorksSection from "@/components/WorksSection";
import Ticker from "@/components/Ticker";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <CustomCursor />
      <BackgroundCanvas />
      <Navbar />
      <HeroSection />
      <TechLogosShowcase />
      <AboutTeaser />
      <AboutSection />
      <TechSection />
      <ExperienceSection />
      <CodingStats />
      <WorksSection />
      <Ticker />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Index;
