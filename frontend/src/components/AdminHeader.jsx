import { UserButton, useUser } from "@clerk/react";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-[var(--color-bg-card)] border-b border-[var(--color-border)]">
      {/* Ô tìm kiếm bên trái giữ nguyên */}
      <div className="w-96">
        {/* ... Code ô tìm kiếm của bạn ... */}
      </div>

      {/* Góc bên phải: Icon Thông báo + Clerk UserButton */}
      <div className="flex items-center gap-4">
        {/* Nút thông báo */}
        <button className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] rounded-full hover:bg-[var(--color-bg-muted)] transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        {/* Khối User Profile từ Clerk */}
        <div className="flex items-center gap-3 pl-2 border-l border-[var(--color-border)]">
          {/* Tên và chức vụ hiển thị bên trái của avatar */}
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-[var(--color-text-primary)] leading-none mb-1">
              {user?.fullName || "Phú Trọng"}
            </p>
            <p className="text-sm font-medium text-[var(--color-text-muted)] leading-none">
              Administrator
            </p>
          </div>

          {/* Component Button của Clerk hỗ trợ bấm vào để xem thông tin & Đăng xuất */}
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-10 h-10 rounded-xl border border-[var(--color-border)] shadow-sm",
              }
            }}
            afterSignOutUrl="/sign-in"
          />
        </div>
      </div>
    </header>
  );
}
