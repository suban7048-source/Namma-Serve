import React from 'react';
import { HeroSection } from './HeroSection';
import { CategoryGrid } from './CategoryGrid';
import { EmergencySection } from './EmergencySection';
import { FeaturedProviders } from './FeaturedProviders';
import { TestimonialsSection } from './TestimonialsSection';
import { TrustSection } from './TrustSection';
import { HowItWorks } from './HowItWorks';
import { OffersSection } from './OffersSection';
import { ProviderCTA } from './ProviderCTA';

/**
 * Section order carries a rhythm now: dark hero → light grid → white →
 * light → wash → light → white → wash → dark close. Previously all eight
 * sections used the same centred-heading-over-a-grid layout at the same
 * vertical padding, so the page read as one undifferentiated block.
 */
export const LandingPage: React.FC = () => (
  <div className="overflow-x-hidden">
    <HeroSection />
    <CategoryGrid />
    <EmergencySection />
    <FeaturedProviders />
    <TestimonialsSection />
    <TrustSection />
    <HowItWorks />
    <OffersSection />
    <ProviderCTA />
  </div>
);
