import React from 'react';

export function AdminBadge({
  children,
  className = '',
  variant = 'info',
  dot = false,
  ...props
}) {
  const baseClasses = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold select-none w-fit';

  const variantClasses = {
    info: 'bg-sky-50 text-sky-600',
    primary: 'bg-sky-50 text-sky-600',
    secondary: 'bg-pink-50 text-pink-600',
    success: 'bg-emerald-50 text-emerald-600',
    warning: 'bg-amber-50 text-amber-600',
    danger: 'bg-rose-50 text-rose-600',
    neutral: 'bg-slate-100 text-slate-600',
  };

  const dotClasses = {
    info: 'bg-sky-400',
    primary: 'bg-sky-400',
    secondary: 'bg-pink-400',
    success: 'bg-emerald-400',
    warning: 'bg-amber-500',
    danger: 'bg-rose-400',
    neutral: 'bg-slate-400',
  };

  return (
    <span
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.info} ${className}`}
      {...props}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotClasses[variant] || dotClasses.info} ${variant === 'success' || variant === 'info' ? 'animate-pulse' : ''}`} />
      )}
      {children}
    </span>
  );
}
