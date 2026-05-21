// Screen 1: 產品列表

const SAMPLE_PRODUCTS = [
{ id: 'P-0048', title: '夏日純棉T恤', sku: 'SKU-T001', category: '女裝', status: 'published', stock: 32, price: 'NT$ 880', salePrice: null, updated: '2026-05-01' },
{ id: 'P-0047', title: '輕量慢跑鞋 Pro', sku: 'SKU-S002', category: '鞋款', status: 'published', stock: 3, price: 'NT$ 2,490', salePrice: 'NT$ 1,990', updated: '2026-04-28' },
{ id: 'P-0046', title: '帆布後背包', sku: 'SKU-B003', category: '配件', status: 'draft', stock: 0, price: 'NT$ 1,200', salePrice: null, updated: '2026-04-25' },
{ id: 'P-0045', title: '有機棉兒童內衣組', sku: 'SKU-K004', category: '童裝', status: 'scheduled', stock: 100, price: 'NT$ 450', salePrice: null, updated: '2026-04-20' },
{ id: 'P-0044', title: '羊毛混紡圍巾', sku: 'SKU-C005', category: '配件', status: 'unpublished', stock: 14, price: 'NT$ 680', salePrice: null, updated: '2026-04-15' },
{ id: 'P-0043', title: '防水風衣外套', sku: 'SKU-J006', category: '外套', status: 'published', stock: 8, price: 'NT$ 3,200', salePrice: 'NT$ 2,560', updated: '2026-04-10' }];


