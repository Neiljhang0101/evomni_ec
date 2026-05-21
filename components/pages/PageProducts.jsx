// PageProducts — 產品中心模組
// 從 html/産品中心.html 抽取，移除外層 Sidebar/Header

// ─── 產品中心儀表板 ────────────────────────────────────────────────────────────
function ProductsDashboardPage({ onNavigate }) {
  const stats = [
    { label: '產品總數', value: '128', sub: '+3 本週新增', color: '#409EFF' },
    { label: '低庫存產品', value: '5', sub: '需要補貨', color: '#F56C6C' },
    { label: '本月銷售額', value: 'NT$ 128,900', sub: '較上月 +12%', color: '#67C23A' },
    { label: '待處理貨到通知', value: '23', sub: '位訂閱者', color: '#E6A23C' },
  ];
  return (
    <div>
      <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>儀表板</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #DCDFE6', padding: 24, borderRadius: 3 }}>
            <div style={{ fontSize: 12, color: '#909399', marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: s.color, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: '#909399' }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <div style={{ background: '#fff', border: '1px solid #DCDFE6', padding: 24, borderRadius: 3 }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>快速前往</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { label: '產品管理', desc: '瀏覽所有產品', page: 'product-list' },
              { label: '新增產品', desc: '建立新產品', page: 'product-add' },
              { label: '產品分類', desc: '管理分類樹狀結構', page: 'category-management' },
              { label: '庫存管理', desc: '查看庫存與通知', page: 'inventory-management' },
            ].map(item => (
              <div key={item.page} onClick={() => onNavigate(item.page)}
                style={{ padding: '14px 16px', border: '1px solid #DCDFE6', cursor: 'pointer', background: '#fff', borderRadius: 3 }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#409EFF'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#DCDFE6'}
              >
                <div style={{ fontWeight: 600, marginBottom: 4, color: '#303133' }}>{item.label}</div>
                <div style={{ fontSize: 12, color: '#909399' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #DCDFE6', padding: 24, borderRadius: 3 }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>低庫存警示</div>
          {[
            { name: '夏日純棉T恤 / 紅色 M', stock: 3 },
            { name: '輕量慢跑鞋 / 黑色 38', stock: 2 },
            { name: '羊毛混紡圍巾 / 深灰', stock: 4 },
          ].map((item, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #EBEEF5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: '#606266' }}>{item.name}</span>
              <span style={{ fontSize: 13, color: '#F56C6C', fontWeight: 600 }}>{item.stock}</span>
            </div>
          ))}
          <button onClick={() => onNavigate('inventory-management')}
            style={{ marginTop: 12, background: 'none', border: 'none', color: '#409EFF', cursor: 'pointer', fontSize: 13, padding: 0, fontFamily: 'Noto Sans TC,sans-serif' }}>
            查看全部 →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── 頁面路由表 ───────────────────────────────────────────────────────────────
const PRODUCTS_PAGE_MAP = {
  'product-dashboard':    { component: ProductsDashboardPage,                                                navGroup: 'products' },
  'product-list':         { component: ProductListPage,                                                       navGroup: 'product-list' },
  'product-add':          { component: p => <AddEditProductPage {...p} mode="add" />,                         navGroup: 'product-list' },
  'product-edit':         { component: p => <AddEditProductPage {...p} mode="edit" />,                        navGroup: 'product-list' },
  'category-management':  { component: CategoryManagementPage,                                                navGroup: 'category-management' },
  'inventory-management': { component: InventoryManagementPage,                                               navGroup: 'inventory-management' },
};

// ─── PageProducts ─────────────────────────────────────────────────────────────
function PageProducts({ currentPage, onNavigate }) {
  const route = PRODUCTS_PAGE_MAP[currentPage] || PRODUCTS_PAGE_MAP['product-list'];
  const PageComponent = route.component;
  return <PageComponent onNavigate={onNavigate} />;
}
