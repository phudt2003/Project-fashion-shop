import React from 'react';

export function AdminButton({
  children,
  className = '',
  type = 'button',
  variant = 'primary',
  disabled = false,
  ...props
}) {
  const baseClasses = 'inline-flex items-center justify-center h-10 px-4 text-sm font-semibold rounded-xl transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98] select-none';

  const variantClasses = {
    primary: 'bg-sky-500 hover:bg-sky-600 text-white shadow-sm hover:shadow active:bg-sky-700',
    secondary: 'bg-pink-400 hover:bg-pink-500 text-white shadow-sm hover:shadow active:bg-pink-600',
    success: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm hover:shadow active:bg-emerald-700',
    danger: 'bg-rose-500 hover:bg-rose-600 text-white shadow-sm hover:shadow active:bg-rose-700',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 active:bg-slate-200',
    outline: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
