// PageEcommerceBasic — 電商基本設定

// ─── Shared styles ───────────────────────────────────────────────────────────

const ebInput = {
  width: '100%', height: 40, padding: '0 12px',
  border: '1px solid #DCDFE6', borderRadius: 0,
  fontSize: 14, outline: 'none', color: '#303133', background: '#fff',
  fontFamily: 'Noto Sans TC, sans-serif',
};
const ebInputDisabled = { ...ebInput, background: '#F5F7FA', color: '#909399', cursor: 'not-allowed' };
const ebSelect = {
  ...ebInput, cursor: 'pointer', appearance: 'none',
  backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\'%3E%3Cpath d=\'M1 1l5 5 5-5\' stroke=\'%23909399\' stroke-width=\'1.5\' fill=\'none\' stroke-linecap=\'round\'/%3E%3C/svg%3E")',
  backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', paddingRight: 36,
};
const ebLabel   = { display: 'block', fontSize: 13, color: '#606266', fontWeight: 500, marginBottom: 6 };
const ebHint    = { fontSize: 12, color: '#909399', marginTop: 4, lineHeight: 1.6 };
const ebErr     = { fontSize: 12, color: '#F56C6C', marginTop: 4 };
const ebCard    = { background: '#fff', border: '1px solid #DCDFE6', borderRadius: 3, marginBottom: 16 };
const ebCardHd  = { padding: '13px 20px', borderBottom: '1px solid #DCDFE6', fontSize: 15, fontWeight: 700 };
const ebCardBd  = { padding: 20 };
const ebDivider = { borderTop: '1px solid #F2F6FC', margin: '20px 0' };
const ebLockRow = { display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: 12, color: '#909399', marginTop: 6, lineHeight: 1.6 };

const EbInfoIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#909399" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}>
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);

function EbSaveBar({ onSave, saving }) {
  return (
    <div style={{ borderTop: '1px solid #DCDFE6', padding: '16px 24px', display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
      <button onClick={onSave} disabled={saving}
        style={{ height: 36, padding: '0 24px', background: '#303133', color: '#fff', border: '1px solid #303133', borderRadius: 0, cursor: saving ? 'not-allowed' : 'pointer', fontSize: 14, opacity: saving ? 0.7 : 1, fontFamily: 'Noto Sans TC, sans-serif' }}>
        {saving ? '儲存中...' : '儲存設定'}
      </button>
    </div>
  );
}

// ─── 確認 Dialog ──────────────────────────────────────────────────────────────

function EbConfirmDialog({ visible, currency, previewNum, CURRENCIES, onCancel, onConfirm }) {
  if (!visible) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 3, width: 420, boxShadow: '0 4px 24px rgba(0,0,0,.15)', padding: '24px 28px' }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>確認儲存設定</div>
        <div style={{ fontSize: 14, color: '#606266', lineHeight: 1.8, marginBottom: 20 }}>
          幣別與訂單編號格式儲存後將<strong>無法修改</strong>，請確認以下設定正確後再儲存。
          <div style={{ marginTop: 12, padding: '10px 14px', background: '#F5F7FA', border: '1px solid #DCDFE6', borderRadius: 3, fontSize: 13 }}>
            <div>幣別：{CURRENCIES.find(c => c.code === currency)?.label}</div>
            <div style={{ marginTop: 4 }}>訂單編號格式：{previewNum}…</div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button onClick={onCancel} style={{ height: 36, padding: '0 18px', border: '1px solid #DCDFE6', background: '#fff', borderRadius: 0, cursor: 'pointer', fontSize: 14, fontFamily: 'Noto Sans TC, sans-serif' }}>取消</button>
          <button onClick={onConfirm} style={{ height: 36, padding: '0 20px', border: '1px solid #303133', background: '#303133', color: '#fff', borderRadius: 0, cursor: 'pointer', fontSize: 14, fontFamily: 'Noto Sans TC, sans-serif' }}>確認儲存</button>
        </div>
      </div>
    </div>
  );
}

