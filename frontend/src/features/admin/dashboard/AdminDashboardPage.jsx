import React from 'react';
import {
  AdminPageHeader,
  AdminCard,
  AdminButton,
  AdminBadge,
  AdminTable,
  AdminTableRow,
  AdminTableCell,
  AdminKPICard
} from '../../../components/admin';

export function AdminDashboardPage() {
  const currentDate = new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const kpiData = [
    {
      title: 'Doanh thu hôm nay',
      value: '₫12.500.000',
      icon: 'payments',
      color: 'sky',
      trend: '+12%',
      trendVariant: 'success',
      progress: 75
    },
    {
      title: 'Đơn hàng mới',
      value: '48',
      icon: 'shopping_bag',
      color: 'pink',
      trend: '+8%',
      trendVariant: 'success',
      progress: 50
    },
    {
      title: 'Tồn kho thấp',
      value: '12',
      icon: 'inventory',
      color: 'rose',
      trend: 'Cảnh báo',
      trendVariant: 'danger',
      progress: 25
    },
    {
      title: 'Khách hàng mới',
      value: '156',
      icon: 'person_add',
      color: 'emerald',
      trend: '+24%',
      trendVariant: 'success',
      progress: 66
    }
  ];

  const bestSellers = [
    {
      name: 'Váy Hoa Nhí Vintage',
      sales: 156,
      price: '₫450.000',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv4ZuS2tJLYfhCY-vWcONcFR9RHjr1GIZ3O-S4nPx_wA9ZgJ2E-SvIKh1lCkecMZYp1gm55it2FQv9czpt5mUCQC8xD_NJEq442G1x4vEOk-a--xUCpNKCaGhN5hb4Z6L1xy5YaqfeNvuMbxQSoJ5R-j-t1d3rEECMpLJL9WygnOVZfb-nn6aD0P3NEeclCBhqgla2ko31CERL3tqddggJdeRl4XCzB7ONgzKvi_D7LD42qj95zjEgHp6-y1Kh66HuNek46E7aMj9t'
    },
    {
      name: 'Yếm Denim Kids Pro',
      sales: 124,
      price: '₫380.000',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1g0mItrW9jh34vTVq9FdxSzA8r9ea18AhNJfUmF1GXVudMPGoQOr_vjaamFbPFffTwHSIS1yN68P7VVDnVxSXfmzJFs-RNk7tEpM0AjIQeJtzitaIzn16Mes6uSoVu5SB5jFZ5k6Lph51PGAXVQ2gX1WCYA2cGOZ4qH6Xb6QoxSzruVixe-yGoVoCaeAzlJq8qEA06P3wZa5jPvMTyRpQbHTquCohK3YvHDw3La0f0kC1cj-UPcAjxtH5Y4QKzKkXrqFxx6cNGVcB'
    },
    {
      name: 'Set Áo Thun Organic',
      sales: 98,
      price: '₫290.000',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChzZN7DvMMlvZUedN19xMFgpEcZe9qw-zMQPId2oaAQNTTJ01ytZoueO0IcaN0-u_FCpK4Y0YpbkAb8kSvPz-YuwLPgmfT8pyCiOVdVYBP17Yc5Y5dEKyC4W19ntE7lnin0r6nu9Q7vQq4S64tVq5O-NvALz-YmAPy2SVRwaxNjztX2eb0ExsHLy1NxG6ZyU4Tli0iu5S0a6nR22952Hpx1AXNjJ8fq2mwm9DFqbqnWI2q6u5bHDGJEJWOJTxCVtpvK7HIfSPLZeQs'
    },
    {
      name: 'Giày Da Tập Đi',
      sales: 85,
      price: '₫520.000',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR9YKuKF1f-H_UH6oC8zlL5h4QKlFdHKmBiFJ95nM2Atwg9dLmx_P7d-kLcji4xOrARO48hXY-qqfTW25YDy2S1yMMfcsADpHFuODkRfu5w6A2rGD3OeGaCyFG5wRfCgY3a2pPqIt6oK6iFNrEPsUPrdDQF55cY2S8Wftc8yJfuVbcHlTVBYmd8LIZBj9Ojd16cwUVKS2Mt1LdxXVnTlouRlQYZo8X19We5hHD_-T9YMDvdhuLjiMaUuSyhBE_RyDYr9DiOM_reLmV'
    },
    {
      name: 'Mũ Bucket Chống Nắng',
      sales: 72,
      price: '₫180.000',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwY8FD88Gm5RpCb58r-5JBxCP28wAETYCzqXciWjooUI6_eelis5ObMNW31jyFErSjX1xtmUlcg7os-ZjqsGRfVn98eQw2QgNSk8Ej9q2s44Dm3tUJrODOvZ42WJyBZl-Weo9Xsk7RnkDoShI6VTKonefKITlydPDT1KwX_2mFejkUAQAJFT7yviXX3PxeV80N24Ju2wQ94oJTYQn_hj4kGfDhAQ0g7vI-P1dWbSsO8bmcEHU5SA2vDS787wTJU8YtCqBOlpvh7WiU'
    }
  ];

  const recentOrders = [
    { id: 'ST-10245', customer: 'Nguyễn An', initials: 'NA', product: 'Set Áo Thun Organic...', total: '₫950.000', status: 'Pending', statusColor: 'warning' },
    { id: 'ST-10246', customer: 'Trần Hoa', initials: 'TH', product: 'Váy Hoa Nhí Vintage', total: '₫450.000', status: 'Shipping', statusColor: 'info' },
    { id: 'ST-10247', customer: 'Lê Minh', initials: 'LM', product: 'Yếm Denim Kids Pro', total: '₫760.000', status: 'Completed', statusColor: 'success' },
    { id: 'ST-10248', customer: 'Phạm Tú', initials: 'PT', product: 'Giày Da Tập Đi...', total: '₫1.200.000', status: 'Pending', statusColor: 'warning' },
    { id: 'ST-10249', customer: 'Đặng Khoa', initials: 'ĐK', product: 'Mũ Bucket + Áo Thun', total: '₫470.000', status: 'Completed', statusColor: 'success' }
  ];

  const getInitialColor = (index) => {
    const colors = ['bg-sky-50 text-sky-600 border border-sky-100', 'bg-pink-50 text-pink-600 border border-pink-100', 'bg-emerald-50 text-emerald-600 border border-emerald-100'];
    return colors[index % colors.length];
  };

  const recentOrdersHeaders = [
    { label: 'Mã đơn' },
    { label: 'Khách hàng' },
    { label: 'Sản phẩm' },
    { label: 'Tổng tiền', align: 'right' },
    { label: 'Trạng thái' },
    { label: 'Thao tác', align: 'center' }
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <AdminPageHeader
        title="Dashboard Tổng quan"
        subtitle="Chào mừng trở lại! Đây là tình hình kinh doanh của Fashion Shop hôm nay."
      >
        <AdminButton variant="outline" className="gap-2">
          <span className="material-symbols-outlined text-[18px]">calendar_today</span>
          Hôm nay: {currentDate}
        </AdminButton>
        <AdminButton variant="primary" className="gap-2">
          <span className="material-symbols-outlined text-[18px]">download</span>
          Xuất báo cáo
        </AdminButton>
      </AdminPageHeader>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <div key={index} className="h-full">
            <AdminKPICard
              title={kpi.title}
              value={kpi.value}
              icon={kpi.icon}
              trend={kpi.trend}
              trendVariant={kpi.trendVariant}
              progress={kpi.progress}
              color={kpi.color}
            />
          </div>
        ))}
      </div>

      {/* Dashboard Grid Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Revenue Trend Chart */}
        <div className="lg:col-span-2">
          <AdminCard className="h-full flex flex-col justify-between">
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-semibold text-slate-800 font-display">Xu hướng doanh thu (7 ngày qua)</h4>
                  <p className="text-xs text-slate-500 font-medium">Tăng trưởng ổn định trong tuần qua</p>
                </div>
                <div className="relative">
                  <select className="appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2 pl-4 pr-10 text-xs font-semibold text-slate-600 outline-none focus:border-sky-500 transition-all cursor-pointer">
                    <option>7 ngày gần nhất</option>
                    <option>30 ngày gần nhất</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[18px]">
                    expand_more
                  </span>
                </div>
              </div>
              
              {/* Mock Line Chart Area */}
              <div className="relative h-64 w-full flex items-end gap-2 px-2 mt-4">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-50">
                  <div className="h-px w-full border-t border-slate-100"></div>
                  <div className="h-px w-full border-t border-slate-100"></div>
                  <div className="h-px w-full border-t border-slate-100"></div>
                  <div className="h-px w-full border-t border-slate-100"></div>
                </div>
                
                <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 700 200">
                  <defs>
                    <linearGradient id="gradient-sky" x1="0%" x2="100%" y1="0%" y2="0%">
                      <stop offset="0%" stopColor="#0ea5e9"></stop>
                      <stop offset="100%" stopColor="#f472b6"></stop>
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,150 L100,130 L200,160 L300,100 L400,120 L500,60 L600,40 L700,20"
                    fill="none"
                    stroke="url(#gradient-sky)"
                    strokeLinecap="round"
                    strokeWidth="4"
                  ></path>
                </svg>
                
                {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day) => (
                  <div key={day} className="relative z-10 flex flex-1 flex-col items-center group">
                    <div className="mb-1 h-2.5 w-2.5 rounded-full bg-sky-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"></div>
                    <span className="mt-4 text-[11px] font-bold text-slate-400">{day}</span>
                  </div>
                ))}
              </div>
            </div>
          </AdminCard>
        </div>

        {/* Top Best Sellers */}
        <div>
          <AdminCard className="h-full flex flex-col justify-between">
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h4 className="text-base font-semibold text-slate-800 font-display">Top 5 Bán Chạy</h4>
                <button className="text-xs font-bold text-sky-500 hover:underline">Tất cả</button>
              </div>
              <div className="space-y-4">
                {bestSellers.map((product, index) => (
                  <div key={index} className="flex items-center gap-4 py-1.5 hover:bg-slate-50/50 rounded-xl transition-colors">
                    <div className="h-11 w-11 overflow-hidden rounded-xl bg-slate-100 flex-shrink-0 border border-slate-100 shadow-sm">
                      <img
                        className="h-full w-full object-cover"
                        src={product.image}
                        alt={product.name}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-800 truncate">{product.name}</p>
                      <p className="text-xs font-medium text-slate-400">{product.sales} lượt bán</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-sky-500 font-display">
                        {product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AdminCard>
        </div>

        {/* Latest Orders Table */}
        <div className="lg:col-span-3">
          <AdminCard className="!p-0 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 p-6">
              <div>
                <h4 className="text-base font-semibold text-slate-800 font-display">Đơn hàng mới nhất</h4>
                <p className="text-xs text-slate-500 font-medium">Cập nhật 5 phút trước</p>
              </div>
              <AdminButton variant="outline" className="text-xs h-9">
                Xem tất cả đơn hàng
              </AdminButton>
            </div>
            
            <AdminTable headers={recentOrdersHeaders}>
              {recentOrders.map((order, index) => (
                <TableRowCustom key={order.id} order={order} index={index} getInitialColor={getInitialColor} />
              ))}
            </AdminTable>
          </AdminCard>
        </div>
      </div>
    </div>
  );
}

function TableRowCustom({ order, index, getInitialColor }) {
  return (
    <AdminTableRow>
      <AdminTableCell className="font-bold text-sky-500">{order.id}</AdminTableCell>
      <AdminTableCell>
        <div className="flex items-center gap-3">
          <div className={`flex h-8 w-8 items-center justify-center rounded-xl font-bold text-xs ${getInitialColor(index)}`}>
            {order.initials}
          </div>
          <span className="font-bold text-slate-800">{order.customer}</span>
        </div>
      </AdminTableCell>
      <AdminTableCell className="text-slate-500 font-medium">{order.product}</AdminTableCell>
      <AdminTableCell align="right" className="font-bold text-slate-800">{order.total}</AdminTableCell>
      <AdminTableCell>
        <AdminBadge variant={order.statusColor} dot>
          {order.status === 'Pending' ? 'Chờ duyệt' : order.status === 'Shipping' ? 'Đang giao' : 'Hoàn thành'}
        </AdminBadge>
      </AdminTableCell>
      <AdminTableCell align="center">
        <button className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-sky-500 transition-all flex items-center justify-center">
          <span className="material-symbols-outlined text-[20px]">visibility</span>
        </button>
      </AdminTableCell>
    </AdminTableRow>
  );
}

