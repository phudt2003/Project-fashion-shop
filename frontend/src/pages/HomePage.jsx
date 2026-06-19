import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const heroImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD-9xPP3TJ4Mpid9ohgnjmPqBsz3D7awIJ-Vx-LhVpKSibhh5f8u8jV_9tnai80p_L6s-lVk_y6OIYv9zOhcmw7MR0Sz-rjmeqXAriUlayqe2AyHW-EhEA0gGFUEnoZEfgbUBx19gbWQ-U-5iQsiZUZxaWzCQwJHLbI-vqhyIUTkuLQt-JKWWwOXH7stp3KkpiKJaNd44fFPPWZYFKAhNEnZOegeOFS7pmZRemeWemJQFsA1_9WYI2DsHvU40yxz3fPXnrc1wzajTyO';

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
    to: '/categories/footwear',
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
      'https://images.unsplash.com/photo-1516627145492-a7f7871c2a2b?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Set chân váy dusty rose',
    price: 1150000,
    to: '/categories/do-be-gai',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAj5p1wHBC-swQfLiW7If5JsJ6XDKajAFHQbEc4eN2peXIWdTbx6FBJNKRkBogrgOkr7uCzu4CA2HD0INNTpr2hspuNzG8Mozpwck4Twmy3XsxYRUF4F6dO0b1FbdfJEQQjo0QBg0ZzAkFLpfgSRFxGi3NLEYuED-AWXMwOKTO_UJzedB-JWSA3yfn04tCsmymbrKgeyqrS_Ev2SskX2zt9zWIVPECd71-H32J0eWMcpRIn_2WGPIh-SzS2w8PrCZb3r-NCABxYMnpo',
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
      'https://lh3.googleusercontent.com/aida/AP1WRLurJ2RXLlMhl5O8PMmXLMfFZNPJbaeO7fvXs_lIaBYWsrgdxmwL6Ck8MNZnXe1rGWK0VjtD-DCTS4SsEL2uQXbLWYLSQnxxDSMtoq5FQ1xGpiFBkPWj3ewPQgpAWZ9J127WNAF80miTTuckQ2TPftJH_1rvqKEfSNpoHf37pLW_T3IYJOsbNwUDzUIgr0oY-kkOMx-l-vhG9Hg4kHNqrWTa22p4eTKORqdpYd0iqCP1gHfMyrTj-QyEkGmq',
  },
  {
    title: 'Bé trai',
    label: 'Năng động',
    to: '/categories/do-be-trai',
    className: 'md:col-span-5 h-[280px] md:h-auto',
    image:
      'https://lh3.googleusercontent.com/aida/AP1WRLsAnzGEcQ3ZFXy1duQLsIt8iqtri0mhjm6bPYEQJhSs3Oco-4BXfsJTr_prc7u9tWDDwCYSxbU1dVazORAjYXewTaOIAwOd-v9RmDcr4KI5wHQ4fEk2kxQTO_9NqIs5BWpOSaDk4VsE6obFP7zg7FqKJaaoiciVixc9g5TalvXjI_jMohJXdo00Tp3CxnmCmXvN9SAw0sxvZnauuXMeG3cMQG1hU9SPJQ32Wwofnpe_MKywdD20cx8RfgoS',
  },
  {
    title: 'Sơ sinh',
    label: 'Mềm mại',
    to: '/products?category=newborn',
    className: 'md:col-span-2 h-[220px] md:h-auto',
    image:
      'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Giày dép',
    label: 'Êm từng bước',
    to: '/categories/footwear',
    className: 'md:col-span-3 h-[220px] md:h-auto',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAn_QXJPzqmLHfjVjt1xCXCB2RGRBKhUUqNqXppmAqUWgIQ51fXVdM3Xg0gH230Y9sco4VkPXzQ6mFkmFrArHGPSPHHpLRJmPgO0UOqp4s-v1IJpyzUETl23prvtzhF-hG02UiEEtBPu9I0eultse-NPT69G3c4XybdGQIwSMRiPX-cnj0vPE2LLqXJ81BPrGCRChv0o7DKQj2evQ5xyYb58n-MLdA7W-rug5GjyrcjK9fEJdmiF5x_Nl1Ld1hlLXdiJ6GbQTBZWTp0',
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
      <div className="relative mb-3 aspect-[3/4] overflow-hidden rounded-lg bg-surface-container-low">
        {product.badge && (
          <span className="absolute right-4 top-4 z-10 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase text-white">
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
      <h3 className="text-body-md font-medium text-on-surface transition-colors group-hover:text-primary">
        {product.name}
      </h3>
      <div className="mt-1 flex flex-wrap items-center gap-2">
        <p className="text-body-md font-bold text-primary">{formatPrice(product.price)}</p>
        {product.originalPrice && (
          <p className="text-body-md text-secondary line-through opacity-60">
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
      <p className="text-xs font-bold uppercase text-primary">{eyebrow}</p>
      <h2 className="font-display text-3xl text-on-surface md:text-4xl">{title}</h2>
      {action && to && (
        <Link
          className="inline-flex items-center justify-center text-sm font-bold uppercase text-on-surface-variant transition-colors hover:text-primary"
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
  const navigate = useNavigate();

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
    <div className="w-full overflow-hidden bg-surface-bright text-on-surface">
      <section className="relative flex min-h-[560px] items-center overflow-hidden md:min-h-[620px] lg:min-h-[680px]">
        <img
          alt="Trẻ em mặc trang phục organic của STITCH"
          className="absolute inset-0 h-full w-full object-cover"
          src={heroImage}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10" />
        <div className="relative z-10 mx-auto w-full max-w-container-max px-grid-gutter py-20 text-white">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase">STITCH Kids Atelier</p>
            <h1 className="font-display text-5xl leading-tight tracking-normal md:text-7xl">
              STITCH Kids Atelier
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/90 md:text-lg">
              Thời trang trẻ em bền vững, mềm mại trên da bé và chỉn chu trong từng đường may cho những ngày tuổi thơ tự do.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-bold uppercase text-white transition-all hover:bg-clay-dark"
                to="/categories/do-be-gai"
              >
                Khám phá bộ sưu tập
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/70 px-8 py-3 text-sm font-bold uppercase text-white transition-all hover:bg-white hover:text-on-surface"
                to="/products?sale=true"
              >
                Xem ưu đãi
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border-subtle bg-white">
        <div className="mx-auto flex max-w-container-max flex-col gap-5 px-grid-gutter py-7 lg:flex-row lg:items-center lg:justify-between">
          <form className="relative w-full lg:max-w-md" onSubmit={handleSearch}>
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary">
              search
            </span>
            <input
              className="h-12 w-full rounded-full border border-border-subtle bg-white pl-12 pr-4 text-body-md outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
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
              ['Sơ sinh', '/products?category=newborn'],
              ['Khuyến mãi', '/products?sale=true'],
            ].map(([label, to], index) => (
              <Link
                className={`whitespace-nowrap rounded-full px-5 py-2 text-xs font-bold uppercase transition ${index === 0
                    ? 'bg-primary text-white'
                    : 'bg-surface-container text-on-surface hover:bg-surface-container-high hover:text-primary'
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

      <div className="marquee-container border-y border-border-subtle bg-sage/35 py-4">
        <div className="marquee-content">
          {[...serviceNotes, ...serviceNotes].map((item, index) => (
            <span
              className="mx-6 inline-flex items-center gap-2 whitespace-nowrap text-xs font-bold uppercase text-on-surface-variant"
              key={`${item.text}-${index}`}
            >
              <span className="material-symbols-outlined text-[18px] text-primary">{item.icon}</span>
              {item.text}
            </span>
          ))}
        </div>
      </div>

      <section className="mx-auto w-full max-w-container-max px-grid-gutter py-section-gap-mobile md:py-section-gap-desktop">
        <SectionHeading
          action="Xem tất cả sale"
          eyebrow="Ưu đãi đặc biệt"
          title="Sản phẩm khuyến mãi"
          to="/products?sale=true"
        />
        <div className="grid grid-cols-1 gap-grid-gutter sm:grid-cols-2 lg:grid-cols-4">
          {saleProducts.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-container-max px-grid-gutter pb-section-gap-mobile md:pb-section-gap-desktop">
        <SectionHeading
          action="Xem tất cả"
          eyebrow="Được yêu thích nhất"
          title="Sản phẩm bán chạy"
          to="/products"
        />
        <div className="grid grid-cols-1 gap-grid-gutter sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-container-max px-grid-gutter pb-section-gap-mobile md:pb-section-gap-desktop">
        <SectionHeading eyebrow="Mua theo nhu cầu" title="Khám phá danh mục" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:auto-rows-[260px]">
          {categoryTiles.map((tile) => (
            <Link
              className={`group relative block overflow-hidden rounded-lg bg-surface-container-low ${tile.className}`}
              key={tile.title}
              to={tile.to}
            >
              <img
                alt={tile.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                src={tile.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
                <p className="mb-2 text-xs font-bold uppercase text-white/80">{tile.label}</p>
                <h3 className="font-display text-3xl md:text-4xl">{tile.title}</h3>
                {tile.description && (
                  <p className="mt-2 max-w-sm text-sm leading-6 text-white/90">{tile.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-primary py-section-gap-mobile text-white md:py-section-gap-desktop">
        <div className="mx-auto grid max-w-container-max grid-cols-1 items-center gap-10 px-grid-gutter lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <p className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-1 text-xs font-bold uppercase">
              Ưu đãi có hạn
            </p>
            <h2 className="font-display text-5xl leading-tight tracking-normal md:text-6xl">
              Mùa tựu trường giảm đến 40%
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-white/80 lg:mx-0">
              Những thiết kế an toàn cho làn da nhạy cảm của bé, sẵn sàng cho ngày mới nhiều khám phá.
            </p>
            <div className="my-8 flex justify-center gap-5 lg:justify-start">
              {[
                ['08', 'Giờ'],
                ['42', 'Phút'],
                ['15', 'Giây'],
              ].map(([value, label]) => (
                <div className="min-w-16 text-center" key={label}>
                  <span className="block font-display text-4xl">{value}</span>
                  <span className="text-xs font-bold uppercase text-white/70">{label}</span>
                </div>
              ))}
            </div>
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-bold uppercase text-primary transition hover:bg-surface-container-low"
              to="/products?sale=true"
            >
              Săn ngay
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {saleProducts.slice(0, 2).map((product, index) => (
              <div
                className={`aspect-[4/5] overflow-hidden rounded-lg bg-white/10 shadow-xl ${index === 0 ? 'translate-y-8' : ''
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

      <section className="mx-auto grid w-full max-w-container-max grid-cols-1 items-center gap-12 px-grid-gutter py-section-gap-mobile md:py-section-gap-desktop lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <div className="aspect-square overflow-hidden rounded-lg bg-surface-container-low">
            <img
              alt="Xưởng may thủ công cho thời trang trẻ em"
              className="h-full w-full object-cover"
              loading="lazy"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0er3X5OqIm6SIV3MxTBlBv1AMcmen5a1Zfa4dlWeTb2VgVYGld9tWMJuVicWnP0V47pkWLjAurCvLPYsvL0_M4QH3fccKcuyct2Lw2ul6HgZDU6avh_P4CAhycxo9d2zihJKaeGmeLAVRvcSE2jEVWFnuJKogY4oUH9Rgese1-SjMQgY1MMe-2ALy6BGzRV3L2KLq93wiQ72wpij5jnMFPyJ7JRLb7RzBWV8Inf-dv5C9H5XiP7fjE9KfjH6ekkV4vfVC5_C2XmOs"
            />
          </div>
          <div className="mt-4 border border-border-subtle bg-sage/35 p-6 lg:absolute lg:-bottom-8 lg:-right-8 lg:mt-0 lg:max-w-xs">
            <p className="font-display text-2xl italic text-primary">
              "Mềm mại như vòng tay mẹ"
            </p>
            <p className="mt-2 text-sm leading-6 text-on-surface-variant">
              Chúng tôi ưu tiên sợi tự nhiên, đường may phẳng và cảm giác dễ chịu trong từng sản phẩm.
            </p>
          </div>
        </div>
        <div>
          <p className="mb-4 text-xs font-bold uppercase text-primary">Về STITCH Kids</p>
          <h2 className="font-display text-4xl leading-tight text-on-surface md:text-5xl">
            Vì một tương lai thời trang tử tế cho con
          </h2>
          <p className="mt-6 text-base leading-8 text-on-surface-variant">
            STITCH Kids ra đời từ mong muốn mang đến trang phục bền, đẹp và an toàn cho trẻ nhỏ. Mỗi chất liệu được chọn để bé thoải mái vận động, còn cha mẹ yên tâm hơn với lựa chọn mỗi ngày.
          </p>
          <p className="mt-4 text-base leading-8 text-on-surface-variant">
            Từ cotton organic đến linen thoáng mát, các thiết kế giữ tinh thần tối giản, dễ phối và đủ mềm mại cho làn da nhạy cảm.
          </p>
          <Link className="mt-8 inline-flex items-center gap-3 font-bold uppercase text-primary" to="/products">
            Câu chuyện sản phẩm
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </Link>
        </div>
      </section>

      <section className="bg-surface py-section-gap-mobile md:py-section-gap-desktop">
        <div className="mx-auto max-w-container-max px-grid-gutter">
          <SectionHeading eyebrow="Đánh giá" title="Các mẹ nói gì về STITCH Kids" />
          <div className="grid grid-cols-1 gap-grid-gutter md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article
                className="flex min-h-[260px] flex-col rounded-lg border border-border-subtle bg-white p-7"
                key={testimonial.name}
              >
                <div className="mb-4 flex text-primary">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span className="material-symbols-outlined text-[20px]" key={index}>
                      star
                    </span>
                  ))}
                </div>
                <p className="text-base italic leading-8 text-on-surface-variant">
                  "{testimonial.quote}"
                </p>
                <div className="mt-auto pt-6">
                  <p className="font-bold uppercase text-on-surface">{testimonial.name}</p>
                  <p className="text-sm text-secondary">{testimonial.city}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border-subtle bg-cream-warm py-section-gap-mobile md:py-section-gap-desktop">
        <div className="mx-auto max-w-2xl px-grid-gutter text-center">
          <h2 className="font-display text-4xl text-on-surface">Kết nối với STITCH</h2>
          <p className="mt-4 text-body-md leading-7 text-secondary">
            Nhận tin sớm về bộ sưu tập mới, chất liệu an toàn cho bé và ưu đãi đầu mùa.
          </p>
          {subscribed ? (
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary bg-white px-6 py-4 font-bold text-primary">
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              Cảm ơn bạn đã đăng ký!
            </div>
          ) : (
            <form className="mt-8 flex flex-col gap-3 sm:flex-row" onSubmit={handleSubscribe}>
              <input
                className="min-h-12 flex-1 rounded-full border border-border-subtle bg-white px-5 text-body-md outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Địa chỉ email"
                required
                type="email"
                value={email}
              />
              <button
                className="min-h-12 rounded-full bg-primary px-8 text-sm font-bold uppercase text-white transition hover:bg-clay-dark"
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

