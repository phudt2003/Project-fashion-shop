import React from 'react';
import { useUser } from '@clerk/react';
import { useAuth } from '../hooks/useAuth';
import { USER_ROLES } from '../config/constants';

export function ProfilePage() {
  const { user, isLoaded: clerkLoaded, isSignedIn } = useUser();
  const { user: userWithRole, isLoaded } = useAuth();

  if (!isLoaded || !clerkLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-base)] text-[var(--color-text-primary)]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-primary)]" />
      </div>
    );
  }

  if (!isSignedIn || !user) {
    return (
      <div className="page-container flex items-center justify-center py-20">
        <p className="text-[var(--color-text-secondary)]">Vui lòng đăng nhập để xem thông tin cá nhân.</p>
      </div>
    );
  }

  const email = user.primaryEmailAddress?.emailAddress || user.emailAddresses[0]?.emailAddress || 'Chưa cung cấp';
  const fullName = user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Người dùng KỶ NGUYÊN KID';
  const role = userWithRole?.role || user?.publicMetadata?.role || USER_ROLES.USER;
  const isAdmin = role === USER_ROLES.ADMIN;

  return (
    <section className="page-container py-12">
      <div className="max-w-2xl mx-auto bg-[var(--color-bg-card)] rounded-[var(--radius-lg)] p-8 border border-[var(--color-border)] shadow-sm">
        <h2 className="font-display text-[var(--text-2xl)] font-medium text-[var(--color-text-primary)] mb-8 text-center">
          Thông tin cá nhân
        </h2>
        
        <div className="flex flex-col sm:flex-row items-center gap-8 mb-8 pb-8 border-b border-[var(--color-border)]">
          <img 
            src={user.imageUrl} 
            alt={fullName} 
            className="w-24 h-24 rounded-full object-cover border-2 border-[var(--color-primary)] shadow-sm"
          />
          <div className="text-center sm:text-left flex-grow">
            <h3 className="font-body text-lg font-semibold text-[var(--color-text-primary)] mb-1">
              {fullName}
            </h3>
            <p className="font-body text-sm text-[var(--color-text-secondary)] mb-2">
              Thành viên của KỶ NGUYÊN KID
            </p>
            <span className={`inline-block px-3 py-1 rounded-full font-body text-sm font-medium ${
              isAdmin 
                ? 'bg-[var(--color-secondary)] text-[var(--color-text-primary)]' 
                : 'bg-[var(--color-primary)] text-[var(--color-text-inverse)]'
            }`}>
              {isAdmin ? 'Quản trị viên' : 'Người dùng'}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-[var(--color-divider)]">
            <span className="font-body text-sm font-medium text-[var(--color-text-secondary)]">Họ và tên:</span>
            <span className="font-body text-sm font-semibold text-[var(--color-text-primary)] sm:text-right">{fullName}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-[var(--color-divider)]">
            <span className="font-body text-sm font-medium text-[var(--color-text-secondary)]">Địa chỉ Email:</span>
            <span className="font-body text-sm font-semibold text-[var(--color-text-primary)] sm:text-right break-all">{email}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-[var(--color-divider)]">
            <span className="font-body text-sm font-medium text-[var(--color-text-secondary)]">Vai trò:</span>
            <span className={`font-body text-sm font-semibold sm:text-right ${
              isAdmin ? 'text-[var(--color-secondary)]' : 'text-[var(--color-primary)]'
            }`}>
              {isAdmin ? 'Quản trị viên (Admin)' : 'Người dùng (User)'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-[var(--color-divider)]">
            <span className="font-body text-sm font-medium text-[var(--color-text-secondary)]">Clerk User ID:</span>
            <span className="font-sans text-sm text-[var(--color-text-muted)] bg-[var(--color-bg-base)] px-2 py-1 rounded-lg border border-[var(--color-border)] sm:text-right break-all select-all">
              {user.id}
            </span>
          </div>
        </div>

        {isAdmin && (
          <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
            <a 
              href="/admin" 
              className="inline-flex items-center gap-2 bg-[var(--color-secondary)] text-[var(--color-text-primary)] px-4 py-2 rounded-[var(--radius-md)] font-body font-medium tracking-wide hover:bg-[var(--color-accent)] transition-colors"
            >
              <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
              Truy cập trang quản trị
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProfilePage;
