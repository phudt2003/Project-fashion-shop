import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-[var(--color-border)] bg-[linear-gradient(135deg,var(--color-primary-soft),#FFFFFF_45%,var(--color-secondary-soft))] pt-12 pb-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-12 md:px-6">
        <div className="md:col-span-4">
          <h2 className="mb-4 font-display text-[var(--text-2xl)] font-extrabold text-primary">STITCH Kids</h2>
          <p className="mb-6 max-w-xs text-base leading-relaxed text-[var(--color-text-secondary)]">
            Trang phục trẻ em mềm mại, an toàn và đủ đáng yêu cho những ngày bé tự do khám phá.
          </p>
          <div className="flex flex-wrap gap-3">
            {['local_shipping', 'verified', 'favorite'].map((icon) => (
              <a
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-primary shadow-soft transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-white"
                href="#"
                key={icon}
              >
                <span className="material-symbols-outlined">{icon}</span>
              </a>
            ))}
          </div>
        </div>
        
        <div className="space-y-3 md:col-span-2">
          <h4 className="mb-5 font-body text-sm font-extrabold uppercase text-[var(--color-text-accent)]">Mua sắm</h4>
          <Link className="block text-sm font-semibold text-[var(--color-text-secondary)] transition-all hover:translate-x-1 hover:text-primary" to="/products">Tất cả sản phẩm</Link>
          <Link className="block text-sm font-semibold text-[var(--color-text-secondary)] transition-all hover:translate-x-1 hover:text-primary" to="/categories/do-be-trai">Bé trai</Link>
          <Link className="block text-sm font-semibold text-[var(--color-text-secondary)] transition-all hover:translate-x-1 hover:text-primary" to="/categories/do-be-gai">Bé gái</Link>
          <Link className="block text-sm font-semibold text-[var(--color-text-secondary)] transition-all hover:translate-x-1 hover:text-primary" to="/categories/footwear">Giày dép</Link>
        </div>
        
        <div className="space-y-3 md:col-span-3">
          <h4 className="mb-5 font-body text-sm font-extrabold uppercase text-[var(--color-text-accent)]">Hỗ trợ phụ huynh</h4>
          <a className="block text-sm font-semibold text-[var(--color-text-secondary)] transition-all hover:translate-x-1 hover:text-primary" href="#">Chính sách vận chuyển</a>
          <a className="block text-sm font-semibold text-[var(--color-text-secondary)] transition-all hover:translate-x-1 hover:text-primary" href="#">Đổi trả & hoàn tiền</a>
          <a className="block text-sm font-semibold text-[var(--color-text-secondary)] transition-all hover:translate-x-1 hover:text-primary" href="#">Hướng dẫn chọn size</a>
          <a className="block text-sm font-semibold text-[var(--color-text-secondary)] transition-all hover:translate-x-1 hover:text-primary" href="#">Chính sách bảo mật</a>
        </div>
        
        <div className="space-y-3 md:col-span-3">
          <h4 className="mb-5 font-body text-sm font-extrabold uppercase text-[var(--color-text-accent)]">Liên hệ</h4>
          <p className="flex items-start gap-2 text-sm font-semibold text-[var(--color-text-secondary)]">
            <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
            <span>28 Thảo Điền, Quận 2, TP. Hồ Chí Minh</span>
          </p>
          <p className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-secondary)]">
            <span className="material-symbols-outlined text-[18px] text-primary">mail</span>
            <span>hello@stitchatelier.vn</span>
          </p>
          <p className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-secondary)]">
            <span className="material-symbols-outlined text-[18px] text-primary">call</span>
            <span>+84 (0) 901 234 567</span>
          </p>
        </div>
      </div>
      
      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-[var(--color-border)] px-4 pt-6 text-center md:flex-row md:px-6">
        <span className="text-sm font-semibold text-[var(--color-text-muted)]">© 2026 STITCH Kids. Bảo lưu mọi quyền.</span>
        <div className="flex flex-wrap justify-center gap-4">
          <a className="text-sm font-semibold text-[var(--color-text-muted)] transition-colors hover:text-primary" href="#">Báo cáo bền vững</a>
          <a className="text-sm font-semibold text-[var(--color-text-muted)] transition-colors hover:text-primary" href="#">Chăm sóc sản phẩm</a>
        </div>
      </div>
    </footer>
  );
}
