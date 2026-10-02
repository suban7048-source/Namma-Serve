import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ProviderCard } from './ProviderCard';
import { FilterSidebar } from './FilterSidebar';
import { FilterMobileModal } from './FilterMobileModal';
import { ProviderCardSkeleton } from '../common/Skeleton';
import { KolamEmptyState } from '../common/Kolam';
import { 
  Search, SlidersHorizontal, LayoutGrid, List, 
  RotateCcw, Sparkles, AlertCircle, ArrowUpDown 
} from 'lucide-react';

export const DiscoveryPage: React.FC = () => {
  const { providers, filters, setFilters, resetFilters } = useApp();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate subtle loading state when filters change for smooth UX
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 250);
    return () => clearTimeout(timer);
  }, [filters]);

  // Filter & Sort Logic
  const filteredProviders = useMemo(() => {
    return providers.filter(p => {
      // Search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesCategory = p.category.toLowerCase().includes(query);
        const matchesBio = p.bio.toLowerCase().includes(query);
        const matchesServices = p.offeredServices.some(s => s.name.toLowerCase().includes(query));
        if (!matchesName && !matchesCategory && !matchesBio && !matchesServices) {
          return false;
        }
      }

      // Category
      if (filters.category !== 'All Categories' && p.category !== filters.category) {
        return false;
      }

      // Location — match against location and serviceAreas
      if (filters.location !== 'All Locations') {
        const locKeyword = filters.location.split(/[\/,]/)[0].trim().toLowerCase();
        const inLocation = p.location.toLowerCase().includes(locKeyword);
        const inServiceArea = p.serviceAreas.some(a => a.toLowerCase().includes(locKeyword));
        if (!inLocation && !inServiceArea) {
          return false;
        }
      }

      // Max price
      if (p.startingPrice > filters.maxPrice) {
        return false;
      }

      // Min rating
      if (p.rating < filters.minRating) {
        return false;
      }

      // Max distance (km)
      if (p.distanceKm > filters.maxDistance) {
        return false;
      }

      // Emergency only
      if (filters.emergencyOnly) {
        const emergencyCategories = ['AC Repair & Service', 'Electrical', 'Plumbing', 'Appliance Repair'];
        if (!emergencyCategories.includes(p.category)) {
          return false;
        }
      }

      // Verified only
      if (filters.verifiedOnly && !p.isVerified) {
        return false;
      }

      // Availability
      if (filters.availability === 'today' && !p.nextAvailable.toLowerCase().includes('today')) {
        return false;
      }
      if (filters.availability === 'tomorrow' && !p.nextAvailable.toLowerCase().includes('tomorrow')) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'price') return a.startingPrice - b.startingPrice;
      if (filters.sortBy === 'distance') return a.distanceKm - b.distanceKm;
      if (filters.sortBy === 'eta') return a.etaMinutes - b.etaMinutes;
      return b.reviewCount - a.reviewCount; // relevance
    });
  }, [providers, filters]);

  return (
    <div className="py-8 bg-gradient-to-b from-brand-50/40 via-white to-kolam-wash min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Search Bar */}
        <div className="bg-kolam-surface rounded-2xl p-6 border border-ns-border/80 shadow-soft mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ns-navy tracking-tight">
                Find Local Professionals
              </h1>
              <p className="text-xs sm:text-sm text-ns-text-secondary mt-0.5">
                Compare verified service experts, read ratings, and schedule instant bookings.
              </p>
            </div>

            {/* Top Search Bar */}
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 text-ns-text-secondary absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search plumbing, electrician, Marcus..."
                value={filters.searchQuery}
                onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                className="w-full bg-kolam-wash border border-ns-border focus:border-brand-500 focus:bg-white text-xs font-medium rounded-2xl py-3 pl-10 pr-4 text-ns-navy focus:outline-none transition-all"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
                  className="absolute right-3 top-3 text-xs text-ns-text-secondary hover:text-ns-text-secondary font-semibold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Active Filter Chips */}
          <div className="flex items-center justify-between pt-3 border-t border-kolam-sunk flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-ns-text-secondary text-[11px] uppercase tracking-wider">Active:</span>
              <span className="px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700 font-semibold border border-brand-100">
                {filters.category}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-kolam-sunk text-ns-text font-medium">
                {filters.location}
              </span>
              {filters.verifiedOnly && (
                <span className="px-2.5 py-1 rounded-lg bg-kolam-teal-soft text-kolam-teal font-semibold border border-kolam-teal-soft">
                  Verified Only
                </span>
              )}
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 bg-brand-600 text-white px-3 py-1.5 rounded-xl font-semibold text-xs shadow-sm"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
            </button>
          </div>
        </div>

        {/* Main Content Grid (Sidebar + Results) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-4 shrink-0">
            <div className="sticky top-28">
              <FilterSidebar />
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Sorting & Layout Toggle Bar */}
            <div className="flex items-center justify-between bg-kolam-surface rounded-2xl p-4 border border-ns-border/80 shadow-soft text-xs font-semibold text-ns-text-secondary">
              <p className="text-ns-navy font-semibold">
                Showing <span className="text-brand-600 font-semibold">{filteredProviders.length}</span> verified providers
              </p>

              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-1.5">
                  <ArrowUpDown className="w-3.5 h-3.5 text-ns-text-secondary" />
                  <span className="hidden sm:inline">Sort:</span>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                    className="bg-kolam-wash border border-ns-border rounded-xl px-2.5 py-1.5 text-xs font-semibold text-ns-navy focus:outline-none cursor-pointer"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price">Lowest Price</option>
                    <option value="distance">Closest Distance</option>
                    <option value="eta">Fastest ETA</option>
                  </select>
                </div>

                {/* Grid / List view switcher */}
                <div className="flex items-center bg-kolam-sunk p-1 rounded-xl border border-ns-border/60">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-white text-ns-navy shadow-sm' : 'text-ns-text-secondary hover:text-ns-text-secondary'
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-white text-ns-navy shadow-sm' : 'text-ns-text-secondary hover:text-ns-text-secondary'
                    }`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Provider Grid / List View */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProviderCardSkeleton />
                <ProviderCardSkeleton />
                <ProviderCardSkeleton />
              </div>
            ) : filteredProviders.length === 0 ? (
              <div className="bg-kolam-surface rounded-2xl border border-ns-border max-w-lg mx-auto">
                <KolamEmptyState
                  title="Nobody matches all of those filters"
                  description="Try widening the distance, lowering the minimum rating, or clearing the filters to see everyone working nearby."
                  action={
                    <button
                      onClick={resetFilters}
                      className="bg-ns-primary hover:bg-ns-primary-bright text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors inline-flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-4 h-4" /> Clear all filters
                    </button>
                  }
                />
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredProviders.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Mobile Filter Sheet Modal */}
      <FilterMobileModal
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
      />
    </div>
  );
};
