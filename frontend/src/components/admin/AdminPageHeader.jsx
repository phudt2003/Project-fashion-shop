import React from 'react';
import { Link } from 'react-router-dom';

export function AdminPageHeader({
  title,
  subtitle,
  breadcrumbs = [],
  children,
  className = '',
}) {
  return (
    <div className={`flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-8 ${className}`}>
      <div className="flex flex-col gap-1">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 select-none mb-1">
            <Link to="/admin" className="hover:text-sky-500 transition-colors flex items-center">
              <span className="material-symbols-outlined text-[16px]">home</span>
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                {crumb.path ? (
                  <Link to={crumb.path} className="hover:text-sky-500 transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-slate-500">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Title & Subtitle */}
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 font-display tracking-tight leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-slate-500 font-medium">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right side controls */}
      {children && (
        <div className="flex items-center gap-3 flex-wrap">
          {children}
        </div>
      )}
    </div>
  );
}
