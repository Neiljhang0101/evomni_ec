// Product List Page — 產品管理列表

const PRODUCTS_DATA = [
  { id: '#348', title: '無線藍牙耳機 Pro Max', thumb: null, price: 'NT$ 2,980', salePrice: 'NT$ 1,980', category: '3C 電子', tags: ['熱銷', '新品'], status: 'active', created: '2026-04-10 01:58' },
  { id: '#347', title: '環保竹製餐具組', thumb: null, price: 'NT$ 560', salePrice: '', category: '生活用品', tags: ['環保'], status: 'active', created: '2026-04-09 14:22' },
  { id: '#346', title: '瑜珈墊專業款 6mm', thumb: null, price: 'NT$ 1,200', salePrice: 'NT$ 990', category: '運動健身', tags: [], status: 'draft', created: '2026-04-08 09:15' },
  { id: '#345', title: '冷萃咖啡濾掛包 (10入)', thumb: null, price: 'NT$ 320', salePrice: '', category: '食品飲料', tags: ['精選'], status: 'active', created: '2026-04-07 11:30' },
  { id: '#344', title: '智慧手錶 Smart Watch Pro', thumb: null, price: 'NT$ 8,900', salePrice: 'NT$ 6,990', category: '3C 電子', tags: ['熱銷'], status: 'active', created: '2026-04-06 16:44' },
  { id: '#343', title: '天然精油擴香石', thumb: null, price: 'NT$ 480', salePrice: '', category: '生活用品', tags: [], status: 'inactive', created: '2026-04-05 08:00' },
  { id: '#342', title: '手工皮革名片夾', thumb: null, price: 'NT$ 750', salePrice: '', category: '配件', tags: [], status: 'active', created: '2026-04-04 13:20' },
  { id: '#341', title: '有機蜂蜜 台灣百花蜜 500g', thumb: null, price: 'NT$ 680', salePrice: 'NT$ 580', category: '食品飲料', tags: ['有機'], status: 'draft', created: '2026-04-03 10:05' },
];

