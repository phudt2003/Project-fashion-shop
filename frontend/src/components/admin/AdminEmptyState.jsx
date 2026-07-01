import React from 'react';
import { AdminButton } from './AdminButton';

export function AdminEmptyState({
  title = 'Không tìm thấy dữ liệu',
  description = 'Thử thay đổi bộ lọc hoặc thêm mục mới xem sao nhé.',
  icon = 'database_off',
  actionLabel,
  onAction,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 border border-dashed border-slate-200 rounded-[20px] bg-white ${className}`}>
      <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-4">
        <span className="material-symbols-outlined text-[36px]">{icon}</span>
      </div>
      <h4 className="text-base font-semibold text-slate-800 font-display mb-1">
        {title}
      </h4>
      <p className="text-sm text-slate-500 max-w-sm mb-6">
        {description}
      </p>
      {actionLabel && onAction && (
        <AdminButton variant="primary" onClick={onAction}>
          {actionLabel}
        </AdminButton>
      )}
    </div>
  );
}
