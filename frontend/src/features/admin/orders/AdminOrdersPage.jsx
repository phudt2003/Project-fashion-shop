import { useState } from 'react';

const mockOrders = [
  {
    id: 'ORD-2023-001',
    customer: 'Nguyễn Thị Mai',
    email: 'mai.nguyen@email.com',
    phone: '0901234567',
    items: 3,
    total: 2450000,
    status: 'completed',
    statusColor: 'bg-secondary',
    statusText: 'Hoàn thành',
    date: '2023-12-15',
    paymentMethod: 'Thanh toán khi nhận hàng'
  },
  {
    id: 'ORD-2023-002',
    customer: 'Trần Văn Hùng',
    email: 'hung.tran@email.com',
    phone: '0912345678',
    items: 1,
    total: 1250000,
    status: 'processing',
    statusColor: 'bg-primary',
    statusText: 'Đang xử lý',
    date: '2023-12-15',
    paymentMethod: 'Chuyển khoản ngân hàng'
  },
  {
    id: 'ORD-2023-003',
    customer: 'Lê Thị Lan',
    email: 'lan.le@email.com',
    phone: '0923456789',
    items: 5,
    total: 3850000,
    status: 'pending',
    statusColor: 'bg-tertiary',
    statusText: 'Chờ xác nhận',
    date: '2023-12-14',
    paymentMethod: 'Ví điện tử MoMo'
  },
  {
    id: 'ORD-2023-004',
    customer: 'Phạm Minh Tuấn',
    email: 'tuan.pham@email.com',
    phone: '0934567890',
    items: 2,
    total: 1780000,
    status: 'shipped',
    statusColor: 'bg-outline',
    statusText: 'Đang giao',
    date: '2023-12-14',
    paymentMethod: 'Thanh toán khi nhận hàng'
  },
  {
    id: 'ORD-2023-005',
    customer: 'Hoàng Thanh Hương',
    email: 'huong.hoang@email.com',
    phone: '0945678901',
    items: 4,
    total: 2920000,
    status: 'cancelled',
    statusColor: 'bg-error',
    statusText: 'Đã hủy',
    date: '2023-12-13',
    paymentMethod: 'Thẻ tín dụng'
  },
  {
    id: 'ORD-2023-006',
    customer: 'Đỗ Quốc Bảo',
    email: 'bao.do@email.com',
    phone: '0956789012',
    items: 1,
    total: 680000,
    status: 'completed',
    statusColor: 'bg-secondary',
    statusText: 'Hoàn thành',
    date: '2023-12-13',
    paymentMethod: 'Thanh toán khi nhận hàng'
  },
  {
    id: 'ORD-2023-007',
    customer: 'Vũ Ngọc Anh',
    email: 'anh.vu@email.com',
    phone: '0967890123',
    items: 3,
    total: 2150000,
    status: 'processing',
    statusColor: 'bg-primary',
    statusText: 'Đang xử lý',
    date: '2023-12-12',
    paymentMethod: 'Chuyển khoản ngân hàng'
  },
  {
    id: 'ORD-2023-008',
    customer: 'Nguyễn Đức Dũng',
    email: 'dung.nguyen@email.com',
    phone: '0978901234',
    items: 2,
    total: 1450000,
    status: 'shipped',
    statusColor: 'bg-outline',
    statusText: 'Đang giao',
    date: '2023-12-12',
    paymentMethod: 'Ví điện tử MoMo'
  }
];