function ProductListPage({ onNavigate }) {
  const [data, setData] = React.useState(PRODUCTS_DATA);
  const [selected, setSelected] = React.useState([]);
  const [toast, setToast] = React.useState(null);
  const [showBatchModal, setShowBatchModal] = React.useState(false);
  const [showAIModal, setShowAIModal] = React.useState(false);
  const [searchVals, setSearchVals] = React.useState({});
  const [currentPage, setCurrentPage] = React.useState(1);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const statusMap = {
    active: { label: '已發布', color: '#67C23A', bg: '#f0f9eb', border: '#c2e7b0' },
    inactive: { label: '已下架', color: '#909399', bg: '#f4f4f5', border: '#d3d4d6' },
    draft: { label: '草稿', color: '#E6A23C', bg: '#fdf6ec', border: '#f5dab1' },
  };

  const toggleAll = () => setSelected(s => s.length === data.length ? [] : data.map((_, i) => i));
  const toggleRow = (i) => setSelected(s => s.includes(i) ? s.filter(x => x !== i) : [...s, i]);

  return (
    <div style={{ position: 'relative' }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: 64, right: 24, zIndex: 9999,
          background: toast.type === 'success' ? '#f0f9eb' : toast.type === 'danger' ? '#fef0f0' : '#ecf5ff',
          border: `1px solid ${toast.type === 'success' ? '#c2e7b0' : toast.type === 'danger' ? '#fbc4c4' : '#b3d8ff'}`,
          color: toast.type === 'success' ? '#67C23A' : toast.type === 'danger' ? '#F56C6C' : '#409EFF',
          padding: '10px 20px', fontSize: 14, minWidth: 200,
        }}>{toast.msg}</div>
      )}

      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#303133' }}>產品管理</h1>
          <span style={{ fontSize: 13, color: '#C0C4CC' }}>首頁 / 產品 / 產品管理</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={btnAI} onClick={() => setShowAIModal(true)}>
            <span style={{ fontSize: 13 }}>✦</span> AI 智能上架
          </button>
          <button style={btnBatch} onClick={() => setShowBatchModal(true)}>↑ 批量上傳</button>
          <button style={btnPrimary} onClick={() => onNavigate('product-edit-new')}>+ 新增產品</button>
        </div>
      </div>

      {/* Filter Bar — no card, inline */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {[
          { label: '分類', key: 'category', options: ['所有分類', '3C 電子', '生活用品', '運動健身', '食品飲料', '配件'] },
          { label: '標籤', key: 'tag', options: ['所有標籤', '熱銷', '新品', '環保', '精選', '有機'] },
          { label: '狀態', key: 'status', options: ['所有狀態', '已發布', '草稿', '已下架'] },
        ].map(f => (
          <select key={f.key} style={{ ...inputStyle, width: 120 }} value={searchVals[f.key] || ''}
            onChange={e => setSearchVals(v => ({ ...v, [f.key]: e.target.value }))}>
            {f.options.map(o => <option key={o}>{o}</option>)}
          </select>
        ))}
        <input
          style={{ ...inputStyle, width: 220 }}
          placeholder="搜尋產品名稱或 ID…"
          value={searchVals.keyword || ''}
          onChange={e => setSearchVals(v => ({ ...v, keyword: e.target.value }))}
        />
        <button style={btnPrimary} onClick={() => showToast('搜尋完成')}>搜尋</button>
        <button style={btnPlain} onClick={() => setSearchVals({})}>清除</button>
      </div>

      {/* Table toolbar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
        {selected.length > 0 && (
          <button style={{ ...btnDanger, height: 32, padding: '0 16px', fontSize: 14 }}
            onClick={() => { setData(d => d.filter((_, i) => !selected.includes(i))); setSelected([]); showToast(`已刪除 ${selected.length} 筆`, 'danger'); }}>
            批次刪除 ({selected.length})
          </button>
        )}
        <div style={{ marginLeft: 'auto', fontSize: 13, color: '#909399' }}>共 {data.length} 筆產品</div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', border: '1px solid #DCDFE6', borderRadius: 3 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr>
              <th style={thS}><input type="checkbox" checked={selected.length === data.length && data.length > 0} onChange={toggleAll} style={{ accentColor: '#303133' }} /></th>
              <th style={{ ...thS, minWidth: 240, textAlign: 'left' }}>產品/型號</th>
              <th style={{ ...thS, width: 80, textAlign: 'left' }}>ID</th>
              <th style={{ ...thS, width: 140, textAlign: 'left' }}>售價</th>
              <th style={{ ...thS, width: 120, textAlign: 'left' }}>分類</th>
              <th style={{ ...thS, width: 100, textAlign: 'left' }}>狀態</th>
              <th style={{ ...thS, width: 160, textAlign: 'left' }}>建立日期</th>
              <th style={{ ...thS, width: 160, textAlign: 'left' }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => {
              const st = statusMap[row.status] || statusMap.draft;
              return (
                <tr key={row.id}
                  style={{ background: selected.includes(i) ? '#ECF5FF' : 'transparent' }}
                  onMouseEnter={e => { if (!selected.includes(i)) e.currentTarget.style.background = '#F5F7FA'; }}
                  onMouseLeave={e => { if (!selected.includes(i)) e.currentTarget.style.background = 'transparent'; }}
                >
                  <td style={tdS}><input type="checkbox" checked={selected.includes(i)} onChange={() => toggleRow(i)} style={{ accentColor: '#303133' }} /></td>
                  <td style={tdS}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 40, height: 40, background: '#F5F7FA', border: '1px solid #DCDFE6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C0C4CC', fontSize: 18, flexShrink: 0 }}>◫</div>
                      <div>
                        <div style={{ color: '#303133', fontWeight: 500 }}>{row.title}</div>
                        <div style={{ display: 'flex', gap: 4, marginTop: 4, flexWrap: 'wrap' }}>
                          {row.tags.map(t => (
                            <span key={t} style={{ padding: '1px 8px', borderRadius: 9999, fontSize: 11, background: '#ecf5ff', color: '#409EFF', border: '1px solid #b3d8ff' }}>{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ ...tdS, color: '#909399', fontSize: 14 }}>{row.id}</td>
                  <td style={tdS}>
                    {row.salePrice ? (
                      <div>
                        <div style={{ color: '#F56C6C', fontWeight: 600 }}>{row.salePrice}</div>
                        <div style={{ color: '#909399', fontSize: 14, textDecoration: 'line-through' }}>{row.price}</div>
                      </div>
                    ) : (
                      <div style={{ color: '#303133' }}>{row.price}</div>
                    )}
                  </td>
                  <td style={{ ...tdS, color: '#606266' }}>{row.category}</td>
                  <td style={tdS}>
                    <span style={{ padding: '2px 10px', borderRadius: 9999, fontSize: 12, background: st.bg, color: st.color, border: `1px solid ${st.border}` }}>{st.label}</span>
                  </td>
                  <td style={{ ...tdS, color: '#909399', fontSize: 14 }}>{row.created}</td>
                  <td style={tdS}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => onNavigate('product-edit', row)} style={textBtn('#409EFF')}>編輯</button>
                      <button style={textBtn('#909399')}>預覽</button>
                      <button onClick={() => { setData(d => d.filter(r => r.id !== row.id)); showToast(`已刪除 ${row.id}`, 'danger'); }} style={textBtn('#F56C6C')}>刪除</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Pagination
          total={data.length}
          page={currentPage}
          pageSize={10}
          pageSizes={[10, 20]}
          onChange={setCurrentPage}
          style={{ borderTop: '1px solid #EBEEF5', padding: '10px 12px' }}
        />
      </div>

      {/* Batch Upload Modal */}
      {showBatchModal && <BatchUploadModal onClose={() => setShowBatchModal(false)} showToast={showToast} />}
      {/* AI Upload Modal */}
      {showAIModal && <AIUploadModal onClose={() => setShowAIModal(false)} showToast={showToast} />}
    </div>
  );
}

