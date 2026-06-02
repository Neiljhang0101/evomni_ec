// PageSystemPages — 網站設計 > 系統分頁

// ─── Constants ────────────────────────────────────────────────────────────────
const SPC = {
  border:  '#DCDFE6',
  bg:      '#F5F7FA',
  white:   '#FFFFFF',
  text:    '#303133',
  text2:   '#606266',
  muted:   '#909399',
  blue:    '#409EFF',
  green:   '#67C23A',
  orange:  '#E6A23C',
  red:     '#F56C6C',
  purple:  '#7C3AED',
};

// ─── Initial Data ─────────────────────────────────────────────────────────────
const SP_INIT_PAGES = [
  {
    id: 'privacy', name: '隱私權政策', type: 'legal',
    status: 'set', path: '/privacy-policy',
    pageTitle: '隱私權政策 | Evomni', slug: '/privacy-policy', enabled: true,
    content: '本隱私權政策說明 Evomni 電商平台如何蒐集、使用及保護您的個人資料。當您使用本平台時，即表示您同意本政策的所有條款。\n\n一、資料蒐集範圍\n我們蒐集的個人資料包含：姓名、電子郵件、配送地址、電話號碼及購買記錄。\n\n二、資料使用目的\n所蒐集之個人資料僅用於訂單處理、客戶服務及改善服務品質，不會無故提供給第三方。\n\n三、資料保護\n本公司採用業界標準的加密技術保護您的個人資料，防止未授權的存取或洩漏。',
    seoDesc: '了解 Evomni 如何蒐集、使用及保護您的個人資料，閱讀完整隱私權政策。',
    errorTitle: '', errorDesc: '', errorBtn: '', errorBtnLink: '',
  },
  {
    id: 'terms', name: '服務條款', type: 'legal',
    status: 'set', path: '/terms-of-service',
    pageTitle: '服務條款 | Evomni', slug: '/terms-of-service', enabled: true,
    content: '請在使用本平台前詳細閱讀以下服務條款。使用本服務即表示您同意遵守本條款。\n\n一、服務說明\nEvomni 提供電子商務解決方案，包含商品展示、購物車及金流服務。\n\n二、用戶義務\n用戶應確保所提供之個人資料真實正確，並對帳號安全負責。用戶不得將帳號轉讓或共用。\n\n三、智慧財產權\n本平台所有內容之智慧財產權均歸屬本公司所有，未經授權不得複製或散布。',
    seoDesc: '閱讀 Evomni 電商平台完整服務條款，了解您的權利與義務。',
    errorTitle: '', errorDesc: '', errorBtn: '', errorBtnLink: '',
  },
  {
    id: 'cookie', name: '餅乾政策（Cookie）', type: 'legal',
    status: 'set', path: '/cookie-policy',
    pageTitle: '餅乾政策（Cookie）| Evomni', slug: '/cookie-policy', enabled: true,
    content: '本網站使用 Cookie 及相似的追蹤技術，以提升您的瀏覽體驗、分析網站流量及提供個人化內容。\n\n一、什麼是 Cookie\nCookie 是儲存於您瀏覽器中的小型文字檔案，用於記錄您的偏好設定與行為紀錄。\n\n二、我們使用的 Cookie 類型\n必要性 Cookie：確保網站基本功能正常運作。\n功能性 Cookie：記住您的語言設定與偏好。\n分析性 Cookie：幫助我們了解訪客如何使用網站（匿名統計）。\n\n三、Cookie 的管理\n您可以透過瀏覽器設定拒絕或刪除 Cookie，但部分功能可能因此受到影響。',
    seoDesc: '了解 Evomni 如何使用 Cookie 及追蹤技術，閱讀完整餅乾政策。',
    errorTitle: '', errorDesc: '', errorBtn: '', errorBtnLink: '',
  },
  {
    id: 'disclaimer', name: '免責聲明', type: 'legal',
    status: 'set', path: '/disclaimer',
    pageTitle: '免責聲明 | Evomni', slug: '/disclaimer', enabled: true,
    content: '本免責聲明適用於 Evomni 電商平台及其所有關聯服務。\n\n一、資訊準確性\n本網站所提供之產品描述、價格及庫存資訊雖力求正確，但不排除因系統延遲或人為疏失而產生誤差。如有差異，本公司保留最終解釋權。\n\n二、外部連結\n本網站可能包含第三方網站連結，本公司對該等網站之內容或服務不負任何責任。\n\n三、服務中斷\n本公司保留隨時暫停、修改或終止服務的權利，且不對因服務中斷造成之損失負責。',
    seoDesc: '',
    errorTitle: '', errorDesc: '', errorBtn: '', errorBtnLink: '',
  },
  {
    id: 'refund', name: '退款政策', type: 'legal',
    status: 'set', path: '/refund-policy',
    pageTitle: '退款政策 | Evomni', slug: '/refund-policy', enabled: true,
    content: '我們致力於確保您對每次購物的滿意。以下為退款政策說明。\n\n一、退款申請條件\n商品須在收到後 7 天內提出申請。\n商品須保持全新未使用狀態，含原廠包裝及附件。\n特殊商品（數位商品、客製化商品）恕不受理退款。\n\n二、退款流程\n請透過會員中心提交退款申請，並附上訂單編號及原因。\n本公司將於 3 個工作天內審核申請。\n審核通過後，退款將於 7–14 個工作天內退回原付款帳戶。\n\n三、退款金額\n退款金額以實際付款金額為準，運費不予退還（商品瑕疵除外）。',
    seoDesc: '閱讀 Evomni 退款政策，了解退款申請條件、流程與時效。',
    errorTitle: '', errorDesc: '', errorBtn: '', errorBtnLink: '',
  },
  {
    id: 'return-policy', name: '退換貨政策', type: 'legal',
    status: 'set', path: '/return-policy',
    pageTitle: '退換貨政策 | Evomni', slug: '/return-policy', enabled: true,
    content: '為保障您的消費權益，以下為退換貨政策說明。\n\n一、退換貨申請條件\n商品收到後 7 天內可申請退換貨。\n商品須保持全新未使用、未拆封狀態，附原廠包裝、配件及購買憑證。\n因使用不當、人為損毀或消耗性商品，恕不受理。\n\n二、退換貨流程\n1. 於會員中心填寫退換貨申請表，選擇退貨或換貨。\n2. 客服人員將於 2 個工作天內與您確認。\n3. 確認後，請將商品寄回指定地址。\n4. 商品收到並確認符合條件後，退款或補寄將於 7 個工作天內完成。\n\n三、商品瑕疵\n若商品有瑕疵，退換貨運費由本公司全額負擔。',
    seoDesc: '閱讀 Evomni 退換貨政策，了解退換貨條件、流程與期限。',
    errorTitle: '', errorDesc: '', errorBtn: '', errorBtnLink: '',
  },
  {
    id: 'copyright', name: '版權聲明', type: 'legal',
    status: 'set', path: '/copyright',
    pageTitle: '版權聲明 | Evomni', slug: '/copyright', enabled: true,
    content: '本網站所有內容，包含文字、圖片、影音、商標及其他資料，均受中華民國著作權法及國際著作權公約保護。\n\n未經本公司書面授權，任何人不得以任何形式重製、散布、傳播、展示或修改本網站之任何內容。\n\n如需引用或轉載，請事先取得本公司書面同意，並以適當方式標示來源。如有侵權疑慮，請聯繫客服，本公司將儘速處理。',
    seoDesc: '',
    errorTitle: '', errorDesc: '', errorBtn: '', errorBtnLink: '',
  },
  {
    id: 'page-404', name: '404 頁面', type: 'functional',
    status: 'set', path: '系統觸發',
    pageTitle: '404 找不到頁面 | Evomni', slug: '', enabled: true,
    content: '', seoDesc: '',
    errorTitle: '找不到這個頁面',
    errorDesc: '您造訪的頁面不存在或已被移除，請確認網址後再試。',
    errorBtn: '回到首頁', errorBtnLink: '/',
  },
  {
    id: 'page-500', name: '500 頁面', type: 'functional',
    status: 'set', path: '系統觸發',
    pageTitle: '系統錯誤 | Evomni', slug: '', enabled: true,
    content: '', seoDesc: '',
    errorTitle: '系統暫時無法服務',
    errorDesc: '我們正在修復問題，請稍後重新整理頁面再試。',
    errorBtn: '重新整理', errorBtnLink: '',
  },
  {
    id: 'maintenance', name: '維護中頁面', type: 'functional',
    status: 'set', path: '系統觸發',
    pageTitle: '網站維護中 | Evomni', slug: '', enabled: true,
    content: '', seoDesc: '',
    errorTitle: '網站維護中',
    errorDesc: '我們正在進行系統維護，預計完成後將恢復正常服務，敬請稍待。',
    errorBtn: '', errorBtnLink: '',
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────
function SpWarnIcon({ color = SPC.orange, size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
      <path d="M6 1L11.5 11H0.5L6 1Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/>
      <line x1="6" y1="4.5" x2="6" y2="7.5" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="6" cy="9.2" r="0.55" fill={color}/>
    </svg>
  );
}
function SpDot({ color }) {
  return <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />;
}
function SpEyeIcon({ disabled }) {
  const c = disabled ? SPC.border : SPC.muted;
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <ellipse cx="7.5" cy="7.5" rx="6" ry="4" stroke={c} strokeWidth="1.3"/>
      <circle cx="7.5" cy="7.5" r="1.8" stroke={c} strokeWidth="1.3"/>
    </svg>
  );
}
function SpUploadIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <rect x="2" y="4" width="26" height="22" rx="2" stroke={SPC.border} strokeWidth="1.3"/>
      <circle cx="10" cy="11" r="2.3" stroke={SPC.muted} strokeWidth="1.2"/>
      <path d="M2 21l6-5 5 4 4-3 11 5" stroke={SPC.border} strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M19 12v6M16.5 14.5L19 12l2.5 2.5" stroke={SPC.muted} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ─── Status Badge ──────────────────────────────────────────────────────────────
function SpStatusBadge({ status }) {
  const cfg = {
    set:      { label: '已設定', bg: '#F0F9EB', border: '#C2E7B0', color: SPC.green,  icon: <SpDot color={SPC.green}/> },
    unset:    { label: '未設定', bg: '#FEF0E6', border: '#F5DAB1', color: SPC.orange, icon: <SpWarnIcon/> },
    disabled: { label: '停用',   bg: '#F4F4F5', border: '#E9E9EB', color: SPC.muted,  icon: <SpDot color={SPC.muted}/> },
  };
  const c = cfg[status] || cfg.unset;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 9999, background: c.bg, border: `1px solid ${c.border}`, fontSize: 12, color: c.color, fontWeight: 500, whiteSpace: 'nowrap' }}>
      {c.icon}{c.label}
    </span>
  );
}

