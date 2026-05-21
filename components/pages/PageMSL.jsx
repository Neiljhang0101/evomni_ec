
// ─── Extra button styles ──────────────────────────────────────────────────────
const warnBtn  = { height: 40, padding: '0 16px', background: '#E6A23C', color: '#fff', border: '1px solid #E6A23C', borderRadius: 0, cursor: 'pointer', fontFamily: 'Noto Sans TC,sans-serif', fontSize: 14 };
const smPlain  = { height: 32, padding: '0 12px', background: '#fff', color: '#606266', border: '1px solid #DCDFE6', borderRadius: 0, cursor: 'pointer', fontFamily: 'Noto Sans TC,sans-serif', fontSize: 13 };

// ─── SVG icon set ────────────────────────────────────────────────────────────
function IconCheck({ color = '#67C23A', size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 15 15" fill="none">
      <circle cx="7.5" cy="7.5" r="6.5" stroke={color} strokeWidth="1.4"/>
      <path d="M4.5 7.5l2 2 4-4" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconX({ color = '#F56C6C', size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 15 15" fill="none">
      <circle cx="7.5" cy="7.5" r="6.5" stroke={color} strokeWidth="1.4"/>
      <path d="M10 5L5 10M5 5l5 5" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}
function IconClock({ color = '#909399', size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 15 15" fill="none">
      <circle cx="7.5" cy="7.5" r="6.5" stroke={color} strokeWidth="1.4"/>
      <path d="M7.5 4.5v3.5l2 1.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function MSLIconCopy({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 13 13" fill="none">
      <rect x="4" y="4" width="8" height="8" rx="0" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M1 9V2a1 1 0 0 1 1-1h7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}
function MSLIconInfo({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" stroke="#909399" strokeWidth="1.2"/>
      <line x1="7" y1="6" x2="7" y2="10" stroke="#909399" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="7" cy="4.5" r="0.6" fill="#909399"/>
    </svg>
  );
}
function MSLIconExternal({ size = 11 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 11 11" fill="none" style={{ marginLeft: 3, verticalAlign: 'middle', opacity: 0.7 }}>
      <path d="M4.5 1.5H1.5a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M7.5 1h2.5v2.5M10 1L5.5 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconWarn({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M7 1.5L13 12.5H1L7 1.5Z" stroke="#E6A23C" strokeWidth="1.3" strokeLinejoin="round"/>
      <line x1="7" y1="5.5" x2="7" y2="8.5" stroke="#E6A23C" strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="7" cy="10.5" r="0.6" fill="#E6A23C"/>
    </svg>
  );
}

// ─── Shared local components ──────────────────────────────────────────────────

function MSLDemoNav({ current, onChange }) {
  const items = [
    { id: 's1', label: 'S1 美安串接設定' },
    { id: 's2', label: 'S2 訂單列表' },
    { id: 's3', label: 'S3 訂單詳情 / 美安卡片' },
  ];
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
      {items.map(item => (
        <button key={item.id} onClick={() => onChange(item.id)}
          style={{ height: 32, padding: '0 14px', background: current === item.id ? '#303133' : '#fff', color: current === item.id ? '#fff' : '#606266', border: `1px solid ${current === item.id ? '#303133' : '#DCDFE6'}`, borderRadius: 0, cursor: 'pointer', fontSize: 13, fontFamily: 'Noto Sans TC,sans-serif' }}>
          {item.label}
        </button>
      ))}
    </div>
  );
}

function MSLTip({ content }) {
  const [show, setShow] = React.useState(false);
  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', marginLeft: 5, verticalAlign: 'middle', cursor: 'help' }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <MSLIconInfo />
      {show && (
        <div style={{ position: 'absolute', left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: 8, background: '#303133', color: '#fff', borderRadius: 4, padding: '8px 12px', fontSize: 12, width: 230, lineHeight: 1.6, zIndex: 9999, pointerEvents: 'none', whiteSpace: 'normal' }}>
          {content}
        </div>
      )}
    </span>
  );
}

function MeianTag() {
  return (
    <span style={{ display: 'inline-block', padding: '1px 8px', background: '#f0f9eb', border: '1px solid #b3e19d', color: '#67C23A', fontSize: 12, borderRadius: 9999, fontWeight: 500, lineHeight: '20px' }}>
      美安
    </span>
  );
}

function MSLSectionTitle({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '28px 0 18px' }}>
      <span style={{ fontSize: 15, fontWeight: 700, color: '#303133', whiteSpace: 'nowrap' }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: '#DCDFE6' }} />
    </div>
  );
}

