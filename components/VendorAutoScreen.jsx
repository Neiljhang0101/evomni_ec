// Screen 2 — 全自動廠商設定頁 (ECPay / LINE Pay / 藍新 / AFTEE)

function VendorAutoScreen({ vendor, onBack }) {
  const { toasts, show } = useToast();
  // 串接異常＝Webhook 連續失敗（串接仍維持啟用）；連線測試失敗＝連線測試未通過、Webhook 正常（多為設定中未啟用）
  const [enabled, setEnabled] = React.useState(vendor.status === '已啟用' || vendor.status === '串接異常');
  const [form, setForm] = React.useState({ merchantId: '', hashKey: '', hashIV: '', env: 'sandbox', atm_days: 3 });
  const [payments, setPayments] = React.useState(['credit']);
  const [testResult, setTestResult] = React.useState(null);
  const [testing, setTesting] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [lastSaved, setLastSaved] = React.useState(null);
  const [showEnvDialog, setShowEnvDialog] = React.useState(false);
  const [showLeaveDialog, setShowLeaveDialog] = React.useState(false);
  const [dirty, setDirty] = React.useState(false);

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setDirty(true); };

  const handleEnvChange = (v) => {
    if (v === 'live') setShowEnvDialog(true);
    else set('env', 'sandbox');
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setDirty(false);
      const now = new Date();
      setLastSaved(`${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,'0')}/${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`);
      show('設定已儲存', 'success');
    }, 900);
  };

  const handleTest = () => {
    if (!form.merchantId) { show('請先填入 API 憑證後才能測試連線', 'warning'); return; }
    setTesting(true);
    setTestResult(null);
    setTimeout(() => {
      setTesting(false);
      // Simulate result based on vendor
      if (vendor.status === '連線測試失敗' || vendor.status === '串接異常') {
        setTestResult({ success: false, message: '連線失敗：商店代號或金鑰錯誤（401），請確認填入正確的憑證。' });
      } else {
        setTestResult({ success: true, message: '連線成功！廠商 API 回應正常，憑證驗證通過。' });
      }
    }, 1800);
  };

  const isECPay = vendor.id === 'ecpay';
  const isLINEPay = vendor.id === 'linepay';
  const isAFTEE = vendor.id === 'aftee';
  const webhookUrl = `https://yourstore.evomni.com/api/webhooks/payment/a3f9k2/${vendor.id}`;

  const paymentOptions = isECPay ? [
    { value: 'credit', label: '信用卡一次付清' },
    { value: 'credit_inst', label: '信用卡分期（3/6/12 期）' },
    { value: 'atm', label: 'ATM 虛擬帳號' },
    { value: 'cvs_code', label: '超商代碼' },
    { value: 'cvs_barcode', label: '超商條碼' },
  ] : vendor.id === 'newebpay' ? [
    { value: 'credit', label: '信用卡' },
    { value: 'atm', label: 'ATM 轉帳' },
  ] : [];

  return (
    <div>
      <ToastStack toasts={toasts} />

      {/* ── Dialogs ── */}
      <Dialog open={showEnvDialog} title="確認切換至正式模式"
        confirmText="確認切換" confirmDanger
        onConfirm={() => { set('env', 'live'); setShowEnvDialog(false); show('已切換至正式模式', 'warning'); }}
        onCancel={() => setShowEnvDialog(false)}>
        切換後，所有新訂單的付款將進行真實扣款。請確認您已完成測試並取得正式環境的 API 憑證。
      </Dialog>
      <Dialog open={showLeaveDialog} title="您有未儲存的設定，確認要離開嗎？"
        confirmText="確認離開"
        onConfirm={() => { setShowLeaveDialog(false); onBack(); }}
        onCancel={() => setShowLeaveDialog(false)}>
        離開後您的修改將遺失。
      </Dialog>

      {/* ── Page Header ── */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, marginBottom: 8, color: '#909399' }}>
          <span onClick={() => dirty ? setShowLeaveDialog(true) : onBack()} style={{ cursor: 'pointer' }}>串接設定</span>
          <span>/</span>
          <span style={{ color: '#303133' }}>{vendor.name}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 64, height: 64, background: '#F5F7FA', border: '1px solid #DCDFE6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: vendor.color }}>{vendor.initial}</div>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>{vendor.name}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <VendorTypeTag type={vendor.type} />
                <StatusBadge status={vendor.status === '連線測試失敗' ? '連線測試失敗' : (vendor.status === '串接異常' && enabled ? '串接異常' : (enabled ? '已啟用' : '已停用'))} />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#606266' }}>
            <span>啟用串接</span>
            <Switch checked={enabled} onChange={v => { if (v && !form.merchantId) { show('請先填入 API 憑證後才能啟用', 'warning'); return; } setEnabled(v); show(v ? `${vendor.name}已啟用` : `${vendor.name}已停用`, v ? 'success' : 'info'); }} />
          </div>
        </div>
      </div>

      {/* ── Sandbox Warning Banner ── */}
      {form.env === 'sandbox' && <Banner type="warning">目前為沙箱測試環境，所有交易不會進行實際收款。</Banner>}

      {/* ── AFTEE Info Banner ── */}
      {isAFTEE && <Banner type="info">AFTEE 先享後付需先向廠商申請審核，審核通過（約 1-3 工作天）後廠商將寄送 API Token。</Banner>}

      {/* ── LINE Pay Info Banner ── */}
      {isLINEPay && <Banner type="info">LINE Pay 採兩段式授權，消費者點擊付款後需跳轉至 LINE 確認畫面才完成付款。</Banner>}

      {/* ── Section 1: 廠商資訊 ── */}
      <SectionCard title="廠商資訊" collapsible>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <a href="#" style={{ color: '#409EFF', fontSize: 14, textDecoration: 'none' }}>前往{vendor.name}申請商家帳號 ↗</a>
          <a href="#" style={{ color: '#409EFF', fontSize: 14, textDecoration: 'none' }}>查看 API 串接文件 ↗</a>
        </div>
      </SectionCard>

      {/* ── Section 2: API 憑證 ── */}
      <SectionCard title="API 憑證設定">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px', maxWidth: 720 }}>
          <FormField label={isLINEPay ? 'Channel ID' : isAFTEE ? 'Shop ID' : '特店編號（MerchantID）'} required helper={isLINEPay ? '由 LINE Pay 後台取得，格式為純數字' : '向廠商申請後取得，格式為英數字最多 10 碼'}>
            <EInput value={form.merchantId} onChange={v => set('merchantId', v)} placeholder={isLINEPay ? '請輸入 Channel ID' : '請輸入特店編號'} />
          </FormField>
          <FormField label={isLINEPay ? 'Channel Secret Key' : isAFTEE ? 'API Key' : 'HashKey'} required helper="儲存後顯示遮罩">
            <PasswordInput value={form.hashKey} onChange={v => set('hashKey', v)} />
          </FormField>
          {!isLINEPay && !isAFTEE && (
            <FormField label="HashIV" required helper="儲存後顯示遮罩">
              <PasswordInput value={form.hashIV} onChange={v => set('hashIV', v)} />
            </FormField>
          )}
          {isAFTEE && (
            <FormField label="最低訂單金額" helper="AFTEE 通常有最低使用金額限制">
              <NumberInput value={form.minAmount} onChange={v => set('minAmount', v)} min={0} />
            </FormField>
          )}
        </div>

        <FormField label="環境" required style={{ maxWidth: 400, marginTop: 4 }}>
          <RadioGroup value={form.env} onChange={handleEnvChange} options={[
            { value: 'sandbox', label: '測試模式（沙箱）', desc: '不會真實扣款，適合驗證憑證與付款流程' },
            { value: 'live',    label: '正式模式（Live）',  desc: '實際收款，確認所有設定正確後再啟用' },
          ]} vertical />
        </FormField>

        {paymentOptions.length > 0 && (
          <FormField label="啟用付款方式">
            <CheckboxGroup value={payments} onChange={setPayments} options={paymentOptions} />
          </FormField>
        )}

        {payments.includes('atm') && isECPay && (
          <FormField label="ATM 繳費期限（天）" helper="消費者需在此天數內完成 ATM 轉帳，超過自動取消（1–60 天）">
            <NumberInput value={form.atm_days} onChange={v => set('atm_days', v)} min={1} max={60} />
          </FormField>
        )}
      </SectionCard>

      {/* ── Section 3: Webhook ── */}
      <SectionCard title="Webhook 設定">
        <p style={{ fontSize: 13, color: '#606266', marginBottom: 12 }}>請將以下 URL 複製至{vendor.name}後台的「通知網址（ReturnURL）」欄位，系統將透過此網址接收付款結果通知。</p>
        <WebhookUrlField url={webhookUrl} onCopy={() => show('已複製到剪貼簿', 'success')} />
        <p style={{ fontSize: 12, color: '#909399', marginTop: 8, lineHeight: 1.7 }}>
          網址中的 <code style={{ background: '#F5F7FA', padding: '1px 5px', borderRadius: 2, color: '#606266', fontFamily: 'monospace' }}>a3f9k2</code> 為本商店專屬的識別碼（唯一識別碼／UUID），可避免網址被猜測或冒用，請勿外流。<br />
          Webhook Token 如需重新產生，請至「Webhook 管理」頁面操作。
        </p>
      </SectionCard>

      {/* ── Section 4: 連線測試 ── */}
      <SectionCard title="連線測試">
        {/* 串接異常（Webhook 連續失敗）且連線測試也失敗時，於測試按鈕上方顯示持久 Alert（PRD §6.2 方案 c） */}
        {vendor.status === '串接異常' && (
          <Banner type="error">此廠商目前為「串接異常」（Webhook 連續失敗）；偵測到上次連線測試也未通過，請一併確認 API 憑證是否正確，避免修復 Webhook 後仍有連線問題未處理。</Banner>
        )}
        <p style={{ fontSize: 13, color: '#606266', marginBottom: 12 }}>填入 API 憑證後，點擊下方按鈕測試與廠商的連線狀態。每分鐘最多測試 5 次。</p>
        <button
          style={{ ...sharedBtns.plain, opacity: (!form.merchantId || testing) ? 0.6 : 1 }}
          onClick={handleTest}
          disabled={!form.merchantId || testing}
        >{testing ? '測試中…' : '測試連線'}</button>
        <ConnectionTestAlert result={testResult} />
      </SectionCard>

      <FixedBar lastSaved={lastSaved} onCancel={() => dirty ? setShowLeaveDialog(true) : onBack()} onSave={handleSave} saving={saving} />
    </div>
  );
}

Object.assign(window, { VendorAutoScreen });
