import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const heroImages = [
  '/images/hero.png',
  '/images/hero2.png',
  '/images/hero3.png'
];

const saleProducts = [
  {
    name: 'Áo len vặn thừng hữu cơ',
    price: 850000,
    originalPrice: 1450000,
    badge: '-40%',
    to: '/categories/do-be-gai',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBEEZ22GqCmWse1i8pp2UqXQvpA0M_dqFONLWqxD9TkPWnDAMq916EBbnS898U5bkyGh0SneTpJ7a8THyk6zZUaJa8qyQPCBNFpBG3g30x1v4qxeDUGT57ErGUpG72YGDEi67v-DyKunWgiKMTychMScuQYtVgTasV8IZJYKkQI7-ukhQBuiSlUBbLi45clEwrx8WMWhkXcGD7j0ZYbJ9mLmrKGsBuUnpyLyv3yp44vGSDRfgZC6LD0IsFTwCGrVehlbx90TWVWmyNn',
  },
  {
    name: 'Váy hoa cotton terracotta',
    price: 690000,
    originalPrice: 980000,
    badge: '-30%',
    to: '/categories/do-be-gai',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDNpzVPbISbTyuWOLUzwt1ECvEQ3lCwQeMtrDGC9EjmN1QTJz_YKFSA-KGdbZ1_hLlKS014kP8-B4gxO4keH3CNX06VIXpgR5tN_vUJepBAJW2xK78ma9CPxfA47iTbzLY6UDtTq0uAISqdIW11f4UeJ3BC8aYEMM6u6Sit0Pomdo63ZLvXAZChyc5iS_m7qIjigpn4ESWWHzjqKdcZ4_owAMVcrB0gSUONuDS-AbZi4OBR21j7eaiXDRUKFr1h5aSDZnX4laxKFRXg',
  },
  {
    name: 'Yếm linen sage',
    price: 760000,
    originalPrice: 950000,
    badge: '-20%',
    to: '/categories/do-be-gai',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBK6kw8LMCCXy305Vzz4IzfiA8JBRQjnldgVJUJrncTbsttTrtKBM8P22W-YtRAkJ6q09tK6bNsAFhkYgMf4u68-PSzs0ppYJ_0BLK8f0hfz7XPZ9EfwD_6QQROvJRsXIK9bKvXfAgAnXCPu9YYHKUV-d3Olp_bBXwxeeVMRHgRkC3xMyx_9gYaljyBtwA3-5hT31_HSr9NR_4F9kz1vxy-pBincnVKJehuyyQyVvGxS2u6rMBsnYxz5lGSen6H_UF6ZvYcpC_O2jZT',
  },
  {
    name: 'Sneaker canvas cho bé',
    price: 580000,
    originalPrice: 780000,
    badge: '-25%',
    to: '/categories/giay-dep',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAn_QXJPzqmLHfjVjt1xCXCB2RGRBKhUUqNqXppmAqUWgIQ51fXVdM3Xg0gH230Y9sco4VkPXzQ6mFkmFrArHGPSPHHpLRJmPgO0UOqp4s-v1IJpyzUETl23prvtzhF-hG02UiEEtBPu9I0eultse-NPT69G3c4XybdGQIwSMRiPX-cnj0vPE2LLqXJ81BPrGCRChv0o7DKQj2evQ5xyYb58n-MLdA7W-rug5GjyrcjK9fEJdmiF5x_Nl1Ld1hlLXdiJ6GbQTBZWTp0',
  },
];

const bestSellers = [
  {
    name: 'Set cotton & linen bé trai',
    price: 890000,
    badge: 'Bán chạy',
    to: '/categories/do-be-trai',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Set chân váy dusty rose',
    price: 1150000,
    to: '/categories/do-be-gai',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Áo thun bé trai organic',
    price: 950000,
    to: '/categories/do-be-trai',
    image:
      'https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Đầm smock cotton kem',
    price: 980000,
    badge: 'Mới',
    to: '/categories/do-be-gai',
    image:
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=80',
  },
];

