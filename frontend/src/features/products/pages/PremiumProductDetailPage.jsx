import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../../cart/cartSlice';

const STITCH_ASSET_PATH = '/stitch/product-girl';

const PRODUCT_DATABASE = {
  'vay-hoa-nhi-organic': {
    id: 'vay-hoa-nhi-organic',
    name: 'Váy Hoa Nhí Organic',
    price: 1250000,
    subtitle: 'Stitch Kids Collection',
    description:
      'Chiếc váy mùa hè từ cotton hữu cơ mềm mịn, họa tiết hoa nhí terracotta dịu mắt và phom dáng thoáng nhẹ để bé tự do chuyển động cả ngày.',
    image: `${STITCH_ASSET_PATH}/dress-main.jpg`,
    storyImage: `${STITCH_ASSET_PATH}/story-hands.jpg`,
    gallery: [
      {
        src: `${STITCH_ASSET_PATH}/dress-main.jpg`,
        alt: 'Bé gái mặc váy hoa nhí organic trong studio ánh sáng tự nhiên',
      },
      {
        src: `${STITCH_ASSET_PATH}/dress-fabric.jpg`,
        alt: 'Chi tiết vải cotton hữu cơ với họa tiết hoa màu đất',
      },
      {
        src: `${STITCH_ASSET_PATH}/dress-hanger.jpg`,
        alt: 'Váy hoa organic treo trên móc gỗ cạnh giỏ mây',
      },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { hex: '#F9A8D4', name: 'Terracotta' },
      { hex: '#DCFCE7', name: 'Sage' },
      { hex: '#FFFFFF', name: 'Cream' },
    ],
    labels: ['100% Organic Cotton', 'Thủ công', 'Bền vững'],
    categoryName: 'Bé gái',
    categoryLink: '/categories/do-be-gai',
  },
  'set-ao-thun-quan-linen': {
    id: 'set-ao-thun-quan-linen',
    name: 'Set Áo Thun & Quần Linen',
    price: 950000,
    subtitle: 'STITCH Atelier',
    description:
      'A comfortable and sustainable outfit for boys. The t-shirt is made from 100% organic cotton, paired with breathable linen shorts. Earthy tones and soft natural fabrics ensure comfort for sensitive skin.',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLszNhGB1m8ZVVqQKMPkFZMnGAo4s43gUSm-Io-6jxZIuAcVlxlLKZOL2f2mjm_S0ke6fOg2DSW17h4VnYLhbJCZLTKSS0tXV-4TcpW5bQDl82BjMrfbNeWFv8Y0h6_S1yJ50LRAvXd9ECKJz50nxCUrDXksnSmhP2q-PlNRuCx-AyImpIXVAeH002eCDkRJ6XTyZX0oCurInUvEjdhiXdwR9G9qxF2RqBaNKV0S10MIVJQuR8AbFcJfiU19',
    storyImage: 'https://lh3.googleusercontent.com/aida/AP1WRLtcXi-Jw-8K9G7kdb7pxZeXb4aBLI2lMb76_IBINsQCypUBtp0GOgXbDYA2OTqQpYT30eGBKkAjkgzm-gP6xthJEorndP3a6nUNxS9N5waNxaM2IxLvYwLylSgq2PNAuF3-578WoVcqyMPNi3a4rlkRo5kNoDm_YwxWwglwx_vTmc98Isk0Lzb31_qpub8zsg4glWDA7Oprb2bDDiZ9cGA5n2ZFVe21uKpOExxkgTlDKPYtc3DMP7-kVfu0',
    gallery: [
      {
        src: 'https://lh3.googleusercontent.com/aida/AP1WRLszNhGB1m8ZVVqQKMPkFZMnGAo4s43gUSm-Io-6jxZIuAcVlxlLKZOL2f2mjm_S0ke6fOg2DSW17h4VnYLhbJCZLTKSS0tXV-4TcpW5bQDl82BjMrfbNeWFv8Y0h6_S1yJ50LRAvXd9ECKJz50nxCUrDXksnSmhP2q-PlNRuCx-AyImpIXVAeH002eCDkRJ6XTyZX0oCurInUvEjdhiXdwR9G9qxF2RqBaNKV0S10MIVJQuR8AbFcJfiU19',
        alt: 'Bé trai mặc set áo thun và quần linen màu xanh sage',
      },
      {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5zurEhIR0NzSRTx4E9ypTaRWp3KYD11f1pD_YBuo0-D2hTcZNnynRGjzrgfEfCmKZooOaf-k5kLGBEzKo0rouw4WP5s20hNNUsjnHDHd_xxicMlK8puC3L1u_ruhIp7mqf5_3XMvLTiGenNGPq9BNEuf8hcZRUmyPyTTs5DKaDREWUsZ5MRaTSxArvhu22id93Usa6P-QlIGFZFTn3lA7fj8pUWp33n3ZsmpPqXlACmCgI5UV9rlDacMnTCBrfmml5OLOGQ95kXEl',
        alt: 'Chi tiết vải cotton hữu cơ màu xanh sage mềm mại thoáng mát',
      },
      {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMfYSt2o_8j2wJVp_P-Cl7eFeKFXDax2xd-7ZtPxAquec2pgznqJkdogE-BIH4gxhLTi44PK-yCpql-HZElJ0MwKZ0KTW8Cb1Y5qpryNxC9Fjnn3Cx7EuqH5TBsRv1bUIorkD1nhTN_ZIIRp4dmraoqgLc8c5ON_poR09sNoRoNmSuCUKpCCpfKwcLCBz6-okBE03boM4e2nFub8Tf3Po12uJeghDpRy4AOZw8uQgx07U7vtGdMW2vpA4YPV6p2X6tpoEthON8Bljq',
        alt: 'Quần linen màu cát xếp gọn gàng tối giản tinh tế',
      },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { hex: '#DCFCE7', name: 'Sage Green' },
      { hex: '#FFFFFF', name: 'Sand' },
    ],
    labels: ['100% Organic Cotton', 'Ethical', 'Linen Shorts'],
    categoryName: 'Bé trai',
    categoryLink: '/categories/do-be-trai',
    details: [
      {
        title: 'Craftsmanship',
        content: 'Mỗi sản phẩm Stitch được hoàn thiện thủ công bởi những nghệ nhân lành nghề, chú trọng đến từng đường kim mũi chỉ để đảm bảo độ bền tối ưu cho sự hiếu động của trẻ nhỏ.'
      },
      {
        title: 'Material (Organic Cotton & Linen)',
        content: 'Sử dụng 100% bông hữu cơ được chứng nhận GOTS và vải linen tự nhiên, mang lại khả năng thấm hút vượt trội và an toàn tuyệt đối cho làn da nhạy cảm nhất.'
      },
      {
        title: 'Shipping & Returns',
        content: 'Giao hàng miễn phí cho đơn hàng trên 2.000.000₫. Đổi trả dễ dàng trong vòng 30 ngày kể từ ngày nhận hàng.'
      }
    ],
    showcase: {
      badge: 'Tôn vinh chất liệu tự nhiên',
      title: 'Tôn vinh chất liệu tự nhiên',
      desc: 'Cảm giác mềm mại của bông hữu cơ kết hợp cùng sự mộc mạc của linen tạo nên một bản giao hưởng của sự thoải mái. Những chi tiết nhỏ như cúc gỗ tự nhiên được tuyển chọn kỹ lưỡng để nhấn mạnh triết lý thời trang bền vững của chúng tôi.',
      features: [
        { title: '100%', desc: 'Organic Cotton' },
        { title: 'Ethical', desc: 'Sản xuất đạo đức' }
      ]
    }
  },
  'yem-linen-sage': {
    id: 'yem-linen-sage',
    name: 'Yếm Linen Sage',
    price: 980000,
    subtitle: 'Linen tự nhiên',
    description:
      'Yếm linen xanh sage với nút gỗ lớn, phom rộng dễ mặc và chất liệu thoáng khí cho những ngày nhiều nắng.',
    image: `${STITCH_ASSET_PATH}/overall-sage.jpg`,
    storyImage: `${STITCH_ASSET_PATH}/story-hands.jpg`,
    gallery: [{ src: `${STITCH_ASSET_PATH}/overall-sage.jpg`, alt: 'Yếm linen xanh sage cho bé' }],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ hex: '#DCFCE7', name: 'Sage' }],
    labels: ['Linen', 'Nút gỗ', 'Thoáng nhẹ'],
    categoryName: 'Bé gái',
    categoryLink: '/categories/do-be-gai',
  },
  'set-chan-vay-dusty-rose': {
    id: 'set-chan-vay-dusty-rose',
    name: 'Set Chân Váy Dusty Rose',
    price: 1180000,
    subtitle: 'Set mùa hè',
    description:
      'Set áo và chân váy cotton dusty rose, bảng màu trầm ấm và đường may gọn gàng cho vẻ ngoài tinh tế.',
    image: `${STITCH_ASSET_PATH}/skirt-dusty-rose.jpg`,
    storyImage: `${STITCH_ASSET_PATH}/story-hands.jpg`,
    gallery: [{ src: `${STITCH_ASSET_PATH}/skirt-dusty-rose.jpg`, alt: 'Set chân váy dusty rose cho bé' }],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ hex: '#F9A8D4', name: 'Dusty Rose' }],
    labels: ['Cotton', 'Dễ phối', 'Dịu da'],
    categoryName: 'Bé gái',
    categoryLink: '/categories/do-be-gai',
  },
  'ao-len-merino': {
    id: 'ao-len-merino',
    name: 'Áo Len Merino',
    price: 1420000,
    subtitle: 'Merino cao cấp',
    description:
      'Áo len merino màu kem với bề mặt dệt nổi mềm mại, giữ ấm nhẹ nhàng nhưng vẫn thoáng cho làn da nhạy cảm.',
    image: `${STITCH_ASSET_PATH}/merino-sweater.jpg`,
    storyImage: `${STITCH_ASSET_PATH}/story-hands.jpg`,
    gallery: [{ src: `${STITCH_ASSET_PATH}/merino-sweater.jpg`, alt: 'Áo len merino màu kem cho bé' }],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ hex: '#FFFFFF', name: 'Cream' }],
    labels: ['Merino Wool', 'Ấm nhẹ', 'Mềm mại'],
    categoryName: 'Bé gái',
    categoryLink: '/categories/do-be-gai',
  },
};

