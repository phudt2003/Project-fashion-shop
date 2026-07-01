import React from 'react';

export function AdminPagination({
  currentPage,
  totalPages,
  onPageChange,
  startIndex,
  endIndex,
  totalItems,
  itemName = 'mục',
  className = '',
}) {
  const getPages = () => {
    const pages = [];
    const maxVisible = 3;
    
    // Always show page 1
    pages.push(1);
    
    if (currentPage > 3) {
      pages.push('...');
    }
    
    // Middle pages
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }
    
    if (currentPage < totalPages - 2) {
      pages.push('...');
    }
    
    // Always show last page
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  if (totalPages <= 0) return null;

  return (
    <div className={`px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 ${className}`}>
      {/* Information text */}
      <div className="text-xs font-semibold text-slate-500">
        Hiển thị <span className="text-slate-800">{startIndex + 1}</span> - <span className="text-slate-800">{Math.min(endIndex, totalItems)}</span> của <span className="text-slate-800">{totalItems}</span> {itemName}
      </div>

      {/* Page list buttons */}
      <div className="flex items-center gap-1.5">
        <button
          className="w-9 h-9 rounded-xl flex items-center justify-center border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-800 active:scale-95 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-500 disabled:active:scale-100 transition-all cursor-pointer disabled:cursor-not-allowed"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Trang trước"
        >
          <span className="material-symbols-outlined text-[20px]">chevron_left</span>
        </button>

        {getPages().map((page, idx) => {
          if (page === '...') {
            return (
              <span key={`dots-${idx}`} className="w-9 h-9 flex items-center justify-center text-slate-400 font-bold select-none">
                ...
              </span>
            );
          }
          return (
            <button
              key={`page-${page}`}
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all cursor-pointer active:scale-95 ${
                currentPage === page
                  ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/20 hover:bg-sky-600'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-800'
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          );
        })}

        <button
          className="w-9 h-9 rounded-xl flex items-center justify-center border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-800 active:scale-95 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-500 disabled:active:scale-100 transition-all cursor-pointer disabled:cursor-not-allowed"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Trang sau"
        >
          <span className="material-symbols-outlined text-[20px]">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
