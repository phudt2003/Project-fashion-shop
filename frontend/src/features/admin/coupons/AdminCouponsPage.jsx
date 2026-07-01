import React, { useState } from 'react';
import {
  AdminPageHeader,
  AdminCard,
  AdminButton,
  AdminInput,
  AdminSelect,
  AdminBadge,
  AdminTable,
  AdminTableRow,
  AdminTableCell,
  AdminPagination,
  AdminKPICard,
  AdminModal
} from '../../../components/admin';

const mockCoupons = [
  {
    id: 1,
    name: 'Mùa Hè Sôi Động',
    code: 'SUMMER50',
    type: 'Coupon',
    typeVariant: 'primary',
    discount: '20%',
    condition: 'Đơn từ 500k',
    category: 'Tất cả',
    startDate: '2024-10-10',
    endDate: '2024-10-20',
    used: 45,
    limit: 100,
    status: 'active',
    statusVariant: 'success',
    statusText: 'Đang chạy'
  },
  {
    id: 2,
    name: 'Ưu đãi Sơ Sinh',
    code: '---',
    type: 'Tự động',
    typeVariant: 'success',
    discount: '50k',
    condition: 'Cho bé < 12 tháng',
    category: 'Bé Gái',
    startDate: '2024-10-01',
    endDate: '2024-10-15',
    used: 92,
    limit: 100,
    status: 'expiring',
    statusVariant: 'warning',
    statusText: 'Sắp hết'
  },
  {
    id: 3,
    name: 'Flash Sale Trung Thu',
    code: 'FLASH20',
    type: 'Flash sale',
    typeVariant: 'secondary',
    discount: '15%',
    condition: 'Không giới hạn',
    category: 'Giày dép',
    startDate: '2024-09-15',
    endDate: '2024-09-18',
    used: 150,
    limit: 150,
    status: 'ended',
    statusVariant: 'neutral',
    statusText: 'Đã kết thúc'
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

  const breadcrumbs = [
    { label: 'Khuyến mãi' }
  ];

  const tableHeaders = [
    { label: 'Tên chương trình' },
    { label: 'Mã / Loại' },
    { label: 'Giảm (%)' },
    { label: 'Điều kiện' },
    { label: 'Danh mục', align: 'center' },
    { label: 'Hạn dùng' },
    { label: 'Đã dùng' },
    { label: 'Trạng thái' },
    { label: 'Thao tác', align: 'right' }
  ];

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

  const itemsPerPage = 5;
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

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <AdminPageHeader
        title="Quản lý Khuyến mãi"
        subtitle="Thiết lập và quản lý các chương trình ưu đãi, coupon giảm giá"
        breadcrumbs={breadcrumbs}
      >
        <AdminButton
          variant="primary"
          className="gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Tạo khuyến mãi
        </AdminButton>
      </AdminPageHeader>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminKPICard
          title="Đang hoạt động"
          value="12"
          icon="sell"
          trend="↑ +2 tuần này"
          trendVariant="success"
          progress={65}
          color="sky"
        />
        <AdminKPICard
          title="Sắp hết hạn"
          value="03"
          icon="warning"
          trend="Cần chú ý"
          trendVariant="warning"
          progress={15}
          color="rose"
        />
        <AdminKPICard
          title="Lượt dùng hôm nay"
          value="156"
          icon="group"
          trend="+24 lượt"
          trendVariant="success"
          progress={45}
          color="pink"
        />
        <AdminKPICard
          title="Doanh thu từ KM"
          value="45.2M"
          icon="payments"
          trend="VNĐ"
          trendVariant="info"
          progress={80}
          color="emerald"
        />
      </div>

      {/* Main Control Section */}
      <AdminCard className="!p-0 overflow-hidden">
        {/* Filter Tabs */}
        <div className="flex items-center px-6 pt-2 border-b border-slate-100 bg-slate-50/50">
          {[
            { id: 'all', label: 'Tất cả (24)' },
            { id: 'running', label: 'Đang chạy (12)' },
            { id: 'expiring', label: 'Sắp hết hạn (3)' },
            { id: 'ended', label: 'Đã kết thúc (9)' }
          ].map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-3 border-b-2 font-bold text-xs uppercase tracking-wider font-display transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-sky-500 text-sky-600'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="p-6 flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[300px]">
            <AdminInput
              placeholder="Tìm kiếm theo tên chương trình, mã code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-48">
            <AdminSelect
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="Tất cả">Loại: Tất cả</option>
              <option value="Coupon">Coupon</option>
              <option value="Flash sale">Flash sale</option>
              <option value="Tự động">Tự động</option>
            </AdminSelect>
          </div>
          <div className="w-48">
            <AdminSelect
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="Tất cả">Danh mục: Tất cả</option>
              <option value="Bé Trai">Bé Trai</option>
              <option value="Bé Gái">Bé Gái</option>
              <option value="Giày dép">Giày dép</option>
            </AdminSelect>
          </div>
        </div>

        {/* Table Container */}
        <AdminTable headers={tableHeaders}>
          {currentCoupons.map((coupon) => (
            <AdminTableRow
              key={coupon.id}
              className={coupon.status === 'ended' ? 'opacity-60' : ''}
              onMouseEnter={() => setHoveredRow(coupon.id)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <AdminTableCell>
                <p className="font-bold text-slate-800 text-sm">{coupon.name}</p>
                <span className="text-xs font-semibold text-slate-400">Campaign #{coupon.id}</span>
              </AdminTableCell>
              <AdminTableCell>
                <div className="flex flex-col gap-1">
                  <span className="font-display text-xs font-bold text-sky-500 uppercase">
                    {coupon.code}
                  </span>
                  <AdminBadge variant={coupon.typeVariant}>
                    {coupon.type}
                  </AdminBadge>
                </div>
              </AdminTableCell>
              <AdminTableCell className="font-bold text-slate-800">{coupon.discount}</AdminTableCell>
              <AdminTableCell className="text-xs font-semibold text-slate-500">{coupon.condition}</AdminTableCell>
              <AdminTableCell align="center">
                <span className="bg-slate-100 border border-slate-200 px-3 py-1 rounded-xl text-xs font-bold text-slate-600">
                  {coupon.category}
                </span>
              </AdminTableCell>
              <AdminTableCell className="text-xs font-bold text-slate-500">
                {formatDate(coupon.startDate)} - {formatDate(coupon.endDate)}
              </AdminTableCell>
              <AdminTableCell>
                <div className="flex flex-col gap-1 w-20">
                  <span className="text-xs font-bold text-slate-700">{coupon.used} / {coupon.limit}</span>
                  <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        coupon.used / coupon.limit > 0.8 ? 'bg-amber-500' : 'bg-sky-500'
                      }`}
                      style={{ width: `${(coupon.used / coupon.limit) * 100}%` }}
                    />
                  </div>
                </div>
              </AdminTableCell>
              <AdminTableCell>
                <AdminBadge variant={coupon.statusVariant} dot>
                  {coupon.statusText}
                </AdminBadge>
              </AdminTableCell>
              <AdminTableCell align="right">
                <div className={`flex items-center justify-end gap-1.5 transition-opacity duration-200 ${hoveredRow === coupon.id ? 'opacity-100' : 'opacity-0'}`}>
                  <button className="p-1.5 hover:bg-sky-50 text-sky-500 rounded-xl transition-all flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                  </button>
                  <button className="p-1.5 hover:bg-slate-100 text-slate-500 rounded-xl transition-all flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">content_copy</span>
                  </button>
                  <button className="p-1.5 hover:bg-rose-50 text-rose-500 rounded-xl transition-all flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              </AdminTableCell>
            </AdminTableRow>
          ))}
        </AdminTable>

        {/* Pagination */}
        <AdminPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={filteredCoupons.length}
          itemName="khuyến mãi"
        />
      </AdminCard>

      {/* Modal: Tạo Khuyến mãi */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Tạo chương trình khuyến mãi mới"
        subtitle="Thiết lập các thông số và cấu hình cho chương trình ưu đãi"
      >
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AdminInput
              label="Tên chương trình"
              placeholder="Ví dụ: Giáng sinh An lành"
            />
            <AdminInput
              label="Mã Coupon"
              placeholder="XMAS2024"
              className="font-display font-bold uppercase"
            />
          </div>

          {/* Promo Type */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-display">Loại khuyến mãi</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'Coupon', label: 'Coupon' },
                { id: 'Tự động', label: 'Tự động' },
                { id: 'Flash Sale', label: 'Flash Sale' }
              ].map((item) => (
                <label
                  key={item.id}
                  className={`flex items-center justify-center p-3 border-2 rounded-xl cursor-pointer hover:border-sky-500/50 transition-all ${
                    promoType === item.id ? 'border-sky-500 bg-sky-50/20' : 'border-slate-200 bg-white'
                  }`}
                >
                  <input
                    checked={promoType === item.id}
                    className="hidden"
                    name="promo_type"
                    type="radio"
                    onChange={() => setPromoType(item.id)}
                  />
                  <span className={`text-sm font-bold ${promoType === item.id ? 'text-sky-600' : 'text-slate-500'}`}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-display">Mức giảm</label>
              <div className="relative flex items-center">
                <input
                  className="w-full h-10 pl-4 pr-24 rounded-xl border border-slate-200 text-sm text-slate-800 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                  placeholder="0"
                  type="number"
                />
                <div className="absolute right-2 flex items-center gap-1 bg-slate-50 rounded-lg p-1 border border-slate-100">
                  <button className="px-2.5 py-0.5 bg-sky-500 text-white rounded-md text-xs font-bold" type="button">%</button>
                  <button className="px-2.5 py-0.5 text-slate-500 rounded-md text-xs font-bold" type="button">VNĐ</button>
                </div>
              </div>
            </div>
            <AdminInput
              label="Đơn tối thiểu (VNĐ)"
              placeholder="500,000"
              type="number"
            />
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-display">Áp dụng cho danh mục</label>
            <div className="flex flex-wrap gap-6 pt-1">
              {[
                { id: 'all', label: 'Tất cả' },
                { id: 'boy', label: 'Bé Trai' },
                { id: 'girl', label: 'Bé Gái' },
                { id: 'shoes', label: 'Giày dép' }
              ].map((category) => (
                <label key={category.id} className="flex items-center gap-2.5 cursor-pointer text-sm font-bold text-slate-600">
                  <input
                    className="w-5 h-5 rounded-lg border-slate-300 text-sky-500 focus:ring-sky-500/20 focus:ring-2 transition-all"
                    type="checkbox"
                    defaultChecked={category.id === 'all'}
                  />
                  <span>{category.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Dates & Limit */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AdminInput
              label="Ngày bắt đầu"
              type="date"
            />
            <AdminInput
              label="Ngày kết thúc"
              type="date"
            />
            <AdminInput
              label="Giới hạn dùng"
              placeholder="100"
              type="number"
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <AdminButton
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
            >
              Hủy
            </AdminButton>
            <AdminButton
              variant="primary"
              type="submit"
              onClick={() => setIsModalOpen(false)}
            >
              Tạo khuyến mãi
            </AdminButton>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
