import { useState } from 'react';

const mockCoupons = [
  {
    id: 1,
    name: 'Mùa Hè Sôi Động',
    code: 'SUMMER50',
    type: 'Coupon',
    discount: '20%',
    discountType: 'percent',
    condition: 'Đơn từ 500k',
    category: 'Tất cả',
    startDate: '2024-10-10',
    endDate: '2024-10-20',
    used: 45,
    limit: 100,
    status: 'active'
  },
  {
    id: 2,
    name: 'Ưu đãi Sơ Sinh',
    code: '---',
    type: 'Tự động',
    discount: '50k',
    discountType: 'fixed',
    condition: 'Cho bé < 12 tháng',
    category: 'Bé Gái',
    startDate: '2024-10-01',
    endDate: '2024-10-15',
    used: 92,
    limit: 100,
    status: 'expiring'
  },
  {
    id: 3,
    name: 'Flash Sale Trung Thu',
    code: 'FLASH20',
    type: 'Flash sale',
    discount: '15%',
    discountType: 'percent',
    condition: 'Không giới hạn',
    category: 'Giày dép',
    startDate: '2024-09-15',
    endDate: '2024-09-18',
    used: 150,
    limit: 150,
    status: 'ended'
  }
];

export function AdminCouponsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('Tất cả');
  const [categoryFilter, setCategoryFilter] = useState('Tất cả');
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promoType, setPromoType] = useState('Coupon');

  const filteredCoupons = mockCoupons.filter(coupon => {
    const matchesSearch = coupon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coupon.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'Tất cả' || coupon.type === typeFilter;
    const matchesCategory = categoryFilter === 'Tất cả' || coupon.category === categoryFilter;
    
    let matchesTab = true;
    if (activeTab === 'running') matchesTab = coupon.status === 'active';
    if (activeTab === 'expiring') matchesTab = coupon.status === 'expiring';
    if (activeTab === 'ended') matchesTab = coupon.status === 'ended';
    
    return matchesSearch && matchesType && matchesCategory && matchesTab;
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredCoupons.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCoupons = filteredCoupons.slice(startIndex, endIndex);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit'
    }).format(date);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <span className="flex items-center gap-1.5 text-green-700 bg-green-50 px-2 py-1 rounded-lg text-xs font-bold w-fit">
            <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"></span>
            Đang chạy
          </span>
        );
      case 'expiring':
        return (
          <span className="flex items-center gap-1.5 text-amber-700 bg-amber-50 px-2 py-1 rounded-lg text-xs font-bold w-fit">
            <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span>
            Sắp hết
          </span>
        );
      case 'ended':
        return (
          <span className="flex items-center gap-1.5 text-on-surface-variant bg-surface-container-high px-2 py-1 rounded-lg text-xs font-bold w-fit">
            <span className="w-1.5 h-1.5 bg-outline rounded-full"></span>
            Đã kết thúc
          </span>
        );
      default:
        return null;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Coupon':
        return 'bg-primary-container/20 text-primary';
      case 'Tự động':
        return 'bg-tertiary-container/20 text-tertiary';
      case 'Flash sale':
        return 'bg-secondary-container/20 text-secondary';
      default:
        return 'bg-surface-container-high text-on-surface-variant';
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h2 className="font-headline-md text-headline-md text-on-surface">Quản lý Khuyến mãi</h2>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <span className="material-symbols-outlined p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full cursor-pointer transition-all">
              notifications
            </span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
          </div>
          <button
            className="bg-primary text-on-primary px-6 py-2.5 rounded-full flex items-center gap-2 font-title-sm hover:opacity-90 active:scale-95 transition-all shadow-md"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="material-symbols-outlined">add</span>
            Tạo khuyến mãi
          </button>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-card_gap mb-8">
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-outline-variant/30 flex flex-col gap-2">
          <span className="text-on-surface-variant font-body-sm">Đang hoạt động</span>
          <div className="flex items-end justify-between">
            <span className="font-display-lg text-display-lg text-primary">12</span>
            <div className="flex items-center text-green-700 text-sm font-bold bg-green-50 px-2 py-1 rounded-lg">
              <span className="material-symbols-outlined text-sm">trending_up</span> 12%
            </div>
          </div>
          <div className="h-1 w-full bg-surface-container-high rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-primary w-[65%]"></div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-outline-variant/30 flex flex-col gap-2">
          <span className="text-on-surface-variant font-body-sm">Sắp hết hạn</span>
          <div className="flex items-end justify-between">
            <span className="font-display-lg text-display-lg text-tertiary">03</span>
            <div className="flex items-center text-sm font-bold bg-amber-50 px-2 py-1 rounded-lg text-amber-700">
              <span className="material-symbols-outlined text-sm">warning</span> Cần chú ý
            </div>
          </div>
          <div className="h-1 w-full bg-surface-container-high rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-tertiary w-[15%]"></div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-outline-variant/30 flex flex-col gap-2">
          <span className="text-on-surface-variant font-body-sm">Lượt dùng hôm nay</span>
          <div className="flex items-end justify-between">
            <span className="font-display-lg text-display-lg text-on-surface">156</span>
            <div className="flex items-center text-sm font-bold bg-blue-50 px-2 py-1 rounded-lg text-blue-700">
              <span className="material-symbols-outlined text-sm">group</span> +24
            </div>
          </div>
          <div className="h-1 w-full bg-surface-container-high rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-secondary-container w-[45%]"></div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-outline-variant/30 flex flex-col gap-2">
          <span className="text-on-surface-variant font-body-sm">Doanh thu từ KM</span>
          <div className="flex items-end justify-between">
            <span className="font-display-lg text-display-lg text-on-surface">45.2M</span>
            <span className="text-on-surface-variant text-xs font-bold mb-1">VNĐ</span>
          </div>
          <div className="h-1 w-full bg-surface-container-high rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-primary-container w-[80%]"></div>
          </div>
        </div>
      </div>

      {/* Main Control Section */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-outline-variant/30 overflow-hidden">
        {/* Filter Tabs */}
        <div className="flex items-center px-6 pt-4 border-b border-outline-variant/30">
          <button
            className={`px-6 py-4 border-b-2 font-bold transition-all ${
              activeTab === 'all' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
            onClick={() => setActiveTab('all')}
          >
            Tất cả (24)
          </button>
          <button
            className={`px-6 py-4 border-b-2 font-bold transition-all ${
              activeTab === 'running' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
            onClick={() => setActiveTab('running')}
          >
            Đang chạy (12)
          </button>
          <button
            className={`px-6 py-4 border-b-2 font-bold transition-all ${
              activeTab === 'expiring' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
            onClick={() => setActiveTab('expiring')}
          >
            Sắp hết hạn (3)
          </button>
          <button
            className={`px-6 py-4 border-b-2 font-bold transition-all ${
              activeTab === 'ended' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
            onClick={() => setActiveTab('ended')}
          >
            Đã kết thúc (9)
          </button>
        </div>

        {/* Search & Filters */}
        <div className="p-6 flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[300px] relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input
              className="w-full pl-12 pr-4 py-2.5 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-on-surface"
              placeholder="Tìm kiếm tên khuyến mãi..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <select
              className="bg-surface-container-low border-none rounded-xl py-2.5 px-4 text-on-surface-variant text-sm focus:ring-2 focus:ring-primary/20 cursor-pointer"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option>Loại: Tất cả</option>
              <option>Coupon</option>
              <option>Flash sale</option>
              <option>Tự động</option>
            </select>
            <select
              className="bg-surface-container-low border-none rounded-xl py-2.5 px-4 text-on-surface-variant text-sm focus:ring-2 focus:ring-primary/20 cursor-pointer"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option>Danh mục: Tất cả</option>
              <option>Bé Trai</option>
              <option>Bé Gái</option>
              <option>Giày dép</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2.5 text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-all">
              <span className="material-symbols-outlined text-lg">filter_list</span>
              Lọc khác
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50 border-y border-outline-variant/30">
                <th className="px-6 py-4 font-label-caps text-on-surface-variant uppercase">Tên chương trình</th>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant uppercase">Mã / Loại</th>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant uppercase">Giảm (%)</th>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant uppercase">Điều kiện</th>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant uppercase text-center">Danh mục</th>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant uppercase">Hạn dùng</th>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant uppercase">Đã dùng</th>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant uppercase">Trạng thái</th>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant uppercase text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {currentCoupons.map((coupon) => (
                <tr
                  key={coupon.id}
                  className={`hover:bg-surface-container-low/30 transition-colors group ${coupon.status === 'ended' ? 'opacity-60' : ''}`}
                  onMouseEnter={() => setHoveredRow(coupon.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="px-6 py-5">
                    <p className="font-title-sm text-sm text-on-surface">{coupon.name}</p>
                    <span className="text-xs text-on-surface-variant">Campaign #{coupon.code}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1">
                      <span className={`font-mono text-sm font-bold ${coupon.code === '---' ? 'text-tertiary' : 'text-primary'}`}>
                        {coupon.code}
                      </span>
                      <span className={`${getTypeColor(coupon.type)} px-2 py-0.5 rounded text-[10px] w-fit uppercase font-bold`}>
                        {coupon.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-data-tabular">{coupon.discount}</td>
                  <td className="px-6 py-5 text-sm text-on-surface-variant">{coupon.condition}</td>
                  <td className="px-6 py-5 text-center">
                    <span className="bg-surface-container-high px-3 py-1 rounded-full text-xs">{coupon.category}</span>
                  </td>
                  <td className="px-6 py-5 text-sm">{formatDate(coupon.startDate)} - {formatDate(coupon.endDate)}</td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold">{coupon.used} / {coupon.limit}</span>
                      <div className="w-16 h-1 bg-surface-container-high rounded-full">
                        <div
                          className={`h-full rounded-full ${
                            coupon.used / coupon.limit > 0.8 ? 'bg-amber-500' : 'bg-primary'
                          }`}
                          style={{ width: `${(coupon.used / coupon.limit) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">{getStatusBadge(coupon.status)}</td>
                  <td className="px-6 py-5 text-right">
                    <div className={`flex items-center justify-end gap-2 transition-opacity ${hoveredRow === coupon.id ? 'opacity-100' : 'opacity-0'}`}>
                      <button className="p-2 hover:bg-primary-container/20 text-primary rounded-full transition-all">
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                      <button className="p-2 hover:bg-surface-container-high text-on-surface-variant rounded-full transition-all">
                        <span className="material-symbols-outlined text-lg">content_copy</span>
                      </button>
                      <button className="p-2 hover:bg-error-container/20 text-error rounded-full transition-all">
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-outline-variant/30 flex items-center justify-between">
          <span className="text-xs text-on-surface-variant">
            Hiển thị {startIndex + 1} - {Math.min(endIndex, filteredCoupons.length)} của {filteredCoupons.length} khuyến mãi
          </span>
          <div className="flex items-center gap-1">
            <button
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-high text-on-surface-variant disabled:opacity-30"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            >
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            {[1, 2, 3].map(page => (
              <button
                key={page}
                className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-xs transition-colors ${
                  currentPage === page
                    ? 'bg-primary text-on-primary'
                    : 'hover:bg-surface-container-high text-on-surface-variant'
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            {totalPages > 3 && <span className="px-2 text-on-surface-variant">...</span>}
            {totalPages > 3 && (
              <button
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-high text-on-surface-variant text-xs"
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </button>
            )}
            <button
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-high text-on-surface-variant disabled:opacity-30"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            >
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-container_padding mt-8">
        <p className="text-center text-on-surface-variant font-body-sm">
          © 2024 Design Fashion Shop. Kid's Admin Environment v2.4
        </p>
      </footer>

      {/* Modal: Tạo Khuyến mãi */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-[rgba(25,28,29,0.4)] backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="relative bg-surface-container-lowest w-full max-w-2xl max-h-[921px] overflow-y-auto rounded-3xl shadow-2xl p-8 transform transition-all scale-100">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface">Tạo chương trình mới</h3>
                <p className="text-on-surface-variant text-sm">Thiết lập các thông số cho chương trình khuyến mãi</p>
              </div>
              <button
                className="p-2 hover:bg-surface-container-high rounded-full transition-all"
                onClick={() => setIsModalOpen(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {/* Name & Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-title-sm text-sm text-on-surface">Tên chương trình</label>
                  <input
                    className="w-full px-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20"
                    placeholder="Ví dụ: Giáng sinh An lành"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-title-sm text-sm text-on-surface">Mã Coupon</label>
                  <input
                    className="w-full px-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 font-mono font-bold uppercase"
                    placeholder="XMAS2024"
                    type="text"
                  />
                </div>
              </div>

              {/* Promo Type */}
              <div className="space-y-3">
                <label className="font-title-sm text-sm text-on-surface">Loại khuyến mãi</label>
                <div className="grid grid-cols-3 gap-3">
                  <label className="relative flex items-center justify-center p-3 border border-outline-variant/50 rounded-xl cursor-pointer hover:border-primary/50 transition-all">
                    <input
                      checked={promoType === 'Coupon'}
                      className="hidden"
                      name="promo_type"
                      type="radio"
                      onChange={() => setPromoType('Coupon')}
                    />
                    <span className={`text-sm font-bold ${promoType === 'Coupon' ? 'text-primary' : 'text-on-surface-variant'}`}>
                      Coupon
                    </span>
                  </label>
                  <label className="relative flex items-center justify-center p-3 border border-outline-variant/50 rounded-xl cursor-pointer hover:border-primary/50 transition-all">
                    <input
                      checked={promoType === 'Tự động'}
                      className="hidden"
                      name="promo_type"
                      type="radio"
                      onChange={() => setPromoType('Tự động')}
                    />
                    <span className={`text-sm font-bold ${promoType === 'Tự động' ? 'text-primary' : 'text-on-surface-variant'}`}>
                      Tự động
                    </span>
                  </label>
                  <label className="relative flex items-center justify-center p-3 border border-outline-variant/50 rounded-xl cursor-pointer hover:border-primary/50 transition-all">
                    <input
                      checked={promoType === 'Flash Sale'}
                      className="hidden"
                      name="promo_type"
                      type="radio"
                      onChange={() => setPromoType('Flash Sale')}
                    />
                    <span className={`text-sm font-bold ${promoType === 'Flash Sale' ? 'text-primary' : 'text-on-surface-variant'}`}>
                      Flash Sale
                    </span>
                  </label>
                </div>
              </div>

              {/* Discount & Condition */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-title-sm text-sm text-on-surface">Mức giảm</label>
                  <div className="relative flex items-center">
                    <input
                      className="w-full pl-4 pr-16 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20"
                      placeholder="0"
                      type="number"
                    />
                    <div className="absolute right-2 flex items-center gap-1 bg-surface-container-lowest rounded-lg p-1 shadow-sm">
                      <button className="px-2 py-0.5 bg-primary text-on-primary rounded text-xs" type="button">%</button>
                      <button className="px-2 py-0.5 text-on-surface-variant rounded text-xs" type="button">VNĐ</button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-title-sm text-sm text-on-surface">Đơn tối thiểu (VNĐ)</label>
                  <input
                    className="w-full px-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20"
                    placeholder="500,000"
                    type="number"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-3">
                <label className="font-title-sm text-sm text-on-surface">Áp dụng cho danh mục</label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20" type="checkbox" defaultChecked />
                    <span className="text-sm">Tất cả</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20" type="checkbox" />
                    <span className="text-sm">Bé Trai</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20" type="checkbox" />
                    <span className="text-sm">Bé Gái</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20" type="checkbox" />
                    <span className="text-sm">Giày dép</span>
                  </label>
                </div>
              </div>

              {/* Dates & Limit */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="font-title-sm text-sm text-on-surface">Ngày bắt đầu</label>
                  <input
                    className="w-full px-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-sm"
                    type="date"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-title-sm text-sm text-on-surface">Ngày kết thúc</label>
                  <input
                    className="w-full px-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-sm"
                    type="date"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-title-sm text-sm text-on-surface">Giới hạn dùng</label>
                  <input
                    className="w-full px-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-sm"
                    placeholder="100"
                    type="number"
                  />
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t border-outline-variant/30">
                <button
                  className="px-6 py-3 rounded-full font-title-sm text-on-surface-variant hover:bg-surface-container-high transition-all"
                  onClick={() => setIsModalOpen(false)}
                  type="button"
                >
                  Hủy
                </button>
                <button
                  className="bg-primary text-on-primary px-8 py-3 rounded-full font-title-sm hover:opacity-90 shadow-lg active:scale-95 transition-all"
                  type="submit"
                >
                  Tạo khuyến mãi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