export function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    const matchesDateFrom = !dateFrom || new Date(order.date) >= new Date(dateFrom);
    const matchesDateTo = !dateTo || new Date(order.date) <= new Date(dateTo);
    
    return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo;
  });

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-display-lg text-display-lg text-on-surface mb-2">Quản lý Đơn hàng</h2>
          <p className="text-body-md text-on-surface-variant">Theo dõi và quản lý tất cả đơn đặt hàng từ khách hàng</p>
        </div>
        <button className="bg-primary text-on-primary px-6 py-3 rounded-xl font-body-md font-bold flex items-center gap-2 hover:bg-primary-container hover:shadow-lg transition-all active:scale-95">
          <span className="material-symbols-outlined">download</span>
          Xuất báo cáo
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-card_gap mb-8">
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-outline-variant/20">
          <div className="flex justify-between items-start mb-4">
            <span className="text-body-sm text-on-surface-variant font-medium">Tổng Đơn Hàng</span>
            <span className="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-lg">shopping_cart</span>
          </div>
          <h3 className="font-display-lg text-display-lg text-on-surface mb-2">2,847</h3>
          <div className="flex items-center gap-2 text-on-secondary-fixed-variant">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            <span className="text-label-caps">+8.2%</span>
            <span className="text-body-sm text-on-surface-variant/60">so với tháng trước</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-outline-variant/20">
          <div className="flex justify-between items-start mb-4">
            <span className="text-body-sm text-on-surface-variant font-medium">Đang Xử Lý</span>
            <span className="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-lg">pending</span>
          </div>
          <h3 className="font-display-lg text-display-lg text-on-surface mb-2">156</h3>
          <div className="flex items-center gap-2 text-on-secondary-fixed-variant">
            <span className="material-symbols-outlined text-sm">schedule</span>
            <span className="text-label-caps">PENDING</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-outline-variant/20">
          <div className="flex justify-between items-start mb-4">
            <span className="text-body-sm text-on-surface-variant font-medium">Đã Hoàn Thành</span>
            <span className="material-symbols-outlined text-secondary bg-secondary-fixed p-2 rounded-lg">check_circle</span>
          </div>
          <h3 className="font-display-lg text-display-lg text-on-surface mb-2">2,543</h3>
          <div className="flex items-center gap-2 text-secondary">
            <span className="material-symbols-outlined text-sm">verified</span>
            <span className="text-label-caps">COMPLETED</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-outline-variant/20">
          <div className="flex justify-between items-start mb-4">
            <span className="text-body-sm text-on-surface-variant font-medium">Doanh Thu</span>
            <span className="material-symbols-outlined text-tertiary bg-tertiary-fixed p-2 rounded-lg">payments</span>
          </div>
          <h3 className="font-display-lg text-display-lg text-on-surface mb-2">₫8.7B</h3>
          <div className="flex items-center gap-2 text-on-tertiary-fixed-variant">
            <span className="material-symbols-outlined text-sm">account_balance_wallet</span>
            <span className="text-label-caps">TOTAL</span>
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
              placeholder="Tìm theo tên khách hàng, mã đơn hàng..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="bg-surface-container-low border-none rounded-lg text-body-sm px-4 py-2.5 focus:ring-2 focus:ring-primary/20 min-w-[140px]"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="pending">Chờ xác nhận</option>
            <option value="processing">Đang xử lý</option>
            <option value="shipped">Đang giao</option>
            <option value="completed">Hoàn thành</option>
            <option value="cancelled">Đã hủy</option>
          </select>

          <div className="flex items-center gap-2 bg-surface-container-low px-4 py-1.5 rounded-lg">
            <span className="text-label-caps text-on-surface-variant">Từ:</span>
            <input
              className="w-32 bg-transparent border-none text-body-sm focus:ring-0 p-0"
              placeholder="DD/MM/YYYY"
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
            <span className="text-on-surface-variant">→</span>
            <input
              className="w-32 bg-transparent border-none text-body-sm focus:ring-0 p-0"
              placeholder="DD/MM/YYYY"
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
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
                <th className="px-6 py-4 font-label-caps text-on-surface-variant">Mã đơn hàng</th>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant">Khách hàng</th>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant">Số lượng</th>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant text-right">Tổng tiền</th>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant">Phương thức</th>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant">Ngày đặt</th>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant">Trạng thái</th>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {currentOrders.map((order) => (
                <tr
                  key={order.id}
                  className={`hover:bg-surface-container-lowest transition-colors group ${
                    hoveredRow === order.id ? 'scale-[1.002] z-10' : ''
                  }`}
                  onMouseEnter={() => setHoveredRow(order.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="px-6 py-4">
                    <div className="font-body-md font-bold text-primary">{order.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-body-md font-bold text-on-surface">{order.customer}</div>
                    <div className="text-body-sm text-on-surface-variant/60">{order.email}</div>
                    <div className="text-body-sm text-on-surface-variant/60">{order.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-center font-data-tabular">{order.items}</td>
                  <td className="px-6 py-4 text-right font-data-tabular font-bold">{formatPrice(order.total)}</td>
                  <td className="px-6 py-4">
                    <div className="text-body-sm text-on-surface-variant">{order.paymentMethod}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-body-sm text-on-surface-variant">{formatDate(order.date)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-body-sm font-medium ${
                      order.status === 'completed' ? 'bg-secondary/10 text-secondary' :
                      order.status === 'processing' ? 'bg-primary/10 text-primary' :
                      order.status === 'pending' ? 'bg-tertiary/10 text-tertiary' :
                      order.status === 'shipped' ? 'bg-outline/10 text-on-surface-variant' :
                      'bg-error/10 text-error'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${order.statusColor} ${order.status === 'processing' ? 'animate-pulse' : ''}`}></span>
                      {order.statusText}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className={`flex justify-end gap-2 transition-opacity ${hoveredRow === order.id ? 'opacity-100' : 'opacity-0'}`}>
                      <button className="p-2 hover:bg-primary-fixed text-primary rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-sm">visibility</span>
                      </button>
                      <button className="p-2 hover:bg-primary-fixed text-primary rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-sm">edit</span>
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
            Hiển thị {startIndex + 1} - {Math.min(endIndex, filteredOrders.length)} của {filteredOrders.length} đơn hàng
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