const categoryTiles = [
  {
    title: 'Bé gái',
    label: 'Bộ sưu tập',
    description: 'Thiết kế dịu nhẹ cho những ngày bé thỏa sức chạy nhảy.',
    to: '/categories/do-be-gai',
    className: 'md:col-span-7 md:row-span-2 h-[390px] md:h-auto',
    image:
      '/images/begai.jpg',
  },
  {
    title: 'Bé trai',
    label: 'Năng động',
    to: '/categories/do-be-trai',
    className: 'md:col-span-5 h-[280px] md:h-auto',
    image:
      '/images/betrai.png',
  },
  {
    title: 'Sơ sinh',
    label: 'Mềm mại',
    to: '/categories/so-sinh',
    className: 'md:col-span-2 h-[220px] md:h-auto',
    image:
      'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Giày dép',
    label: 'Êm từng bước',
    to: '/categories/giay-dep',
    className: 'md:col-span-3 h-[220px] md:h-auto',
    image:
      '/images/giay.png',
  },
];

const serviceNotes = [
  { icon: 'local_shipping', text: 'Miễn phí vận chuyển toàn quốc' },
  { icon: 'eco', text: '100% vải organic chứng nhận' },
  { icon: 'cached', text: '30 ngày đổi trả dễ dàng' },
];

const testimonials = [
  {
    quote:
      'Vải organic rất mềm, bé nhà mình da nhạy cảm mặc cả ngày vẫn thoải mái.',
    name: 'Mẹ Thu Trang',
    city: 'Hà Nội',
  },
  {
    quote:
      'Thiết kế tối giản nhưng lên dáng rất xinh. Mình thích cách shop đóng gói nhẹ nhàng và có trách nhiệm.',
    name: 'Mẹ Lan Anh',
    city: 'TP. HCM',
  },
  {
    quote:
      'Giày canvas giữ form tốt, bé chạy nhảy nhiều mà chân vẫn êm. Sẽ quay lại mua thêm.',
    name: 'Mẹ Minh Hà',
    city: 'Đà Nẵng',
  },
];

const formatPrice = (value) => `${new Intl.NumberFormat('vi-VN').format(value)}đ`;

function ProductCard({ product }) {
  return (
    <Link className="product-card group block" to={product.to}>
      <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-bg-muted)] shadow-card">
        {product.badge && (
          <span className="absolute right-4 top-4 z-10 rounded-full bg-[var(--badge-sale-bg)] px-3 py-1 text-xs font-extrabold uppercase text-[var(--badge-sale-text)] shadow-soft">
            {product.badge}
          </span>
        )}
        <img
          alt={product.name}
          className="product-image h-full w-full object-cover transition-transform duration-700 ease-out"
          loading="lazy"
          src={product.image}
        />
      </div>
      <h3 className="font-display text-title-sm text-[var(--color-text-primary)] transition-colors group-hover:text-primary">
        {product.name}
      </h3>
      <div className="mt-1 flex flex-wrap items-center gap-2">
        <p className="font-body text-lg font-extrabold text-primary">{formatPrice(product.price)}</p>
        {product.originalPrice && (
          <p className="font-body text-sm font-normal text-[var(--color-text-muted)] line-through">
            {formatPrice(product.originalPrice)}
          </p>
        )}
      </div>
    </Link>
  );
}

function SectionHeading({ eyebrow, title, action, to }) {
  return (
    <div className="mb-8 flex flex-col gap-3 text-center sm:mb-10 sm:items-center">
      <h1 className="font-body text-lg font-extrabold uppercase text-[var(--color-text-accent)]">{eyebrow}</h1>
      <h2 className="font-display text-[var(--text-2xl)] font-extrabold text-[var(--color-text-primary)] md:text-[var(--text-3xl)]">{title}</h2>
      {action && to && (
        <Link
          className="inline-flex items-center justify-center font-body text-sm font-medium tracking-wide uppercase text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
          to={to}
        >
          {action}
          <span className="material-symbols-outlined ml-1 text-[18px]">arrow_forward</span>
        </Link>
      )}
    </div>
  );
}

