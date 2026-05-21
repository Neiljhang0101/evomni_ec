// Screen3 — 退換貨申請列表（後台）

function Screen3RMAList({ rmas, orders, onNavigate, onAdminNav }) {
  const { show, Toast } = useToast();
  const [tabFilter,     setTabFilter]   = React.useState('all');
  const [typeFilter,    setTypeFilter]  = React.useState('all');
  const [quickModal,    setQuickModal]  = React.useState(null);
  const [sortCol, setSortCol] = React.useState('date');
  const [sortDir, setSortDir] = React.useState('desc');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize]       = React.useState(20);

  // Tab definitions: each tab maps to one or more statuses
  const tabDefs = [
    { key: 'all',             label: '全部',          statuses: null },
    { key: 'pending_review',  label: '待審核',         statuses: ['pending_review'] },
    { key: 'pending_return',  label: '待消費者寄回',   statuses: ['pending_return'] },
    { key: 'in_transit',      label: '產品運送中',     statuses: ['in_transit'] },
    { key: 'pending_inspection', label: '待驗收',      statuses: ['pending_inspection','inspection_failed','inspection_passed'] },
    { key: 'refund_processing',  label: '退款處理中',  statuses: ['refund_processing'] },
    { key: 'completed',       label: '已完成',         statuses: ['refund_completed','exchange_confirming','exchange_preparing','exchange_shipped','exchange_completed'] },
    { key: 'rejected',        label: '已拒絕',         statuses: ['rejected'] },
  ];

  const tabCounts = React.useMemo(() => {
    const c = {};
    tabDefs.forEach(tab => {
      if (tab.statuses === null) {
        c[tab.key] = rmas.length;
      } else {
        c[tab.key] = rmas.filter(r => tab.statuses.includes(r.status)).length;
      }
    });
    return c;
  }, [rmas]);

  const filtered = React.useMemo(() => {
    const activeTab = tabDefs.find(t => t.key === tabFilter);
    return rmas.filter(r => {
      if (activeTab && activeTab.statuses !== null && !activeTab.statuses.includes(r.status)) return false;
      if (typeFilter !== 'all' && r.type !== typeFilter) return false;
      return true;
    }).sort((a,b) => {
      if (sortCol === 'date') return sortDir==='desc' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date);
      if (sortCol === 'refund') {
        const av = a.refund?.total||0, bv = b.refund?.total||0;
        return sortDir==='desc' ? bv - av : av - bv;
      }
      return 0;
    });
  }, [rmas, tabFilter, typeFilter, sortCol, sortDir]);

  const handleSort = col => {
    if (sortCol===col) setSortDir(d=>d==='asc'?'desc':'asc');
    else { setSortCol(col); setSortDir('desc'); }
  };


  return (
    <AdminLayout page="rma-list" onNav={onAdminNav}>
      <Toast />

      <PageHeader title="退換貨申請" breadcrumbs={['首頁','退換貨申請']} />

      {/* Tab Bar */}
      <TabSearchBar
        tabs={tabDefs.map(tab => ({ ...tab, count: tabCounts[tab.key] || 0 }))}
        activeTab={tabFilter}
        onTabChange={key => setTabFilter(key)}
      >

        {/* Type filter row */}
        <div style={{ padding:'10px 16px', display:'flex', gap:16, alignItems:'center' }}>
          <span style={{ fontSize:13, color:'#606266', flexShrink:0 }}>申請類型：</span>
          {[{key:'all',label:'全部'},{key:'return',label:'退貨'},{key:'exchange',label:'換貨'}].map(t => (
            <div key={t.key} onClick={() => setTypeFilter(t.key)}
              style={{ height:40, padding:'0 14px', display:'inline-flex', alignItems:'center', cursor:'pointer', fontSize:13, border:'1px solid', borderColor:typeFilter===t.key?'#409EFF':'#DCDFE6', background:typeFilter===t.key?'#ECF5FF':'#fff', color:typeFilter===t.key?'#409EFF':'#606266', transition:'all 0.15s', userSelect:'none' }}>
              {t.label}
            </div>
          ))}
        </div>
      </TabSearchBar>

      {/* Table */}
      {filtered.length === 0 ? (
        <div style={{ textAlign:'center', padding:'60px 24px' }}>
          <div style={{ width:48, height:48, borderRadius:'50%', background:'#F5F7FA', border:'2px solid #EBEEF5', margin:'0 auto 12px' }}/>
          <div style={{ fontSize:15, fontWeight:600, color:'#303133', marginBottom:6 }}>找不到符合條件的申請</div>
          <div style={{ fontSize:13, color:'#909399', marginBottom:16 }}>試試切換其他狀態或調整篩選條件</div>
          <EvoBtn variant="secondary" size="sm" onClick={() => { setTabFilter('all'); setTypeFilter('all'); }}>清除篩選條件</EvoBtn>
        </div>
      ) : (
        <>
        <TableWrapper>
            <table style={{ width:'100%', borderCollapse:'collapse', minWidth:800, fontSize:14 }}>
              <thead>
                <tr>
                  <th style={{ ...tableThStyle, whiteSpace: 'nowrap', minWidth:160 }}>申請編號</th>
                  <th style={{ ...tableThStyle, whiteSpace: 'nowrap', minWidth:160 }}>原訂單編號</th>
                  <th style={{ ...tableThStyle, whiteSpace: 'nowrap', width:140, cursor:'pointer' }} onClick={() => handleSort('date')}>
                    申請日期 <span style={{ color:sortCol==='date'?'#409EFF':'#C0C4CC' }}>{sortCol==='date'?(sortDir==='desc'?'↓':'↑'):'↕'}</span>
                  </th>
                  <th style={{ ...tableThStyle, whiteSpace: 'nowrap', width:80 }}>申請類型</th>
                  <th style={{ ...tableThStyle, whiteSpace: 'nowrap', minWidth:120 }}>申請原因</th>
                  <th style={{ ...tableThStyle, whiteSpace: 'nowrap', width:80 }}>申請人</th>
                  <th style={{ ...tableThStyle, whiteSpace: 'nowrap', width:100, cursor:'pointer' }} onClick={() => handleSort('refund')}>
                    退款金額 <span style={{ color:sortCol==='refund'?'#409EFF':'#C0C4CC' }}>{sortCol==='refund'?(sortDir==='desc'?'↓':'↑'):'↕'}</span>
                  </th>
                  <th style={{ ...tableThStyle, whiteSpace: 'nowrap', width:120 }}>狀態</th>
                  <th style={{ ...tableThStyle, whiteSpace: 'nowrap', width:130 }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((rma, i) => {
                  const rs = RMA_STATUS[rma.status] || {};
                  return (
                    <tr key={rma.id}
                      style={{ background: tableRowBg(i), cursor:'pointer' }}
                      onClick={() => onNavigate('rma-detail',{rmaId:rma.id})}
                      {...tableRowHandlers(i, false)}>
                      <td style={{ ...tableTdStyle, fontSize: EvoDS.font.listMin }}>
                        <a href="#" onClick={e=>{e.preventDefault(); e.stopPropagation(); onNavigate('rma-detail',{rmaId:rma.id});}} style={{ color:'#409EFF', fontSize:14, textDecoration:'none' }}>{rma.id}</a>
                      </td>
                      <td style={{ ...tableTdStyle, fontSize: EvoDS.font.listMin }}>
                        <a href="#" onClick={e=>{e.preventDefault(); e.stopPropagation(); onNavigate('order-detail',{orderId:rma.orderId});}} style={{ color:'#409EFF', fontSize:14, textDecoration:'none' }}>{rma.orderId}</a>
                      </td>
                      <td style={{ ...tableTdStyle, fontSize: EvoDS.font.listMin, color:'#909399' }}>{rma.date}</td>
                      <td style={{ ...tableTdStyle, fontSize: EvoDS.font.listMin }}>
                        <EvoTag color={rma.type==='return'?'warning':'primary'}>{rma.type==='return'?'退貨':'換貨'}</EvoTag>
                      </td>
                      <td style={{ ...tableTdStyle, fontSize: EvoDS.font.listMin }}>
                        <div style={{ maxWidth:160, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }} title={rma.reason}>{rma.reason}</div>
                      </td>
                      <td style={{ ...tableTdStyle, fontSize: EvoDS.font.listMin }}>{rma.applicant}</td>
                      <td style={{ ...tableTdStyle, fontSize: EvoDS.font.listMin }}>
                        {rma.refund ? `NT$ ${rma.refund.total.toLocaleString()}` : '—'}
                      </td>
                      <td style={{ ...tableTdStyle, fontSize: EvoDS.font.listMin }}><EvoTag color={rs.color}>{rs.label}</EvoTag></td>
                      <td style={{ ...tableTdStyle, fontSize: EvoDS.font.listMin }}>
                        <div style={{ display:'flex', gap:8 }}>
                          <button onClick={e => { e.stopPropagation(); onNavigate('rma-detail',{rmaId:rma.id}); }} style={{ background:'none', border:'none', color:'#409EFF', cursor:'pointer', fontSize:14, padding:0, fontFamily:'inherit' }}>查看詳情</button>
                          {rma.status === 'pending_review' && (
                            <button onClick={e => { e.stopPropagation(); setQuickModal(rma); }} style={{ background:'none', border:'none', color:'#E6A23C', cursor:'pointer', fontSize:14, padding:0, fontFamily:'inherit' }}>快速審核</button>
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
          total={filtered.length}
          page={currentPage}
          pageSize={pageSize}
          pageSizes={[20, 50, 100]}
          onChange={setCurrentPage}
          onPageSizeChange={ps => { setPageSize(ps); setCurrentPage(1); }}
          style={{ borderTop: '1px solid #EBEEF5', padding: '10px 12px' }}
        />
        </>
      )}

      {/* Quick Review Modal */}
      {quickModal && (
        <AdminModal open={!!quickModal} onClose={() => setQuickModal(null)}
          title={`快速審核 — ${quickModal.id}`}
          confirmLabel="" cancelLabel="關閉"
          onConfirm={null}>
          <div>
            <div style={{ marginBottom:12 }}>
              <div style={{ fontSize:13, color:'#909399', marginBottom:4 }}>申請類型</div>
              <EvoTag color={quickModal.type==='return'?'warning':'primary'}>{quickModal.type==='return'?'退貨':'換貨'}</EvoTag>
            </div>
            <div style={{ marginBottom:12 }}>
              <div style={{ fontSize:13, color:'#909399', marginBottom:4 }}>申請原因</div>
              <div style={{ fontSize:14, color:'#303133' }}>{quickModal.reason}</div>
            </div>
            {quickModal.description && (
              <div style={{ marginBottom:16 }}>
                <div style={{ fontSize:13, color:'#909399', marginBottom:4 }}>說明</div>
                <div style={{ fontSize:13, color:'#606266', lineHeight:1.6, background:'#F5F7FA', padding:10 }}>{quickModal.description}</div>
              </div>
            )}
            <Divider my={12} />
            <div style={{ display:'flex', gap:8, justifyContent:'flex-end' }}>
              <EvoBtn variant="danger" onClick={() => { show('已拒絕申請，系統已通知消費者','success'); setQuickModal(null); }}>拒絕</EvoBtn>
              <EvoBtn variant="create" onClick={() => { show(`已核准${quickModal.type==='return'?'退貨':'換貨'}申請，系統通知信已發送`,'success'); setQuickModal(null); }}>
                {quickModal.type==='return'?'核准退貨':'核准換貨'}
              </EvoBtn>
            </div>
          </div>
        </AdminModal>
      )}
    </AdminLayout>
  );
}

Object.assign(window, { Screen3RMAList });
