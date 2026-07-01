import React from 'react';

export function AdminCard({ children, className = '', ...props }) {
  return (
    <div
      className={`rounded-card bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