function ProductListPage({ onNavigate }) {
  const [products, setProducts] = React.useState(SAMPLE_PRODUCTS);
  const [selected, setSelected] = React.useState([]);
  const [keyword, setKeyword] = React.useState('');
  const [filterCategory, setFilterCategory] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');
  const [toast, setToast] = React.useState(null);
  const [deleteModal, setDeleteModal] = React.useState(null);
  const [batchDropdownOpen, setBatchDropdownOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(20);
  const [csvDialogOpen, setCsvDialogOpen] = React.useState(false);
  const [sort, setSort] = React.useState({ field: 'updated', dir: 'desc' });

  const toggleSort = (field) => {
    setSort(prev =>
      prev.field === field
        ? { field, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
        : { field, dir: 'desc' }
    );
  };

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const statusConfig = {
    published: { label: '已上架', type: 'success' },
    unpublished: { label: '已下架', type: 'info' },
    draft: { label: '草稿', type: 'warning' },
    scheduled: { label: '已排程', type: 'primary' }
  };

  const LOW_STOCK_THRESHOLD = 5;

  const filtered = products.filter((p) => {
    const kw = keyword.toLowerCase();
    if (kw && !p.title.toLowerCase().includes(kw) && !p.sku.toLowerCase().includes(kw)) return false;
    if (filterCategory && p.category !== filterCategory) return false;
    if (filterStatus && p.status !== filterStatus) return false;
    return true;
  });

  const parsePrice = (str) => parseInt((str || '0').replace(/[^\d]/g, '')) || 0;

  const sorted = [...filtered].sort((a, b) => {
    const d = sort.dir === 'asc' ? 1 : -1;
    switch (sort.field) {
      case 'updated': return a.updated.localeCompare(b.updated) * d;
      case 'stock':   return (a.stock - b.stock) * d;
      case 'price':   return (parsePrice(a.price) - parsePrice(b.price)) * d;
      default:        return 0;
    }
  });

  const allChecked = selected.length > 0 && selected.length === sorted.length;
  const toggleAll = () => setSelected(allChecked ? [] : sorted.map((p) => p.id));
  const toggleOne = (id) => setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const handleDelete = (product) => {
    setProducts((prev) => prev.filter((p) => p.id !== product.id));
    setDeleteModal(null);
    showToast(`已刪除產品`);
  };

  const handleBatchAction = (action) => {
    setBatchDropdownOpen(false);
    if (action === 'publish') showToast(`已上架 ${selected.length} 件產品`);
    if (action === 'unpublish') showToast(`已下架 ${selected.length} 件產品`);
    if (action === 'delete') {
      setProducts((prev) => prev.filter((p) => !selected.includes(p.id)));
      showToast(`已刪除 ${selected.length} 件產品`);
      setSelected([]);
    }
  };

  const stockDisplay = (product) => {
    if (product.stock === 0) return <span style={{ color: '#F56C6C', fontWeight: 600 }}>0</span>;
    if (product.stock <= LOW_STOCK_THRESHOLD) return <span style={{ color: '#F56C6C' }}>⚠ {product.stock}</span>;
    return <span>{product.stock}</span>;
  };

  const priceDisplay = (product) => {
    if (product.salePrice) return (
      <div>
        <span style={{ color: '#F56C6C', fontWeight: 600 }}>{product.salePrice}</span>
        <span style={{ color: '#909399', textDecoration: 'line-through', fontSize: 12, marginLeft: 6 }}>{product.price}</span>
      </div>);

    return <span>{product.price}</span>;
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Toast */}
      {toast &&
      <div style={{
        position: 'fixed', top: 64, right: 24, zIndex: 9999,
        background: toast.type === 'success' ? '#f0f9eb' : toast.type === 'danger' ? '#fef0f0' : '#f4f4f5',
        border: `1px solid ${toast.type === 'success' ? '#c2e7b0' : toast.type === 'danger' ? '#fbc4c4' : '#d3d4d6'}`,
        color: toast.type === 'success' ? '#67C23A' : toast.type === 'danger' ? '#F56C6C' : '#909399',
        padding: '10px 20px', fontSize: 14, minWidth: 240
      }}>{toast.msg}</div>
      }

      {/* Delete Modal */}
      {deleteModal &&
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9998, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', border: '1px solid #DCDFE6', width: 400, padding: 24 }}>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>確定要刪除「{deleteModal.title}」嗎？</div>
            <div style={{ fontSize: 14, color: '#606266', marginBottom: 24 }}>此操作無法復原。產品將進入回收狀態，已成立的訂單不受影響。</div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setDeleteModal(null)} style={plainBtn}>取消</button>
              <button onClick={() => handleDelete(deleteModal)} style={dangerBtn}>刪除產品</button>
            </div>
          </div>
        </div>
      }

      {/* CSV Dialog */}
      {csvDialogOpen && <CsvImportDialog onClose={() => setCsvDialogOpen(false)} onSuccess={(n) => {setCsvDialogOpen(false);showToast(`批次匯入完成！已成功匯入 ${n} 件產品。`);}} />}

      <PageHeader title="產品管理" breadcrumbs={['產品中心', '產品管理']} />

      {/* Filter Bar — 無卡片包裝，直接在頁面背景上 */}
      <div style={{ marginBottom: 16 }}>
        {/* Row 1: filter fields */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end', marginBottom: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={labelStyle}>關鍵字</label>
            <input
              placeholder="產品名稱、產品編號或規格編號（SKU）"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{ ...inputStyle, width: 200 }}
              onFocus={(e) => e.target.style.borderColor = '#409EFF'}
              onBlur={(e) => e.target.style.borderColor = '#DCDFE6'} />
            
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={labelStyle}>分類</label>
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} style={{ ...selectStyle, width: 150 }}>
              <option value="">請選擇分類</option>
              {['女裝', '鞋款', '配件', '童裝', '外套'].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={labelStyle}>最低價格</label>
            <input placeholder="最低" style={{ ...inputStyle, width: 72 }} onFocus={(e) => e.target.style.borderColor = '#409EFF'} onBlur={(e) => e.target.style.borderColor = '#DCDFE6'} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={labelStyle}>最高價格</label>
            <input placeholder="最高" style={{ ...inputStyle, width: 72 }} onFocus={(e) => e.target.style.borderColor = '#409EFF'} onBlur={(e) => e.target.style.borderColor = '#DCDFE6'} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={labelStyle}>狀態</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ ...selectStyle, width: 110 }}>
              <option value="">狀態</option>
              <option value="published">已上架</option>
              <option value="unpublished">已下架</option>
              <option value="draft">草稿</option>
              <option value="scheduled">已排程</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={labelStyle}>建立日期</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <input type="date" style={{ ...inputStyle, width: 130 }} onFocus={(e) => e.target.style.borderColor = '#409EFF'} onBlur={(e) => e.target.style.borderColor = '#DCDFE6'} />
              <span style={{ color: '#909399', fontSize: 13 }}>至</span>
              <input type="date" style={{ ...inputStyle, width: 130 }} onFocus={(e) => e.target.style.borderColor = '#409EFF'} onBlur={(e) => e.target.style.borderColor = '#DCDFE6'} />
            </div>
          </div>
          {/* 清除 + 搜尋 同排最右 */}
          <div style={{ display: 'flex', gap: 8, alignSelf: 'flex-end' }}>
            <button style={plainBtn} onClick={() => {setKeyword('');setFilterCategory('');setFilterStatus('');}}>清除</button>
            <button style={primaryBtn}>搜尋</button>
          </div>
        </div>
      </div>

      {/* Action Bar — 匯入、批次操作、新增產品 右對齊 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, marginBottom: 12 }}>
        {selected.length > 0 &&
        <span style={{ fontSize: 14, color: '#606266', marginRight: 'auto' }}>已選取 {selected.length} 件產品</span>
        }
        <button style={plainBtn} onClick={() => setCsvDialogOpen(true)}>匯入</button>
        <div style={{ position: 'relative' }}>
          <button
            style={{ ...plainBtn, opacity: selected.length === 0 ? 0.5 : 1 }}
            disabled={selected.length === 0}
            onClick={() => setBatchDropdownOpen((o) => !o)}>
            
            批次操作 ▾
          </button>
          {batchDropdownOpen && selected.length > 0 &&
          <div style={{ position: 'absolute', top: '100%', right: 0, background: '#fff', border: '1px solid #DCDFE6', zIndex: 100, minWidth: 140, marginTop: 2 }}>
              {[
            { action: 'publish', label: '批次上架' },
            { action: 'unpublish', label: '批次下架' },
            { action: 'delete', label: '批次刪除', danger: true }].
            map((item) =>
            <div key={item.action} onClick={() => handleBatchAction(item.action)}
            style={{ padding: '8px 16px', cursor: 'pointer', fontSize: 14, color: item.danger ? '#F56C6C' : '#303133' }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#F5F7FA'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}>
              {item.label}</div>
            )}
            </div>
          }
        </div>
        <button style={createBtn} onClick={() => onNavigate('product-add')}>+ 新增產品</button>
      </div>

      {/* Table */}
      <TableWrapper>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr>
              <th style={{ ...tableThStyle, width: 40 }}>
                <input type="checkbox" checked={allChecked} onChange={toggleAll} style={{ accentColor: '#303133' }} />
              </th>
              <th style={{ ...tableThStyle, minWidth: 200 }}>產品/型號</th>
              <th style={{ ...tableThStyle, width: 80 }}>ID</th>
              <th style={{ ...tableThStyle, width: 140, cursor: 'pointer', userSelect: 'none' }} onClick={() => toggleSort('price')}>
                價格{SortIndicator(sort, 'price')}
              </th>
              <th style={{ ...tableThStyle, width: 100 }}>分類</th>
              <th style={{ ...tableThStyle, width: 120, cursor: 'pointer', userSelect: 'none' }} onClick={() => toggleSort('updated')}>
                建立日期{SortIndicator(sort, 'updated')}
              </th>
              <th style={{ ...tableThStyle, width: 80, cursor: 'pointer', userSelect: 'none' }} onClick={() => toggleSort('stock')}>
                <span title="低於5件顯示警告">庫存 ⓘ</span>{SortIndicator(sort, 'stock')}
              </th>
              <th style={{ ...tableThStyle, width: 80 }}>狀態</th>
              <th style={{ ...tableThStyle, width: 160 }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ?
            <tr>
                <td colSpan={9} style={{ padding: '48px 0', textAlign: 'center', color: '#909399' }}>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>找不到符合的產品</div>
                  <div style={{ fontSize: 13, marginBottom: 16 }}>試試看調整關鍵字，或清除篩選條件</div>
                  <button style={plainBtn} onClick={() => {setKeyword('');setFilterCategory('');setFilterStatus('');}}>清除篩選</button>
                </td>
              </tr> :
            sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((product, pi) => {
            const i = (currentPage - 1) * pageSize + pi;
            return (
            <tr key={product.id}
            style={{ background: selected.includes(product.id) ? tableRowSelectedBg : tableRowBg(i) }}
            {...tableRowHandlers(i, selected.includes(product.id))}>
              
                <td style={tableTdStyle}>
                  <input type="checkbox" checked={selected.includes(product.id)} onChange={() => toggleOne(product.id)} style={{ accentColor: '#303133' }} />
                </td>
                <td style={{ ...tableTdStyle, width: "378px" }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: "flex-start", width: "249px" }}>
                    <div style={{ width: 48, height: 48, background: '#F5F7FA', border: '1px solid #DCDFE6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C0C4CC', fontSize: 20, flexShrink: 0 }}>◫</div>
                    <div>
                      <div style={{ color: '#303133', fontWeight: 500, cursor: 'pointer' }} onClick={() => onNavigate('product-edit')}>{product.title}</div>
                      <div style={{ color: '#909399', fontSize: 12 }}>{product.sku}</div>
                    </div>
                  </div>
                </td>
                <td style={{ ...tableTdStyle, color: '#909399' }}>{product.id}</td>
                <td style={tableTdStyle}>{priceDisplay(product)}</td>
                <td style={tableTdStyle}>{product.category}</td>
                <td style={{ ...tableTdStyle, color: '#909399' }}>{product.updated}</td>
                <td style={tableTdStyle}>{stockDisplay(product)}</td>
                <td style={{ ...tableTdStyle, padding: "10px 0px 10px 10px", width: "91px" }}><StatusTag type={statusConfig[product.status].type}>{statusConfig[product.status].label}</StatusTag></td>
                <td style={tableTdStyle}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <button style={textBtn('#409EFF')} onClick={() => onNavigate('product-edit')}>編輯</button>
                    <button style={textBtn('#909399')} onClick={() => showToast(`已複製「${product.title}」為草稿`)}>複製</button>
                    <button style={textBtn('#F56C6C')} onClick={() => setDeleteModal(product)}>刪除</button>
                  </div>
                </td>
              </tr>
            );
            })}
          </tbody>
        </table>
      </TableWrapper>

      <Pagination
        total={filtered.length}
        page={currentPage}
        pageSize={pageSize}
        pageSizes={[20, 50, 100]}
        onChange={setCurrentPage}
        onPageSizeChange={ps => { setPageSize(ps); setCurrentPage(1); }}
        style={{ borderTop: '1px solid #EBEEF5', padding: '10px 12px' }}
      />
    </div>);

}

