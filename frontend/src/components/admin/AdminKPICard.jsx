import React from 'react';
import { AdminCard } from './AdminCard';
import { AdminBadge } from './AdminBadge';

export function AdminKPICard({
  title,
  value,
  icon,
  trend,
  trendVariant = 'success',
  progress,
  color = 'sky',
  className = '',
}) {
  const colorMap = {
    sky: 'bg-sky-50 text-sky-500',
    pink: 'bg-pink-50 text-pink-500',
    emerald: 'bg-emerald-50 text-emerald-500',
    amber: 'bg-amber-50 text-amber-500',
    rose: 'bg-rose-50 text-rose-500',
  };

  const barColorMap = {
    sky: 'bg-sky-500',
    pink: 'bg-pink-400',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
  };

  return (
    <AdminCard className={`flex flex-col justify-between h-full group border border-slate-100 hover:border-sky-500/20 ${className}`}>
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-xl ${colorMap[color] || colorMap.sky} group-hover:scale-110 transition-transform duration-300`}>
            <span className="material-symbols-outlined text-[24px] block">{icon}</span>
          </div>
          {trend && (
            <AdminBadge variant={trendVariant} dot={trendVariant === 'success'}>
              {trend}
            </AdminBadge>
          )}
        </div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 font-display mb-1">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-slate-800 font-display leading-tight">
          {value}
        </h3>
      </div>
      
      {progress !== undefined && (
        <div className="mt-4">
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${barColorMap[color] || barColorMap.sky}`}
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        </div>
      )}
    </AdminCard>
  );
}
