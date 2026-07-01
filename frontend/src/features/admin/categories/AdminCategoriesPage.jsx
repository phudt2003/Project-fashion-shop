import React, { useState } from 'react';
import {
  AdminPageHeader,
  AdminCard,
  AdminButton,
  AdminInput,
  AdminSelect,
  AdminTextarea
} from '../../../components/admin';

const initialCategories = [
  {
    id: 1,
    name: 'Đồ Bé Trai',
    icon: 'expand_more',
    expanded: true,
    children: [
      { id: 11, name: 'Áo thun' },
      { id: 12, name: 'Quần dài' },
      { id: 13, name: 'Đồ bộ' }
    ]
  },
  {
    id: 2,
    name: 'Đồ Bé Gái',
    icon: 'expand_more',
    expanded: true,
    active: true,
    children: [
      { id: 21, name: 'Váy & Đầm', active: true },
      { id: 22, name: 'Áo kiểu' },
      { id: 23, name: 'Chân váy' }
    ]
  },
  {
    id: 3,
    name: 'Giày dép',
    icon: 'chevron_right',
    expanded: false,
    children: []
  }
];

export function AdminCategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState({
    name: 'Váy & Đầm',
    parent: 'Đồ Bé Gái',
    description: 'Bộ sưu tập những mẫu váy và đầm cao cấp dành cho bé gái, chất liệu thoáng mát và họa tiết thời thượng.',
    slug: 'vay-va-dam'
  });
  const [categoryList, setCategoryList] = useState(initialCategories);

  const breadcrumbs = [
    { label: 'Danh mục' }
  ];

  const toggleExpand = (id) => {
    setCategoryList(categoryList.map(cat => {
      if (cat.id === id) {
        return { ...cat, expanded: !cat.expanded, icon: cat.expanded ? 'chevron_right' : 'expand_more' };
      }
      return cat;
    }));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <AdminPageHeader
        title="Quản lý Danh mục"
        subtitle="Sắp xếp và cấu trúc các nhóm sản phẩm cho cửa hàng"
        breadcrumbs={breadcrumbs}
      >
        <AdminButton variant="primary" className="gap-2">
          <span className="material-symbols-outlined text-lg">add_circle</span>
          Thêm danh mục mới
        </AdminButton>
      </AdminPageHeader>

      {/* Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Tree View */}
        <section className="lg:col-span-4 space-y-4">
          <AdminCard className="min-h-[600px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-semibold text-slate-800 font-display">Cấu trúc danh mục</h3>
              <button className="text-sky-500 text-xs font-bold hover:underline">Thu gọn tất cả</button>
            </div>

            {/* Tree Navigation */}
            <div className="space-y-1 flex-1">
              {categoryList.map((category) => (
                <div key={category.id} className="group">
                  <div
                    className={`flex items-center gap-2 p-2 rounded-xl cursor-pointer transition-all ${
                      category.active ? 'bg-sky-50 text-sky-600 font-bold' : 'hover:bg-slate-50 text-slate-700 font-medium'
                    }`}
                  >
                    <span className="material-symbols-outlined text-slate-400 cursor-grab active:cursor-grabbing text-[20px]">
                      drag_indicator
                    </span>
                    <span
                      className={`material-symbols-outlined ${category.active ? 'text-sky-500' : 'text-slate-400'} text-[20px]`}
                      onClick={() => toggleExpand(category.id)}
                    >
                      {category.icon}
                    </span>
                    <span className="flex-1 text-sm">{category.name}</span>
                    <div className={`flex gap-1 ${category.active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                      <button className="p-1 hover:bg-slate-100 rounded-lg text-slate-500">
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                      <button className="p-1 hover:bg-rose-50 text-rose-500 rounded-lg">
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                  {category.expanded && category.children.length > 0 && (
                    <div className="ml-8 mt-1 space-y-1 border-l-2 border-slate-100 pl-2">
                      {category.children.map((child) => (
                        <div
                          key={child.id}
                          className={`flex items-center gap-2 p-2 pl-3 rounded-xl cursor-pointer transition-all ${
                            child.active ? 'bg-sky-500 text-white font-bold shadow-sm' : 'hover:bg-slate-50 text-slate-600 font-medium'
                          }`}
                        >
                          <span className={`material-symbols-outlined ${child.active ? 'text-white/70' : 'text-slate-300'} text-sm`}>
                            drag_indicator
                          </span>
                          <span className="flex-1 text-xs">{child.name}</span>
                          {child.active && <span className="material-symbols-outlined text-sm text-white">check_circle</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </AdminCard>
        </section>

        {/* Right Column: Detail View */}
        <section className="lg:col-span-8 space-y-6">
          {/* Section: Thông tin danh mục */}
          <AdminCard>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-sky-500">
                <span className="material-symbols-outlined text-[28px]">edit_note</span>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-800 font-display">Chi tiết danh mục</h3>
                <p className="text-xs text-slate-500 font-medium">Chỉnh sửa thông tin cơ bản và SEO của danh mục</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <AdminInput
                  label="Tên danh mục"
                  value={selectedCategory.name}
                  onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })}
                />
              </div>
              <div>
                <AdminSelect
                  label="Danh mục cha"
                  value={selectedCategory.parent}
                  onChange={(e) => setSelectedCategory({ ...selectedCategory, parent: e.target.value })}
                >
                  <option>Đồ Bé Gái</option>
                  <option>Đồ Bé Trai</option>
                  <option>Giày dép</option>
                  <option>Phụ kiện</option>
                </AdminSelect>
              </div>
              <div className="md:col-span-2">
                <AdminTextarea
                  label="Mô tả danh mục"
                  placeholder="Nhập mô tả cho danh mục này..."
                  value={selectedCategory.description}
                  onChange={(e) => setSelectedCategory({ ...selectedCategory, description: e.target.value })}
                />
              </div>
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-display">
                  MÃ ĐỊNH DANH (URL SLUG)
                </label>
                <div className="flex h-10">
                  <span className="bg-slate-100 px-4 flex items-center rounded-l-xl border border-r-0 border-slate-200 text-xs font-bold text-slate-500">
                    kidsfashion.vn/category/
                  </span>
                  <input
                    className="flex-1 bg-white border border-slate-200 rounded-r-xl py-2 px-4 text-sm text-slate-800 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                    type="text"
                    value={selectedCategory.slug}
                    onChange={(e) => setSelectedCategory({ ...selectedCategory, slug: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </AdminCard>

          {/* Section: Hình ảnh & Icon */}
          <AdminCard>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center text-pink-500">
                <span className="material-symbols-outlined text-[28px]">image</span>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-800 font-display">Hình ảnh & Icon</h3>
                <p className="text-xs text-slate-500 font-medium">Tải lên hình đại diện hiển thị trên trang chủ</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 font-display mb-3">HÌNH THU NHỎ (THUMBNAIL)</label>
                <div className="relative group cursor-pointer border-2 border-dashed border-sky-200 bg-sky-50/20 rounded-xl h-44 flex flex-col items-center justify-center transition-all hover:border-sky-500 hover:bg-sky-50/30 overflow-hidden">
                  <div className="text-center z-10">
                    <span className="material-symbols-outlined text-sky-500 text-3xl mb-1.5 block">upload_file</span>
                    <p className="text-sm font-bold text-sky-500">Kéo thả ảnh vào đây</p>
                    <p className="text-xs text-slate-400 font-medium">PNG, JPG tối đa 5MB (1000x1000px)</p>
                  </div>
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-5 transition-opacity"
                    style={{
                      backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB5pTMtDUC-J-gmqcDwRp_xthqdo0hpkz1FodOC9_LeR6PyEFz991TrAvntYBuUsnarRXxrimwRPvV85vqA5iFITKaIdFZt6dFZ_BIHGvo333PuiXIL7bZUIgMRdUliMn_9FFJaVYkbdIaHjvHc65VGBBREANuFZzI4AxUpOT2wQ3EaTKDgmLHm5loXjJlZf-9Zv8U_S87hKa2oxWxN0E1T9Ms5FCSjIQqbIPZO6nu6oxJlIK9RHLvrtAUdtXrWjBwTXrkNGyHwsj26')"
                    }}
                  ></div>
                </div>
              </div>
              <div className="md:col-span-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 font-display mb-3">ICON DANH MỤC</label>
                <div className="bg-slate-50/50 rounded-xl border border-slate-100 p-4 flex flex-col items-center justify-center gap-3 h-44">
                  <div className="w-14 h-14 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-sky-500">
                    <span className="material-symbols-outlined text-3xl">styler</span>
                  </div>
                  <AdminButton variant="outline" className="w-full text-xs h-9">
                    Thay đổi Icon
                  </AdminButton>
                </div>
              </div>
            </div>
          </AdminCard>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pb-8">
            <AdminButton variant="ghost" className="px-6 font-bold">
              Hủy thay đổi
            </AdminButton>
            <AdminButton variant="primary" className="px-8 font-bold">
              Lưu thay đổi
            </AdminButton>
          </div>
        </section>
      </div>
    </div>
  );
}
