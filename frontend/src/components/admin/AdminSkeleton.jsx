import React from 'react';

export function AdminSkeleton({
  variant = 'text',
  className = '',
  count = 1,
}) {
  const getSkeletonStyle = () => {
    switch (variant) {
      case 'title':
        return 'h-8 bg-slate-200 rounded-lg w-1/3 mb-4';
      case 'text':
        return 'h-4 bg-slate-200 rounded-lg w-full mb-2.5';
      case 'avatar':
        return 'h-10 w-10 bg-slate-200 rounded-full';
      case 'card':
        return 'h-40 bg-slate-100 rounded-[20px] w-full p-6 flex flex-col justify-between';
      case 'table-row':
        return 'h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6';
      default:
        return 'h-4 bg-slate-200 rounded-lg w-full';
    }
  };

  const renderSkeletons = () => {
    const list = [];
    for (let i = 0; i < count; i++) {
      if (variant === 'card') {
        list.push(
          <div key={i} className={`animate-pulse ${getSkeletonStyle()} ${className}`}>
            <div className="h-10 w-10 bg-slate-200 rounded-lg"></div>
            <div className="space-y-2 mt-4">
              <div className="h-3 bg-slate-200 rounded-lg w-1/2"></div>
              <div className="h-6 bg-slate-200 rounded-lg w-3/4"></div>
            </div>
          </div>
        );
      } else if (variant === 'table-row') {
        list.push(
          <div key={i} className={`animate-pulse ${getSkeletonStyle()} ${className}`}>
            <div className="h-4 bg-slate-200 rounded-lg w-1/12"></div>
            <div className="h-4 bg-slate-200 rounded-lg w-3/12"></div>
            <div className="h-4 bg-slate-200 rounded-lg w-2/12"></div>
            <div className="h-4 bg-slate-200 rounded-lg w-2/12"></div>
            <div className="h-4 bg-slate-200 rounded-lg w-2/12"></div>
            <div className="h-6 w-12 bg-slate-200 rounded-full"></div>
          </div>
        );
      } else {
        list.push(
          <div
            key={i}
            className={`animate-pulse bg-slate-200 ${getSkeletonStyle()} ${className}`}
          />
        );
      }
    }
    return list;
  };

  return <>{renderSkeletons()}</>;
}
