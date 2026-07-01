import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const newbornProducts = [
  {
    id: 1,
    name: 'Body Cotton Sơ Sinh Organic',
    category: 'DÒNG SƠ SINH',
    price: 450000,
    badge: 'ORGANIC COTTON',
    badgeColor: 'bg-[var(--color-mint)]',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Bộ Quần Áo Vải Xô Organic',
    category: 'BỘ QUẦN ÁO',
    price: 590000,
    badge: 'ORGANIC COTTON',
    badgeColor: 'bg-[var(--color-mint)]',
    image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'Chăn Len Cừu Tự Nhiên',
    category: 'CHĂN GA',
    price: 1250000,
    badge: 'NATURAL FIBER',
    badgeColor: 'bg-[var(--color-primary-soft)]',
    image: '/images/chanlencuu.png',
  },
  {
    id: 4,
    name: 'Set Đồ Ngủ Dịu Nhẹ',
    category: 'ĐỒ NGỦ',
    price: 380000,
    badge: 'ORGANIC COTTON',
    badgeColor: 'bg-[var(--color-mint)]',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80',
  },
];

const commitments = [
  {
    icon: 'eco',
    title: 'Chất Liệu Organic',
    description: 'Sử dụng 100% sợi bông hữu cơ đạt chuẩn GOTS, không hóa chất độc hại, tuyệt đối an toàn cho trẻ sơ sinh.',
  },
  {
    icon: 'palette',
    title: 'Nhuộm Tự Nhiên',
    description: 'Màu sắc được chiết xuất từ cỏ cây và khoáng vật tự nhiên, đảm bảo không gây kích ứng da và bền màu.',
  },
  {
    icon: 'verified',
    title: 'Chứng Chỉ Bền Vững',
    description: 'Quy trình sản xuất đạo đức, minh bạch, bảo vệ môi trường và hướng tới tương lai của thế hệ mai sau.',
  },
];

const formatPrice = (value) => `${new Intl.NumberFormat('vi-VN').format(value)}₫`;

