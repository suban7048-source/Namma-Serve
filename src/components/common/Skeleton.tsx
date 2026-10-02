import React from 'react';

export const ProviderCardSkeleton: React.FC = () => {
  return (
    <div className="bg-kolam-surface rounded-2xl border border-kolam-sunk p-5 shadow-sm animate-pulse space-y-4">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-2xl bg-ns-border" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-ns-border rounded w-3/4" />
          <div className="h-3 bg-ns-border rounded w-1/2" />
          <div className="h-3 bg-ns-border rounded w-1/3" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-ns-border rounded w-full" />
        <div className="h-3 bg-ns-border rounded w-4/5" />
      </div>
      <div className="pt-3 border-t border-kolam-sunk flex items-center justify-between">
        <div className="h-6 bg-ns-border rounded w-24" />
        <div className="h-9 bg-ns-border rounded-xl w-28" />
      </div>
    </div>
  );
};
