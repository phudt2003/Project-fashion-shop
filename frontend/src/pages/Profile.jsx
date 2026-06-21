import React from 'react';
import { useUser } from '@clerk/react';

export function ProfilePage() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-bright text-on-surface">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-primary" />
      </div>
    );
  }

  if (!isSignedIn || !user) {
    return (
      <div className="page-container flex items-center justify-center py-20">
        <p className="text-on-surface-variant">Vui lòng đăng nhập để xem thông tin cá nhân.</p>
      </div>
    );
  }

  const email = user.primaryEmailAddress?.emailAddress || user.emailAddresses[0]?.emailAddress || 'Chưa cung cấp';
  const fullName = user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Người dùng Stitch';

  return (
    <section className="page-container py-12">
      <div className="max-w-2xl mx-auto bg-surface-container rounded-xl p-8 border border-border-subtle shadow-sm">
        <h2 className="font-display text-headline-md text-primary mb-8 text-center">
          Thông tin cá nhân
        </h2>
        
        <div className="flex flex-col sm:flex-row items-center gap-8 mb-8 pb-8 border-b border-border-subtle">
          <img 
            src={user.imageUrl} 
            alt={fullName} 
            className="w-24 h-24 rounded-full object-cover border-2 border-primary shadow-sm"
          />
          <div className="text-center sm:text-left flex-grow">
            <h3 className="font-body-lg text-lg font-bold text-on-surface mb-1">
              {fullName}
            </h3>
            <p className="text-sm text-on-surface-variant mb-2">
              Thành viên của Stitch
            </p>
            <span className="inline-block bg-primary-fixed text-on-primary-fixed-variant px-3 py-1 rounded-full text-xs font-semibold">
              Khách hàng
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-border-subtle/50">
            <span className="text-sm text-on-surface-variant font-medium">Họ và tên:</span>
            <span className="text-sm text-on-surface font-semibold sm:text-right">{fullName}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-border-subtle/50">
            <span className="text-sm text-on-surface-variant font-medium">Địa chỉ Email:</span>
            <span className="text-sm text-on-surface font-semibold sm:text-right break-all">{email}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-border-subtle/50">
            <span className="text-sm text-on-surface-variant font-medium">Clerk User ID:</span>
            <span className="text-xs text-on-surface-variant font-mono bg-surface-bright px-2 py-1 rounded border border-border-subtle/30 sm:text-right break-all select-all">
              {user.id}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
