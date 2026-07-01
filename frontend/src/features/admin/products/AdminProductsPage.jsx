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
  AdminKPICard
} from '../../../components/admin';

const mockProducts = [
  {
    id: 1,
    name: 'Set Áo Thun & Quần Linen',
    sku: 'KF-2023-001',
    category: 'Bé Trai',
    categoryVariant: 'primary',
    price: 950000,
    stock: 45,
    status: 'active',
    statusVariant: 'success',
    statusText: 'Hiển thị',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLoYGVYyWeuZTJ-zjyXX0qvuqDp-Mxp27GUQU2cv3kSMtO1Z8R-srTU1p-hqFl66t8cR1XPrCyE5hYJLQKtl0Dn4sddoOHaJIIomTxsDLO6aaaC5LwTv2EdFcF_riqvR9wCdwMOsgh3LFCQWWfWLe3JMxsH7YLLp8jYLP7ZRrvLsk8cUmePjgi8fRozIZ-qD4xJOQ2xbvq8DKs_jrpf5B9HsUsunltJOKIQ4s0qAhWVI32ex1pdSEoY14ZrwTzJ78QerU3H4hgwJcD'
  },
  {
    id: 2,
    name: 'Váy Hoa Nhí Vintage',
    sku: 'KF-2023-042',
    category: 'Bé Gái',
    categoryVariant: 'secondary',
    price: 1250000,
    stock: 12,
    status: 'active',
    statusVariant: 'success',
    statusText: 'Hiển thị',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD48BLgeWuMy00qOR7pGPT1b3z5Bzz296Q31RJdEa8jW0j13mDlvj0w4zfwdAL5H5AVOKKOnDI-mCg048T3q-mNfY3S_b2P5pk0jyjK4DjR25p3gq8iFm6xOpfNUHRJltzpx6MwK0tT-hyWysGPN4vmqKpkLs9XUiMChjdzZkioSVL57nH1M8p-bFaR1jE8Z801KdiP6SSHg91HVas2ViIFYpBEf8WxHZ2f8utzIGtnzihr-c3DotmfybSUs2jbs5iIVZvdOe52qibh'
  },
  {
    id: 3,
    name: 'Giày Sneakers Da Bò',
    sku: 'KF-2023-089',
    category: 'Giày dép',
    categoryVariant: 'neutral',
    price: 2100000,
    stock: 5,
    status: 'hidden',
    statusVariant: 'neutral',
    statusText: 'Ẩn',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU7xM-GYxx0mjTOnAsYexnqD3a6a7jvMClKPEIBe2giv-JvHYQDZgsgg9gusWEdFj1bqRXn65EwRPkSsdybiaRTh8wIqX1WJq0HvmnNX1YAsPLTUQMFRmOxViNv_NeVKVAJc9b8Ib37hiroImtku2ZBfrRP5MDD6J6H_OmBjXdxmA09B7PPqCqZaoxA4Fvw1QuqSuqmrWF0FW8Lpeo3QkAM1e9HBXAHKB1HVhLb1zbF6DR6AfAhMMP0UY6AKCWuDZB8Isew_3pCq5I'
  },
  {
    id: 4,
    name: 'Áo Khoác Denim Cool-Boy',
    sku: 'KF-2023-102',
    category: 'Bé Trai',
    categoryVariant: 'primary',
    price: 1450000,
    stock: 82,
    status: 'active',
    statusVariant: 'success',
    statusText: 'Hiển thị',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAs1bZNYUOaIqtcjGY9iwZTRirkUF0p4Mdt5u0FisgJ-zlX5etyVFr0kj5wJXhZvLHpSZNReJESwVa-uBw4qrv50VRFllFCHYfZh1PMAejf4wxhh9gpvkLAKBJQsV6afLStEYDE6Pn_Ln8riwdnOJ0xW2-GnMUkuIcNT5YnjrOiqdQp_xRa0z8qoT6G6leuzmMcW6mwwdGvzeEY7qyCCUqJIa7RpZTffkmjeaXMhzarcsfhW4nirt-6-L7kpPmyTSJxpUZGVffvxldW'
  },
  {
    id: 5,
    name: 'Áo Len Tai Thỏ Cho Bé',
    sku: 'KF-2023-211',
    category: 'Bé Gái',
    categoryVariant: 'secondary',
    price: 680000,
    stock: 56,
    status: 'active',
    statusVariant: 'success',
    statusText: 'Hiển thị',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKzhF_JyN-DYCWdIyW93Sqzj9dEGWXvXn8VprzaA8F3km0D-M5_L1JAdmX5SVLF3cWOM62_6GRxvsmVI8FN9Ck5bVC8pOfwXXeXILVPI6OD0obtQjaEs9h2LraZbKWHp20fr4SJcXx3sCNYk5F7YpW5YfGGwAog2tAKoI-QTeYT9-5TbsIAxjLHfl_rAtWDQoVQ78ioK4Qust21TDvTosX1NzSnd0y_52KQrDwak2z0q0HsDiPgIvU-f765DX6FY3SB8EXTBqc4LWm'
  },
  {
    id: 6,
    name: 'Set Vest Công Tử Dự Tiệc',
    sku: 'KF-2023-332',
    category: 'Bé Trai',
    categoryVariant: 'primary',
    price: 3200000,
    stock: 15,
    status: 'active',
    statusVariant: 'success',
    statusText: 'Hiển thị',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBP9kpGA9ZgzDm7wKDd3EBh3s0j1j79_w66ggrRCYF50IjYkGdzX-JiIOjjVuF-_mxaOi2YfG2WPQWtzNnesno4ztLPGgEOfnT8X5OGI7XLPVc6cgIEa96nCADxx8iftqvFkCB-jn4zhIIH0a2ySicrmzV1zxFRW2dlbGSQbdsI-B-mtb5J4gw7-hv5qOoqD55n8chuhmtQ4Sgmfjira07d2v0Ox9bN9EZu9L0QTD88SxQ2MJm7NN3VvbZgjPuwJ_0iR61mxSK2v6Nm'
  },
  {
    id: 7,
    name: 'Giày Búp Bê Kim Tuyến',
    sku: 'KF-2023-441',
    category: 'Giày dép',
    categoryVariant: 'neutral',
    price: 790000,
    stock: 28,
    status: 'active',
    statusVariant: 'success',
    statusText: 'Hiển thị',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdGySKQudbdQ8lAjxN24egGM8gxS8s7wj5YsdI912lRUEF0nBLJvWrb_UA7illeqOwWKLKLNPuFCRy1rvhcBWQyYGgiF4lz9E4xDFcOjA2171BsFf-atXV8Vkhpwiz6i4AGhACevSwflbo-A5dKpJ_eDERNf1RxGqDnAzb3mZKqn-z7rZYOIP9cTu2nFTi9SSxE2syxQ4nuGcYr8cEradSkORRJS-pkp_Cv5Kf0LwV_UxkcugONjITPr1al6W-gvB1MCD3LWQrCr1w'
  },
  {
    id: 8,
    name: 'Set Đồ Ngủ Cotton Organic',
    sku: 'KF-2023-505',
    category: 'Bé Gái',
    categoryVariant: 'secondary',
    price: 550000,
    stock: 104,
    status: 'active',
    statusVariant: 'success',
    statusText: 'Hiển thị',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQMYp9sjUzswIhpSFkQaf--Yp3v8NPEYf7hykrsKkYUYmDXa0ZCi8v-AKbKWX6r_CpqxNPfzPG3pzthZUTO4L1u9YCG8oV_-mJH7arFjbZanAjAWkOnWnC311CyQQntzAgGTFUJgi7EFm6GXaUhHGt0uM7MkOerHt7WqWJHKT0T7dSez3_3Hm4rO_XiWiqlMGBO-xek_ABHyxblUMUtyKHvKsxMkTUnuHUKjd9Q11cLBiQpFCkbA-L7Evx-EmlfkddrMmxCOxJq6s7'
  }
];