// ── Sort indicator ────────────────────────────────────────────────────────
function SortIndicator(sort, field) {
  const active = sort.field === field;
  return (
    <span style={{ marginLeft: 4, fontSize: 11, color: active ? '#409EFF' : '#C0C4CC' }}>
      {active ? (sort.dir === 'asc' ? '↑' : '↓') : '↕'}
    </span>
  );
}

// ── Shared button styles ───────────────────────────────────────────────────
const primaryBtn = { height: 40, padding: '0 16px', background: '#303133', color: '#fff', border: '1px solid #303133', borderRadius: 0, cursor: 'pointer', fontFamily: 'Noto Sans TC, sans-serif', fontSize: 14, whiteSpace: 'nowrap' };
const createBtn  = { height: 40, padding: '0 16px', background: '#409EFF', color: '#fff', border: '1px solid #409EFF', borderRadius: 0, cursor: 'pointer', fontFamily: 'Noto Sans TC, sans-serif', fontSize: 14, whiteSpace: 'nowrap' };
const plainBtn = { height: 40, padding: '0 16px', background: '#fff', color: '#303133', border: '1px solid #DCDFE6', borderRadius: 0, cursor: 'pointer', fontFamily: 'Noto Sans TC, sans-serif', fontSize: 14 };
const dangerBtn = { height: 40, padding: '0 16px', background: '#F56C6C', color: '#fff', border: '1px solid #F56C6C', borderRadius: 0, cursor: 'pointer', fontFamily: 'Noto Sans TC, sans-serif', fontSize: 14 };
const textBtn = (color) => ({ background: 'none', border: 'none', color, cursor: 'pointer', fontSize: 14, fontFamily: 'inherit', padding: 0 });
const inputStyle = { height: 40, padding: '0 12px', border: '1px solid #DCDFE6', borderRadius: 0, fontSize: 14, color: '#303133', outline: 'none', fontFamily: 'Noto Sans TC, sans-serif' };
const selectStyle = { height: 40, padding: '0 12px', border: '1px solid #DCDFE6', borderRadius: 0, fontSize: 14, color: '#303133', background: '#fff', outline: 'none', fontFamily: 'Noto Sans TC, sans-serif' };
const labelStyle = { fontSize: 13, color: '#606266' };
Object.assign(window, { ProductListPage, primaryBtn, plainBtn, dangerBtn, textBtn, inputStyle, selectStyle, labelStyle });