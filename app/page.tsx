'use client'

import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import ParticleCanvas from '@/components/effects/ParticleCanvas';
import BackgroundOverlay from '@/components/effects/BackgroundOverlay';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import SolutionsSection from '@/components/sections/SolutionsSection';
import DemoSection from '@/components/sections/DemoSection';
import PricingSection from '@/components/sections/PricingSection';
import DocumentationSection from '@/components/sections/DocumentationSection';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Home() {
  const { activeSection, scrollToSection } = useScrollAnimation();

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Animated Canvas Background */}
      <ParticleCanvas />

      {/* Animated Background Overlay */}
      <BackgroundOverlay />

      {/* Content with higher z-index */}
      <div className="relative z-10">
        {/* Navigation */}
        <Navigation 
          activeSection={activeSection} 
          onSectionClick={scrollToSection} 
        />

        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Solutions Section */}
        <SolutionsSection />

        {/* Demo Section */}
        <DemoSection />

        {/* Pricing Section */}
        <PricingSection />

        {/* Documentation Section */}
        <DocumentationSection />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}