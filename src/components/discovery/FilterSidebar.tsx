import React from 'react';
import { useApp } from '../../context/AppContext';
import { mockCategories } from '../../data/mockData';
import { Search, MapPin, SlidersHorizontal, RotateCcw, ShieldCheck, Star } from 'lucide-react';

export const FilterSidebar: React.FC = () => {
  const { filters, setFilters, resetFilters } = useApp();

  return (
    <div className="bg-kolam-surface rounded-2xl border border-ns-border/80 p-6 shadow-soft space-y-6">
      
      <div className="flex items-center justify-between pb-4 border-b border-kolam-sunk">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-brand-600" />
          <h3 className="font-display font-semibold text-ns-navy text-base">Filter Pros</h3>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs text-brand-600 hover:text-brand-700 font-semibold flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-ns-navy uppercase tracking-wide">Category</label>
        <select
          value={filters.category}
          onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
          className="w-full bg-kolam-wash border border-ns-border rounded-xl p-2.5 text-xs font-semibold text-ns-navy focus:outline-none focus:border-brand-500 cursor-pointer"
        >
          <option value="All Categories">All Categories</option>
          {mockCategories.map((c) => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Location Filter */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-ns-navy uppercase tracking-wide">Service Location</label>
        <div className="relative">
          <MapPin className="w-4 h-4 text-ns-text-secondary absolute left-3 top-3" />
          <select
            value={filters.location}
            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
            className="w-full bg-kolam-wash border border-ns-border rounded-xl py-2.5 pl-9 pr-3 text-xs font-semibold text-ns-navy focus:outline-none focus:border-brand-500 cursor-pointer"
          >
            <option value="All Locations">All Locations</option>
            <option value="Anna Nagar">Anna Nagar</option>
            <option value="T. Nagar">T. Nagar</option>
            <option value="Adyar">Adyar</option>
            <option value="Velachery">Velachery</option>
            <option value="Tambaram">Tambaram</option>
            <option value="OMR">OMR</option>
            <option value="Sholinganallur">Sholinganallur</option>
            <option value="Perungudi">Perungudi</option>
            <option value="Guindy">Guindy</option>
            <option value="Porur">Porur</option>
            <option value="Ambattur">Ambattur</option>
            <option value="Thoraipakkam">Thoraipakkam</option>
            <option value="Medavakkam">Medavakkam</option>
            <option value="Pallavaram">Pallavaram</option>
            <option value="Chromepet">Chromepet</option>
          </select>
        </div>
      </div>

      {/* Availability Filter */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-ns-navy uppercase tracking-wide">Availability</label>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            { id: 'all', label: 'Anytime' },
            { id: 'today', label: 'Today' },
            { id: 'tomorrow', label: 'Tomorrow' },
            { id: 'this-week', label: 'This Week' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilters(prev => ({ ...prev, availability: item.id }))}
              className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                filters.availability === item.id
                  ? 'bg-brand-50 border-brand-500 text-brand-700 font-semibold'
                  : 'bg-kolam-wash border-ns-border text-ns-text-secondary hover:bg-kolam-sunk'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-ns-navy uppercase tracking-wide">Max Price</label>
          <span className="text-xs font-semibold text-brand-600">₹{filters.maxPrice}</span>
        </div>
        <input
          type="range"
          min="99"
          max="5000"
          step="100"
          value={filters.maxPrice}
          onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="w-full accent-brand-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-ns-text-secondary font-semibold">
          <span>₹99</span>
          <span>₹5000+</span>
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-ns-navy uppercase tracking-wide">Minimum Rating</label>
        <div className="flex items-center gap-1.5 flex-wrap">
          {[0, 4.0, 4.5, 4.8].map((rate) => (
            <button
              key={rate}
              onClick={() => setFilters(prev => ({ ...prev, minRating: rate }))}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1 ${
                filters.minRating === rate
                  ? 'bg-kolam-marigold-soft border-kolam-marigold text-kolam-marigold font-semibold'
                  : 'bg-kolam-wash border-ns-border text-ns-text-secondary hover:bg-kolam-sunk'
              }`}
            >
              {rate === 0 ? 'All Ratings' : `${rate}+`}
              {rate > 0 && <Star className="w-3 h-3 fill-kolam-marigold text-kolam-marigold" />}
            </button>
          ))}
        </div>
      </div>

      {/* Max Distance Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-ns-navy uppercase tracking-wide">Max Distance</label>
          <span className="text-xs font-semibold text-ns-text">{filters.maxDistance} km</span>
        </div>
        <input
          type="range"
          min="1"
          max="50"
          value={filters.maxDistance}
          onChange={(e) => setFilters(prev => ({ ...prev, maxDistance: Number(e.target.value) }))}
          className="w-full accent-brand-600 cursor-pointer"
        />
      </div>

      {/* Verified Only Toggle */}
      <div className="pt-3 border-t border-kolam-sunk flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-kolam-teal" />
          <span className="text-xs font-semibold text-ns-navy">Verified Pros Only</span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={(e) => setFilters(prev => ({ ...prev, verifiedOnly: e.target.checked }))}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-ns-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-ns-border after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-kolam-teal" />
        </label>
      </div>

      {/* Emergency Only Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">🚨</span>
          <span className="text-xs font-semibold text-ns-navy">Emergency Only (24/7)</span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={filters.emergencyOnly}
            onChange={(e) => setFilters(prev => ({ ...prev, emergencyOnly: e.target.checked }))}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-ns-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-ns-border after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-kolam-kumkum" />
        </label>
      </div>

    </div>
  );
};
