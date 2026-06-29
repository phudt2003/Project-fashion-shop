import { useState } from 'react';

const mockCustomers = [
  {
    id: 1,
    name: 'Nguyễn Thị Mai',
    phone: '0901234567',
    email: 'mai.nguyen@email.com',
    orders: 12,
    totalSpent: 15420000,
    joinDate: '2023-01-12',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0uMkZFe_AmynGODVRdEEgQmERJRywzvG3hk85okmPm-YMjLL7PVoycIZwRXDL9nUKGmgTmQTc95QWxbovm6tyH4oBewYlWH2sflAIyl6yT3np-wsttYhfgVZ2KAg3-TxrzJfcCTCP31WcDIRyhO8yADTjcmDoWDy3ALDHbI2WIqHX4y6dLCm5ejwV_yjZujFlm5vekB4ABG4jN4RrO8jr7-VUsm0T5w-1rx7DWgJSNjTX_bFyf1QdSArcdMpYeH_FKrAJ_1sSX35d'
  },
  {
    id: 2,
    name: 'Trần Anh Tuấn',
    phone: '0912345678',
    email: 'tuan.tran@email.com',
    orders: 8,
    totalSpent: 9850000,
    joinDate: '2023-02-05',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTiybOB66_K0CZeGj8rylVhAYu5dUbW6M3yFqLMt9wmrVCbF2QiCRav5Yblku_TZ2GKeaeZMjrW5X6gFAvbgyzEqAZQv3iTSU1lqz5gnCHSIqh3gT7yCxh5U4A-iKo5p7mjD6u8XnQ8FOLMQGc8ln_X0joajhlSbG-FIG23BVWcf5XdsoaEfsoLMbVxwaeKUTb8cFkJBcdNypM_p9lL3mgVLzxW2_9N_audAOTd9XmBuJfd2rJkizSG0H_6Vzx_FkfW8cth8GMeAqw'
  },
  {
    id: 3,
    name: 'Lê Kim Chi',
    phone: '0933555111',
    email: 'chi.le@email.com',
    orders: 24,
    totalSpent: 42100000,
    joinDate: '2022-11-20',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgq9rkbCwQRie8Z-MyZCFZ7Y-e7VDali-XoIhMxrYGxRT1IvXY9ybSwxuuyIOfsOrfG9KSzw_XR1hi_1N1avW8F1LWNTddmDWBjqJgFUcFoBXvfBt8GO6HE6mFOSdI4T4nweYcRjBcQ2vqduEobrSkQnmKrknwCTYiWCHdN_GsmaxMiJUiGe0pCuz3Vr5hZZlbMtbf-pdzWHrC2wFJx6mlWi_FbvfRKGRhFiWa_RITpeohUctxC6M60zs1lRq8SHdtz7PPYA27A3JY'
  },
  {
    id: 4,
    name: 'Phạm Hoàng Nam',
    phone: '0988777999',
    email: 'nam.pham@email.com',
    orders: 5,
    totalSpent: 4200000,
    joinDate: '2023-03-15',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2EA-_PNPf1-W2Mbqb1ZzLco3tfDm7LvqA0iXcy2exSl7CyM-amFjJ0QGzjv-VMl5VsDEXnMrv2X2dRtj0P8XIpPvDS7IuEFTvLAlU9L54jPx6irCBqVRzREFYAQvDiYNIkjWTbCFat29d4wKvd9zFGIS0goRBla9xdymIK_EkEHzanhSYNb3WIoP4wub2HlZNiWYlqqwp4SPnBmWC1snQ_XGgXJYN4upnFMPjufuum6sJe2KlSmolfFQ4X13qlbMS3mhWbVQcEOLm'
  },
  {
    id: 5,
    name: 'Võ Thúy Quỳnh',
    phone: '0944888222',
    email: 'quynh.vo@email.com',
    orders: 15,
    totalSpent: 21300000,
    joinDate: '2022-12-08',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBe_xCwu0rhZY9ZOINBW-E17_Mq21fH0quasbxDOar3L6H9rbh15lT-5FWzJTWLzmm9HKX6eEc_CUIpT13HofyLkoWYQ5ooFUqFar6BkHKV4l4DKJ9AVKKm3czcwqzt6aRpDRfghAfpVPqjRAGnfDoUih9R2q2X92VytC-IG5TGKcOb-32W5f7jt5Q22S0d1xCguZOIhGqP14Jt-yzu0Tv50gozs2M6B7xbBw_IUSxCuLY0qmdukzyCn9ggDrk5OjfVNqPeRKp36kE'
  },
  {
    id: 6,
    name: 'Đặng Minh Nhật',
    phone: '0977111444',
    email: 'nhat.dang@email.com',
    orders: 2,
    totalSpent: 1150000,
    joinDate: '2023-04-25',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-Lr9HZmVwuKZw15dqUC9uhoEI2frd-oDwZzIzu49gEpM0_EB4XGKGyy9oK5Ukse__mtj7VjB4aISlRcC830W6rizd94QpjViXzRCA4sGyEIYyrasVoFMB9IQtLK0UTg-a_SuF3JlNGcRL3fXwyHHv9FASTV4wTQQgQw32CzB_-Y9DKopoAQoOpHrsXznWP9p60_2KSOSPNzEluryoHQwlt01aEs623OVRpcbyO4YXIR41Ul1HiMB-LNQT0elr-3_ugl0F-FjOaU0R'
  },
  {
    id: 7,
    name: 'Hoàng Mỹ Linh',
    phone: '0902444666',
    email: 'linh.hoang@email.com',
    orders: 31,
    totalSpent: 56700000,
    joinDate: '2021-08-14',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAo7pJnF8I9_fHGe-AL6vEmu3c8Do_HOvMmDq1CJE5c0j21gz81WZogq36i7QHQvcNG3j76YQgJjtrQHGiQzZybtbt6euDXZBX7wRLuTQLPiPeWkhYwM-UOEggrETbix1vjGF2818OEVYrUjTePQVH6EvAmYbVpwpcJ6uX3cmApN9BjR4wPm8urAGT5LxolxZKgfxvMfj4Fbno1lXT_FCjR098DgqacNMGm1LqkXgzW5001_oNo1hy0jxryKycEwRfSvq4U6zk_JQYv'
  },
  {
    id: 8,
    name: 'Ngô Thế Vinh',
    phone: '0966222333',
    email: 'vinh.ngo@email.com',
    orders: 7,
    totalSpent: 6400000,
    joinDate: '2023-01-02',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBU2XsgaNnQ7jO1JtAA-1MdDfsJeZDpxzfE6fqjvgIfgf4hLmC1MevVUKv0KXPDNDGWRr0cDnKkWzxyk6SpB3fxfz1iHq1qJKiWAbzR2cXctCgaJbwQMUIvDnHbK9Xhggk-2Gbav0tIwzsnPByQr9Kg1RkU6R8ZAuAPAmBpfRWXzHzFFlk_Uyj6sc9fSMw9Jyj3p0QwaDyktWhrjV0ptocrqMvwf6MQuoKQn2YdMr65w_twQS-aGyBU_oH2fNjFJf7SrmPlGcvMR4ng'
  },
  {
    id: 9,
    name: 'Bùi Thảo Vy',
    phone: '0922111000',
    email: 'vy.bui@email.com',
    orders: 19,
    totalSpent: 32900000,
    joinDate: '2022-09-30',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVxiLS2cZCpzI9VJD_PwhnmdaLTT_CJTZpOGfXsuwZ_bA4mzWovUD4t0WSJ1m-KkKYevBR4Txap0mDo6WqBDxmcm-_ltOVU4A3yd24NcLscP7QsA4REwf-MYt8vjZmEOwVdcXimdHJ74UDnL_Y-OqOKY71qDlmxUXuBwkbNOCh8Fp9lybufSdoUkKbrQ7BzPmW8lgR1NCf9pIAnnA3OJWyGLGsoR_r4Hj08BR-bLfcrQYmnQ0VrmXm6XWIn5xqPtuIvRt1XKh2j_BR'
  },
  {
    id: 10,
    name: 'Đỗ Văn Khải',
    phone: '0981999888',
    email: 'khai.do@email.com',
    orders: 4,
    totalSpent: 3100000,
    joinDate: '2023-05-18',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT-CnYcS3D-JAS4G_DAhUF7rhd2bTLUP-rSGo8OcephBQDvSSMjUDbghmcsUxEU6-_utjpwfxQg69-e4t6-ds28bvnIqwsq8b0-CbuIE9yx5FcZzO9C3Rh8c6MpyEhEiTYgZC34Bsa_Lntliw647XqvOseOq0bhwOqrfEchzUi3IhQsNqy7f3BRsUd5HZctF5EcVGCT7IBoaTEwR8tJpW0_6lNnXszypx1nZhregyP6_2b5BKYP1kCNgpCFHzLMfckI3WgnyTwNpGI'
  }
];

