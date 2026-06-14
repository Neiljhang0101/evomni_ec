// Screens 3, 4, 5 — 銀行金流 / 人工處理 / 半人工 廠商設定頁

// ─── Screen 3: 設定即用廠商（銀行金流）────────────────────────────────────
function VendorBankScreen({ vendor, onBack }) {
  const { toasts, show } = useToast();
  const [enabled, setEnabled] = React.useState(false);
  const [form, setForm] = React.useState({ storeCode: '', apiKey: '', encKey: '' });
  const [saving, setSaving] = React.useState(false);
  const [lastSaved, setLastSaved] = React.useState(null);
  const [dirty, setDirty] = React.useState(false);
  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setDirty(true); };
  const webhookUrl = `https://yourstore.evomni.com/api/webhooks/payment/a3f9k2/${vendor.id}`;

  const isMastercard = vendor.id === 'mastercard';

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false); setDirty(false);
      const now = new Date();
      setLastSaved(`${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,'0')}/${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`);
      show('設定已儲存', 'success');
    }, 800);
  };

  return (
    <div>
      <ToastStack toasts={toasts} />
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, marginBottom: 8, color: '#909399' }}>
          <span onClick={onBack} style={{ cursor: 'pointer' }}>串接設定</span>
          <span>/</span>
          <span style={{ color: '#303133' }}>{vendor.name}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 64, height: 64, background: '#F5F7FA', border: '1px solid #DCDFE6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: vendor.color }}>{vendor.initial}</div>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>{vendor.name}</h1>
              <div style={{ display: 'flex', gap: 8 }}><VendorTypeTag type={vendor.type} /><StatusBadge status={enabled ? '已啟用' : '未設定'} /></div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#606266' }}>
            <span>啟用串接</span>
            <Switch checked={enabled} onChange={v => { setEnabled(v); show(v ? `${vendor.name}已啟用` : `${vendor.name}已停用`, v ? 'success' : 'info'); }} />
          </div>
        </div>
      </div>

      {isMastercard ? (
        <div style={{ background: '#fff', border: '2px solid #FDF6EC', padding: 24, marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 10 }}>Mastercard 不直接提供電商 API</div>
          <p style={{ fontSize: 14, color: '#606266', lineHeight: 1.7, marginBottom: 16 }}>Mastercard 信用卡收款需透過您已串接的銀行或第三方金流廠商啟用。建議在以下廠商中啟用「信用卡」收款方式：</p>
          <ul style={{ fontSize: 14, color: '#606266', paddingLeft: 20, lineHeight: 2 }}>
            <li>綠界科技 → 信用卡</li><li>藍新科技 → 信用卡</li><li>各銀行金流 → 刷卡收款（已含 Mastercard 網路）</li>
          </ul>
          <button style={{ ...sharedBtns.plain, marginTop: 12 }} onClick={onBack}>前往設定綠界科技</button>
        </div>
      ) : (
        <>
          <Banner type="info">銀行金流不提供沙箱環境，請填入真實商店代碼後直接啟用。首次建議以小金額測試交易確認串接正確。</Banner>

          {/* Stepper */}
          <SectionCard title="申請流程指引">
            {[
              { step: 1, label: `前往${vendor.name}官網申請電商收款服務`, action: '前往申請 ↗' },
              { step: 2, label: '簽署合約，等待銀行審核（約 5–10 工作天）', note: '等待中' },
              { step: 3, label: '取得商店代碼與 API 金鑰', note: '通常由銀行業務以 Email 傳送' },
              { step: 4, label: '將商店代碼填入下方設定表單並儲存，完成後啟用', note: '' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, marginBottom: i < 3 ? 20 : 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#409EFF', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{s.step}</div>
                  {i < 3 && <div style={{ width: 2, flex: 1, background: '#DCDFE6', marginTop: 4, minHeight: 20 }} />}
                </div>
                <div style={{ paddingTop: 4, paddingBottom: i < 3 ? 16 : 0 }}>
                  <div style={{ fontSize: 14, color: '#303133', fontWeight: 500 }}>{s.label}</div>
                  {s.note && <div style={{ fontSize: 12, color: '#909399', marginTop: 2 }}>{s.note}</div>}
                  {s.action && <a href="#" style={{ fontSize: 13, color: '#409EFF', textDecoration: 'none', display: 'inline-block', marginTop: 6 }}>{s.action}</a>}
                </div>
              </div>
            ))}
          </SectionCard>

          {/* Credentials */}
          <SectionCard title="憑證設定">
            <div style={{ maxWidth: 520 }}>
              <FormField label="商店代號" required helper="通常為 8–16 位英數字，由銀行業務 Email 通知">
                <EInput value={form.storeCode} onChange={v => set('storeCode', v)} placeholder="請輸入銀行核發的商店代號" />
              </FormField>
              <FormField label="API 金鑰" required helper="儲存後顯示遮罩">
                <PasswordInput value={form.apiKey} onChange={v => set('apiKey', v)} />
              </FormField>
              <FormField label="加密金鑰（如有）" helper="部分銀行提供，無則留空">
                <PasswordInput value={form.encKey} onChange={v => set('encKey', v)} placeholder="請輸入加密金鑰（選填）" />
              </FormField>
            </div>
          </SectionCard>

          {/* Webhook */}
          <SectionCard title="Webhook 設定">
            <p style={{ fontSize: 13, color: '#606266', marginBottom: 12 }}>請將以下 URL 填入銀行後台的回調網址欄位。</p>
            <WebhookUrlField url={webhookUrl} onCopy={() => show('已複製到剪貼簿', 'success')} />
          </SectionCard>

          <FixedBar lastSaved={lastSaved} onCancel={onBack} onSave={handleSave} saving={saving} />
        </>
      )}
    </div>
  );
}

