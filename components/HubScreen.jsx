// 串接設定 — Vendor data & VendorCategoryPanel

const HUB_VENDORS = {
  '第三方金流': [
    { id: 'ecpay',    name: '綠界科技（ECPay）',    type: '全自動',  status: '串接異常', color: '#005EAA', initial: 'EC',  screen: 'vendor-auto',   lastErr: 'Webhook 連續失敗達門檻（最近一次：API 金鑰已失效 AUTH_FAILED），可能影響訂單付款通知，請檢查串接設定。', lastErrTime: '2026/05/10 14:32' },
    { id: 'newebpay', name: '藍新科技（NewebPay）',  type: '全自動',  status: '未設定',   color: '#0070C0', initial: 'NP',  screen: 'vendor-auto' },
    { id: 'linepay',  name: 'LINE Pay',               type: '全自動',  status: '已啟用',   color: '#00B900', initial: 'LP',  screen: 'vendor-auto' },
    { id: 'aftee',    name: 'AFTEE 先享後付',         type: '全自動',  status: '未設定',   color: '#FF6B35', initial: 'AF',  screen: 'vendor-auto' },
    { id: 'cod',      name: '貨到付款',               type: '設定即用', status: '已啟用',   color: '#606266', initial: 'COD', screen: 'vendor-auto' },
    { id: 'transfer', name: '銀行匯款',               type: '設定即用', status: '已停用',   color: '#909399', initial: 'ATM', screen: 'vendor-auto' },
    { id: 'ecpay-recurring', name: '綠界科技－定期定額', type: '全自動', status: '未設定', color: '#005EAA', initial: 'EC↻', screen: 'recurring' },
  ],
  '銀行金流': [
    { id: 'sinopac',    name: '永豐銀行（豐收款）', type: '設定即用', status: '未設定', color: '#E03C31', initial: '豐',  screen: 'vendor-bank' },
    { id: 'ctbc',       name: '中信銀行',           type: '設定即用', status: '未設定', color: '#00356B', initial: '中信', screen: 'vendor-bank' },
    { id: 'taishin',    name: '台新銀行（Richart）', type: '設定即用', status: '未設定', color: '#E60012', initial: '台新', screen: 'vendor-bank' },
    { id: 'esun',       name: '玉山銀行',           type: '設定即用', status: '未設定', color: '#FFB800', initial: '玉山', screen: 'vendor-bank' },
    { id: 'mastercard', name: 'Mastercard',         type: '設定即用', status: '未設定', color: '#EB001B', initial: 'MC',  screen: 'vendor-bank' },
    { id: 'visa',       name: 'VISA',               type: '設定即用', status: '未設定', color: '#1A1F71', initial: 'VISA',screen: 'vendor-bank' },
  ],
  '第三方物流': [
    { id: 'eclogistics', name: '綠界物流（ECPay）', type: '全自動',  status: '連線測試失敗',  color: '#005EAA', initial: '綠物', screen: 'vendor-auto', lastErr: '上次連線測試未通過：商店代號或金鑰錯誤（401）。Webhook 狀態正常，建議重新測試或檢查金鑰設定。', lastErrTime: '2026/05/11 09:48' },
    { id: 'neweblog',    name: '藍新物流',          type: '全自動',  status: '未設定',  color: '#0070C0', initial: '藍物', screen: 'vendor-auto' },
    { id: 'shengzhe',    name: '低溫超取_聖喆國際', type: '人工處理', status: '已啟用',  color: '#2D6A4F', initial: '聖喆', screen: 'vendor-manual' },
    { id: 'boxful',      name: '倉儲物流_BOXFUL',   type: '半人工',  status: '未設定',  color: '#E6A23C', initial: 'BOX', screen: 'vendor-semi' },
    { id: 'uninet',      name: '統一數網（進階）',   type: '半人工',  status: '未設定',  color: '#F56C6C', initial: '統網', screen: 'vendor-semi' },
    { id: 'tcat',        name: '黑貓宅急便',         type: '全自動',  status: '未設定',  color: '#303133', initial: '黑貓', screen: 'vendor-auto' },
  ],
  '通訊串接': [
    { id: 'lineoa', name: 'LINE Official Account', type: '全自動', status: '未設定', color: '#00B900', initial: 'LINE', screen: 'vendor-lineoa', plan: '進階電商包' },
  ],
};

const ERROR_STATUSES = ['連線測試失敗', '串接異常', '連線異常'];

