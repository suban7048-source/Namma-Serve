import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  const variantStyles = {
    danger: 'bg-kolam-kumkum hover:bg-kolam-kumkum text-white focus:ring-kolam-kumkum',
    warning: 'bg-kolam-marigold hover:bg-kolam-marigold text-white focus:ring-kolam-marigold',
    info: 'bg-brand-600 hover:bg-brand-700 text-white focus:ring-brand-500'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ns-navy/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-kolam-surface rounded-2xl max-w-md w-full p-6 shadow-elevated border border-kolam-sunk relative">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-2 text-ns-text-secondary hover:text-ns-text-secondary rounded-full hover:bg-kolam-sunk transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-kolam-kumkum-soft text-kolam-kumkum rounded-2xl shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-ns-navy">{title}</h3>
            <p className="text-sm text-ns-text-secondary mt-1 leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl border border-ns-border text-ns-text font-semibold text-sm hover:bg-kolam-wash transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm ${variantStyles[variant]}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