// ─── Tab 1：交易設定 ──────────────────────────────────────────────────────────

const CURRENCIES = [
  { code: 'TWD', label: 'TWD — 新台幣' },
  { code: 'USD', label: 'USD — 美元' },
  { code: 'HKD', label: 'HKD — 港幣' },
  { code: 'JPY', label: 'JPY — 日圓' },
  { code: 'SGD', label: 'SGD — 新幣' },
  { code: 'EUR', label: 'EUR — 歐元' },
  { code: 'GBP', label: 'GBP — 英鎊' },
];

const SEQ_OPTIONS = [
  { value: '4', label: '4 位（0001）' },
  { value: '5', label: '5 位（00001）' },
  { value: '6', label: '6 位（000001）' },
];

function TradeSettings({ show }) {
  const [locked, setLocked]       = React.useState(false);
  const [currency, setCurrency]   = React.useState('TWD');
  const [prefix, setPrefix]       = React.useState('ORD');
  const [seqLen, setSeqLen]       = React.useState('5');
  const [prefixErr, setPrefixErr] = React.useState('');
  const [saving, setSaving]       = React.useState(false);
  const [confirm, setConfirm]     = React.useState(false);

  const previewNum = () => {
    const p = prefix.trim() || 'ORD';
    const len = parseInt(seqLen, 10);
    return `${p}-${'0'.repeat(len - 1)}1`;
  };

  const validate = () => {
    if (locked) return true;
    const p = prefix.trim();
    if (!p)                         { setPrefixErr('前綴字元為必填'); return false; }
    if (!/^[A-Z0-9]+$/.test(p))    { setPrefixErr('僅限英文大寫字母與數字'); return false; }
    if (p.length > 10)              { setPrefixErr('最多 10 字元'); return false; }
    return true;
  };

  const handleSave = () => {
    if (!validate()) return;
    if (!locked) { setConfirm(true); return; }
    doSave();
  };

  const doSave = () => {
    setConfirm(false);
    setSaving(true);
    setTimeout(() => { setSaving(false); setLocked(true); show('設定已儲存', 'success'); }, 800);
  };

  return (
    <div>
      <div style={{ padding: '20px 24px 4px' }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>交易設定</div>
        <div style={{ fontSize: 13, color: '#606266', lineHeight: 1.7 }}>設定商店主要幣別與訂單編號格式，儲存後不可修改。</div>
      </div>

      <EbConfirmDialog
        visible={confirm}
        currency={currency}
        previewNum={previewNum()}
        CURRENCIES={CURRENCIES}
        onCancel={() => setConfirm(false)}
        onConfirm={doSave}
      />

      <div style={{ padding: '16px 24px 0' }}>

        {/* 幣別 */}
        <div style={ebCard}>
          <div style={ebCardHd}>幣別</div>
          <div style={ebCardBd}>
            <div style={{ fontSize: 13, color: '#606266', marginBottom: 10, lineHeight: 1.6 }}>
              選擇您商店的主要交易幣別，影響所有訂單金額、發票與報表顯示。
            </div>
            {!locked ? (
              <React.Fragment>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 8, fontSize: 12, color: '#E6A23C', lineHeight: 1.6 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#E6A23C" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}>
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  幣別儲存後將無法修改，請確認後再儲存。
                </div>
                <select value={currency} onChange={e => setCurrency(e.target.value)} style={{ ...ebSelect, maxWidth: 280 }}>
                  {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
                </select>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div style={{ ...ebInputDisabled, maxWidth: 280, display: 'flex', alignItems: 'center' }}>
                  {CURRENCIES.find(c => c.code === currency)?.label}
                </div>
                <div style={ebLockRow}><EbInfoIcon />幣別設定後不可修改。如有特殊需求，請聯繫營運輔導顧問。</div>
              </React.Fragment>
            )}
          </div>
        </div>

        {/* 訂單編號格式 */}
        <div style={ebCard}>
          <div style={ebCardHd}>訂單編號格式</div>
          <div style={ebCardBd}>
            <div style={{ fontSize: 13, color: '#606266', marginBottom: 12, lineHeight: 1.6 }}>
              每張訂單的唯一識別碼，格式為「前綴 + 序號」，儲存後不可修改。
            </div>
            {!locked ? (
              <React.Fragment>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 480, marginBottom: 12 }}>
                  <div>
                    <label style={ebLabel}>前綴字元 <span style={{ color: '#F56C6C' }}>*</span></label>
                    <input value={prefix} onChange={e => { setPrefix(e.target.value.toUpperCase()); setPrefixErr(''); }} placeholder="ORD" maxLength={10} style={ebInput} />
                    {prefixErr ? <div style={ebErr}>{prefixErr}</div> : <div style={ebHint}>最多 10 字元，限英文大寫字母與數字</div>}
                  </div>
                  <div>
                    <label style={ebLabel}>序號長度 <span style={{ color: '#F56C6C' }}>*</span></label>
                    <select value={seqLen} onChange={e => setSeqLen(e.target.value)} style={ebSelect}>
                      {SEQ_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ background: '#F5F7FA', border: '1px solid #DCDFE6', borderRadius: 3, padding: '10px 14px', maxWidth: 480 }}>
                  <span style={{ fontSize: 13, color: '#606266' }}>預覽：</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#303133', marginLeft: 4 }}>{previewNum()}</span>
                </div>
                <div style={ebHint}>實際訂單號將依序遞增，例：{previewNum()}、{previewNum().replace(/1$/, '2')}…</div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div style={{ ...ebInputDisabled, maxWidth: 280, display: 'flex', alignItems: 'center' }}>{previewNum()}…</div>
                <div style={ebLockRow}><EbInfoIcon />訂單編號格式設定後不可修改。如有特殊需求，請聯繫營運輔導顧問。</div>
              </React.Fragment>
            )}
          </div>
        </div>

      </div>

      <EbSaveBar onSave={handleSave} saving={saving} />
    </div>
  );
}

