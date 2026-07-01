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

const mockOrders = [
  {
    id: 'ORD-2023-001',
    customer: 'Nguyễn Thị Mai',
    email: 'mai.nguyen@email.com',
    phone: '0901234567',
    items: 3,
    total: 2450000,
    status: 'completed',
    statusVariant: 'success',
    statusText: 'Hoàn thành',
    date: '2023-12-15',
    paymentMethod: 'Thanh toán COD'
  },
  {
    id: 'ORD-2023-002',
    customer: 'Trần Văn Hùng',
    email: 'hung.tran@email.com',
    phone: '0912345678',
    items: 1,
    total: 1250000,
    status: 'processing',
    statusVariant: 'primary',
    statusText: 'Đang xử lý',
    date: '2023-12-15',
    paymentMethod: 'Chuyển khoản'
  },
  {
    id: 'ORD-2023-003',
    customer: 'Lê Thị Lan',
    email: 'lan.le@email.com',
    phone: '0923456789',
    items: 5,
    total: 3850000,
    status: 'pending',
    statusVariant: 'warning',
    statusText: 'Chờ xác nhận',
    date: '2023-12-14',
    paymentMethod: 'Ví MoMo'
  },
  {
    id: 'ORD-2023-004',
    customer: 'Phạm Minh Tuấn',
    email: 'tuan.pham@email.com',
    phone: '0934567890',
    items: 2,
    total: 1780000,
    status: 'shipped',
    statusVariant: 'info',
    statusText: 'Đang giao',
    date: '2023-12-14',
    paymentMethod: 'Thanh toán COD'
  },
  {
    id: 'ORD-2023-005',
    customer: 'Hoàng Thanh Hương',
    email: 'huong.hoang@email.com',
    phone: '0945678901',
    items: 4,
    total: 2920000,
    status: 'cancelled',
    statusVariant: 'danger',
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
    statusVariant: 'success',
    statusText: 'Hoàn thành',
    date: '2023-12-13',
    paymentMethod: 'Thanh toán COD'
  },
  {
    id: 'ORD-2023-007',
    customer: 'Vũ Ngọc Anh',
    email: 'anh.vu@email.com',
    phone: '0967890123',
    items: 3,
    total: 2150000,
    status: 'processing',
    statusVariant: 'primary',
    statusText: 'Đang xử lý',
    date: '2023-12-12',
    paymentMethod: 'Chuyển khoản'
  },
  {
    id: 'ORD-2023-008',
    customer: 'Nguyễn Đức Dũng',
    email: 'dung.nguyen@email.com',
    phone: '0978901234',
    items: 2,
    total: 1450000,
    status: 'shipped',
    statusVariant: 'info',
    statusText: 'Đang giao',
    date: '2023-12-12',
    paymentMethod: 'Ví MoMo'
  }
];

export function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState(null);

  const breadcrumbs = [
    { label: 'Đơn hàng' }
  ];

  const tableHeaders = [
    { label: 'Mã đơn hàng' },
    { label: 'Khách hàng' },
    { label: 'Số lượng', align: 'center' },
    { label: 'Tổng tiền', align: 'right' },
    { label: 'Phương thức' },
    { label: 'Ngày đặt' },
    { label: 'Trạng thái' },
    { label: 'Hành động', align: 'right' }
  ];

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

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <AdminPageHeader
        title="Quản lý Đơn hàng"
        subtitle="Theo dõi và quản lý tất cả đơn đặt hàng từ khách hàng"
        breadcrumbs={breadcrumbs}
      >
        <AdminButton variant="primary" className="gap-2">
          <span className="material-symbols-outlined text-[20px]">download</span>
          Xuất báo cáo
        </AdminButton>
      </AdminPageHeader>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminKPICard
          title="Tổng Đơn Hàng"
          value="2,847"
          icon="shopping_cart"
          trend="+8.2%"
          trendVariant="success"
          progress={75}
          color="sky"
        />
        <AdminKPICard
          title="Đang Xử Lý"
          value="156"
          icon="pending"
          trend="Pending"
          trendVariant="warning"
          progress={45}
          color="pink"
        />
        <AdminKPICard
          title="Đã Hoàn Thành"
          value="2,543"
          icon="check_circle"
          trend="Completed"
          trendVariant="success"
          progress={90}
          color="emerald"
        />
        <AdminKPICard
          title="Doanh Thu"
          value="₫8.7B"
          icon="payments"
          trend="Total"
          trendVariant="info"
          progress={80}
          color="sky"
        />
      </div>

      {/* Filters Section */}
      <AdminCard className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[240px]">
            <AdminInput
              placeholder="Tìm theo tên khách hàng, mã đơn hàng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="w-48">
            <AdminSelect
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Tất cả trạng thái</option>
              <option value="pending">Chờ xác nhận</option>
              <option value="processing">Đang xử lý</option>
              <option value="shipped">Đang giao</option>
              <option value="completed">Hoàn thành</option>
              <option value="cancelled">Đã hủy</option>
            </AdminSelect>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-1.5 rounded-xl h-10">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-display">Từ:</span>
            <input
              className="bg-transparent border-none text-sm text-slate-800 outline-none p-0 focus:ring-0 w-28 text-center"
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
            <span className="text-slate-400 font-bold">→</span>
            <input
              className="bg-transparent border-none text-sm text-slate-800 outline-none p-0 focus:ring-0 w-28 text-center"
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
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
          {currentOrders.map((order) => (
            <AdminTableRow
              key={order.id}
              onMouseEnter={() => setHoveredRow(order.id)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <AdminTableCell>
                <div className="font-bold text-sky-500">{order.id}</div>
              </AdminTableCell>
              <AdminTableCell>
                <div className="font-bold text-slate-800">{order.customer}</div>
                <div className="text-xs font-semibold text-slate-400 mt-0.5">{order.email}</div>
                <div className="text-xs font-semibold text-slate-400">{order.phone}</div>
              </AdminTableCell>
              <AdminTableCell align="center" className="font-bold text-slate-800">{order.items}</AdminTableCell>
              <AdminTableCell align="right" className="font-bold text-slate-800">{formatPrice(order.total)}</AdminTableCell>
              <AdminTableCell>
                <div className="text-xs font-bold text-slate-500">{order.paymentMethod}</div>
              </AdminTableCell>
              <AdminTableCell>
                <div className="text-xs font-bold text-slate-500">{formatDate(order.date)}</div>
              </AdminTableCell>
              <AdminTableCell>
                <AdminBadge variant={order.statusVariant} dot>
                  {order.statusText}
                </AdminBadge>
              </AdminTableCell>
              <AdminTableCell align="right">
                <div className={`flex justify-end gap-1.5 transition-opacity duration-200 ${hoveredRow === order.id ? 'opacity-100' : 'opacity-0'}`}>
                  <button className="p-1.5 hover:bg-sky-50 text-sky-500 rounded-xl transition-all flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                  </button>
                  <button className="p-1.5 hover:bg-sky-50 text-sky-500 rounded-xl transition-all flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">edit</span>
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
          totalItems={filteredOrders.length}
          itemName="đơn hàng"
        />
      </AdminCard>
    </div>
  );
}
