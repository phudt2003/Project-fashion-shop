import React, { useState } from 'react';
import {
  AdminPageHeader,
  AdminCard,
  AdminButton,
  AdminTable,
  AdminTableRow,
  AdminTableCell,
  AdminKPICard
} from '../../../components/admin';

const bestSellingProducts = [
  {
    rank: 1,
    name: 'Váy hoa linen Bé Gái',
    category: 'Bé Gái',
    quantity: 152,
    revenue: 45600000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvaoT8ziyBmTC2ArBvijZOHWNitRIpfnqNiQHgY7o0n5o1jFbAYKr0J-R-XynF9QOgKGdmTHvtlkNbZpA4OhvoxDpOMPB1sONv8UUmeETXm53zSqqyVzKHIJp-5u0SE8m3y0a_bSait3do4uAoAAB5ALZ5DxHVmVZHyubOnI5V2SkhBFKJgCx15xt8c2j_D1s15Elg9LmB3_Su77BZy5Jopi54GyfhR8BUxx5DNEJO6fabbONccC7xiCkOxIkGUsnflmrCy5H-3UqF'
  },
  {
    rank: 2,
    name: 'Áo Polo Cotton Cao Cấp',
    category: 'Bé Trai',
    quantity: 128,
    revenue: 38400000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9XMbVrDRDNWuUj3dDbZ_0OVlYYTjnUQ8Xi2a_1QWoEKm946zP5M6bGYC4p_-bqkYiPMriXuMoNoUF5JAjBKgEBmpG24WAP5bU89Epx-ZpDyHWbUSQyfHkZWCNdPonwrw25SaHInNkEeZru1Xh20jva_qjgl4mjD8SNJATi1_meWnK-Xf4UCGULw28qEIp6Xn9CRzWU0Jd94zjGN9rnzQGrfsNkmCHSGSKyE8l6J3RPfjyISJlMCUsdKeeQBy_sgQRkGz9B2LNS2dn'
  },
  {
    rank: 3,
    name: 'Giày Da Toddler Brown',
    category: 'Giày dép',
    quantity: 94,
    revenue: 32900000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEGTa0TIupMokVM3D7aE7T1GPaJm3Z0XPSu0NVgAXsLIik2EonytcHHSo3-pR9hKJ_8RS0iAkDFec3AWb0cEkO7ca1kPFmEjb4DJSw8JiPjUoUXG9-R7Qqf83fvrVXi6JrqtOkFSCu5AiIHd8E0hqs5QvetACDHm6yDEQuV3qVGXY0wf4bgZsAtZqat9m5jmxYKRGCnHDtG8oeLKARDCu3D-Sa9r7O-xdYuanOsmRSU3-T6DJ9KgddENt1XG74rGMwypxhYaesNv7e'
  },
  {
    rank: 4,
    name: 'Denim Jacket Limited',
    category: 'Bé Trai',
    quantity: 86,
    revenue: 29800000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwrd9kQAPx3h-bE_QsyiMM2tXK_3PtZ_AFHTO9-ndQF2i5EoiKhJhHCb4LiC27eDTSdCzm3cZIIMIYZSwbGCcfoouG1-F55GqfacRf4RgYM_W9KvIVhY_Crabx7oOAq7jhkzTZAxpNoTtAyE2Zt-hQ_lnjYd_SvBaHrBW1KfRzgsEZOQ5oV_tcetgkz_d0x80ksfm0_FWJCzTDIeZpdgUR9CDMg4eru1s3TXN0eABneL7oGqIpmZHxFma9trRXxQI5_3AdQ1W2XTcr'
  }
];

const topCustomers = [
  { initials: 'LN', name: 'Lê Nam', orders: 12, tier: 'VIP Platinum', spent: 12450000 },
  { initials: 'MT', name: 'Minh Tú', orders: 8, tier: 'VIP Gold', spent: 9800000 },
  { initials: 'HA', name: 'Hoàng Anh', orders: 15, tier: 'VIP Platinum', spent: 8620000 }
];

