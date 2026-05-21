
// ─── Icons ────────────────────────────────────────────────────────────────────
function IconCopy({ size = 13 }) {
  return <svg width={size} height={size} viewBox="0 0 13 13" fill="none"><rect x="4" y="4" width="8" height="8" rx="0" stroke="currentColor" strokeWidth="1.2"/><path d="M1 9V2a1 1 0 0 1 1-1h7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
}
function IconLink({ size = 14 }) {
  return <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><path d="M8 6L10.5 3.5a2.5 2.5 0 0 1 3.536 3.536l-2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M6 8L3.5 10.5a2.5 2.5 0 0 1-3.536-3.536l2.5-2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><line x1="5" y1="9" x2="9" y2="5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>;
}
function IconInfo({ size = 14 }) {
  return <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#909399" strokeWidth="1.2"/><line x1="7" y1="6" x2="7" y2="10" stroke="#909399" strokeWidth="1.2" strokeLinecap="round"/><circle cx="7" cy="4.5" r="0.6" fill="#909399"/></svg>;
}
function IconWarning({ size = 14 }) {
  return <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><path d="M7 1.5L13 12.5H1L7 1.5Z" stroke="#E6A23C" strokeWidth="1.3" strokeLinejoin="round"/><line x1="7" y1="5.5" x2="7" y2="8.5" stroke="#E6A23C" strokeWidth="1.3" strokeLinecap="round"/><circle cx="7" cy="10.5" r="0.6" fill="#E6A23C"/></svg>;
}
function IconExternal({ size = 11 }) {
  return <svg width={size} height={size} viewBox="0 0 11 11" fill="none" style={{ marginLeft: 3, verticalAlign: 'middle', opacity: 0.7 }}><path d="M4.5 1.5H1.5a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M7.5 1h2.5v2.5M10 1L5.5 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function IconLock({ size = 14 }) {
  return <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><rect x="2" y="6.5" width="10" height="7" rx="0" stroke="#909399" strokeWidth="1.3"/><path d="M4 6.5V4.5a3 3 0 0 1 6 0v2" stroke="#909399" strokeWidth="1.3" strokeLinecap="round"/></svg>;
}
function IconChevron({ open }) {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}><path d="M2.5 4.5L6 8L9.5 4.5" stroke="#909399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function IconDownload({ size = 14 }) {
  return <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><path d="M2 10v1.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M7 2v6M4.5 6L7 8.5 9.5 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

// ─── QR Code placeholder ──────────────────────────────────────────────────────
function QRPlaceholder({ size = 128 }) {
  const pattern = [
    [1,1,1,1,1,1,1,0,1,0,0,0,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,1,1,0,1,0,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,0,1,0,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,0,1,1,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0],
    [0,1,0,0,1,0,1,1,0,0,1,0,1,0,1,0,0,1,0,1,0],
    [1,0,1,0,1,1,0,1,0,1,0,1,0,1,0,0,1,0,1,0,1],
    [0,1,0,1,0,0,0,0,1,1,1,0,0,1,1,0,0,1,0,0,0],
    [1,0,0,0,1,1,1,1,0,0,1,1,0,0,0,1,1,1,0,1,1],
    [0,1,1,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,0],
    [0,0,0,0,0,0,0,0,1,0,0,1,0,1,1,0,1,1,0,1,1],
    [0,0,0,0,0,0,1,0,0,1,0,0,1,0,1,1,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,1,0,1,0,0,1,0,1,0,1,1,0],
    [1,0,0,0,0,0,1,0,0,0,1,0,1,1,1,0,0,1,0,1,0],
    [1,0,1,1,1,0,1,0,1,0,1,1,0,0,1,1,0,0,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,0,0,1,0,0,0,1,0,0,1,0],
    [1,0,0,0,0,0,1,0,1,1,1,0,0,1,1,0,0,1,1,0,1],
    [1,1,1,1,1,1,1,0,0,0,0,1,0,0,1,0,1,0,0,1,0],
  ];
  const s = size / pattern[0].length;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ background: '#fff', display: 'block' }}>
      {pattern.map((row, ri) =>
        row.map((cell, ci) =>
          cell ? <rect key={`${ri}-${ci}`} x={ci * s} y={ri * s} width={s} height={s} fill="#000" /> : null
        )
      )}
    </svg>
  );
}

// ─── Tip tooltip ──────────────────────────────────────────────────────────────
function Tip({ content }) {
  const [show, setShow] = React.useState(false);
  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', marginLeft: 5, verticalAlign: 'middle', cursor: 'help' }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <IconInfo />
      {show && (
        <div style={{ position: 'absolute', left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: 8, background: '#303133', color: '#fff', padding: '8px 12px', fontSize: 12, width: 260, lineHeight: 1.7, zIndex: 9999, pointerEvents: 'none', whiteSpace: 'normal' }}>
          {content}
        </div>
      )}
    </span>
  );
}

// ─── InfoBanner ───────────────────────────────────────────────────────────────
function InfoBanner({ children }) {
  return (
    <div style={{ background: '#ECF5FF', border: '1px solid #b3d8ff', borderRadius: 3, padding: '10px 16px', display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, marginBottom: 16 }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
        <circle cx="7" cy="7" r="6" stroke="#409EFF" strokeWidth="1.2"/><line x1="7" y1="6" x2="7" y2="10" stroke="#409EFF" strokeWidth="1.2" strokeLinecap="round"/><circle cx="7" cy="4.5" r="0.6" fill="#409EFF"/>
      </svg>
      <span style={{ color: '#606266' }}>{children}</span>
    </div>
  );
}

// ─── WarnBanner ───────────────────────────────────────────────────────────────
function WarnBanner({ children }) {
  return (
    <div style={{ background: '#FDF6EC', border: '1px solid #f5dab1', borderRadius: 3, padding: '10px 16px', display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, marginBottom: 16 }}>
      <span style={{ flexShrink: 0, marginTop: 1 }}><IconWarning /></span>
      <span style={{ color: '#606266' }}>{children}</span>
    </div>
  );
}


// ─── SectionLabel ─────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return <div style={{ fontSize: 13, fontWeight: 700, color: '#303133', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #DCDFE6' }}>{children}</div>;
}

