// Screen 5: 庫存管理

const SAMPLE_INVENTORY = [
  {
    id: 'P-0048', name: '夏日純棉T恤', expanded: false,
    skus: [
      { spec: '紅色 / S', stock: 12, threshold: 5, status: 'normal' },
      { spec: '紅色 / M', stock: 3, threshold: 5, status: 'low_stock' },
      { spec: '藍色 / S', stock: 0, threshold: 5, status: 'out_of_stock' },
      { spec: '藍色 / M', stock: 17, threshold: 5, status: 'normal' },
    ]
  },
  {
    id: 'P-0047', name: '輕量慢跑鞋 Pro', expanded: false,
    skus: [
      { spec: '黑色 / 38', stock: 2, threshold: 3, status: 'low_stock' },
      { spec: '黑色 / 39', stock: 8, threshold: 3, status: 'normal' },
      { spec: '白色 / 38', stock: 0, threshold: 3, status: 'out_of_stock' },
    ]
  },
  {
    id: 'P-0046', name: '帆布後背包', expanded: false,
    skus: [
      { spec: '深藍', stock: 34, threshold: 5, status: 'normal' },
      { spec: '米白', stock: 12, threshold: 5, status: 'normal' },
    ]
  },
  {
    id: 'P-0045', name: '有機棉兒童內衣組', expanded: false,
    skus: [
      { spec: '粉紅 / 90cm', stock: 45, threshold: 10, status: 'normal' },
      { spec: '粉紅 / 100cm', stock: 30, threshold: 10, status: 'normal' },
    ]
  },
  {
    id: 'P-0044', name: '羊毛混紡圍巾', expanded: false,
    skus: [
      { spec: '深灰', stock: 4, threshold: 5, status: 'low_stock' },
      { spec: '米色', stock: 10, threshold: 5, status: 'normal' },
    ]
  },
];

const NOTIFY_SUBSCRIPTIONS = [
  { id: 'P-0046', name: '帆布後背包（黑色）', subscribers: 23, status: 'pending', emails: ['user1@example.com','user2@example.com','user3@example.com'] },
  { id: 'P-0047s', name: '輕量慢跑鞋 Pro（白色 / 38）', subscribers: 8, status: 'auto_notified', emails: ['alice@example.com','bob@example.com'] },
];

