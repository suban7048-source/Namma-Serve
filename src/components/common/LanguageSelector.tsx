import React from 'react';
import { useApp } from '../../context/AppContext';
import { Globe } from 'lucide-react';
import { Language } from '../../types';

export const LanguageSelector: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, setLanguage } = useApp();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      <Globe className="w-4 h-4 text-ns-text-secondary absolute left-2 pointer-events-none" aria-hidden="true" />
      <select
        value={language}
        onChange={handleLanguageChange}
        className="pl-8 pr-6 py-1.5 bg-transparent border border-ns-border rounded-full text-sm font-medium text-ns-navy hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-kolam-marigold cursor-pointer appearance-none transition-colors"
        aria-label="Select Language"
      >
        <option value="en">English</option>
        <option value="ta">தமிழ்</option>
        <option value="hi">हिन्दी</option>
        <option value="ml">മലയാളം</option>
      </select>
      {/* Custom dropdown arrow to match appearance-none */}
      <div className="absolute right-3 pointer-events-none text-ns-text-secondary">
        <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
        </svg>
      </div>
    </div>
  );
};