export function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const keyword = searchTerm.trim();
    if (keyword) {
      navigate(`/search?q=${encodeURIComponent(keyword)}`);
    }
  };

  const handleSubscribe = (event) => {
    event.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="w-full overflow-hidden bg-[var(--color-bg-base)] text-[var(--color-text-primary)]">
      <section className="relative flex min-h-[560px] items-center overflow-hidden md:min-h-[620px] lg:min-h-[680px] pt-[120px] md:pt-[160px] lg:pt-[200px]">
        {/* Slideshow background layers */}
        {heroImages.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 bg-cover bg-[center_25%] transition-opacity duration-1000 ${
              index === currentHeroIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(37,99,235,0.52),rgba(249,168,212,0.28),rgba(253,230,138,0.12))]" />
        
        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-6 py-20 text-[var(--color-text-inverse)]">
          <div className="max-w-3xl">
            <h1 className="max-w-2xl font-display text-[var(--text-2xl)] font-extrabold leading-relaxed text-[var(--color-text-inverse)] md:text-[var(--text-3xl)]">
              Thời trang trẻ em bền vững, mềm mại trên da bé và chỉn chu trong từng đường may cho những ngày tuổi thơ tự do.
            </h1>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-14 items-center justify-center rounded-full bg-primary px-8 py-4 font-display text-base font-extrabold text-on-primary shadow-button transition-all hover:-translate-y-0.5 hover:bg-secondary hover:text-[var(--badge-sale-text)] active:translate-y-0"
                to="/categories/do-be-gai"
              >
                Khám phá bộ sưu tập
              </Link>
              <Link
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/70 bg-white/15 px-8 py-4 font-display text-base font-extrabold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white hover:text-primary"
                to="/khuyen-mai"
              >
                Xem ưu đãi
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--color-border)] bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 md:px-6 py-7 lg:flex-row lg:items-center lg:justify-between">
          <form className="relative w-full lg:max-w-md" onSubmit={handleSearch}>
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]">
              search
            </span>
            <input
              className="h-14 w-full rounded-full border border-[var(--color-border)] bg-white pl-12 pr-4 font-body text-base outline-none shadow-soft transition focus:border-[var(--color-border-focus)] focus:ring-4 focus:ring-primary/20 placeholder:text-[var(--color-text-muted)]"
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Tìm quần áo cho bé..."
              type="search"
              value={searchTerm}
            />
          </form>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {[
              ['Tất cả', '/products'],
              ['Bé trai', '/categories/do-be-trai'],
              ['Bé gái', '/categories/do-be-gai'],
              ['Sơ sinh', '/categories/so-sinh'],
              ['Giày dép', '/categories/giay-dep'],
              ['Khuyến mãi', '/khuyen-mai'],
            ].map(([label, to], index) => (
              <Link
                className={`whitespace-nowrap rounded-full px-5 py-2 font-body text-sm font-medium tracking-wide uppercase transition ${index === 0
                    ? 'bg-primary text-on-primary shadow-button'
                    : 'bg-white text-[var(--color-text-primary)] shadow-soft hover:bg-secondary-soft hover:text-[var(--color-text-accent)]'
                  }`}
                key={label}
                to={to}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="marquee-container border-y border-[var(--color-border)] bg-accent/50 py-4">
        <div className="marquee-content">
          {[...serviceNotes, ...serviceNotes].map((item, index) => (
            <span
              className="mx-6 inline-flex items-center gap-2 whitespace-nowrap font-body text-sm font-medium tracking-wide uppercase text-[var(--color-text-secondary)]"
              key={`${item.text}-${index}`}
            >
              <span className="material-symbols-outlined text-[18px] text-[var(--color-text-accent)]">{item.icon}</span>
              {item.text}
            </span>
          ))}
        </div>
      </div>

      <section className="mx-auto w-full max-w-7xl px-4 md:px-6 py-12 md:py-16">
        <SectionHeading
          action="Xem tất cả sale"
          eyebrow="Ưu đãi đặc biệt"
          title="Sản phẩm khuyến mãi"
          to="/products?sale=true"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {saleProducts.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 md:px-6 pb-12 md:pb-16">
        <SectionHeading
          action="Xem tất cả"
          eyebrow="Được yêu thích nhất"
          title="Sản phẩm bán chạy"
          to="/products"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 md:px-6 pb-12 md:pb-16">
        <SectionHeading eyebrow="Mua theo nhu cầu" title="Khám phá danh mục" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:auto-rows-[260px]">
          {categoryTiles.map((tile) => (
            <Link
              className={`group relative block overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-bg-muted)] shadow-card ${tile.className}`}
              key={tile.title}
              to={tile.to}
            >
              <img
                alt={tile.title}
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                src={tile.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-[var(--color-text-inverse)] md:p-8">
                <p className="mb-2 font-body text-sm font-medium tracking-wider uppercase text-white/90">{tile.label}</p>
                <h3 className="font-display text-[var(--text-2xl)] font-extrabold md:text-[var(--text-3xl)]">{tile.title}</h3>
                {tile.description && (
                  <p className="mt-2 max-w-sm font-body text-sm leading-relaxed text-[var(--color-text-inverse)] opacity-90">{tile.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[linear-gradient(135deg,var(--color-primary-soft),var(--color-secondary-soft)_55%,var(--color-accent-soft))] py-12 text-[var(--color-text-primary)] md:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 md:px-6 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <p className="mb-4 inline-flex rounded-full bg-[var(--color-text-inverse)] bg-opacity-15 px-4 py-1 font-body text-sm font-medium tracking-wider uppercase">
              Ưu đãi có hạn
            </p>
            <h2 className="font-display text-[var(--text-4xl)] font-extrabold leading-tight md:text-[var(--text-5xl)]">
              Mùa tựu trường giảm đến 40%
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-body text-base leading-loose text-[var(--color-text-secondary)] lg:mx-0">
              Những thiết kế an toàn cho làn da nhạy cảm của bé, sẵn sàng cho ngày mới nhiều khám phá.
            </p>
            <div className="my-8 flex justify-center gap-5 lg:justify-start">
              {[
                ['08', 'Giờ'],
                ['42', 'Phút'],
                ['15', 'Giây'],
              ].map(([value, label]) => (
                <div className="min-w-16 text-center" key={label}>
                  <span className="block font-display text-[var(--text-3xl)] font-normal">{value}</span>
                  <span className="font-body text-sm font-extrabold uppercase text-[var(--color-text-secondary)]">{label}</span>
                </div>
              ))}
            </div>
            <Link
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-primary px-8 py-4 font-display text-base font-extrabold text-on-primary shadow-button transition hover:bg-secondary hover:text-[var(--badge-sale-text)]"
              to="/products?sale=true"
            >
              Săn ngay
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {saleProducts.slice(0, 2).map((product, index) => (
              <div
                className={`aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] bg-white/80 shadow-card ${index === 0 ? 'translate-y-8' : ''
                  }`}
                key={product.name}
              >
                <img
                  alt={product.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  src={product.image}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 md:px-6 py-12 md:py-16 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <div className="aspect-square overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-bg-muted)] shadow-card">
            <img
              alt="Xưởng may thủ công cho thời trang trẻ em"
              className="h-full w-full object-cover"
              loading="lazy"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0er3X5OqIm6SIV3MxTBlBv1AMcmen5a1Zfa4dlWeTb2VgVYGld9tWMJuVicWnP0V47pkWLjAurCvLPYsvL0_M4QH3fccKcuyct2Lw2ul6HgZDU6avh_P4CAhycxo9d2zihJKaeGmeLAVRvcSE2jEVWFnuJKogY4oUH9Rgese1-SjMQgY1MMe-2ALy6BGzRV3L2KLq93wiQ72wpij5jnMFPyJ7JRLb7RzBWV8Inf-dv5C9H5XiP7fjE9KfjH6ekkV4vfVC5_C2XmOs"
            />
          </div>
          <div className="mt-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white p-6 shadow-soft lg:absolute lg:-bottom-8 lg:-right-8 lg:mt-0 lg:max-w-xs">
            <p className="font-display text-[var(--text-2xl)] font-normal italic text-[var(--color-text-primary)]">
              "Mềm mại như vòng tay mẹ"
            </p>
            <p className="mt-2 font-body text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Chúng tôi ưu tiên sợi tự nhiên, đường may phẳng và cảm giác dễ chịu trong từng sản phẩm.
            </p>
          </div>
        </div>
        <div>
          <h1 className="mb-4 font-body text-lg font-extrabold uppercase text-[var(--color-text-accent)]">Về KỶ NGUYÊN KID</h1>
          <h2 className="font-display text-[var(--text-3xl)] font-extrabold leading-tight text-[var(--color-text-primary)] md:text-[var(--text-4xl)]">
            Vì một tương lai thời trang tử tế cho con
          </h2>
          <p className="mt-6 font-body text-base leading-loose text-[var(--color-text-secondary)]">
            KỶ NGUYÊN KID ra đời từ mong muốn mang đến trang phục bền, đẹp và an toàn cho trẻ nhỏ. Mỗi chất liệu được chọn để bé thoải mái vận động, còn cha mẹ yên tâm hơn với lựa chọn mỗi ngày.
          </p>
          <p className="mt-4 font-body text-base leading-loose text-[var(--color-text-secondary)]">
            Từ cotton organic đến linen thoáng mát, các thiết kế giữ tinh thần tối giản, dễ phối và đủ mềm mại cho làn da nhạy cảm.
          </p>
          <Link className="mt-8 inline-flex items-center gap-3 font-body font-medium tracking-wide uppercase text-[var(--color-text-primary)]" to="/products">
            Câu chuyện sản phẩm
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </Link>
        </div>
      </section>

      <section className="bg-[var(--color-bg-muted)] py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeading eyebrow="Đánh giá" title="Các mẹ nói gì về KỶ NGUYÊN KID" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article
                className="flex min-h-[260px] flex-col rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white p-7 shadow-soft"
                key={testimonial.name}
              >
                <div className="mb-4 flex text-[var(--color-text-accent)]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span className="material-symbols-outlined text-[20px]" key={index}>
                      star
                    </span>
                  ))}
                </div>
                <p className="font-body text-base italic leading-loose text-[var(--color-text-secondary)]">
                  "{testimonial.quote}"
                </p>
                <div className="mt-auto pt-6">
                  <p className="font-body font-medium uppercase text-[var(--color-text-primary)]">{testimonial.name}</p>
                  <p className="font-body text-sm text-[var(--color-text-muted)]">{testimonial.city}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] bg-[linear-gradient(135deg,var(--color-secondary-soft),var(--color-primary-soft))] py-12 md:py-16">
        <div className="mx-auto max-w-2xl px-4 md:px-6 text-center">
          <h2 className="font-display text-[var(--text-3xl)] font-extrabold text-[var(--color-text-primary)]">Kết nối với KỶ NGUYÊN KID</h2>
          <p className="mt-4 font-body text-base leading-relaxed text-[var(--color-text-secondary)]">
            Nhận tin sớm về bộ sưu tập mới, chất liệu an toàn cho bé và ưu đãi đầu mùa.
          </p>
          {subscribed ? (
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)] bg-[var(--color-bg-card)] px-6 py-4 font-body font-medium text-[var(--color-text-primary)]">
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              Cảm ơn bạn đã đăng ký!
            </div>
          ) : (
            <form className="mt-8 flex flex-col gap-3 sm:flex-row" onSubmit={handleSubscribe}>
              <input
                className="min-h-14 flex-1 rounded-full border border-[var(--color-border)] bg-white px-5 font-body text-base outline-none shadow-soft transition focus:border-[var(--color-border-focus)] focus:ring-4 focus:ring-primary/20 placeholder:text-[var(--color-text-muted)]"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Địa chỉ email"
                required
                type="email"
                value={email}
              />
              <button
                className="min-h-14 rounded-full bg-primary px-8 font-display text-base font-extrabold text-on-primary shadow-button transition hover:bg-secondary hover:text-[var(--badge-sale-text)]"
                type="submit"
              >
                Đăng ký
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}



