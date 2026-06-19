import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-surface-container-low dark:bg-surface-container-lowest w-full pt-section-gap-desktop pb-section-gap-mobile border-t border-border-subtle mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-grid-gutter px-grid-gutter max-w-container-max mx-auto">
        <div className="md:col-span-4">
          <h2 className="font-display text-headline-lg text-primary mb-6">STITCH</h2>
          <p className="text-secondary max-w-xs mb-8">Nơi hội tụ của nghệ thuật may mặc thủ công và tâm hồn yêu thiên nhiên.</p>
          <div className="flex gap-4">
            <a className="w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center text-secondary hover:text-primary hover:border-primary transition-all" href="#">
              <span className="material-symbols-outlined">face_nod</span>
            </a>
            <a className="w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center text-secondary hover:text-primary hover:border-primary transition-all" href="#">
              <span className="material-symbols-outlined">camera</span>
            </a>
            <a className="w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center text-secondary hover:text-primary hover:border-primary transition-all" href="#">
              <span className="material-symbols-outlined">share</span>
            </a>
          </div>
        </div>
        
        <div className="md:col-span-2 space-y-4">
          <h4 className="font-label-uppercase text-label-uppercase text-on-surface mb-6">MUA SẮM</h4>
          <Link className="block text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all" to="/products">Tất cả sản phẩm</Link>
          <Link className="block text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all" to="/categories/do-be-trai">Bé trai</Link>
          <Link className="block text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all" to="/categories/do-be-gai">Đồ bé gái</Link>

          <Link className="block text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all" to="/categories/footwear">Giày dép</Link>
        </div>
        
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-label-uppercase text-label-uppercase text-on-surface mb-6">HỖ TRỢ</h4>
          <a className="block text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all" href="#">Chính sách vận chuyển</a>
          <a className="block text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all" href="#">Đổi trả & Hoàn tiền</a>
          <a className="block text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all" href="#">Hướng dẫn chọn size</a>
          <a className="block text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all" href="#">Chính sách bảo mật</a>
        </div>
        
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-label-uppercase text-label-uppercase text-on-surface mb-6">LIÊN HỆ</h4>
          <p className="text-on-surface-variant flex items-start gap-2">
            <span className="material-symbols-outlined text-[18px]">location_on</span>
            <span>28 Thảo Điền, Quận 2, TP. Hồ Chí Minh</span>
          </p>
          <p className="text-on-surface-variant flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">mail</span>
            <span>hello@stitchatelier.vn</span>
          </p>
          <p className="text-on-surface-variant flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span>+84 (0) 901 234 567</span>
          </p>
        </div>
      </div>
      
      <div className="max-w-container-max mx-auto px-grid-gutter mt-section-gap-desktop pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4 text-center">
        <span className="text-caption text-secondary">© 2024 STITCH SUSTAINABLE ATELIER. BẢO LƯU MỌI QUYỀN.</span>
        <div className="flex gap-6">
          <a className="text-caption text-secondary hover:text-primary transition-colors" href="#">Báo cáo Phát triển Bền vững</a>
          <a className="text-caption text-secondary hover:text-primary transition-colors" href="#">Hướng dẫn Chăm sóc sản phẩm</a>
        </div>
      </div>
    </footer>
  );
}
