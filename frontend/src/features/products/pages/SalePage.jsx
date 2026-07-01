import { useState, useEffect } from 'react';
import { productApi } from '../services/productApi';

const formatPrice = (value) => `${new Intl.NumberFormat('vi-VN').format(value)}đ`;

function ProductCard({ product }) {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card group cursor-pointer rounded-[var(--radius-md)]">
      <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-bg-muted)] shadow-card">
        <img
          alt={product.name}
          className="product-img w-full h-full object-cover"
          src={product.image || 'https://via.placeholder.com/400x533'}
        />
        {discountPercentage > 0 && (
          <span className="absolute left-4 top-4 rounded-full bg-[var(--badge-sale-bg)] px-3 py-1 font-body text-xs font-extrabold uppercase text-[var(--badge-sale-text)] shadow-soft">
            -{discountPercentage}%
          </span>
        )}
        <button className="absolute bottom-4 right-4 flex h-12 w-12 translate-y-2 items-center justify-center rounded-full border border-[var(--color-border)] bg-white/95 text-primary opacity-100 shadow-button backdrop-blur transition-all group-hover:-translate-y-0 md:opacity-0 md:group-hover:opacity-100">
          <span className="material-symbols-outlined">add_shopping_cart</span>
        </button>
      </div>
      <p className="mb-1 font-body text-sm font-extrabold uppercase text-[var(--color-text-accent)]">{product.category}</p>
      <h3 className="mb-2 font-display text-title-sm text-[var(--color-text-primary)]">{product.name}</h3>
      <div className="flex items-center gap-3">
        <span className="font-body text-lg font-extrabold text-primary">{formatPrice(product.price)}</span>
        {product.originalPrice && (
          <span className="font-body text-sm text-[var(--color-text-muted)] line-through">{formatPrice(product.originalPrice)}</span>
        )}
      </div>
    </div>
  );
}

