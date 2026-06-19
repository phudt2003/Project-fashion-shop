import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../../cart/cartSlice';
import { ProductDetailPage as StitchProductDetailPage } from './ProductDetailPageStitch';

const STITCH_PRODUCT_SLUGS = new Set([
  'vay-hoa-nhi-organic',
  'yem-linen-sage',
  'set-chan-vay-dusty-rose',
  'ao-len-merino',
  'set-ao-thun-quan-linen',
]);

const PRODUCT_DATABASE = {
  'sandal-da-thu-cong': {
    id: 'sandal-da-thu-cong',
    name: 'Sandal Da Thủ Công',
    price: 2450000,
    subtitle: 'Chế tác thủ công',
    description: 'Được làm từ da thuộc thực vật (vegetable-tanned leather) cao cấp, những đôi sandal này mang lại sự thoải mái và độ bền vượt trội. Đế cao su tự nhiên giúp giảm tác động lên môi trường. Mỗi đôi được may thủ công bởi các nghệ nhân lành nghề.',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLu36LAymjeVn-5cvIIhvTKDbB9yiT1-Q8iNPUPspiN3xcfiNq9bdhoWIaBNdvAhGxbnSBHvOz4punDqPL4ZGg8oibeWj7ywqqg105w45unlloCvTY2KkaHxJ3KTqWOnFhZavZNjM-FVbri7Y-BClPWiVe74SYXa8Vh_V-UgJBiKoKPSu46OAqCq-Clxz7ejMJOh6Rfm8WCzmwOebymX4xJHZhnT_OSbg-FONgy3mWVA5UCZ26-6q-EbnLKs',
    gallery: [
      'https://lh3.googleusercontent.com/aida/AP1WRLu36LAymjeVn-5cvIIhvTKDbB9yiT1-Q8iNPUPspiN3xcfiNq9bdhoWIaBNdvAhGxbnSBHvOz4punDqPL4ZGg8oibeWj7ywqqg105w45unlloCvTY2KkaHxJ3KTqWOnFhZavZNjM-FVbri7Y-BClPWiVe74SYXa8Vh_V-UgJBiKoKPSu46OAqCq-Clxz7ejMJOh6Rfm8WCzmwOebymX4xJHZhnT_OSbg-FONgy3mWVA5UCZ26-6q-EbnLKs',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCksJN3jiXgB6bihcy0kuTObWSj8cB8zCQhyAr8_VYyu5jUy2dBMMwvgZPZeY1noSEW6x-YZjtrHhvSJVsz0xb-BM8fFPrPpMs1th0eL6ElySZXxtcRuMzQsJ0XeG6u2TRl7hVPg5xnKvsMSu7CID40u9X4G3KKZDioDnnPmiNLQWpruG9j3d0EgAWl1XFnfQKATc-3DAyDNRlOu8smvDQ4znGIe8MGeYHNP7m6Lc0pmOsbqB4d5Ou6Q2GSy_cIXOW9NkaZOh0rWsQd',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBzPEULg3_3GPqWgCw0P2VzRsNum63MHtRCucBc-l8C-WHXfjsWtt6MdAnsR_k1wYjdVdwMC8DhAtji6Xd-5GmEYzNUhGyCmIaecWlvIxCWjoqRG5Kslj1ki78VY0shoFEkAfTbuIW3LPeONWSd5YFNaYje2gy50Kj5N1Qzg-FbqAEdSSRhHhY2OWz-bpBxdYtLWnzi2dWYrWLVFcB1X0imzSk9t_BeP-YW1guKRUS91PMS1lDu9PBbYX-D4phQAMmZ8bfNWRQNUAGU'
    ],
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: [
      { hex: '#E5D3C2', name: 'Màu Kem' },
      { hex: '#5C4033', name: 'Nâu Đất' },
      { hex: '#1C1C1A', name: 'Đen Tuyển' }
    ]
  },
  'loafers-da-cao-cap': {
    id: 'loafers-da-cao-cap',
    name: 'Loafers Da Cao Cấp',
    price: 3850000,
    subtitle: 'Tinh tế cổ điển',
    description: 'Chất liệu da bò Ý tuyển chọn mềm mại, phom dáng cổ điển được gia công tỉ mỉ. Lót trong thiết kế thoáng khí giúp nâng niu bàn chân suốt cả ngày dài năng động.',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLtkOT2bLe0W3DRJvE56SDuJ9I1M4LmFFtl5kXtIbHt4vFeZQ9EleuX7x0eq9iWvtZWUccs7yaT_kjOqEYnaME5JyCol9urlLEe9_y5cAY6qlUWZP-NT7qUltmpF8JaCLYAlKlMAekmLMkDlpLPgqVMGBcVpwBECF5gUcego9LmRx51vFBLCskdwQN2L2a_Buvk6eC2kgBpybF4SFvFUVkQyM_lH3ugJST50lcSwJ-e4Q7g-sIhljbIjDWoY',
    gallery: [
      'https://lh3.googleusercontent.com/aida/AP1WRLtkOT2bLe0W3DRJvE56SDuJ9I1M4LmFFtl5kXtIbHt4vFeZQ9EleuX7x0eq9iWvtZWUccs7yaT_kjOqEYnaME5JyCol9urlLEe9_y5cAY6qlUWZP-NT7qUltmpF8JaCLYAlKlMAekmLMkDlpLPgqVMGBcVpwBECF5gUcego9LmRx51vFBLCskdwQN2L2a_Buvk6eC2kgBpybF4SFvFUVkQyM_lH3ugJST50lcSwJ-e4Q7g-sIhljbIjDWoY'
    ],
    sizes: ['38', '39', '40', '41', '42'],
    colors: [
      { hex: '#5C4033', name: 'Nâu Đậm' },
      { hex: '#1C1C1A', name: 'Đen Tuyển' }
    ]
  },
  'giay-sneaker-canvas': {
    id: 'giay-sneaker-canvas',
    name: 'Giày Sneaker Canvas',
    price: 1950000,
    subtitle: 'Năng động sinh thái',
    description: 'Thiết kế trẻ trung năng động được dệt từ sợi lanh hữu cơ bền bỉ. Đi kèm đế bần cao cấp có khả năng đàn hồi tự nhiên và cực kỳ thân thiện với môi trường.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCU2XSaXxE1VnsiM2fPTRNWp0spRjype6u4CZNdCcrH6svg4P0lt8sGnSu3c_QMSps85SkFf6t2tRsbfgEN_T5YskQ05KQZrbiVVe6U64yK9ptM862lfjD8ZBv4uoCt1DiVDheCpVUklIR2lKNN5QwT_Sb_ERQwGLTlwTCi2mQEkAtJBOKvoaFL8Y_eoconfn3NckJPzXD3O93WjiAztg1uP6gLqF9A-s--FkWhdh1WBIRQ3P44KCCXDc5ymZOryezbcZpqBm-lW1TA',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCU2XSaXxE1VnsiM2fPTRNWp0spRjype6u4CZNdCcrH6svg4P0lt8sGnSu3c_QMSps85SkFf6t2tRsbfgEN_T5YskQ05KQZrbiVVe6U64yK9ptM862lfjD8ZBv4uoCt1DiVDheCpVUklIR2lKNN5QwT_Sb_ERQwGLTlwTCi2mQEkAtJBOKvoaFL8Y_eoconfn3NckJPzXD3O93WjiAztg1uP6gLqF9A-s--FkWhdh1WBIRQ3P44KCCXDc5ymZOryezbcZpqBm-lW1TA'
    ],
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: [
      { hex: '#E5D3C2', name: 'Trắng Kem' },
      { hex: '#D6E4D8', name: 'Xanh Bạc Hà' }
    ]
  },
  'mules-da-thanh-lich': {
    id: 'mules-da-thanh-lich',
    name: 'Mules Da Thanh Lịch',
    price: 2650000,
    subtitle: 'Thanh lịch tối giản',
    description: 'Giày Mules hở gót thời thượng làm từ chất liệu da dê mềm mịn. Gót gỗ tự nhiên cao 3cm tạo dáng đi thanh thoát nhưng vẫn vô cùng vững chãi.',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLtJO8u6pxLhA6JFHHv3Hqr-r6UcuVlZLjZDad9lLVHRkCnhMvciLrYpB-rr7N-vuN6W243mdGd_zmxKI7TF608xe5J8-uCynf49MYbZzRTTwYQMVCNVOcWSYKiAXkQueH0Er9gJKEjCol-MiRvZwelzER_6oEwVEqRadbgyUgfQ6piM1n2WiAXGcREVhhI2OqxuRpF0yQ1pGO7sqfaRTRUxluXftqa6OX9sLSg41YEKN0k5xdFinDrmOzmp',
    gallery: [
      'https://lh3.googleusercontent.com/aida/AP1WRLtJO8u6pxLhA6JFHHv3Hqr-r6UcuVlZLjZDad9lLVHRkCnhMvciLrYpB-rr7N-vuN6W243mdGd_zmxKI7TF608xe5J8-uCynf49MYbZzRTTwYQMVCNVOcWSYKiAXkQueH0Er9gJKEjCol-MiRvZwelzER_6oEwVEqRadbgyUgfQ6piM1n2WiAXGcREVhhI2OqxuRpF0yQ1pGO7sqfaRTRUxluXftqa6OX9sLSg41YEKN0k5xdFinDrmOzmp'
    ],
    sizes: ['36', '37', '38', '39'],
    colors: [
      { hex: '#D6E4D8', name: 'Xanh Bạc Hà' },
      { hex: '#E5D3C2', name: 'Trắng Kem' }
    ]
  }
};

