// Category Management Page — 分類管理

const CATEGORY_DATA = [
  {
    id: 'C001', name: '3C 電子', slug: '3c-electronics', count: 24, status: 'active', order: 1,
    children: [
      { id: 'C001-1', name: '耳機音響', slug: 'headphones', count: 8, status: 'active', order: 1, children: [] },
      { id: 'C001-2', name: '智慧穿戴', slug: 'wearables', count: 6, status: 'active', order: 2, children: [] },
      { id: 'C001-3', name: '手機配件', slug: 'phone-accessories', count: 10, status: 'inactive', order: 3, children: [] },
    ]
  },
  {
    id: 'C002', name: '生活用品', slug: 'lifestyle', count: 18, status: 'active', order: 2,
    children: [
      { id: 'C002-1', name: '廚房用品', slug: 'kitchen', count: 7, status: 'active', order: 1, children: [] },
      { id: 'C002-2', name: '居家清潔', slug: 'cleaning', count: 11, status: 'active', order: 2, children: [] },
    ]
  },
  {
    id: 'C003', name: '運動健身', slug: 'sports', count: 9, status: 'active', order: 3, children: []
  },
  {
    id: 'C004', name: '食品飲料', slug: 'food-beverage', count: 15, status: 'active', order: 4, children: []
  },
  {
    id: 'C005', name: '配件', slug: 'accessories', count: 6, status: 'inactive', order: 5, children: []
  },
];

// Flatten for table view
function flattenCategories(cats, depth = 0, parentName = null) {
  return cats.reduce((acc, cat) => {
    acc.push({ ...cat, depth, parentName });
    if (cat.children && cat.children.length > 0) {
      acc.push(...flattenCategories(cat.children, depth + 1, cat.name));
    }
    return acc;
  }, []);
}