export function SalePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDiscount, setSelectedDiscount] = useState('all');

  useEffect(() => {
    const fetchSaleProducts = async () => {
      try {
        setLoading(true);
        const response = await productApi.list({ sale: true });
        setProducts(response.data || []);
      } catch (err) {
        console.error('Error fetching sale products:', err);
        setError('Không thể tải sản phẩm khuyến mãi');
      } finally {
        setLoading(false);
      }
    };

    fetchSaleProducts();
  }, []);

  const categories = [
    { id: 'all', label: 'Tất cả' },
    { id: 'boys', label: 'Bé trai' },
    { id: 'girls', label: 'Bé gái' },
    { id: 'footwear', label: 'Giày dép' },
    { id: 'accessories', label: 'Phụ kiện' },
  ];

  const discounts = [
    { id: 'all', label: 'Tất cả' },
    { id: '10', label: '10%+' },
    { id: '20', label: '20%+' },
    { id: '30', label: '30%+' },
    { id: '40', label: '40%+' },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-base)]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-primary)]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container py-20">
        <p className="text-center text-[var(--color-text-secondary)]">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-[var(--color-bg-base)] text-[var(--color-text-primary)] pt-24">
      {/* Hero Section */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center md:px-6 md:py-24">
        <span className="mb-4 block font-body text-sm font-extrabold uppercase text-[var(--color-text-accent)]">
          CAM KẾT BỀN VỮNG
        </span>
        <h1 className="mb-8 font-display text-[var(--text-4xl)] font-extrabold leading-tight text-[var(--color-text-primary)] md:text-[var(--text-5xl)]">
          Khuyến mãi
        </h1>
        <p className="font-body text-base leading-loose text-[var(--color-text-secondary)] max-w-2xl mx-auto">
          Tại KỶ NGUYÊN KID, chúng tôi tin rằng thời trang cao cấp cho trẻ em không nên gây tổn hại đến hành tinh. Các chương trình ưu đãi của chúng tôi giúp những sản phẩm làm từ sợi hữu cơ và vật liệu tái chế trở nên dễ dàng tiếp cận hơn, giúp bạn xây dựng tủ đồ bền vững cho bé một cách có trách nhiệm.
        </p>
      </section>

      {/* Flash Sale Banner */}
      <section className="px-4 md:px-6 max-w-7xl mx-auto mb-20">
        <div className="relative flex flex-col items-center justify-between gap-10 overflow-hidden rounded-[var(--radius-lg)] bg-[linear-gradient(135deg,var(--color-accent),var(--color-secondary-soft))] p-8 shadow-card md:flex-row md:p-16">
          <div className="z-10 text-center md:text-left">
            <h2 className="font-display text-[var(--text-2xl)] font-extrabold text-[var(--color-text-primary)] mb-4">
              Cơ hội cuối cùng
            </h2>
            <p className="font-body text-base leading-relaxed text-[var(--color-text-secondary)] mb-8 max-w-md">
              Giảm thêm 15% cho các sản phẩm trong bộ sưu tập Thu Đông khi kết thúc đợt sale.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <div className="flex flex-col items-center w-20 rounded-[var(--radius-md)] bg-white/75 p-4 shadow-soft backdrop-blur-sm">
                <span className="font-display text-[var(--text-xl)] font-normal countdown-item">02</span>
                <span className="font-body text-sm font-medium tracking-wider uppercase text-[var(--color-text-secondary)]">Ngày</span>
              </div>
              <div className="flex flex-col items-center w-20 rounded-[var(--radius-md)] bg-white/75 p-4 shadow-soft backdrop-blur-sm">
                <span className="font-display text-[var(--text-xl)] font-normal countdown-item">14</span>
                <span className="font-body text-sm font-medium tracking-wider uppercase text-[var(--color-text-secondary)]">Giờ</span>
              </div>
              <div className="flex flex-col items-center w-20 rounded-[var(--radius-md)] bg-white/75 p-4 shadow-soft backdrop-blur-sm">
                <span className="font-display text-[var(--text-xl)] font-normal countdown-item">45</span>
                <span className="font-body text-sm font-medium tracking-wider uppercase text-[var(--color-text-secondary)]">Phút</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 aspect-video rounded-[var(--radius-md)] bg-cover bg-center shadow-card" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida/AP1WRLvj-a04WIWkIepVOSF3XfBzOjkjjetBSjPjLyf5QWwpZWavcD5z4wzGsnferD1R4ae73UzVWen17PRTkn7kc8lm4l8l0eS7ai9HXeyJtd-fpJ54llufjvrGvNfiA7cWQMkMi2ozEGKRmNhbZHakbBY6IOK0y6j1k0F8A3vNo66BJh8KdzO5Ehp_GiYacIECZih_POa4KkZdunkt2K6ycX2X9tvQ-01uJKsBLaKNdMfZItg9BPFd_G0XGOhN")' }} />
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-20 z-40 mb-12 border-y border-[var(--color-border)] bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`rounded-full px-6 py-3 font-body text-sm font-extrabold uppercase transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-on-primary shadow-button'
                    : 'bg-white text-[var(--color-text-primary)] shadow-soft hover:bg-secondary-soft hover:text-[var(--color-text-accent)]'
                }`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="h-8 w-px bg-[var(--color-border)] hidden md:block" />
          <div className="flex flex-wrap justify-center gap-2">
            <span className="mr-2 flex items-center font-body text-sm font-extrabold uppercase text-[var(--color-text-secondary)]">
              Giảm giá:
            </span>
            {discounts.map((disc) => (
              <button
                key={disc.id}
                className={`rounded-full border px-4 py-2 font-body text-sm font-extrabold uppercase transition-colors ${
                  selectedDiscount === disc.id
                    ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                    : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]'
                }`}
                onClick={() => setSelectedDiscount(disc.id)}
              >
                {disc.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mb-16">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[var(--color-text-secondary)]">Không tìm thấy sản phẩm khuyến mãi nào.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 gap-y-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Load More */}
        <div className="mt-20 flex justify-center">
          <button className="rounded-full border border-primary bg-white px-12 py-4 font-display text-base font-extrabold text-primary shadow-soft transition-all duration-300 hover:bg-primary hover:text-on-primary">
            Xem thêm sản phẩm
          </button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-[linear-gradient(135deg,var(--color-secondary-soft),var(--color-primary-soft))] py-16">
        <div className="max-w-xl mx-auto px-4 md:px-6 text-center">
          <h2 className="font-display text-[var(--text-2xl)] font-extrabold text-[var(--color-text-primary)] mb-4">
            Nhận tin ưu đãi sớm nhất
          </h2>
          <p className="font-body text-base leading-relaxed text-[var(--color-text-secondary)] mb-8">
            Tham gia cộng đồng KỶ NGUYÊN KID để nhận thông tin về các bộ sưu tập mới và các chương trình ưu đãi dành riêng cho thành viên.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              className="flex-grow rounded-full border border-[var(--color-border)] bg-white px-6 py-3 shadow-soft placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-border-focus)] focus:ring-4 focus:ring-primary/20"
              placeholder="Địa chỉ email của bạn"
              type="email"
            />
            <button
              className="rounded-full bg-primary px-8 py-3 font-display text-base font-extrabold text-on-primary shadow-button transition-colors hover:bg-secondary hover:text-[var(--badge-sale-text)]"
              type="submit"
            >
              Đăng ký ngay
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default SalePage;