const RECOMMENDATIONS = [
  {
    id: 'loafers-da-cao-cap',
    name: 'Giày Loafer Cổ Điển',
    price: 3850000,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLtkOT2bLe0W3DRJvE56SDuJ9I1M4LmFFtl5kXtIbHt4vFeZQ9EleuX7x0eq9iWvtZWUccs7yaT_kjOqEYnaME5JyCol9urlLEe9_y5cAY6qlUWZP-NT7qUltmpF8JaCLYAlKlMAekmLMkDlpLPgqVMGBcVpwBECF5gUcego9LmRx51vFBLCskdwQN2L2a_Buvk6eC2kgBpybF4SFvFUVkQyM_lH3ugJST50lcSwJ-e4Q7g-sIhljbIjDWoY'
  },
  {
    id: 'mules-da-thanh-lich',
    name: 'Giày Mule Da Mềm',
    price: 2150000,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLtJO8u6pxLhA6JFHHv3Hqr-r6UcuVlZLjZDad9lLVHRkCnhMvciLrYpB-rr7N-vuN6W243mdGd_zmxKI7TF608xe5J8-uCynf49MYbZzRTTwYQMVCNVOcWSYKiAXkQueH0Er9gJKEjCol-MiRvZwelzER_6oEwVEqRadbgyUgfQ6piM1n2WiAXGcREVhhI2OqxuRpF0yQ1pGO7sqfaRTRUxluXftqa6OX9sLSg41YEKN0k5xdFinDrmOzmp'
  },
  {
    id: 'giay-sneaker-canvas',
    name: 'Sneaker Vải Canvas',
    price: 1950000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCU2XSaXxE1VnsiM2fPTRNWp0spRjype6u4CZNdCcrH6svg4P0lt8sGnSu3c_QMSps85SkFf6t2tRsbfgEN_T5YskQ05KQZrbiVVe6U64yK9ptM862lfjD8ZBv4uoCt1DiVDheCpVUklIR2lKNN5QwT_Sb_ERQwGLTlwTCi2mQEkAtJBOKvoaFL8Y_eoconfn3NckJPzXD3O93WjiAztg1uP6gLqF9A-s--FkWhdh1WBIRQ3P44KCCXDc5ymZOryezbcZpqBm-lW1TA'
  }
];