function CategoryManagementPage() {
  const [categories, setCategories] = React.useState(CATEGORY_DATA);
  const [expanded, setExpanded] = React.useState({ C001: true, C002: true });
  const [modal, setModal] = React.useState(null); // null | { mode: 'add'|'edit', cat?: obj, parentId?: str }
  const [toast, setToast] = React.useState(null);
  const [deleteConfirm, setDeleteConfirm] = React.useState(null);
  const [search, setSearch] = React.useState('');
  const [viewMode, setViewMode] = React.useState('tree'); // tree | table

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const allFlat = flattenCategories(categories);
  const filtered = search
    ? allFlat.filter(c => c.name.includes(search) || c.slug.includes(search))
    : allFlat;

  const toggleExpand = (id) => setExpanded(e => ({ ...e, [id]: !e[id] }));

  const statusTag = (status) => status === 'active'
    ? <span style={{ padding: '2px 10px', borderRadius: 9999, fontSize: 12, background: '#f0f9eb', color: '#67C23A', border: '1px solid #c2e7b0' }}>啟用</span>
    : <span style={{ padding: '2px 10px', borderRadius: 9999, fontSize: 12, background: '#f4f4f5', color: '#909399', border: '1px solid #d3d4d6' }}>停用</span>;

  // ── Tree Row ──
  const TreeRow = ({ cat, depth, isLast }) => {
    const hasChildren = cat.children && cat.children.length > 0;
    const isExpanded = expanded[cat.id];

    return (
      <>
        <tr
          onMouseEnter={e => e.currentTarget.style.background = '#F5F7FA'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <td style={{ ...tdS, width: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C0C4CC', cursor: 'grab', fontSize: 14 }}>⠿</div>
          </td>
          <td style={tdS}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, paddingLeft: depth * 24 }}>
              {/* Tree guide lines */}
              {depth > 0 && (
                <span style={{ color: '#DCDFE6', fontSize: 14, marginRight: 2 }}>└</span>
              )}
              {hasChildren ? (
                <button onClick={() => toggleExpand(cat.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 4px', color: '#606266', fontSize: 11 }}>
                  {isExpanded ? '▾' : '▸'}
                </button>
              ) : (
                <span style={{ width: 20, display: 'inline-block' }} />
              )}
              <span style={{ fontWeight: depth === 0 ? 600 : 400, color: '#303133', fontSize: 14 }}>{cat.name}</span>
              {depth === 0 && (
                <span style={{ fontSize: 11, color: '#909399', marginLeft: 4 }}>({cat.children?.length || 0} 子分類)</span>
              )}
            </div>
          </td>
          <td style={{ ...tdS, color: '#909399', fontSize: 14 }}>{cat.slug}</td>
          <td style={{ ...tdS, color: '#606266', textAlign: 'center' }}>{cat.count}</td>
          <td style={tdS}>{statusTag(cat.status)}</td>
          <td style={{ ...tdS, color: '#606266', textAlign: 'center' }}>{cat.order}</td>
          <td style={tdS}>
            <div style={{ display: 'flex', gap: 10 }}>
              {depth === 0 && (
                <button onClick={() => setModal({ mode: 'add', parentId: cat.id, parentName: cat.name })} style={textBtn('#67C23A')}>+ 子分類</button>
              )}
              <button onClick={() => setModal({ mode: 'edit', cat })} style={textBtn('#409EFF')}>編輯</button>
              <button onClick={() => setDeleteConfirm(cat)} style={textBtn('#F56C6C')}>刪除</button>
            </div>
          </td>
        </tr>
        {hasChildren && isExpanded && cat.children.map((child, ci) => (
          <TreeRow key={child.id} cat={child} depth={depth + 1} isLast={ci === cat.children.length - 1} />
        ))}
      </>
    );
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: 64, right: 24, zIndex: 9999,
          background: toast.type === 'success' ? '#f0f9eb' : toast.type === 'danger' ? '#fef0f0' : '#ecf5ff',
          border: `1px solid ${toast.type === 'success' ? '#c2e7b0' : toast.type === 'danger' ? '#fbc4c4' : '#b3d8ff'}`,
          borderRadius: 3,
          color: toast.type === 'success' ? '#67C23A' : toast.type === 'danger' ? '#F56C6C' : '#409EFF',
          padding: '10px 20px', fontSize: 14,
        }}>{toast.msg}</div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700 }}>分類管理</h1>
          <span style={{ fontSize: 13, color: '#C0C4CC' }}>首頁 / 產品 / 分類管理</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={btnPrimary} onClick={() => setModal({ mode: 'add' })}>+ 新增分類</button>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
        {[
          { label: '分類總數', value: allFlat.length, color: '#409EFF' },
          { label: '主分類', value: categories.length, color: '#303133' },
          { label: '子分類', value: allFlat.filter(c => c.depth > 0).length, color: '#606266' },
          { label: '已停用', value: allFlat.filter(c => c.status === 'inactive').length, color: '#909399' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #DCDFE6', borderRadius: 3, padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: '#909399' }}>{s.label}</span>
            <span style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</span>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
        <input
          style={{ height: 32, padding: '0 10px', border: '1px solid #DCDFE6', borderRadius: 0, fontSize: 14, width: 220, outline: 'none' }}
          placeholder="搜尋分類名稱或 Slug…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onFocus={e => e.target.style.borderColor = '#409EFF'}
          onBlur={e => e.target.style.borderColor = '#DCDFE6'}
        />
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 0, border: '1px solid #DCDFE6' }}>
          {[['tree', '樹狀'], ['table', '列表']].map(([v, l]) => (
            <button key={v} onClick={() => setViewMode(v)} style={{
              height: 32, padding: '0 14px', border: 'none', borderRadius: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13,
              background: viewMode === v ? '#303133' : '#fff', color: viewMode === v ? '#fff' : '#606266',
            }}>{l}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', border: '1px solid #DCDFE6', borderRadius: 3 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr>
              <th style={{ ...thS, width: 40 }}></th>
              <th style={{ ...thS, minWidth: 200, textAlign: 'left' }}>分類名稱</th>
              <th style={{ ...thS, width: 180, textAlign: 'left' }}>Slug</th>
              <th style={{ ...thS, width: 80, textAlign: 'center' }}>產品數</th>
              <th style={{ ...thS, width: 100, textAlign: 'left' }}>狀態</th>
              <th style={{ ...thS, width: 60, textAlign: 'center' }}>排序</th>
              <th style={{ ...thS, width: 200, textAlign: 'left' }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {viewMode === 'tree' ? (
              categories
                .filter(c => !search || c.name.includes(search) || c.children?.some(ch => ch.name.includes(search)))
                .map(cat => <TreeRow key={cat.id} cat={cat} depth={0} />)
            ) : (
              filtered.map((cat, i) => (
                <tr key={cat.id}
                  onMouseEnter={e => e.currentTarget.style.background = '#F5F7FA'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ ...tdS, width: 40 }}>
                    <div style={{ display: 'flex', justifyContent: 'center', color: '#C0C4CC', cursor: 'grab' }}>⠿</div>
                  </td>
                  <td style={tdS}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {cat.depth > 0 && <span style={{ fontSize: 11, color: '#C0C4CC', background: '#F5F7FA', border: '1px solid #DCDFE6', padding: '1px 6px' }}>{cat.parentName}</span>}
                      <span style={{ fontWeight: cat.depth === 0 ? 600 : 400 }}>{cat.name}</span>
                    </div>
                  </td>
                  <td style={{ ...tdS, color: '#909399', fontSize: 14 }}>{cat.slug}</td>
                  <td style={{ ...tdS, textAlign: 'center' }}>{cat.count}</td>
                  <td style={tdS}>{statusTag(cat.status)}</td>
                  <td style={{ ...tdS, textAlign: 'center', color: '#606266' }}>{cat.order}</td>
                  <td style={tdS}>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <button onClick={() => setModal({ mode: 'edit', cat })} style={textBtn('#409EFF')}>編輯</button>
                      <button onClick={() => setDeleteConfirm(cat)} style={textBtn('#F56C6C')}>刪除</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div style={{ padding: '40px 0', textAlign: 'center', color: '#909399', fontSize: 14 }}>
            找不到符合的分類
          </div>
        )}
      </div>

      {/* Category Form Modal */}
      {modal && (
        <CategoryFormModal
          mode={modal.mode}
          cat={modal.cat}
          parentId={modal.parentId}
          parentName={modal.parentName}
          parentOptions={categories}
          onClose={() => setModal(null)}
          onSave={(data) => {
            showToast(modal.mode === 'add' ? '已新增分類' : '已更新分類');
            setModal(null);
          }}
        />
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <Dialog
          open={true}
          title="確認刪除"
          width={400}
          onClose={() => setDeleteConfirm(null)}
          footer={
            <React.Fragment>
              <button style={dialogBtns.default} onClick={() => setDeleteConfirm(null)}>取消</button>
              <button style={dialogBtns.danger}
                onClick={() => { showToast(`已刪除「${deleteConfirm.name}」`, 'danger'); setDeleteConfirm(null); }}>
                確定刪除
              </button>
            </React.Fragment>
          }
        >
          <div style={{ fontSize: 14, color: '#606266', marginBottom: 8 }}>
            確定要刪除分類「<strong>{deleteConfirm.name}</strong>」？
          </div>
          {deleteConfirm.count > 0 && (
            <div style={{ background: '#fef0f0', border: '1px solid #fbc4c4', borderRadius: 3, padding: '10px 14px', fontSize: 13, color: '#F56C6C', marginBottom: 8 }}>
              此分類下有 {deleteConfirm.count} 個產品，刪除後這些產品將變成未分類。
            </div>
          )}
          {deleteConfirm.children?.length > 0 && (
            <div style={{ background: '#fdf6ec', border: '1px solid #f5dab1', borderRadius: 3, padding: '10px 14px', fontSize: 13, color: '#E6A23C' }}>
              此分類包含 {deleteConfirm.children.length} 個子分類，將一併刪除。
            </div>
          )}
        </Dialog>
      )}
    </div>
  );
}

// ── Category Form Modal ──────────────────────────────────────────────────────
function CategoryFormModal({ mode, cat, parentId, parentName, parentOptions, onClose, onSave }) {
  const isEdit = mode === 'edit';
  const [name, setName] = React.useState(cat?.name || '');
  const [slug, setSlug] = React.useState(cat?.slug || '');
  const [status, setStatus] = React.useState(cat?.status || 'active');
  const [parent, setParent] = React.useState(parentId || '');
  const [order, setOrder] = React.useState(cat?.order || 1);
  const [desc, setDesc] = React.useState('');
  const [autoSlug, setAutoSlug] = React.useState(!isEdit);

  const toSlug = (str) => str.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]/g, '');

  const handleNameChange = (v) => {
    setName(v);
    if (autoSlug) setSlug(toSlug(v));
  };

  const inputS = { height: 32, padding: '0 10px', border: '1px solid #DCDFE6', borderRadius: 0, fontSize: 14, color: '#303133', background: '#fff', outline: 'none', width: '100%' };
  const labelS = { fontSize: 13, color: '#606266', marginBottom: 6, display: 'block', fontWeight: 500 };
  const fieldS = { marginBottom: 16 };

  return (
    <Dialog
      open={true}
      title={parentName ? `新增子分類 — ${parentName}` : isEdit ? '編輯分類' : '新增分類'}
      width={520}
      onClose={onClose}
      footer={
        <React.Fragment>
          <button style={dialogBtns.default} onClick={onClose}>取消</button>
          <button style={dialogBtns.primary} onClick={() => name && onSave({ name, slug, status, parent, order, desc })}>
            {isEdit ? '確定修改' : '確定新增'}
          </button>
        </React.Fragment>
      }
    >
      {/* Parent */}
      {!parentId && (
        <div style={fieldS}>
          <label style={labelS}>上層分類 <span style={{ color: '#909399', fontWeight: 400 }}>(選填，留空則為主分類)</span></label>
          <select style={{ ...inputS }} value={parent} onChange={e => setParent(e.target.value)}>
            <option value="">— 主分類（無上層）</option>
            {parentOptions.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
      )}

      {/* Name */}
      <div style={fieldS}>
        <label style={labelS}>分類名稱 <span style={{ color: '#F56C6C' }}>*</span></label>
        <input style={inputS} placeholder="請輸入分類名稱" value={name} onChange={e => handleNameChange(e.target.value)}
          onFocus={e => e.target.style.borderColor = '#409EFF'} onBlur={e => e.target.style.borderColor = '#DCDFE6'} />
      </div>

      {/* Slug */}
      <div style={fieldS}>
        <label style={labelS}>
          Slug（URL 路徑）
          <span style={{ fontSize: 11, color: '#909399', fontWeight: 400, marginLeft: 8 }}>
            前台路徑：/products/<strong>{slug || 'slug'}</strong>
          </span>
        </label>
        <div style={{ display: 'flex', gap: 8 }}>
          <input style={{ ...inputS, flex: 1, fontFamily: 'monospace' }} placeholder="category-slug" value={slug}
            onChange={e => { setAutoSlug(false); setSlug(e.target.value); }}
            onFocus={e => e.target.style.borderColor = '#409EFF'} onBlur={e => e.target.style.borderColor = '#DCDFE6'} />
          <button style={btnPlain2} onClick={() => { setAutoSlug(true); setSlug(toSlug(name)); }}>自動產生</button>
        </div>
      </div>

      {/* Description */}
      <div style={fieldS}>
        <label style={labelS}>分類描述 <span style={{ color: '#909399', fontWeight: 400 }}>(選填)</span></label>
        <textarea style={{ ...inputS, height: 72, padding: '8px 10px', resize: 'vertical' }}
          placeholder="顯示於前台分類頁面的簡短說明"
          value={desc} onChange={e => setDesc(e.target.value)}
          onFocus={e => e.target.style.borderColor = '#409EFF'} onBlur={e => e.target.style.borderColor = '#DCDFE6'} />
      </div>

      {/* Status + Order */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={labelS}>狀態</label>
          <div style={{ display: 'flex', gap: 0, border: '1px solid #DCDFE6' }}>
            {[['active', '啟用'], ['inactive', '停用']].map(([v, l]) => (
              <button key={v} onClick={() => setStatus(v)} style={{
                flex: 1, height: 32, border: 'none', borderRadius: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13,
                background: status === v ? '#303133' : '#fff', color: status === v ? '#fff' : '#606266',
              }}>{l}</button>
            ))}
          </div>
        </div>
        <div>
          <label style={labelS}>排序數字</label>
          <input style={inputS} type="number" min="1" value={order} onChange={e => setOrder(e.target.value)}
            onFocus={e => e.target.style.borderColor = '#409EFF'} onBlur={e => e.target.style.borderColor = '#DCDFE6'} />
          <div style={{ fontSize: 11, color: '#909399', marginTop: 4 }}>數字越小越靠前</div>
        </div>
      </div>
    </Dialog>
  );
}

// Styles
const btnPrimary = { height: 32, padding: '0 16px', background: '#303133', color: '#fff', border: '1px solid #303133', borderRadius: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14 };
const btnPlain = { height: 32, padding: '0 16px', background: '#fff', color: '#303133', border: '1px solid #DCDFE6', borderRadius: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14 };
const btnPrimary2 = { height: 32, padding: '0 20px', background: '#303133', color: '#fff', border: '1px solid #303133', borderRadius: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14 };
const btnPlain2 = { height: 32, padding: '0 16px', background: '#fff', color: '#606266', border: '1px solid #DCDFE6', borderRadius: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14 };
const thS = { background: '#F5F7FA', color: '#303133', fontWeight: 700, fontSize: 14, padding: '10px 12px', borderBottom: '1px solid #DCDFE6', textAlign: 'left' };
const tdS = { padding: '10px 12px', color: '#606266', borderBottom: '1px solid #EBEEF5', verticalAlign: 'middle' };
const textBtn = (color) => ({ background: 'none', border: 'none', color, cursor: 'pointer', fontSize: 13, fontFamily: 'inherit', padding: 0 });

Object.assign(window, { CategoryManagementPage });