function MSLInfoBanner({ children }) {
  return (
    <div style={{ background: '#ECF5FF', border: '1px solid #b3d8ff', padding: '10px 16px', display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, marginBottom: 20, borderRadius: 3 }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
        <circle cx="7" cy="7" r="6" stroke="#409EFF" strokeWidth="1.2"/>
        <line x1="7" y1="6" x2="7" y2="10" stroke="#409EFF" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="7" cy="4.5" r="0.6" fill="#409EFF"/>
      </svg>
      <span style={{ color: '#606266' }}>{children}</span>
    </div>
  );
}

function MSLWarnBanner({ children }) {
  return (
    <div style={{ background: '#FDF6EC', border: '1px solid #f5dab1', padding: '10px 16px', display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, marginBottom: 0, borderRadius: 3 }}>
      <span style={{ flexShrink: 0, marginTop: 1 }}><IconWarn /></span>
      <span style={{ color: '#606266' }}>{children}</span>
    </div>
  );
}

function ErrorBanner({ children }) {
  return (
    <div style={{ background: '#FEF0F0', border: '1px solid #fde2e2', padding: '10px 16px', display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, marginBottom: 0, borderRadius: 3 }}>
      <span style={{ flexShrink: 0, marginTop: 1 }}><IconX size={14} color="#F56C6C" /></span>
      <span style={{ color: '#F56C6C' }}>{children}</span>
    </div>
  );
}


function StatusRow({ label, icon, text, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10, fontSize: 14 }}>
      <span style={{ color: '#909399', width: 96, flexShrink: 0 }}>{label}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 6, color }}>
        {icon}{text}
      </span>
    </div>
  );
}

function DateRangeInput({ from, to, onFromChange, onToChange, onClear }) {
  const hasDates = from || to;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <EInput type="date" value={from} onChange={onFromChange} width={160} />
      <span style={{ color: '#C0C4CC', fontSize: 13 }}>至</span>
      <EInput type="date" value={to} onChange={onToChange} width={160} />
      {hasDates && (
        <button onClick={onClear}
          style={{ height: 36, padding: '0 10px', background: 'none', border: 'none', cursor: 'pointer', color: '#909399', fontSize: 13, fontFamily: 'Noto Sans TC,sans-serif' }}>
          清空
        </button>
      )}
    </div>
  );
}

// ─── Screen 1: 美安串接設定頁 ─────────────────────────────────────────────────