export function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState(null);

  const breadcrumbs = [
    { label: 'Sản phẩm' }
  ];

  const tableHeaders = [
    { label: 'Hình ảnh' },
    { label: 'Tên sản phẩm' },
    { label: 'Danh mục' },
    { label: 'Giá bán', align: 'right' },
    { label: 'Tồn kho', align: 'center' },
    { label: 'Trạng thái' },
    { label: 'Hành động', align: 'right' }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    const matchesStatus = !statusFilter || 
                         (statusFilter === 'show' && product.status === 'active') ||
                         (statusFilter === 'hide' && product.status === 'hidden');
    const matchesPrice = (!priceFrom || product.price >= parseInt(priceFrom)) &&
                       (!priceTo || product.price <= parseInt(priceTo));
    
    return matchesSearch && matchesCategory && matchesStatus && matchesPrice;
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <AdminPageHeader
        title="Quản lý Sản phẩm"
        subtitle="Danh mục sản phẩm hiện có trong kho hàng KidsFashion"
        breadcrumbs={breadcrumbs}
      >
        <AdminButton variant="primary" className="gap-2">
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          Thêm sản phẩm mới
        </AdminButton>
      </AdminPageHeader>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminKPICard
          title="Tổng Sản Phẩm"
          value="1,284"
          icon="inventory_2"
          trend="+12.5%"
          trendVariant="success"
          progress={75}
          color="sky"
        />
        <AdminKPICard
          title="Đang Hiển Thị"
          value="1,150"
          icon="visibility"
          trend="90% Active"
          trendVariant="success"
          progress={90}
          color="pink"
        />
        <AdminKPICard
          title="Sắp Hết Hàng"
          value="18"
          icon="warning"
          trend="Cần nhập hàng"
          trendVariant="danger"
          progress={15}
          color="rose"
        />
        <AdminKPICard
          title="Doanh Thu Dự Kiến"
          value="₫2.4B"
          icon="payments"
          trend="Estimated"
          trendVariant="info"
          progress={80}
          color="emerald"
        />
      </div>

      {/* Filters Section */}
      <AdminCard className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[240px]">
            <AdminInput
              placeholder="Tìm theo tên sản phẩm, mã SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="w-48">
            <AdminSelect
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">Tất cả danh mục</option>
              <option value="Bé Trai">Bé Trai</option>
              <option value="Bé Gái">Bé Gái</option>
              <option value="Giày dép">Giày dép</option>
            </AdminSelect>
          </div>

          <div className="w-40">
            <AdminSelect
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Trạng thái</option>
              <option value="show">Hiển thị</option>
              <option value="hide">Ẩn</option>
            </AdminSelect>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-1.5 rounded-xl h-10">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-display">Giá từ:</span>
            <input
              className="w-16 bg-transparent border-none text-sm text-slate-800 outline-none p-0 text-right focus:ring-0"
              placeholder="0"
              type="number"
              value={priceFrom}
              onChange={(e) => setPriceFrom(e.target.value)}
            />
            <span className="text-slate-400 font-bold">→</span>
            <input
              className="w-16 bg-transparent border-none text-sm text-slate-800 outline-none p-0 text-right focus:ring-0"
              placeholder="5M"
              type="number"
              value={priceTo}
              onChange={(e) => setPriceTo(e.target.value)}
            />
          </div>

          <AdminButton variant="outline" className="gap-2">
            <span className="material-symbols-outlined text-[18px]">tune</span>
            Lọc dữ liệu
          </AdminButton>
        </div>
      </AdminCard>

      {/* Data Table Section */}
      <AdminCard className="!p-0 overflow-hidden">
        <AdminTable headers={tableHeaders}>
          {currentProducts.map((product) => (
            <AdminTableRow
              key={product.id}
              onMouseEnter={() => setHoveredRow(product.id)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <AdminTableCell>
                <img
                  className="w-11 h-11 rounded-xl object-cover border border-slate-100 shadow-sm"
                  src={product.image}
                  alt={product.name}
                />
              </AdminTableCell>
              <AdminTableCell>
                <div className="font-bold text-slate-800">{product.name}</div>
                <div className="text-xs font-semibold text-slate-400 mt-0.5">SKU: {product.sku}</div>
              </AdminTableCell>
              <AdminTableCell>
                <AdminBadge variant={product.categoryVariant}>
                  {product.category}
                </AdminBadge>
              </AdminTableCell>
              <AdminTableCell align="right" className="font-bold text-slate-800">{formatPrice(product.price)}</AdminTableCell>
              <AdminTableCell align="center" className="font-bold text-slate-800">{product.stock}</AdminTableCell>
              <AdminTableCell>
                <AdminBadge variant={product.statusVariant} dot>
                  {product.statusText}
                </AdminBadge>
              </AdminTableCell>
              <AdminTableCell align="right">
                <div className={`flex justify-end gap-1.5 transition-opacity duration-200 ${hoveredRow === product.id ? 'opacity-100' : 'opacity-0'}`}>
                  <button className="p-1.5 hover:bg-sky-50 text-sky-500 rounded-xl transition-all flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">edit</span>
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
          totalItems={filteredProducts.length}
          itemName="sản phẩm"
        />
      </AdminCard>
    </div>
  );
}
