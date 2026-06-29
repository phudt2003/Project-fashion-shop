export function AdminDashboardPage() {
  const currentDate = new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const kpiData = [
    {
      title: 'DOANH THU HÔM NAY',
      value: '₫12.500.000',
      icon: 'payments',
      color: 'primary',
      trend: '+12%',
      progress: '3/4'
    },
    {
      title: 'ĐƠN HÀNG MỚI',
      value: '48',
      icon: 'shopping_bag',
      color: 'secondary',
      trend: '+8%',
      progress: '1/2'
    },
    {
      title: 'TỒN KHO THẤP',
      value: '12',
      icon: 'inventory',
      color: 'error',
      trend: 'Cảnh báo',
      progress: '1/4',
      isWarning: true
    },
    {
      title: 'KHÁCH HÀNG MỚI',
      value: '156',
      icon: 'person_add',
      color: 'tertiary',
      trend: '+24%',
      progress: '2/3'
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
    { id: 'ST-10245', customer: 'Nguyễn An', initials: 'NA', product: 'Set Áo Thun Organic...', total: '₫950.000', status: 'Pending', statusColor: 'yellow' },
    { id: 'ST-10246', customer: 'Trần Hoa', initials: 'TH', product: 'Váy Hoa Nhí Vintage', total: '₫450.000', status: 'Shipping', statusColor: 'blue' },
    { id: 'ST-10247', customer: 'Lê Minh', initials: 'LM', product: 'Yếm Denim Kids Pro', total: '₫760.000', status: 'Completed', statusColor: 'green' },
    { id: 'ST-10248', customer: 'Phạm Tú', initials: 'PT', product: 'Giày Da Tập Đi...', total: '₫1.200.000', status: 'Pending', statusColor: 'yellow' },
    { id: 'ST-10249', customer: 'Đặng Khoa', initials: 'ĐK', product: 'Mũ Bucket + Áo Thun', total: '₫470.000', status: 'Completed', statusColor: 'green' }
  ];

  const getStatusColor = (color) => {
    const colors = {
      yellow: 'bg-yellow-100 text-yellow-700',
      blue: 'bg-blue-100 text-blue-700',
      green: 'bg-green-100 text-green-700'
    };
    return colors[color] || colors.yellow;
  };

  const getInitialColor = (index) => {
    const colors = ['primary', 'secondary', 'tertiary'];
    return colors[index % colors.length];
  };

  return (
    <div>
      {/* Header Section */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="mb-1 font-headline-md text-headline-md text-on-surface">Dashboard Tổng quan</h2>
          <p className="text-body-md text-on-surface-variant">
            Chào mừng trở lại! Đây là tình hình kinh doanh của Fashion Shop hôm nay.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg bg-surface-container-highest px-4 py-2 font-label-caps text-on-surface-variant transition-all hover:bg-surface-container-high">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            Hôm nay: {currentDate}
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-label-caps text-on-primary transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="mb-card_gap grid grid-cols-1 gap-card_gap md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <div
            key={index}
            className="group rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all hover:border-primary/30"
          >
            <div className="mb-4 flex items-start justify-between">
              <div
                className={`rounded-lg bg-${kpi.color}-container/10 p-3 text-${kpi.color} group-hover:animate-float`}
              >
                <span className="material-symbols-outlined">{kpi.icon}</span>
              </div>
              <div
                className={`flex items-center gap-1 rounded-full px-2 py-1 text-[12px] font-bold ${
                  kpi.isWarning
                    ? 'bg-error-container text-error'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {!kpi.isWarning && (
                  <span className="material-symbols-outlined text-[14px]">trending_up</span>
                )}
                {kpi.trend}
              </div>
            </div>
            <p className="mb-1 label-caps text-on-surface-variant">{kpi.title}</p>
            <h3 className="font-display-lg text-display-lg text-on-surface">{kpi.value}</h3>
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-surface-container">
              <div
                className={`h-full rounded-full bg-${kpi.color}`}
                style={{ width: kpi.progress === '3/4' ? '75%' : kpi.progress === '1/2' ? '50%' : kpi.progress === '1/4' ? '25%' : '66%' }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Dashboard Grid Layout */}
      <div className="grid grid-cols-1 gap-card_gap lg:grid-cols-3">
        {/* Revenue Trend Chart */}
        <div className="lg:col-span-2 rounded-xl bg-surface-container-lowest p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h4 className="title-sm text-title-sm text-on-surface">Xu hướng doanh thu (7 ngày qua)</h4>
              <p className="text-body-sm text-on-surface-variant">Tăng trưởng ổn định trong tuần qua</p>
            </div>
            <select className="rounded-lg border-none bg-surface-container-low py-2 pl-4 pr-10 text-body-sm font-medium focus:ring-1 focus:ring-primary">
              <option>7 ngày gần nhất</option>
              <option>30 ngày gần nhất</option>
            </select>
          </div>
          
          {/* Mock Line Chart Area */}
          <div className="relative h-64 w-full flex items-end gap-2 px-2">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              <div className="h-px w-full border-t border-outline-variant"></div>
              <div className="h-px w-full border-t border-outline-variant"></div>
              <div className="h-px w-full border-t border-outline-variant"></div>
              <div className="h-px w-full border-t border-outline-variant"></div>
            </div>
            
            <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 700 200">
              <defs>
                <linearGradient id="gradient" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor="#8236a0"></stop>
                  <stop offset="100%" stopColor="#bd95fd"></stop>
                </linearGradient>
              </defs>
              <path
                d="M0,150 L100,130 L200,160 L300,100 L400,120 L500,60 L600,40 L700,20"
                fill="none"
                stroke="url(#gradient)"
                strokeLinecap="round"
                strokeWidth="4"
              ></path>
            </svg>
            
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <div key={day} className="relative z-10 flex flex-1 flex-col items-center group">
                <div className="mb-1 h-2 w-2 rounded-full bg-primary opacity-0 transition-opacity group-hover:opacity-100"></div>
                <span className="mt-4 text-[10px] text-on-surface-variant">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Best Sellers */}
        <div className="rounded-xl bg-surface-container-lowest p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          <div className="mb-6 flex items-center justify-between">
            <h4 className="title-sm text-title-sm text-on-surface">Top 5 Bán Chạy</h4>
            <button className="text-body-sm font-bold text-primary hover:underline">Tất cả</button>
          </div>
          <div className="space-y-6">
            {bestSellers.map((product, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="h-12 w-12 overflow-hidden rounded-lg bg-surface-container flex-shrink-0">
                  <img
                    className="h-full w-full object-cover"
                    src={product.image}
                    alt={product.name}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-body-md font-bold text-on-surface">{product.name}</p>
                  <p className="text-body-sm text-on-surface-variant">{product.sales} lượt bán</p>
                </div>
                <div className="text-right">
                  <p className="font-data-tabular font-body-md font-bold text-primary">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Orders Table */}
        <div className="lg:col-span-3 overflow-hidden rounded-xl bg-surface-container-lowest shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between border-b border-outline-variant p-8">
            <div>
              <h4 className="title-sm text-title-sm text-on-surface">Đơn hàng mới nhất</h4>
              <p className="text-body-sm text-on-surface-variant">Cập nhật 5 phút trước</p>
            </div>
            <button className="rounded-lg border border-outline-variant px-4 py-2 font-label-caps text-on-surface-variant transition-all hover:bg-surface-container">
              Xem tất cả đơn hàng
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container-low font-label-caps text-on-surface-variant">
                  <th className="px-8 py-4 font-bold">MÃ ĐƠN</th>
                  <th className="px-8 py-4 font-bold">KHÁCH HÀNG</th>
                  <th className="px-8 py-4 font-bold">SẢN PHẨM</th>
                  <th className="px-8 py-4 font-bold">TỔNG TIỀN</th>
                  <th className="px-8 py-4 font-bold">TRẠNG THÁI</th>
                  <th className="px-8 py-4 text-center font-bold">THAO TÁC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {recentOrders.map((order, index) => (
                  <tr key={order.id} className="transition-colors hover:bg-surface-container-lowest">
                    <td className="px-8 py-5 font-data-tabular text-on-surface">{order.id}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full bg-${getInitialColor(index)}/10 font-bold text-sm text-${getInitialColor(index)}`}
                        >
                          {order.initials}
                        </div>
                        <span className="font-body-md font-bold">{order.customer}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-on-surface-variant">{order.product}</td>
                    <td className="px-8 py-5 font-data-tabular font-bold text-on-surface">
                      {order.total}
                    </td>
                    <td className="px-8 py-5">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-[12px] font-bold ${getStatusColor(order.statusColor)}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <button className="rounded-full p-2 text-on-surface-variant transition-all hover:bg-surface-container-high">
                        <span className="material-symbols-outlined">visibility</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

