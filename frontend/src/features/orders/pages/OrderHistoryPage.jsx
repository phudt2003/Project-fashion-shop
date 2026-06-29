import { useState, useEffect, useRef } from 'react';
import { 
  User, 
  ShoppingBag, 
  Search, 
  ArrowRight, 
  Check, 
  Truck, 
  CheckCircle, 
  X, 
  CreditCard, 
  Globe, 
  Camera, 
  Share, 
  MapPin, 
  Mail, 
  Phone 
} from 'lucide-react';

export function OrderHistoryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('article, section');
    elements.forEach((el) => {
      if (el.id) observer.observe(el);
    });

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const isElementVisible = (id) => visibleElements.has(id);

  return (
    <>
      <main className="pt-32 pb-24 px-4 md:px-6 max-w-7xl mx-auto min-h-screen">
        <div className="mb-12">
          <h1 className="font-display text-[var(--text-3xl)] font-medium text-[var(--color-text-primary)] mb-4">Đơn hàng của tôi</h1>
          <p className="font-body text-base leading-relaxed text-[var(--color-text-secondary)] max-w-2xl">Theo dõi và quản lý các đơn hàng đã mua của bạn với sự tỉ mỉ nhất.</p>
        </div>

        {/* Statistics Grid */}
        <section 
          id="stats-section"
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 transition-all duration-700 ${isElementVisible('stats-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="bg-[var(--color-bg-muted)] p-6 rounded-[var(--radius-md)] flex flex-col gap-2 border border-transparent hover:border-[var(--color-border)] transition-all cursor-default">
            <span className="font-body text-sm font-medium tracking-wider uppercase text-[var(--color-text-secondary)]">Tổng đơn hàng</span>
            <span className="font-display text-[var(--text-xl)] font-normal text-[var(--color-text-primary)]">12</span>
          </div>
          <div className="bg-[var(--color-success)] bg-opacity-20 p-6 rounded-[var(--radius-md)] flex flex-col gap-2 border border-transparent hover:border-[var(--color-success)] transition-all cursor-default">
            <span className="font-body text-sm font-medium tracking-wider uppercase text-[var(--color-text-secondary)]">Đang xử lý</span>
            <span className="font-display text-[var(--text-xl)] font-normal text-[var(--color-text-primary)]">1</span>
          </div>
          <div className="bg-[var(--color-accent)] p-6 rounded-[var(--radius-md)] flex flex-col gap-2 border border-transparent hover:border-[var(--color-border)] transition-all cursor-default">
            <span className="font-body text-sm font-medium tracking-wider uppercase text-[var(--color-text-secondary)]">Đang giao</span>
            <span className="font-display text-[var(--text-xl)] font-normal text-[var(--color-text-primary)]">2</span>
          </div>
          <div className="bg-[var(--color-bg-muted)] p-6 rounded-[var(--radius-md)] flex flex-col gap-2 border border-transparent hover:border-[var(--color-border)] transition-all cursor-default">
            <span className="font-body text-sm font-medium tracking-wider uppercase text-[var(--color-text-secondary)]">Thành công</span>
            <span className="font-display text-[var(--text-xl)] font-normal text-[var(--color-text-primary)]">9</span>
          </div>
        </section>

        {/* Filter & Search Bar */}
        <section 
          id="filter-section"
          className={`flex flex-col lg:flex-row gap-6 justify-between items-end mb-8 transition-all duration-700 ${isElementVisible('filter-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="w-full lg:w-auto overflow-x-auto pb-2 flex gap-2">
            <button className="px-6 py-2 rounded-full font-body text-sm font-medium tracking-wider uppercase bg-[var(--color-primary)] text-[var(--color-text-inverse)] whitespace-nowrap">Tất cả</button>
            <button className="px-6 py-2 rounded-full font-body text-sm font-medium tracking-wider uppercase bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-muted)] transition-colors whitespace-nowrap">Chờ xác nhận</button>
            <button className="px-6 py-2 rounded-full font-body text-sm font-medium tracking-wider uppercase bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-muted)] transition-colors whitespace-nowrap">Đang xử lý</button>
            <button className="px-6 py-2 rounded-full font-body text-sm font-medium tracking-wider uppercase bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-muted)] transition-colors whitespace-nowrap">Đang giao</button>
            <button className="px-6 py-2 rounded-full font-body text-sm font-medium tracking-wider uppercase bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-muted)] transition-colors whitespace-nowrap">Đã giao</button>
            <button className="px-6 py-2 rounded-full font-body text-sm font-medium tracking-wider uppercase bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-muted)] transition-colors whitespace-nowrap">Đã hủy</button>
          </div>
          <div className="w-full lg:max-w-md relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" size={24} />
            <input 
              className="w-full pl-12 pr-6 py-3 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-border-focus)] transition-all font-body text-base placeholder:text-[var(--color-text-muted)]" 
              placeholder="Tìm theo mã đơn hàng hoặc tên sản phẩm" 
              type="text"
            />
          </div>
        </section>

        {/* Order List */}
        <div className="flex flex-col gap-6">
          {/* Order Card 1: Processing/Shipping */}
          <article 
            id="order-card-1"
            className={`bg-[var(--color-bg-card)] rounded-[var(--radius-md)] shadow-sm hover:shadow-md transition-shadow overflow-hidden group transition-all duration-700 ${isElementVisible('order-card-1') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between px-8 py-6 bg-[var(--color-bg-muted)] bg-opacity-50 border-b border-[var(--color-border)]">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <span className="font-body text-sm font-medium tracking-wider uppercase text-[var(--color-text-primary)] font-semibold">ST-10245</span>
                <span className="font-body text-sm text-[var(--color-text-secondary)] border-l border-[var(--color-border)] pl-6 hidden md:inline">Ngày đặt: 24/10/2026</span>
                <span className="px-3 py-1 rounded-full font-body text-[10px] font-medium tracking-wider uppercase bg-[var(--color-accent)] text-[var(--color-text-primary)] font-semibold">Đang giao</span>
              </div>
              <div className="mt-4 md:mt-0">
                <button 
                  className="font-body text-sm font-medium tracking-wider uppercase text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] flex items-center gap-2 transition-colors" 
                  onClick={openModal}
                >
                  Xem chi tiết <ArrowRight className="text-sm" size={20} />
                </button>
              </div>
            </div>
            <div className="p-8">
              {/* Product Content */}
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-32 h-40 flex-shrink-0 bg-[var(--color-bg-muted)] rounded-[var(--radius-md)] overflow-hidden">
                  <img 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                    alt="A sophisticated tailored beige wool overcoat"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVq3KF46dZOgqM3VdJChzVcxSdAFwq3PAfE_UEZXzxicxX2SsDjaaAnFsaKq3nz0LURgTwBKGGta6gwpWX2uAyy6jVyBE5p9qV66SGgoCaauK43gsCSgpFoSmLUP1BCFPxKQ1u8U0YfQEKlVU4rc_URcdeMerWABWL_efjq3Qiwyy87qz-kO0I6nlFzt1YES6_5zoPd_lp0sV6j1G7zPWWtGXuGXpDRCgjCI9-A2nLgZhPoRDX6uF5AjVW_IS7us95p1h5F9WP65H6"
                  />
                </div>
                <div className="flex-grow flex flex-col md:flex-row justify-between gap-6">
                  <div>
                    <h3 className="font-display text-[var(--text-xl)] font-normal text-[var(--color-text-primary)] mb-2">Áo Khoác Wool Thủ Công</h3>
                    <div className="flex gap-4 font-body text-sm text-[var(--color-text-secondary)]">
                      <span className="">Màu: Beige Thạch</span>
                      <span className="border-l border-[var(--color-border)] pl-4">Size: M</span>
                      <span className="border-l border-[var(--color-border)] pl-4">SL: 1</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block font-body text-sm font-medium tracking-wider uppercase text-[var(--color-text-secondary)] mb-1">Tổng cộng</span>
                    <span className="font-display text-[var(--text-xl)] font-normal text-[var(--color-text-primary)]">4,250,000₫</span>
                  </div>
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="mt-12 mb-8 relative">
                <div className="absolute top-4 left-0 w-full h-[1px] bg-[var(--color-border)]"></div>
                <div className="absolute top-4 left-0 w-[75%] h-[1px] bg-[var(--color-primary)]"></div>
                <div className="relative flex justify-between">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-[var(--color-text-inverse)] z-10">
                      <Check className="text-[16px]" size={16} />
                    </div>
                    <span className="font-body text-[10px] font-medium tracking-wider uppercase text-[var(--color-primary)]">Đã đặt hàng</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-[var(--color-text-inverse)] z-10">
                      <Check className="text-[16px]" size={16} />
                    </div>
                    <span className="font-body text-[10px] font-medium tracking-wider uppercase text-[var(--color-primary)]">Đã xác nhận</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-[var(--color-text-inverse)] z-10">
                      <Check className="text-[16px]" size={16} />
                    </div>
                    <span className="font-body text-[10px] font-medium tracking-wider uppercase text-[var(--color-primary)]">Đang đóng gói</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-primary)] flex items-center justify-center text-[var(--color-primary)] z-10 ring-4 ring-[var(--color-bg-base)]">
                      <Truck className="text-[16px] animate-pulse" size={16} />
                    </div>
                    <span className="font-body text-[10px] font-medium tracking-wider uppercase text-[var(--color-primary)] font-semibold">Đang vận chuyển</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-bg-muted)] flex items-center justify-center text-[var(--color-text-muted)] z-10">
                      <CheckCircle className="text-[16px]" size={16} />
                    </div>
                    <span className="font-body text-[10px] font-medium tracking-wider uppercase text-[var(--color-text-secondary)]">Đã giao</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-end border-t border-[var(--color-border)] pt-8">
                <button className="px-6 py-2 rounded-full font-body text-sm font-medium tracking-wider uppercase border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-muted)] transition-all">Tải hóa đơn</button>
                <button className="px-6 py-2 rounded-full font-body text-sm font-medium tracking-wider uppercase border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-muted)] transition-all">Liên hệ hỗ trợ</button>
                <button className="px-8 py-2 rounded-full font-body text-sm font-medium tracking-wider uppercase bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-secondary)] transition-all">Theo dõi đơn hàng</button>
              </div>
            </div>
          </article>

          {/* Order Card 2: Completed */}
          <article 
            id="order-card-2"
            className={`bg-[var(--color-bg-card)] rounded-[var(--radius-md)] shadow-sm hover:shadow-md transition-shadow overflow-hidden group transition-all duration-700 ${isElementVisible('order-card-2') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between px-8 py-6 bg-[var(--color-bg-muted)]">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <span className="font-body text-sm font-medium tracking-wider uppercase text-[var(--color-text-primary)] font-semibold">ST-09882</span>
                <span className="font-body text-sm text-[var(--color-text-secondary)] border-l border-[var(--color-border)] pl-6 hidden md:inline">Ngày đặt: 12/09/2026</span>
                <span className="px-3 py-1 rounded-full font-body text-[10px] font-medium tracking-wider uppercase bg-[var(--color-success)] bg-opacity-20 text-[var(--color-text-secondary)] font-semibold">Thành công</span>
              </div>
              <div className="mt-4 md:mt-0">
                <button className="font-body text-sm font-medium tracking-wider uppercase text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] flex items-center gap-2 transition-colors">
                  Xem chi tiết <ArrowRight className="text-sm" size={20} />
                </button>
              </div>
            </div>
            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-32 h-40 flex-shrink-0 bg-[var(--color-bg-muted)] rounded-[var(--radius-md)] overflow-hidden">
                  <img 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                    alt="An elegant organic linen shirt"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBS5aIFx3Ll-9WJk1PUCI5OacpfceyMfTlZi3EsItcDgQp0ZyqBVa4xITiclkDEltpnj_wPOHBCkn3w2cv-sIPtCeRF_A7-Nrc4Z-71ESy09holpgBbhCzO4msKg7TFwvpKCJcEQOO2rbnzNga1usBUlhsrn0L3FrRnL9vA7msLVuCUPKbMtuS2VF66krY9RdbzS9crnP7P7SRHjff-8UcSOPygoBw_RLZRX0QNkuYW83SU9EauUutnW4ZyPQY1oY_4IoS-6YVMlAoZ"
                  />
                </div>
                <div className="flex-grow flex flex-col md:flex-row justify-between gap-6">
                  <div>
                    <h3 className="font-display text-[var(--text-xl)] font-normal text-[var(--color-text-primary)] mb-2">Sơ Mi Linen Hữu Cơ</h3>
                    <div className="flex gap-4 font-body text-sm text-[var(--color-text-secondary)]">
                      <span className="">Màu: Trắng Ngà</span>
                      <span className="border-l border-[var(--color-border)] pl-4">Size: L</span>
                      <span className="border-l border-[var(--color-border)] pl-4">SL: 2</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block font-body text-sm font-medium tracking-wider uppercase text-[var(--color-text-secondary)] mb-1">Tổng cộng</span>
                    <span className="font-display text-[var(--text-xl)] font-normal text-[var(--color-text-primary)]">2,100,000₫</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 justify-end border-t border-[var(--color-border)] pt-8 mt-8">
                <button className="px-6 py-2 rounded-full font-body text-sm font-medium tracking-wider uppercase border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-muted)] transition-all">Đánh giá sản phẩm</button>
                <button className="px-8 py-2 rounded-full font-body text-sm font-medium tracking-wider uppercase bg-[var(--color-text-primary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-text-secondary)] hover:-translate-y-1 transition-all shadow-sm">Mua lại</button>
              </div>
            </div>
          </article>
        </div>
      </main>

      {/* Order Detail Modal */}
      <div className={`fixed inset-0 z-[60] ${isModalOpen ? '' : 'hidden'}`} id="orderDetailModal">
        <div className="absolute inset-0 bg-primary/25 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>
        <div 
          className={`absolute right-0 top-0 h-full w-full max-w-2xl bg-[var(--color-bg-card)] shadow-2xl transition-transform duration-500 overflow-y-auto ${isModalOpen ? 'translate-x-0' : 'translate-x-full'}`}
          id="modalContent"
        >
          <div className="p-8 md:p-12">
            <div className="flex justify-between items-center mb-12">
              <h2 className="font-display text-[var(--text-2xl)] font-medium text-[var(--color-text-primary)]">Chi tiết đơn hàng</h2>
              <button 
                className="w-10 h-10 rounded-full hover:bg-[var(--color-bg-muted)] transition-colors flex items-center justify-center" 
                onClick={closeModal}
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-12">
              <section className="transition-all duration-700 opacity-100 translate-y-0">
                <h4 className="font-body text-sm font-medium tracking-wider uppercase text-[var(--color-text-primary)] mb-4">Thông tin vận chuyển</h4>
                <div className="bg-[var(--color-bg-muted)] p-6 rounded-[var(--radius-md)] space-y-2">
                  <p className="font-body font-semibold text-[var(--color-text-primary)]">Nguyễn Văn A</p>
                  <p className="font-body text-sm text-[var(--color-text-secondary)]">+84 901 234 567</p>
                  <p className="font-body text-sm text-[var(--color-text-secondary)]">123 Đường Tự Do, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</p>
                </div>
              </section>
              <section className="transition-all duration-700 opacity-100 translate-y-0">
                <h4 className="font-body text-sm font-medium tracking-wider uppercase text-[var(--color-text-primary)] mb-4">Danh sách sản phẩm</h4>
                <div className="space-y-6">
                  <div className="flex gap-6 items-center">
                    <div className="w-16 h-20 bg-[var(--color-bg-muted)] rounded-[var(--radius-sm)] overflow-hidden">
                      <img 
                        alt="Close-up of a beige wool coat fabric"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFtVHS6ukWXBeTm6jqox1zeCQUXA3AKIaZbY42gaEEAspGr5_HeCvfoKZTh8to1MU-3c6JgT3eKw4pE21VbBuYkZhUkRLBKwemP5DRJ24KK7a_ii_G1Ld_l49s1dUaxhbdu7nQy4h2oqxj3bS-0rxfyODefInsySgNPypdl06WG2QIlIs1w4IbUoGRBgoquUxnKsp8HjwYo0fiU6xiVU37b1uyDcJBHfkeonoujRdG3fOyZqFqjmMG7MZ4KVD2cUzBU-x_K_DQUQQR7"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="font-body font-semibold text-[var(--color-text-primary)]">Áo Khoác Wool Thủ Công</p>
                      <p className="font-body text-sm text-[var(--color-text-secondary)]">Size: M | SL: 1</p>
                    </div>
                    <span className="font-body font-semibold text-[var(--color-text-primary)]">4,250,000₫</span>
                  </div>
                </div>
              </section>
              <section className="transition-all duration-700 opacity-100 translate-y-0">
                <h4 className="font-body text-sm font-medium tracking-wider uppercase text-[var(--color-text-primary)] mb-4">Thanh toán</h4>
                <div className="space-y-3 font-body text-base">
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">Tạm tính</span>
                    <span className="text-[var(--color-text-primary)]">4,250,000₫</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">Phí vận chuyển</span>
                    <span className="text-[var(--color-text-primary)]">0₫</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">Giảm giá (STITCH20)</span>
                    <span className="text-[var(--color-error)]">-850,000₫</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-[var(--color-border)]">
                    <span className="font-body font-semibold text-[var(--color-text-primary)]">Tổng thanh toán</span>
                    <span className="font-display text-[var(--text-xl)] font-normal text-[var(--color-text-primary)]">3,400,000₫</span>
                  </div>
                </div>
              </section>
              <section className="transition-all duration-700 opacity-100 translate-y-0">
                <h4 className="font-body text-sm font-medium tracking-wider uppercase text-[var(--color-text-primary)] mb-4">Phương thức thanh toán</h4>
                <div className="flex items-center gap-4 bg-[var(--color-bg-base)] border border-[var(--color-border)] p-4 rounded-[var(--radius-md)]">
                  <CreditCard className="text-[var(--color-primary)]" size={24} />
                  <div>
                    <p className="font-body font-semibold text-[var(--color-text-primary)]">Visa kết thúc bằng •••• 4242</p>
                    <p className="font-body text-sm text-[var(--color-text-secondary)]">Thanh toán thành công lúc 14:32 - 24/10/2026</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



