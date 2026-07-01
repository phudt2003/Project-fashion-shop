import React from 'react';

export function AdminInput({
  label,
  error,
  id,
  className = '',
  type = 'text',
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-display">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={`h-10 px-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 ${
          error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20' : ''
        }`}
        {...props}
      />
      {error && (
        <span className="text-xs font-medium text-rose-500">
          {error}
        </span>
      )}
    </div>
  );
}

export function AdminSelect({
  label,
  error,
  id,
  children,
  className = '',
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-display">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          className={`w-full h-10 pl-4 pr-10 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 outline-none transition-all appearance-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 ${
            error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20' : ''
          }`}
          {...props}
        >
          {children}
        </select>
        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[20px]">
          expand_more
        </span>
      </div>
      {error && (
        <span className="text-xs font-medium text-rose-500">
          {error}
        </span>
      )}
    </div>
  );
}

export function AdminTextarea({
  label,
  error,
  id,
  className = '',
  rows = 4,
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-display">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={`px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 ${
          error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20' : ''
        }`}
        {...props}
      />
      {error && (
        <span className="text-xs font-medium text-rose-500">
          {error}
        </span>
      )}
    </div>
  );
}
