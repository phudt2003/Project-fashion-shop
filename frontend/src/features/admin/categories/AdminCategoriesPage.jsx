import { useState } from 'react';

const categories = [
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
  const [categoryList, setCategoryList] = useState(categories);

  const toggleExpand = (id) => {
    setCategoryList(categories.map(cat => {
      if (cat.id === id) {
        return { ...cat, expanded: !cat.expanded, icon: cat.expanded ? 'chevron_right' : 'expand_more' };
      }
      return cat;
    }));
  };

  const selectCategory = (id) => {
    const category = categoryList.find(cat => cat.id === id);
    if (category) {
      setSelectedCategory({
        name: category.name,
        parent: '',
        description: '',
        slug: category.name.toLowerCase().replace(/ /g, '-')
      });
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface">Quản lý Danh mục</h2>
          <p className="text-on-surface-variant">Sắp xếp và cấu trúc các nhóm sản phẩm cho cửa hàng</p>
        </div>
        <button className="bg-primary text-on-primary px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium shadow-md hover:shadow-lg active:scale-95 transition-all">
          <span className="material-symbols-outlined text-lg">add_circle</span>
          Thêm danh mục mới
        </button>
      </div>

      {/* Dashboard Layout */}
      <div className="grid grid-cols-12 gap-card_gap items-start">
        {/* Left Column: Tree View */}
        <section className="col-span-12 lg:col-span-4 space-y-4">
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-outline-variant/30 min-h-[600px]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-title-sm text-title-sm">Cấu trúc danh mục</h3>
              <button className="text-primary text-body-sm font-medium hover:underline">Thu gọn tất cả</button>
            </div>

            {/* Tree Navigation */}
            <div className="space-y-1">
              {categoryList.map((category) => (
                <div key={category.id} className="group">
                  <div
                    className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all ${
                      category.active ? 'bg-primary/5 text-primary' : 'hover:bg-surface-container-low'
                    }`}
                  >
                    <span className="material-symbols-outlined text-on-surface-variant cursor-grab active:cursor-grabbing">
                      drag_indicator
                    </span>
                    <span
                      className={`material-symbols-outlined ${category.active ? 'text-primary' : 'text-on-surface-variant'} text-xl`}
                      onClick={() => toggleExpand(category.id)}
                    >
                      {category.icon}
                    </span>
                    <span className={`flex-1 ${category.active ? 'font-bold' : 'font-medium'}`}>{category.name}</span>
                    <div className={`flex gap-1 ${category.active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                      <button className="p-1 hover:bg-surface-variant rounded">
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                      <button className="p-1 hover:bg-error-container text-error rounded">
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                  {category.expanded && category.children.length > 0 && (
                    <div className="ml-10 mt-1 space-y-1 border-l-2 border-surface-container-high">
                      {category.children.map((child) => (
                        <div
                          key={child.id}
                          className={`flex items-center gap-2 p-2 pl-4 rounded-lg cursor-pointer transition-all ${
                            child.active ? 'bg-primary text-on-primary shadow-sm' : 'hover:bg-surface-container-low'
                          }`}
                        >
                          <span className="material-symbols-outlined text-on-surface-variant/40 text-sm">
                            drag_indicator
                          </span>
                          <span className={`flex-1 text-body-sm ${child.active ? 'font-bold' : ''}`}>{child.name}</span>
                          {child.active && <span className="material-symbols-outlined text-sm">check_circle</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right Column: Detail View */}
        <section className="col-span-12 lg:col-span-8 space-y-6">
          {/* Section: Thông tin danh mục */}
          <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-outline-variant/30">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-3xl">edit_note</span>
              </div>
              <div>
                <h3 className="font-title-sm text-title-sm">Chi tiết danh mục</h3>
                <p className="text-body-sm text-on-surface-variant">Chỉnh sửa thông tin cơ bản và SEO của danh mục</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-label-caps text-on-surface-variant mb-2">TÊN DANH MỤC</label>
                <input
                  className="w-full bg-surface-bright border-none focus:ring-2 focus:ring-primary rounded-lg py-3 px-4 font-body-md"
                  type="text"
                  value={selectedCategory.name}
                  onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })}
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-label-caps text-on-surface-variant mb-2">DANH MỤC CHA</label>
                <select
                  className="w-full bg-surface-bright border-none focus:ring-2 focus:ring-primary rounded-lg py-3 px-4 font-body-md"
                  value={selectedCategory.parent}
                  onChange={(e) => setSelectedCategory({ ...selectedCategory, parent: e.target.value })}
                >
                  <option>Đồ Bé Gái</option>
                  <option>Đồ Bé Trai</option>
                  <option>Giày dép</option>
                  <option>Phụ kiện</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-label-caps text-on-surface-variant mb-2">MÔ TẢ DANH MỤC</label>
                <textarea
                  className="w-full bg-surface-bright border-none focus:ring-2 focus:ring-primary rounded-lg py-3 px-4 font-body-md"
                  placeholder="Nhập mô tả cho danh mục này..."
                  rows="4"
                  value={selectedCategory.description}
                  onChange={(e) => setSelectedCategory({ ...selectedCategory, description: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-label-caps text-on-surface-variant mb-2">MÃ ĐỊNH DANH (URL SLUG)</label>
                <div className="flex">
                  <span className="bg-surface-container-low px-4 flex items-center rounded-l-lg border-r border-outline-variant text-body-sm text-on-surface-variant">
                    kidsfashion.vn/category/
                  </span>
                  <input
                    className="flex-1 bg-surface-bright border-none focus:ring-2 focus:ring-primary rounded-r-lg py-3 px-4 font-body-md"
                    type="text"
                    value={selectedCategory.slug}
                    onChange={(e) => setSelectedCategory({ ...selectedCategory, slug: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Hình ảnh & Icon */}
          <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-outline-variant/30">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-3xl">image</span>
              </div>
              <div>
                <h3 className="font-title-sm text-title-sm">Hình ảnh & Icon</h3>
                <p className="text-body-sm text-on-surface-variant">Tải lên hình đại diện hiển thị trên trang chủ</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 md:col-span-2">
                <label className="block text-label-caps text-on-surface-variant mb-4">HÌNH THU NHỎ (THUMBNAIL)</label>
                <div className="relative group cursor-pointer border-2 border-dashed border-primary/30 bg-primary/5 rounded-2xl h-48 flex flex-col items-center justify-center transition-all hover:border-primary hover:bg-primary/10 overflow-hidden">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-primary text-4xl mb-2">upload_file</span>
                    <p className="text-body-md font-medium text-primary">Kéo thả ảnh vào đây</p>
                    <p className="text-body-sm text-on-surface-variant">PNG, JPG tối đa 5MB (1000x1000px)</p>
                  </div>
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-20 transition-opacity"
                    style={{
                      backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB5pTMtDUC-J-gmqcDwRp_xthqdo0hpkz1FodOC9_LeR6PyEFz991TrAvntYBuUsnarRXxrimwRPvV85vqA5iFITKaIdFZt6dFZ_BIHGvo333PuiXIL7bZUIgMRdUliMn_9FFJaVYkbdIaHjvHc65VGBBREANuFZzI4AxUpOT2wQ3EaTKDgmLHm5loXjJlZf-9Zv8U_S87hKa2oxWxN0E1T9Ms5FCSjIQqbIPZO6nu6oxJlIK9RHLvrtAUdtXrWjBwTXrkNGyHwsj26')"
                    }}
                  ></div>
                </div>
              </div>
              <div className="col-span-3 md:col-span-1">
                <label className="block text-label-caps text-on-surface-variant mb-4">ICON DANH MỤC</label>
                <div className="bg-surface-bright rounded-2xl border border-outline-variant p-6 flex flex-col items-center gap-4 h-48">
                  <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-outline-variant/30 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-4xl">styler</span>
                  </div>
                  <button className="w-full py-2 bg-white border border-primary text-primary text-body-sm font-bold rounded-lg hover:bg-primary/5 transition-all">
                    Thay đổi Icon
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pb-8">
            <button className="px-8 py-3 rounded-xl text-on-surface-variant font-bold hover:bg-surface-container-high transition-all">
              Hủy thay đổi
            </button>
            <button className="px-10 py-3 bg-primary text-on-primary rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all">
              Lưu thay đổi
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

