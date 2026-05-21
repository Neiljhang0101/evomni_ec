// Screens 6, 7, 8 — 電子發票設定 / Webhook 管理 / 定期定額設定

// ─── Screen 6: 電子發票設定 ──────────────────────────────────────────────
function InvoiceScreen({ onNavigate }) {
  const { toasts, show } = useToast();
  const [tab, setTab] = React.useState('ecpay');
  const [enabled, setEnabled] = React.useState(true);
  const [form, setForm] = React.useState({ merchantId: 'E2112233', hashKey: '', hashIV: '', env: 'sandbox', issueTiming: 'auto', codTiming: 'auto', donationCode: '' });
  const [saving, setSaving] = React.useState(false);
  const [lastSaved, setLastSaved] = React.useState('2026/05/10 09:30');
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      const now = new Date();
      setLastSaved(`${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,'0')}/${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`);
      show('電子發票設定已儲存', 'success');
    }, 800);
  };

  return (
    <div>
      <ToastStack toasts={toasts} />
      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#409EFF', marginBottom: 20 }}>電子發票設定</h2>

      <ETabs
        tabs={[
          { id: 'ecpay', label: '綠界科技' },
          { id: 'ezpay', label: 'ezPay', disabled: true, tag: '規格確認中' },
        ]}
        active={tab} onChange={setTab}
        style={{ marginBottom: 20 }}
      />

      {tab === 'ecpay' && (
        <>
          {/* Enable section */}
          <SectionCard title="帳號與憑證" extra={
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 13, color: '#606266' }}>啟用電子發票自動開立</span>
              <Switch checked={enabled} onChange={v => { setEnabled(v); show(v ? '電子發票自動開立已啟用' : '電子發票已停用', v ? 'success' : 'info'); }} />
            </div>
          }>
            {enabled && (
              <div style={{ background: '#ecf5ff', border: '1px solid #b3d8ff', borderRadius: 3, padding: '10px 16px', fontSize: 13, color: '#409EFF', marginBottom: 20 }}>
                啟用後，每筆訂單付款成功時系統自動呼叫綠界電子發票 API 開立發票，消費者將收到發票通知。
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px', maxWidth: 720, opacity: enabled ? 1 : 0.5 }}>
              <FormField label="MerchantID（發票帳號）" required helper="可使用金流帳號同一組，或向綠界申請獨立發票帳號">
                <EInput value={form.merchantId} onChange={v => set('merchantId', v)} placeholder="請輸入綠界特店編號" disabled={!enabled} />
              </FormField>
              <FormField label="HashKey" required>
                <PasswordInput value={form.hashKey} onChange={v => set('hashKey', v)} disabled={!enabled} />
              </FormField>
              <FormField label="HashIV" required>
                <PasswordInput value={form.hashIV} onChange={v => set('hashIV', v)} disabled={!enabled} />
              </FormField>
              <FormField label="環境" required>
                <RadioGroup value={form.env} onChange={v => set('env', v)} options={[{ value: 'sandbox', label: '測試環境' }, { value: 'live', label: '正式環境' }]} />
              </FormField>
            </div>
          </SectionCard>

          {/* Rules */}
          <SectionCard title="開立規則" extra={<span style={{ opacity: enabled ? 1 : 0.4, fontSize: 12, color: '#909399' }}>{enabled ? '' : '請先啟用電子發票'}</span>}>
            <div style={{ opacity: enabled ? 1 : 0.4, pointerEvents: enabled ? 'auto' : 'none' }}>
              <FormField label="開立時機" helper="決定何時自動觸發發票 API">
                <RadioGroup value={form.issueTiming} onChange={v => set('issueTiming', v)} options={[
                  { value: 'auto',   label: '付款成功立即開立（推薦）', desc: '付款 Webhook 驗簽成功後，非同步排入發票開立佇列' },
                  { value: 'manual', label: '商家手動觸發開立',          desc: '訂單詳情頁顯示「開立發票」按鈕，由商家手動操作' },
                ]} vertical />
              </FormField>
              <FormField label="貨到付款開立時機" style={{ marginTop: 8 }}>
                <RadioGroup value={form.codTiming} onChange={v => set('codTiming', v)} options={[
                  { value: 'auto',   label: '訂單狀態更新為「已送達」後自動開立' },
                  { value: 'manual', label: '商家手動開立' },
                ]} vertical />
              </FormField>
            </div>
          </SectionCard>

          {/* Donation */}
          <SectionCard title="捐贈設定">
            <div style={{ maxWidth: 400, opacity: enabled ? 1 : 0.4, pointerEvents: enabled ? 'auto' : 'none' }}>
              <FormField label="預設捐贈碼（愛心碼）" helper="消費者選擇捐贈發票時，預設捐贈至此愛心碼；留空則消費者自行輸入">
                <EInput value={form.donationCode} onChange={v => set('donationCode', v)} placeholder="請輸入愛心碼（選填）" />
              </FormField>
            </div>
          </SectionCard>

          <FixedBar lastSaved={lastSaved} onCancel={() => {}} onSave={handleSave} saving={saving} />
        </>
      )}
      {tab === 'ezpay' && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#909399' }}>
          <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'center' }}><svg width="36" height="36" viewBox="0 0 36 36" fill="none"><rect x="7" y="17" width="22" height="16" rx="2" stroke="#C0C4CC" strokeWidth="2"/><path d="M12 17v-5a6 6 0 0 1 12 0v5" stroke="#C0C4CC" strokeWidth="2" strokeLinecap="round"/></svg></div>
          <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 6 }}>ezPay 電子發票加費方案規格尚在確認中</div>
          <div style={{ fontSize: 13 }}>開放時將通知您。</div>
        </div>
      )}
    </div>
  );
}