const RECOMMENDATIONS = [
  {
    id: 'yem-linen-sage',
    name: 'Yếm Linen Sage',
    price: 980000,
    image: `${STITCH_ASSET_PATH}/overall-sage.jpg`,
  },
  {
    id: 'set-chan-vay-dusty-rose',
    name: 'Set Chân Váy Dusty Rose',
    price: 1180000,
    image: `${STITCH_ASSET_PATH}/skirt-dusty-rose.jpg`,
  },
  {
    id: 'ao-len-merino',
    name: 'Áo Len Merino',
    price: 1420000,
    image: `${STITCH_ASSET_PATH}/merino-sweater.jpg`,
  },
];

export function ProductDetailPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.items || []);
  const product = PRODUCT_DATABASE[slug] || PRODUCT_DATABASE['vay-hoa-nhi-organic'];

  const [selectedImage, setSelectedImage] = useState(product.gallery[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.hex || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [successToast, setSuccessToast] = useState(false);

  useEffect(() => {
    setSelectedImage(product.gallery[0]);
    setSelectedColor(product.colors[0]?.hex || '');
    setSelectedSize(product.sizes[0] || '');
    setSuccessToast(false);
  }, [product]);

  const formatPrice = (value) => `${new Intl.NumberFormat('vi-VN').format(value)}đ`;

  const handleAddToCart = () => {
    const cartId = `${product.id}-${selectedSize}-${selectedColor}`;
    const existingIndex = cartItems.findIndex((item) => item.cartId === cartId);
    const selectedColorName = product.colors.find((color) => color.hex === selectedColor)?.name;
    const cartProduct = {
      cartId,
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColorName,
      quantity: 1,
    };

    const newItems =
      existingIndex > -1
        ? cartItems.map((item, index) =>
            index === existingIndex ? { ...item, quantity: (item.quantity || 1) + 1 } : item
          )
        : [...cartItems, cartProduct];

    dispatch(setCart(newItems));
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 3000);
  };

  const activeColorName = product.colors.find((color) => color.hex === selectedColor)?.name || '';

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16 pt-10 pb-24">
      {successToast && (
        <div className="fixed top-24 right-6 z-50 flex items-center gap-3 rounded-lg border border-primary bg-sage px-5 py-4 font-medium text-on-surface shadow-lg">
          <span className="material-symbols-outlined text-primary">check_circle</span>
          Đã thêm sản phẩm vào giỏ hàng.
        </div>
      )}

      <nav className="mb-8 flex flex-wrap items-center gap-3 text-caption uppercase tracking-[0.12em] text-on-surface-variant">
        <Link to="/" className="hover:text-primary">
          Trang chủ
        </Link>
        <span>/</span>
        <Link to={product.categoryLink || "/categories/do-be-gai"} className="hover:text-primary">
          {product.categoryName || "Bé gái"}
        </Link>
        <span>/</span>
        <span className="font-bold text-on-surface">{product.name}</span>
      </nav>

      <section className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <div className="overflow-hidden rounded-[var(--radius-md)] bg-cream-warm aspect-[4/5]">
            <img
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              src={selectedImage.src}
              alt={selectedImage.alt}
            />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            {product.gallery.map((image) => {
              const isActive = selectedImage.src === image.src;
              return (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className={`overflow-hidden rounded-[var(--radius-md)] border bg-cream-warm aspect-square transition ${
                    isActive ? 'border-primary ring-2 ring-primary/30' : 'border-border-subtle hover:border-primary'
                  }`}
                  aria-label={`Xem ảnh ${image.alt}`}
                >
                  <img className="h-full w-full object-cover" src={image.src} alt="" />
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-8 md:sticky md:top-28 md:col-span-5">
          <div className="space-y-3">
            <p className="font-label-uppercase text-label-uppercase font-semibold tracking-[0.18em] text-clay-dark">
              {product.subtitle}
            </p>
            <h1 className="font-display text-headline-lg leading-tight text-on-surface">{product.name}</h1>
            <p className="font-headline-md text-headline-md text-primary">{formatPrice(product.price)}</p>
          </div>

          <p className="font-body-lg text-body-lg leading-relaxed text-on-surface-variant">{product.description}</p>

          <div className="flex flex-wrap gap-3 border-y border-border-subtle py-4">
            {product.labels.map((label) => (
              <span
                key={label}
                className="rounded-full bg-cream-warm px-3 py-2 text-caption font-bold uppercase tracking-[0.08em] text-on-surface-variant"
              >
                {label}
              </span>
            ))}
          </div>

          <div className="space-y-6">
            <div>
              <span className="mb-3 block font-label-uppercase text-label-uppercase font-semibold">
                Màu sắc: <span className="font-normal text-on-surface">{activeColorName}</span>
              </span>
              <div className="flex gap-3">
                {product.colors.map((color) => {
                  const isActive = selectedColor === color.hex;
                  return (
                    <button
                      key={color.hex}
                      type="button"
                      onClick={() => setSelectedColor(color.hex)}
                      style={{ backgroundColor: color.hex }}
                      className={`h-9 w-9 rounded-full border border-outline-variant ring-offset-2 transition ${
                        isActive ? 'ring-2 ring-primary' : 'hover:ring-2 hover:ring-primary'
                      }`}
                      aria-label={`Chọn màu ${color.name}`}
                    />
                  );
                })}
              </div>
            </div>

            <div>
              <div className="mb-3 flex justify-between gap-4">
                <span className="font-label-uppercase text-label-uppercase font-semibold">Kích thước</span>
                <button type="button" className="text-caption font-bold uppercase text-on-surface-variant underline">
                  Hướng dẫn chọn size
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => {
                  const isActive = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`flex h-12 items-center justify-center rounded-lg border font-semibold transition ${
                        isActive
                          ? 'border-primary bg-primary text-on-primary'
                          : 'border-border-subtle text-on-surface hover:border-primary'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={handleAddToCart}
              className="h-16 w-full rounded-full bg-primary font-label-uppercase text-label-uppercase font-bold text-on-primary shadow-lg shadow-primary/10 transition hover:bg-secondary hover:text-[var(--badge-sale-text)] active:scale-95"
            >
              Thêm vào giỏ hàng
            </button>
            <button
              type="button"
              onClick={handleAddToCart}
              className="h-16 w-full rounded-full border border-ink-light font-label-uppercase text-label-uppercase font-bold text-on-surface transition hover:bg-primary hover:text-on-primary active:scale-95"
            >
              Mua ngay
            </button>
          </div>

          <div className="space-y-4 pt-2">
            {product.details ? (
              product.details.map((detail, index) => (
                <details key={detail.title} className="group border-b border-border-subtle pb-4" open={index === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between font-label-uppercase text-label-uppercase font-bold">
                    {detail.title}
                    <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                  </summary>
                  <p className="pt-4 text-body-md leading-relaxed text-on-surface-variant">
                    {detail.content}
                  </p>
                </details>
              ))
            ) : (
              <>
                <details className="group border-b border-border-subtle pb-4" open>
                  <summary className="flex cursor-pointer list-none items-center justify-between font-label-uppercase text-label-uppercase font-bold">
                    Chất liệu & Bảo quản
                    <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                  </summary>
                  <p className="pt-4 text-body-md leading-relaxed text-on-surface-variant">
                    100% cotton hữu cơ, nhuộm màu thân thiện với da bé. Giặt tay hoặc giặt máy chế độ nhẹ với nước lạnh,
                    phơi trong bóng râm và tránh sấy nhiệt cao.
                  </p>
                </details>
                <details className="group border-b border-border-subtle pb-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-label-uppercase text-label-uppercase font-bold">
                    Hướng dẫn size
                    <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                  </summary>
                  <p className="pt-4 text-body-md leading-relaxed text-on-surface-variant">
                    Size S phù hợp 2-3 tuổi, M cho 4-5 tuổi, L cho 6-7 tuổi and XL cho 8-9 tuổi. Nếu bé ở giữa hai size,
                    chọn size lớn hơn để thoải mái vận động.
                  </p>
                </details>
                <details className="group border-b border-border-subtle pb-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-label-uppercase text-label-uppercase font-bold">
                    Giao hàng & Đổi trả
                    <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                  </summary>
                  <p className="pt-4 text-body-md leading-relaxed text-on-surface-variant">
                    Miễn phí giao hàng cho đơn từ 1.500.000đ. Hỗ trợ đổi size trong 7 ngày với sản phẩm còn nguyên tem,
                    chưa qua sử dụng.
                  </p>
                </details>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="mt-24 bg-sage/30 px-6 py-16 md:-mx-16 md:mt-32 md:px-16 md:py-24">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="space-y-7">
            <p className="font-label-uppercase text-label-uppercase font-semibold tracking-[0.18em] text-clay-dark">
              {product.showcase?.badge || "Câu chuyện sản phẩm"}
            </p>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              {product.showcase?.title || "Êm dịu cho bé, tử tế với từng thớ vải."}
            </h2>
            <p className="font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
              {product.showcase?.desc || "Tại Stitch, trang phục trẻ em không chỉ là thời trang, mà là sự tôn trọng đối với sự phát triển tự nhiên của bé. Váy Hoa Nhí Organic được dệt từ sợi bông hữu cơ thu hoạch thủ công, giúp vải giữ được độ mềm mịn và khả năng thoáng khí vượt trội."}
            </p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {product.showcase?.features ? (
                product.showcase.features.map((feature) => (
                  <div key={feature.title} className="border-l-2 border-clay-dark pl-4">
                    <span className="font-headline-md block">{feature.title}</span>
                    <span className="font-label-uppercase opacity-60">{feature.desc}</span>
                  </div>
                ))
              ) : (
                <>
                  <div>
                    <h3 className="mb-2 font-label-uppercase text-label-uppercase font-bold">Nguồn gốc minh bạch</h3>
                    <p className="text-body-md leading-relaxed text-on-surface-variant">
                      Sợi cotton được chọn từ trang trại canh tác hữu cơ, giảm hóa chất và tiết kiệm nước.
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-label-uppercase text-label-uppercase font-bold">May chậm, mặc lâu</h3>
                    <p className="text-body-md leading-relaxed text-on-surface-variant">
                      Mỗi đường may được hoàn thiện thủ công để chiếc váy bền hơn qua nhiều mùa tuổi thơ.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="overflow-hidden rounded-[var(--radius-md)] bg-cream-warm aspect-[4/3]">
            <img className="h-full w-full object-cover" src={product.storyImage} alt="Nghệ nhân may trang phục organic" />
          </div>
        </div>
      </section>

      <section className="mt-24 md:mt-32">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="space-y-2">
            <h2 className="font-headline-lg text-headline-lg">Có thể bé sẽ thích</h2>
            <p className="text-on-surface-variant">Những thiết kế cùng tinh thần tự nhiên từ Stitch Kids.</p>
          </div>
          <Link to="/products" className="font-label-uppercase text-label-uppercase font-semibold text-primary hover:underline">
            Xem tất cả
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {RECOMMENDATIONS.map((recommendation) => (
            <Link key={recommendation.id} to={`/products/${recommendation.id}`} className="group block">
              <div className="overflow-hidden rounded-[var(--radius-md)] bg-cream-warm aspect-[4/5]">
                <img
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={recommendation.image}
                  alt={recommendation.name}
                />
              </div>
              <div className="mt-4 space-y-1">
                <h3 className="font-body-lg text-body-lg font-medium transition-colors group-hover:text-primary">
                  {recommendation.name}
                </h3>
                <p className="font-medium text-on-surface-variant">{formatPrice(recommendation.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

