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

const mockReviews = [
  {
    id: 1,
    customerName: 'Nguyễn Lan Anh',
    initials: 'LA',
    rating: 5,
    content: 'Vải mềm mịn, màu sắc đúng như hình. Bé nhà mình rất thích mặc...',
    product: 'Đầm hoa nhí',
    status: 'approved',
    statusVariant: 'success',
    statusText: 'ĐÃ DUYỆT',
    hasReply: true,
    reply: 'Cảm ơn bạn đã tin tưởng Alexandria Kids! Chúc bé luôn xinh xắn...',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC43z6rhZ3luROoA1iLFw-C2c5p3KLo_v039YWvqEVl82KpJH13YlNnwvZvF_88onxQKZg-d6-8a4m7QFJ0_-pK4oRYaRfDO4420zlWOFYW8Bta9DwpqDxFmXkHNzkoE-U9VU-vqSb4oKsxo5eOYNSO47TvD6ZmHD37W8lHLNpHjoufm-GBuVjEfOgfDoQz-ZOWJr28vyM2xMZ9eUytwaR53QGFTTtYtSnBWS-DRxh4IYKQptelhOxQPftGwztbVu-JXDXnIHbaNK4r',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCgSBxDmyic5F80puRKBf5iJPET6yPH47nv2xSLYqQw_CIvORFMHIcvwIZe6EqoGOekog2vM4oxDaeT4HK9OhHMT1-Ny2glV6DTCW7GbvzZbBnCFLob6VirC_AkmFgGvCgbGZXZ9CX6GvJR2pZOp9fMxItYRSAC4-EHDp26KUPjDs7AwMKphJEXurRlehq56BdomjUVCOGmIS-9cBrhu4_QA3YDbSRMsZicDpYvVzgrKSfskx3OUZ8gQgoNoORM41FEkK6FsFWenP9v'
    ],
    bgColor: 'bg-white'
  },
  {
    id: 2,
    customerName: 'Trần Minh Hiếu',
    initials: 'MH',
    rating: 2,
    content: 'Giày đế hơi cứng, đường keo dán chưa được khéo lắm. Giao hàng hơi lâu...',
    product: 'Giày thể thao',
    status: 'pending',
    statusVariant: 'warning',
    statusText: '⏳ CHỜ DUYỆT',
    hasReply: false,
    images: [],
    bgColor: 'bg-amber-50/30'
  },
  {
    id: 3,
    customerName: 'Phạm Thị Mai',
    initials: 'PM',
    rating: 1,
    content: 'Màu khác hình nhiều, shop giao nhầm size. Đã nhắn tin nhưng chưa thấy ai trả lời lời để đổi hàng...',
    product: 'Bộ short bé trai',
    status: 'priority',
    statusVariant: 'danger',
    statusText: '⚠ ƯU TIÊN',
    hasReply: false,
    images: [],
    bgColor: 'bg-rose-50/30'
  },
  {
    id: 4,
    customerName: 'Lê Thu Thảo',
    initials: 'TT',
    rating: 5,
    content: 'Dép nhẹ, bé đi thoải mái, rất ôm chân. Sẽ quay lại ủng hộ shop lần sau.',
    product: 'Dép tổ ong',
    status: 'approved',
    statusVariant: 'success',
    statusText: 'ĐÃ DUYỆT',
    hasReply: false,
    images: [],
    bgColor: 'bg-white'
  }
];

const ratingDistribution = [
  { stars: 5, count: 948, percentage: 74 },
  { stars: 4, count: 231, percentage: 18 },
  { stars: 3, count: 64, percentage: 5 },
  { stars: 2, count: 26, percentage: 2 },
  { stars: 1, count: 15, percentage: 1 }
];