// ─── Screen 7: Webhook 管理 ───────────────────────────────────────────────
const WEBHOOK_URLS = [
  { vendor: '綠界科技（金流）', type: '付款通知', url: 'https://yourstore.evomni.com/api/webhooks/payment/a3f9k2/ecpay', status: '連線異常', lastReceived: '2026/05/10 14:32' },
  { vendor: 'LINE Pay',        type: '付款通知', url: 'https://yourstore.evomni.com/api/webhooks/payment/a3f9k2/linepay', status: '正常', lastReceived: '2026/05/11 08:15' },
  { vendor: '綠界科技（物流）', type: '物流狀態', url: 'https://yourstore.evomni.com/api/webhooks/logistics/a3f9k2/ecpay', status: '正常', lastReceived: '2026/05/10 22:00' },
];

const WEBHOOK_LOGS = [
  { id: 1, time: '2026/05/11 08:15:33', vendor: 'LINE Pay',      type: '付款通知', status: 200, order: '#ORD-2841', ms: 312 },
  { id: 2, time: '2026/05/10 14:32:01', vendor: '綠界科技（金流）', type: '付款通知', status: 401, order: '#ORD-2835', ms: 85 },
  { id: 3, time: '2026/05/10 13:50:22', vendor: 'LINE Pay',      type: '付款通知', status: 200, order: '#ORD-2829', ms: 287 },
  { id: 4, time: '2026/05/09 19:04:11', vendor: '綠界科技（金流）', type: '付款通知', status: 400, order: '#ORD-2820', ms: 91 },
  { id: 5, time: '2026/05/09 11:22:09', vendor: '綠界科技（物流）', type: '物流狀態', status: 200, order: '#ORD-2810', ms: 198 },
  { id: 6, time: '2026/05/08 20:30:44', vendor: 'LINE Pay',      type: '付款通知', status: 200, order: '#ORD-2801', ms: 345 },
];

