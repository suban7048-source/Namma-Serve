import React from 'react';
import { FilterSidebar } from './FilterSidebar';
import { X } from 'lucide-react';

interface FilterMobileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FilterMobileModal: React.FC<FilterMobileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-ns-navy/60 backdrop-blur-sm animate-fade-in lg:hidden">
      <div className="bg-kolam-surface rounded-t-3xl sm:rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-elevated border border-kolam-sunk relative animate-slide-up">
        
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-kolam-sunk">
          <h3 className="font-display font-semibold text-ns-navy text-lg">Filter Service Providers</h3>
          <button
            onClick={onClose}
            className="p-2 text-ns-text-secondary hover:text-ns-text-secondary rounded-full hover:bg-kolam-sunk"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <FilterSidebar />

        <div className="pt-6">
          <button
            onClick={onClose}
            className="w-full bg-brand-600 text-white font-semibold py-3.5 rounded-2xl text-sm shadow-md"
          >
            Show Results
          </button>
        </div>

      </div>
    </div>
  );
};
