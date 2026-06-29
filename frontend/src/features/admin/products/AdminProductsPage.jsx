import { useState } from 'react';

const mockProducts = [
  {
    id: 1,
    name: 'Set Áo Thun & Quần Linen',
    sku: 'KF-2023-001',
    category: 'Bé Trai',
    categoryColor: 'bg-secondary-fixed',
    categoryTextColor: 'text-on-secondary-fixed',
    price: 950000,
    stock: 45,
    status: 'active',
    statusColor: 'bg-secondary',
    statusText: 'Hiển thị',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLoYGVYyWeuZTJ-zjyXX0qvuqDp-Mxp27GUQU2cv3kSMtO1Z8R-srTU1p-hqFl66t8cR1XPrCyE5hYJLQKtl0Dn4sddoOHaJIIomTxsDLO6aaaC5LwTv2EdFcF_riqvR9wCdwMOsgh3LFCQWWfWLe3JMxsH7YLLp8jYLP7ZRrvLsk8cUmePjgi8fRozIZ-qD4xJOQ2xbvq8DKs_jrpf5B9HsUsunltJOKIQ4s0qAhWVI32ex1pdSEoY14ZrwTzJ78QerU3H4hgwJcD'
  },
  {
    id: 2,
    name: 'Váy Hoa Nhí Vintage',
    sku: 'KF-2023-042',
    category: 'Bé Gái',
    categoryColor: 'bg-tertiary-fixed',
    categoryTextColor: 'text-on-tertiary-fixed',
    price: 1250000,
    stock: 12,
    status: 'active',
    statusColor: 'bg-secondary',
    statusText: 'Hiển thị',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD48BLgeWuMy00qOR7pGPT1b3z5Bzz296Q31RJdEa8jW0j13mDlvj0w4zfwdAL5H5AVOKKOnDI-mCg048T3q-mNfY3S_b2P5pk0jyjK4DjR25p3gq8iFm6xOpfNUHRJltzpx6MwK0tT-hyWysGPN4vmqKpkLs9XUiMChjdzZkioSVL57nH1M8p-bFaR1jE8Z801KdiP6SSHg91HVas2ViIFYpBEf8WxHZ2f8utzIGtnzihr-c3DotmfybSUs2jbs5iIVZvdOe52qibh'
  },
  {
    id: 3,
    name: 'Giày Sneakers Da Bò',
    sku: 'KF-2023-089',
    category: 'Giày dép',
    categoryColor: 'bg-outline-variant',
    categoryTextColor: 'text-on-surface-variant',
    price: 2100000,
    stock: 5,
    status: 'hidden',
    statusColor: 'bg-outline',
    statusText: 'Ẩn',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU7xM-GYxx0mjTOnAsYexnqD3a6a7jvMClKPEIBe2giv-JvHYQDZgsgg9gusWEdFj1bqRXn65EwRPkSsdybiaRTh8wIqX1WJq0HvmnNX1YAsPLTUQMFRmOxViNv_NeVKVAJc9b8Ib37hiroImtku2ZBfrRP5MDD6J6H_OmBjXdxmA09B7PPqCqZaoxA4Fvw1QuqSuqmrWF0FW8Lpeo3QkAM1e9HBXAHKB1HVhLb1zbF6DR6AfAhMMP0UY6AKCWuDZB8Isew_3pCq5I'
  },
  {
    id: 4,
    name: 'Áo Khoác Denim Cool-Boy',
    sku: 'KF-2023-102',
    category: 'Bé Trai',
    categoryColor: 'bg-secondary-fixed',
    categoryTextColor: 'text-on-secondary-fixed',
    price: 1450000,
    stock: 82,
    status: 'active',
    statusColor: 'bg-secondary',
    statusText: 'Hiển thị',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAs1bZNYUOaIqtcjGY9iwZTRirkUF0p4Mdt5u0FisgJ-zlX5etyVFr0kj5wJXhZvLHpSZNReJESwVa-uBw4qrv50VRFllFCHYfZh1PMAejf4wxhh9gpvkLAKBJQsV6afLStEYDE6Pn_Ln8riwdnOJ0xW2-GnMUkuIcNT5YnjrOiqdQp_xRa0z8qoT6G6leuzmMcW6mwwdGvzeEY7qyCCUqJIa7RpZTffkmjeaXMhzarcsfhW4nirt-6-L7kpPmyTSJxpUZGVffvxldW'
  },
  {
    id: 5,
    name: 'Áo Len Tai Thỏ Cho Bé',
    sku: 'KF-2023-211',
    category: 'Bé Gái',
    categoryColor: 'bg-tertiary-fixed',
    categoryTextColor: 'text-on-tertiary-fixed',
    price: 680000,
    stock: 56,
    status: 'active',
    statusColor: 'bg-secondary',
    statusText: 'Hiển thị',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKzhF_JyN-DYCWdIyW93Sqzj9dEGWXvXn8VprzaA8F3km0D-M5_L1JAdmX5SVLF3cWOM62_6GRxvsmVI8FN9Ck5bVC8pOfwXXeXILVPI6OD0obtQjaEs9h2LraZbKWHp20fr4SJcXx3sCNYk5F7YpW5YfGGwAog2tAKoI-QTeYT9-5TbsIAxjLHfl_rAtWDQoVQ78ioK4Qust21TDvTosX1NzSnd0y_52KQrDwak2z0q0HsDiPgIvU-f765DX6FY3SB8EXTBqc4LWm'
  },
  {
    id: 6,
    name: 'Set Vest Công Tử Dự Tiệc',
    sku: 'KF-2023-332',
    category: 'Bé Trai',
    categoryColor: 'bg-secondary-fixed',
    categoryTextColor: 'text-on-secondary-fixed',
    price: 3200000,
    stock: 15,
    status: 'active',
    statusColor: 'bg-secondary',
    statusText: 'Hiển thị',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBP9kpGA9ZgzDm7wKDd3EBh3s0j1j79_w66ggrRCYF50IjYkGdzX-JiIOjjVuF-_mxaOi2YfG2WPQWtzNnesno4ztLPGgEOfnT8X5OGI7XLPVc6cgIEa96nCADxx8iftqvFkCB-jn4zhIIH0a2ySicrmzV1zxFRW2dlbGSQbdsI-B-mtb5J4gw7-hv5qOoqD55n8chuhmtQ4Sgmfjira07d2v0Ox9bN9EZu9L0QTD88SxQ2MJm7NN3VvbZgjPuwJ_0iR61mxSK2v6Nm'
  },
  {
    id: 7,
    name: 'Giày Búp Bê Kim Tuyến',
    sku: 'KF-2023-441',
    category: 'Giày dép',
    categoryColor: 'bg-outline-variant',
    categoryTextColor: 'text-on-surface-variant',
    price: 790000,
    stock: 28,
    status: 'active',
    statusColor: 'bg-secondary',
    statusText: 'Hiển thị',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdGySKQudbdQ8lAjxN24egGM8gxS8s7wj5YsdI912lRUEF0nBLJvWrb_UA7illeqOwWKLKLNPuFCRy1rvhcBWQyYGgiF4lz9E4xDFcOjA2171BsFf-atXV8Vkhpwiz6i4AGhACevSwflbo-A5dKpJ_eDERNf1RxGqDnAzb3mZKqn-z7rZYOIP9cTu2nFTi9SSxE2syxQ4nuGcYr8cEradSkORRJS-pkp_Cv5Kf0LwV_UxkcugONjITPr1al6W-gvB1MCD3LWQrCr1w'
  },
  {
    id: 8,
    name: 'Set Đồ Ngủ Cotton Organic',
    sku: 'KF-2023-505',
    category: 'Bé Gái',
    categoryColor: 'bg-tertiary-fixed',
    categoryTextColor: 'text-on-tertiary-fixed',
    price: 550000,
    stock: 104,
    status: 'active',
    statusColor: 'bg-secondary',
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

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-display-lg text-display-lg text-on-surface mb-2">Quản lý Sản phẩm</h2>
          <p className="text-body-md text-on-surface-variant">Danh mục sản phẩm hiện có trong kho hàng KidsFashion</p>
        </div>
        <button className="bg-primary text-on-primary px-6 py-3 rounded-xl font-body-md font-bold flex items-center gap-2 hover:bg-primary-container hover:shadow-lg transition-all active:scale-95">
          <span className="material-symbols-outlined">add_circle</span>
          Thêm sản phẩm mới
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-card_gap mb-8">
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-outline-variant/20">
          <div className="flex justify-between items-start mb-4">
            <span className="text-body-sm text-on-surface-variant font-medium">Tổng Sản Phẩm</span>
            <span className="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-lg">inventory_2</span>
          </div>
          <h3 className="font-display-lg text-display-lg text-on-surface mb-2">1,284</h3>
          <div className="flex items-center gap-2 text-on-secondary-fixed-variant">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            <span className="text-label-caps">+12.5%</span>
            <span className="text-body-sm text-on-surface-variant/60">so với tháng trước</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-outline-variant/20">
          <div className="flex justify-between items-start mb-4">
            <span className="text-body-sm text-on-surface-variant font-medium">Đang Hiển Thị</span>
            <span className="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-lg">visibility</span>
          </div>
          <h3 className="font-display-lg text-display-lg text-on-surface mb-2">1,150</h3>
          <div className="flex items-center gap-2 text-on-secondary-fixed-variant">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <span className="text-label-caps">90% ACTIVE</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-outline-variant/20">
          <div className="flex justify-between items-start mb-4">
            <span className="text-body-sm text-on-surface-variant font-medium">Sắp Hết Hàng</span>
            <span className="material-symbols-outlined text-error bg-error-container p-2 rounded-lg">warning</span>
          </div>
          <h3 className="font-display-lg text-display-lg text-on-surface mb-2">18</h3>
          <div className="flex items-center gap-2 text-error">
            <span className="material-symbols-outlined text-sm">priority_high</span>
            <span className="text-label-caps">CẦN NHẬP HÀNG</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-outline-variant/20">
          <div className="flex justify-between items-start mb-4">
            <span className="text-body-sm text-on-surface-variant font-medium">Doanh Thu Dự Kiến</span>
            <span className="material-symbols-outlined text-tertiary bg-tertiary-fixed p-2 rounded-lg">payments</span>
          </div>
          <h3 className="font-display-lg text-display-lg text-on-surface mb-2">₫2.4B</h3>
          <div className="flex items-center gap-2 text-on-tertiary-fixed-variant">
            <span className="material-symbols-outlined text-sm">account_balance_wallet</span>
            <span className="text-label-caps">ESTIMATED</span>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-surface-container-lowest p-4 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-outline-variant/20 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[240px] relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input
              className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border-none rounded-lg text-body-sm focus:ring-2 focus:ring-primary/20"
              placeholder="Tìm theo tên sản phẩm, mã SKU..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="bg-surface-container-low border-none rounded-lg text-body-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 min-w-[140px]"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">Tất cả danh mục</option>
            <option value="Bé Trai">Bé Trai</option>
            <option value="Bé Gái">Bé Gái</option>
            <option value="Giày dép">Giày dép</option>
          </select>

          <select
            className="bg-surface-container-low border-none rounded-lg text-body-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 min-w-[140px]"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Trạng thái</option>
            <option value="show">Hiển thị</option>
            <option value="hide">Ẩn</option>
          </select>

          <div className="flex items-center gap-2 bg-surface-container-low px-4 py-1.5 rounded-lg">
            <span className="text-label-caps text-on-surface-variant">Giá từ:</span>
            <input
              className="w-20 bg-transparent border-none text-body-sm focus:ring-0 p-0 text-right"
              placeholder="0"
              type="number"
              value={priceFrom}
              onChange={(e) => setPriceFrom(e.target.value)}
            />
            <span className="text-on-surface-variant">→</span>
            <input
              className="w-20 bg-transparent border-none text-body-sm focus:ring-0 p-0 text-right"
              placeholder="5M"
              type="number"
              value={priceTo}
              onChange={(e) => setPriceTo(e.target.value)}
            />
          </div>

          <button className="bg-surface-container-high text-on-surface-variant px-4 py-2.5 rounded-lg font-body-sm hover:bg-outline-variant transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">tune</span>
            Lọc dữ liệu
          </button>
        </div>
      </div>

      {/* Data Table Section */}
      <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-outline-variant/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30">
                <th className="px-6 py-4 font-label-caps text-on-surface-variant">Hình ảnh</th>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant">Tên sản phẩm</th>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant">Danh mục</th>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant text-right">Giá bán</th>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant text-center">Tồn kho</th>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant">Trạng thái</th>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {currentProducts.map((product) => (
                <tr
                  key={product.id}
                  className={`hover:bg-surface-container-lowest transition-colors group ${
                    hoveredRow === product.id ? 'scale-[1.002] z-10' : ''
                  }`}
                  onMouseEnter={() => setHoveredRow(product.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="px-6 py-4">
                    <img
                      className="w-12 h-12 rounded-lg object-cover border border-outline-variant/20 shadow-sm"
                      src={product.image}
                      alt={product.name}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-body-md font-bold text-on-surface">{product.name}</div>
                    <div className="text-body-sm text-on-surface-variant/60">SKU: {product.sku}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`${product.categoryColor} ${product.categoryTextColor} text-body-sm px-3 py-1 rounded-full`}>
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-data-tabular">{formatPrice(product.price)}</td>
                  <td className="px-6 py-4 text-center font-data-tabular">{product.stock}</td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-2 ${product.status === 'active' ? 'text-secondary' : 'text-on-surface-variant/60'} font-medium`}>
                      <span className={`w-2 h-2 rounded-full ${product.statusColor} ${product.status === 'active' ? 'animate-pulse' : ''}`}></span>
                      {product.statusText}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className={`flex justify-end gap-2 transition-opacity ${hoveredRow === product.id ? 'opacity-100' : 'opacity-0'}`}>
                      <button className="p-2 hover:bg-primary-fixed text-primary rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                      <button className="p-2 hover:bg-error-container text-error rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-surface-container-low flex justify-between items-center border-t border-outline-variant/30">
          <div className="text-body-sm text-on-surface-variant">
            Hiển thị {startIndex + 1} - {Math.min(endIndex, filteredProducts.length)} của {filteredProducts.length} sản phẩm
          </div>
          <div className="flex items-center gap-1">
            <button
              className="p-2 rounded-lg hover:bg-surface-container-high transition-colors disabled:opacity-30"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            {[1, 2, 3].map(page => (
              <button
                key={page}
                className={`w-10 h-10 rounded-lg font-bold text-body-sm transition-colors ${
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
                className={`w-10 h-10 rounded-lg hover:bg-surface-container-high text-on-surface-variant text-body-sm transition-colors`}
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </button>
            )}
            <button
              className="p-2 rounded-lg hover:bg-surface-container-high transition-colors disabled:opacity-30"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

