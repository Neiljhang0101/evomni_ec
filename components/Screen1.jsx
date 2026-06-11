// Screen1 — 訂單列表頁（後台）

function Screen1OrderList({ orders, onNavigate, onUpdateOrder, onAdminNav }) {
  const { show, Toast } = useToast();
  const [activeTab, setActiveTab]     = React.useState('all');
  const [keyword, setKeyword]         = React.useState('');
  const [searchVal, setSearchVal]     = React.useState('');
  const [selected, setSelected]       = React.useState([]);
  const [sortCol, setSortCol]         = React.useState('date');
  const [sortDir, setSortDir]         = React.useState('desc');
  const [filterOpen, setFilterOpen]   = React.useState(false);
  const [cancelModal, setCancelModal] = React.useState(null);
  const [batchModal, setBatchModal]   = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize]       = React.useState(20);
  const [filterStatus, setFilterStatus]    = React.useState('');
  const [filterPayment, setFilterPayment]  = React.useState('');
  const [filterSource, setFilterSource]    = React.useState('');
  const [filterDateFrom, setFilterDateFrom] = React.useState('');
  const [filterDateTo,   setFilterDateTo]   = React.useState('');
  const [exportMeianModal, setExportMeianModal] = React.useState(false);
  const [meianExportFrom, setMeianExportFrom]   = React.useState(() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-01`; });
  const [meianExportTo, setMeianExportTo]       = React.useState(() => new Date().toISOString().slice(0,10));
  const [meianExporting, setMeianExporting]     = React.useState(false);
  const filterRef = React.useRef(null);

  React.useEffect(() => {
    const h = e => { if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  // Tab counts
  const tabDefs = [
    { key: 'all',             label: '全部' },
    { key: 'pending_payment', label: '待付款' },
    { key: 'processing',      label: '處理中' },
    { key: 'shipped',         label: '已出貨' },
    { key: 'in_transit',      label: '配送中' },
    { key: 'completed',       label: '已完成' },
    { key: 'cancelled',       label: '已取消' },
    { key: 'refunded',        label: '已退款' },
    { key: 'closed',          label: '已關閉' },
    { key: 'rma',             label: '含退換貨的訂單', dot: true },
  ];

  const counts = React.useMemo(() => {
    const c = {};
    orders.forEach(o => { c[o.status] = (c[o.status]||0)+1; });
    return c;
  }, [orders]);

  // Filter
  const filtered = React.useMemo(() => {
    return orders.filter(o => {
      if (activeTab === 'rma') return o.rmaIds && o.rmaIds.length > 0;
      if (activeTab !== 'all' && o.status !== activeTab) return false;
      if (filterStatus && o.status !== filterStatus) return false;
      if (filterPayment && o.payment !== filterPayment) return false;
      if (filterSource === 'meian' && !o.isMeian) return false;
      if (filterSource === 'normal' && o.isMeian) return false;
      if (filterDateFrom && o.date < filterDateFrom) return false;
      if (filterDateTo   && o.date > filterDateTo)   return false;
      if (searchVal) {
        const kw = searchVal.toLowerCase();
        return o.id.toLowerCase().includes(kw) ||
               o.recipient.includes(searchVal) ||
               o.phone.includes(searchVal);
      }
      return true;
    });
  }, [orders, activeTab, searchVal, filterStatus, filterPayment, filterSource, filterDateFrom, filterDateTo]);

  // Sort
  const sorted = React.useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortCol === 'date') {
        return sortDir === 'desc'
          ? b.date.localeCompare(a.date)
          : a.date.localeCompare(b.date);
      }
      if (sortCol === 'amount') {
        return sortDir === 'desc' ? b.total - a.total : a.total - b.total;
      }
      return 0;
    });
  }, [filtered, sortCol, sortDir]);

  const handleSort = col => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('desc'); }
  };

  const toggleAll = () =>
    setSelected(selected.length === sorted.length ? [] : sorted.map((_, i) => i));
  const toggleRow = i =>
    setSelected(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  const doCancel = (orderId) => {
    onUpdateOrder(orderId, 'cancelled');
    show('訂單已取消，庫存已自動回補', 'success');
  };

  const activeFilterCount = [filterStatus, filterPayment, filterSource, filterDateFrom, filterDateTo].filter(Boolean).length;
  const meianCount = React.useMemo(() => orders.filter(o => o.isMeian).length, [orders]);


  return (
    <AdminLayout page="order-list" onNav={onAdminNav}>
      <Toast />

      {/* Page Header */}
      <PageHeader title="訂單管理" breadcrumbs={['首頁','訂單管理']}>
        <EvoBtn variant="create" icon="+" onClick={() => onNavigate('create-order')}>新增訂單</EvoBtn>
      </PageHeader>

      {/* Tab Bar */}
      <TabSearchBar
        tabs={tabDefs.map(tab => ({
          ...tab,
          count: tab.key === 'all' ? orders.length
               : tab.key === 'rma' ? orders.filter(o => o.rmaIds?.length).length
               : counts[tab.key] || 0,
        }))}
        activeTab={activeTab}
        onTabChange={key => { setActiveTab(key); setSelected([]); }}
      >

        {/* Search + Filter row */}
        <div style={{ padding:'12px 16px', display:'flex', gap:16, alignItems:'center', flexWrap:'wrap' }}>
          {/* Search */}
          <div style={{ display:'flex', border:'1px solid #DCDFE6', height:40, flex:'1 1 280px', maxWidth:340 }}>
            <input
              placeholder="搜尋訂單編號、收件人姓名、手機號碼"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              onKeyDown={e => { if(e.key==='Enter') setSearchVal(keyword); }}
              style={{ flex:1, height:'100%', border:'none', outline:'none', padding:'0 10px', fontSize:13, color:'#303133', fontFamily:'inherit', background:'#fff' }}
            />
            <button onClick={() => setSearchVal(keyword)} style={{ height:'100%', padding:'0 12px', background:'#303133', border:'none', color:'#fff', cursor:'pointer', fontSize:13, fontFamily:'inherit', flexShrink:0, borderRadius:0 }}>搜尋</button>
          </div>

          {/* Filter Popover */}
          <div ref={filterRef} style={{ position:'relative' }}>
            <EvoBtn variant="secondary" onClick={() => setFilterOpen(o=>!o)}
              style={activeFilterCount>0 ? { borderColor:'#409EFF', color:'#409EFF' } : {}}>
              篩選{activeFilterCount > 0 ? ` ${activeFilterCount}` : ''}
              <span style={{ fontSize:10, marginLeft:4, display:'inline-block', transform:filterOpen?'rotate(180deg)':'none', transition:'transform 0.2s' }}>▾</span>
            </EvoBtn>
            {filterOpen && (
              <div style={{ position:'absolute', top:'calc(100% + 6px)', left:0, zIndex:300, background:'#fff', border:'1px solid #DCDFE6', boxShadow:'0 4px 16px rgba(0,0,0,0.1)', padding:20, minWidth:300 }}>
                <div style={{ fontSize:14, fontWeight:700, color:'#303133', marginBottom:14, paddingBottom:10, borderBottom:'1px solid #EBEEF5' }}>篩選條件</div>
                <div style={{ marginBottom:12 }}>
                  <EvoSelect label="訂單狀態" value={filterStatus} onChange={setFilterStatus} options={[
                    {label:'全部',value:''},{label:'待付款',value:'pending_payment'},{label:'已付款',value:'paid'},
                    {label:'處理中',value:'processing'},{label:'已出貨',value:'shipped'},
                    {label:'配送中',value:'in_transit'},{label:'已送達',value:'delivered'},
                    {label:'已完成',value:'completed'},{label:'已取消',value:'cancelled'},
                    {label:'已退款',value:'refunded'},{label:'已關閉',value:'closed'},
                  ]} />
                </div>
                <div style={{ marginBottom:12 }}>
                  <EvoSelect label="付款方式" value={filterPayment} onChange={setFilterPayment} options={[
                    {label:'全部',value:''},{label:'信用卡',value:'信用卡'},{label:'LINE Pay',value:'LINE Pay'},
                    {label:'ATM 轉帳',value:'ATM 轉帳'},{label:'貨到付款',value:'貨到付款'},
                  ]} />
                </div>
                <div style={{ marginBottom:14 }}>
                  <EvoSelect label="訂單來源" value={filterSource} onChange={setFilterSource} options={[
                    {label:'全部',value:''},{label:'一般訂單',value:'normal'},{label:'美安（Market America）',value:'meian'},
                  ]} />
                </div>
                <div style={{ marginBottom:14 }}>
                  <div style={{ fontSize:12, color:'#606266', fontWeight:500, marginBottom:6 }}>訂單日期範圍</div>
                  <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                    <input type="date" value={filterDateFrom} onChange={e => setFilterDateFrom(e.target.value)}
                      style={{ flex:1, height:32, border:'1px solid #DCDFE6', padding:'0 8px', fontSize:13, color:'#303133', fontFamily:'inherit', outline:'none', background:'#fff' }} />
                    <span style={{ fontSize:12, color:'#909399', flexShrink:0 }}>至</span>
                    <input type="date" value={filterDateTo} onChange={e => setFilterDateTo(e.target.value)}
                      style={{ flex:1, height:32, border:'1px solid #DCDFE6', padding:'0 8px', fontSize:13, color:'#303133', fontFamily:'inherit', outline:'none', background:'#fff' }} />
                  </div>
                </div>
                <div style={{ display:'flex', gap:8, justifyContent:'flex-end', borderTop:'1px solid #EBEEF5', paddingTop:10 }}>
                  <EvoBtn variant="secondary" size="sm" onClick={() => { setFilterStatus(''); setFilterPayment(''); setFilterSource(''); setFilterDateFrom(''); setFilterDateTo(''); setFilterOpen(false); }}>重置</EvoBtn>
                  <EvoBtn variant="primary" size="sm" onClick={() => setFilterOpen(false)}>套用</EvoBtn>
                </div>
              </div>
            )}
          </div>

          <div style={{ flex:1 }} />
          <EvoBtn variant="secondary" onClick={() => setExportMeianModal(true)}>匯出美安報表</EvoBtn>
          <EvoBtn variant="secondary" onClick={() => show('報表產生中，完成後將寄送至您的信箱','info')}>匯出</EvoBtn>
        </div>
      </TabSearchBar>

      {/* Batch toolbar */}
      {selected.length > 0 && (
        <div style={{ position:'sticky', top:0, zIndex:100, background:'#ECF5FF', border:'1px solid #b3d8ff', padding:'10px 16px', marginBottom:12, display:'flex', alignItems:'center', gap:12 }}>
          <span style={{ fontSize:13, color:'#409EFF', fontWeight:600 }}>已選 {selected.length} 筆訂單</span>
          <EvoBtn variant="secondary" size="sm" onClick={() => show('批次列印功能開發中','info')}>批次列印出貨單</EvoBtn>
          <EvoBtn variant="secondary" size="sm" onClick={() => { show('報表產生中，完成後將寄送至您的信箱','info'); setSelected([]); }}>批次匯出</EvoBtn>
          <EvoBtn variant="danger" size="sm" onClick={() => setBatchModal(true)}>批次取消訂單</EvoBtn>
          <div style={{ flex:1 }} />
          <EvoBtn variant="ghost" size="sm" onClick={() => setSelected([])}>取消選取</EvoBtn>
        </div>
      )}

      {/* Table */}
      {sorted.length === 0 ? (
        <div style={{ textAlign:'center', padding:'60px 24px', color:'#909399' }}>
          <div style={{ width:48, height:48, borderRadius:'50%', background:'#F5F7FA', border:'2px solid #EBEEF5', margin:'0 auto 12px' }}/>
          <div style={{ fontSize:15, fontWeight:600, color:'#303133', marginBottom:6 }}>目前沒有符合條件的訂單</div>
          <div style={{ fontSize:13, marginBottom:16 }}>試試調整篩選條件，或清除搜尋關鍵字</div>
          <EvoBtn variant="secondary" size="sm" onClick={() => { setSearchVal(''); setKeyword(''); setFilterStatus(''); setFilterPayment(''); setFilterSource(''); }}>清除篩選條件</EvoBtn>
        </div>
      ) : (
        <>
        <TableWrapper>
            <table style={{ width:'100%', borderCollapse:'collapse', minWidth:880, fontSize:14 }}>
              <thead>
                <tr>
                  <th style={{ ...tableThStyle, whiteSpace: 'nowrap', width:40, textAlign:'center' }}>
                    <input type="checkbox" checked={selected.length===sorted.length&&sorted.length>0} onChange={toggleAll} style={{ accentColor:'#303133', cursor:'pointer' }} />
                  </th>
                  <th style={{ ...tableThStyle, whiteSpace: 'nowrap', minWidth:160 }}>訂單編號</th>
                  <th style={{ ...tableThStyle, whiteSpace: 'nowrap', width:140, cursor:'pointer' }} onClick={() => handleSort('date')}>
                    訂單日期 <span style={{ color:sortCol==='date'?'#409EFF':'#C0C4CC' }}>{sortCol==='date'?(sortDir==='desc'?'↓':'↑'):'↕'}</span>
                  </th>
                  <th style={{ ...tableThStyle, whiteSpace: 'nowrap', width:80 }}>收件人</th>
                  <th style={{ ...tableThStyle, whiteSpace: 'nowrap', minWidth:140 }}>產品摘要</th>
                  <th style={{ ...tableThStyle, whiteSpace: 'nowrap', width:100, cursor:'pointer' }} onClick={() => handleSort('amount')}>
                    訂單金額 <span style={{ color:sortCol==='amount'?'#409EFF':'#C0C4CC' }}>{sortCol==='amount'?(sortDir==='desc'?'↓':'↑'):'↕'}</span>
                  </th>
                  <th style={{ ...tableThStyle, whiteSpace: 'nowrap', width:96 }}>訂單狀態</th>
                  <th style={{ ...tableThStyle, whiteSpace: 'nowrap', width:88 }}>付款方式</th>
                  <th style={{ ...tableThStyle, whiteSpace: 'nowrap', width:100 }}>發票狀態</th>
                  <th style={{ ...tableThStyle, whiteSpace: 'nowrap', width:88 }}>訂單來源</th>
                  <th style={{ ...tableThStyle, whiteSpace: 'nowrap', width:120 }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((order, pi) => {
                  const i = (currentPage - 1) * pageSize + pi;
                  const isSel = selected.includes(i);
                  const oStatus  = ORDER_STATUS[order.status]  || {};
                  const invStatus = (order.invoice === 'not_issued' && order.payment === '貨到付款' && order.status === 'completed')
                    ? { label: '未開立', color: 'danger', icon: '⚠' }
                    : INVOICE_STATUS[order.invoice] || {};
                  const itemSummary = order.items.length === 1
                    ? order.items[0].name
                    : `${order.items[0].name} + ${order.items.length - 1} 件`;
                  return (
                    <tr key={order.id}
                      style={{ background: isSel ? tableRowSelectedBg : tableRowBg(i), transition:'background 0.1s', cursor:'pointer' }}
                      onClick={() => onNavigate('order-detail', { orderId: order.id })}
                      {...tableRowHandlers(i, isSel)}>
                      <td style={{ ...tableTdStyle, fontSize: EvoDS.font.listMin, textAlign:'center' }}>
                        <input type="checkbox" checked={isSel} onChange={e => { e.stopPropagation(); toggleRow(i); }} onClick={e => e.stopPropagation()} style={{ accentColor:'#303133', cursor:'pointer' }} />
                      </td>
                      <td style={{ ...tableTdStyle, fontSize: EvoDS.font.listMin }}>
                        <div style={{ display:'flex', flexDirection:'column', gap:4, alignItems:'flex-start' }}>
                          <a href="#" onClick={e => { e.preventDefault(); onNavigate('order-detail', { orderId: order.id }); }}
                            style={{ color:'#409EFF', fontSize:14, textDecoration:'none' }}>{order.id}</a>
                          {order.isMultiTemp && (
                            <span style={{ display:'inline-flex', alignItems:'center', padding:'1px 7px', borderRadius:9999, fontSize:11, fontWeight:500, background:'#FDF6EC', color:'#E6A23C', border:'1px solid #FAECD8', whiteSpace:'nowrap' }}>分批出貨</span>
                          )}
                        </div>
                      </td>
                      <td style={{ ...tableTdStyle, fontSize: EvoDS.font.listMin, color:'#909399' }}>{order.date}</td>
                      <td style={{ ...tableTdStyle, fontSize: EvoDS.font.listMin }}>{order.recipient}</td>
                      <td style={{ ...tableTdStyle, fontSize: EvoDS.font.listMin, maxWidth:160 }}>
                        <div style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', fontSize:14 }}>{itemSummary}</div>
                      </td>
                      <td style={{ ...tableTdStyle, fontSize: EvoDS.font.listMin, fontWeight:500 }}>NT$ {order.total.toLocaleString()}</td>
                      <td style={{ ...tableTdStyle, fontSize: EvoDS.font.listMin }}><StatusTagTooltip status={order.status} /></td>
                      <td style={{ ...tableTdStyle, fontSize: EvoDS.font.listMin }}>{order.payment}</td>
                      <td style={{ ...tableTdStyle, fontSize: EvoDS.font.listMin }}>
                        <EvoTag color={invStatus.color} icon={invStatus.icon}>{invStatus.label}</EvoTag>
                      </td>
                      <td style={{ ...tableTdStyle, fontSize: EvoDS.font.listMin }}>
                        {order.isMeian
                          ? <span style={{ display:'inline-flex', alignItems:'center', padding:'2px 8px', borderRadius:9999, fontSize:11, fontWeight:500, background:'#F0F9EB', color:'#67C23A', border:'1px solid #B3E19D', whiteSpace:'nowrap' }}>美安</span>
                          : <span style={{ color:'#C0C4CC', fontSize:14 }}>—</span>}
                      </td>
                      <td style={{ ...tableTdStyle, fontSize: EvoDS.font.listMin }}>
                        <div style={{ display:'flex', gap:8 }}>
                          <button onClick={e => { e.stopPropagation(); onNavigate('order-detail', { orderId: order.id }); }} style={{ background:'none', border:'none', color:'#409EFF', cursor:'pointer', fontSize:14, padding:0, fontFamily:'inherit' }}>查看詳情</button>
                          {order.status === 'pending_payment' && (
                            <button onClick={e => { e.stopPropagation(); setCancelModal(order.id); }} style={{ background:'none', border:'none', color:'#F56C6C', cursor:'pointer', fontSize:14, padding:0, fontFamily:'inherit' }}>取消訂單</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
        </TableWrapper>
        <Pagination
          total={sorted.length}
          page={currentPage}
          pageSize={pageSize}
          pageSizes={[20, 50, 100]}
          onChange={setCurrentPage}
          onPageSizeChange={ps => { setPageSize(ps); setCurrentPage(1); }}
          style={{ borderTop: '1px solid #EBEEF5', padding: '10px 12px' }}
        />
        </>
      )}

      {/* Cancel Order Modal */}
      <AdminModal open={!!cancelModal} onClose={() => setCancelModal(null)}
        title="確定取消此訂單？"
        body="訂單取消後庫存將自動回補。若已付款，系統將自動發起退款。此操作無法復原。"
        confirmLabel="確定取消" cancelLabel="先不取消" danger
        onConfirm={() => { doCancel(cancelModal); setCancelModal(null); }} />

      {/* Batch Cancel Modal */}
      <AdminModal open={batchModal} onClose={() => setBatchModal(false)}
        title={`確定要取消這 ${selected.length} 筆訂單嗎？`}
        body={`此操作無法復原，被取消的訂單將自動回補庫存。`}
        confirmLabel="確定取消" cancelLabel="返回" danger
        onConfirm={() => {
          selected.forEach(i => { if(sorted[i]?.status==='pending_payment') doCancel(sorted[i].id); });
          setSelected([]);
          setBatchModal(false);
        }} />

      {/* Dialog 6 — 匯出美安報表 */}
      {exportMeianModal && (
        <div style={{ position:'fixed', inset:0, zIndex:1000, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ background:'#fff', width:440, maxWidth:'90vw', boxShadow:'0 8px 32px rgba(0,0,0,0.18)' }}>
            <div style={{ padding:'16px 20px', borderBottom:'1px solid #DCDFE6', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <span style={{ fontSize:16, fontWeight:700, color:'#303133' }}>匯出美安報表</span>
              <button onClick={() => setExportMeianModal(false)} style={{ background:'none', border:'none', fontSize:20, color:'#909399', cursor:'pointer', lineHeight:1 }}>×</button>
            </div>
            <div style={{ padding:20 }}>
              <div style={{ display:'flex', gap:12, marginBottom:16 }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:12, color:'#606266', marginBottom:6 }}>開始日期</div>
                  <input type="date" value={meianExportFrom} onChange={e => setMeianExportFrom(e.target.value)}
                    style={{ width:'100%', height:36, border:'1px solid #DCDFE6', borderRadius:0, padding:'0 10px', fontSize:13, fontFamily:'Noto Sans TC,sans-serif', outline:'none', color:'#303133' }} />
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:12, color:'#606266', marginBottom:6 }}>結束日期</div>
                  <input type="date" value={meianExportTo} onChange={e => setMeianExportTo(e.target.value)}
                    style={{ width:'100%', height:36, border:'1px solid #DCDFE6', borderRadius:0, padding:'0 10px', fontSize:13, fontFamily:'Noto Sans TC,sans-serif', outline:'none', color:'#303133' }} />
                </div>
              </div>
              <div style={{ padding:'10px 14px', background:'#F5F7FA', border:'1px solid #DCDFE6', fontSize:13, color:'#606266' }}>
                符合範圍的美安訂單：<strong style={{ color:'#303133' }}>{meianCount} 筆</strong>
              </div>
            </div>
            <div style={{ padding:'12px 20px', borderTop:'1px solid #DCDFE6', display:'flex', justifyContent:'flex-end', gap:8 }}>
              <button onClick={() => setExportMeianModal(false)}
                style={{ height:36, padding:'0 16px', background:'#fff', border:'1px solid #DCDFE6', borderRadius:0, cursor:'pointer', fontSize:14, color:'#606266', fontFamily:'Noto Sans TC,sans-serif' }}>
                取消
              </button>
              <button
                disabled={meianExporting}
                onClick={() => {
                  setMeianExporting(true);
                  setTimeout(() => {
                    setMeianExporting(false);
                    setExportMeianModal(false);
                    show('美安報表產生中，完成後將寄送至您的信箱', 'success');
                  }, 1000);
                }}
                style={{ height:36, padding:'0 16px', background: meianExporting ? '#C0C4CC' : '#409EFF', color:'#fff', border:'none', borderRadius:0, cursor: meianExporting ? 'not-allowed' : 'pointer', fontSize:14, fontFamily:'Noto Sans TC,sans-serif' }}>
                {meianExporting ? '處理中...' : '確認匯出'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

Object.assign(window, { Screen1OrderList });
