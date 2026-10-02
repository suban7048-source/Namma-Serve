import React from 'react';
import { useApp } from '../../context/AppContext';
import { HeroSection } from './HeroSection';
import { CategoryGrid } from './CategoryGrid';
import { EmergencySection } from './EmergencySection';
import { FeaturedProviders } from './FeaturedProviders';
import { OffersSection } from './OffersSection';
import { HowItWorks } from './HowItWorks';
import { TrustSection } from './TrustSection';
import { TestimonialsSection } from './TestimonialsSection';

export const LandingPage: React.FC = () => {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <CategoryGrid />
      <EmergencySection />
      <FeaturedProviders />
      <TrustSection />
      <HowItWorks />
      <OffersSection />
      <TestimonialsSection />
    </div>
  );
};
