import { useState } from 'react';

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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  return (
    <div>
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-6">
          <h1 className="font-headline text-2xl font-bold text-primary">Báo cáo & Thống kê</h1>
          <div className="h-8 w-[1px] bg-outline-variant/30"></div>
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-sm">calendar_today</span>
            <span className="font-label text-sm uppercase tracking-widest">Tháng 10, 2023</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-medium hover:opacity-90 transition-all cursor-pointer active:scale-95 shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-sm">download</span>
            Xuất dữ liệu
          </button>
          <div className="flex gap-2">
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors cursor-pointer">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors cursor-pointer">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
        </div>
      </header>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Revenue */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col justify-between shadow-sm border border-outline-variant/10">
          <div>
            <div className="flex justify-between items-start mb-1">
              <span className="font-label text-sm uppercase tracking-wider text-on-surface-variant">Doanh thu</span>
              <span className="text-tertiary font-bold text-sm flex items-center">
                <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                +12.5%
              </span>
            </div>
            <h3 className="font-headline text-2xl font-bold">1.250.000.000đ</h3>
          </div>
          <div className="mt-4 flex items-end h-10 gap-1">
            <div className="w-full bg-primary/20 h-4 rounded-md"></div>
            <div className="w-full bg-primary/20 h-6 rounded-md"></div>
            <div className="w-full bg-primary/20 h-3 rounded-md"></div>
            <div className="w-full bg-primary/20 h-8 rounded-md"></div>
            <div className="w-full bg-primary h-10 rounded-md"></div>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col justify-between shadow-sm border border-outline-variant/10">
          <div>
            <div className="flex justify-between items-start mb-1">
              <span className="font-label text-sm uppercase tracking-wider text-on-surface-variant">Đơn hàng</span>
              <span className="text-error font-bold text-sm flex items-center">
                <span className="material-symbols-outlined text-sm mr-1">trending_down</span>
                -3.2%
              </span>
            </div>
            <h3 className="font-headline text-2xl font-bold">3,842</h3>
          </div>
          <div className="mt-4 flex items-end h-10 gap-1">
            <div className="w-full bg-primary/10 h-8 rounded-md"></div>
            <div className="w-full bg-primary/10 h-5 rounded-md"></div>
            <div className="w-full bg-primary/10 h-7 rounded-md"></div>
            <div className="w-full bg-primary/10 h-10 rounded-md"></div>
            <div className="w-full bg-primary h-6 rounded-md"></div>
          </div>
        </div>

        {/* AOV */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col justify-between shadow-sm border border-outline-variant/10">
          <div>
            <div className="flex justify-between items-start mb-1">
              <span className="font-label text-sm uppercase tracking-wider text-on-surface-variant">Giá trị TB/đơn</span>
              <span className="text-tertiary font-bold text-sm flex items-center">
                <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                +8.1%
              </span>
            </div>
            <h3 className="font-headline text-2xl font-bold">325.350đ</h3>
          </div>
          <div className="mt-4 flex items-end h-10 gap-1">
            <div className="w-full bg-primary/20 h-3 rounded-md"></div>
            <div className="w-full bg-primary/20 h-4 rounded-md"></div>
            <div className="w-full bg-primary/20 h-6 rounded-md"></div>
            <div className="w-full bg-primary/20 h-9 rounded-md"></div>
            <div className="w-full bg-primary h-8 rounded-md"></div>
          </div>
        </div>

        {/* New Customers */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col justify-between shadow-sm border border-outline-variant/10">
          <div>
            <div className="flex justify-between items-start mb-1">
              <span className="font-label text-sm uppercase tracking-wider text-on-surface-variant">Khách hàng mới</span>
              <span className="text-tertiary font-bold text-sm flex items-center">
                <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                +24%
              </span>
            </div>
            <h3 className="font-headline text-2xl font-bold">452</h3>
          </div>
          <div className="mt-4 flex items-end h-10 gap-1">
            <div className="w-full bg-primary/20 h-5 rounded-md"></div>
            <div className="w-full bg-primary/20 h-8 rounded-md"></div>
            <div className="w-full bg-primary/20 h-4 rounded-md"></div>
            <div className="w-full bg-primary/20 h-6 rounded-md"></div>
            <div className="w-full bg-primary h-10 rounded-md"></div>
          </div>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Bar Chart: Revenue by Day */}
        <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-outline-variant/10">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h4 className="font-headline text-xl font-bold">Doanh thu theo ngày</h4>
              <p className="text-on-surface-variant text-sm font-body">Thống kê 7 ngày gần nhất</p>
            </div>
            <div className="flex gap-2">
              <button
                className={`px-3 py-1 rounded-lg text-sm font-label ${
                  timeFilter === 'week' ? 'bg-primary-container/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container'
                }`}
                onClick={() => setTimeFilter('week')}
              >
                Theo tuần
              </button>
              <button
                className={`px-3 py-1 rounded-lg text-sm font-label ${
                  timeFilter === 'month' ? 'bg-primary-container/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container'
                }`}
                onClick={() => setTimeFilter('month')}
              >
                Theo tháng
              </button>
            </div>
          </div>
          <div className="flex items-end justify-between h-64 px-4 relative">
            {/* Grid Lines */}
            <div className="absolute inset-x-0 top-0 bottom-8 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="w-full border-t border-outline"></div>
              <div className="w-full border-t border-outline"></div>
              <div className="w-full border-t border-outline"></div>
              <div className="w-full border-t border-outline"></div>
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
            ].map((item, index) => (
              <div key={item.day} className="flex flex-col items-center gap-2 group cursor-pointer w-full max-w-[50px]">
                <div
                  className={`w-8 rounded-t-lg transition-all duration-500 ${
                    item.active ? 'bg-primary shadow-xl shadow-primary/20' : 'bg-primary/20 group-hover:bg-primary'
                  }`}
                  style={{ height: `${item.height}px` }}
                ></div>
                <span className={`font-label text-[10px] ${item.active ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Donut Chart: Revenue by Category */}
        <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-outline-variant/10">
          <h4 className="font-headline text-xl font-bold mb-8">Doanh thu theo danh mục</h4>
          <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="96" cy="96" fill="transparent" r="80" stroke="#e9e8e9" strokeWidth="24"></circle>
              <circle cx="96" cy="96" fill="transparent" r="80" stroke="#094cb2" strokeDasharray="502" strokeDashoffset="276" strokeLinecap="round" strokeWidth="24"></circle>
              <circle className="rotate-[162deg] origin-center" cx="96" cy="96" fill="transparent" r="80" stroke="#6d5e00" strokeDasharray="502" strokeDashoffset="350" strokeLinecap="round" strokeWidth="24"></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-sm font-label text-on-surface-variant">Tổng</span>
              <span className="text-xl font-bold">1.2B</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                <span className="text-sm font-body">Bé Gái</span>
              </div>
              <span className="font-label text-sm font-bold">45%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-tertiary"></span>
                <span className="text-sm font-body">Bé Trai</span>
              </div>
              <span className="font-label text-sm font-bold">35%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-outline"></span>
                <span className="text-sm font-body">Giày dép</span>
              </div>
              <span className="font-label text-sm font-bold">20%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
        {/* Best Selling Products */}
        <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-outline-variant/10">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-headline text-xl font-bold">Sản phẩm bán chạy</h4>
            <a className="text-primary text-sm font-label hover:underline cursor-pointer" href="#">
              Xem tất cả
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant border-b border-outline-variant/10">
                  <th className="pb-3 font-medium">Hạng</th>
                  <th className="pb-3 font-medium">Sản phẩm</th>
                  <th className="pb-3 font-medium">Số lượng</th>
                  <th className="pb-3 text-right font-medium">Doanh thu</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {bestSellingProducts.map((product) => (
                  <tr key={product.rank} className="border-b border-outline-variant/5 hover:bg-surface-container-low/50 transition-colors">
                    <td className={`py-4 font-bold ${product.rank === 1 ? 'text-primary' : 'text-on-surface-variant'}`}>
                      0{product.rank}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-surface-container">
                          <img className="w-full h-full object-cover rounded-lg" src={product.image} alt={product.name} />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-[10px] text-on-surface-variant">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">{product.quantity}</td>
                    <td className="py-4 text-right font-bold">{formatPrice(product.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Analysis */}
        <div className="space-y-8">
          {/* New vs Old Customer Pie */}
          <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-outline-variant/10">
            <h4 className="font-headline text-xl font-bold mb-6">Phân tích khách hàng</h4>
            <div className="flex items-center gap-8">
              <div className="w-32 h-32 relative">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" fill="transparent" r="56" stroke="#094cb2" strokeDasharray="351" strokeDashoffset="120" strokeWidth="16"></circle>
                  <circle className="rotate-[230deg] origin-center" cx="64" cy="64" fill="transparent" r="56" stroke="#c3c6d5" strokeDasharray="351" strokeDashoffset="231" strokeWidth="16"></circle>
                </svg>
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex flex-col">
                  <span className="text-sm font-label text-on-surface-variant uppercase tracking-wider">Khách hàng mới</span>
                  <span className="text-xl font-bold text-primary">
                    65% <span className="text-[10px] text-tertiary font-normal ml-2">+12%</span>
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-label text-on-surface-variant uppercase tracking-wider">Khách hàng cũ</span>
                  <span className="text-xl font-bold">
                    35% <span className="text-[10px] text-error font-normal ml-2">-2%</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Customers */}
          <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-outline-variant/10">
            <h4 className="font-headline text-lg font-bold mb-4">Top khách hàng chi tiêu</h4>
            <div className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-surface-container-low transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center font-bold ${
                        index === 0 ? 'bg-primary/10 text-primary' : index === 1 ? 'bg-tertiary/10 text-tertiary' : 'bg-outline-variant/20 text-on-surface-variant'
                      }`}
                    >
                      {customer.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{customer.name}</p>
                      <p className="text-[10px] text-on-surface-variant">
                        {customer.orders} đơn hàng • {customer.tier}
                      </p>
                    </div>
                  </div>
                  <span className="font-label text-sm font-bold">{formatPrice(customer.spent)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