function WebhookScreen() {
  const { toasts, show } = useToast();
  const [tab, setTab] = React.useState('logs');
  const [filterVendor, setFilterVendor] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');
  const [drawer, setDrawer] = React.useState(null);
  const [notifyEnabled, setNotifyEnabled] = React.useState(false);
  const [notifyEmail, setNotifyEmail] = React.useState('');
  const [notifyCount, setNotifyCount] = React.useState(3);

  const logs = WEBHOOK_LOGS.filter(l => {
    if (filterVendor && l.vendor !== filterVendor) return false;
    if (filterStatus === 'success' && l.status >= 400) return false;
    if (filterStatus === 'error' && l.status < 400) return false;
    return true;
  });

  const vendorOptions = [...new Set(WEBHOOK_LOGS.map(l => l.vendor))].map(v => ({ value: v, label: v }));

  return (
    <div style={{ position: 'relative' }}>
      <ToastStack toasts={toasts} />

      {/* Drawer */}
      {drawer && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.3)' }} onClick={() => setDrawer(null)} />
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 600, background: '#fff', borderLeft: '1px solid #DCDFE6', overflow: 'auto' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #DCDFE6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>Webhook 請求詳情</span>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#909399', display: 'flex', alignItems: 'center' }} onClick={() => setDrawer(null)}><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><line x1="2" y1="2" x2="12" y2="12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><line x1="12" y1="2" x2="2" y2="12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg></button>
            </div>
            <div style={{ padding: 24 }}>
              {[['廠商', drawer.vendor], ['請求類型', drawer.type], ['時間', drawer.time], ['狀態碼', drawer.status], ['訂單號', drawer.order], ['耗時', `${drawer.ms} ms`]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', gap: 16, marginBottom: 14 }}>
                  <span style={{ width: 80, color: '#909399', fontSize: 13, flexShrink: 0 }}>{k}</span>
                  <span style={{ color: k === '狀態碼' ? (drawer.status < 400 ? '#67C23A' : '#F56C6C') : '#303133', fontWeight: k === '狀態碼' ? 600 : 400 }}>{v}</span>
                </div>
              ))}
              <div style={{ marginTop: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#606266', marginBottom: 8 }}>Request Body（前 1000 字元）</div>
                <pre style={{ background: '#F5F7FA', border: '1px solid #DCDFE6', borderRadius: 3, padding: 12, fontSize: 12, color: '#303133', overflow: 'auto', maxHeight: 200 }}>{`MerchantID=E2112233&MerchantTradeNo=${drawer.order?.replace('#ORD-','')}&RtnCode=1&RtnMsg=Succeeded&TradeNo=2024${drawer.id}0000001&TradeAmt=1200&PaymentDate=2026/05/11+08:15:33&PaymentType=Credit_CreditCard&CheckMacValue=A3F...`}</pre>
              </div>
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#606266', marginBottom: 8 }}>Response Body</div>
                <pre style={{ background: '#F5F7FA', border: '1px solid #DCDFE6', padding: 12, fontSize: 12, color: drawer.status < 400 ? '#67C23A' : '#F56C6C' }}>{drawer.status < 400 ? '1|OK' : 'Signature verification failed'}</pre>
              </div>
            </div>
          </div>
        </div>
      )}

      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#409EFF', marginBottom: 20 }}>Webhook 管理（訂單事件通知）</h2>

      <ETabs
        tabs={[{ id: 'urls', label: 'Webhook URL 清單' }, { id: 'logs', label: '請求記錄' }, { id: 'notify', label: '失敗通知設定' }]}
        active={tab} onChange={setTab}
        style={{ marginBottom: 20 }}
      />

      {/* Tab 1: URL List */}
      {tab === 'urls' && (
        <div style={{ background: '#fff', border: '1px solid #DCDFE6', borderRadius: 3 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead><tr style={{ background: '#F5F7FA' }}>{['廠商名稱','串接類型','Webhook URL','狀態','最後收到'].map(h => <th key={h} style={{ padding: '10px 16px', textAlign: 'left', color: '#606266', fontWeight: 500, fontSize: 13, borderBottom: '1px solid #DCDFE6' }}>{h}</th>)}</tr></thead>
            <tbody>
              {WEBHOOK_URLS.map((w, i) => (
                <tr key={i}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #EBEEF5' }}>{w.vendor}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #EBEEF5', color: '#606266' }}>{w.type}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #EBEEF5' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#606266', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 340 }}>{w.url}</span>
                      <button style={{ ...sharedBtns.text, height: 36, fontSize: 12 }} onClick={() => { try { navigator.clipboard.writeText(w.url); } catch(e) {} show('已複製到剪貼簿', 'success'); }}>複製</button>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #EBEEF5' }}><StatusBadge status={w.status} /></td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #EBEEF5', color: '#909399', fontSize: 13 }}>{w.lastReceived}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Logs */}
      {tab === 'logs' && (
        <>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontSize: 12, color: '#606266', marginBottom: 4 }}>廠商</div>
              <ESelect value={filterVendor} onChange={setFilterVendor} placeholder="全部廠商" options={vendorOptions} width={180} />
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#606266', marginBottom: 4 }}>狀態</div>
              <ESelect value={filterStatus} onChange={setFilterStatus} placeholder="全部狀態" options={[{ value: 'success', label: '成功' }, { value: 'error', label: '失敗' }]} width={120} />
            </div>
            <button style={sharedBtns.plain} onClick={() => { setFilterVendor(''); setFilterStatus(''); }}>清除篩選</button>
          </div>
          <div style={{ background: '#fff', border: '1px solid #DCDFE6', borderRadius: 3 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead><tr style={{ background: '#F5F7FA' }}>{['時間','廠商','請求類型','狀態碼','訂單號','耗時','操作'].map(h => <th key={h} style={{ padding: '10px 16px', textAlign: 'left', color: '#606266', fontWeight: 500, fontSize: 13, borderBottom: '1px solid #DCDFE6' }}>{h}</th>)}</tr></thead>
              <tbody>
                {logs.map(l => (
                  <tr key={l.id} style={{ background: l.status >= 400 ? '#FEF0F0' : '#fff' }}>
                    <td style={{ padding: '10px 16px', borderBottom: '1px solid #EBEEF5', fontSize: 13, color: '#606266' }}>{l.time}</td>
                    <td style={{ padding: '10px 16px', borderBottom: '1px solid #EBEEF5' }}>{l.vendor}</td>
                    <td style={{ padding: '10px 16px', borderBottom: '1px solid #EBEEF5', color: '#606266' }}>{l.type}</td>
                    <td style={{ padding: '10px 16px', borderBottom: '1px solid #EBEEF5', color: l.status < 400 ? '#67C23A' : '#F56C6C', fontWeight: 600 }}>{l.status}</td>
                    <td style={{ padding: '10px 16px', borderBottom: '1px solid #EBEEF5', color: '#409EFF' }}>{l.order}</td>
                    <td style={{ padding: '10px 16px', borderBottom: '1px solid #EBEEF5', color: '#909399', fontSize: 13 }}>{l.ms} ms</td>
                    <td style={{ padding: '8px 16px', borderBottom: '1px solid #EBEEF5' }}><button style={{ ...sharedBtns.text, height: 36, fontSize: 13 }} onClick={() => setDrawer(l)}>查看詳情</button></td>
                  </tr>
                ))}
                {logs.length === 0 && <tr><td colSpan={7} style={{ textAlign: 'center', padding: '40px 0', color: '#909399' }}>找不到符合篩選條件的記錄</td></tr>}
              </tbody>
            </table>
          </div>
          <div style={{ fontSize: 12, color: '#909399', marginTop: 12 }}>Webhook 記錄保留最近 90 天，超過自動清除。</div>
        </>
      )}

      {/* Tab 3: Notify */}
      {tab === 'notify' && (
        <div style={{ background: '#fff', border: '1px solid #DCDFE6', borderRadius: 3, padding: 24, maxWidth: 560 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <Switch checked={notifyEnabled} onChange={setNotifyEnabled} />
            <span style={{ fontSize: 14, color: '#303133' }}>啟用 Webhook 失敗時寄送 Email 通知</span>
          </div>
          {notifyEnabled && (
            <>
              <FormField label="通知信箱" helper="多個信箱請換行分隔">
                <textarea value={notifyEmail} onChange={e => setNotifyEmail(e.target.value)} placeholder="請輸入 Email" style={{ width: '100%', height: 80, padding: '8px 10px', border: '1px solid #DCDFE6', borderRadius: 0, fontSize: 14, fontFamily: 'Noto Sans TC,sans-serif', resize: 'vertical', outline: 'none' }} />
              </FormField>
              <FormField label="連續失敗幾次時通知">
                <NumberInput value={notifyCount} onChange={setNotifyCount} min={1} max={10} />
              </FormField>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button style={sharedBtns.primary} onClick={() => show('通知設定已儲存', 'success')}>儲存設定</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Screen 8: 定期定額設定 ──────────────────────────────────────────────
function RecurringScreen({ onBack }) {
  const { toasts, show } = useToast();
  const [enabled, setEnabled] = React.useState(false);
  const [form, setForm] = React.useState({ cycle: 'monthly', day: '5', retries: '3', onFail: 'pause', notifyOnFail: true });
  const [saving, setSaving] = React.useState(false);
  const [lastSaved, setLastSaved] = React.useState(null);
  const [isAdvanced, setIsAdvanced] = React.useState(window.__evomni_isPro || false);
  React.useEffect(() => {
    const handler = e => setIsAdvanced(e.detail.isPro);
    window.addEventListener('evomni:planchange', handler);
    return () => window.removeEventListener('evomni:planchange', handler);
  }, []);
  const isEcpayEnabled = true;
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      const now = new Date();
      setLastSaved(`${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,'0')}/${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`);
      show('定期定額設定已儲存', 'success');
    }, 800);
  };

  const dayOptions = Array.from({ length: 28 }, (_, i) => ({ value: String(i + 1), label: `${i + 1} 日` }));

  return (
    <div>
      <ToastStack toasts={toasts} />
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 6, fontSize: 13, color: '#909399', marginBottom: 8 }}>
          <span onClick={onBack} style={{ cursor: 'pointer' }}>串接設定</span><span>/</span><span style={{ color: '#303133' }}>綠界科技－定期定額扣款</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>定期定額設定（綠界科技）</h1>
            <div style={{ fontSize: 13, color: '#909399' }}>設定信用卡循環扣款規則，適用於訂閱型產品</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#606266' }}>
            <span>啟用定期定額</span>
            <Switch checked={enabled} onChange={v => { if (!isAdvanced || !isEcpayEnabled) return; setEnabled(v); show(v ? '定期定額扣款已啟用' : '定期定額已停用', v ? 'success' : 'info'); }} disabled={!isAdvanced || !isEcpayEnabled} />
          </div>
        </div>
      </div>

      {!isEcpayEnabled && <Banner type="lock" cta="前往設定" onCta={onBack}>此功能需先啟用「綠界科技」一般金流後才可設定。</Banner>}
      <UpgradeLockBanner
        featureName="定期定額扣款"
        valueProp="讓顧客設定自動週期付款，適合訂閱制產品或會員費收取"
        onLearnMore={() => show('即將跳轉至方案管理頁', 'info')}
      />

      <div style={{ background: '#FEF0E6', border: '1px solid #fcd5a8', borderRadius: 3, padding: '10px 16px', fontSize: 14, color: '#E6A23C', marginBottom: 16 }}>
        啟用定期定額扣款前，請確認已向綠界科技申請「定期定額扣款」加值服務，此服務需額外向廠商申請且可能有附加費用。
      </div>

      <div style={{ opacity: isAdvanced && isEcpayEnabled ? 1 : 0.45, pointerEvents: isAdvanced && isEcpayEnabled ? 'auto' : 'none' }}>
        <SectionCard title="扣款規則">
          <div style={{ maxWidth: 600 }}>
            <FormField label="扣款週期" required helper="設定消費者訂閱後的扣款頻率">
              <RadioGroup value={form.cycle} onChange={v => set('cycle', v)} options={[
                { value: 'monthly',   label: '每月' },
                { value: 'quarterly', label: '每季' },
                { value: 'biannual',  label: '每半年' },
                { value: 'yearly',    label: '每年' },
              ]} />
            </FormField>
            <FormField label="扣款日" required helper="不提供 29–31 日，以確保每月均有對應的扣款日（2 月最多 28 天）">
              <ESelect value={form.day} onChange={v => set('day', v)} options={dayOptions} width={120} />
            </FormField>
          </div>
        </SectionCard>

        <SectionCard title="付款失敗處理">
          <div style={{ maxWidth: 600 }}>
            <FormField label="失敗重試次數" helper="付款失敗後，系統將在 24 小時後自動重試（0 = 不重試）">
              <NumberInput value={form.retries} onChange={v => set('retries', v)} min={0} max={5} />
            </FormField>
            <FormField label="失敗後處理方式">
              <RadioGroup value={form.onFail} onChange={v => set('onFail', v)} options={[
                { value: 'pause',  label: '暫停訂閱', desc: '保留訂單，等待消費者更新付款方式後繼續' },
                { value: 'cancel', label: '自動取消訂閱', desc: '付款失敗後立即取消，無法復原' },
              ]} vertical />
            </FormField>
            {form.onFail === 'cancel' && (
              <div style={{ background: '#FDF6EC', border: '1px solid #f5dab1', borderRadius: 3, padding: '10px 16px', fontSize: 13, color: '#E6A23C', marginTop: -12, marginBottom: 16 }}>
                選擇此選項後，消費者若付款失敗將自動取消訂閱，此操作無法復原，請謹慎選擇。
              </div>
            )}
            <FormField label=" ">
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, cursor: 'pointer' }}>
                <input type="checkbox" checked={form.notifyOnFail} onChange={e => set('notifyOnFail', e.target.checked)} />
                <span>付款失敗時，自動發送 Email 通知消費者更新付款方式</span>
              </label>
            </FormField>
          </div>
        </SectionCard>
      </div>

      <FixedBar lastSaved={lastSaved} onCancel={onBack} onSave={handleSave} saving={saving} />
    </div>
  );
}

Object.assign(window, { InvoiceScreen, WebhookScreen, RecurringScreen });
