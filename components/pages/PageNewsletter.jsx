// ─── Icons ────────────────────────────────────────────────────────────────────
function IcoLink({ size = 14, color = '#909399' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M5.5 8.5l3-3" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M3 10.5a2.5 2.5 0 0 1 0-3.5L4.5 5.5A2.5 2.5 0 0 1 8 5.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <path d="M11 3.5a2.5 2.5 0 0 0-3.5 0L6 5a2.5 2.5 0 0 0 3.5 3.5L11 7" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" />
    </svg>
  );
}
function IcoDot({ color = '#67C23A', size = 10 }) {
  return <span style={{ display: 'inline-block', width: size, height: size, borderRadius: '50%', background: color, flexShrink: 0 }} />;
}
function IcoWarn({ size = 14, color = '#E6A23C' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M7 1.5L13 12.5H1L7 1.5Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
      <line x1="7" y1="5.5" x2="7" y2="8.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="7" cy="10.5" r="0.65" fill={color} />
    </svg>
  );
}
function IcoCheck({ size = 14, color = '#67C23A' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" stroke={color} strokeWidth="1.3" />
      <path d="M4.5 7l2 2 3-3" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IcoXCircle({ size = 14, color = '#F56C6C' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" stroke={color} strokeWidth="1.3" />
      <path d="M9.5 4.5l-5 5M4.5 4.5l5 5" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function IcoInfo({ size = 14, color = '#909399' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" stroke={color} strokeWidth="1.3" />
      <line x1="7" y1="6" x2="7" y2="10" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="7" cy="4.5" r="0.65" fill={color} />
    </svg>
  );
}
function IcoExternal({ size = 11 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 11 11" fill="none" style={{ verticalAlign: 'middle', marginLeft: 3, opacity: 0.65 }}>
      <path d="M5 2H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M8 1h3v3M11 1L6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IcoSpin({ size = 13, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" style={{ animation: 'evo-spin 0.7s linear infinite', flexShrink: 0 }}>
      <circle cx="7" cy="7" r="5.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeDasharray="22 8" />
    </svg>
  );
}
function IcoDoc({ size = 36, color = '#C0C4CC' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <rect x="6" y="4" width="24" height="28" stroke={color} strokeWidth="1.8" />
      <line x1="11" y1="12" x2="25" y2="12" stroke={color} strokeWidth="1.4" />
      <line x1="11" y1="17" x2="25" y2="17" stroke={color} strokeWidth="1.4" />
      <line x1="11" y1="22" x2="19" y2="22" stroke={color} strokeWidth="1.4" />
    </svg>
  );
}
function IcoCheckSuccess({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" stroke="#67C23A" strokeWidth="2" fill="#F0F9EB" />
      <path d="M14 24l7 7 13-14" stroke="#67C23A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── StatusBanner ─────────────────────────────────────────────────────────────
function NLStatusBanner({ status, connectedAt, action }) {
  const cfgs = {
    not_connected: { bg: '#F4F4F5', border: '#DCDFE6', icon: <IcoLink color="#909399" />,       text: '尚未與飛信電子報完成串接',                                                        color: '#606266' },
    connected:     { bg: '#F0FFF4', border: '#B7EB8F', icon: <IcoDot color="#67C23A" />,          text: `已與飛信電子報完成串接　串接時間：${connectedAt}`,                              color: '#52b788' },
    token_expired: { bg: '#FEF9EC', border: '#F5DAB1', icon: <IcoWarn color="#E6A23C" />,         text: 'Token 已失效，請重新設定 Token 才能使用匯出功能',                               color: '#E6A23C' },
    offline:       { bg: '#F4F4F5', border: '#DCDFE6', icon: <IcoWarn color="#909399" />,         text: '無法連線到飛信服務，建議稍後再試',                                              color: '#909399' },
  };
  const c = cfgs[status] || cfgs.not_connected;
  return (
    <div style={{ background: c.bg, border: `1px solid ${c.border}`, padding: '12px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: c.color }}>
      <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{c.icon}</span>
      <span style={{ flex: 1 }}>{c.text}</span>
      {action && <span style={{ flexShrink: 0 }}>{action}</span>}
    </div>
  );
}

// ─── AlertBox ─────────────────────────────────────────────────────────────────
function NLAlertBox({ type = 'info', children, closable, onClose, style: xStyle }) {
  const cfgs = {
    info:    { bg: '#EDF2FB', border: '#B3C6EE', icon: <IcoInfo color="#409EFF" /> },
    success: { bg: '#F0F9EB', border: '#C2E7B0', icon: <IcoCheck color="#67C23A" /> },
    warning: { bg: '#FDF6EC', border: '#F5DAB1', icon: <IcoWarn color="#E6A23C" /> },
    error:   { bg: '#FEF0F0', border: '#FBC4C4', icon: <IcoXCircle color="#F56C6C" /> },
  };
  const c = cfgs[type] || cfgs.info;
  return (
    <div style={{ background: c.bg, border: `1px solid ${c.border}`, padding: '12px 16px', marginBottom: 16, ...xStyle }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
        <span style={{ marginTop: 2, flexShrink: 0 }}>{c.icon}</span>
        <div style={{ flex: 1, fontSize: 14, color: '#303133', lineHeight: 1.75 }}>{children}</div>
        {closable && (
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#909399', fontSize: 18, lineHeight: 1, padding: 0, flexShrink: 0 }}>&times;</button>
        )}
      </div>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function NLCard({ title, children, style: xStyle }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #DCDFE6', padding: 20, borderRadius: 3, ...xStyle }}>
      {title && (
        <div style={{ fontSize: 15, fontWeight: 700, color: '#303133', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #DCDFE6' }}>{title}</div>
      )}
      {children}
    </div>
  );
}


// ─── ExportStatusTag ──────────────────────────────────────────────────────────
function ExportStatusTag({ status }) {
  const cfgs = {
    success:        { bg: '#F0F9EB', color: '#67C23A', border: '#C2E7B0', label: '成功' },
    partial_failed: { bg: '#FDF6EC', color: '#E6A23C', border: '#F5DAB1', label: '部分失敗' },
    failed:         { bg: '#FEF0F0', color: '#F56C6C', border: '#FBC4C4', label: '失敗' },
  };
  const c = cfgs[status] || cfgs.success;
  return (
    <span style={{ display: 'inline-block', padding: '2px 8px', fontSize: 12, color: c.color, background: c.bg, border: `1px solid ${c.border}`, borderRadius: 9999 }}>{c.label}</span>
  );
}


// ─── DemoNav ──────────────────────────────────────────────────────────────────
function NLDemoNav({ current, onChange }) {
  const items = [
    { id: 's1', label: 'S1 串接設定（未串接）' },
    { id: 's2', label: 'S2 串接設定（已串接）' },
    { id: 's3', label: 'S3 訂閱管理（匯出功能）' },
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

// ─── SubStatePicker (dev helper) ──────────────────────────────────────────────
function NLSubStatePicker({ label, options, current, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 6, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <span style={{ fontSize: 11, color: '#C0C4CC', whiteSpace: 'nowrap' }}>{label}</span>
      {options.map(o => (
        <button key={o.id} onClick={() => onChange(o.id)}
          style={{ height: 22, padding: '0 8px', background: current === o.id ? '#409EFF' : '#fff', color: current === o.id ? '#fff' : '#909399', border: `1px solid ${current === o.id ? '#409EFF' : '#DCDFE6'}`, borderRadius: 0, cursor: 'pointer', fontSize: 11, fontFamily: 'Noto Sans TC,sans-serif' }}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

// ─── StepsGuide (used in apply-success state) ─────────────────────────────────
function StepsGuide() {
  const steps = [
    { n: 1, text: '前往您的信箱，使用飛信寄出的帳號密碼登入飛信後台', link: '前往飛信後台登入' },
    { n: 2, text: '登入後，點擊右上角「帳號管理」→「API 管理」→「顯示 Token」' },
    { n: 3, text: '輸入密碼確認後，複製 Token 代碼' },
    { n: 4, text: '回到此頁，將 Token 貼入下方欄位' },
  ];
  return (
    <div style={{ margin: '20px 0' }}>
      <div style={{ fontSize: 13, color: '#606266', marginBottom: 14 }}>接下來請完成以下步驟取得 API Token：</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {steps.map(({ n, text, link }) => (
          <div key={n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ width: 22, height: 22, background: '#303133', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
              {n}
            </span>
            <div style={{ fontSize: 14, color: '#606266', lineHeight: 1.65 }}>
              {text}
              {link && (
                <>
                  <br />
                  <a href="https://www.flydove.net/login" target="_blank" style={{ display: 'inline-flex', alignItems: 'center', color: '#409EFF' }}>
                    {link}<IcoExternal />
                  </a>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── TokenInputBlock ──────────────────────────────────────────────────────────
function TokenInputBlock({ onSuccess }) {
  const [token, setToken] = React.useState('');
  const [verifying, setVerifying] = React.useState(false);
  const [fieldError, setFieldError] = React.useState('');
  const [apiError, setApiError] = React.useState(false);

  const handleVerify = () => {
    setApiError(false);
    if (!token.trim()) { setFieldError('請填入 API Token 才能進行驗證'); return; }
    if (token.trim().length < 20) { setFieldError('Token 格式異常，請確認是否完整複製'); return; }
    setFieldError('');
    setVerifying(true);
    if (token.trim().length >= 32) {
      setTimeout(() => { setVerifying(false); onSuccess(); }, 1500);
    } else {
      setTimeout(() => { setVerifying(false); setApiError(true); }, 1500);
    }
  };

  return (
    <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid #DCDFE6' }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: '#303133', marginBottom: 8 }}>貼入 API Token</div>
      <div style={{ fontSize: 13, color: '#909399', marginBottom: 10 }}>
        請從飛信後台「帳號管理 &gt; API 管理」取得您的 Token 代碼
        <span style={{ color: '#C0C4CC', marginLeft: 8 }}>（示範：貼入 32 字元以上任意文字即可驗證通過）</span>
      </div>
      <textarea
        value={token}
        onChange={e => { setToken(e.target.value); setFieldError(''); setApiError(false); }}
        placeholder="貼入從飛信後台複製的 API Token"
        rows={3}
        style={{ width: '100%', padding: '8px 12px', border: `1px solid ${fieldError ? '#F56C6C' : '#DCDFE6'}`, borderRadius: 0, fontSize: 14, resize: 'vertical', color: '#303133', outline: 'none', boxSizing: 'border-box', marginBottom: 4 }}
      />
      {fieldError && <div style={{ fontSize: 12, color: '#F56C6C', marginBottom: 10 }}>{fieldError}</div>}
      {!fieldError && <div style={{ height: 14, marginBottom: 10 }} />}

      {apiError && (
        <NLAlertBox type="error" style={{ marginBottom: 16 }}>
          <strong>Token 驗證失敗。</strong>請確認：<br />
          1. 是否完整複製了 Token（頭尾不可有空格）<br />
          2. Token 是否已過期（飛信 Token 需定期更新）<br />
          請重新取得 Token 後再試。
        </NLAlertBox>
      )}

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <EvoBtn variant="primary" loading={verifying} onClick={handleVerify}>
          {verifying ? '驗證中...' : '驗證並完成串接'}
        </EvoBtn>
      </div>
    </div>
  );
}

// ─── NLScreen1: 串接設定（未串接）────────────────────────────────────────────
function NLScreen1({ onConnected }) {
  const [applyState, setApplyState] = React.useState('initial');
  const [showUpgrade, setShowUpgrade] = React.useState(!(window.__evomni_isPro || false));

  React.useEffect(() => {
    const handler = e => setShowUpgrade(!e.detail.isPro);
    window.addEventListener('evomni:planchange', handler);
    return () => window.removeEventListener('evomni:planchange', handler);
  }, []);

  const handleApply = () => {
    setApplyState('applying');
    setTimeout(() => setApplyState('success'), 1800);
  };

  return (
    <div>
      <NLSubStatePicker
        label="申請狀態："
        options={[
          { id: 'initial',       label: '初始' },
          { id: 'success',       label: '申請成功' },
          { id: 'account_exists', label: '帳號已存在' },
          { id: 'failed',        label: '申請失敗' },
        ]}
        current={applyState}
        onChange={setApplyState}
      />

      <PageHeader
        title="飛信電子報串接設定"
        breadcrumbs={['全域設定', '電子報', '飛信電子報設定']}
      />

      {showUpgrade ? (
        <UpgradeLockBanner
          featureName="飛信電子報串接"
          valueProp="一鍵同步訂閱者名單，輕鬆發送大量電子報行銷（EDM）"
          onLearnMore={() => {}}
        />
      ) : (
        <NLCard>
          <NLStatusBanner status="not_connected" />

          <div style={{ fontSize: 14, color: '#606266', lineHeight: 1.8, marginBottom: 20 }}>
            飛信電子報是台灣專業的電子報發送（EDM）服務，適合大量、高頻率的電子報發送。
            串接後可將 Evomni 的訂閱者名單一鍵同步到飛信系統。
          </div>

          <NLAlertBox type="info" style={{ marginBottom: 20 }}>
            <ul style={{ paddingLeft: 16, margin: 0, lineHeight: 1.9 }}>
              <li>網站需已設定正式域名（非測試網域）才能申請飛信帳號</li>
              <li>飛信帳號費用由飛信電子報方案決定，與 Evomni 方案費用分開計費</li>
              <li>如有費用或使用問題，請直接聯繫飛信客服</li>
            </ul>
          </NLAlertBox>

          {applyState === 'initial' && (
            <EvoBtn variant="primary" size="lg" onClick={handleApply}>開始使用飛信電子報</EvoBtn>
          )}

          {applyState === 'applying' && (
            <EvoBtn variant="primary" size="lg" loading disabled>申請中，請稍候...</EvoBtn>
          )}

          {applyState === 'success' && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0 8px', gap: 10 }}>
                <IcoCheckSuccess size={52} />
                <div style={{ fontSize: 17, fontWeight: 700, color: '#303133' }}>飛信帳號申請成功！</div>
              </div>
              <StepsGuide />
              <TokenInputBlock onSuccess={onConnected} />
            </>
          )}

          {applyState === 'account_exists' && (
            <>
              <NLAlertBox type="warning">
                此網站的帳號在飛信系統中已存在。
                請直接前往飛信後台登入，取得 API Token 後貼入下方欄位即可完成串接。
                <span style={{ display: 'inline' }}>&nbsp;
                  <a href="https://www.flydove.net/login" target="_blank" style={{ display: 'inline-flex', alignItems: 'center', color: '#409EFF' }}>
                    前往飛信後台<IcoExternal />
                  </a>
                </span>
              </NLAlertBox>
              <TokenInputBlock onSuccess={onConnected} />
            </>
          )}

          {applyState === 'failed' && (
            <>
              <NLAlertBox type="error">
                帳號申請失敗（錯誤代碼：ERR_DOMAIN_NOT_VERIFIED）<br />
                可能原因：域名尚未生效、或服務暫時無法使用。<br />
                請稍後再試，或聯繫飛信客服：support@flydove.net
              </NLAlertBox>
              <EvoBtn variant="secondary" onClick={() => setApplyState('initial')}>重新嘗試</EvoBtn>
            </>
          )}
        </NLCard>
      )}
    </div>
  );
}

// ─── ExportLogRow ─────────────────────────────────────────────────────────────
function ExportLogRow({ row }) {
  const [expanded, setExpanded] = React.useState(false);
  const hasDetail = row.status !== 'success';
  return (
    <>
      <tr
        onMouseEnter={e => e.currentTarget.style.background = '#F5F7FA'}
        onMouseLeave={e => e.currentTarget.style.background = ''}
        style={{ borderBottom: '1px solid #F0F0F0', transition: 'background 0.1s' }}
      >
        <td style={{ padding: '10px 12px', color: '#606266', whiteSpace: 'nowrap', fontSize: 13 }}>{row.time}</td>
        <td style={{ padding: '10px 12px', color: '#303133', textAlign: 'right', fontSize: 13 }}>{row.count}</td>
        <td style={{ padding: '10px 12px' }}><ExportStatusTag status={row.status} /></td>
        <td style={{ padding: '10px 12px', color: '#606266', fontSize: 13 }}>{row.group}</td>
        <td style={{ padding: '10px 12px' }}>
          {hasDetail && (
            <EvoBtn variant="text" size="sm" onClick={() => setExpanded(v => !v)}>
              {expanded ? '收起' : '查看詳情'}
            </EvoBtn>
          )}
        </td>
      </tr>
      {expanded && hasDetail && (
        <tr style={{ background: '#FFFBF0' }}>
          <td colSpan={5} style={{ padding: '10px 20px 10px 44px', fontSize: 13, color: '#606266', borderBottom: '1px solid #F0F0F0' }}>
            失敗原因：電子郵件格式異常。失敗名單（共 {row.failedCount} 筆）：
            <ul style={{ margin: '6px 0 0 16px', lineHeight: 1.8 }}>
              <li>bad.email.com（格式不符）</li>
              <li>test@（網域缺失）</li>
              {row.failedCount > 2 && <li style={{ color: '#C0C4CC' }}>... 以及其他 {row.failedCount - 2} 筆</li>}
            </ul>
          </td>
        </tr>
      )}
    </>
  );
}

// ─── NLScreen2: 串接設定（已串接）────────────────────────────────────────────
function NLScreen2({ onDisconnected, show }) {
  const [bannerStatus, setBannerStatus] = React.useState('connected');
  const [showResetDialog, setShowResetDialog] = React.useState(false);
  const [showDisableDialog, setShowDisableDialog] = React.useState(false);
  const [disabling, setDisabling] = React.useState(false);
  const showToast = show || (() => {});

  const EXPORT_LOGS = [
    { time: '2026/05/14 10:30', count: 256, failedCount: 0,  status: 'success',        group: '2026-05-14 10:30 匯出' },
    { time: '2026/05/10 15:22', count: 230, failedCount: 26, status: 'partial_failed', group: '2026-05-10 15:22 匯出' },
    { time: '2026/05/05 09:15', count: 198, failedCount: 0,  status: 'success',        group: '2026-05-05 09:15 匯出' },
    { time: '2026/04/28 14:05', count: 0,   failedCount: 0,  status: 'failed',         group: '2026-04-28 14:05 匯出' },
    { time: '2026/04/20 11:40', count: 175, failedCount: 0,  status: 'success',        group: '2026-04-20 11:40 匯出' },
  ];

  const handleDisable = () => {
    setDisabling(true);
    setTimeout(() => {
      setDisabling(false);
      setShowDisableDialog(false);
      showToast('已停用飛信串接。如需重新啟用，請再次完成 Token 設定。', 'info');
      setTimeout(() => onDisconnected(), 1000);
    }, 1200);
  };

  const isTokenOk = bannerStatus === 'connected';

  return (
    <div>
      <NLSubStatePicker
        label="連線狀態："
        options={[
          { id: 'connected',     label: '連線正常' },
          { id: 'token_expired', label: 'Token 失效' },
          { id: 'offline',       label: '無法連線' },
        ]}
        current={bannerStatus}
        onChange={setBannerStatus}
      />

      <PageHeader
        title="飛信電子報串接設定"
        breadcrumbs={['全域設定', '電子報', '飛信電子報設定']}
      />

      <NLStatusBanner
        status={bannerStatus}
        connectedAt="2026/05/05 14:32"
        action={
          <EvoBtn variant="secondary" onClick={() => window.open('https://www.flydove.net/login', '_blank')}>
            前往飛信後台<IcoExternal size={11} />
          </EvoBtn>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <NLCard title="Token 管理">
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#303133' }}>API Token：</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, color: isTokenOk ? '#52b788' : '#F56C6C', marginLeft: 6 }}>
              {isTokenOk
                ? <><IcoCheck size={13} color="#52b788" /> 已設定（最後更新：2026/05/05）</>
                : <><IcoXCircle size={13} color="#F56C6C" /> Token 已失效，請重新設定</>
              }
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <EvoBtn variant="secondary" onClick={() => setShowResetDialog(true)}>重新設定 Token</EvoBtn>
            <EvoBtn variant="ghost" onClick={() => setShowDisableDialog(true)}>停用飛信串接</EvoBtn>
          </div>
        </NLCard>

        <NLCard title="使用說明">
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              '停用串接不會刪除您在飛信系統的帳號或名單',
              'Token 若過期，系統將在下次進入此頁時顯示警示',
              '飛信電子報發送費用請洽飛信官方客服',
            ].map((text, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, fontSize: 13, color: '#606266', lineHeight: 1.65 }}>
                <span style={{ marginTop: 2, flexShrink: 0 }}><IcoInfo size={13} /></span>
                {text}
              </li>
            ))}
          </ul>
        </NLCard>
      </div>

      <NLCard title="匯出紀錄">
        {EXPORT_LOGS.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 0', gap: 12 }}>
            <IcoDoc />
            <div style={{ fontSize: 15, fontWeight: 500, color: '#909399' }}>尚未有匯出記錄</div>
            <div style={{ fontSize: 13, color: '#C0C4CC', textAlign: 'center', maxWidth: 360 }}>
              點擊「訂閱管理」頁的「匯出至飛信」按鈕，將訂閱者名單同步至飛信電子報系統
            </div>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#F5F7FA', borderBottom: '1px solid #DCDFE6' }}>
                {['匯出時間', '匯出筆數', '狀態', '飛信群組名', '操作'].map((h, i) => (
                  <th key={i} style={{ padding: '10px 12px', textAlign: i === 1 ? 'right' : 'left', fontWeight: 700, color: '#303133', fontSize: 13, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EXPORT_LOGS.map((row, i) => <ExportLogRow key={i} row={row} />)}
            </tbody>
          </table>
        )}
      </NLCard>

      <Dialog
        open={showResetDialog}
        title="確認重新設定 Token"
        width={400}
        footer={<>
          <EvoBtn variant="secondary" onClick={() => setShowResetDialog(false)}>取消</EvoBtn>
          <EvoBtn variant="primary" onClick={() => { setShowResetDialog(false); onDisconnected(); }}>繼續重新設定</EvoBtn>
        </>}
      >
        重新設定 Token 將斷開目前的飛信串接。您需要重新貼入新的 Token 才能恢復使用匯出功能。
      </Dialog>

      <Dialog
        open={showDisableDialog}
        title="確認停用飛信串接"
        width={400}
        footer={<>
          <EvoBtn variant="secondary" onClick={() => setShowDisableDialog(false)}>取消</EvoBtn>
          <EvoBtn variant="danger" loading={disabling} onClick={handleDisable}>
            {disabling ? '停用中...' : '確認停用'}
          </EvoBtn>
        </>}
      >
        <p>停用後，「匯出至飛信」功能將無法使用。</p>
        <p style={{ marginTop: 8 }}>您在飛信系統的帳號與名單不受影響。</p>
      </Dialog>
    </div>
  );
}

// ─── NLScreen3: 訂閱管理（匯出功能）─────────────────────────────────────────
function NLScreen3({ show }) {
  const [exportResult, setExportResult] = React.useState('none');
  const [alertOpen, setAlertOpen] = React.useState(true);
  const [showExportDialog, setShowExportDialog] = React.useState(false);
  const [noSubscribers, setNoSubscribers] = React.useState(false);
  const showToast = show || (() => {});

  const SUBSCRIBERS = [
    { id: 1, name: '王小明', email: 'wang@example.com',  date: '2026/05/10', status: 'subscribed' },
    { id: 2, name: '林美美', email: 'lin@example.com',   date: '2026/05/08', status: 'subscribed' },
    { id: 3, name: '陳大偉', email: 'chen@example.com',  date: '2026/05/05', status: 'unsubscribed' },
    { id: 4, name: '李小花', email: 'lee@example.com',   date: '2026/05/01', status: 'subscribed' },
    { id: 5, name: '張志豪', email: 'chang@example.com', date: '2026/04/28', status: 'subscribed' },
  ];

  const triggerResult = (result) => {
    setAlertOpen(true);
    setExportResult(result);
    if (result === 'success') {
      showToast('已成功將 256 筆訂閱者匯出至飛信電子報系統。飛信後台中可使用名單：「2026-05-14 10:30 匯出」', 'success');
    }
  };

  const handleConfirmExport = () => {
    setShowExportDialog(false);
    showToast('正在匯出 256 筆名單至飛信，請稍候...', 'info');
    setTimeout(() => triggerResult('partial'), 1800);
  };

  const handleExportClick = () => {
    if (noSubscribers) {
      showToast('目前沒有有效訂閱者可匯出', 'warning');
      return;
    }
    setShowExportDialog(true);
  };

  return (
    <div>
      <NLSubStatePicker
        label="訂閱者："
        options={[
          { id: 'has',  label: '有訂閱者' },
          { id: 'zero', label: '0 筆（防呆）' },
        ]}
        current={noSubscribers ? 'zero' : 'has'}
        onChange={v => setNoSubscribers(v === 'zero')}
      />
      <NLSubStatePicker
        label="匯出結果："
        options={[
          { id: 'none',    label: '初始' },
          { id: 'success', label: '匯出成功' },
          { id: 'partial', label: '部分失敗' },
          { id: 'failed',  label: '全部失敗' },
        ]}
        current={exportResult}
        onChange={result => { setAlertOpen(true); if (result === 'success') { setExportResult('success'); showToast('已成功將 256 筆訂閱者匯出至飛信電子報系統。飛信後台中可使用名單：「2026-05-14 10:30 匯出」', 'success'); } else { setExportResult(result); } }}
      />

      <PageHeader
        title="電子報訂閱管理"
        breadcrumbs={['全域設定', '電子報', '訂閱管理']}
      />

      {alertOpen && exportResult === 'partial' && (
        <NLAlertBox type="warning" closable onClose={() => setAlertOpen(false)}>
          匯出部分完成：230 筆匯出成功，26 筆匯出失敗。失敗原因通常為電子郵件格式異常。
          &nbsp;<a href="#" onClick={e => e.preventDefault()} style={{ color: '#409EFF' }}>下載失敗名單 CSV</a>
        </NLAlertBox>
      )}
      {alertOpen && exportResult === 'failed' && (
        <NLAlertBox type="error" closable onClose={() => setAlertOpen(false)}>
          匯出失敗。可能原因：飛信 API Token 已過期或網路連線問題。
          請前往「飛信電子報設定」頁重新驗證 Token 後再試。
          &nbsp;<a href="#" onClick={e => e.preventDefault()} style={{ color: '#409EFF' }}>前往設定</a>
        </NLAlertBox>
      )}

      <div style={{ background: '#fff', border: '1px solid #DCDFE6', padding: '16px 20px', marginBottom: 16, borderRadius: 3 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>搜尋條件</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 14 }}>
          {[
            { label: '姓名', placeholder: '請輸入姓名關鍵字', type: 'text' },
            { label: '電子郵件', placeholder: '請輸入電子郵件', type: 'text' },
          ].map(({ label, placeholder, type }) => (
            <div key={label}>
              <div style={{ fontSize: 13, color: '#606266', marginBottom: 6 }}>{label}</div>
              <input type={type} placeholder={placeholder} style={{ width: '100%', height: 36, padding: '0 12px', border: '1px solid #DCDFE6', borderRadius: 0, fontSize: 14, fontFamily: 'Noto Sans TC,sans-serif', boxSizing: 'border-box', outline: 'none' }} />
            </div>
          ))}
          <div>
            <div style={{ fontSize: 13, color: '#606266', marginBottom: 6 }}>訂閱狀態</div>
            <select style={{ width: '100%', height: 36, padding: '0 12px', border: '1px solid #DCDFE6', borderRadius: 0, fontSize: 14, fontFamily: 'Noto Sans TC,sans-serif', background: '#fff', boxSizing: 'border-box', outline: 'none' }}>
              <option value="">全部</option>
              <option value="subscribed">已訂閱</option>
              <option value="unsubscribed">已取消訂閱</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <EvoBtn variant="secondary">清除</EvoBtn>
          <EvoBtn variant="primary">搜尋</EvoBtn>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <EvoBtn variant="primary">新增訂閱者</EvoBtn>
        <div style={{ display: 'flex', gap: 8 }}>
          <EvoBtn variant="secondary">匯出 CSV</EvoBtn>
          <EvoBtn variant="secondary" onClick={handleExportClick}>匯出至飛信</EvoBtn>
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #DCDFE6', borderRadius: 3 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#F5F7FA', borderBottom: '1px solid #DCDFE6' }}>
              <th style={{ padding: '10px 12px', width: 40 }}>
                <input type="checkbox" style={{ accentColor: '#409EFF' }} />
              </th>
              {['編號', '姓名', '電子郵件', '訂閱日期', '訂閱狀態', '操作'].map((h, i) => (
                <th key={i} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: '#303133', fontSize: 13 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SUBSCRIBERS.map(sub => {
              const isActive = sub.status === 'subscribed';
              return (
                <tr key={sub.id} style={{ borderBottom: '1px solid #F0F0F0', transition: 'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F5F7FA'}
                  onMouseLeave={e => e.currentTarget.style.background = ''}>
                  <td style={{ padding: '10px 12px' }}><input type="checkbox" style={{ accentColor: '#409EFF' }} /></td>
                  <td style={{ padding: '10px 12px', color: '#606266' }}>{sub.id}</td>
                  <td style={{ padding: '10px 12px', color: '#303133', fontWeight: 500 }}>{sub.name}</td>
                  <td style={{ padding: '10px 12px', color: '#606266' }}>{sub.email}</td>
                  <td style={{ padding: '10px 12px', color: '#606266', whiteSpace: 'nowrap' }}>{sub.date}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ display: 'inline-block', padding: '2px 8px', fontSize: 12, borderRadius: 9999, background: isActive ? '#F0F9EB' : '#F4F4F5', color: isActive ? '#67C23A' : '#909399', border: `1px solid ${isActive ? '#C2E7B0' : '#DCDFE6'}` }}>
                      {isActive ? '已訂閱' : '已取消訂閱'}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <EvoBtn variant="text" size="sm">編輯</EvoBtn>
                    <EvoBtn variant="text-danger" size="sm">刪除</EvoBtn>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #DCDFE6', fontSize: 13, color: '#606266' }}>
          <span>共 256 筆</span>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <EvoBtn variant="secondary" size="sm" disabled>&lt;</EvoBtn>
            {[1, 2, 3, '...', 26].map((p, i) => (
              <EvoBtn key={i} variant={p === 1 ? 'primary' : 'secondary'} size="sm">{p}</EvoBtn>
            ))}
            <EvoBtn variant="secondary" size="sm">&gt;</EvoBtn>
          </div>
        </div>
      </div>

      <Dialog
        open={showExportDialog}
        title="確認匯出"
        width={440}
        footer={<>
          <EvoBtn variant="secondary" onClick={() => setShowExportDialog(false)}>取消</EvoBtn>
          <EvoBtn variant="primary" onClick={handleConfirmExport}>確認匯出</EvoBtn>
        </>}
      >
        <p style={{ marginBottom: 8 }}>將匯出 256 筆有效訂閱者至飛信電子報系統。</p>
        <p style={{ color: '#606266' }}>
          在飛信系統中，此批名單將以「2026-05-14 10:30 匯出」命名儲存。
        </p>
      </Dialog>
    </div>
  );
}

// ─── PageNewsletter ───────────────────────────────────────────────────────────
function PageNewsletter({ currentPage, onNavigate, show }) {
  const [screen, setScreen] = React.useState('s1');
  const [connected, setConnected] = React.useState(false);

  const renderContent = () => {
    if (screen === 's1') {
      return connected
        ? <NLScreen2 onDisconnected={() => setConnected(false)} show={show} />
        : <NLScreen1 onConnected={() => { setConnected(true); setScreen('s2'); }} />;
    }
    if (screen === 's2') {
      return <NLScreen2 onDisconnected={() => { setConnected(false); setScreen('s1'); }} show={show} />;
    }
    if (screen === 's3') {
      return <NLScreen3 show={show} />;
    }
    return null;
  };

  return (
    <div>
      <NLDemoNav current={screen} onChange={s => { setScreen(s); setConnected(false); }} />
      {renderContent()}
    </div>
  );
}