function SettingsScreen({ toast }) {
  const [demoMode,      setDemoMode]      = React.useState('configured');
  const [storeId,       setStoreId]       = React.useState('EVOMNI-TW-001');
  const [accessMasked,  setAccessMasked]  = React.useState(true);
  const [accessKey,     setAccessKey]     = React.useState('');
  const [secretMasked,  setSecretMasked]  = React.useState(true);
  const [secretKey,     setSecretKey]     = React.useState('');
  const [category,      setCategory]      = React.useState('精選產品');
  const [refreshing,    setRefreshing]    = React.useState(false);
  const [saving,        setSaving]        = React.useState(false);
  const [errors,        setErrors]        = React.useState({});

  const switchToInitial = () => {
    setDemoMode('initial'); setStoreId(''); setAccessMasked(false); setAccessKey('');
    setSecretMasked(false); setSecretKey(''); setCategory(''); setErrors({});
  };
  const switchToConfigured = () => {
    setDemoMode('configured'); setStoreId('EVOMNI-TW-001'); setAccessMasked(true);
    setSecretMasked(true); setCategory('精選產品'); setErrors({});
  };

  const XML_URL     = 'https://yourstore.com/api/meian/a7f93c/product-feed.xml';
  const LAST_UPDATE = '2026/05/14 02:00:12';

  const xmlFields = [
    { f: '<category>',    e: '產品中心 > 分類',           n: '無分類者用上方「預設分類名稱」填入' },
    { f: '<largeimage>',  e: '產品第一張圖片',             n: '僅使用 JPG；系統自動將 PNG/WebP 轉為 JPG' },
    { f: '<price>',       e: '產品 > 定價（原價）',        n: '必須設定定價才能生成 XML；定價 = MSRP' },
    { f: '<saleprice>',   e: '產品 > 售價（實際交易金額）',n: '若只設定定價未設定售價，產品無法下單' },
    { f: '<description>', e: '產品 > 基本資料 > 產品說明', n: '需包含純文字（不可只有圖片/影片）' },
    { f: '<name>',        e: '產品名稱',                   n: '—' },
    { f: '<url>',         e: '產品前台頁面 URL',           n: '系統自動生成' },
  ];

  const handleSave = () => {
    const errs = {};
    if (!storeId.trim())                   errs.storeId    = '請填入美安 Store ID';
    if (!accessMasked && !accessKey.trim()) errs.accessKey  = '請填入 API Access Key';
    if (!secretMasked && !secretKey.trim()) errs.secretKey  = '請填入 API Secret Key';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setAccessMasked(true);
      setSecretMasked(true);
      setErrors({});
      toast('美安串接設定已儲存', 'success');
    }, 1300);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast('XML 已重新生成', 'success');
    }, 1800);
  };

  return (
    <div>
      <PageHeader title="美安串接設定" breadcrumbs={['全域設定', '美安串接設定']} />

      <div style={{ background: '#FDF6EC', border: '1px solid #FAECD8', borderRadius: 3, padding: '10px 16px', marginBottom: 20, fontSize: 13, color: '#606266', lineHeight: 1.8 }}>
        美安（Market America）是特定直銷業者的訂單管理平台。如果你的業務涉及美安分銷商，需要在此設定訂單同步，讓美安的訂單自動同步至本系統。
      </div>

      <div style={{ background: '#ECF5FF', border: '1px solid #b3d8ff', padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#409EFF', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', borderRadius: 3 }}>
        <span style={{ fontWeight: 500 }}>設定頁狀態（Prototype 切換）：</span>
        <span style={{ display: 'flex', gap: 6 }}>
          {[['configured', '已設定（API 已儲存）'], ['initial', '初次設定（空白）']].map(([k, v]) => (
            <button key={k} onClick={() => k === 'initial' ? switchToInitial() : switchToConfigured()}
              style={{ height: 28, padding: '0 10px', background: demoMode === k ? '#409EFF' : '#fff', color: demoMode === k ? '#fff' : '#409EFF', border: '1px solid #409EFF', borderRadius: 0, cursor: 'pointer', fontSize: 12, fontFamily: 'Noto Sans TC,sans-serif' }}>
              {v}
            </button>
          ))}
        </span>
      </div>

      <MSLInfoBanner>
        美安（Market America）串接可讓美安 IBO 的導購訂單自動被系統識別並傳送至美安平台。串接完成後，系統將自動維護產品 XML Feed 並識別美安來源的訂單。
      </MSLInfoBanner>

      <div style={{ background: '#fff', border: '1px solid #DCDFE6', padding: '8px 28px 28px', borderRadius: 3 }}>

        <MSLSectionTitle label="API 連線設定" />

        <FormField label="美安 Store ID" required error={errors.storeId}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <EInput value={storeId} onChange={v => { setStoreId(v); setErrors(e => ({ ...e, storeId: '' })); }} placeholder="請填入美安提供的 Store ID" width={400} />
            <MSLTip content="由美安窗口提供，通常為英數字組合" />
          </div>
        </FormField>

        <FormField label="API Access Key" required error={errors.accessKey}>
          {accessMasked ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 40 }}>
              <span style={{ fontSize: 14, color: '#909399', letterSpacing: 3 }}>••••••••••••</span>
              <button style={{ ...sharedBtns.text, height: 32 }} onClick={() => { setAccessMasked(false); setAccessKey(''); }}>重新設定</button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: 400 }}><PasswordInput value={accessKey} onChange={v => { setAccessKey(v); setErrors(e => ({ ...e, accessKey: '' })); }} placeholder="請填入 API Access Key" /></div>
              <MSLTip content="由美安窗口提供的 API 存取金鑰" />
            </div>
          )}
        </FormField>

        <FormField label="API Secret Key" required error={errors.secretKey}>
          {secretMasked ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 40 }}>
              <span style={{ fontSize: 14, color: '#909399', letterSpacing: 3 }}>••••••••••••</span>
              <button style={{ ...sharedBtns.text, height: 32 }} onClick={() => { setSecretMasked(false); setSecretKey(''); }}>重新設定</button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: 400 }}><PasswordInput value={secretKey} onChange={v => { setSecretKey(v); setErrors(e => ({ ...e, secretKey: '' })); }} placeholder="請填入 API Secret Key" /></div>
              <MSLTip content="由美安窗口提供的 API 密鑰，請妥善保管" />
            </div>
          )}
        </FormField>

        <button style={{ ...sharedBtns.primary, opacity: saving ? 0.7 : 1 }} onClick={handleSave} disabled={saving}>
          {saving ? '儲存中…' : '儲存設定'}
        </button>

        <MSLSectionTitle label="產品目錄 XML Feed" />

        <FormField label="XML Feed URL">
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ flex: 1, maxWidth: 560, display: 'flex', border: '1px solid #DCDFE6', background: '#F5F7FA', height: 40, alignItems: 'center' }}>
              <input value={XML_URL} readOnly style={{ flex: 1, padding: '0 10px', border: 'none', background: 'transparent', fontSize: 13, color: '#606266', outline: 'none', fontFamily: 'Noto Sans TC,sans-serif' }} />
            </div>
            <button style={{ ...sharedBtns.plain, height: 40, fontSize: 13, display: 'flex', alignItems: 'center', gap: 5 }} onClick={() => toast('已複製網址', 'info')}>
              <MSLIconCopy /> 複製網址
            </button>
          </div>
          <div style={{ fontSize: 12, color: '#909399', marginTop: 6 }}>此 URL 提供給美安設定定期自動抓取。系統每日凌晨 02:00 自動更新 XML 資料。</div>
        </FormField>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: '#909399' }}>最後更新：<span style={{ color: '#606266' }}>{LAST_UPDATE}</span></span>
          <button style={{ ...sharedBtns.plain, height: 36, fontSize: 13, opacity: refreshing ? 0.7 : 1 }} onClick={handleRefresh} disabled={refreshing}>
            {refreshing ? '生成中…' : '立即重新生成 XML'}
          </button>
        </div>
        <div style={{ fontSize: 12, color: '#909399', marginBottom: 20 }}>若剛剛修改了產品資料，可點此立即重新生成 XML，無需等待每日排程</div>

        <FormField label="美安預設分類名稱" helper="若產品未設定分類，美安 XML 的 category 欄位將使用此名稱。若產品已設定分類，以實際分類名稱優先。">
          <EInput value={category} onChange={setCategory} placeholder="例：精選產品" width={300} />
        </FormField>

        <MSLSectionTitle label="XML 必填欄位對應說明" />

        <TableWrapper style={{ marginBottom: 16 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                {['美安 XML 欄位', '對應 Evomni 欄位', '備註'].map(h => (
                  <th key={h} style={{ ...tableThStyle, fontSize: 12, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {xmlFields.map((row, i) => (
                <tr key={i} style={{ borderBottom: i < xmlFields.length - 1 ? '1px solid #DCDFE6' : 'none', background: i % 2 === 0 ? '#fff' : '#FAFAFA' }}>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontSize: 13, color: '#409EFF', whiteSpace: 'nowrap' }}>{row.f}</td>
                  <td style={{ padding: '10px 14px', fontSize: 13 }}>{row.e}</td>
                  <td style={{ padding: '10px 14px', fontSize: 13, color: '#606266' }}>{row.n}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrapper>

        <MSLWarnBanner>
          注意：產品說明如果只有圖片或影片（無文字），美安 XML 驗測將不通過。請確認每件產品至少有一段文字說明。
        </MSLWarnBanner>
      </div>
    </div>
  );
}

// ─── Screen 2: 訂單列表頁（含美安修改） ───────────────────────────────────────

function OrderListScreen({ toast }) {
  const [srcFilter,      setSrcFilter]      = React.useState('');
  const [showExport,     setShowExport]     = React.useState(false);
  const [exporting,      setExporting]      = React.useState(false);
  const [dateFrom,       setDateFrom]       = React.useState('');
  const [dateTo,         setDateTo]         = React.useState('');

  const ORDERS = [
    { id: 'ORD-20260514-001', date: '2026/05/14 14:22', src: 'meian',  amt: 'NT$2,880', status: '已確認成立' },
    { id: 'ORD-20260514-002', date: '2026/05/14 13:10', src: 'normal', amt: 'NT$590',   status: '待付款' },
    { id: 'ORD-20260513-015', date: '2026/05/13 17:44', src: 'meian',  amt: 'NT$4,200', status: '已出貨' },
    { id: 'ORD-20260513-009', date: '2026/05/13 11:20', src: 'normal', amt: 'NT$1,180', status: '已確認成立' },
    { id: 'ORD-20260512-022', date: '2026/05/12 09:35', src: 'meian',  amt: 'NT$3,560', status: '已完成' },
    { id: 'ORD-20260511-007', date: '2026/05/11 16:08', src: 'normal', amt: 'NT$840',   status: '已取消' },
    { id: 'ORD-20260511-003', date: '2026/05/11 10:11', src: 'meian',  amt: 'NT$6,480', status: '已完成' },
  ];

  const statusColor = { '已確認成立': '#409EFF', '待付款': '#E6A23C', '已出貨': '#67C23A', '已完成': '#67C23A', '已取消': '#909399' };

  const filtered = !srcFilter ? ORDERS
    : srcFilter === 'meian'  ? ORDERS.filter(o => o.src === 'meian')
    : ORDERS.filter(o => o.src === 'normal');

  const meianCount = ORDERS.filter(o => o.src === 'meian').length;
  const filteredMeianCount = (dateFrom || dateTo) ? Math.max(0, meianCount - 2) : meianCount;

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setShowExport(false);
      setDateFrom('');
      setDateTo('');
      toast('美安報表已開始生成，完成後將寄送至您的信箱', 'success');
    }, 1600);
  };

  return (
    <div>
      <PageHeader title="訂單管理" breadcrumbs={['訂單管理']} />

      <div style={{ background: '#fff', border: '1px solid #DCDFE6', borderBottom: 'none', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', borderRadius: '3px 3px 0 0' }}>
        <EInput placeholder="搜尋訂單編號 / 消費者姓名" width={220} />
        <span style={{ fontSize: 13, color: '#606266', whiteSpace: 'nowrap' }}>訂單來源</span>
        <ESelect
          value={srcFilter}
          onChange={setSrcFilter}
          options={[{ value: 'meian', label: '美安訂單' }, { value: 'normal', label: '一般訂單' }]}
          placeholder="全部"
          width={130}
        />
        <div style={{ flex: 1 }} />
        <button style={sharedBtns.plain} onClick={() => setShowExport(true)}>匯出美安報表</button>
      </div>

      <div style={{ background: '#fff', border: '1px solid #DCDFE6', borderRadius: '0 0 3px 3px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#FAFAFA' }}>
              {['訂單編號', '下單時間', '訂單來源', '訂單金額', '訂單狀態', ''].map((h, i) => (
                <th key={i} style={{ padding: '11px 14px', textAlign: 'left', fontSize: 13, color: '#606266', fontWeight: 500, borderBottom: '1px solid #DCDFE6', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '56px 0', textAlign: 'center' }}>
                  <div style={{ fontSize: 28, marginBottom: 12, color: '#C0C4CC' }}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="4" y="8" width="32" height="26" rx="0" stroke="#C0C4CC" strokeWidth="2"/><path d="M4 14h32" stroke="#C0C4CC" strokeWidth="2"/><path d="M12 22h16M12 28h10" stroke="#C0C4CC" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </div>
                  <div style={{ color: '#909399', fontSize: 14, marginBottom: 6 }}>目前沒有美安訂單</div>
                  <div style={{ color: '#C0C4CC', fontSize: 13 }}>美安 IBO 帶入的消費者下單後，訂單將自動顯示在這裡</div>
                </td>
              </tr>
            ) : filtered.map((o, i) => (
              <tr key={o.id}
                style={{ background: tableRowBg(i), borderBottom: i < filtered.length - 1 ? '1px solid #DCDFE6' : 'none', cursor: 'pointer' }}
                {...tableRowHandlers(i, false)}>
                <td style={{ padding: '11px 14px', color: '#409EFF', fontSize: 13 }}>{o.id}</td>
                <td style={{ padding: '11px 14px', fontSize: 13, color: '#606266' }}>{o.date}</td>
                <td style={{ padding: '11px 14px', width: 88 }}>{o.src === 'meian' ? <MeianTag /> : null}</td>
                <td style={{ padding: '11px 14px', fontSize: 13 }}>{o.amt}</td>
                <td style={{ padding: '11px 14px', fontSize: 13 }}>
                  <span style={{ color: statusColor[o.status] || '#606266' }}>{o.status}</span>
                </td>
                <td style={{ padding: '11px 14px' }}>
                  <button style={{ ...sharedBtns.text, height: 30, fontSize: 13, padding: '0 4px' }}>查看</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog
        open={showExport}
        width={480}
        title="匯出美安報表"
        onClose={() => { if (!exporting) setShowExport(false); }}
        footer={
          <>
            <button style={sharedBtns.plain} onClick={() => setShowExport(false)} disabled={exporting}>取消</button>
            <button style={{ ...sharedBtns.create, opacity: exporting ? 0.7 : 1 }} onClick={handleExport} disabled={exporting}>
              {exporting ? '準備中…' : '確認匯出'}
            </button>
          </>
        }
      >
        <div style={{ fontSize: 14, color: '#303133', marginBottom: 16 }}>
          將匯出 <strong>{filteredMeianCount} 筆</strong>美安訂單資料（已排除取消訂單）
        </div>
        <FormField label="篩選時間範圍" helper="不選則匯出全部歷史記錄">
          <DateRangeInput
            from={dateFrom} to={dateTo}
            onFromChange={setDateFrom} onToChange={setDateTo}
            onClear={() => { setDateFrom(''); setDateTo(''); }}
          />
        </FormField>
        <div style={{ fontSize: 12, color: '#909399', marginTop: 4 }}>僅匯出美安訂單，且排除已取消訂單</div>
      </Dialog>
    </div>
  );
}

// ─── Screen 3: 訂單詳情頁 — 美安訂單資訊卡片 ──────────────────────────────────

function OrderDetailScreen({ toast }) {
  const [cardState,     setCardState]     = React.useState('A');
  const [showCancel,    setShowCancel]    = React.useState(false);
  const [showManual,    setShowManual]    = React.useState(false);
  const [cancelLoading, setCancelLoading] = React.useState(false);
  const [manualLoading, setManualLoading] = React.useState(false);
  const [retrying,      setRetrying]      = React.useState(false);
  const [confirmTxt,    setConfirmTxt]    = React.useState('');
  const [isSuperAdmin, setIsSuperAdmin] = React.useState(true);

  const handleRetry = () => {
    setRetrying(true);
    setTimeout(() => { setRetrying(false); setCardState('A'); toast('已成功傳送至美安', 'success'); }, 1800);
  };
  const handleCancelConfirm = () => {
    setCancelLoading(true);
    setTimeout(() => { setCancelLoading(false); setShowCancel(false); setCardState('E'); toast('已通知美安此訂單已取消', 'success'); }, 1500);
  };
  const handleManualConfirm = () => {
    setManualLoading(true);
    setTimeout(() => { setManualLoading(false); setShowManual(false); setCardState('A'); setConfirmTxt(''); toast('已手動傳送此訂單至美安', 'success'); }, 1600);
  };

  const isConfirmable = confirmTxt === '確認';

  const orderStatus = (cardState === 'D' || cardState === 'E') ? '已取消' : '已確認成立';

  const stateLabels = { A: 'A — 傳送成功', B: 'B — 傳送失敗', C: 'C — 等待中', D: 'D — 可傳取消', E: 'E — 已傳取消' };

  const MeianCard = () => {
    const rowStyle = { display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10, fontSize: 14 };
    const LBL      = { color: '#909399', width: 100, flexShrink: 0 };
    const identityRow = (
      <div style={rowStyle}>
        <span style={LBL}>美安識別：</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#67C23A' }}>
          <IconCheck /> 此為美安來源訂單
        </span>
      </div>
    );

    if (cardState === 'A') return (
      <>
        {identityRow}
        <div style={rowStyle}>
          <span style={LBL}>美安訂單狀態：</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#67C23A' }}><IconCheck /> 已傳送至美安</span>
        </div>
        <div style={rowStyle}>
          <span style={LBL}>傳送時間：</span>
          <span style={{ color: '#606266' }}>2026/05/14 10:35:22</span>
        </div>
        {isSuperAdmin && (
          <button style={{ ...sharedBtns.text, height: 30, paddingLeft: 0 }} onClick={() => toast('開啟傳送 LOG（新分頁）', 'info')}>
            查看傳送 LOG
          </button>
        )}
      </>
    );

    if (cardState === 'B') return (
      <>
        {identityRow}
        <div style={rowStyle}>
          <span style={LBL}>美安訂單狀態：</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#F56C6C' }}><IconX /> 傳送失敗</span>
        </div>
        <div style={{ marginBottom: 10 }}>
          <span style={{ fontSize: 14, color: '#909399', display: 'block', marginBottom: 6 }}>錯誤訊息：</span>
          <ErrorBanner>API Error: Invalid store credentials (403)</ErrorBanner>
        </div>
        <div style={{ marginBottom: 10 }}>
          <button style={{ ...sharedBtns.create, opacity: retrying ? 0.7 : 1 }} onClick={handleRetry} disabled={retrying}>
            {retrying ? '傳送中…' : '重新傳送至美安'}
          </button>
        </div>
        {isSuperAdmin && (
          <button style={{ ...sharedBtns.text, height: 30, paddingLeft: 0 }} onClick={() => toast('開啟傳送 LOG（新分頁）', 'info')}>
            查看傳送 LOG
          </button>
        )}
      </>
    );

    if (cardState === 'C') return (
      <>
        {identityRow}
        <div style={rowStyle}>
          <span style={LBL}>美安訂單狀態：</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#909399' }}><IconClock /> 等待訂單確認成立後自動傳送</span>
        </div>
      </>
    );

    if (cardState === 'D') return (
      <>
        {identityRow}
        <div style={rowStyle}>
          <span style={LBL}>美安訂單狀態：</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#67C23A' }}><IconCheck /> 已傳送至美安（原確認成立訂單）</span>
        </div>
        <div style={{ marginBottom: 6 }}>
          <button style={warnBtn} onClick={() => setShowCancel(true)}>傳送未完成交易至美安</button>
        </div>
        <div style={{ fontSize: 12, color: '#909399' }}>點擊後系統將通知美安此訂單已取消，按鈕點擊後將消失。</div>
      </>
    );

    if (cardState === 'E') return (
      <>
        {identityRow}
        <div style={rowStyle}>
          <span style={LBL}>美安訂單狀態：</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#67C23A' }}><IconCheck /> 已傳送至美安</span>
        </div>
        <div style={rowStyle}>
          <span style={LBL}>取消通知：</span>
          <span style={{ color: '#606266' }}>已傳送未完成交易（2026/05/14 15:20）</span>
        </div>
      </>
    );
  };

  return (
    <div>
      <PageHeader title="訂單詳情" breadcrumbs={['訂單管理', 'ORD-20260514-001']} />

      <div style={{ background: '#ECF5FF', border: '1px solid #b3d8ff', padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#409EFF', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', borderRadius: 3 }}>
        <span style={{ fontWeight: 500 }}>美安卡片狀態（Prototype 切換）：</span>
        <span style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {Object.entries(stateLabels).map(([k, v]) => (
            <button key={k} onClick={() => { setCardState(k); setRetrying(false); }}
              style={{ height: 28, padding: '0 10px', background: cardState === k ? '#409EFF' : '#fff', color: cardState === k ? '#fff' : '#409EFF', border: '1px solid #409EFF', borderRadius: 0, cursor: 'pointer', fontSize: 12, fontFamily: 'Noto Sans TC,sans-serif' }}>
              {v}
            </button>
          ))}
        </span>
        <span style={{ fontSize: 13, color: '#303133', fontWeight: 500, marginLeft: 4 }}>角色：</span>
        <span style={{ display: 'flex', gap: 6 }}>
          {[['super', '最高權限'], ['normal', '一般管理員']].map(([k, v]) => (
            <button key={k} onClick={() => setIsSuperAdmin(k === 'super')}
              style={{ height: 28, padding: '0 10px', background: (isSuperAdmin ? 'super' : 'normal') === k ? '#409EFF' : '#fff', color: (isSuperAdmin ? 'super' : 'normal') === k ? '#fff' : '#409EFF', border: '1px solid #409EFF', borderRadius: 0, cursor: 'pointer', fontSize: 12, fontFamily: 'Noto Sans TC,sans-serif' }}>
              {v}
            </button>
          ))}
        </span>
      </div>

      <div style={{ background: '#fff', border: '1px solid #DCDFE6', padding: '20px 24px', marginBottom: 12, borderRadius: 3 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>訂單資訊</div>
        {[
          ['訂單編號', 'ORD-20260514-001'],
          ['下單時間', '2026/05/14 14:22:08'],
          ['訂單狀態', orderStatus],
          ['消費者',   '林小明'],
          ['訂單金額', 'NT$2,880'],
        ].map(([l, v]) => (
          <div key={l} style={{ display: 'flex', gap: 12, marginBottom: 8, fontSize: 14 }}>
            <span style={{ color: '#909399', width: 72, flexShrink: 0 }}>{l}</span>
            <span style={{ color: '#303133' }}>{v}</span>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', border: '1px solid #DCDFE6', padding: '20px 24px', marginBottom: 12, borderRadius: 3 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>產品明細</div>
        <div style={{ fontSize: 13, color: '#606266' }}>Evomni 精選保健組合 &times;2 — NT$2,880</div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #DCDFE6', padding: '20px 24px', borderRadius: 3 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          美安訂單資訊 <MeianTag />
        </div>

        <MeianCard />

        {isSuperAdmin && (
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #DCDFE6' }}>
            <button style={sharedBtns.plain} onClick={() => setShowManual(true)}>手動傳送此訂單至美安</button>
            <div style={{ fontSize: 12, color: '#909399', marginTop: 6 }}>用於補傳自動識別失敗的訂單，或特殊情況的人工補傳</div>
          </div>
        )}
      </div>

      <Dialog
        open={showCancel}
        width={400}
        title="確認傳送取消通知"
        onClose={() => { if (!cancelLoading) setShowCancel(false); }}
        footer={
          <>
            <button style={sharedBtns.plain} onClick={() => setShowCancel(false)} disabled={cancelLoading}>取消</button>
            <button style={{ ...warnBtn, opacity: cancelLoading ? 0.7 : 1 }} onClick={handleCancelConfirm} disabled={cancelLoading}>
              {cancelLoading ? '傳送中…' : '確認傳送'}
            </button>
          </>
        }
      >
        <div style={{ fontSize: 14, color: '#303133', marginBottom: 14 }}>
          確定要通知美安此訂單（<strong>#ORD-20260514-001</strong>）已取消？
        </div>
        <MSLWarnBanner>操作成功後，此按鈕將消失，無法重複操作。</MSLWarnBanner>
      </Dialog>

      <Dialog
        open={showManual}
        width={440}
        title="手動傳送訂單至美安"
        onClose={() => { if (!manualLoading) { setShowManual(false); setConfirmTxt(''); } }}
        footer={
          <>
            <button style={sharedBtns.plain} onClick={() => { setShowManual(false); setConfirmTxt(''); }} disabled={manualLoading}>取消</button>
            <button
              style={{ ...sharedBtns.create, opacity: (!isConfirmable || manualLoading) ? 0.45 : 1, cursor: !isConfirmable ? 'not-allowed' : 'pointer' }}
              onClick={isConfirmable && !manualLoading ? handleManualConfirm : undefined}
              disabled={!isConfirmable || manualLoading}>
              {manualLoading ? '傳送中…' : '確認傳送'}
            </button>
          </>
        }
      >
        <MSLWarnBanner>
          此操作將強制傳送訂單 #ORD-20260514-001 至美安平台。此為人工補傳操作，請確認此訂單確實為美安來源訂單。
        </MSLWarnBanner>
        <div style={{ marginTop: 16 }}>
          <FormField
            label={'請輸入「確認」以繼續'}
            helper={'輸入與「確認」完全相符後才可操作'}
          >
            <EInput value={confirmTxt} onChange={setConfirmTxt} placeholder="確認" width={180} />
          </FormField>
        </div>
      </Dialog>
    </div>
  );
}

// ─── PageMSL ──────────────────────────────────────────────────────────────────

function PageMSL({ onNavigate, show }) {
  const toast = show || (() => {});
  const [screen, setScreen] = React.useState('s1');

  const renderScreen = () => {
    if (screen === 's1') return <SettingsScreen toast={toast} />;
    if (screen === 's2') return <OrderListScreen toast={toast} />;
    if (screen === 's3') return <OrderDetailScreen toast={toast} />;
    return null;
  };

  return (
    <div>
      <MSLDemoNav current={screen} onChange={setScreen} />
      {renderScreen()}
    </div>
  );
}
