import { useState } from 'react';

const mockReviews = [
  {
    id: 1,
    customerName: 'Nguyễn Lan Anh',
    initials: 'LA',
    rating: 5,
    content: 'Vải mềm mịn, màu sắc đúng như hình. Bé nhà mình rất thích mặc...',
    product: 'Đầm hoa nhí',
    status: 'approved',
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
    hasReply: false,
    images: [],
    bgColor: 'bg-[#FFF9E6]'
  },
  {
    id: 3,
    customerName: 'Phạm Thị Mai',
    initials: 'PM',
    rating: 1,
    content: 'Màu khác hình nhiều, shop giao nhầm size. Đã nhắn tin nhưng chưa thấy ai trả lời lời để đổi hàng...',
    product: 'Bộ short bé trai',
    status: 'priority',
    hasReply: false,
    images: [],
    bgColor: 'bg-[#FFF0F0]'
  },
  {
    id: 4,
    customerName: 'Lê Thu Thảo',
    initials: 'TT',
    rating: 5,
    content: 'Dép nhẹ, bé đi thoải mái, rất ôm chân. Sẽ quay lại ủng hộ shop lần sau.',
    product: 'Dép tổ ong',
    status: 'approved',
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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className="text-[10px] font-bold px-2.5 py-1 bg-green-100 text-green-700 rounded-full">ĐÃ DUYỆT</span>;
      case 'pending':
        return <span className="text-[10px] font-bold px-2.5 py-1 bg-tertiary-container/30 text-tertiary rounded-full whitespace-nowrap">⏳ CHỜ DUYỆT</span>;
      case 'priority':
        return <span className="text-[10px] font-bold px-2.5 py-1 bg-error text-white rounded-full whitespace-nowrap">⚠ 1 SAO — ƯU TIÊN</span>;
      default:
        return null;
    }
  };

  const getInitialsColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-brand-purple/10 text-brand-purple';
      case 'pending':
        return 'bg-tertiary/10 text-tertiary';
      case 'priority':
        return 'bg-error/10 text-error';
      default:
        return 'bg-brand-purple/10 text-brand-purple';
    }
  };

  const renderStars = (rating, filled = true) => {
    return (
      <div className={`flex ${filled ? 'text-tertiary-fixed-dim' : 'text-error'} scale-75 origin-left`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className="material-symbols-outlined"
            style={{ fontVariationSettings: 'FILL 1' }}
          >
            {star <= rating ? 'star' : 'star'}
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
    <div>
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="font-headline text-3xl font-black text-primary">Quản lý Đánh giá</h1>
        <div className="flex items-center gap-3">
          <button className="px-6 py-2.5 rounded-full border border-primary text-primary font-medium hover:bg-primary/10 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined">file_download</span>
            Xuất báo cáo
          </button>
          <button className="px-6 py-2.5 rounded-full bg-primary text-white font-medium hover:opacity-90 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined">settings_suggest</span>
            Cài đặt duyệt
          </button>
        </div>
      </header>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col gap-2 border border-outline-variant/10">
          <span className="text-on-surface-variant font-label text-xs uppercase tracking-wider">Tổng đánh giá</span>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-on-surface leading-none">1,284</span>
            <span className="text-xs font-semibold text-primary mb-1">↑ +34 tuần này</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col gap-2 border border-outline-variant/10">
          <span className="text-on-surface-variant font-label text-xs uppercase tracking-wider">Điểm trung bình</span>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-on-surface leading-none">4.7 ★</span>
            <span className="text-xs font-medium text-on-surface-variant mb-1">Trên 1.284 đánh giá</span>
          </div>
        </div>
        <div className="bg-tertiary-container/10 p-6 rounded-2xl flex flex-col gap-2 border border-tertiary-container/20">
          <span className="text-tertiary font-label text-xs uppercase tracking-wider">Chờ duyệt</span>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-tertiary leading-none">12</span>
            <span className="px-2 py-0.5 rounded-full bg-tertiary-container/30 text-[10px] font-bold text-tertiary mb-1">Cần xử lý</span>
          </div>
        </div>
        <div className="bg-error-container/10 p-6 rounded-2xl flex flex-col gap-2 border border-error-container/20">
          <span className="text-error font-label text-xs uppercase tracking-wider">Đánh giá 1–2 sao</span>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-error leading-none">8</span>
            <span className="px-2 py-0.5 rounded-full bg-error-container/30 text-[10px] font-bold text-error mb-1">Cần phản hồi</span>
          </div>
        </div>
      </section>

      {/* Main Dashboard Layout */}
      <div className="grid grid-cols-12 gap-8 items-start">
        {/* Left Column: Statistics Distribution */}
        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6">
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/10">
            <h3 className="font-headline text-lg font-bold mb-4">Tổng quan rating</h3>
            <div className="text-center mb-6">
              <span className="text-5xl font-black text-on-surface">4.7</span>
              <div className="flex justify-center gap-1 my-2">
                {[1, 2, 3, 4].map((i) => (
                  <span key={i} className="material-symbols-outlined text-tertiary-fixed-dim" style={{ fontVariationSettings: 'FILL 1' }}>
                    star
                  </span>
                ))}
                <span className="material-symbols-outlined text-tertiary-fixed-dim" style={{ fontVariationSettings: 'FILL 0.5' }}>
                  star_half
                </span>
              </div>
              <p className="text-xs text-on-surface-variant font-label uppercase tracking-widest">1,284 Đánh giá</p>
            </div>
            <div className="flex flex-col gap-3">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <span className="w-10 text-[11px] font-bold text-on-surface-variant">{item.stars} sao</span>
                  <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                  <span className="w-10 text-[11px] text-right font-medium text-on-surface-variant">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips Card */}
          <div className="bg-primary p-6 rounded-3xl text-white relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-bold text-lg mb-1">Mẹo quản lý</h4>
              <p className="text-xs opacity-80 leading-relaxed mb-4">Phản hồi các đánh giá 1-2 sao trong vòng 4h giúp tăng 15% sự hài lòng của khách hàng.</p>
              <button className="bg-white/20 hover:bg-white/30 transition-colors text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                Xem thêm
              </button>
            </div>
            <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-8xl opacity-10 rotate-12">lightbulb</span>
          </div>
        </aside>

        {/* Right Column: Filter and Review List */}
        <section className="col-span-12 lg:col-span-9 flex flex-col gap-6">
          {/* Filter Card */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/10 shadow-sm">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <button
                className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                  activeFilter === 'all' ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface-variant hover:bg-tertiary-container/20'
                }`}
                onClick={() => setActiveFilter('all')}
              >
                Tất cả
              </button>
              <button
                className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                  activeFilter === 'pending' ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface-variant hover:bg-tertiary-container/20'
                }`}
                onClick={() => setActiveFilter('pending')}
              >
                Chờ duyệt
              </button>
              <button
                className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                  activeFilter === 'low' ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface-variant hover:bg-error-container/20'
                }`}
                onClick={() => setActiveFilter('low')}
              >
                1-2 sao
              </button>
              <button
                className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                  activeFilter === 'images' ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface-variant hover:bg-primary-container/20'
                }`}
                onClick={() => setActiveFilter('images')}
              >
                Có ảnh
              </button>
              <button
                className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                  activeFilter === 'unreplied' ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface-variant hover:bg-secondary-container/20'
                }`}
                onClick={() => setActiveFilter('unreplied')}
              >
                Chưa trả lời
              </button>
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[200px] relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
                <input
                  className="w-full bg-surface-container-low border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary"
                  placeholder="Tìm kiếm đánh giá, khách hàng..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select className="bg-surface-container-low border-none rounded-xl text-xs font-bold py-2 px-4 focus:ring-2 focus:ring-primary">
                <option>Danh mục</option>
              </select>
              <select className="bg-surface-container-low border-none rounded-xl text-xs font-bold py-2 px-4 focus:ring-2 focus:ring-primary">
                <option>Số sao</option>
              </select>
              <select className="bg-surface-container-low border-none rounded-xl text-xs font-bold py-2 px-4 focus:ring-2 focus:ring-primary">
                <option>Trạng thái</option>
              </select>
              <select className="bg-surface-container-low border-none rounded-xl text-xs font-bold py-2 px-4 focus:ring-2 focus:ring-primary">
                <option>Có ảnh</option>
              </select>
              <select className="bg-surface-container-low border-none rounded-xl text-xs font-bold py-2 px-4 focus:ring-2 focus:ring-primary">
                <option>Sắp xếp</option>
              </select>
            </div>
          </div>

          {/* Review List Card */}
          <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/10 shadow-sm overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant/10">
                  <th className="px-6 py-4 text-left text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Khách hàng / Nội dung</th>
                  <th className="px-6 py-4 text-left text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Sản phẩm</th>
                  <th className="px-6 py-4 text-left text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Trạng thái</th>
                  <th className="px-6 py-4 text-right text-[10px] font-label uppercase tracking-widest text-on-surface-variant">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {filteredReviews.map((review) => (
                  <tr
                    key={review.id}
                    className={`${review.bgColor} hover:brightness-95 transition-colors ${review.status === 'priority' ? 'border-l-4 border-error' : ''}`}
                  >
                    <td className="px-6 py-6 max-w-sm">
                      <div className="flex items-start gap-4">
                        <div className={`h-10 w-10 rounded-full ${getInitialsColor(review.status)} flex items-center justify-center font-bold text-xs`}>
                          {review.initials}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`font-bold text-sm ${review.status === 'priority' ? 'text-error' : ''}`}>{review.customerName}</span>
                            {renderStars(review.rating, review.status !== 'priority')}
                          </div>
                          <p className="text-sm text-on-surface-variant line-clamp-2 leading-relaxed italic mb-3">"{review.content}"</p>
                          {review.images.length > 0 && (
                            <div className="flex gap-2 mb-3">
                              {review.images.map((img, idx) => (
                                <img key={idx} className="w-14 h-14 rounded-lg object-cover border border-outline-variant/10" src={img} alt="Review" />
                              ))}
                            </div>
                          )}
                          {review.hasReply && (
                            <div className="bg-surface-container-low p-3 rounded-xl border-l-4 border-primary">
                              <p className="text-[11px] font-bold text-primary mb-1">Shop phản hồi:</p>
                              <p className="text-[11px] text-on-surface-variant italic">"{review.reply}"</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 align-top">
                      <span className="text-xs font-semibold px-3 py-1 bg-surface-container rounded-full">{review.product}</span>
                    </td>
                    <td className="px-6 py-6 align-top">
                      {getStatusBadge(review.status)}
                    </td>
                    <td className="px-6 py-6 align-top text-right">
                      {review.status === 'pending' ? (
                        <div className="flex flex-col items-end gap-2">
                          <button className="px-4 py-1.5 bg-primary text-white text-[10px] font-bold rounded-lg hover:opacity-90 transition-opacity uppercase tracking-widest">
                            Duyệt
                          </button>
                          <button className="px-4 py-1.5 border border-primary text-primary text-[10px] font-bold rounded-lg hover:bg-primary/10 transition-colors uppercase tracking-widest">
                            Phản hồi
                          </button>
                        </div>
                      ) : review.status === 'priority' ? (
                        <div className="flex flex-col items-end gap-2">
                          <button className="px-4 py-1.5 bg-error text-white text-[10px] font-bold rounded-lg hover:opacity-90 transition-opacity uppercase tracking-widest">
                            Phản hồi ngay
                          </button>
                          <button className="px-4 py-1.5 border border-error text-error text-[10px] font-bold rounded-lg hover:bg-error-container/20 transition-colors uppercase tracking-widest">
                            Xem chi tiết
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-end gap-2">
                          {review.hasReply ? (
                            <>
                              <button className="p-2 hover:bg-surface-variant rounded-lg text-on-surface-variant transition-colors" title="Ẩn">
                                <span className="material-symbols-outlined text-xl">visibility_off</span>
                              </button>
                              <button className="p-2 hover:bg-error-container rounded-lg text-error transition-colors" title="Xóa">
                                <span className="material-symbols-outlined text-xl">delete</span>
                              </button>
                            </>
                          ) : (
                            <>
                              <button className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-bold rounded-lg hover:bg-primary/20 transition-colors uppercase tracking-widest">
                                Phản hồi
                              </button>
                              <button className="p-2 hover:bg-surface-variant rounded-lg text-on-surface-variant transition-colors">
                                <span className="material-symbols-outlined text-xl">more_vert</span>
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="px-6 py-4 bg-surface-container-low flex justify-between items-center">
              <span className="text-xs text-on-surface-variant">Hiển thị 1-10 trên 1,284 đánh giá</span>
              <div className="flex gap-1">
                <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-outline-variant/10 text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary text-white text-xs font-bold">1</button>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-outline-variant/10 text-on-surface-variant text-xs hover:bg-surface-variant transition-colors">2</button>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-outline-variant/10 text-on-surface-variant text-xs hover:bg-surface-variant transition-colors">3</button>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-outline-variant/10 text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
