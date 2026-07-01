import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../../cart/cartSlice';

const NEWBORN_PRODUCT_DATABASE = {
  'body-cotton-so-sinh-organic': {
    id: 'body-cotton-so-sinh-organic',
    name: 'Body Cotton Sơ Sinh Organic',
    category: 'DÒNG SƠ SINH',
    price: 450000,
    badge: 'ORGANIC COTTON',
    badgeColor: 'bg-[var(--color-mint)]',
    subtitle: '100% Cotton Organic',
    description: 'Được làm từ 100% bông hữu cơ đạt chuẩn GOTS, không chứa hóa chất độc hại. Thiết kế với cúc cài ở vai giúp dễ dàng mặc cho bé mà không gây khó chịu. Vải mềm mại, thoáng khí, tuyệt đối an toàn cho làn da nhạy cảm của trẻ sơ sinh.',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80',
    ],
    sizes: [
      { label: 'Newborn', description: '0-3 tháng' },
      { label: '0-3M', description: '3-6 tháng' },
      { label: '3-6M', description: '6-9 tháng' },
    ],
    colors: [
      { hex: '#F5F5DC', name: 'Beige' },
      { hex: '#DCFCE7', name: 'Xanh nhạt' },
      { hex: '#D2B48C', name: 'Nâu' },
    ],
    features: [
      { icon: 'eco', title: 'Organic Cotton', description: '100% bông hữu cơ GOTS' },
      { icon: 'spa', title: 'Mềm mại', description: 'Không gây kích ứng da' },
      { icon: 'checkroom', title: 'Dễ mặc', description: 'Cúc cài tiện lợi' },
    ],
  },
  'bo-quan-ao-vai-xo-organic': {
    id: 'bo-quan-ao-vai-xo-organic',
    name: 'Bộ Quần Áo Vải Xô Organic',
    category: 'BỘ QUẦN ÁO',
    price: 590000,
    badge: 'ORGANIC COTTON',
    badgeColor: 'bg-[var(--color-mint)]',
    subtitle: 'Bộ hoàn chỉnh',
    description: 'Bộ quần áo vải xô organic với thiết kế thoải mái, cho bé tự do vận động. Chất liệu thấm hút mồ hôi tốt, giữ cho bé luôn khô ráo. Sợi vải bền màu, không bị xù lông sau nhiều lần giặt.',
    image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=900&q=80',
    ],
    sizes: [
      { label: '0-3M', description: '3-6 tháng' },
      { label: '3-6M', description: '6-9 tháng' },
      { label: '6-9M', description: '9-12 tháng' },
    ],
    colors: [
      { hex: '#FFFFFF', name: 'Trắng' },
      { hex: '#DCFCE7', name: 'Xanh nhạt' },
    ],
    features: [
      { icon: 'eco', title: 'Organic Cotton', description: '100% bông hữu cơ GOTS' },
      { icon: 'spa', title: 'Thoáng khí', description: 'Thấm hút mồ hôi tốt' },
      { icon: 'checkroom', title: 'Bền màu', description: 'Không xù lông' },
    ],
  },
};

const RELATED_PRODUCTS = [
  {
    id: 'bo-quan-ao-vai-xo-organic',
    name: 'Bộ Quần Áo Vải Xô Organic',
    price: 590000,
    image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=900&q=80',
    category: 'BỘ QUẦN ÁO',
  },
  {
    id: 'chan-len-cuu-tu-nhien',
    name: 'Chăn Len Cừu Tự Nhiên',
    price: 1250000,
    image: '/images/chanlencuu.png',
    category: 'CHĂN GA',
  },
  {
    id: 'set-do-ngu-diu-nhe',
    name: 'Set Đồ Ngủ Dịu Nhẹ',
    price: 380000,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80',
    category: 'ĐỒ NGỦ',
  },
];

const formatPrice = (value) => `${new Intl.NumberFormat('vi-VN').format(value)}₫`;

