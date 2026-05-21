// PageAdvanced — 電商進階設定 Hub

// ─── Icons ───────────────────────────────────────────────────────────────────

const LineLogoWhite = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path fill="white" d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.065-.022.133-.031.2-.031.211 0 .39.09.51.25l2.444 3.317V8.108c0-.345.282-.63.63-.63.346 0 .627.285.627.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.141h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629"/>
  </svg>
);

const GoogleLogo = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const FacebookLogo = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const EyeIcon = ({ open = true }) => open ? (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#909399" strokeWidth="2" strokeLinecap="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
) : (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#909399" strokeWidth="2" strokeLinecap="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const AdvInfoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#909399" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);

// ─── Shared styles ───────────────────────────────────────────────────────────

const advInput = {
  width: '100%', height: 40, padding: '0 12px',
  border: '1px solid #DCDFE6', borderRadius: 0,
  fontSize: 14, fontFamily: 'Noto Sans TC, sans-serif',
  outline: 'none', color: '#303133', background: '#fff',
};

const advBtn = {
  primary: { borderRadius: 0, cursor: 'pointer', fontSize: 14, fontFamily: 'Noto Sans TC, sans-serif', background: '#303133', color: '#fff', height: 36, padding: '0 20px', border: '1px solid #303133' },
  plain:   { borderRadius: 0, cursor: 'pointer', fontSize: 14, fontFamily: 'Noto Sans TC, sans-serif', background: '#fff', color: '#303133', height: 36, padding: '0 16px', border: '1px solid #DCDFE6' },
  ghost:   { borderRadius: 0, cursor: 'pointer', fontSize: 14, fontFamily: 'Noto Sans TC, sans-serif', background: '#fff', color: '#409EFF', height: 36, padding: '0 16px', border: '1px solid #409EFF' },
};

// ─── Shared sub-components ───────────────────────────────────────────────────

function AdvToggle({ checked, onChange, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div onClick={() => onChange(!checked)} style={{ width: 44, height: 22, borderRadius: 9999, background: checked ? '#409EFF' : '#C0C4CC', position: 'relative', cursor: 'pointer', transition: 'background .2s', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 2, left: checked ? 24 : 2, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left .2s', boxShadow: '0 1px 3px rgba(0,0,0,.2)' }} />
      </div>
      {label && <span style={{ fontSize: 14, color: checked ? '#303133' : '#909399' }}>{label}</span>}
    </div>
  );
}

function AdvSaveBar({ onSave, saving }) {
  return (
    <div style={{ borderTop: '1px solid #DCDFE6', padding: '16px 24px', display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
      <button onClick={onSave} disabled={saving} style={{ ...advBtn.primary, opacity: saving ? 0.7 : 1 }}>
        {saving ? '儲存中...' : '儲存設定'}
      </button>
    </div>
  );
}

function AdvSectionCard({ title, children }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #DCDFE6', borderRadius: 3, marginBottom: 16 }}>
      <div style={{ padding: '14px 20px', borderBottom: '1px solid #DCDFE6', fontSize: 15, fontWeight: 700 }}>{title}</div>
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  );
}

function AdvProBadge() {
  return <span style={{ display: 'inline-block', fontSize: 11, color: '#9B59B6', background: '#F5EEFF', border: '1px solid #D8B4FE', padding: '1px 7px', borderRadius: 2, marginLeft: 8, verticalAlign: 'middle' }}>進階電商包</span>;
}

// ─── Tab 1：第三方登入設定 ───────────────────────────────────────────────────

function ThirdPartyLoginSettings({ show }) {
  const [platforms, setPlatforms] = React.useState({
    LINE:     { enabled: true,  callback: 'https://shop.example.com/auth/line/callback' },
    Google:   { enabled: false, callback: 'https://shop.example.com/auth/google/callback' },
    Facebook: { enabled: true,  callback: 'https://shop.example.com/auth/facebook/callback' },
  });
  const [formValues, setFormValues] = React.useState({
    LINE:     { clientId: 'LINE-CHANNEL-12345', secret: '' },
    Google:   { clientId: '',                    secret: '' },
    Facebook: { clientId: 'FB-APP-98765',       secret: '' },
  });
  const [showSecrets, setShowSecrets] = React.useState({ LINE: false, Google: false, Facebook: false });
  const [loginMode, setLoginMode] = React.useState('both');
  const [testing, setTesting] = React.useState(null);
  const [saving, setSaving] = React.useState(false);

  const updateFormValue = (name, key, value) => {
    setFormValues(prev => ({ ...prev, [name]: { ...prev[name], [key]: value } }));
  };

  const platformConfig = {
    LINE: {
      badge: <div style={{ width: 32, height: 32, background: '#06C755', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><LineLogoWhite size={16} /></div>,
      consoleName: 'LINE Developers Console',
      fields: [
        { key: 'clientId', label: 'Channel ID',     placeholder: '請輸入 Channel ID',     type: 'text',     tooltip: 'LINE Login Channel ID，可在 LINE Developers Console 取得。在 LINE Developers / Google Cloud Console 建立應用程式後，可在應用程式詳情頁找到' },
        { key: 'secret',   label: 'Channel Secret', placeholder: '請輸入 Channel Secret', type: 'password', tooltip: '與 Client ID 在相同位置，請勿公開此代碼' },
      ],
      callbackLabel: 'Callback URL',
      callbackHint: '唯讀。這個網址需填入 LINE/Google 開發者後台，讓登入成功後能正確跳回你的網站。請在 LINE Developers Console 填入此網址',
    },
    Google: {
      badge: <div style={{ width: 32, height: 32, background: '#fff', border: '1px solid #DCDFE6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><GoogleLogo size={18} /></div>,
      consoleName: 'Google Cloud Console',
      fields: [
        { key: 'clientId', label: '用戶端識別碼（Client ID）',     placeholder: '請輸入 Client ID',     type: 'text',     tooltip: '在 Google Cloud Console > OAuth 2.0 用戶端識別碼中取得。在 LINE Developers / Google Cloud Console 建立應用程式後，可在應用程式詳情頁找到' },
        { key: 'secret',   label: '用戶端密碼（Client Secret）', placeholder: '請輸入 Client Secret', type: 'password', tooltip: '與 Client ID 在相同位置，請勿公開此代碼' },
      ],
      callbackLabel: '授權重新導向網址（Callback URL）',
      callbackHint: '唯讀。這個網址需填入 LINE/Google 開發者後台，讓登入成功後能正確跳回你的網站。請在 Google Cloud Console 填入此網址',
    },
    Facebook: {
      badge: <div style={{ width: 32, height: 32, background: '#1877F2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FacebookLogo size={16} /></div>,
      consoleName: 'Meta Developers',
      fields: [
        { key: 'clientId', label: '應用程式識別碼（App ID）',   placeholder: '請輸入 App ID',     type: 'text',     tooltip: '在 Meta Developers > 應用程式設定中取得' },
        { key: 'secret',   label: '應用程式密鑰（App Secret）', placeholder: '請輸入 App Secret', type: 'password', tooltip: '請妥善保管，不要分享給他人' },
      ],
      callbackLabel: '有效的 OAuth 重新導向網址（Callback URL）',
      callbackHint: '唯讀。請在 Meta Developers 應用程式設定中填入此網址',
    },
  };

  const handleTest = (name) => {
    setTesting(name);
    setTimeout(() => {
      setTesting(null);
      formValues[name].clientId
        ? show('連線測試成功，憑證有效', 'success')
        : show('連線失敗：憑證未填寫，請檢查後重試', 'error');
    }, 1500);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => { setSaving(false); show('設定已儲存', 'success'); }, 800);
  };

  return (
    <div>
      <div style={{ padding: '20px 24px 4px' }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>第三方登入設定</div>
        <div style={{ fontSize: 13, color: '#606266', lineHeight: 1.7 }}>
          設定後消費者可在您的商店使用社群帳號快速登入。各平台憑證需在對應的開發者後台申請後填入。
        </div>
      </div>

      <div style={{ padding: '16px 24px 0' }}>
        {['LINE', 'Google', 'Facebook'].map(name => {
          const p = platforms[name];
          const cfg = platformConfig[name];
          return (
            <div key={name} style={{ border: '1px solid #DCDFE6', borderRadius: 3, marginBottom: 16, opacity: p.enabled ? 1 : 0.65, transition: 'opacity .2s' }}>
              <div style={{ padding: '12px 20px', borderBottom: '1px solid #DCDFE6', display: 'flex', alignItems: 'center', gap: 12 }}>
                {cfg.badge}
                <span style={{ fontSize: 14, fontWeight: 700, flex: 1 }}>{name} Login</span>
                <span style={{ fontSize: 13, color: '#606266', marginRight: 8 }}>{p.enabled ? '啟用' : '停用'}</span>
                <div onClick={() => setPlatforms(prev => ({ ...prev, [name]: { ...prev[name], enabled: !prev[name].enabled } }))}
                  style={{ width: 44, height: 22, borderRadius: 9999, background: p.enabled ? '#409EFF' : '#C0C4CC', position: 'relative', cursor: 'pointer', transition: 'background .2s', flexShrink: 0 }}>
                  <div style={{ position: 'absolute', top: 2, left: p.enabled ? 24 : 2, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left .2s', boxShadow: '0 1px 3px rgba(0,0,0,.2)' }} />
                </div>
              </div>
              <div style={{ padding: '16px 20px' }}>
                <div style={{ fontSize: 13, color: '#606266', marginBottom: 14 }}>
                  前往 {cfg.consoleName} 申請憑證：
                  <span style={{ color: '#409EFF', cursor: 'pointer', marginLeft: 6 }}>前往 {cfg.consoleName} ↗</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 14 }}>
                  {cfg.fields.map(field => (
                    <div key={field.key}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
                        <label style={{ fontSize: 13, color: '#606266', fontWeight: 500 }}>{field.label}</label>
                        <span title={field.tooltip} style={{ cursor: 'help', display: 'flex', alignItems: 'center' }}><AdvInfoIcon /></span>
                      </div>
                      <div style={{ position: 'relative' }}>
                        <input
                          type={field.type === 'password' && !showSecrets[name] ? 'password' : 'text'}
                          placeholder={field.placeholder}
                          value={formValues[name][field.key]}
                          onChange={e => updateFormValue(name, field.key, e.target.value)}
                          style={advInput}
                        />
                        {field.type === 'password' && (
                          <button onClick={() => setShowSecrets(prev => ({ ...prev, [name]: !prev[name] }))}
                            style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
                            <EyeIcon open={showSecrets[name]} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 13, color: '#606266', fontWeight: 500, marginBottom: 6 }}>{cfg.callbackLabel}</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input readOnly value={p.callback} style={{ ...advInput, background: '#F5F7FA', color: '#909399', flex: 1 }} />
                    <button onClick={() => show('已複製', 'success')} style={advBtn.plain}>複製</button>
                  </div>
                  <div style={{ fontSize: 12, color: '#909399', marginTop: 4 }}>{cfg.callbackHint}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={() => handleTest(name)} disabled={!!testing} style={{ ...advBtn.plain, opacity: testing === name ? 0.7 : 1 }}>
                    {testing === name ? '測試中...' : '測試連線'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        <div style={{ border: '1px solid #DCDFE6', borderRadius: 3, marginBottom: 16 }}>
          <div style={{ padding: '12px 20px', borderBottom: '1px solid #DCDFE6', fontSize: 14, fontWeight: 700 }}>前台登入模式</div>
          <div style={{ padding: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { id: 'both',        label: '同時顯示 Email 登入和社群帳號登入（預設）' },
                { id: 'social-only', label: '僅顯示社群帳號登入（關閉 Email 密碼登入）' },
              ].map(opt => (
                <label key={opt.id} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14 }}>
                  <input type="radio" name="loginMode" value={opt.id} checked={loginMode === opt.id} onChange={() => setLoginMode(opt.id)} />
                  {opt.label}
                </label>
              ))}
            </div>
            {loginMode === 'social-only' && (
              <div style={{ background: '#fdf6ec', border: '1px solid #f5dab1', borderRadius: 3, padding: '10px 14px', marginTop: 14, fontSize: 13, color: '#E6A23C', lineHeight: 1.6 }}>
                關閉 Email 登入後，若消費者沒有社群帳號將無法登入。請確認此設定符合您的客群需求。
              </div>
            )}
          </div>
        </div>
      </div>

      <AdvSaveBar onSave={handleSave} saving={saving} />
    </div>
  );
}

// ─── Tab 2：LINE OA 設定 ─────────────────────────────────────────────────────

function LineOASettings({ show }) {
  const [enabled, setEnabled] = React.useState(false);
  const [form, setForm] = React.useState({ channelId: '', channelSecret: '', accessToken: '' });
  const [showSecret, setShowSecret] = React.useState(false);
  const [showToken, setShowToken] = React.useState(false);
  const [testing, setTesting] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const webhookUrl = 'https://shop.example.com/webhook/line-oa/evomni';

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleTest = () => {
    setTesting(true);
    setTimeout(() => {
      setTesting(false);
      form.channelId && form.accessToken
        ? show('LINE OA 連線測試成功', 'success')
        : show('連線失敗：請先填寫 Channel ID 及 Access Token', 'error');
    }, 1500);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => { setSaving(false); show('LINE OA 設定已儲存', 'success'); }, 800);
  };

  return (
    <div>
      <div style={{ padding: '20px 24px 16px' }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>LINE OA 設定</div>
        <div style={{ fontSize: 13, color: '#606266', lineHeight: 1.7 }}>
          串接 LINE Official Account 後，系統可透過 LINE 發送訂單通知、行銷推播及自動化旅程訊息。
        </div>
      </div>

      <div style={{ padding: '0 24px' }}>
        <AdvSectionCard title="啟用 LINE OA 整合">
          <AdvToggle checked={enabled} onChange={setEnabled} label={enabled ? '已啟用' : '已停用'} />
        </AdvSectionCard>

        <div style={{ opacity: enabled ? 1 : 0.5, pointerEvents: enabled ? 'auto' : 'none', transition: 'opacity .2s' }}>
          <AdvSectionCard title="頻道憑證">
            <div style={{ display: 'grid', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#606266', fontWeight: 500, marginBottom: 6 }}>
                  Channel ID
                  <span title="LINE Developers Console 中的 Channel ID" style={{ marginLeft: 4, cursor: 'help', display: 'inline-flex', verticalAlign: 'middle' }}><AdvInfoIcon /></span>
                </label>
                <input value={form.channelId} onChange={e => set('channelId', e.target.value)} placeholder="請輸入 Channel ID" style={advInput} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#606266', fontWeight: 500, marginBottom: 6 }}>Channel Secret</label>
                <div style={{ position: 'relative' }}>
                  <input type={showSecret ? 'text' : 'password'} value={form.channelSecret} onChange={e => set('channelSecret', e.target.value)} placeholder="請輸入 Channel Secret" style={advInput} />
                  <button onClick={() => setShowSecret(v => !v)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
                    <EyeIcon open={showSecret} />
                  </button>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#606266', fontWeight: 500, marginBottom: 6 }}>
                  Channel Access Token
                  <span title="長效存取權杖（Long-lived channel access token）" style={{ marginLeft: 4, cursor: 'help', display: 'inline-flex', verticalAlign: 'middle' }}><AdvInfoIcon /></span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input type={showToken ? 'text' : 'password'} value={form.accessToken} onChange={e => set('accessToken', e.target.value)} placeholder="請輸入 Channel Access Token" style={advInput} />
                  <button onClick={() => setShowToken(v => !v)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
                    <EyeIcon open={showToken} />
                  </button>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={handleTest} disabled={testing} style={{ ...advBtn.plain, opacity: testing ? 0.7 : 1 }}>
                  {testing ? '測試中...' : '測試連線'}
                </button>
              </div>
            </div>
          </AdvSectionCard>

          <AdvSectionCard title="Webhook 設定">
            <div style={{ fontSize: 13, color: '#606266', marginBottom: 12, lineHeight: 1.7 }}>
              請將以下 Webhook URL 填入 LINE Developers Console 的「Messaging API」頻道設定中，並開啟「使用 Webhook」。
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <input readOnly value={webhookUrl} style={{ ...advInput, background: '#F5F7FA', color: '#909399', flex: 1 }} />
              <button onClick={() => show('已複製', 'success')} style={advBtn.plain}>複製</button>
            </div>
            <div style={{ fontSize: 12, color: '#909399' }}>此 URL 為唯讀，系統自動產生。</div>
          </AdvSectionCard>
        </div>
      </div>

      <AdvSaveBar onSave={handleSave} saving={saving} />
    </div>
  );
}

// ─── Tab 3：購物車逾時設定 ───────────────────────────────────────────────────

function CartTimeoutSettings({ show }) {
  const [enabled, setEnabled] = React.useState(true);
  const [minutes, setMinutes] = React.useState('60');
  const [saving, setSaving] = React.useState(false);

  const OPTIONS = [
    { value: '15',  label: '15 分鐘' },
    { value: '30',  label: '30 分鐘' },
    { value: '60',  label: '60 分鐘（預設）' },
    { value: '120', label: '120 分鐘（2 小時）' },
    { value: '240', label: '240 分鐘（4 小時）' },
    { value: '0',   label: '不限時（不建議）' },
  ];

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => { setSaving(false); show('購物車逾時設定已儲存', 'success'); }, 800);
  };

  return (
    <div>
      <div style={{ padding: '20px 24px 16px' }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>購物車逾時設定</div>
        <div style={{ fontSize: 13, color: '#606266', lineHeight: 1.7 }}>
          設定消費者購物車的產品保留時間。超過時限後，購物車內的產品庫存將自動釋放。
        </div>
      </div>

      <div style={{ padding: '0 24px' }}>
        <AdvSectionCard title="啟用購物車逾時機制">
          <AdvToggle checked={enabled} onChange={setEnabled} label={enabled ? '已啟用（超時自動釋放庫存）' : '已停用（購物車產品永久保留）'} />
          {!enabled && (
            <div style={{ background: '#fdf6ec', border: '1px solid #f5dab1', borderRadius: 3, padding: '10px 14px', marginTop: 14, fontSize: 13, color: '#E6A23C', lineHeight: 1.6 }}>
              停用逾時機制後，購物車產品將無限期佔用庫存，可能導致其他顧客無法購買。建議謹慎評估。
            </div>
          )}
        </AdvSectionCard>

        <div style={{ opacity: enabled ? 1 : 0.5, pointerEvents: enabled ? 'auto' : 'none', transition: 'opacity .2s' }}>
          <AdvSectionCard title="逾時時間">
            <div style={{ maxWidth: 280 }}>
              <label style={{ display: 'block', fontSize: 13, color: '#606266', fontWeight: 500, marginBottom: 8 }}>產品加入購物車後保留時間</label>
              <select value={minutes} onChange={e => setMinutes(e.target.value)}
                style={{ ...advInput, cursor: 'pointer', appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\'%3E%3Cpath d=\'M1 1l5 5 5-5\' stroke=\'%23909399\' stroke-width=\'1.5\' fill=\'none\' stroke-linecap=\'round\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', paddingRight: 36 }}>
                {OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div style={{ fontSize: 12, color: '#909399', marginTop: 10, lineHeight: 1.7 }}>
              計時從產品加入購物車時開始。消費者完成結帳前若超過此時間，購物車將自動清空並釋放庫存。
            </div>
          </AdvSectionCard>
        </div>
      </div>

      <AdvSaveBar onSave={handleSave} saving={saving} />
    </div>
  );
}

// ─── Tab 4：庫存警示門檻 ─────────────────────────────────────────────────────

function StockAlertSettings({ show }) {
  const [enabled, setEnabled] = React.useState(true);
  const [threshold, setThreshold] = React.useState('5');
  const [notifyEmail, setNotifyEmail] = React.useState('admin@example.com');
  const [saving, setSaving] = React.useState(false);

  const handleSave = () => {
    if (!notifyEmail.trim()) { show('請填寫通知信箱', 'error'); return; }
    setSaving(true);
    setTimeout(() => { setSaving(false); show('庫存警示設定已儲存', 'success'); }, 800);
  };

  return (
    <div>
      <div style={{ padding: '20px 24px 16px' }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>庫存警示門檻設定</div>
        <div style={{ fontSize: 13, color: '#606266', lineHeight: 1.7 }}>
          當產品庫存低於設定門檻時，系統自動發送 Email 通知，避免產品缺貨而未即時補貨。
        </div>
      </div>

      <div style={{ padding: '0 24px' }}>
        <AdvSectionCard title="啟用庫存警示">
          <AdvToggle checked={enabled} onChange={setEnabled} label={enabled ? '已啟用' : '已停用'} />
        </AdvSectionCard>

        <div style={{ opacity: enabled ? 1 : 0.5, pointerEvents: enabled ? 'auto' : 'none', transition: 'opacity .2s' }}>
          <AdvSectionCard title="警示門檻與通知設定">
            <div style={{ display: 'grid', gap: 20 }}>
              <div style={{ maxWidth: 280 }}>
                <label style={{ display: 'block', fontSize: 13, color: '#606266', fontWeight: 500, marginBottom: 8 }}>庫存低於此數量時發出警示（件）</label>
                <input
                  type="number" min="1" max="9999"
                  value={threshold}
                  onChange={e => setThreshold(e.target.value)}
                  style={{ ...advInput, width: 120 }}
                />
                <div style={{ fontSize: 12, color: '#909399', marginTop: 6 }}>每件產品規格（規格品項）各自計算，低於門檻即觸發通知。</div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#606266', fontWeight: 500, marginBottom: 8 }}>警示通知信箱</label>
                <input
                  type="email"
                  value={notifyEmail}
                  onChange={e => setNotifyEmail(e.target.value)}
                  placeholder="請輸入接收警示的 Email"
                  style={{ ...advInput, maxWidth: 360 }}
                />
                <div style={{ fontSize: 12, color: '#909399', marginTop: 6 }}>多個信箱請以逗號分隔，例如：a@example.com, b@example.com</div>
              </div>
            </div>
          </AdvSectionCard>
        </div>
      </div>

      <AdvSaveBar onSave={handleSave} saving={saving} />
    </div>
  );
}

// ─── Tab 5：會員驗證設定 ─────────────────────────────────────────────────────

function MemberVerificationSettings({ show }) {
  const [emailVerify, setEmailVerify] = React.useState(true);
  const [smsOtp, setSmsOtp] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => { setSaving(false); show('會員驗證設定已儲存', 'success'); }, 800);
  };

  return (
    <div>
      <div style={{ padding: '20px 24px 16px' }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>會員驗證設定</div>
        <div style={{ fontSize: 13, color: '#606266', lineHeight: 1.7 }}>
          設定消費者註冊後的驗證方式，確保帳號真實有效，降低假帳號風險。
        </div>
      </div>

      <div style={{ padding: '0 24px' }}>
        <AdvSectionCard title="Email 驗證">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Email 驗證信</div>
              <div style={{ fontSize: 13, color: '#606266', lineHeight: 1.7 }}>
                消費者以 Email 註冊後，系統自動寄出驗證信。未驗證帳號將無法完成結帳。
              </div>
            </div>
            <AdvToggle checked={emailVerify} onChange={setEmailVerify} />
          </div>
          {emailVerify && (
            <div style={{ marginTop: 16, padding: '12px 16px', background: '#F5F7FA', border: '1px solid #DCDFE6', borderRadius: 3, fontSize: 13, color: '#606266', lineHeight: 1.7 }}>
              驗證信將由系統信件範本發送。如需自訂信件內容，請至「全域設定 &gt; 電子報 &gt; 系統信件」調整。
            </div>
          )}
        </AdvSectionCard>

        <AdvSectionCard title={<span>簡訊驗證碼（行動電話 OTP）<AdvProBadge /></span>}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>手機簡訊驗證碼</div>
              <div style={{ fontSize: 13, color: '#606266', lineHeight: 1.7 }}>
                消費者填寫手機號碼後，系統發送一次性驗證碼（驗證碼在效期內有效）。需升級至進階電商包並完成簡訊供應商設定方可使用。
              </div>
            </div>
            <AdvToggle checked={smsOtp} onChange={setSmsOtp} />
          </div>
          {smsOtp && (
            <div style={{ marginTop: 16, display: 'grid', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#606266', fontWeight: 500, marginBottom: 6 }}>驗證碼有效時間（分鐘）</label>
                <input type="number" defaultValue="5" min="1" max="30" style={{ ...advInput, width: 100 }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#606266', fontWeight: 500, marginBottom: 6 }}>同一手機號碼每日最多發送次數</label>
                <input type="number" defaultValue="5" min="1" max="20" style={{ ...advInput, width: 100 }} />
              </div>
            </div>
          )}
        </AdvSectionCard>
      </div>

      <AdvSaveBar onSave={handleSave} saving={saving} />
    </div>
  );
}

// ─── Hub 主元件 ──────────────────────────────────────────────────────────────

const ADVANCED_TABS = [
  { id: 'gs-third-party-login',    label: '第三方登入' },
  { id: 'line-oa',                 label: 'LINE OA' },
  { id: 'gs-cart-timeout',         label: '購物車逾時' },
  { id: 'gs-stock-alert',          label: '庫存警示門檻' },
  { id: 'gs-member-verification',  label: '會員驗證' },
];

function PageAdvanced({ currentPage, onNavigate, show }) {
  const showToast = show || (() => {});
  const activeTab = ADVANCED_TABS.find(t => t.id === currentPage)?.id || 'gs-third-party-login';

  const handleTabClick = (tabId) => {
    onNavigate(tabId);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'gs-third-party-login':   return <ThirdPartyLoginSettings show={showToast} />;
      case 'line-oa':                return <LineOASettings show={showToast} />;
      case 'gs-cart-timeout':        return <CartTimeoutSettings show={showToast} />;
      case 'gs-stock-alert':         return <StockAlertSettings show={showToast} />;
      case 'gs-member-verification': return <MemberVerificationSettings show={showToast} />;
      default: return <ThirdPartyLoginSettings show={showToast} />;
    }
  };

  return (
    <React.Fragment>
    <PageHeader title="電商進階設定" />
    <div style={{ display: 'flex', gap: 0, minHeight: 'calc(100vh - 96px)' }}>
      <div style={{ width: 168, flexShrink: 0, background: '#fff', border: '1px solid #DCDFE6', borderRight: 'none', borderRadius: '3px 0 0 3px', paddingTop: 8 }}>
        {ADVANCED_TABS.map(t => (
          <div key={t.id} onClick={() => handleTabClick(t.id)}
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