export function AdminReviewsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const breadcrumbs = [
    { label: 'Đánh giá' }
  ];

  const tableHeaders = [
    { label: 'Khách hàng / Nội dung' },
    { label: 'Sản phẩm' },
    { label: 'Trạng thái' },
    { label: 'Thao tác', align: 'right' }
  ];

  const getInitialsColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-sky-50 text-sky-600 border border-sky-100';
      case 'pending':
        return 'bg-amber-50 text-amber-600 border border-amber-100';
      case 'priority':
        return 'bg-rose-50 text-rose-600 border border-rose-100';
      default:
        return 'bg-slate-50 text-slate-600 border border-slate-100';
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className="material-symbols-outlined text-[16px]"
            style={{ fontVariationSettings: `'FILL' ${star <= rating ? 1 : 0}` }}
          >
            star
          </span>
        ))}
      </div>
    );
  };

  const filteredReviews = mockReviews.filter(review => {
    const matchesSearch = review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          review.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilter = true;
    if (activeFilter === 'pending') matchesFilter = review.status === 'pending';
    if (activeFilter === 'low') matchesFilter = review.rating <= 2;
    if (activeFilter === 'images') matchesFilter = review.images.length > 0;
    if (activeFilter === 'unreplied') matchesFilter = !review.hasReply;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <AdminPageHeader
        title="Quản lý Đánh giá"
        subtitle="Theo dõi, duyệt và phản hồi các đánh giá từ khách hàng"
        breadcrumbs={breadcrumbs}
      >
        <AdminButton variant="outline" className="gap-2">
          <span className="material-symbols-outlined text-[18px]">file_download</span>
          Xuất báo cáo
        </AdminButton>
        <AdminButton variant="primary" className="gap-2">
          <span className="material-symbols-outlined text-[18px]">settings_suggest</span>
          Cài đặt duyệt
        </AdminButton>
      </AdminPageHeader>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminKPICard
          title="Tổng đánh giá"
          value="1,284"
          icon="rate_review"
          trend="↑ +34 tuần này"
          trendVariant="success"
          progress={75}
          color="sky"
        />
        <AdminKPICard
          title="Điểm trung bình"
          value="4.7 ★"
          icon="star"
          trend="Trên 1.284 đánh giá"
          trendVariant="success"
          progress={94}
          color="pink"
        />
        <AdminKPICard
          title="Chờ duyệt"
          value="12"
          icon="pending"
          trend="Cần xử lý"
          trendVariant="warning"
          progress={30}
          color="rose"
        />
        <AdminKPICard
          title="Đánh giá 1–2 sao"
          value="8"
          icon="priority_high"
          trend="Cần phản hồi"
          trendVariant="danger"
          progress={10}
          color="rose"
        />
      </section>

      {/* Main Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Statistics Distribution */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          <AdminCard>
            <h3 className="text-base font-semibold text-slate-800 font-display mb-4">Tổng quan rating</h3>
            <div className="text-center mb-6">
              <span className="text-4xl font-bold text-slate-800 font-display">4.7</span>
              <div className="flex justify-center gap-0.5 my-2 text-amber-400">
                {[1, 2, 3, 4].map((i) => (
                  <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                ))}
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
                  star_half
                </span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-display">1,284 Đánh giá</p>
            </div>
            
            <div className="flex flex-col gap-3">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <span className="w-10 text-xs font-bold text-slate-500">{item.stars} sao</span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                  <span className="w-10 text-xs text-right font-bold text-slate-500">{item.count}</span>
                </div>
              ))}
            </div>
          </AdminCard>

          {/* Tips Card */}
          <div className="bg-sky-500 p-6 rounded-[20px] text-white relative overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="relative z-10">
              <h4 className="font-bold text-base mb-1 font-display">Mẹo quản lý</h4>
              <p className="text-xs opacity-90 leading-relaxed mb-4">Phản hồi các đánh giá 1-2 sao trong vòng 4h giúp tăng 15% sự hài lòng của khách hàng.</p>
              <button className="bg-white/20 hover:bg-white/30 transition-colors text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-xl font-display">
                Xem thêm
              </button>
            </div>
            <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-7xl opacity-10 rotate-12">lightbulb</span>
          </div>
        </aside>

        {/* Right Column: Filter and Review List */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          {/* Filter Card */}
          <AdminCard className="p-4">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <AdminButton
                variant={activeFilter === 'all' ? 'primary' : 'ghost'}
                className="text-xs h-8 rounded-lg"
                onClick={() => setActiveFilter('all')}
              >
                Tất cả
              </AdminButton>
              <AdminButton
                variant={activeFilter === 'pending' ? 'primary' : 'ghost'}
                className="text-xs h-8 rounded-lg"
                onClick={() => setActiveFilter('pending')}
              >
                Chờ duyệt
              </AdminButton>
              <AdminButton
                variant={activeFilter === 'low' ? 'primary' : 'ghost'}
                className="text-xs h-8 rounded-lg"
                onClick={() => setActiveFilter('low')}
              >
                1-2 sao
              </AdminButton>
              <AdminButton
                variant={activeFilter === 'images' ? 'primary' : 'ghost'}
                className="text-xs h-8 rounded-lg"
                onClick={() => setActiveFilter('images')}
              >
                Có ảnh
              </AdminButton>
              <AdminButton
                variant={activeFilter === 'unreplied' ? 'primary' : 'ghost'}
                className="text-xs h-8 rounded-lg"
                onClick={() => setActiveFilter('unreplied')}
              >
                Chưa trả lời
              </AdminButton>
            </div>
            
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex-1 min-w-[200px]">
                <AdminInput
                  placeholder="Tìm kiếm đánh giá, khách hàng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-36">
                <AdminSelect>
                  <option>Danh mục</option>
                </AdminSelect>
              </div>
              <div className="w-32">
                <AdminSelect>
                  <option>Số sao</option>
                </AdminSelect>
              </div>
              <div className="w-36">
                <AdminSelect>
                  <option>Trạng thái</option>
                </AdminSelect>
              </div>
            </div>
          </AdminCard>

          {/* Review List Card */}
          <AdminCard className="!p-0 overflow-hidden">
            <AdminTable headers={tableHeaders}>
              {filteredReviews.map((review) => (
                <AdminTableRow
                  key={review.id}
                  className={`${review.bgColor} ${review.status === 'priority' ? 'border-l-4 border-rose-500' : ''}`}
                >
                  <AdminTableCell className="max-w-sm">
                    <div className="flex items-start gap-4">
                      <div className={`h-10 w-10 rounded-xl ${getInitialsColor(review.status)} flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                        {review.initials}
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className={`font-bold text-slate-800 text-sm ${review.status === 'priority' ? 'text-rose-600' : ''}`}>{review.customerName}</span>
                          {renderStars(review.rating)}
                        </div>
                        <p className="text-xs font-medium text-slate-500 italic mb-3 leading-relaxed">"{review.content}"</p>
                        {review.images.length > 0 && (
                          <div className="flex gap-2 mb-3">
                            {review.images.map((img, idx) => (
                              <img key={idx} className="w-14 h-14 rounded-xl object-cover border border-slate-100" src={img} alt="Review" />
                            ))}
                          </div>
                        )}
                        {review.hasReply && (
                          <div className="bg-slate-50 p-3 rounded-xl border-l-4 border-sky-500 mt-2">
                            <p className="text-[10px] font-bold text-sky-500 mb-1 uppercase tracking-wider font-display">Shop phản hồi:</p>
                            <p className="text-xs text-slate-500 font-medium italic">"{review.reply}"</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </AdminTableCell>
                  <AdminTableCell>
                    <span className="text-xs font-bold px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-slate-600">{review.product}</span>
                  </AdminTableCell>
                  <AdminTableCell>
                    <AdminBadge variant={review.statusVariant} dot>
                      {review.statusText}
                    </AdminBadge>
                  </AdminTableCell>
                  <AdminTableCell align="right">
                    {review.status === 'pending' ? (
                      <div className="flex flex-col sm:flex-row justify-end gap-2">
                        <AdminButton variant="primary" className="text-xs h-8 px-3 rounded-lg">
                          Duyệt
                        </AdminButton>
                        <AdminButton variant="outline" className="text-xs h-8 px-3 rounded-lg">
                          Phản hồi
                        </AdminButton>
                      </div>
                    ) : review.status === 'priority' ? (
                      <div className="flex flex-col sm:flex-row justify-end gap-2">
                        <AdminButton variant="danger" className="text-xs h-8 px-3 rounded-lg">
                          Phản hồi ngay
                        </AdminButton>
                      </div>
                    ) : (
                      <div className="flex justify-end gap-1.5">
                        {review.hasReply ? (
                          <>
                            <button className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center" title="Ẩn">
                              <span className="material-symbols-outlined text-[20px]">visibility_off</span>
                            </button>
                            <button className="p-1.5 hover:bg-rose-50 rounded-xl text-rose-500 transition-colors flex items-center justify-center" title="Xóa">
                              <span className="material-symbols-outlined text-[20px]">delete</span>
                            </button>
                          </>
                        ) : (
                          <>
                            <AdminButton variant="primary" className="text-xs h-8 px-3 rounded-lg">
                              Phản hồi
                            </AdminButton>
                          </>
                        )}
                      </div>
                    )}
                  </AdminTableCell>
                </AdminTableRow>
              ))}
            </AdminTable>

            {/* Pagination */}
            <AdminPagination
              currentPage={currentPage}
              totalPages={3}
              onPageChange={setCurrentPage}
              startIndex={0}
              endIndex={10}
              totalItems={1284}
              itemName="đánh giá"
            />
          </AdminCard>
        </section>
      </div>
    </div>
  );
}