// ─── Confirm Modal ─────────────────────────────────────────────────────────────
function SpConfirm({ visible, title, body, confirmLabel, danger, onConfirm, onCancel }) {
  if (!visible) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 8000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: SPC.white, width: 420, borderRadius: 4, boxShadow: '0 8px 32px rgba(0,0,0,0.18)', padding: '28px 28px 24px' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: SPC.text, marginBottom: 12 }}>{title}</div>
        <div style={{ fontSize: 14, color: SPC.text2, lineHeight: 1.7, marginBottom: 24 }}>{body}</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button onClick={onCancel}  style={{ height: 36, padding: '0 18px', background: SPC.white, border: `1px solid ${SPC.border}`, borderRadius: 0, cursor: 'pointer', fontSize: 14, color: SPC.text }}>取消</button>
          <button onClick={onConfirm} style={{ height: 36, padding: '0 18px', background: danger ? SPC.red : SPC.purple, color: SPC.white, border: 'none', borderRadius: 0, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>{confirmLabel || '確定'}</button>
        </div>
      </div>
    </div>
  );
}

// ─── Maintenance Banner ───────────────────────────────────────────────────────
function SpMaintBanner({ onGoto }) {
  return (
    <div style={{ background: '#FEF0F0', border: `1px solid #FBBFBF`, borderRadius: 3, padding: '10px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
      <SpWarnIcon color={SPC.red} size={14}/>
      <span style={{ color: SPC.red, flex: 1 }}>目前網站處於<strong>維護模式</strong>，一般訪客無法瀏覽網站。</span>
      <button onClick={onGoto} style={{ background: 'none', border: 'none', color: SPC.red, textDecoration: 'underline', cursor: 'pointer', fontSize: 13, padding: 0 }}>前往維護模式設定</button>
    </div>
  );
}

// ─── Completion Dashboard ─────────────────────────────────────────────────────

// ─── Input helpers ────────────────────────────────────────────────────────────
const SP_INPUT = { height: 34, padding: '0 10px', border: `1px solid ${SPC.border}`, borderRadius: 0, fontSize: 13, fontFamily: 'Noto Sans TC,sans-serif', color: SPC.text, background: SPC.white, outline: 'none', width: '100%' };

// ─── Filter Bar ───────────────────────────────────────────────────────────────
function SpFilterBar({ statusFilter, searchQuery, onStatus, onSearch }) {
  return (
    <div style={{ background: SPC.white, border: `1px solid ${SPC.border}`, padding: '10px 14px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 13, color: SPC.text2, whiteSpace: 'nowrap' }}>狀態</span>
        <select value={statusFilter} onChange={e => onStatus(e.target.value)} style={{ ...SP_INPUT, width: 110, cursor: 'pointer' }}>
          <option value="all">全部狀態</option>
          <option value="set">已設定</option>
          <option value="unset">未設定</option>
          <option value="disabled">停用</option>
        </select>
      </div>
      <div style={{ position: 'relative', flex: 1, minWidth: 180, maxWidth: 280 }}>
        <input value={searchQuery} onChange={e => onSearch(e.target.value)} placeholder="搜尋頁面名稱..." style={SP_INPUT} />
        {searchQuery && (
          <button onClick={() => onSearch('')} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: SPC.muted, padding: 0, fontSize: 14 }}>✕</button>
        )}
      </div>
    </div>
  );
}

// ─── Page Table ───────────────────────────────────────────────────────────────
const SP_TH = { padding: '10px 14px', fontSize: 13, fontWeight: 700, color: SPC.text, background: SPC.bg, borderBottom: `1px solid ${SPC.border}`, textAlign: 'left', whiteSpace: 'nowrap' };

function SpPageRow({ page, odd, onEdit, onToast }) {
  const [hover, setHover] = React.useState(false);
  const tdBase = { padding: '12px 14px', fontSize: 14, color: SPC.text, borderBottom: `1px solid ${SPC.border}`, verticalAlign: 'middle', background: hover ? SPC.bg : (odd ? SPC.white : '#FAFAFA'), transition: 'background .12s' };

  return (
    <tr onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <td style={{ ...tdBase, fontWeight: 500 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {page.name}
        </div>
      </td>
      <td style={tdBase}><SpStatusBadge status={page.status}/></td>
      <td style={{ ...tdBase, color: SPC.muted, fontSize: 12, fontFamily: 'monospace' }}>{page.path}</td>
      <td style={tdBase}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={() => onEdit(page.id)}
            style={{ background: 'none', border: 'none', color: SPC.blue, cursor: 'pointer', fontSize: 13, padding: 0 }}
            onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
            onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
            編輯
          </button>
          <button
            onClick={() => page.status !== 'unset' && onToast(`${page.name} 預覽已在新分頁開啟`, 'info')}
            title={page.status === 'unset' ? '尚未設定內容，無法預覽' : '在新分頁預覽'}
            style={{ background: 'none', border: 'none', cursor: page.status === 'unset' ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: page.status === 'unset' ? SPC.border : SPC.muted, padding: 0, fontSize: 13 }}>
            <SpEyeIcon disabled={page.status === 'unset'}/>預覽
          </button>
        </div>
      </td>
    </tr>
  );
}

// ─── Settings Panel (edit page right sidebar) ─────────────────────────────────
// ─── Rich Text Editor (simulated) ────────────────────────────────────────────
const SP_TOOLBAR_BTNS = ['粗體','斜體','H2','H3','清單','連結','圖片','表格'];

function SpRichEditor({ content, onChange }) {
  const [active, setActive] = React.useState(null);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', border: `1px solid ${SPC.border}`, background: SPC.white, minHeight: 400 }}>
      <div style={{ display: 'flex', gap: 2, padding: '6px 10px', borderBottom: `1px solid ${SPC.border}`, flexWrap: 'wrap', background: '#FAFBFC' }}>
        {SP_TOOLBAR_BTNS.map(b => (
          <button key={b} onClick={() => setActive(b === active ? null : b)}
            style={{ height: 28, padding: '0 10px', background: active === b ? '#EBF4FF' : 'transparent', border: `1px solid ${active === b ? SPC.blue : 'transparent'}`, borderRadius: 0, cursor: 'pointer', fontSize: 12, color: active === b ? SPC.blue : SPC.text2, fontFamily: 'Noto Sans TC,sans-serif' }}>
            {b}
          </button>
        ))}
      </div>
      <textarea value={content} onChange={e => onChange(e.target.value)} placeholder="在此輸入頁面內容..."
        style={{ flex: 1, border: 'none', padding: '16px', fontSize: 14, color: SPC.text, outline: 'none', lineHeight: 1.8, resize: 'vertical', fontFamily: 'Noto Sans TC,sans-serif', minHeight: 360 }}/>
    </div>
  );
}

// ─── Error / Maintenance Form ─────────────────────────────────────────────────
function SpErrorForm({ form, onChange, pageId, maintActive, onToggleMaint }) {
  const [imgUploaded,   setImgUploaded]   = React.useState(!!form.errorTitle && pageId !== 'maintenance');
  const [showMaintConf, setShowMaintConf] = React.useState(false);
  const isMaint = pageId === 'maintenance';

  const fieldLabel = (label, req) => (
    <div style={{ fontSize: 13, color: SPC.text2, marginBottom: 6 }}>
      {req && <span style={{ color: SPC.red, marginRight: 2 }}>*</span>}{label}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        {fieldLabel('標題文字', true)}
        <input value={form.errorTitle} onChange={e => onChange({ errorTitle: e.target.value })} style={{ ...SP_INPUT, width: '100%' }}/>
        <div style={{ fontSize: 11, color: SPC.muted, marginTop: 4 }}>顯示於錯誤頁最顯眼位置</div>
      </div>
      <div>
        {fieldLabel('說明文字')}
        <textarea value={form.errorDesc} onChange={e => onChange({ errorDesc: e.target.value })} rows={3}
          style={{ ...SP_INPUT, width: '100%', height: 'auto', padding: '8px 10px', lineHeight: 1.6, resize: 'none' }}/>
      </div>
      {!isMaint && (
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1 }}>
            {fieldLabel('按鈕文字')}
            <input value={form.errorBtn} onChange={e => onChange({ errorBtn: e.target.value })} style={{ ...SP_INPUT, width: '100%' }}/>
          </div>
          <div style={{ flex: 1 }}>
            {fieldLabel('按鈕連結')}
            <input value={form.errorBtnLink} onChange={e => onChange({ errorBtnLink: e.target.value })} placeholder="/" style={{ ...SP_INPUT, width: '100%' }}/>
          </div>
        </div>
      )}
      <div>
        {fieldLabel('背景圖片或插圖')}
        {imgUploaded ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, border: `1px solid ${SPC.border}`, background: SPC.bg }}>
            <div style={{ width: 72, height: 52, background: '#E9EDF0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 11, color: SPC.muted }}>預覽</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: SPC.text, marginBottom: 3 }}>error-illustration.svg</div>
              <div style={{ fontSize: 12, color: SPC.muted }}>SVG · 24 KB</div>
            </div>
            <button onClick={() => setImgUploaded(false)}
              style={{ background: 'none', border: 'none', color: SPC.red, cursor: 'pointer', fontSize: 13, padding: 0, textDecoration: 'underline' }}>移除</button>
          </div>
        ) : (
          <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: 20, border: `1.5px dashed ${SPC.border}`, cursor: 'pointer', background: '#FAFBFC' }}
            onMouseEnter={e => e.currentTarget.style.background = '#F0F4FF'}
            onMouseLeave={e => e.currentTarget.style.background = '#FAFBFC'}>
            <SpUploadIcon/>
            <span style={{ fontSize: 13, color: SPC.text2 }}>拖曳或點擊上傳背景圖片或插圖</span>
            <span style={{ fontSize: 11, color: SPC.muted }}>支援 JPEG、PNG、SVG、WebP，建議寬度 800px，上限 5MB</span>
            <input type="file" style={{ display: 'none' }} accept=".jpg,.jpeg,.png,.svg,.webp" onChange={() => setImgUploaded(true)}/>
          </label>
        )}
      </div>
      {isMaint && (
        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: SPC.text, marginBottom: 14, paddingBottom: 10, borderBottom: `1px solid ${SPC.border}` }}>維護模式設定</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              {fieldLabel('預計恢復時間')}
              <input type="datetime-local" style={{ ...SP_INPUT, width: '100%', colorScheme: 'light' }}/>
              <div style={{ fontSize: 11, color: SPC.muted, marginTop: 4 }}>填寫後前台將顯示倒數計時；留空則不顯示</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 14, background: maintActive ? '#FEF0F0' : SPC.bg, border: `1px solid ${maintActive ? '#FBBFBF' : SPC.border}` }}>
              <Switch checked={maintActive} onChange={v => v ? setShowMaintConf(true) : onToggleMaint(false)}/>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: maintActive ? SPC.red : SPC.text, marginBottom: 4 }}>
                  啟用維護模式
                  {maintActive && <span style={{ marginLeft: 8, fontSize: 11, color: SPC.red, border: `1px solid ${SPC.red}`, padding: '1px 7px', borderRadius: 9999 }}>啟用中</span>}
                </div>
                <div style={{ fontSize: 12, color: maintActive ? '#E57373' : SPC.muted, lineHeight: 1.6 }}>
                  {maintActive ? '維護模式已啟用，一般訪客目前無法瀏覽網站。' : '啟用後所有訪客（白名單 IP 除外）將看到此維護頁'}
                </div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: SPC.muted }}>
              如需設定可正常瀏覽的 IP 位址，請前往
              <span style={{ color: SPC.blue, cursor: 'pointer', marginLeft: 4, textDecoration: 'underline' }}>系統設定 &gt; 維護模式管理</span>
            </div>
          </div>
          <SpConfirm visible={showMaintConf} title="確定啟用維護模式？"
            body="啟用後，所有訪客（白名單 IP 除外）將立即看到維護頁，無法正常瀏覽網站。"
            confirmLabel="確定啟用" danger
            onConfirm={() => { setShowMaintConf(false); onToggleMaint(true); }}
            onCancel={() => setShowMaintConf(false)}/>
        </div>
      )}
    </div>
  );
}