function ProductCard({ product }) {
  const slugMap = {
    1: 'body-cotton-so-sinh-organic',
    2: 'bo-quan-ao-vai-xo-organic',
  };
  const slug = slugMap[product.id] || 'body-cotton-so-sinh-organic';

  return (
    <Link className="product-card group cursor-pointer block" to={`/newborn-products/${slug}`}>
      <div className="aspect-[3/4] rounded-[var(--radius-md)] overflow-hidden mb-4 bg-[var(--color-bg-muted)] relative shadow-soft">
        <img
          alt={product.name}
          className="product-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={product.image}
        />
        <div className="absolute top-4 left-4">
          <span className={`${product.badgeColor} text-[var(--color-text-primary)] px-3 py-1 rounded-full font-label-uppercase text-[10px]`}>
            {product.badge}
          </span>
        </div>
        <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-soft opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <span className="material-symbols-outlined text-primary">add_shopping_cart</span>
        </button>
      </div>
      <div>
        <p className="font-label-uppercase text-[10px] text-[var(--color-text-secondary)] mb-1">{product.category}</p>
        <h3 className="font-body-lg text-body-lg text-[var(--color-text-primary)] mb-2">{product.name}</h3>
        <p className="font-body-md text-primary font-bold">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}

export function NewbornPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event) => {
    event.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-up').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add('py-4');
          header.classList.remove('py-6');
        } else {
          header.classList.add('py-6');
          header.classList.remove('py-4');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-[var(--color-bg-base)] text-[var(--color-text-primary)] font-body">
      {/* Hero Banner */}
      <section
        className="relative min-h-[560px] md:min-h-[620px] lg:min-h-[680px] flex items-center overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/sosinhbg.png)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/50 to-[var(--color-primary)]/20 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full">
          <div className="max-w-xl reveal-up active">
            <span className="font-label-uppercase text-label-uppercase text-white mb-4 block bg-primary/20 backdrop-blur-sm inline-block px-3 py-1 rounded-full">
              BST SƠ SINH MỚI
            </span>
            <h1 className="font-display text-display-mobile md:text-display text-white mb-6 leading-none">
              Dịu nhẹ như vòng tay mẹ
            </h1>
            <p className="font-body-lg text-body-lg text-white/90 mb-8 max-w-md">
              Khám phá bộ sưu tập đồ sơ sinh từ sợi organic tự nhiên, cam kết an toàn tuyệt đối cho làn da mỏng manh nhất.
            </p>
            <div className="flex gap-4">
              <Link
                className="px-8 py-3 bg-white text-primary rounded-full font-label-uppercase text-label-uppercase hover:bg-[var(--color-bg-soft)] transition-all duration-300"
                to="/"
              >
                Mua Ngay
              </Link>
              <button className="px-8 py-3 border border-white text-white rounded-full font-label-uppercase text-label-uppercase hover:bg-white/10 transition-all duration-300">
                Tìm Hiểu Về Organic
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Filter Chips */}
      <section className="py-section-gap-desktop max-w-7xl mx-auto px-4 md:px-6 overflow-x-auto">
        <div className="flex items-center gap-4 min-w-max pb-4 border-b border-[var(--color-border)]">
          <button className="px-6 py-2 rounded-full bg-primary text-white font-label-uppercase text-label-uppercase transition-all">
            Tất Cả
          </button>
          <button className="px-6 py-2 rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] font-label-uppercase text-label-uppercase hover:border-primary transition-all">
            Bộ Body
          </button>
          <button className="px-6 py-2 rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] font-label-uppercase text-label-uppercase hover:border-primary transition-all">
            Chăn & Khăn
          </button>
          <button className="px-6 py-2 rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] font-label-uppercase text-label-uppercase hover:border-primary transition-all">
            Đồ Ngủ
          </button>
          <button className="px-6 py-2 rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] font-label-uppercase text-label-uppercase hover:border-primary transition-all">
            Phụ Kiện
          </button>
        </div>
      </section>

      {/* Product Grid */}
      <section className="pb-section-gap-desktop max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-grid-gutter">
          {newbornProducts.map((product, index) => (
            <div
              className="product-card group cursor-pointer reveal-up"
              key={product.id}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Commitment Section */}
      <section className="bg-[var(--color-bg-soft)] py-section-gap-desktop">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h2 className="font-display text-headline-lg text-primary mb-12 reveal-up">Cam Kết Của KỶ NGUYÊN KID</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-element-gap-lg">
            {commitments.map((commitment, index) => (
              <div
                className="p-8 bg-[var(--color-bg-card)] rounded-[var(--radius-md)] backdrop-blur-sm reveal-up shadow-soft"
                key={commitment.title}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <span className="material-symbols-outlined text-4xl text-primary mb-4">{commitment.icon}</span>
                <h4 className="font-headline-md text-[20px] mb-3">{commitment.title}</h4>
                <p className="text-[var(--color-text-secondary)]">{commitment.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / Secondary Call to Action */}
      <section className="py-section-gap-desktop max-w-7xl mx-auto px-4 md:px-6">
        <div className="rounded-[var(--radius-xl)] overflow-hidden relative min-h-[400px] flex items-center justify-center text-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1920&q=80)',
            }}
          ></div>
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px]"></div>
          <div className="relative z-10 max-w-lg px-6">
            <h2 className="font-display text-headline-lg text-white mb-4">Cùng Bé Lớn Lên</h2>
            <p className="text-white/90 mb-8 font-body-lg">
              Đăng ký nhận tin để cập nhật những bộ sưu tập mới nhất và ưu đãi đặc quyền cho các mẹ.
            </p>
            {subscribed ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 backdrop-blur px-6 py-4 font-body font-medium text-white">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                Cảm ơn bạn đã đăng ký!
              </div>
            ) : (
              <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubscribe}>
                <input
                  className="flex-1 px-6 py-3 rounded-full border-none focus:ring-4 focus:ring-primary/20 outline-none bg-white"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email của bạn"
                  type="email"
                  value={email}
                />
                <button
                  className="px-8 py-3 bg-primary text-white rounded-full font-label-uppercase text-label-uppercase hover:bg-secondary transition-all"
                  type="submit"
                >
                  Gửi
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