function VendorCard({ vendor, onOpen }) {
  const [hover, setHover] = React.useState(false);
  const isError = ERROR_STATUSES.includes(vendor.status);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ background: '#fff', border: '1px solid #DCDFE6', borderTop: isError ? '4px solid #F56C6C' : '1px solid #DCDFE6', boxShadow: hover ? '0 4px 12px rgba(0,0,0,.08)' : 'none', transition: 'box-shadow .2s', cursor: 'pointer', position: 'relative', borderRadius: 3 }}
      onClick={() => onOpen(vendor)}
    >
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{ width: 40, height: 40, background: '#F5F7FA', border: '1px solid #DCDFE6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: vendor.color, flexShrink: 0 }}>{vendor.initial}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#303133', lineHeight: 1.4 }}>{vendor.name}</div>
            {vendor.plan && <div style={{ display: 'inline-block', marginTop: 4, fontSize: 11, color: '#9B59B6', background: '#F5EEFF', border: '1px solid #D8B4FE', padding: '1px 6px', borderRadius: 2 }}>{vendor.plan}</div>}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <VendorTypeTag type={vendor.type} />
          <StatusBadge status={vendor.status} />
        </div>
        <button
          onClick={e => { e.stopPropagation(); onOpen(vendor); }}
          style={{ ...sharedBtns.plain, width: '100%', height: 30, fontSize: 13 }}
        >設定</button>
      </div>
      {isError && (
        <div style={{ background: '#FEF0F0', borderTop: '1px solid #FBC4C4', padding: '8px 12px' }}>
          <div style={{ fontSize: 12, color: '#F56C6C', lineHeight: 1.6, marginBottom: 6 }}>{vendor.lastErr}</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {vendor.lastErrTime && <span style={{ fontSize: 11, color: '#C0C4CC' }}>發生時間：{vendor.lastErrTime}</span>}
            <button onClick={e => { e.stopPropagation(); onOpen(vendor); }}
              style={{ height: 24, padding: '0 10px', background: '#fff', border: '1px solid #F56C6C', color: '#F56C6C', fontSize: 12, cursor: 'pointer', fontFamily: 'Noto Sans TC,sans-serif' }}>
              {vendor.status === '連線測試失敗' ? '前往重新測試' : '前往修復'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const STATUS_LEGEND = [
  { label: '未設定',   color: '#909399', desc: '尚未填入任何串接憑證。' },
  { label: '設定中',   color: '#E6A23C', desc: '憑證已填入，但尚未啟用串接。' },
  { label: '已啟用',   color: '#67C23A', desc: '串接已啟用，可在結帳與出貨流程中使用。' },
  { label: '已停用',   color: '#909399', desc: '曾設定並啟用過，目前已手動停用。' },
  { label: '連線測試失敗', color: '#F56C6C', desc: '連線測試失敗，且 Webhook 狀態正常。上次連線測試未通過，建議重新測試或檢查金鑰設定。' },
  { label: '串接異常', color: '#F56C6C', desc: 'Webhook 連續失敗達門檻（預設 3 次），可能影響訂單通知；或連線測試與 Webhook 兩者皆失敗。請檢查串接設定。' },
];

function StatusLegend() {
  return (
    <div style={{ background: '#F5F7FA', border: '1px solid #EBEEF5', borderRadius: 3, padding: '14px 18px', marginBottom: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#303133', marginBottom: 4 }}>狀態判定說明</div>
      <p style={{ fontSize: 12, color: '#909399', lineHeight: 1.7, marginBottom: 10 }}>
        狀態 Badge 依「連線測試」與「Webhook 回呼」兩個來源判定，任一失敗即顯示紅色 Badge，文案依失敗原因區分：僅
        <strong style={{ color: '#F56C6C' }}>連線測試失敗</strong>（Webhook 正常）顯示「連線測試失敗」；
        <strong style={{ color: '#F56C6C' }}>Webhook 連續失敗</strong>（達門檻 3 次）或兩者皆失敗則顯示「串接異常」。兩項來源皆恢復正常才會撤銷 Badge。
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px 24px' }}>
        {STATUS_LEGEND.map(s => (
          <div key={s.label} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, flexShrink: 0, marginTop: 6 }} />
            <div style={{ minWidth: 0 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: s.color }}>{s.label}</span>
              <span style={{ fontSize: 12, color: '#606266', lineHeight: 1.6 }}>　{s.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VendorCategoryPanel({ category, onOpenVendor }) {
  const [search, setSearch] = React.useState('');
  const [showLegend, setShowLegend] = React.useState(false);
  const vendors = HUB_VENDORS[category] || [];
  const filtered = search ? vendors.filter(v => v.name.includes(search)) : vendors;
  const enabledCount = vendors.filter(v => v.status === '已啟用').length;

  return (
    <div style={{ padding: 24 }}>
      {/* Panel header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#409EFF', marginBottom: 4 }}>{category}</h2>
          <p style={{ fontSize: 13, color: '#909399' }}>
            {enabledCount > 0 ? `已啟用 ${enabledCount} 個廠商` : '管理並設定此類別的廠商串接。'}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <button
          onClick={() => setShowLegend(s => !s)}
          style={{ height: 34, padding: '0 12px', background: showLegend ? '#ECF5FF' : '#fff', border: `1px solid ${showLegend ? '#409EFF' : '#DCDFE6'}`, color: showLegend ? '#409EFF' : '#606266', fontSize: 13, cursor: 'pointer', fontFamily: 'Noto Sans TC,sans-serif', whiteSpace: 'nowrap' }}>
          狀態說明
        </button>
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="搜尋廠商名稱"
            style={{ width: 200, height: 34, padding: '0 10px 0 32px', border: '1px solid #DCDFE6', borderRadius: 0, fontSize: 13, outline: 'none', fontFamily: 'Noto Sans TC,sans-serif' }}
          />
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#909399', display: 'flex' }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.4"/><line x1="8.5" y1="8.5" x2="12" y2="12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
          </span>
          {search && (
            <span onClick={() => setSearch('')} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#909399', cursor: 'pointer', display: 'flex' }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><line x1="2" y1="2" x2="10" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="10" y1="2" x2="2" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </span>
          )}
        </div>
        </div>
      </div>

      {showLegend && <StatusLegend />}

      {/* Card grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#909399' }}>
          <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'center' }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><circle cx="15" cy="15" r="11" stroke="#C0C4CC" strokeWidth="2"/><line x1="23" y1="23" x2="33" y2="33" stroke="#C0C4CC" strokeWidth="2.2" strokeLinecap="round"/></svg>
          </div>
          <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 6 }}>找不到符合「{search}」的廠商</div>
          <button style={{ ...sharedBtns.plain, marginTop: 8 }} onClick={() => setSearch('')}>清除搜尋</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {filtered.map(v => <VendorCard key={v.id} vendor={v} onOpen={onOpenVendor} />)}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { VendorCategoryPanel, HUB_VENDORS, ERROR_STATUSES });
