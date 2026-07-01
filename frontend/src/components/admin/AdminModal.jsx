import React, { useEffect } from 'react';
import { AdminButton } from './AdminButton';

export function AdminModal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  className = '',
  ...props
}) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div
        className={`relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[20px] shadow-2xl p-6 md:p-8 transform transition-all duration-300 scale-100 border border-slate-100 ${className}`}
        {...props}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            {title && <h3 className="text-xl font-bold text-slate-800 font-display">{title}</h3>}
            {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
          </div>
          <button
            className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
            onClick={onClose}
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="mb-6">{children}</div>
      </div>
    </div>
  );
}