export function ProductDetailPage() {
  const { slug } = useParams();

  if (STITCH_PRODUCT_SLUGS.has(slug)) {
    return <StitchProductDetailPage />;
  }

  return <LegacyProductDetailPage />;
}

function LegacyProductDetailPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();

  // Redux Cart state
  const cartItems = useSelector((state) => state.cart?.items || []);

  // Find product by slug, fallback to Sandal Da Thủ Công
  const product = PRODUCT_DATABASE[slug] || PRODUCT_DATABASE['sandal-da-thu-cong'];

  // Selection states
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.hex || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [successToast, setSuccessToast] = useState(false);

  // Sync state with slug changes
  useEffect(() => {
    setSelectedColor(product.colors[0]?.hex || '');
    setSelectedSize(product.sizes[0] || '');
    setSuccessToast(false);
  }, [slug, product]);

  const formatPrice = (value) => {
    return new Intl.NumberFormat('vi-VN').format(value) + 'đ';
  };

  const handleAddToCart = () => {
    // Check if item already exists in Redux cart state
    const existingIndex = cartItems.findIndex((item) => item.id === product.id);
    let newItems;
    if (existingIndex > -1) {
      newItems = cartItems.map((item, idx) =>
        idx === existingIndex ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      );
    } else {
      newItems = [
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        }
      ];
    }

    dispatch(setCart(newItems));
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 3000);
  };

  const activeColorName = product.colors.find((c) => c.hex === selectedColor)?.name || '';

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16 pt-12 flex flex-col pb-24">
      {successToast && (
        <div className="fixed top-24 right-6 z-50 bg-[#D6E4D8] border border-primary text-on-surface px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 animate-fade-in font-medium">
          <span className="material-symbols-outlined text-primary">check_circle</span>
          Đã thêm sản phẩm vào giỏ hàng!
        </div>
      )}

      {/* Product Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
        {/* Gallery Grid */}
        <div className="md:col-span-7 grid grid-cols-1 gap-4">
          <div className="rounded-lg overflow-hidden bg-cream-warm aspect-[4/5]">
            <img 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
              src={product.image} 
              alt={product.name}
            />
          </div>
          {product.gallery && product.gallery.length > 1 && (
            <div className="grid grid-cols-2 gap-4">
              {product.gallery.slice(1, 3).map((imgUrl, index) => (
                <div key={index} className="rounded-lg overflow-hidden bg-cream-warm aspect-square">
                  <img 
                    className="w-full h-full object-cover" 
                    src={imgUrl} 
                    alt={`${product.name} chi tiết ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="md:col-span-5 md:sticky md:top-32 flex flex-col gap-8">
          <div className="space-y-2">
            <p className="font-label-uppercase text-label-uppercase text-clay-dark tracking-[0.2em] font-semibold">
              {product.subtitle || 'Chế tác thủ công'}
            </p>
            <h1 className="font-display text-headline-lg text-on-surface">
              {product.name}
            </h1>
            <p className="font-headline-md text-headline-md text-primary mt-4">
              {formatPrice(product.price)}
            </p>
          </div>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            {product.description}
          </p>

          <div className="flex flex-wrap gap-4 py-4 border-y border-border-subtle">
            <div className="flex items-center gap-2 px-3 py-1 bg-sage rounded-full">
              <span className="material-symbols-outlined text-[18px]">eco</span>
              <span className="text-caption font-caption text-on-surface-variant uppercase font-bold">Chất liệu tự nhiên</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-cream-warm rounded-full">
              <span className="material-symbols-outlined text-[18px]">spa</span>
              <span className="text-caption font-caption text-on-surface-variant uppercase font-bold">Đế êm ái</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-cream-warm rounded-full">
              <span className="material-symbols-outlined text-[18px]">draw</span>
              <span className="text-caption font-caption text-on-surface-variant uppercase font-bold">Thiết kế tối giản</span>
            </div>
          </div>

          {/* Selectors */}
          <div className="space-y-6">
            <div>
              <span className="font-label-uppercase text-label-uppercase mb-3 block font-semibold">
                Màu sắc: <span className="text-on-surface font-normal">{activeColorName}</span>
              </span>
              <div className="flex gap-3">
                {product.colors.map((color) => {
                  const isActive = selectedColor === color.hex;
                  return (
                    <button
                      key={color.hex}
                      onClick={() => setSelectedColor(color.hex)}
                      style={{ backgroundColor: color.hex }}
                      className={`w-8 h-8 rounded-full border border-border-subtle ring-offset-2 transition-all ${
                        isActive ? 'ring-2 ring-primary' : 'hover:ring-2 hover:ring-primary hover:ring-offset-2'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-3">
                <span className="font-label-uppercase text-label-uppercase font-semibold">Kích thước</span>
                <button className="text-caption underline uppercase text-on-surface-variant font-bold">
                  Hướng dẫn chọn size
                </button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => {
                  const isActive = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-12 border rounded-lg flex items-center justify-center font-semibold transition-all ${
                        isActive
                          ? 'border-primary bg-primary text-on-primary'
                          : 'border-border-subtle hover:border-primary bg-transparent text-on-surface'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4 mt-4">
            <button
              onClick={handleAddToCart}
              className="w-full h-16 bg-primary text-on-primary rounded-full font-label-uppercase text-label-uppercase hover:bg-clay-dark transition-all transform active:scale-95 shadow-lg shadow-primary/10 font-bold"
            >
              Thêm vào giỏ hàng
            </button>
            <button 
              onClick={handleAddToCart}
              className="w-full h-16 border border-ink-light text-on-surface rounded-full font-label-uppercase text-label-uppercase hover:bg-on-surface hover:text-white transition-all transform active:scale-95 font-bold"
            >
              Mua ngay
            </button>
          </div>

          {/* Info Accordions */}
          <div className="mt-8 space-y-4">
            <details className="group border-b border-border-subtle pb-4" open>
              <summary className="flex justify-between items-center cursor-pointer list-none font-label-uppercase text-label-uppercase font-bold">
                Câu chuyện chất liệu
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div className="pt-4 text-body-md text-on-surface-variant leading-relaxed">
                Chúng tôi sử dụng da thuộc thực vật từ những xưởng thuộc da lâu đời nhất tại Tuscany. Quy trình này không sử dụng hóa chất độc hại, thay vào đó là chiết xuất từ vỏ cây và trái cây, tạo nên loại da có khả năng &quot;thở&quot; và sẽ càng đẹp hơn theo thời gian.
              </div>
            </details>
            <details className="group border-b border-border-subtle pb-4">
              <summary className="flex justify-between items-center cursor-pointer list-none font-label-uppercase text-label-uppercase font-bold">
                Hướng dẫn bảo quản
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div className="pt-4 text-body-md text-on-surface-variant leading-relaxed">
                Tránh để sản phẩm tiếp xúc trực tiếp với nước hoặc nguồn nhiệt cao. Định kỳ sử dụng kem dưỡng da chuyên dụng để duy trì độ mềm mại và ngăn ngừa vết nứt.
              </div>
            </details>
            <details className="group border-b border-border-subtle pb-4">
              <summary className="flex justify-between items-center cursor-pointer list-none font-label-uppercase text-label-uppercase font-bold">
                Giao hàng &amp; Đổi trả
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div className="pt-4 text-body-md text-on-surface-variant leading-relaxed">
                Miễn phí giao hàng cho đơn hàng trên 2.000.000đ. Hỗ trợ đổi size trong vòng 7 ngày kể từ ngày nhận hàng với điều kiện sản phẩm chưa qua sử dụng.
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* Material Showcase Section */}
      <section className="mt-32 py-24 bg-sage/30 -mx-6 md:-mx-16 px-6 md:px-16 rounded-[40px]">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="font-headline-lg text-headline-lg">Hơn cả một đôi giày, đó là sự bền vững.</h2>
              <div className="space-y-6">
                <div className="flex gap-6">
                  <div className="w-12 h-12 shrink-0 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-primary">psychology_alt</span>
                  </div>
                  <div>
                    <h4 className="font-label-uppercase text-label-uppercase mb-1 font-bold">Quy trình Ý thức</h4>
                    <p className="text-body-md text-on-surface-variant">Tất cả nguyên liệu đều có nguồn gốc minh bạch, đảm bảo sự tôn trọng tối đa đối với môi trường và cộng đồng.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 shrink-0 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-primary">history_edu</span>
                  </div>
                  <div>
                    <h4 className="font-label-uppercase text-label-uppercase mb-1 font-bold font-bold">Vẻ đẹp Thời gian</h4>
                    <p className="text-body-md text-on-surface-variant">Lớp patina tự nhiên sẽ hình thành trên bề mặt da sau quá trình sử dụng, tạo nên dấu ấn riêng biệt của chủ nhân.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  className="w-full h-full object-cover" 
                  alt="Nghệ nhân gia công" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAP3WXMbKv_6YaCzBCsZJdlAFepbB7fjLhPzJevqu33doCSHV-wGzfRqWTBpjMc83FC7d0lR7ZAs1VVIgVx1X1vb3NJgxIGimuYqkghNeXr6RyLzZuhhsggHfDPtoF9pl07faQzN6k4jSuVRHt8l_k7bnXUhENeQsyWOnrKio28psqtxYFk-MHCIB8sWPrhmOCayaQUJd5XK2RYn3Qv0M1YCU8YJO-E9Wg5VPoI12hZ5G9woHBaZSeUkq7ZIepCAjdWtqHeuOeCd7QJ"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 p-6 bg-surface-bright rounded-xl shadow-lg max-w-[240px]">
                <p className="italic text-body-md text-primary font-medium">
                  &quot;Mỗi mũi khâu là một lời cam kết về chất lượng và tâm huyết của người nghệ nhân.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* You May Also Like Section */}
      <section className="mt-32">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-2">
            <h2 className="font-headline-lg text-headline-lg">Có thể bạn sẽ thích</h2>
            <p className="text-on-surface-variant">Khám phá những thiết kế mới nhất từ BST Mùa Hè</p>
          </div>
          <Link to="/products" className="font-label-uppercase text-label-uppercase text-primary hover:underline underline-offset-4 transition-all font-semibold">
            Xem tất cả
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {RECOMMENDATIONS.map((rec) => (
            <Link to={`/products/${rec.id}`} key={rec.id} className="group flex flex-col gap-4 cursor-pointer block">
              <div className="aspect-[4/5] overflow-hidden rounded-lg bg-cream-warm relative">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  src={rec.image} 
                  alt={rec.name}
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-body-lg text-body-lg group-hover:text-primary transition-colors font-medium">
                  {rec.name}
                </h3>
                <p className="text-on-surface-variant font-medium">{formatPrice(rec.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
