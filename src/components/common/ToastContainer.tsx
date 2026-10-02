import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-kolam-teal shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-kolam-kumkum shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-kolam-marigold shrink-0" />,
          info: <Info className="w-5 h-5 text-brand-500 shrink-0" />
        };

        const borderColors = {
          success: 'border-l-kolam-teal',
          error: 'border-l-kolam-kumkum',
          warning: 'border-l-kolam-marigold',
          info: 'border-l-brand-500'
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto bg-kolam-surface border border-ns-border border-l-4 ${borderColors[toast.type]} shadow-elevated rounded-xl p-4 flex items-start justify-between gap-3 animate-fade-in`}
          >
            <div className="flex items-start gap-3">
              {icons[toast.type]}
              <div>
                <p className="font-semibold text-ns-navy text-sm">{toast.title}</p>
                {toast.message && (
                  <p className="text-xs text-ns-text-secondary mt-0.5">{toast.message}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-ns-text-secondary hover:text-ns-navy transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
