import React from 'react';

export function AdminTable({
  headers = [],
  children,
  className = '',
  ...props
}) {
  return (
    <div className={`w-full overflow-x-auto rounded-xl border border-slate-100 bg-white ${className}`}>
      <table className="w-full text-left border-collapse" {...props}>
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            {headers.map((header, idx) => (
              <th
                key={idx}
                className={`sticky top-0 z-10 px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 font-display ${
                  header.align === 'right' ? 'text-right' : header.align === 'center' ? 'text-center' : 'text-left'
                } ${header.className || ''}`}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 font-medium text-sm text-slate-700">
          {children}
        </tbody>
      </table>
    </div>
  );
}

export function AdminTableRow({
  children,
  className = '',
  onClick,
  ...props
}) {
  return (
    <tr
      onClick={onClick}
      className={`hover:bg-sky-50/30 even:bg-slate-50/30 transition-colors ${onClick ? 'cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </tr>
  );
}

export function AdminTableCell({
  children,
  className = '',
  align = 'left',
  ...props
}) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <td
      className={`px-6 py-4 align-middle ${alignClasses[align] || alignClasses.left} ${className}`}
      {...props}
    >
      {children}
    </td>
  );
}