// ─── Edit View (product-page layout) ─────────────────────────────────────────
function SpEditView({ pageId, pages, onSave, onBack, maintActive, onToggleMaint, spToast }) {
  const page = pages.find(p => p.id === pageId);
  const [form, setForm]           = React.useState({ ...page });
  const [isDirty, setIsDirty]     = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('basic');
  const [seoLocale, setSeoLocale] = React.useState('繁中');
  const [showLeave, setShowLeave] = React.useState(false);
  const [saving, setSaving]       = React.useState(false);

  const isLegal        = page.type === 'legal';
  const isReadOnlySlug = page.type === 'functional' || page.id === 'privacy' || page.id === 'terms';
  const seoLen         = (form.seoDesc || '').length;

  const update     = (delta) => { setForm(f => ({ ...f, ...delta })); setIsDirty(true); };
  const handleBack = () => { isDirty ? setShowLeave(true) : onBack(); };
  const handleSave = (publish) => {
    if (saving) return;
    setSaving(true);
    setTimeout(() => { onSave(form); setSaving(false); spToast(publish ? '頁面已儲存並發布' : '草稿已儲存'); onBack(); }, 500);
  };

  const plainBtn   = { height: 40, padding: '0 16px', background: '#fff', color: '#303133', border: '1px solid #DCDFE6', borderRadius: 0, cursor: 'pointer', fontSize: 14, fontFamily: 'Noto Sans TC,sans-serif' };
  const primaryBtn = { height: 40, padding: '0 16px', background: saving ? '#909399' : SPC.purple, color: '#fff', border: 'none', borderRadius: 0, cursor: saving ? 'not-allowed' : 'pointer', fontSize: 14, fontFamily: 'Noto Sans TC,sans-serif', fontWeight: 500 };
  const inputSt    = { height: 40, padding: '0 12px', border: '1px solid #DCDFE6', borderRadius: 0, fontSize: 14, fontFamily: 'Noto Sans TC,sans-serif', color: '#303133', outline: 'none', width: '100%' };

  const tabs = [{ id: 'basic', label: '基本設定' }, { id: 'seo', label: 'SEO' }];

  return (
    <div style={{ position: 'relative' }}>
      {maintActive && <SpMaintBanner onGoto={() => handleSave(false)}/>}

      {/* Page Header — matches product page exactly */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={handleBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#303133', fontSize: 18, padding: '4px 6px', display: 'flex', alignItems: 'center', lineHeight: 1 }}>←</button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <h1 style={{ fontSize: 20, fontWeight: 700 }}>{page.name}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#909399' }}>
                <span style={{ cursor: 'pointer', color: '#606266' }} onClick={handleBack}>網站設計</span>
                <span>/</span>
                <span style={{ cursor: 'pointer', color: '#606266' }} onClick={handleBack}>系統分頁</span>
                <span>/</span>
                <span style={{ color: '#909399' }}>{page.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main layout: white container — matches product page */}
      <div style={{ background: '#fff', minHeight: 600 }}>

        {/* Tab bar row — 55% on basic, full on others */}
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          <div style={{ flex: activeTab === 'basic' ? '0 0 55%' : '1', maxWidth: activeTab === 'basic' ? '55%' : '100%' }}>
            <div style={{ display: 'flex', padding: '0 24px' }}>
              {tabs.map(tab => (
                <div key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                  padding: '12px 16px', cursor: 'pointer', fontSize: 14,
                  fontWeight: activeTab === tab.id ? 600 : 400,
                  color: activeTab === tab.id ? '#409EFF' : '#606266',
                  borderBottom: activeTab === tab.id ? '2px solid #409EFF' : '2px solid transparent',
                  marginBottom: -1, display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  {tab.label}
                </div>
              ))}
            </div>
          </div>
          {activeTab === 'basic' && <div style={{ flex: '0 0 45%', maxWidth: '45%' }}/>}
        </div>

        {/* Two-column layout below tabs */}
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>

          {/* Left column */}
          <div style={{ flex: activeTab === 'basic' ? '0 0 55%' : '1', maxWidth: activeTab === 'basic' ? '55%' : '100%', padding: 24, minHeight: 500 }}>

            {activeTab === 'basic' && <>
              {/* 路徑（網址）— non-locale, above LocaleTabs */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 13, color: '#606266', marginBottom: 6 }}>路徑（網址）</div>
                {isReadOnlySlug ? (
                  <div style={{ ...inputSt, display: 'flex', alignItems: 'center', background: '#F5F7FA', color: '#909399', cursor: 'not-allowed', fontFamily: 'monospace', fontSize: 13 }}>
                    {form.slug || '（系統觸發）'}
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                    <div style={{ padding: '0 12px', height: 40, background: '#F5F7FA', border: '1px solid #DCDFE6', borderRight: 'none', display: 'flex', alignItems: 'center', fontSize: 13, color: '#909399', whiteSpace: 'nowrap' }}>https://domain.com/</div>
                    <input value={form.slug} onChange={e => update({ slug: e.target.value })} style={{ ...inputSt, flex: 1, borderRight: 'none' }} onFocus={e => e.target.style.borderColor = '#409EFF'} onBlur={e => e.target.style.borderColor = '#DCDFE6'}/>
                    <button style={{ ...plainBtn, borderLeft: 'none' }}>編輯</button>
                  </div>
                )}
              </div>

              {/* 狀態 — non-locale, above LocaleTabs */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 13, color: '#606266', marginBottom: 8 }}>狀態</div>
                <div style={{ display: 'flex', gap: 20 }}>
                  {[['true', '啟用'], ['false', '停用']].map(([val, label]) => (
                    <label key={val} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14 }}>
                      <input type="radio" name={`sp-status-${page.id}`} checked={String(form.enabled) === val} onChange={() => update({ enabled: val === 'true' })} style={{ accentColor: '#409EFF' }}/>
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              {/* LocaleTabs — wraps locale-specific content */}
              <LocaleTabs locales={['繁中', 'EN']} renderContent={(locale) => (
                <div>
                  {/* 頁面標題 — locale-specific */}
                  <LocaleField label="頁面標題">
                    <input
                      value={locale === '繁中' ? form.pageTitle : ''}
                      onChange={e => locale === '繁中' && update({ pageTitle: e.target.value })}
                      placeholder={locale === '繁中' ? '顯示於瀏覽器標籤，建議 50–60 字元' : 'Page title for browser tab (max 60 chars)'}
                      style={{ ...inputSt }}
                      onFocus={e => e.target.style.borderColor = '#409EFF'}
                      onBlur={e => e.target.style.borderColor = '#DCDFE6'}
                    />
                  </LocaleField>

                  {/* 頁面內容 — locale-specific */}
                  {locale === '繁中' ? (
                    isLegal ? (
                      <LocaleField label="頁面內容">
                        <div style={{ border: '1px solid #DCDFE6' }}>
                          <div style={{ background: '#F5F7FA', borderBottom: '1px solid #DCDFE6', padding: '6px 12px', display: 'flex', gap: 8 }}>
                            {['H2','H3','B','I','≡','🖼','⊞'].map(t => (
                              <button key={t} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px', fontSize: 13, color: '#606266', fontWeight: t === 'B' ? 700 : 400 }}>{t}</button>
                            ))}
                          </div>
                          <textarea value={form.content} onChange={e => update({ content: e.target.value })}
                            placeholder="在此輸入頁面內容…" rows={8}
                            style={{ width: '100%', border: 'none', resize: 'vertical', padding: '10px 12px', fontSize: 14, fontFamily: 'Noto Sans TC,sans-serif', outline: 'none', color: '#303133' }}/>
                        </div>
                        <div style={{ fontSize: 12, color: '#909399', marginTop: 4 }}>支援標題、粗體、列表、圖片嵌入</div>
                      </LocaleField>
                    ) : (
                      <SpErrorForm form={form} onChange={update} pageId={page.id} maintActive={maintActive} onToggleMaint={onToggleMaint}/>
                    )
                  ) : (
                    <div style={{ border: '1px dashed #BFDBFE', background: '#F0F7FF', padding: '32px 24px', textAlign: 'center', color: '#93C5FD', fontSize: 14 }}>
                      English 版本尚未設定
                    </div>
                  )}
                </div>
              )}/>
            </>}

            {activeTab === 'seo' && (
              <div style={{ padding: '0 0 32px' }}>
                {/* Locale radio — matches product page SEO tab */}
                <div style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
                  {['繁中', 'EN'].map(loc => (
                    <label key={loc} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', padding: '4px 12px', border: `1px solid ${seoLocale === loc ? '#409EFF' : '#DCDFE6'}`, borderRadius: 4, background: seoLocale === loc ? '#EFF6FF' : '#fff' }}>
                      <input type="radio" name="sp-seo-locale" value={loc} checked={seoLocale === loc} onChange={() => setSeoLocale(loc)} style={{ accentColor: '#409EFF' }}/>
                      <span style={{ fontSize: 14, color: seoLocale === loc ? '#409EFF' : '#606266', fontWeight: seoLocale === loc ? 600 : 400 }}>{loc}</span>
                    </label>
                  ))}
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 13, color: '#606266', marginBottom: 6 }}>SEO 標題</div>
                  <input value={seoLocale === '繁中' ? form.pageTitle : ''} onChange={e => seoLocale === '繁中' && update({ pageTitle: e.target.value })}
                    placeholder={seoLocale === '繁中' ? '輸入搜尋引擎顯示的頁面標題' : 'SEO title for search engines'} style={{ ...inputSt }}
                    onFocus={e => e.target.style.borderColor = '#409EFF'} onBlur={e => e.target.style.borderColor = '#DCDFE6'}/>
                  <div style={{ fontSize: 11, color: '#909399', marginTop: 4 }}>建議 50–60 字元，留空將使用頁面標題</div>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ fontSize: 13, color: '#606266' }}>SEO 描述</div>
                    <span style={{ fontSize: 11, color: seoLen > 160 ? '#F56C6C' : '#909399' }}>{seoLocale === '繁中' ? seoLen : 0} / 160</span>
                  </div>
                  <textarea value={seoLocale === '繁中' ? form.seoDesc : ''} onChange={e => seoLocale === '繁中' && update({ seoDesc: e.target.value })}
                    placeholder={seoLocale === '繁中' ? '輸入搜尋引擎顯示的頁面說明文字' : 'SEO description for search engines'} rows={4}
                    style={{ ...inputSt, height: 'auto', padding: '8px 12px', resize: 'vertical', lineHeight: 1.6, border: `1px solid ${seoLocale === '繁中' && seoLen > 160 ? '#F56C6C' : '#DCDFE6'}` }}
                    onFocus={e => e.target.style.borderColor = '#409EFF'} onBlur={e => e.target.style.borderColor = '#DCDFE6'}/>
                  <div style={{ fontSize: 11, color: '#909399', marginTop: 4 }}>建議 120–160 字元，顯示於搜尋引擎結果</div>
                </div>
              </div>
            )}
          </div>

          {/* Right column — only on basic tab, gray panel matching product page */}
          {activeTab === 'basic' && (
            <div style={{ flex: '0 0 45%', maxWidth: '45%', background: '#F5F7FA', minHeight: 400, display: 'flex', flexDirection: 'column', padding: '32px 24px 24px 24px' }}>
              <div style={{ marginTop: 'auto', textAlign: 'center' }}>
                <button onClick={() => spToast('前台預覽已在新分頁開啟', 'info')}
                  style={{ ...plainBtn, padding: '0 28px', height: 40, fontSize: 13 }}>前台預覽</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom action bar */}
      <div style={{ borderTop: '1px solid #DCDFE6', padding: '16px 24px', background: '#fff', display: 'flex', justifyContent: 'flex-start', gap: 8, position: 'sticky', bottom: 0, zIndex: 10 }}>
        <button style={plainBtn} onClick={() => handleSave(false)} disabled={saving}>{saving ? '儲存中…' : '儲存草稿'}</button>
        <button style={primaryBtn} onClick={() => handleSave(true)} disabled={saving}>{saving ? '儲存中…' : '儲存並發布'}</button>
      </div>

      <SpConfirm visible={showLeave} title="離開而不儲存？"
        body="您有未儲存的變更，離開後將會遺失。確定要離開嗎？"
        confirmLabel="確定離開" danger
        onConfirm={() => { setShowLeave(false); onBack(); }}
        onCancel={() => setShowLeave(false)}/>
    </div>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────
function PageSystemPages({ onNavigate, show }) {
  const [pages,      setPages]     = React.useState(SP_INIT_PAGES);
  const [view,       setView]      = React.useState('list');
  const [editId,     setEditId]    = React.useState(null);
  const [statusFilter,setStatusFil]= React.useState('all');
  const [searchQ,    setSearchQ]   = React.useState('');
  const [maintActive,setMaintActive]= React.useState(false);
  const { show: spToast, Toast: SpToast } = useToast();

  const filtered = pages.filter(p => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (searchQ && !p.name.toLowerCase().includes(searchQ.toLowerCase())) return false;
    return true;
  });

  const handleEdit = (id) => { setEditId(id); setView('edit'); };
  const handleBack = () => { setEditId(null); setView('list'); };

  const handleSave = (f) => {
    setPages(prev => prev.map(p => {
      if (p.id !== f.id) return p;
      const hasContent = f.content || f.errorTitle;
      return {
        ...p, ...f,
        status: f.enabled === false ? 'disabled' : 'set',
      };
    }));
  };

  const handleToggleMaint = (v) => {
    setMaintActive(v);
    spToast(v ? '維護模式已啟用，訪客現在看到維護頁' : '維護模式已關閉，網站恢復正常', v ? 'error' : 'success');
  };

  // Edit view
  if (view === 'edit') {
    return (
      <>
        <SpEditView pageId={editId} pages={pages} onSave={handleSave} onBack={handleBack}
          maintActive={maintActive} onToggleMaint={handleToggleMaint} spToast={spToast}/>
        <SpToast/>
      </>
    );
  }

  // List view
  return (
    <div>
      {maintActive && <SpMaintBanner onGoto={() => handleEdit('maintenance')}/>}

      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: SPC.text }}>系統分頁</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: SPC.muted }}>
            <span style={{ color: SPC.text2 }}>網站設計</span>
            <span>/</span>
            <span>系統分頁</span>
          </div>
        </div>
      </div>


      <SpFilterBar statusFilter={statusFilter} searchQuery={searchQ}
        onStatus={setStatusFil} onSearch={setSearchQ}/>

      {filtered.length === 0 ? (
        <div style={{ background: SPC.white, border: `1px solid ${SPC.border}`, padding: '48px', textAlign: 'center' }}>
          <div style={{ fontSize: 15, fontWeight: 500, color: SPC.text2, marginBottom: 8 }}>找不到符合條件的頁面</div>
          <div style={{ fontSize: 13, color: SPC.muted, marginBottom: 16 }}>請調整篩選條件或清除搜尋關鍵字</div>
          <button onClick={() => { setStatusFil('all'); setSearchQ(''); }}
            style={{ height: 34, padding: '0 16px', background: SPC.white, border: `1px solid ${SPC.border}`, borderRadius: 0, cursor: 'pointer', fontSize: 13, color: SPC.text }}>清除篩選</button>
        </div>
      ) : (
        <div style={{ background: SPC.white, border: `1px solid ${SPC.border}`, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 720 }}>
            <thead>
              <tr>{['頁面名稱','狀態','路徑（網址）','操作'].map(h => <th key={h} style={SP_TH}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <SpPageRow key={p.id} page={p} odd={i % 2 === 0} onEdit={handleEdit} onToast={spToast}/>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <SpToast/>
    </div>
  );
}

Object.assign(window, { PageSystemPages });
