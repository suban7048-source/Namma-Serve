import React from 'react';
import { useApp } from '../../context/AppContext';
import { mockCategories } from '../../data/mockData';
import { Search, MapPin, SlidersHorizontal, RotateCcw, ShieldCheck, Star } from 'lucide-react';

export const FilterSidebar: React.FC = () => {
  const { filters, setFilters, resetFilters } = useApp();

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-soft space-y-6">
      
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-brand-600" />
          <h3 className="font-extrabold text-slate-900 text-base">Filter Pros</h3>
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
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">Category</label>
        <select
          value={filters.category}
          onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-500 cursor-pointer"
        >
          <option value="All Categories">All Categories</option>
          {mockCategories.map((c) => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Location Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">Service Location</label>
        <div className="relative">
          <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <select
            value={filters.location}
            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-500 cursor-pointer"
          >
            <option value="All Locations">All Locations</option>
            <option value="Anna Nagar">Anna Nagar, Chennai</option>
            <option value="T. Nagar">T. Nagar, Chennai</option>
            <option value="Adyar">Adyar, Chennai</option>
            <option value="Velachery">Velachery, Chennai</option>
            <option value="Ambattur">Ambattur, Chennai</option>
            <option value="OMR">OMR / Sholinganallur, Chennai</option>
          </select>
        </div>
      </div>

      {/* Availability Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">Availability</label>
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
                  ? 'bg-brand-50 border-brand-500 text-brand-700 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
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
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">Max Price</label>
          <span className="text-xs font-extrabold text-brand-600">₹{filters.maxPrice}</span>
        </div>
        <input
          type="range"
          min="50"
          max="500"
          step="25"
          value={filters.maxPrice}
          onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="w-full accent-brand-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
          <span>₹50</span>
          <span>₹500+</span>
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">Minimum Rating</label>
        <div className="flex items-center gap-1.5 flex-wrap">
          {[0, 4.0, 4.5, 4.8].map((rate) => (
            <button
              key={rate}
              onClick={() => setFilters(prev => ({ ...prev, minRating: rate }))}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1 ${
                filters.minRating === rate
                  ? 'bg-amber-50 border-amber-400 text-amber-900 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {rate === 0 ? 'All Ratings' : `${rate}+`}
              {rate > 0 && <Star className="w-3 h-3 fill-amber-400 text-amber-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* Max Distance Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">Max Distance</label>
          <span className="text-xs font-bold text-slate-700">{filters.maxDistance} miles</span>
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
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span className="text-xs font-bold text-slate-800">Verified Pros Only</span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={(e) => setFilters(prev => ({ ...prev, verifiedOnly: e.target.checked }))}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500" />
        </label>
      </div>

    </div>
  );
};