// ─── Screen 4: 人工處理廠商（聖喆國際）─────────────────────────────────────
const MOCK_ORDERS = [
  { id: '#ORD-2841', customer: '王小明', product: '低溫鮮食禮盒 × 2', time: '2026/05/08 10:22', tracking: '', overtime: true },
  { id: '#ORD-2835', customer: '李美玲', product: '有機蔬菜箱 × 1',   time: '2026/05/09 14:55', tracking: '', overtime: false },
  { id: '#ORD-2829', customer: '陳大偉', product: '冷凍牛排組合 × 3', time: '2026/05/10 09:10', tracking: '', overtime: false },
];

function VendorManualScreen({ vendor, onBack }) {
  const { toasts, show } = useToast();
  const [tab, setTab] = React.useState('settings');
  const [subTab, setSubTab] = React.useState('pending');
  const [enabled, setEnabled] = React.useState(vendor.status === '已啟用');
  const [orders, setOrders] = React.useState(MOCK_ORDERS);
  const [trackingInputs, setTrackingInputs] = React.useState({});
  const [confirmDialog, setConfirmDialog] = React.useState(null);

  const pendingCount = orders.filter(o => !o.tracking).length;

  const handleConfirmShipment = (orderId) => {
    const tracking = trackingInputs[orderId];
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, tracking } : o));
    setConfirmDialog(null);
      show('出貨通知已發送，訂單移至「已完成」');
  };

  return (
    <div>
      <ToastStack toasts={toasts} />
      <Dialog open={!!confirmDialog} title="此操作不可逆"
        confirmText="確認出貨"
        onConfirm={() => handleConfirmShipment(confirmDialog?.id)}
        onCancel={() => setConfirmDialog(null)}>
        確認上傳追蹤號 <strong>{confirmDialog?.tracking}</strong> 並發送出貨通知給消費者 <strong>{confirmDialog?.customer}</strong>？出貨通知一旦寄出即無法撤回。
      </Dialog>

      {/* Page header */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 6, fontSize: 13, color: '#909399', marginBottom: 8 }}>
          <span onClick={onBack} style={{ cursor: 'pointer' }}>串接設定</span><span>/</span><span style={{ color: '#303133' }}>{vendor.name}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 64, height: 64, background: '#F5F7FA', border: '1px solid #DCDFE6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: vendor.color }}>{vendor.initial}</div>
            <div><h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>{vendor.name}</h1><div style={{ display: 'flex', gap: 8 }}><VendorTypeTag type={vendor.type} /><StatusBadge status={enabled ? '已啟用' : '未設定'} /></div></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#606266' }}>
            <span>啟用串接</span>
            <Switch checked={enabled} onChange={v => { setEnabled(v); show(v ? `${vendor.name}已啟用` : `${vendor.name}已停用`, v ? 'success' : 'info'); }} />
          </div>
        </div>
      </div>

      <Banner type="info">此廠商採人工協調出貨，系統不直接對接廠商 API。啟用後需依以下流程通知廠商出貨，並手動在系統填入物流追蹤號。</Banner>

      <ETabs
        tabs={[{ id: 'settings', label: '廠商設定' }, { id: 'tracking', label: '手動追蹤號上傳', badge: pendingCount }]}
        active={tab} onChange={setTab}
        style={{ marginBottom: 20 }}
      />

      {tab === 'settings' && (
        <div>
          <SectionCard title="作業流程">
            {[
              { label: '消費者下單完成', tag: '系統自動', tagColor: '#67C23A' },
              { label: '物流人員聯繫聖喆國際確認取件', tag: '人工', tagColor: '#E6A23C' },
              { label: '廠商出貨，取得冷鏈追蹤單號', tag: '人工', tagColor: '#E6A23C' },
              { label: '在本系統填入追蹤號（見「手動追蹤號上傳」Tab）', tag: '人工', tagColor: '#E6A23C' },
              { label: '系統自動發送「您的訂單已出貨」通知給消費者', tag: '系統自動', tagColor: '#67C23A' },
            ].map((s, i, arr) => (
              <div key={i} style={{ display: 'flex', gap: 16, marginBottom: i < arr.length - 1 ? 20 : 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#409EFF', flexShrink: 0, marginTop: 6 }} />
                  {i < arr.length - 1 && <div style={{ width: 2, flex: 1, background: '#DCDFE6', marginTop: 4, minHeight: 16 }} />}
                </div>
                <div style={{ paddingBottom: i < arr.length - 1 ? 4 : 0 }}>
                  <span style={{ fontSize: 14, color: '#303133' }}>{s.label}</span>
                  <span style={{ marginLeft: 8, background: s.tagColor + '22', color: s.tagColor, borderRadius: 9999, padding: '1px 8px', fontSize: 11 }}>{s.tag}</span>
                </div>
              </div>
            ))}
          </SectionCard>
          <SectionCard title="廠商聯絡資訊">
            {[['廠商名稱','聖喆國際股份有限公司'],['服務電話','（待填入廠商實際電話）'],['服務信箱','（待填入廠商實際 Email）'],['服務時間','週一至週五 09:00–18:00']].map(([k,v]) => (
              <div key={k} style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
                <span style={{ width: 80, fontSize: 13, color: '#909399', flexShrink: 0 }}>{k}</span>
                <span style={{ fontSize: 13, color: '#303133' }}>{v}</span>
              </div>
            ))}
          </SectionCard>
        </div>
      )}

      {tab === 'tracking' && (
        <div>
          <ETabs tabs={[{ id: 'pending', label: `待上傳追蹤號 (${pendingCount})` }, { id: 'done', label: '已完成' }]} active={subTab} onChange={setSubTab} style={{ marginBottom: 16 }} />
          {subTab === 'pending' && (
            <div style={{ background: '#fff', border: '1px solid #DCDFE6', borderRadius: 3 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: '#F5F7FA' }}>
                    {['訂單號','消費者','產品摘要','付款時間','追蹤號','操作'].map(h => (
                      <th key={h} style={{ padding: '10px 16px', textAlign: 'left', color: '#606266', fontWeight: 500, fontSize: 13, borderBottom: '1px solid #DCDFE6' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.filter(o => !o.tracking).map(o => (
                    <tr key={o.id} style={{ background: o.overtime ? '#FEF0F0' : '#fff' }}>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #EBEEF5', color: '#409EFF' }}>{o.id}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #EBEEF5' }}>{o.customer}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #EBEEF5', color: '#606266' }}>{o.product}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #EBEEF5', color: '#909399', fontSize: 13 }}>
                        {o.time}
                        {o.overtime && <div style={{ color: '#E6A23C', fontSize: 11, marginTop: 2 }}>已超過 48 小時</div>}
                      </td>
                      <td style={{ padding: '8px 16px', borderBottom: '1px solid #EBEEF5' }}>
                        <EInput value={trackingInputs[o.id] || ''} onChange={v => setTrackingInputs(p => ({ ...p, [o.id]: v }))} placeholder="輸入追蹤號" width={160} />
                      </td>
                      <td style={{ padding: '8px 16px', borderBottom: '1px solid #EBEEF5' }}>
                        {trackingInputs[o.id] && (
                          <button style={{ ...sharedBtns.create, height: 30, fontSize: 13 }} onClick={() => setConfirmDialog({ id: o.id, tracking: trackingInputs[o.id], customer: o.customer })}>確認出貨</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {subTab === 'done' && (
            <div style={{ background: '#fff', border: '1px solid #DCDFE6', borderRadius: 3 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead><tr style={{ background: '#F5F7FA' }}>{['訂單號','消費者','產品摘要','付款時間','追蹤號'].map(h => <th key={h} style={{ padding: '10px 16px', textAlign: 'left', color: '#606266', fontWeight: 500, fontSize: 13, borderBottom: '1px solid #DCDFE6' }}>{h}</th>)}</tr></thead>
                <tbody>
                  {orders.filter(o => o.tracking).map(o => (
                    <tr key={o.id}><td style={{ padding: '12px 16px', borderBottom: '1px solid #EBEEF5', color: '#409EFF' }}>{o.id}</td><td style={{ padding: '12px 16px', borderBottom: '1px solid #EBEEF5' }}>{o.customer}</td><td style={{ padding: '12px 16px', borderBottom: '1px solid #EBEEF5', color: '#606266' }}>{o.product}</td><td style={{ padding: '12px 16px', borderBottom: '1px solid #EBEEF5', color: '#909399', fontSize: 13 }}>{o.time}</td><td style={{ padding: '12px 16px', borderBottom: '1px solid #EBEEF5', color: '#67C23A' }}>{o.tracking}</td></tr>
                  ))}
                  {orders.filter(o => o.tracking).length === 0 && <tr><td colSpan={5} style={{ textAlign: 'center', padding: '40px 0', color: '#909399' }}>尚無已完成的訂單</td></tr>}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Screen 5: 半人工廠商（BOXFUL）──────────────────────────────────────────
const MOCK_SKUS = [
  { systemSku: 'SKU-001', name: '有機蔬菜箱 S', vendorSku: 'BOX-VEG-S', updated: '2026/05/01' },
  { systemSku: 'SKU-002', name: '有機蔬菜箱 L', vendorSku: '',          updated: '' },
  { systemSku: 'SKU-003', name: '冷凍牛排組合', vendorSku: 'BOX-BEEF',  updated: '2026/04/28' },
  { systemSku: 'SKU-004', name: '鮮食禮盒 A',  vendorSku: '',          updated: '' },
];

function VendorSemiScreen({ vendor, onBack }) {
  const { toasts, show } = useToast();
  const [enabled, setEnabled] = React.useState(false);
  const [form, setForm] = React.useState({ apiKey: '', warehouseCode: '' });
  const [skus, setSkus] = React.useState(MOCK_SKUS);
  const [editingSkus, setEditingSkus] = React.useState({});
  const [saving, setSaving] = React.useState(false);
  const [lastSaved, setLastSaved] = React.useState(null);
  const [testResult, setTestResult] = React.useState(null);
  const [testing, setTesting] = React.useState(false);
  const [showImportDialog, setShowImportDialog] = React.useState(false);
  const [importMode, setImportMode] = React.useState('merge'); // merge | replace
  const [isAdvanced, setIsAdvanced] = React.useState(window.__evomni_isPro || false);
  React.useEffect(() => {
    const handler = e => setIsAdvanced(e.detail.isPro);
    window.addEventListener('evomni:planchange', handler);
    return () => window.removeEventListener('evomni:planchange', handler);
  }, []);

  const unmapped = skus.filter(s => !s.vendorSku).length;

  const openImportDialog = () => { setImportMode('merge'); setShowImportDialog(true); };
  const handleImportConfirm = () => {
    setShowImportDialog(false);
    if (importMode === 'replace') {
      show(`已以「全部替換」模式匯入，原有對照已清除並重建為 CSV 內容`, 'warning');
    } else {
      show(`已以「合併匯入」模式完成，CSV 中的 SKU 已新增或更新`, 'success');
    }
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      const now = new Date();
      setLastSaved(`${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,'0')}/${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`);
      show('設定已儲存', 'success');
    }, 800);
  };

  return (
    <div>
      <ToastStack toasts={toasts} />

      {/* 批次匯入模式選擇 Dialog */}
      <Dialog
        open={showImportDialog}
        title="批次匯入 SKU 對照"
        width={520}
        confirmText={importMode === 'replace' ? '確認全部替換' : '確認匯入'}
        confirmDanger={importMode === 'replace'}
        onConfirm={handleImportConfirm}
        onCancel={() => setShowImportDialog(false)}
      >
        <p style={{ fontSize: 13, color: '#606266', lineHeight: 1.7, marginBottom: 14 }}>
          請選擇匯入模式並上傳 CSV 檔案（格式：<code style={{ fontFamily: 'monospace', background: '#F5F7FA', padding: '1px 5px', borderRadius: 2, color: '#606266' }}>系統SKU,倉儲SKU</code>）。
          <a href="#" style={{ color: '#409EFF', marginLeft: 6 }} onClick={e => { e.preventDefault(); show('正在下載 CSV 匯入範本', 'info'); }}>下載範本</a>
        </p>
        <RadioGroup
          value={importMode}
          onChange={setImportMode}
          options={[
            { value: 'merge',   label: '合併匯入（建議）', desc: '保留現有對照，僅新增或更新 CSV 中出現的 SKU。' },
            { value: 'replace', label: '全部替換',        desc: `清除目前全部 ${skus.length} 筆對照，完全以 CSV 內容取代。` },
          ]}
          vertical
        />
        {importMode === 'replace' && (
          <div style={{ marginTop: 14, background: '#FEF0F0', border: '1px solid #FBC4C4', borderRadius: 3, padding: '10px 14px', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#F56C6C', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>!</span>
            <span style={{ fontSize: 13, color: '#F56C6C', lineHeight: 1.7 }}>
              「全部替換」會刪除現有 {skus.length} 筆對照且無法復原，僅保留 CSV 內的對照資料。請確認 CSV 內容完整後再執行。
            </span>
          </div>
        )}
      </Dialog>

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 6, fontSize: 13, color: '#909399', marginBottom: 8 }}>
          <span onClick={onBack} style={{ cursor: 'pointer' }}>串接設定</span><span>/</span><span style={{ color: '#303133' }}>{vendor.name}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 64, height: 64, background: '#F5F7FA', border: '1px solid #DCDFE6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: vendor.color }}>{vendor.initial}</div>
            <div><h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>{vendor.name}</h1><div style={{ display: 'flex', gap: 8 }}><VendorTypeTag type={vendor.type} /><StatusBadge status={enabled ? '已啟用' : '未設定'} /></div></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#606266' }}>
            <span>啟用串接</span>
            <Switch checked={enabled} onChange={v => { setEnabled(v); show(v ? `${vendor.name}已啟用` : `${vendor.name}已停用`, v ? 'success' : 'info'); }} />
          </div>
        </div>
      </div>

      <UpgradeLockBanner
        featureName="倉儲物流串接"
        valueProp="整合倉儲系統，自動同步庫存與出貨狀態，告別人工對帳"
        onLearnMore={() => show('即將跳轉至方案升級頁面', 'info')}
      />

      {unmapped > 0 && <Banner type="warning" cta="前往設定" onCta={() => {}}>有 {unmapped} 個產品 SKU 尚未對照，訂單出貨時可能發生揀貨異常。</Banner>}

      <div style={{ filter: !isAdvanced ? 'blur(3px)' : 'none', pointerEvents: isAdvanced ? 'auto' : 'none' }}>
        <SectionCard title="API 憑證設定">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px', maxWidth: 720 }}>
            <FormField label="API Token" required><PasswordInput value={form.apiKey} onChange={v => setForm(f => ({ ...f, apiKey: v }))} /></FormField>
            <FormField label="倉庫代碼" required helper="BOXFUL 倉庫代碼由廠商提供，格式為英數字"><EInput value={form.warehouseCode} onChange={v => setForm(f => ({ ...f, warehouseCode: v }))} placeholder="請輸入倉庫代碼" /></FormField>
          </div>
          <button style={{ ...sharedBtns.plain, marginTop: 4 }} onClick={() => { setTesting(true); setTimeout(() => { setTesting(false); setTestResult({ success: true, message: '連線成功！倉儲 API 回應正常。' }); }, 1500); }} disabled={testing}>{testing ? '測試中…' : '測試連線'}</button>
          <ConnectionTestAlert result={testResult} />
        </SectionCard>

        <SectionCard title="SKU 對照表" extra={<span style={{ fontSize: 13, color: '#909399' }}>請將本系統 SKU 對應至倉儲廠商 SKU</span>}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
            <button style={{ ...sharedBtns.plain, height: 34, fontSize: 13 }} onClick={() => show('已新增一列空白對照，請填入 SKU', 'info')}>+ 新增對照</button>
            <button style={{ ...sharedBtns.plain, height: 34, fontSize: 13 }} onClick={openImportDialog}>批次匯入</button>
            <button style={{ ...sharedBtns.plain, height: 34, fontSize: 13 }} onClick={() => show('正在下載目前的 SKU 對照表（CSV）', 'info')}>下載對照表</button>
          </div>
          <div style={{ background: '#fff', border: '1px solid #DCDFE6', borderRadius: 3 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead><tr style={{ background: '#F5F7FA' }}>{['本系統 SKU','產品名稱','倉儲廠商 SKU','最後更新'].map(h => <th key={h} style={{ padding: '10px 16px', textAlign: 'left', color: '#606266', fontWeight: 500, fontSize: 13, borderBottom: '1px solid #DCDFE6' }}>{h}</th>)}</tr></thead>
              <tbody>
                {skus.map(s => (
                  <tr key={s.systemSku} style={{ background: !s.vendorSku ? '#fffbf0' : '#fff' }}>
                    <td style={{ padding: '10px 16px', borderBottom: '1px solid #EBEEF5', color: '#606266' }}>{s.systemSku}</td>
                    <td style={{ padding: '10px 16px', borderBottom: '1px solid #EBEEF5' }}>{s.name}</td>
                    <td style={{ padding: '8px 16px', borderBottom: '1px solid #EBEEF5' }}>
                      <EInput
                        value={editingSkus[s.systemSku] !== undefined ? editingSkus[s.systemSku] : s.vendorSku}
                        onChange={v => setEditingSkus(p => ({ ...p, [s.systemSku]: v }))}
                        placeholder={s.vendorSku ? s.vendorSku : '尚未對照，請填入倉儲 SKU'}
                        style={{ borderColor: !s.vendorSku && !editingSkus[s.systemSku] ? '#E6A23C' : '#DCDFE6' }}
                      />
                    </td>
                    <td style={{ padding: '10px 16px', borderBottom: '1px solid #EBEEF5', color: '#909399', fontSize: 13 }}>{s.updated || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>

      <FixedBar lastSaved={lastSaved} onCancel={onBack} onSave={handleSave} saving={saving} />
    </div>
  );
}

// ─── LINE OA Screen ──────────────────────────────────────────────────────────
function LineOAScreen({ onBack }) {
  const { toasts, show } = useToast();
  const [enabled, setEnabled] = React.useState(false);
  const [form, setForm] = React.useState({ channelId: '', channelSecret: '', accessToken: '' });
  const [saving, setSaving] = React.useState(false);
  const [testing, setTesting] = React.useState(false);
  const [testResult, setTestResult] = React.useState(null);
  const [lastSaved, setLastSaved] = React.useState(null);
  const [dirty, setDirty] = React.useState(false);
  const [showLeaveDialog, setShowLeaveDialog] = React.useState(false);
  const [journeys, setJourneys] = React.useState({
    cart_recovery:     true,
    win_back_dormant:  false,
    win_back_lost:     false,
    post_purchase:     false,
    expiry_reminder:   true,
  });

  const JOURNEY_LIST = [
    { key: 'cart_recovery',    label: '購物車未結帳挽回',   desc: '加入購物車 N 小時未結帳，自動推播含個人化優惠券' },
    { key: 'win_back_dormant', label: '沉睡客喚醒',         desc: '會員 90 天未購買，推播專屬優惠' },
    { key: 'win_back_lost',    label: '流失客挽留',          desc: '高價值流失客（180 天未購）強力挽留推播' },
    { key: 'post_purchase',    label: '購後推薦再行銷',     desc: '訂單完成 N 天後推薦相關產品' },
    { key: 'expiry_reminder',  label: '點數/優惠券到期提醒', desc: '距到期 N 天前自動提醒推播' },
  ];

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setDirty(true); };
  const webhookUrl = 'https://yourstore.evomni.com/api/webhooks/lineoa/a3f9k2';

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false); setDirty(false);
      const now = new Date();
      setLastSaved(`${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,'0')}/${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`);
      show('設定已儲存', 'success');
    }, 900);
  };

  const handleTest = () => {
    if (!form.channelId || !form.accessToken) { show('請先填入 Channel ID 及 Channel Access Token', 'warning'); return; }
    setTesting(true); setTestResult(null);
    setTimeout(() => {
      setTesting(false);
      setTestResult({ success: true, message: '連線成功！LINE Messaging API 回應正常，頻道驗證通過。' });
    }, 1800);
  };

  return (
    <div>
      <ToastStack toasts={toasts} />

      <Dialog open={showLeaveDialog} title="您有未儲存的設定，確認要離開嗎？"
        confirmText="確認離開"
        onConfirm={() => { setShowLeaveDialog(false); onBack(); }}
        onCancel={() => setShowLeaveDialog(false)}>
        離開後您的修改將遺失。
      </Dialog>

      {/* Page Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, marginBottom: 8, color: '#909399' }}>
          <span onClick={() => dirty ? setShowLeaveDialog(true) : onBack()} style={{ cursor: 'pointer' }}>串接設定</span>
          <span>/</span>
          <span style={{ color: '#303133' }}>LINE Official Account</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 64, height: 64, background: '#E8F9E8', border: '1px solid #B7EBB7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#00B900', flexShrink: 0 }}>LINE</div>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>LINE Official Account</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <VendorTypeTag type="全自動" />
                <StatusBadge status={enabled ? '已啟用' : '未設定'} />
                <span style={{ fontSize: 11, color: '#9B59B6', background: '#F5EEFF', border: '1px solid #D8B4FE', padding: '1px 6px', borderRadius: 2 }}>進階電商包</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#606266' }}>
            <span>啟用串接</span>
            <Switch
              checked={enabled}
              onChange={v => {
                if (v && (!form.channelId || !form.accessToken)) { show('請先填入 Channel ID 及 Channel Access Token 後才能啟用', 'warning'); return; }
                setEnabled(v);
                show(v ? 'LINE OA 串接已啟用' : 'LINE OA 串接已停用', v ? 'success' : 'info');
              }}
            />
          </div>
        </div>
      </div>

      <Banner type="info">
        使用本功能需要 <strong>進階電商包</strong> 方案，並需事先申請 LINE Official Account 及開啟 Messaging API 功能。
        <a href="#" style={{ marginLeft: 8, color: '#409EFF', textDecoration: 'none' }}>申請 LINE OA ↗</a>
      </Banner>

      {/* Section 1: 廠商資訊 */}
      <SectionCard title="前置步驟" collapsible defaultOpen={false}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { step: 1, label: '登入 LINE Developers Console 並建立 Messaging API Channel', link: '前往 LINE Developers ↗' },
            { step: 2, label: '取得 Channel ID、Channel Secret 及 Channel Access Token' },
            { step: 3, label: '將 Evomni Webhook URL 貼入 LINE Developers Console 的「Webhook URL」欄位，並啟用 Webhook' },
            { step: 4, label: '填入下方 API 憑證並測試連線，確認後啟用串接' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 14 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#00B900', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{s.step}</div>
                {i < 3 && <div style={{ width: 2, flex: 1, background: '#DCDFE6', marginTop: 4, minHeight: 16 }} />}
              </div>
              <div style={{ paddingTop: 2, paddingBottom: i < 3 ? 14 : 0 }}>
                <div style={{ fontSize: 13, color: '#303133' }}>{s.label}</div>
                {s.link && <a href="#" style={{ fontSize: 12, color: '#409EFF', textDecoration: 'none', display: 'inline-block', marginTop: 4 }}>{s.link}</a>}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Section 2: API 憑證 */}
      <SectionCard title="API 憑證設定">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px', maxWidth: 720 }}>
          <FormField label="Channel ID" required helper="LINE Developers Console → Basic settings → Channel ID">
            <EInput value={form.channelId} onChange={v => set('channelId', v)} placeholder="請輸入 Channel ID" />
          </FormField>
          <FormField label="Channel Secret" required helper="儲存後顯示遮罩">
            <PasswordInput value={form.channelSecret} onChange={v => set('channelSecret', v)} placeholder="請輸入 Channel Secret" />
          </FormField>
        </div>
        <div style={{ maxWidth: 720, marginTop: 0 }}>
          <FormField label="Channel Access Token" required helper="LINE Developers Console → Messaging API → Issue → 儲存後顯示遮罩">
            <PasswordInput value={form.accessToken} onChange={v => set('accessToken', v)} placeholder="請輸入 Channel Access Token" />
          </FormField>
        </div>
      </SectionCard>

      {/* Section 3: Webhook */}
      <SectionCard title="Webhook 設定">
        <p style={{ fontSize: 13, color: '#606266', marginBottom: 12 }}>請將以下 URL 複製至 LINE Developers Console 的「Webhook URL」欄位，並確認「Use webhook」已開啟。</p>
        <WebhookUrlField url={webhookUrl} onCopy={() => show('已複製到剪貼簿', 'success')} />
        <p style={{ fontSize: 12, color: '#909399', marginTop: 8 }}>Webhook Token 如需重新產生，請至「Webhook 管理」頁面操作。</p>
      </SectionCard>

      {/* Section 4: 自動推播規則 */}
      <SectionCard title="自動推播規則管理">
        <p style={{ fontSize: 13, color: '#606266', marginBottom: 16 }}>設定各自動化行銷旅程是否啟用 LINE 推播通知。關閉後，該旅程仍會發送 Email，但不會觸發 LINE 推播。</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid #DCDFE6' }}>
          {JOURNEY_LIST.map((j, i) => (
            <div key={j.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: i < JOURNEY_LIST.length - 1 ? '1px solid #EBEEF5' : 'none', background: '#fff' }}>
              <div>
                <div style={{ fontSize: 14, color: '#303133', fontWeight: 500, marginBottom: 2 }}>{j.label}</div>
                <div style={{ fontSize: 12, color: '#909399' }}>{j.desc}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                <a href="#" style={{ fontSize: 12, color: '#409EFF', textDecoration: 'none', whiteSpace: 'nowrap' }}>訊息模板 ↗</a>
                <Switch
                  checked={journeys[j.key]}
                  onChange={v => { setJourneys(prev => ({ ...prev, [j.key]: v })); setDirty(true); show(`${j.label} LINE 推播已${v ? '啟用' : '停用'}`, v ? 'success' : 'info'); }}
                  disabled={!enabled}
                />
              </div>
            </div>
          ))}
        </div>
        {!enabled && <p style={{ fontSize: 12, color: '#E6A23C', marginTop: 8 }}>請先啟用 LINE OA 串接後，才能管理推播規則。</p>}
      </SectionCard>

      {/* Section 5: 連線測試 */}
      <SectionCard title="連線測試">
        <p style={{ fontSize: 13, color: '#606266', marginBottom: 12 }}>填入 API 憑證後，點擊下方按鈕測試與 LINE Messaging API 的連線狀態。</p>
        <button
          style={{ ...sharedBtns.plain, opacity: (!form.channelId || !form.accessToken || testing) ? 0.6 : 1 }}
          onClick={handleTest}
          disabled={!form.channelId || !form.accessToken || testing}
        >{testing ? '測試中…' : '測試連線'}</button>
        <ConnectionTestAlert result={testResult} />
      </SectionCard>

      <FixedBar lastSaved={lastSaved} onCancel={() => dirty ? setShowLeaveDialog(true) : onBack()} onSave={handleSave} saving={saving} />
    </div>
  );
}

Object.assign(window, { VendorBankScreen, VendorManualScreen, VendorSemiScreen, LineOAScreen });