// Styles
const btnPrimary = { height: 32, padding: '0 16px', background: '#303133', color: '#fff', border: '1px solid #303133', borderRadius: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14 };
const btnPlain = { height: 32, padding: '0 16px', background: '#fff', color: '#303133', border: '1px solid #DCDFE6', borderRadius: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14 };
const btnBatch = { height: 32, padding: '0 16px', background: '#fff', color: '#606266', border: '1px solid #DCDFE6', borderRadius: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14 };
const btnAI = { height: 32, padding: '0 16px', background: 'linear-gradient(135deg, #5B21B6, #EC4899)', color: '#fff', border: 'none', borderRadius: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 };
const btnDanger = { background: '#fef0f0', color: '#F56C6C', border: '1px solid #fbc4c4', borderRadius: 0, cursor: 'pointer', fontFamily: 'inherit' };
const inputStyle = { height: 32, padding: '0 10px', border: '1px solid #DCDFE6', borderRadius: 0, fontSize: 14, color: '#303133', width: 180, background: '#fff', outline: 'none' };
const thS = { background: '#F5F7FA', color: '#303133', fontWeight: 700, fontSize: 14, padding: '10px 12px', borderBottom: '1px solid #DCDFE6' };
const tdS = { padding: '10px 12px', color: '#606266', borderBottom: '1px solid #EBEEF5', verticalAlign: 'middle' };
const textBtn = (color) => ({ background: 'none', border: 'none', color, cursor: 'pointer', fontSize: 13, fontFamily: 'inherit', padding: 0 });

Object.assign(window, { ProductListPage, btnPrimary, btnPlain, btnDanger, inputStyle });