export function AdminAnalyticsPage() {
  const [timeFilter, setTimeFilter] = useState('week');

  const breadcrumbs = [
    { label: 'Báo cáo & Thống kê' }
  ];

  const tableHeaders = [
    { label: 'Hạng' },
    { label: 'Sản phẩm' },
    { label: 'Số lượng' },
    { label: 'Doanh thu', align: 'right' }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const getCustomerInitialColor = (index) => {
    const colors = ['bg-sky-50 text-sky-600 border border-sky-100', 'bg-pink-50 text-pink-600 border border-pink-100', 'bg-emerald-50 text-emerald-600 border border-emerald-100'];
    return colors[index % colors.length];
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <AdminPageHeader
        title="Báo cáo & Thống kê"
        subtitle="Tổng hợp dữ liệu kinh doanh, doanh thu và hành vi khách hàng"
        breadcrumbs={breadcrumbs}
      >
        <AdminButton variant="primary" className="gap-2">
          <span className="material-symbols-outlined text-sm">download</span>
          Xuất dữ liệu
        </AdminButton>
      </AdminPageHeader>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminKPICard
          title="Doanh thu"
          value="1.250.000.000đ"
          icon="payments"
          trend="+12.5%"
          trendVariant="success"
          progress={85}
          color="sky"
        />
        <AdminKPICard
          title="Đơn hàng"
          value="3,842"
          icon="shopping_cart"
          trend="-3.2%"
          trendVariant="danger"
          progress={65}
          color="rose"
        />
        <AdminKPICard
          title="Giá trị TB / đơn"
          value="325.350đ"
          icon="shopping_bag"
          trend="+8.1%"
          trendVariant="success"
          progress={70}
          color="pink"
        />
        <AdminKPICard
          title="Khách hàng mới"
          value="452"
          icon="person_add"
          trend="+24%"
          trendVariant="success"
          progress={75}
          color="emerald"
        />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart: Revenue by Day */}
        <div className="lg:col-span-2">
          <AdminCard className="h-full flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="text-base font-semibold text-slate-800 font-display">Doanh thu theo ngày</h4>
                  <p className="text-xs text-slate-500 font-medium">Thống kê 7 ngày gần nhất</p>
                </div>
                <div className="flex gap-1.5">
                  <AdminButton
                    variant={timeFilter === 'week' ? 'primary' : 'ghost'}
                    className="text-xs h-8 px-3 rounded-lg"
                    onClick={() => setTimeFilter('week')}
                  >
                    Theo tuần
                  </AdminButton>
                  <AdminButton
                    variant={timeFilter === 'month' ? 'primary' : 'ghost'}
                    className="text-xs h-8 px-3 rounded-lg"
                    onClick={() => setTimeFilter('month')}
                  >
                    Theo tháng
                  </AdminButton>
                </div>
              </div>
              <div className="flex items-end justify-between h-64 px-4 relative mt-6">
                {/* Grid Lines */}
                <div className="absolute inset-x-0 top-0 bottom-8 flex flex-col justify-between pointer-events-none opacity-50">
                  <div className="w-full border-t border-slate-100"></div>
                  <div className="w-full border-t border-slate-100"></div>
                  <div className="w-full border-t border-slate-100"></div>
                  <div className="w-full border-t border-slate-100"></div>
                </div>
                {/* Bars */}
                {[
                  { day: 'T2', height: 120 },
                  { day: 'T3', height: 160 },
                  { day: 'T4', height: 140 },
                  { day: 'T5', height: 190 },
                  { day: 'T6', height: 175 },
                  { day: 'T7', height: 220 },
                  { day: 'CN', height: 200, active: true }
                ].map((item) => (
                  <div key={item.day} className="flex flex-col items-center gap-2 group cursor-pointer w-full max-w-[50px] z-10">
                    <div
                      className={`w-8 rounded-t-xl transition-all duration-500 ${
                        item.active ? 'bg-sky-500 shadow-lg shadow-sky-500/20' : 'bg-sky-200 group-hover:bg-sky-500'
                      }`}
                      style={{ height: `${item.height}px` }}
                    />
                    <span className={`text-[10px] font-bold ${item.active ? 'text-sky-600' : 'text-slate-400'}`}>
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AdminCard>
        </div>

        {/* Donut Chart: Revenue by Category */}
        <div>
          <AdminCard className="h-full flex flex-col justify-between">
            <div>
              <h4 className="text-base font-semibold text-slate-800 font-display mb-6">Doanh thu theo danh mục</h4>
              <div className="relative w-44 h-44 mx-auto mb-6 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="88" cy="88" fill="transparent" r="72" stroke="#f1f5f9" strokeWidth="20"></circle>
                  {/* Bé Gái (Pink) - 45% (Dashoffset = 452 * 0.55 = 248.6) */}
                  <circle cx="88" cy="88" fill="transparent" r="72" stroke="#f472b6" strokeDasharray="452" strokeDashoffset="248" strokeLinecap="round" strokeWidth="20"></circle>
                  {/* Bé Trai (Sky) - 35% (Dashoffset = 452 * 0.65 = 293.8, rotate) */}
                  <circle className="rotate-[162deg] origin-center" cx="88" cy="88" fill="transparent" r="72" stroke="#0ea5e9" strokeDasharray="452" strokeDashoffset="294" strokeLinecap="round" strokeWidth="20"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-display">Tổng</span>
                  <span className="text-xl font-bold text-slate-800 font-display">1.2B</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-pink-400"></span>
                    <span className="text-xs font-bold text-slate-600">Bé Gái</span>
                  </div>
                  <span className="text-xs font-bold text-slate-800">45%</span>
                </div>
                <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-sky-500"></span>
                    <span className="text-xs font-bold text-slate-600">Bé Trai</span>
                  </div>
                  <span className="text-xs font-bold text-slate-800">35%</span>
                </div>
                <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    <span className="text-xs font-bold text-slate-600">Giày dép</span>
                  </div>
                  <span className="text-xs font-bold text-slate-800">20%</span>
                </div>
              </div>
            </div>
          </AdminCard>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Best Selling Products */}
        <AdminCard className="!p-0 overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-slate-100">
            <h4 className="text-base font-semibold text-slate-800 font-display">Sản phẩm bán chạy</h4>
            <button className="text-xs font-bold text-sky-500 hover:underline">Xem tất cả</button>
          </div>
          
          <AdminTable headers={tableHeaders}>
            {bestSellingProducts.map((product) => (
              <AdminTableRow key={product.rank}>
                <AdminTableCell className={`font-bold ${product.rank === 1 ? 'text-sky-500' : 'text-slate-400'}`}>
                  0{product.rank}
                </AdminTableCell>
                <AdminTableCell>
                  <div className="flex items-center gap-3">
                    <img className="w-9 h-9 object-cover rounded-xl border border-slate-100 shadow-sm" src={product.image} alt={product.name} />
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{product.name}</p>
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{product.category}</p>
                    </div>
                  </div>
                </AdminTableCell>
                <AdminTableCell className="font-bold text-slate-800">{product.quantity}</AdminTableCell>
                <AdminTableCell align="right" className="font-bold text-sky-500">{formatPrice(product.revenue)}</AdminTableCell>
              </AdminTableRow>
            ))}
          </AdminTable>
        </AdminCard>

        {/* Customer Analysis */}
        <div className="grid grid-cols-1 gap-6">
          {/* New vs Old Customer Pie */}
          <AdminCard className="flex items-center gap-8">
            <div className="w-28 h-28 relative flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="56" cy="56" fill="transparent" r="44" stroke="#e2e8f0" strokeWidth="12"></circle>
                <circle cx="56" cy="56" fill="transparent" r="44" stroke="#0ea5e9" strokeDasharray="276" strokeDashoffset="96" strokeWidth="12" strokeLinecap="round"></circle>
              </svg>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-display">Khách hàng mới</span>
                <p className="text-lg font-bold text-sky-500 font-display">
                  65% <span className="text-[10px] text-emerald-500 font-bold ml-2">↑ +12%</span>
                </p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-display">Khách hàng cũ</span>
                <p className="text-lg font-bold text-slate-800 font-display">
                  35% <span className="text-[10px] text-rose-500 font-bold ml-2">↓ -2%</span>
                </p>
              </div>
            </div>
          </AdminCard>

          {/* Top Customers */}
          <AdminCard>
            <h4 className="text-base font-semibold text-slate-800 font-display mb-4">Top khách hàng chi tiêu</h4>
            <div className="space-y-3">
              {topCustomers.map((customer, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center font-bold text-xs ${getCustomerInitialColor(index)}`}>
                      {customer.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{customer.name}</p>
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        {customer.orders} đơn hàng • {customer.tier}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-slate-800 font-display">{formatPrice(customer.spent)}</span>
                </div>
              ))}
            </div>
          </AdminCard>
        </div>
      </div>
    </div>
  );
}