export function NewbornProductDetailPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.items || []);

  const product = NEWBORN_PRODUCT_DATABASE[slug] || NEWBORN_PRODUCT_DATABASE['body-cotton-so-sinh-organic'];

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.hex || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]?.label || '');
  const [quantity, setQuantity] = useState(1);
  const [successToast, setSuccessToast] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setSelectedColor(product.colors[0]?.hex || '');
    setSelectedSize(product.sizes[0]?.label || '');
    setQuantity(1);
    setCurrentImageIndex(0);
    setSuccessToast(false);
  }, [slug, product]);

  const handleAddToCart = () => {
    const existingIndex = cartItems.findIndex((item) => item.id === product.id);
    let newItems;
    if (existingIndex > -1) {
      newItems = cartItems.map((item, idx) =>
        idx === existingIndex ? { ...item, quantity: (item.quantity || 1) + quantity } : item
      );
    } else {
      newItems = [
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
        }
      ];
    }

    dispatch(setCart(newItems));
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 3000);
  };

  const activeColorName = product.colors.find((c) => c.hex === selectedColor)?.name || '';
  const activeSizeDescription = product.sizes.find((s) => s.label === selectedSize)?.description || '';

  return (
    <div className="w-full min-h-screen bg-[var(--color-bg-base)] text-[var(--color-text-primary)] font-body">
      {successToast && (
        <div className="fixed top-24 right-6 z-50 bg-[var(--color-mint)] border border-[var(--color-success)] text-[var(--color-text-primary)] px-6 py-4 rounded-[var(--radius-md)] shadow-lg flex items-center gap-3 animate-fade-in font-medium">
          <span className="material-symbols-outlined text-[var(--color-success)]">check_circle</span>
          Đã thêm sản phẩm vào giỏ hàng!
        </div>
      )}

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <Link to="/categories/so-sinh" className="hover:text-primary transition-colors">Đồ sơ sinh</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-[var(--color-text-primary)]">{product.name}</span>
        </div>
      </div>

      {/* Product Detail Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/5] rounded-[var(--radius-md)] overflow-hidden bg-[var(--color-bg-muted)] shadow-soft">
              <img
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                src={product.gallery[currentImageIndex]}
                alt={product.name}
              />
            </div>
            {product.gallery.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {product.gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-[var(--radius-sm)] overflow-hidden border-2 transition-all ${
                      currentImageIndex === index
                        ? 'border-primary scale-105'
                        : 'border-transparent hover:border-primary/50'
                    }`}
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <div>
              {product.badge && (
                <span className={`${product.badgeColor} text-[var(--color-text-primary)] px-3 py-1 rounded-full font-label-uppercase text-[10px] inline-block mb-3`}>
                  {product.badge}
                </span>
              )}
              <p className="font-label-uppercase text-[10px] text-[var(--color-text-secondary)] mb-2">{product.category}</p>
              <h1 className="font-display text-[28px] md:text-[32px] text-[var(--color-text-primary)] mb-2">
                {product.name}
              </h1>
              <p className="font-body text-[var(--color-text-secondary)] mb-4">{product.subtitle}</p>
              <p className="font-display text-[24px] md:text-[28px] text-primary font-bold">
                {formatPrice(product.price)}
              </p>
            </div>

            <p className="font-body text-[var(--color-text-primary)] leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-3">
              {product.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--color-bg-soft)] rounded-full"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">{feature.icon}</span>
                  <div className="text-left">
                    <p className="font-label-uppercase text-[10px] font-bold text-[var(--color-text-primary)]">{feature.title}</p>
                    <p className="text-[10px] text-[var(--color-text-secondary)]">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-label-uppercase text-[12px] font-bold text-[var(--color-text-primary)]">Kích thước</span>
                <button className="text-[10px] underline text-primary font-bold">Hướng dẫn chọn size</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => {
                  const isActive = selectedSize === size.label;
                  return (
                    <button
                      key={size.label}
                      onClick={() => setSelectedSize(size.label)}
                      className={`px-6 py-3 rounded-full border-2 font-label-uppercase text-[12px] font-bold transition-all ${
                        isActive
                          ? 'border-primary bg-primary text-white'
                          : 'border-[var(--color-border)] bg-white text-[var(--color-text-primary)] hover:border-primary'
                      }`}
                    >
                      {size.label}
                    </button>
                  );
                })}
              </div>
              {activeSizeDescription && (
                <p className="text-[10px] text-[var(--color-text-secondary)] mt-2">{activeSizeDescription}</p>
              )}
            </div>

            {/* Color Selection */}
            <div>
              <span className="font-label-uppercase text-[12px] font-bold text-[var(--color-text-primary)] mb-3 block">
                Màu sắc: <span className="font-normal text-[var(--color-text-secondary)]">{activeColorName}</span>
              </span>
              <div className="flex gap-3">
                {product.colors.map((color) => {
                  const isActive = selectedColor === color.hex;
                  return (
                    <button
                      key={color.hex}
                      onClick={() => setSelectedColor(color.hex)}
                      style={{ backgroundColor: color.hex }}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        isActive ? 'border-primary scale-110' : 'border-[var(--color-border)] hover:border-primary'
                      }`}
                      title={color.name}
                    />
                  );
                })}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <span className="font-label-uppercase text-[12px] font-bold text-[var(--color-text-primary)] mb-3 block">Số lượng</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-[var(--color-border)] rounded-full overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-[20px] hover:bg-[var(--color-bg-muted)] transition-colors"
                  >
                    -
                  </button>
                  <span className="w-16 text-center font-body font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center text-[20px] hover:bg-[var(--color-bg-muted)] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 h-14 bg-primary text-white rounded-full font-label-uppercase text-[12px] font-bold hover:bg-secondary transition-all shadow-lg shadow-primary/20 active:scale-95"
              >
                Thêm vào giỏ hàng
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 h-14 border-2 border-primary text-primary rounded-full font-label-uppercase text-[12px] font-bold hover:bg-primary hover:text-white transition-all active:scale-95"
              >
                Mua ngay
              </button>
            </div>

            {/* Info Accordions */}
            <div className="space-y-4 pt-4 border-t border-[var(--color-border)]">
              <details className="group pb-4 border-b border-[var(--color-border)]" open>
                <summary className="flex justify-between items-center cursor-pointer list-none font-label-uppercase text-[12px] font-bold text-[var(--color-text-primary)]">
                  Mô tả sản phẩm
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <div className="pt-4 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {product.description}
                </div>
              </details>
              <details className="group pb-4 border-b border-[var(--color-border)]">
                <summary className="flex justify-between items-center cursor-pointer list-none font-label-uppercase text-[12px] font-bold text-[var(--color-text-primary)]">
                  Hướng dẫn bảo quản
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <div className="pt-4 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  Giặt máy ở nhiệt độ thấp (30°C). Không sử dụng chất tẩy trắng. Phơi ở nơi thoáng mát, tránh ánh nắng trực tiếp. Ủi ở nhiệt độ thấp nếu cần.
                </div>
              </details>
              <details className="group pb-4 border-b border-[var(--color-border)]">
                <summary className="flex justify-between items-center cursor-pointer list-none font-label-uppercase text-[12px] font-bold text-[var(--color-text-primary)]">
                  Giao hàng & Đổi trả
                  <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <div className="pt-4 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  Miễn phí giao hàng cho đơn hàng trên 500.000đ. Hỗ trợ đổi trả trong vòng 30 ngày với điều kiện sản phẩm còn nguyên tem mác và chưa qua sử dụng.
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <section className="bg-[var(--color-bg-soft)] py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-[28px] md:text-[32px] text-primary mb-4">HOÀN THIỆN BỘ ĐỒ CHO BÉ</h2>
            <p className="font-body text-[var(--color-text-secondary)]">Khám phá thêm các sản phẩm tương tự</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {RELATED_PRODUCTS.map((related) => (
              <Link
                to={`/newborn-products/${related.id}`}
                key={related.id}
                className="group cursor-pointer block"
              >
                <div className="aspect-[3/4] rounded-[var(--radius-md)] overflow-hidden mb-4 bg-[var(--color-bg-muted)] relative shadow-soft">
                  <img
                    alt={related.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={related.image}
                  />
                  <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-soft opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span className="material-symbols-outlined text-primary">add_shopping_cart</span>
                  </button>
                </div>
                <div>
                  <p className="font-label-uppercase text-[10px] text-[var(--color-text-secondary)] mb-1">{related.category}</p>
                  <h3 className="font-body text-[16px] text-[var(--color-text-primary)] mb-2 group-hover:text-primary transition-colors">
                    {related.name}
                  </h3>
                  <p className="font-body text-primary font-bold">{formatPrice(related.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
