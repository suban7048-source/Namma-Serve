import React from 'react';
import { useApp } from '../../context/AppContext';
import { mockCategories } from '../../data/mockData';
import { 
  Wrench, Zap, Sparkles, Refrigerator, Paintbrush, 
  Wind, Hammer, Monitor, Home, Grid, ArrowRight 
} from 'lucide-react';

export const CategoryGrid: React.FC = () => {
  const { openDiscoveryWithCategory } = useApp();

  const iconMap: Record<string, React.ReactNode> = {
    Wrench: <Wrench className="w-6 h-6 text-blue-600" />,
    Zap: <Zap className="w-6 h-6 text-amber-500" />,
    Sparkles: <Sparkles className="w-6 h-6 text-teal-500" />,
    Refrigerator: <Refrigerator className="w-6 h-6 text-indigo-500" />,
    Paintbrush: <Paintbrush className="w-6 h-6 text-rose-500" />,
    Wind: <Wind className="w-6 h-6 text-sky-500" />,
    Hammer: <Hammer className="w-6 h-6 text-orange-500" />,
    Monitor: <Monitor className="w-6 h-6 text-purple-500" />,
    Home: <Home className="w-6 h-6 text-emerald-500" />,
    Grid: <Grid className="w-6 h-6 text-slate-500" />
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white via-sky-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
              Popular Categories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Explore Local Service Specialists
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Choose from hundreds of vetted local service experts with transparent pricing and verified ratings.
            </p>
          </div>

          <button
            onClick={() => openDiscoveryWithCategory('All Categories')}
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors group self-start md:self-auto"
          >
            View All Categories
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {mockCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => openDiscoveryWithCategory(cat.name)}
              className="bg-white rounded-2xl p-5 border border-slate-200/70 hover:border-brand-500/40 shadow-soft hover:shadow-card transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-brand-50 transition-all">
                  {iconMap[cat.iconName] || <Grid className="w-6 h-6 text-brand-600" />}
                </div>

                <h3 className="font-bold text-slate-900 text-base group-hover:text-brand-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400">
                  {cat.count}+ pros nearby
                </span>
                <span className="text-xs font-bold text-brand-600 group-hover:translate-x-1 transition-transform">
                  Book →
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
