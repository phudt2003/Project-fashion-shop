import React, { useState } from 'react';
import {
  AdminPageHeader,
  AdminCard,
  AdminButton,
  AdminInput,
  AdminBadge,
  AdminTable,
  AdminTableRow,
  AdminTableCell,
  AdminPagination,
  AdminKPICard
} from '../../../components/admin';

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

  const breadcrumbs = [
    { label: 'Khách hàng' }
  ];

  const tableHeaders = [
    { label: 'Khách hàng' },
    { label: 'Số điện thoại' },
    { label: 'Email' },
    { label: 'Đơn hàng', align: 'center' },
    { label: 'Tổng chi tiêu', align: 'right' },
    { label: 'Ngày đăng ký' },
    { label: 'Thao tác', align: 'center' }
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

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    return matchesSearch;
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <AdminPageHeader
        title="Quản lý Khách hàng"
        subtitle="Quản lý và xem thông tin chi tiết các khách hàng trong hệ thống"
        breadcrumbs={breadcrumbs}
      >
        <AdminButton variant="primary" className="gap-2">
          <span className="material-symbols-outlined text-[20px]">person_add</span>
          Thêm khách hàng
        </AdminButton>
      </AdminPageHeader>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminKPICard
          title="Tổng khách hàng"
          value="2,481"
          icon="group"
          trend="+12%"
          trendVariant="success"
          progress={70}
          color="sky"
        />
        <AdminKPICard
          title="Khách hàng mới"
          value="142"
          icon="person_pin"
          trend="+5.4%"
          trendVariant="success"
          progress={40}
          color="pink"
        />
        <AdminKPICard
          title="Tỷ lệ quay lại"
          value="64.2%"
          icon="loyalty"
          trend="Ổn định"
          trendVariant="neutral"
          progress={64}
          color="emerald"
        />
        <AdminKPICard
          title="Khách hàng thân thiết"
          value="329"
          icon="star"
          trend="VIP"
          trendVariant="primary"
          progress={85}
          color="sky"
        />
      </div>

      {/* Customer Data Table Container */}
      <AdminCard className="!p-0 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h4 className="text-base font-semibold text-slate-800 font-display">Danh sách chi tiết</h4>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex-1 sm:flex-initial min-w-[200px]">
              <AdminInput
                placeholder="Tìm kiếm khách hàng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <AdminButton variant="outline" className="gap-2 text-xs">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              Bộ lọc
            </AdminButton>
            <AdminButton variant="outline" className="gap-2 text-xs">
              <span className="material-symbols-outlined text-[18px]">download</span>
              Xuất Excel
            </AdminButton>
          </div>
        </div>

        <AdminTable headers={tableHeaders}>
          {currentCustomers.map((customer) => (
            <AdminTableRow
              key={customer.id}
              onMouseEnter={() => setHoveredRow(customer.id)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <AdminTableCell>
                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full object-cover border border-slate-100 shadow-sm"
                    src={customer.avatar}
                    alt={customer.name}
                  />
                  <span className="font-bold text-slate-800">{customer.name}</span>
                </div>
              </AdminTableCell>
              <AdminTableCell className="text-slate-500 font-semibold">{customer.phone}</AdminTableCell>
              <AdminTableCell className="text-slate-500 font-semibold">{customer.email}</AdminTableCell>
              <AdminTableCell align="center" className="font-bold text-slate-800">{customer.orders}</AdminTableCell>
              <AdminTableCell align="right" className="font-bold text-sky-500">{formatPrice(customer.totalSpent)}</AdminTableCell>
              <AdminTableCell className="text-slate-500 font-semibold">{formatDate(customer.joinDate)}</AdminTableCell>
              <AdminTableCell align="center">
                <div className={`flex justify-center gap-1 transition-opacity duration-200 ${hoveredRow === customer.id ? 'opacity-100' : 'opacity-100 sm:opacity-0'}`}>
                  <button className="p-1.5 hover:bg-sky-50 text-slate-400 hover:text-sky-500 rounded-xl transition-all flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                  </button>
                  <button className="p-1.5 hover:bg-sky-50 text-slate-400 hover:text-sky-500 rounded-xl transition-all flex items-center justify-center">
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
          totalItems={filteredCustomers.length}
          itemName="khách hàng"
        />
      </AdminCard>
    </div>
  );
}