// ─── Tab 2：發票資訊 ──────────────────────────────────────────────────────────

function InvoiceSettings({ show, onNavigate }) {
  const [invoiceName, setInvoiceName] = React.useState('');
  const [taxId, setTaxId]             = React.useState('');
  const [invoiceErr, setInvoiceErr]   = React.useState('');
  const [taxErr, setTaxErr]           = React.useState('');
  const [saving, setSaving]           = React.useState(false);

  const handleSave = () => {
    let ok = true;
    if (!invoiceName.trim()) { setInvoiceErr('發票公司抬頭為必填'); ok = false; }
    if (taxId && !/^\d{8}$/.test(taxId)) { setTaxErr('統一編號須為 8 碼數字'); ok = false; }
    if (!ok) return;
    setSaving(true);
    setTimeout(() => { setSaving(false); show('設定已儲存', 'success'); }, 800);
  };

  return (
    <div>
      <div style={{ padding: '20px 24px 4px' }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>發票資訊</div>
        <div style={{ fontSize: 13, color: '#606266', lineHeight: 1.7 }}>
          設定電子發票賣方欄位所使用的法人資訊，與前台商店顯示名稱獨立維護。
        </div>
      </div>

      <div style={{ padding: '16px 24px 0' }}>

        <div style={ebCard}>
          <div style={ebCardHd}>賣方資訊</div>
          <div style={ebCardBd}>
            <div style={{ fontSize: 13, color: '#606266', marginBottom: 16, lineHeight: 1.7 }}>
              以下資料用於電子發票的賣方欄位，請填寫商業登記上的法人資訊。
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={ebLabel}>發票公司抬頭 <span style={{ color: '#F56C6C' }}>*</span></label>
              <div style={{ fontSize: 13, color: '#606266', marginBottom: 8, lineHeight: 1.6 }}>電子發票上顯示的賣方公司名稱，須與商業登記一致。</div>
              <input value={invoiceName} onChange={e => { setInvoiceName(e.target.value); setInvoiceErr(''); }} placeholder="例：威德科技有限公司" maxLength={60} style={{ ...ebInput, maxWidth: 400 }} />
              {invoiceErr && <div style={ebErr}>{invoiceErr}</div>}
            </div>

            <div style={ebDivider} />

            <div>
              <label style={ebLabel}>統一編號</label>
              <div style={{ fontSize: 13, color: '#606266', marginBottom: 8, lineHeight: 1.6 }}>
                填寫後消費者結帳時可選擇「公司戶」並輸入買方統編，系統自動開立三聯式發票。
              </div>
              <input value={taxId} onChange={e => { setTaxId(e.target.value.replace(/\D/g, '').slice(0, 8)); setTaxErr(''); }} placeholder="例：12345678（8 碼數字）" style={{ ...ebInput, maxWidth: 240 }} />
              {taxErr && <div style={ebErr}>{taxErr}</div>}
            </div>
          </div>
        </div>

        <div style={{ fontSize: 13, color: '#606266', display: 'flex', alignItems: 'center', gap: 4, padding: '0 4px' }}>
          <EbInfoIcon />
          電子發票串接金鑰請至
          <span onClick={() => onNavigate && onNavigate('gs-payment-logistics')} style={{ color: '#409EFF', cursor: 'pointer', marginLeft: 2 }}>
            金物流串接 &gt; 電子發票設定 →
          </span>
        </div>

      </div>

      <EbSaveBar onSave={handleSave} saving={saving} />
    </div>
  );
}

// ─── Hub 主元件 ──────────────────────────────────────────────────────────────

const BASIC_TABS = [
  { id: 'eb-trade',   label: '交易設定' },
  { id: 'eb-invoice', label: '發票資訊' },
];

function PageEcommerceBasic({ onNavigate, show }) {
  const showToast = show || (() => {});
  const [activeTab, setActiveTab] = React.useState('eb-trade');

  const renderContent = () => {
    switch (activeTab) {
      case 'eb-trade':   return <TradeSettings show={showToast} />;
      case 'eb-invoice': return <InvoiceSettings show={showToast} onNavigate={onNavigate} />;
      default:           return <TradeSettings show={showToast} />;
    }
  };

  return (
    <React.Fragment>
      <PageHeader title="電商基本設定" />
      <div style={{ display: 'flex', gap: 0, minHeight: 'calc(100vh - 96px)' }}>
        <div style={{ width: 168, flexShrink: 0, background: '#fff', border: '1px solid #DCDFE6', borderRight: 'none', borderRadius: '3px 0 0 3px', paddingTop: 8 }}>
          {BASIC_TABS.map(t => (
            <div key={t.id} onClick={() => setActiveTab(t.id)}
              style={{
                padding: '10px 20px', fontSize: 14, cursor: 'pointer', userSelect: 'none',
                color: activeTab === t.id ? '#409EFF' : '#606266',
                background: activeTab === t.id ? '#ECF5FF' : 'transparent',
                borderRight: activeTab === t.id ? '2px solid #409EFF' : '2px solid transparent',
                fontWeight: activeTab === t.id ? 600 : 400,
              }}
              onMouseEnter={e => { if (activeTab !== t.id) e.currentTarget.style.background = '#F5F7FA'; }}
              onMouseLeave={e => { if (activeTab !== t.id) e.currentTarget.style.background = 'transparent'; }}
            >
              {t.label}
            </div>
          ))}
        </div>
        <div style={{ flex: 1, background: '#fff', border: '1px solid #DCDFE6', borderRadius: '0 3px 3px 0', minWidth: 0, overflowY: 'auto' }}>
          {renderContent()}
        </div>
      </div>
    </React.Fragment>
  );
}
