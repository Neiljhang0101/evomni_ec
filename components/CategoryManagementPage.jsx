// Screen: 產品分類管理 — 單層扁平列表

const SAMPLE_CATS = [
  { id: 'c1', name: '電子產品', createdAt: '2025-12-05 07:52:12', productCount: 42 },
  { id: 'c2', name: '服飾',     createdAt: '2025-12-05 07:52:12', productCount: 28 },
  { id: 'c3', name: '居家生活', createdAt: '2025-12-05 07:52:12', productCount: 19 },
  { id: 'c4', name: '運動戶外', createdAt: '2026-02-09 10:05:43', productCount: 11 },
  { id: 'c5', name: '美妝保養', createdAt: '2026-03-09 06:44:03', productCount: 7  },
  { id: 'c6', name: '測試分類pm', createdAt: '2026-03-26 08:46:43', productCount: 0 },
];

function CategoryManagementPage() {
  const [cats, setCats] = React.useState(SAMPLE_CATS);
  const [selected, setSelected] = React.useState([]);
  const [search, setSearch] = React.useState({ name: '', dateFrom: '', dateTo: '' });
  const [toast, setToast] = React.useState(null);
  const [dialog, setDialog] = React.useState(null); // null | { mode: 'add' | 'edit', item? }
  const [deleteDialog, setDeleteDialog] = React.useState(null);
  const [form, setForm] = React.useState({ name: '' });
  const [formError, setFormError] = React.useState('');
  const [dragIdx, setDragIdx] = React.useState(null);
  const [dragOverIdx, setDragOverIdx] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(20);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  // Filter
  const filtered = cats.filter(c => {
    if (search.name && !c.name.includes(search.name)) return false;
    if (search.dateFrom && c.createdAt < search.dateFrom) return false;
    if (search.dateTo && c.createdAt > search.dateTo + ' 99') return false;
    return true;
  });

  // Select
  const toggleAll = () => setSelected(selected.length === filtered.length ? [] : filtered.map(c => c.id));
  const toggleOne = id => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  // Add / Edit
  const openAdd = () => { setForm({ name: '' }); setFormError(''); setDialog({ mode: 'add' }); };
  const openEdit = item => { setForm({ name: item.name }); setFormError(''); setDialog({ mode: 'edit', item }); };
  const saveDialog = () => {
    if (!form.name.trim()) { setFormError('分類名稱為必填'); return; }
    if (dialog.mode === 'add') {
      const newCat = { id: 'c' + Date.now(), name: form.name.trim(), createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19), productCount: 0 };
      setCats(prev => [...prev, newCat]);
      showToast('分類已新增');
    } else {
      setCats(prev => prev.map(c => c.id === dialog.item.id ? { ...c, name: form.name.trim() } : c));
      showToast('分類已更新');
    }
    setDialog(null);
  };

  // Delete
  const confirmDelete = () => {
    if (deleteDialog === 'batch') {
      setCats(prev => prev.filter(c => !selected.includes(c.id)));
      setSelected([]);
      showToast(`已刪除 ${selected.length} 個分類`);
    } else {
      setCats(prev => prev.filter(c => c.id !== deleteDialog.id));
      setSelected(prev => prev.filter(x => x !== deleteDialog.id));
      showToast(`已刪除分類「${deleteDialog.name}」`);
    }
    setDeleteDialog(null);
  };

  // Drag to reorder
  const handleDragStart = idx => setDragIdx(idx);
  const handleDragOver = (e, idx) => { e.preventDefault(); setDragOverIdx(idx); };
  const handleDrop = idx => {
    if (dragIdx === null || dragIdx === idx) { setDragIdx(null); setDragOverIdx(null); return; }
    const next = [...cats];
    const [moved] = next.splice(dragIdx, 1);
    next.splice(idx, 0, moved);
    setCats(next);
    setDragIdx(null);
    setDragOverIdx(null);
  };

  const inputS = { height: 40, padding: '0 10px', border: '1px solid #DCDFE6', borderRadius: 0, fontSize: 14, color: '#303133', background: '#fff', outline: 'none' };

  return (
    <div style={{ position: 'relative' }}>
      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: 64, right: 24, zIndex: 9999, background: '#f0f9eb', border: '1px solid #c2e7b0', borderRadius: 3, color: '#67C23A', padding: '10px 20px', fontSize: 14 }}>
          {toast.msg}
        </div>
      )}

      {/* Add/Edit Dialog */}
      {dialog && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={() => setDialog(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
          <div style={{ position: 'relative', background: '#fff', width: 440, maxWidth: '90vw' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #DCDFE6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>{dialog.mode === 'add' ? '新增產品分類' : '編輯產品分類'}</span>
              <button onClick={() => setDialog(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#909399' }}>×</button>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, color: '#606266', marginBottom: 6 }}>
                  <span style={{ color: '#F56C6C', marginRight: 2 }}>*</span>分類名稱
                </label>
                <input
                  value={form.name}
                  onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setFormError(''); }}
                  placeholder="請輸入分類名稱（最多 50 字）"
                  maxLength={50}
                  autoFocus
                  style={{ ...inputS, width: '100%' }}
                  onFocus={e => e.target.style.borderColor = '#409EFF'}
                  onBlur={e => e.target.style.borderColor = '#DCDFE6'}
                />
                {formError && <div style={{ fontSize: 12, color: '#F56C6C', marginTop: 4 }}>{formError}</div>}
              </div>
            </div>
            <div style={{ padding: '12px 20px', borderTop: '1px solid #DCDFE6', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setDialog(null)} style={plainBtn}>取消</button>
              <button onClick={saveDialog} style={primaryBtn}>儲存</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Dialog */}
      {deleteDialog && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={() => setDeleteDialog(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
          <div style={{ position: 'relative', background: '#fff', width: 420, maxWidth: '90vw' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #DCDFE6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>確認刪除</span>
              <button onClick={() => setDeleteDialog(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#909399' }}>×</button>
            </div>
            <div style={{ padding: 20 }}>
              <p style={{ fontSize: 14, color: '#606266', lineHeight: 1.7 }}>
                {deleteDialog === 'batch'
                  ? `確定刪除選取的 ${selected.length} 個分類？已套用此分類的產品將自動移除分類標籤。`
                  : `確定刪除分類「${deleteDialog.name}」？已套用此分類的 ${deleteDialog.productCount} 件產品將自動移除此分類標籤。`
                }
              </p>
            </div>
            <div style={{ padding: '12px 20px', borderTop: '1px solid #DCDFE6', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setDeleteDialog(null)} style={plainBtn}>取消</button>
              <button onClick={confirmDelete} style={{ ...dangerBtn }}>確認刪除</button>
            </div>
          </div>
        </div>
      )}

      <PageHeader title="產品分類" breadcrumbs={['產品中心', '產品分類']} />

      {/* Search bar — no background, sits on page bg */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 12, color: '#606266' }}>分類名稱</label>
            <input
              value={search.name}
              onChange={e => setSearch(s => ({ ...s, name: e.target.value }))}
              placeholder="請輸入分類名稱"
              style={{ ...inputS, width: 180 }}
              onFocus={e => e.target.style.borderColor = '#409EFF'}
              onBlur={e => e.target.style.borderColor = '#DCDFE6'}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 12, color: '#606266' }}>日期區間</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input type="date" value={search.dateFrom} onChange={e => setSearch(s => ({ ...s, dateFrom: e.target.value }))}
                style={{ ...inputS, width: 140 }} />
              <span style={{ color: '#909399', fontSize: 13 }}>至</span>
              <input type="date" value={search.dateTo} onChange={e => setSearch(s => ({ ...s, dateTo: e.target.value }))}
                style={{ ...inputS, width: 140 }} />
            </div>
          </div>
          <button onClick={() => setSearch({ name: '', dateFrom: '', dateTo: '' })} style={plainBtn}>清除</button>
          <button style={primaryBtn}>搜尋</button>
        </div>
      </div>

      {/* Action bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        {selected.length > 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13, color: '#409EFF' }}>已選 <strong>{selected.length}</strong> 筆</span>
            <button onClick={() => setDeleteDialog('batch')} style={{ ...dangerBtn, height: 32, fontSize: 13 }}>批次刪除</button>
            <button onClick={() => setSelected([])} style={{ background: 'none', border: 'none', color: '#909399', cursor: 'pointer', fontSize: 13 }}>取消選取</button>
          </div>
        ) : <div />}
        <button onClick={openAdd} style={createBtn}>+ 新增產品分類</button>
      </div>

      {/* Table */}
      <TableWrapper>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr>
              <th style={{ ...tableThStyle, width: 44 }}>
                <input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={toggleAll} style={{ accentColor: '#409EFF' }} />
              </th>
              <th style={{ ...tableThStyle, width: 60 }}>項次</th>
              <th style={{ ...tableThStyle, width: 60 }}>排序</th>
              <th style={tableThStyle}>分類名稱</th>
              <th style={{ ...tableThStyle, width: 200 }}>建立日期</th>
              <th style={{ ...tableThStyle, width: 100 }}>查看內容</th>
              <th style={{ ...tableThStyle, width: 120 }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((cat, idx) => (
              <tr key={cat.id}
                draggable
                onDragStart={() => handleDragStart(idx)}
                onDragOver={e => handleDragOver(e, idx)}
                onDrop={() => handleDrop(idx)}
                onDragEnd={() => { setDragIdx(null); setDragOverIdx(null); }}
                style={{
                  background: selected.includes(cat.id) ? tableRowSelectedBg : (dragOverIdx === idx ? '#F0F7FF' : tableRowBg(idx)),
                  borderLeft: dragOverIdx === idx ? '2px solid #409EFF' : '2px solid transparent',
                }}
                {...tableRowHandlers(idx, selected.includes(cat.id))}>
                <td style={tableTdStyle}>
                  <input type="checkbox" checked={selected.includes(cat.id)} onChange={() => toggleOne(cat.id)} style={{ accentColor: '#409EFF' }} />
                </td>
                <td style={{ ...tableTdStyle, color: '#909399' }}>{(currentPage - 1) * pageSize + idx + 1}</td>
                <td style={{ ...tableTdStyle, textAlign: 'center', cursor: 'grab', color: '#C0C4CC', fontSize: 18 }}>⠿</td>
                <td style={{ ...tableTdStyle, fontWeight: 500, color: '#303133' }}>{cat.name}</td>
                <td style={{ ...tableTdStyle, color: '#909399' }}>{cat.createdAt}</td>
                <td style={tableTdStyle}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#409EFF', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="1" y="2" width="12" height="10" rx="1" stroke="#409EFF" strokeWidth="1.2" fill="none"/>
                      <line x1="3" y1="5" x2="11" y2="5" stroke="#409EFF" strokeWidth="1.2" strokeLinecap="round"/>
                      <line x1="3" y1="7.5" x2="11" y2="7.5" stroke="#409EFF" strokeWidth="1.2" strokeLinecap="round"/>
                      <line x1="3" y1="10" x2="7" y2="10" stroke="#409EFF" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    查看
                  </button>
                </td>
                <td style={tableTdStyle}>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={() => openEdit(cat)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#409EFF', fontSize: 13, padding: 0 }}>編輯</button>
                    <button onClick={() => setDeleteDialog(cat)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#F56C6C', fontSize: 13, padding: 0 }}>刪除</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrapper>

      {filtered.length === 0 && (
        <div style={{ padding: '48px 0', textAlign: 'center', color: '#909399' }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, color: '#606266' }}>找不到符合條件的分類</div>
          <div style={{ fontSize: 13 }}>請嘗試清除篩選條件</div>
        </div>
      )}

      <Pagination
        total={filtered.length}
        page={currentPage}
        pageSize={pageSize}
        pageSizes={[20, 50, 100]}
        onChange={setCurrentPage}
        onPageSizeChange={ps => { setPageSize(ps); setCurrentPage(1); }}
        style={{ borderTop: '1px solid #EBEEF5', padding: '10px 12px' }}
      />
    </div>
  );
}

Object.assign(window, { CategoryManagementPage });