function InventoryManagementPage() {
  const [activeTab, setActiveTab] = React.useState('all');
  const [inventory, setInventory] = React.useState(SAMPLE_INVENTORY);
  const [keyword, setKeyword] = React.useState('');
  const [editingCell, setEditingCell] = React.useState(null); // { productId, skuIdx }
  const [editValue, setEditValue] = React.useState('');
  const [editNote, setEditNote] = React.useState('');
  const [toast, setToast] = React.useState(null);
  const [logDrawer, setLogDrawer] = React.useState(null);
  const [zeroConfirm, setZeroConfirm] = React.useState(null);
  const [notifyExpanded, setNotifyExpanded] = React.useState({});
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(20);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleExpand = (productId) => {
    setInventory(prev => prev.map(p => p.id === productId ? { ...p, expanded: !p.expanded } : p));
  };

  const startEdit = (productId, skuIdx, currentStock) => {
    setEditingCell({ productId, skuIdx });
    setEditValue(String(currentStock));
    setEditNote('');
  };

  const cancelEdit = () => {
    setEditingCell(null);
    setEditValue('');
    setEditNote('');
  };

  const confirmEdit = (productId, skuIdx) => {
    const newStock = parseInt(editValue, 10);
    if (isNaN(newStock) || newStock < 0) {
      showToast('庫存數量不得為負數', 'danger');
      return;
    }
    if (newStock === 0) {
      setZeroConfirm({ productId, skuIdx, newStock });
      return;
    }
    applyStockUpdate(productId, skuIdx, newStock);
  };

  const applyStockUpdate = (productId, skuIdx, newStock) => {
    const oldStock = inventory.find(p => p.id === productId)?.skus[skuIdx]?.stock;
    setInventory(prev => prev.map(p => {
      if (p.id !== productId) return p;
      const skus = p.skus.map((s, i) => {
        if (i !== skuIdx) return s;
        const status = newStock === 0 ? 'out_of_stock' : newStock <= s.threshold ? 'low_stock' : 'normal';
        return { ...s, stock: newStock, status };
      });
      return { ...p, skus };
    }));
    showToast(`庫存已從 ${oldStock} 更新為 ${newStock}，調整紀錄已儲存。`);
    cancelEdit();
    setZeroConfirm(null);
  };

  const lowStockCount = inventory.reduce((acc, p) => acc + p.skus.filter(s => s.status === 'low_stock').length, 0);
  const outOfStockCount = inventory.reduce((acc, p) => acc + p.skus.filter(s => s.status === 'out_of_stock').length, 0);

  const getFilteredInventory = () => {
    let result = inventory;
    if (keyword) result = result.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()));
    if (activeTab === 'low') result = result.filter(p => p.skus.some(s => s.status === 'low_stock'));
    if (activeTab === 'out') result = result.filter(p => p.skus.some(s => s.status === 'out_of_stock'));
    return result;
  };

  const tabs = [
    { key: 'all', label: '全部產品' },
    { key: 'low', label: '低庫存', count: lowStockCount, danger: true },
    { key: 'out', label: '售完', count: outOfStockCount },
    { key: 'notify', label: '貨到通知管理' },
  ];

  const notifyStatusConfig = {
    pending: { label: '待通知', type: 'warning' },
    auto_notified: { label: '已自動通知', type: 'success' },
    manual_marked: { label: '已手動標記', type: 'primary' },
  };

  const SAMPLE_LOGS = [
    { time: '2026-05-01 10:23', before: 10, after: 32, operator: '系統管理員', note: '補貨入庫' },
    { time: '2026-04-28 14:05', before: 14, after: 10, operator: '系統管理員', note: '盤點調整' },
    { time: '2026-04-20 09:12', before: 20, after: 14, operator: '系統管理員', note: '' },
  ];

  return (
    <div style={{ position: 'relative' }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: 64, right: 24, zIndex: 9999,
          background: toast.type === 'success' ? '#f0f9eb' : '#fef0f0',
          border: `1px solid ${toast.type === 'success' ? '#c2e7b0' : '#fbc4c4'}`,
          color: toast.type === 'success' ? '#67C23A' : '#F56C6C',
          padding: '10px 20px', fontSize: 14, minWidth: 300,
        }}>{toast.msg}</div>
      )}

      {/* Zero confirm */}
      {zeroConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9998, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', border: '1px solid #DCDFE6', width: 400, padding: 24 }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>確定將庫存設為 0？</div>
            <div style={{ fontSize: 14, color: '#606266', marginBottom: 24 }}>庫存設為 0 後，前台產品頁將顯示「售完」，消費者將無法將此產品加入購物車。</div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button style={plainBtn} onClick={() => { setZeroConfirm(null); cancelEdit(); }}>取消</button>
              <button style={dangerBtn} onClick={() => applyStockUpdate(zeroConfirm.productId, zeroConfirm.skuIdx, 0)}>確定設為 0</button>
            </div>
          </div>
        </div>
      )}

      {/* Log Drawer */}
      {logDrawer && (
        <>
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 9990 }} onClick={() => setLogDrawer(null)} />
          <div style={{
            position: 'fixed', top: 0, right: 0, height: '100%', width: 560,
            background: '#fff', borderLeft: '1px solid #DCDFE6', zIndex: 9991,
            display: 'flex', flexDirection: 'column',
            animation: 'slideIn 0.25s ease-in-out',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid #DCDFE6' }}>
              <span style={{ fontSize: 15, fontWeight: 600 }}>庫存調整紀錄 — {logDrawer.name} · {logDrawer.spec}</span>
              <button onClick={() => setLogDrawer(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#909399' }}>×</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr>
                    {['調整時間', '調整前', '調整後', '操作人員', '備註'].map(h => (
                      <th key={h} style={{ ...tableThStyle, textAlign: 'left', fontSize: 13 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SAMPLE_LOGS.map((log, i) => (
                    <tr key={i}>
                      <td style={{ ...tableTdStyle, fontSize: 14 }}>{log.time}</td>
                      <td style={{ ...tableTdStyle, fontSize: 14 }}>{log.before}</td>
                      <td style={{ ...tableTdStyle, fontSize: 14, color: log.after > log.before ? '#67C23A' : '#F56C6C', fontWeight: 600 }}>{log.after}</td>
                      <td style={{ ...tableTdStyle, fontSize: 14 }}>{log.operator}</td>
                      <td style={{ ...tableTdStyle, fontSize: 14, color: '#909399' }}>{log.note || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <PageHeader title="庫存管理" breadcrumbs={['產品中心', '庫存管理']} />

      {/* Tabs + Search */}
      <TabSearchBar
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={key => { setActiveTab(key); setCurrentPage(1); }}
      >
        {activeTab !== 'notify' && (
          <div style={{ padding: '10px 16px' }}>
            <input value={keyword} onChange={e => setKeyword(e.target.value)}
              placeholder="搜尋產品名稱" style={{ ...inputStyle, width: 240 }}
              onFocus={e => e.target.style.borderColor = '#409EFF'}
              onBlur={e => e.target.style.borderColor = '#DCDFE6'}
            />
          </div>
        )}
      </TabSearchBar>

      {activeTab !== 'notify' ? (
        <>
          {/* Inventory Table */}
          <TableWrapper>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr>
                  <th style={{ ...tableThStyle, width: 40 }}></th>
                  <th style={{ ...tableThStyle, textAlign: 'left', minWidth: 200 }}>產品名稱 / SKU 規格</th>
                  <th style={{ ...tableThStyle, textAlign: 'left', width: 120 }}>現有庫存</th>
                  <th style={{ ...tableThStyle, textAlign: 'left', width: 100 }}>低庫存閾值</th>
                  <th style={{ ...tableThStyle, textAlign: 'left', width: 120 }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {getFilteredInventory().length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ padding: '48px 0', textAlign: 'center', color: '#909399' }}>
                      {activeTab === 'low' ? (
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>目前沒有低庫存產品</div>
                          <div style={{ fontSize: 13 }}>所有產品的庫存量都在安全範圍內</div>
                        </div>
                      ) : activeTab === 'out' ? (
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>目前沒有售完的產品</div>
                          <div style={{ fontSize: 13 }}>所有產品都有可用庫存</div>
                        </div>
                      ) : (
                        <div style={{ fontSize: 14 }}>找不到符合的產品</div>
                      )}
                    </td>
                  </tr>
                ) : getFilteredInventory().slice((currentPage - 1) * pageSize, currentPage * pageSize).map((product, i) => (
                  <React.Fragment key={product.id}>
                    {/* Product row */}
                    <tr style={{ background: tableRowBg(i) }} {...tableRowHandlers(i, false)}>
                      <td style={{ ...tableTdStyle, textAlign: 'center' }}>
                        <button onClick={() => toggleExpand(product.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#909399', fontSize: 12 }}>
                          {product.expanded ? '▾' : '▸'}
                        </button>
                      </td>
                      <td style={{ ...tableTdStyle, fontWeight: 600, color: '#303133' }} colSpan={4}>
                        <span style={{ cursor: 'pointer' }} onClick={() => toggleExpand(product.id)}>{product.name}</span>
                        <span style={{ fontSize: 12, color: '#909399', marginLeft: 8 }}>{product.id}</span>
                      </td>
                    </tr>
                    {/* SKU rows */}
                    {product.expanded && product.skus.map((sku, si) => {
                      const isEditing = editingCell && editingCell.productId === product.id && editingCell.skuIdx === si;
                      return (
                        <tr key={si}
                          style={{ background: tableRowBg(si) }}
                          {...tableRowHandlers(si, false)}
                        >
                          <td style={tableTdStyle}></td>
                          <td style={{ ...tableTdStyle, paddingLeft: 32, color: '#606266' }}>{sku.spec}</td>
                          <td style={tableTdStyle}>
                            {isEditing ? (
                              <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                                  <input value={editValue} onChange={e => setEditValue(e.target.value)}
                                    type="number" min="0"
                                    style={{ ...inputStyle, width: 80 }}
                                    onFocus={e => e.target.style.borderColor = '#409EFF'}
                                    onBlur={e => e.target.style.borderColor = '#DCDFE6'}
                                    onKeyDown={e => { if (e.key === 'Enter') confirmEdit(product.id, si); if (e.key === 'Escape') cancelEdit(); }}
                                    autoFocus
                                  />
                                  <button onClick={() => confirmEdit(product.id, si)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#67C23A', fontSize: 16 }}>✓</button>
                                  <button onClick={cancelEdit} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#909399', fontSize: 16 }}>✕</button>
                                </div>
                                <input value={editNote} onChange={e => setEditNote(e.target.value)}
                                  placeholder="填寫調整原因（選填）"
                                  style={{ ...inputStyle, width: 200, fontSize: 12 }}
                                  onFocus={e => e.target.style.borderColor = '#409EFF'}
                                  onBlur={e => e.target.style.borderColor = '#DCDFE6'}
                                />
                              </div>
                            ) : (
                              <span
                                onClick={() => startEdit(product.id, si, sku.stock)}
                                style={{
                                  cursor: 'pointer',
                                  color: sku.status === 'out_of_stock' || sku.status === 'low_stock' ? '#F56C6C' : '#303133',
                                  fontWeight: sku.status !== 'normal' ? 600 : 400,
                                  textDecoration: 'underline dotted',
                                }}
                                title="點擊編輯庫存"
                              >
                                {sku.status === 'low_stock' && '⚠ '}{sku.stock}
                              </span>
                            )}
                          </td>
                          <td style={{ ...tableTdStyle, color: '#909399' }}>{sku.threshold}</td>
                          <td style={tableTdStyle}>
                            <button style={textBtn('#409EFF')} onClick={() => setLogDrawer({ name: product.name, spec: sku.spec })}>調整紀錄</button>
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </TableWrapper>
          <Pagination
            total={getFilteredInventory().length}
            page={currentPage}
            pageSize={pageSize}
            pageSizes={[20, 50, 100]}
            onChange={setCurrentPage}
            onPageSizeChange={ps => { setPageSize(ps); setCurrentPage(1); }}
            style={{ padding: '10px 12px' }}
          />
        </>
      ) : (
        /* Notify Tab */
        <TableWrapper>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ ...tableThStyle, width: 40 }}></th>
                <th style={{ ...tableThStyle, textAlign: 'left', minWidth: 200 }}>產品名稱</th>
                <th style={{ ...tableThStyle, textAlign: 'left', width: 80 }}>訂閱人數</th>
                <th style={{ ...tableThStyle, textAlign: 'left', width: 120 }}>通知狀態</th>
                <th style={{ ...tableThStyle, textAlign: 'left', width: 200 }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {NOTIFY_SUBSCRIPTIONS.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '48px 0', textAlign: 'center', color: '#909399' }}>
                    <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>目前沒有消費者訂閱貨到通知</div>
                    <div style={{ fontSize: 13 }}>當消費者在缺貨產品頁點擊「貨到通知我」，訂閱資訊會顯示在這裡</div>
                  </td>
                </tr>
              ) : NOTIFY_SUBSCRIPTIONS.map((item, i) => (
                <React.Fragment key={item.id}>
                  <tr
                    style={{ background: tableRowBg(i) }}
                    {...tableRowHandlers(i, false)}
                  >
                    <td style={{ ...tableTdStyle, textAlign: 'center' }}>
                      <button onClick={() => setNotifyExpanded(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#909399', fontSize: 12 }}>
                        {notifyExpanded[item.id] ? '▾' : '▸'}
                      </button>
                    </td>
                    <td style={{ ...tableTdStyle, cursor: 'pointer', color: '#303133' }} onClick={() => setNotifyExpanded(prev => ({ ...prev, [item.id]: !prev[item.id] }))}>
                      {item.name}
                    </td>
                    <td style={tableTdStyle}>{item.subscribers}</td>
                    <td style={tableTdStyle}><StatusTag type={notifyStatusConfig[item.status].type}>{notifyStatusConfig[item.status].label}</StatusTag></td>
                    <td style={tableTdStyle}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          style={{ ...textBtn('#409EFF'), fontSize: 13, opacity: item.status === 'auto_notified' ? 0.5 : 1 }}
                          disabled={item.status === 'auto_notified'}
                          title={item.status === 'auto_notified' ? '已發送過通知' : undefined}
                          onClick={() => showToast(`已向 ${item.subscribers} 位訂閱者發送貨到通知 Email。`)}
                        >發送通知</button>
                        <button style={{ ...textBtn('#409EFF'), fontSize: 13 }} onClick={() => showToast('CSV 下載中…', 'info')}>匯出 CSV</button>
                      </div>
                    </td>
                  </tr>
                  {notifyExpanded[item.id] && item.emails.map((email, ei) => (
                    <tr key={ei} style={{ background: tableRowBg(ei) }} {...tableRowHandlers(ei, false)}>
                      <td style={tableTdStyle}></td>
                      <td style={{ ...tableTdStyle, paddingLeft: 40, fontSize: 14, color: '#606266' }} colSpan={2}>{email}</td>
                      <td style={{ ...tableTdStyle, fontSize: 14, color: '#909399' }}>訂閱時間：2026-04-{10 + ei}</td>
                      <td style={tableTdStyle}></td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </TableWrapper>
      )}
    </div>
  );
}

Object.assign(window, { InventoryManagementPage });