// ─── ReadonlyInput ────────────────────────────────────────────────────────────
function ReadonlyInput({ value, prefix }) {
  return (
    <div style={{ display: 'flex', border: '1px solid #DCDFE6', height: 40, background: '#F5F7FA', alignItems: 'center' }}>
      {prefix && <div style={{ padding: '0 10px', borderRight: '1px solid #DCDFE6', display: 'flex', alignItems: 'center', color: '#909399' }}>{prefix}</div>}
      <input readOnly value={value} style={{ flex: 1, padding: '0 10px', border: 'none', background: 'transparent', fontSize: 13, color: '#606266', outline: 'none', fontFamily: 'Noto Sans TC,sans-serif', minWidth: 0 }} />
    </div>
  );
}

// ─── Tab 1: UTM Generator ─────────────────────────────────────────────────────
function UTMTab({ toast }) {
  const [pageType,  setPageType]  = React.useState('product');
  const [utmSrc,   setUtmSrc]   = React.useState('');
  const [utmMed,   setUtmMed]   = React.useState('');
  const [utmCamp,  setUtmCamp]  = React.useState('');
  const [utmCont,  setUtmCont]  = React.useState('');
  const [utmTerm,  setUtmTerm]  = React.useState('');
  const [shortUrl, setShortUrl]  = React.useState('');
  const [genLoading, setGenLoading] = React.useState(false);
  const [showCampWarn, setShowCampWarn] = React.useState(false);
  const [showSaveDialog, setShowSaveDialog] = React.useState(false);
  const [tplName, setTplName] = React.useState('');
  const [tplNameErr, setTplNameErr] = React.useState('');
  const [savingTpl, setSavingTpl] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const BASE = 'https://yourstore.com';
  const canGenerate = utmSrc.trim() && utmMed.trim() && utmCamp.trim();

  const validateFields = () => {
    const errs = {};
    if (!utmSrc.trim()) errs.src = '請填寫廣告來源（utm_source）';
    if (!utmMed.trim()) errs.med = '請填寫廣告媒介（utm_medium）';
    if (!utmCamp.trim()) errs.camp = '請填寫廣告活動名稱（utm_campaign）';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const buildUrl = () => {
    if (!canGenerate) return '';
    const params = new URLSearchParams();
    if (utmSrc) params.set('utm_source', utmSrc.replace(/\s+/g, '_'));
    if (utmMed) params.set('utm_medium', utmMed.replace(/\s+/g, '_'));
    if (utmCamp) params.set('utm_campaign', utmCamp.replace(/\s+/g, '_'));
    if (utmCont) params.set('utm_content', utmCont.replace(/\s+/g, '_'));
    if (utmTerm) params.set('utm_term', utmTerm.replace(/\s+/g, '_'));
    return `${BASE}/products/winter-jacket?${params}`;
  };

  const fullUrl = buildUrl();

  const handleCopyfull = () => {
    if (!validateFields()) return;
    navigator.clipboard?.writeText(fullUrl).catch(() => {});
    toast('連結已複製', 'success');
  };

  const handleGenShort = () => {
    if (!validateFields()) return;
    setGenLoading(true);
    setTimeout(() => {
      setGenLoading(false);
      setShortUrl(`${BASE}/go/Xk3mP9`);
      toast('短網址已複製', 'success');
    }, 900);
  };

  const handleCopyShort = () => {
    if (!shortUrl) { handleGenShort(); return; }
    navigator.clipboard?.writeText(shortUrl).catch(() => {});
    toast('短網址已複製', 'success');
  };

  const handleDownloadQR = () => {
    if (!validateFields()) return;
    toast('QR Code 已下載', 'success');
  };

  const handleQuickTemplate = (src, med) => {
    setUtmSrc(src);
    setUtmMed(med);
  };

  const handleCampChange = (v) => {
    setUtmCamp(v);
    setShowCampWarn(/[一-鿿]/.test(v));
    setErrors(prev => ({ ...prev, camp: '' }));
  };

  const handleSaveTpl = () => {
    if (!tplName.trim()) { setTplNameErr('請填入模板名稱'); return; }
    setSavingTpl(true);
    setTimeout(() => {
      setSavingTpl(false);
      setShowSaveDialog(false);
      setTplName('');
      setTplNameErr('');
      toast(`模板「${tplName}」已儲存`, 'success');
    }, 800);
  };

  const quickTemplates = [
    { label: 'Facebook 廣告', src: 'facebook', med: 'paid' },
    { label: 'LINE Ads',      src: 'line',     med: 'paid' },
    { label: 'Google Ads',    src: 'google',   med: 'cpc' },
    { label: 'EDM（電子報）',  src: 'email',    med: 'email' },
    { label: 'LINE OA 推播',  src: 'line',     med: 'social' },
  ];

  const pageTypes = [
    { value: 'product',  label: '特定產品頁' },
    { value: 'category', label: '產品分類頁' },
    { value: 'home',     label: '商店首頁' },
    { value: 'lp',       label: '一頁式商店' },
    { value: 'custom',   label: '自訂 URL' },
  ];

  const fieldStyle = { width: '100%', height: 40, padding: '0 10px', border: '1px solid #DCDFE6', borderRadius: 0, fontSize: 14, color: '#303133', outline: 'none', fontFamily: 'Noto Sans TC,sans-serif', background: '#fff' };

  return (
    <div style={{ display: 'flex', gap: 24 }}>
      {/* Left Panel */}
      <div style={{ flex: '0 0 55%', minWidth: 0 }}>

        {/* 目標頁面 */}
        <div style={{ marginBottom: 24 }}>
          <SectionLabel>目標頁面</SectionLabel>
          <FormField label="頁面類型">
            <select value={pageType} onChange={e => setPageType(e.target.value)} style={{ ...fieldStyle }}>
              {pageTypes.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </FormField>
          {pageType === 'product' && (
            <FormField label="選擇產品">
              <input style={fieldStyle} placeholder="搜尋產品名稱或產品庫存單位（SKU）…" />
            </FormField>
          )}
          {pageType === 'category' && (
            <FormField label="選擇分類">
              <select style={fieldStyle}><option>選擇產品分類</option><option>上衣</option><option>外套</option><option>配件</option></select>
            </FormField>
          )}
          {pageType === 'lp' && (
            <FormField label="選擇一頁式商店">
              <select style={fieldStyle}><option>選擇已建立的一頁式商店</option><option>2026 春夏特賣</option><option>品牌故事頁</option></select>
            </FormField>
          )}
          {pageType === 'custom' && (
            <FormField label="路徑">
              <input style={fieldStyle} placeholder="輸入路徑，如 /products 或 /sale" />
            </FormField>
          )}
        </div>

        {/* UTM 參數 */}
        <div style={{ marginBottom: 24 }}>
          <SectionLabel>UTM 參數</SectionLabel>

          <FormField label={<span>來源（utm_source）<span style={{ color: '#F56C6C' }}> *</span></span>} error={errors.src}>
            <div style={{ position: 'relative' }}>
              <input value={utmSrc} onChange={e => { setUtmSrc(e.target.value); setErrors(prev => ({ ...prev, src: '' })); }} placeholder="如 facebook、google、line…" list="utm-source-list" style={{ ...fieldStyle, borderColor: errors.src ? '#F56C6C' : '#DCDFE6' }} />
              <datalist id="utm-source-list">
                <option value="facebook" /><option value="google" /><option value="line" /><option value="instagram" /><option value="email" /><option value="sms" /><option value="qrcode" />
              </datalist>
            </div>
          </FormField>

          <FormField label={<span>媒介（utm_medium）<span style={{ color: '#F56C6C' }}> *</span></span>} error={errors.med}>
            <>
              <input value={utmMed} onChange={e => { setUtmMed(e.target.value); setErrors(prev => ({ ...prev, med: '' })); }} placeholder="如 paid、email、social…" list="utm-medium-list" style={{ ...fieldStyle, borderColor: errors.med ? '#F56C6C' : '#DCDFE6' }} />
              <datalist id="utm-medium-list">
                <option value="paid" /><option value="cpc" /><option value="cpm" /><option value="organic" /><option value="social" /><option value="email" /><option value="sms" /><option value="banner" />
              </datalist>
            </>
          </FormField>

          <FormField label={<span>廣告活動（utm_campaign）<span style={{ color: '#F56C6C' }}> *</span></span>}
            helper="建議使用英文 + 數字，避免中文 URL Encode 問題" error={errors.camp}>
            <input value={utmCamp} onChange={e => handleCampChange(e.target.value)} placeholder="廣告活動名稱，如 2026winter" style={{ ...fieldStyle, borderColor: errors.camp ? '#F56C6C' : '#DCDFE6' }} />
          </FormField>

          {showCampWarn && (
            <WarnBanner>廣告活動名稱建議使用英文，避免中文在部分廣告平台無法正確讀取</WarnBanner>
          )}

          <FormField label="廣告內容（utm_content）">
            <input value={utmCont} onChange={e => setUtmCont(e.target.value)} placeholder="選填，用於區分同一活動中的不同廣告素材" style={fieldStyle} />
          </FormField>

          <FormField label="關鍵字（utm_term）">
            <input value={utmTerm} onChange={e => setUtmTerm(e.target.value)} placeholder="選填，通常用於關鍵字廣告（SEM）的關鍵字" style={fieldStyle} />
          </FormField>
        </div>

        {/* 快速模板 */}
        <div style={{ marginBottom: 24 }}>
          <SectionLabel>快速模板</SectionLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
            {quickTemplates.map(t => (
              <button key={t.label} onClick={() => handleQuickTemplate(t.src, t.med)}
                style={{ height: 36, padding: '0 14px', background: '#fff', color: '#606266', border: '1px solid #DCDFE6', borderRadius: 0, cursor: 'pointer', fontSize: 13, fontFamily: 'Noto Sans TC,sans-serif' }}>
                {t.label}
              </button>
            ))}
          </div>
          <button onClick={() => setShowSaveDialog(true)} style={{ height: 36, padding: '0 14px', background: '#fff', color: '#303133', border: '1px solid #DCDFE6', borderRadius: 0, cursor: 'pointer', fontSize: 13, fontFamily: 'Noto Sans TC,sans-serif' }}>
            儲存為模板
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ flex: '0 0 42%', minWidth: 0 }}>
        <div style={{ background: '#F5F7FA', border: '1px solid #DCDFE6', borderRadius: 3, padding: 20 }}>

          {/* 完整連結 */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#303133', marginBottom: 8 }}>生成的完整連結</div>
            <textarea readOnly value={fullUrl} placeholder="填寫左側欄位後即時預覽…"
              style={{ width: '100%', minHeight: 80, padding: '8px 10px', border: '1px solid #DCDFE6', background: '#fff', fontSize: 12, color: '#606266', outline: 'none', fontFamily: 'monospace', lineHeight: 1.6, wordBreak: 'break-all', resize: 'none' }} />
            <button onClick={handleCopyfull}
              style={{ ...sharedBtns.plain, height: 36, fontSize: 13, marginTop: 8, display: 'flex', alignItems: 'center', gap: 5, opacity: canGenerate ? 1 : 0.5 }}>
              <IconCopy /> 複製完整連結
            </button>
          </div>

          <div style={{ borderTop: '1px solid #DCDFE6', margin: '0 0 20px' }} />

          {/* 短網址 */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#303133', marginBottom: 8 }}>短網址</div>
            <ReadonlyInput value={shortUrl || '—'} prefix={<IconLink size={13} />} />
            <button onClick={handleCopyShort}
              disabled={genLoading}
              style={{ ...sharedBtns.primary, height: 36, fontSize: 13, marginTop: 8, opacity: canGenerate ? 1 : 0.5 }}>
              {genLoading ? '生成中…' : shortUrl ? '複製短網址' : '複製短網址'}
            </button>
          </div>

          <div style={{ borderTop: '1px solid #DCDFE6', margin: '0 0 20px' }} />

          {/* QR Code */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#303133', marginBottom: 8 }}>QR Code</div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <div style={{ border: '1px solid #DCDFE6', padding: 4, background: '#fff', opacity: canGenerate ? 1 : 0.3 }}>
                <QRPlaceholder size={128} />
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#909399', marginBottom: 8, lineHeight: 1.5 }}>
                  {canGenerate ? '掃描後前往追蹤連結' : '填寫必填欄位後顯示 QR Code'}
                </div>
                <button onClick={handleDownloadQR}
                  style={{ height: 36, padding: '0 12px', background: '#fff', color: '#606266', border: '1px solid #DCDFE6', borderRadius: 0, cursor: 'pointer', fontSize: 13, fontFamily: 'Noto Sans TC,sans-serif', opacity: canGenerate ? 1 : 0.5, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <IconDownload size={13} /> 下載 QR Code（PNG）
                </button>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #DCDFE6', margin: '0 0 20px' }} />

          {/* 點擊統計 */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#303133', marginBottom: 8 }}>點擊統計（短網址）</div>
            {shortUrl ? (
              <div style={{ display: 'flex', gap: 24 }}>
                <div style={{ fontSize: 13, color: '#606266' }}>今日 <span style={{ fontWeight: 700, color: '#303133' }}>0</span> 次</div>
                <div style={{ fontSize: 13, color: '#606266' }}>本月 <span style={{ fontWeight: 700, color: '#303133' }}>0</span> 次</div>
              </div>
            ) : (
              <div style={{ fontSize: 12, color: '#909399' }}>點擊「複製短網址」後開始統計</div>
            )}
          </div>
        </div>
      </div>

      {/* 儲存模板 Dialog */}
      <Dialog open={showSaveDialog} title="儲存 UTM 模板" width={480}
        onClose={() => { setShowSaveDialog(false); setTplName(''); setTplNameErr(''); }}
        footer={
          <>
            <button style={sharedBtns.plain} onClick={() => { setShowSaveDialog(false); setTplName(''); setTplNameErr(''); }}>取消</button>
            <button style={{ ...sharedBtns.primary, opacity: savingTpl ? 0.7 : 1 }} onClick={handleSaveTpl} disabled={savingTpl}>
              {savingTpl ? '儲存中…' : '儲存模板'}
            </button>
          </>
        }>
        <FormField label="模板名稱" required error={tplNameErr}>
          <>
            <EInput value={tplName} onChange={v => { setTplName(v.slice(0, 50)); setTplNameErr(''); }} placeholder='如「LINE Ads 冬季活動」' />
            <div style={{ fontSize: 11, color: '#C0C4CC', textAlign: 'right', marginTop: 2 }}>{tplName.length} / 50</div>
          </>
        </FormField>
        <div style={{ background: '#F5F7FA', border: '1px solid #DCDFE6', borderRadius: 3, padding: 12, fontSize: 13, color: '#606266', lineHeight: 1.8 }}>
          <div style={{ fontWeight: 700, marginBottom: 6, color: '#303133' }}>目前參數：</div>
          {utmSrc && <div>來源：{utmSrc}</div>}
          {utmMed && <div>媒介：{utmMed}</div>}
          {utmCamp && <div>活動：{utmCamp}</div>}
          {utmCont && <div>廣告內容：{utmCont}</div>}
          {utmTerm && <div>關鍵字：{utmTerm}</div>}
          {!utmSrc && !utmMed && !utmCamp && <div style={{ color: '#909399' }}>尚未填入任何 UTM 參數</div>}
        </div>
      </Dialog>
    </div>
  );
}

// ─── Tab 2: Feed Settings ─────────────────────────────────────────────────────
function FeedTab({ toast }) {
  const [fbRange,    setFbRange]      = React.useState('all');
  const [fbFreq,    setFbFreq]      = React.useState('hourly');
  const [fbLoading, setFbLoading]   = React.useState(false);
  const [fbGenerated, setFbGenerated] = React.useState(false);
  const [fbTokenOpen, setFbTokenOpen] = React.useState(false);
  const [ggRange,   setGgRange]     = React.useState('all');
  const [ggFreq,   setGgFreq]     = React.useState('hourly');
  const [ggLoading, setGgLoading]   = React.useState(false);
  const [ggGenerated, setGgGenerated] = React.useState(false);
  const [ggTokenOpen, setGgTokenOpen] = React.useState(false);
  const [saving,    setSaving]      = React.useState(false);
  const [tokenConfirmType, setTokenConfirmType] = React.useState(null);

  const FB_URL = 'https://yourstore.com/feeds/facebook-catalog.csv?token=a7f93c2b8d1e4f56';
  const GG_URL = 'https://yourstore.com/feeds/google-merchant.xml?token=a7f93c2b8d1e4f56';

  const handleRegen = (type) => {
    if (type === 'fb') { setFbLoading(true); setTimeout(() => { setFbLoading(false); setFbGenerated(true); toast('Feed 已重新生成，共 245 件產品', 'success'); }, 1800); }
    else               { setGgLoading(true); setTimeout(() => { setGgLoading(false); setGgGenerated(true); toast('Feed 已重新生成，共 245 件產品', 'success'); }, 1800); }
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => { setSaving(false); toast('Feed 設定已儲存', 'success'); }, 1000);
  };

  const handleConfirmTokenRegen = () => {
    setTokenConfirmType(null);
    toast('Feed Token 已重新生成，請將新的 Feed URL 更新至廣告平台', 'success');
  };

  const freqOptions = [
    { value: 'realtime', label: '即時生成（每次廣告平台抓取時重新生成）' },
    { value: 'hourly',   label: '每小時更新（推薦）' },
    { value: 'daily',    label: '每天更新（每日 00:10 台灣時間）' },
  ];

  const FeedCard = ({ type, accentColor, title, feedUrl, range, onRange, freq, onFreq, loading, onRegen, downloadLabel, generated, tokenOpen, onToggleToken, onRegenToken }) => (
    <div style={{ background: '#fff', border: '1px solid #DCDFE6', borderRadius: 3, marginBottom: 24 }}>
      <div style={{ padding: '14px 20px', borderBottom: '1px solid #DCDFE6', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 10, height: 10, background: accentColor, borderRadius: '50%' }} />
        <span style={{ fontSize: 15, fontWeight: 700 }}>{title}</span>
      </div>
      <div style={{ padding: 20 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: '#909399', marginBottom: 6 }}>Feed URL（複製此連結到 {type === 'fb' ? 'Facebook Business Manager' : 'Google Merchant Center'}）：</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: 1 }}>
              <ReadonlyInput value={feedUrl} prefix={<IconLock size={13} />} />
            </div>
            <button style={{ ...sharedBtns.primary, height: 40, fontSize: 13, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 5 }}
              onClick={() => { navigator.clipboard?.writeText(feedUrl).catch(() => {}); toast('Feed URL 已複製', 'success'); }}>
              <IconCopy size={12} /> 複製連結
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 40 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#303133', marginBottom: 10 }}>Feed 範圍</div>
            <RadioGroup
              value={range}
              onChange={onRange}
              vertical
              options={[
                { value: 'all', label: '全部上架產品（共 245 件）' },
                { value: 'category', label: '指定分類' },
              ]}
            />
            {range === 'category' && (
              <select style={{ width: '100%', height: 40, padding: '0 10px', border: '1px solid #DCDFE6', borderRadius: 0, fontSize: 14, outline: 'none', fontFamily: 'Noto Sans TC,sans-serif', marginTop: 4 }}>
                <option>選擇要包含在廣告目錄的分類（可多選）</option>
                <option>上衣</option><option>外套</option><option>配件</option>
              </select>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#303133', marginBottom: 10 }}>更新頻率</div>
            <RadioGroup value={freq} onChange={onFreq} vertical options={freqOptions} />
          </div>
        </div>

        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #DCDFE6', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          {generated
            ? <span style={{ fontSize: 12, color: '#909399' }}>上次更新：<span style={{ color: '#606266' }}>2026/05/14 10:00</span>　產品數量：<span style={{ color: '#606266' }}>245 件</span></span>
            : <span style={{ fontSize: 12, color: '#E6A23C', fontWeight: 500 }}>尚未生成，請點擊「立即重新生成 Feed」</span>
          }
          <button style={{ ...sharedBtns.plain, height: 36, fontSize: 13, opacity: loading ? 0.7 : 1, display: 'flex', alignItems: 'center', gap: 4 }}
            onClick={() => onRegen()} disabled={loading}>
            {loading ? '生成中…' : '立即重新生成 Feed'}
          </button>
          {generated && (
            <button style={{ ...sharedBtns.plain, height: 36, fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}
              onClick={() => toast(`${downloadLabel} 下載中…`, 'info')}>
              <IconDownload size={13} /> {downloadLabel}
            </button>
          )}
        </div>

        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 13, color: '#606266' }}>如何在 {type === 'fb' ? 'Facebook Business Manager' : 'Google Merchant Center'} {type === 'fb' ? '設定產品目錄' : '設定產品 Feed'}</span>
          <a href="#" style={{ fontSize: 13, color: '#409EFF' }}>查看說明 <IconExternal /></a>
        </div>

        <div style={{ marginTop: 16, borderTop: '1px solid #F5F7FA', paddingTop: 12 }}>
          <button onClick={() => onToggleToken()}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#606266', display: 'flex', alignItems: 'center', gap: 4, padding: 0, fontFamily: 'Noto Sans TC,sans-serif' }}>
            <IconChevron open={tokenOpen} /> Feed URL Token 管理
          </button>
          {tokenOpen && (
            <div style={{ marginTop: 12, background: '#F5F7FA', border: '1px solid #DCDFE6', borderRadius: 3, padding: 14 }}>
              <div style={{ fontSize: 13, color: '#606266', marginBottom: 12, lineHeight: 1.7 }}>
                如果 Feed URL 外洩，可重新生成 Token 讓舊 URL 立即失效。重新生成後需將新的 Feed URL 更新至廣告平台。
              </div>
              <button onClick={() => onRegenToken()}
                style={{ height: 36, padding: '0 14px', background: '#fff', color: '#F56C6C', border: '1px solid #F56C6C', borderRadius: 0, cursor: 'pointer', fontSize: 13, fontFamily: 'Noto Sans TC,sans-serif' }}>
                重新生成 Feed Token
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <FeedCard type="fb" accentColor="#1877F2" title="Facebook 產品目錄 Feed"
        feedUrl={FB_URL} range={fbRange} onRange={setFbRange} freq={fbFreq} onFreq={setFbFreq}
        loading={fbLoading} onRegen={() => handleRegen('fb')} downloadLabel="下載 CSV 預覽"
        generated={fbGenerated} tokenOpen={fbTokenOpen} onToggleToken={() => setFbTokenOpen(o => !o)}
        onRegenToken={() => setTokenConfirmType('fb')} />

      <FeedCard type="gg" accentColor="#34A853" title="Google Merchant Center Feed"
        feedUrl={GG_URL} range={ggRange} onRange={setGgRange} freq={ggFreq} onFreq={setGgFreq}
        loading={ggLoading} onRegen={() => handleRegen('gg')} downloadLabel="下載 XML 預覽"
        generated={ggGenerated} tokenOpen={ggTokenOpen} onToggleToken={() => setGgTokenOpen(o => !o)}
        onRegenToken={() => setTokenConfirmType('gg')} />

      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <button style={{ ...sharedBtns.primary, opacity: saving ? 0.7 : 1 }} onClick={handleSave} disabled={saving}>
          {saving ? '儲存中…' : '儲存設定'}
        </button>
      </div>

      {/* Token 重新生成確認 Dialog */}
      <Dialog open={!!tokenConfirmType} title="確認重新生成 Feed Token" width={440}
        onClose={() => setTokenConfirmType(null)}
        footer={
          <>
            <button style={sharedBtns.plain} onClick={() => setTokenConfirmType(null)}>取消</button>
            <button style={{ height: 40, padding: '0 16px', background: '#F56C6C', color: '#fff', border: '1px solid #F56C6C', borderRadius: 0, cursor: 'pointer', fontFamily: 'Noto Sans TC,sans-serif', fontSize: 14 }}
              onClick={handleConfirmTokenRegen}>確認重新生成</button>
          </>
        }>
        <p style={{ fontSize: 14, color: '#606266', lineHeight: 1.7, marginBottom: 12 }}>
          重新生成後，目前的 Feed URL 將立即失效。您需要將新的 Feed URL 更新至廣告平台，否則廣告平台將無法正常抓取產品目錄。
        </p>
        <div style={{ background: '#FDF6EC', border: '1px solid #f5dab1', borderRadius: 3, padding: '8px 12px', fontSize: 13, color: '#E6A23C', display: 'flex', alignItems: 'center', gap: 6 }}>
          <IconWarning size={13} /> 此操作無法復原
        </div>
      </Dialog>
    </div>
  );
}

// ─── Tab 3: Analytics ─────────────────────────────────────────────────────────
function AnalyticsTab({ toast }) {
  const [timeRange, setTimeRange] = React.useState('7d');
  const [groupBy,   setGroupBy]   = React.useState('source');
  const [expanded,  setExpanded]  = React.useState({});
  const [drawer,    setDrawer]    = React.useState(null);
  const [sortField, setSortField] = React.useState('orders');
  const [sortDir,   setSortDir]   = React.useState('desc');

  const handleSort = (field) => {
    if (sortField === field) { setSortDir(d => d === 'desc' ? 'asc' : 'desc'); }
    else { setSortField(field); setSortDir('desc'); }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <span style={{ color: '#C0C4CC', marginLeft: 3 }}>↕</span>;
    return <span style={{ color: '#303133', marginLeft: 3 }}>{sortDir === 'desc' ? '↓' : '↑'}</span>;
  };

  const funnel = [
    { label: '工作階段',  val: 2450, pct: 100 },
    { label: '加入購物車', val: 890,  pct: 36.3 },
    { label: '進入結帳',  val: 420,  pct: 17.1 },
    { label: '訂單完成',  val: 185,  pct: 7.6 },
  ];

  const tableData = [
    { src: 'facebook', sessions: 1200, cart: 450, checkout: 210, orders: 92, rate: '7.7%', gmv: 'NT$213,040', avg: 'NT$2,316', sub: [
      { src: 'spring_sale_2026', sessions: 750, cart: 290, checkout: 140, orders: 62, rate: '8.3%', gmv: 'NT$143,440', avg: 'NT$2,314' },
      { src: '2026winter_retarget', sessions: 450, cart: 160, checkout: 70, orders: 30, rate: '6.7%', gmv: 'NT$69,600', avg: 'NT$2,320' },
    ]},
    { src: 'google', sessions: 680, cart: 240, checkout: 110, orders: 51, rate: '7.5%', gmv: 'NT$118,065', avg: 'NT$2,315', sub: [] },
    { src: 'line',   sessions: 430, cart: 160, checkout: 80,  orders: 35, rate: '8.1%', gmv: 'NT$81,025',  avg: 'NT$2,315', sub: [] },
    { src: 'email',  sessions: 140, cart: 40,  checkout: 20,  orders: 7,  rate: '5.0%', gmv: 'NT$16,205',  avg: 'NT$2,315', sub: [] },
  ];

  const drawerOrders = [
    { id: 'ORD-20260514-001', amt: 'NT$2,880', time: '2026/05/14 14:22' },
    { id: 'ORD-20260514-002', amt: 'NT$1,560', time: '2026/05/14 12:10' },
    { id: 'ORD-20260513-007', amt: 'NT$3,200', time: '2026/05/13 18:45' },
    { id: 'ORD-20260512-003', amt: 'NT$890',   time: '2026/05/12 09:30' },
    { id: 'ORD-20260511-009', amt: 'NT$2,100', time: '2026/05/11 11:20' },
  ];

  const toggleRow = (src) => setExpanded(e => ({ ...e, [src]: !e[src] }));

  const th = { ...tableThStyle, fontSize: 12 };
  const thSort = { ...tableThStyle, fontSize: 12, cursor: 'pointer', userSelect: 'none' };
  const td = { ...tableTdStyle };

  const sortKeyMap = { sessions: 'sessions', cart: 'cart', checkout: 'checkout', orders: 'orders', gmv: 'gmv', avg: 'avg' };
  const parseNum = v => typeof v === 'number' ? v : parseInt((v || '').replace(/[^0-9]/g, ''), 10) || 0;
  const sortedData = [...tableData].sort((a, b) => {
    const va = parseNum(a[sortKeyMap[sortField]] ?? a.orders);
    const vb = parseNum(b[sortKeyMap[sortField]] ?? b.orders);
    return sortDir === 'desc' ? vb - va : va - vb;
  });

  return (
    <div>
      <InfoBanner>
        本報表呈現各廣告來源帶來的實際成立訂單數據，定位為 GA4 的補充，非取代。GA4 追蹤使用者行為事件，本報表追蹤已成立訂單的廣告歸因，兩者可同時使用。
      </InfoBanner>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 13, color: '#606266' }}>時間範圍：</span>
        {[{ value: '7d', label: '近 7 天' }, { value: '30d', label: '近 30 天' }, { value: 'month', label: '本月' }, { value: 'last', label: '上月' }].map(o => (
          <button key={o.value} onClick={() => setTimeRange(o.value)}
            style={{ height: 36, padding: '0 14px', background: timeRange === o.value ? '#303133' : '#fff', color: timeRange === o.value ? '#fff' : '#606266', border: `1px solid ${timeRange === o.value ? '#303133' : '#DCDFE6'}`, borderRadius: 0, cursor: 'pointer', fontSize: 13, fontFamily: 'Noto Sans TC,sans-serif' }}>
            {o.label}
          </button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: '#606266' }}>分組方式：</span>
          <select value={groupBy} onChange={e => setGroupBy(e.target.value)} style={{ height: 36, padding: '0 10px', border: '1px solid #DCDFE6', borderRadius: 0, fontSize: 13, outline: 'none', fontFamily: 'Noto Sans TC,sans-serif' }}>
            <option value="source">依來源（utm_source）</option>
            <option value="medium">依媒介（utm_medium）</option>
            <option value="campaign">依廣告活動（utm_campaign）</option>
            <option value="content">依廣告內容（utm_content）</option>
          </select>
          <button style={{ ...sharedBtns.plain, height: 36, fontSize: 13 }} onClick={() => toast('報表產生中，完成後將寄送至您的信箱', 'info')}>
            匯出報表
          </button>
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #DCDFE6', borderRadius: 3, padding: 20, marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#303133', marginBottom: 16 }}>轉換漏斗（所選時間範圍 · 全部來源）</div>
        {funnel.map((row, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: i < funnel.length - 1 ? 12 : 0 }}>
            <div style={{ width: 96, fontSize: 13, color: '#606266', flexShrink: 0 }}>{row.label}</div>
            <div style={{ flex: 1, height: 20, background: '#F5F7FA', position: 'relative' }}>
              <div style={{ height: '100%', width: `${row.pct}%`, background: ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C'][i], opacity: 0.8 }} />
            </div>
            <div style={{ width: 120, fontSize: 13, color: '#303133', flexShrink: 0 }}>
              <span style={{ fontWeight: 700 }}>{row.val.toLocaleString()}</span>
              {row.pct < 100 && <span style={{ color: '#909399', marginLeft: 6 }}>({row.pct}%)</span>}
            </div>
          </div>
        ))}
      </div>

      <TableWrapper>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr>
              <th style={th}>來源 / 維度</th>
              <th style={thSort} onClick={() => handleSort('sessions')}>工作階段數<SortIcon field="sessions" /></th>
              <th style={thSort} onClick={() => handleSort('cart')}>加入購物車<SortIcon field="cart" /></th>
              <th style={thSort} onClick={() => handleSort('checkout')}>進入結帳<SortIcon field="checkout" /></th>
              <th style={thSort} onClick={() => handleSort('orders')}>訂單數<SortIcon field="orders" /></th>
              <th style={th}>轉換率</th>
              <th style={thSort} onClick={() => handleSort('gmv')}>訂單 GMV（成交金額）<SortIcon field="gmv" /></th>
              <th style={thSort} onClick={() => handleSort('avg')}>平均訂單金額<SortIcon field="avg" /></th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, i) => (
              <React.Fragment key={row.src}>
                <tr
                  style={{ background: tableRowBg(i), cursor: row.sub.length ? 'pointer' : 'default' }}
                  {...tableRowHandlers(i, false)}
                  onClick={() => row.sub.length && toggleRow(row.src)}>
                  <td style={td}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {row.sub.length > 0 && <span style={{ display: 'inline-flex', cursor: 'pointer' }}><IconChevron open={expanded[row.src]} /></span>}
                      <span style={{ fontWeight: 500 }}>{row.src}</span>
                    </div>
                  </td>
                  <td style={td}>{row.sessions.toLocaleString()}</td>
                  <td style={td}>{row.cart.toLocaleString()}</td>
                  <td style={td}>{row.checkout.toLocaleString()}</td>
                  <td style={td}>
                    <button onClick={e => { e.stopPropagation(); setDrawer({ src: row.src, orders: row.orders }); }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#409EFF', fontSize: 13, fontFamily: 'Noto Sans TC,sans-serif', padding: 0, textDecoration: 'underline' }}>
                      {row.orders}
                    </button>
                  </td>
                  <td style={td}>{row.rate}</td>
                  <td style={td}>{row.gmv}</td>
                  <td style={td}>{row.avg}</td>
                </tr>
                {expanded[row.src] && row.sub.map(sub => (
                  <tr key={sub.src} style={{ background: '#F9FAFC' }}>
                    <td style={{ ...td, paddingLeft: 36, color: '#606266' }}>└ {sub.src}</td>
                    <td style={{ ...td, color: '#606266' }}>{sub.sessions.toLocaleString()}</td>
                    <td style={{ ...td, color: '#606266' }}>{sub.cart.toLocaleString()}</td>
                    <td style={{ ...td, color: '#606266' }}>{sub.checkout.toLocaleString()}</td>
                    <td style={{ ...td, color: '#606266' }}>
                      <button onClick={() => setDrawer({ src: sub.src, orders: sub.orders })}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#409EFF', fontSize: 13, fontFamily: 'Noto Sans TC,sans-serif', padding: 0, textDecoration: 'underline' }}>
                        {sub.orders}
                      </button>
                    </td>
                    <td style={{ ...td, color: '#606266' }}>{sub.rate}</td>
                    <td style={{ ...td, color: '#606266' }}>{sub.gmv}</td>
                    <td style={{ ...td, color: '#606266' }}>{sub.avg}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
            <tr style={{ background: '#FAFAFA' }}>
              <td style={{ ...td, color: '#909399' }}>
                直接流量 / 無追蹤標籤
                <Tip content="這些訂單來自直接輸入網址、書籤、或未加追蹤標籤的連結" />
              </td>
              <td style={{ ...td, color: '#909399' }}>140</td>
              <td style={{ ...td, color: '#909399' }}>—</td>
              <td style={{ ...td, color: '#909399' }}>—</td>
              <td style={{ ...td, color: '#909399' }}>2</td>
              <td style={{ ...td, color: '#909399' }}>1.4%</td>
              <td style={{ ...td, color: '#909399' }}>NT$4,630</td>
              <td style={{ ...td, color: '#909399' }}>NT$2,315</td>
            </tr>
          </tbody>
        </table>
      </TableWrapper>

      <Drawer open={!!drawer} title={drawer ? `${drawer.src} 的訂單清單` : ''} onClose={() => setDrawer(null)}>
        {drawer && (
          <>
            <div style={{ marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #DCDFE6' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#303133' }}>共 {drawer.orders} 筆訂單　訂單 GMV：NT$ {(drawer.orders * 2315).toLocaleString()}</div>
              <div style={{ fontSize: 12, color: '#909399', marginTop: 4 }}>時間範圍：2026/05/07 – 2026/05/14</div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#FAFAFA' }}>
                  {['訂單編號', '訂單金額', '下單時間', '操作'].map(h => (
                    <th key={h} style={{ ...tableThStyle, fontSize: 12 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {drawerOrders.slice(0, drawer.orders > 3 ? 5 : 3).map((o, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #DCDFE6' }}>
                    <td style={{ padding: '9px 12px', fontSize: 13, color: '#409EFF' }}>{o.id}</td>
                    <td style={{ padding: '9px 12px', fontSize: 13 }}>{o.amt}</td>
                    <td style={{ padding: '9px 12px', fontSize: 13, color: '#606266' }}>{o.time}</td>
                    <td style={{ padding: '9px 12px' }}>
                      <button style={{ background: 'none', border: 'none', color: '#409EFF', cursor: 'pointer', fontSize: 13, fontFamily: 'Noto Sans TC,sans-serif', padding: 0 }}>查看訂單</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </Drawer>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
function AdToolsPage({ toast }) {
  const [activeTab, setActiveTab] = React.useState('utm');

  const tabs = [
    { id: 'utm',  label: 'UTM 網址生成器' },
    { id: 'feed', label: '產品目錄 Feed' },
    { id: 'analytics', label: '廣告來源分析' },
  ];

  return (
    <div>
      <PageHeader title="廣告投放工具" breadcrumbs={['行銷管理', '廣告投放工具']} />

      <InfoBanner>
        廣告追蹤碼（Facebook Pixel / GA4 / LINE Tag）設定請前往「行銷管理 &gt; 行銷工具設定」，不在此頁設定。
        <a href="#" style={{ color: '#409EFF', marginLeft: 4 }}>前往行銷工具設定 →</a>
      </InfoBanner>

      <div style={{ display: 'flex', borderBottom: '2px solid #DCDFE6', marginBottom: 24 }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{ height: 44, padding: '0 24px', background: 'none', border: 'none', borderBottom: activeTab === tab.id ? '2px solid #303133' : '2px solid transparent', marginBottom: -2, fontSize: 14, fontWeight: activeTab === tab.id ? 700 : 400, color: activeTab === tab.id ? '#303133' : '#606266', cursor: 'pointer', fontFamily: 'Noto Sans TC,sans-serif' }}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'utm'      && <UTMTab toast={toast} />}
      {activeTab === 'feed'     && <FeedTab toast={toast} />}
      {activeTab === 'analytics' && <AnalyticsTab toast={toast} />}
    </div>
  );
}

// ─── PageAdTools ──────────────────────────────────────────────────────────────

function PageAdTools({ onNavigate, show }) {
  const toast = show || (() => {});
  return <AdToolsPage toast={toast} />;
}