export function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    return matchesSearch;
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-display-lg text-display-lg text-on-surface mb-2">Quản lý Khách hàng</h2>
          <p className="text-body-md text-on-surface-variant">Quản lý và xem thông tin chi tiết các khách hàng trong hệ thống</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-on-primary px-6 py-2.5 rounded-lg hover:bg-primary-container hover:shadow-lg transition-all active:scale-95 font-body-md">
          <span className="material-symbols-outlined text-[20px]">person_add</span>
          Thêm khách hàng
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-card_gap mb-8">
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-outline-variant/20">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary-container rounded-lg text-on-primary-container">
              <span className="material-symbols-outlined">group</span>
            </div>
            <span className="text-teal-600 bg-teal-50 text-[11px] font-bold px-2 py-0.5 rounded-full">+12%</span>
          </div>
          <p className="text-on-surface-variant font-label-caps mb-1">TỔNG KHÁCH HÀNG</p>
          <h3 className="font-display-lg text-display-lg text-on-surface">2,481</h3>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-outline-variant/20">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-secondary-container rounded-lg text-on-secondary-container">
              <span className="material-symbols-outlined">person_pin</span>
            </div>
            <span className="text-teal-600 bg-teal-50 text-[11px] font-bold px-2 py-0.5 rounded-full">+5.4%</span>
          </div>
          <p className="text-on-surface-variant font-label-caps mb-1">KHÁCH HÀNG MỚI</p>
          <h3 className="font-display-lg text-display-lg text-on-surface">142</h3>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-outline-variant/20">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-tertiary-container rounded-lg text-on-tertiary-container">
              <span className="material-symbols-outlined">loyalty</span>
            </div>
            <span className="text-on-surface-variant bg-surface-container-high text-[11px] font-bold px-2 py-0.5 rounded-full">Ổn định</span>
          </div>
          <p className="text-on-surface-variant font-label-caps mb-1">TỶ LỆ QUAY LẠI</p>
          <h3 className="font-display-lg text-display-lg text-on-surface">64.2%</h3>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-outline-variant/20">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-error-container rounded-lg text-on-error-container">
              <span className="material-symbols-outlined">star</span>
            </div>
            <span className="text-primary font-bold text-[11px] px-2 py-0.5">VIP</span>
          </div>
          <p className="text-on-surface-variant font-label-caps mb-1">KHÁCH HÀNG THÂN THIẾT</p>
          <h3 className="font-display-lg text-display-lg text-on-surface">329</h3>
        </div>
      </div>

      {/* Customer Data Table Container */}
      <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="p-6 border-b border-outline-variant flex justify-between items-center">
          <h4 className="font-title-sm text-on-surface">Danh sách chi tiết</h4>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-outline-variant rounded-lg text-body-sm hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              Bộ lọc
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-outline-variant rounded-lg text-body-sm hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined text-[18px]">download</span>
              Xuất Excel
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-outline-variant">
          <div className="relative max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
            <input
              className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-body-sm focus:ring-2 focus:ring-primary"
              placeholder="Tìm kiếm khách hàng..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low">
              <tr>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant border-b border-outline-variant">KHÁCH HÀNG</th>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant border-b border-outline-variant">SỐ ĐIỆN THOẠI</th>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant border-b border-outline-variant">EMAIL</th>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant border-b border-outline-variant text-center">ĐƠN HÀNG</th>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant border-b border-outline-variant text-right">TỔNG CHI TIÊU</th>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant border-b border-outline-variant">NGÀY ĐĂNG KÝ</th>
                <th className="px-6 py-4 font-label-caps text-on-surface-variant border-b border-outline-variant text-center">THAO TÁC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {currentCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="hover:bg-surface-container-lowest transition-colors group"
                  onMouseEnter={() => setHoveredRow(customer.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        className="w-10 h-10 rounded-full object-cover"
                        src={customer.avatar}
                        alt={customer.name}
                      />
                      <span className="font-body-md font-semibold text-on-surface">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-body-sm text-on-surface-variant">{customer.phone}</td>
                  <td className="px-6 py-4 text-body-sm text-on-surface-variant">{customer.email}</td>
                  <td className="px-6 py-4 text-center font-data-tabular">{customer.orders}</td>
                  <td className="px-6 py-4 text-right font-data-tabular font-bold text-primary">{formatPrice(customer.totalSpent)}</td>
                  <td className="px-6 py-4 text-body-sm text-on-surface-variant">{formatDate(customer.joinDate)}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button className="p-1.5 hover:bg-primary-container hover:text-on-primary-container rounded-lg transition-colors text-on-surface-variant">
                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                      </button>
                      <button className="p-1.5 hover:bg-primary-container hover:text-on-primary-container rounded-lg transition-colors text-on-surface-variant">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-outline-variant flex justify-between items-center bg-surface-container-low">
          <p className="text-body-sm text-on-surface-variant">
            Hiển thị {startIndex + 1} - {Math.min(endIndex, filteredCustomers.length)} của {filteredCustomers.length} khách hàng
          </p>
          <div className="flex items-center gap-1">
            <button
              className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors disabled:opacity-30"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            {[1, 2, 3].map(page => (
              <button
                key={page}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-body-sm font-bold transition-colors ${
                  currentPage === page
                    ? 'bg-primary text-on-primary'
                    : 'text-on-surface-variant hover:bg-surface-container-low'
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            {totalPages > 3 && <span className="px-1 text-on-surface-variant">...</span>}
            {totalPages > 3 && (
              <button
                className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low rounded-lg text-body-sm transition-colors"
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </button>
            )}
            <button
              className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors disabled:opacity-30"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-container_padding text-center text-on-surface-variant text-body-sm border-t border-outline-variant bg-surface-container-lowest mt-8">
        © 2024 KidsFashion Retail Management System. Tất cả quyền được bảo lưu.
      </footer>
    </div>
  );
}

