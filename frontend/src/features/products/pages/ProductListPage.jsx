import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productApi } from '../services/productApi';

const formatPrice = (value) => `${new Intl.NumberFormat('vi-VN').format(value)}đ`;

function ProductCard({ product }) {
  return (
    <div className="product-card group cursor-pointer rounded-[var(--radius-md)]">
      <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-bg-muted)] shadow-card">
        <img
          alt={product.name}
          className="product-img w-full h-full object-cover"
          src={product.image || 'https://via.placeholder.com/400x533'}
        />
        {product.discount && (
          <span className="absolute left-4 top-4 rounded-full bg-[var(--badge-sale-bg)] px-3 py-1 font-body text-xs font-extrabold uppercase text-[var(--badge-sale-text)] shadow-soft">
            -{product.discount}%
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

export function ProductListPage() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isSalePage = searchParams.get('sale') === 'true';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = isSalePage ? { sale: true } : {};
        const response = await productApi.list(params);
        setProducts(response.data || []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Không thể tải sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [isSalePage]);

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
          {isSalePage ? 'Khuyến mãi' : 'Sản phẩm'}
        </h1>
        <p className="font-body text-base leading-loose text-[var(--color-text-secondary)] max-w-2xl mx-auto">
          {isSalePage
            ? 'Tại Stitch, chúng tôi tin rằng thời trang cao cấp cho trẻ em không nên gây tổn hại đến hành tinh. Các chương trình ưu đãi của chúng tôi giúp những sản phẩm làm từ sợi hữu cơ và vật liệu tái chế trở nên dễ dàng tiếp cận hơn.'
            : 'Khám phá bộ sưu tập thời trang trẻ em bền vững của Stitch, được làm từ sợi hữu cơ và vật liệu tái chế.'}
        </p>
      </section>

      {/* Filter Bar */}
      {isSalePage && (
        <section className="sticky top-20 z-40 mb-12 border-y border-[var(--color-border)] bg-white/90 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap justify-center gap-2">
              <button className="rounded-full bg-primary px-6 py-3 font-body text-sm font-extrabold uppercase text-on-primary shadow-button transition-all">
                Tất cả
              </button>
              <button className="rounded-full bg-white px-6 py-3 font-body text-sm font-extrabold uppercase text-[var(--color-text-primary)] shadow-soft transition-all hover:bg-secondary-soft hover:text-[var(--color-text-accent)]">
                Bé trai
              </button>
              <button className="rounded-full bg-white px-6 py-3 font-body text-sm font-extrabold uppercase text-[var(--color-text-primary)] shadow-soft transition-all hover:bg-secondary-soft hover:text-[var(--color-text-accent)]">
                Bé gái
              </button>
              <button className="rounded-full bg-white px-6 py-3 font-body text-sm font-extrabold uppercase text-[var(--color-text-primary)] shadow-soft transition-all hover:bg-secondary-soft hover:text-[var(--color-text-accent)]">
                Giày dép
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mb-16">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[var(--color-text-secondary)]">Không tìm thấy sản phẩm nào.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 gap-y-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}


