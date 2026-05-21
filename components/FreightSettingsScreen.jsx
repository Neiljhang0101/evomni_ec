// FreightSettingsScreen — 溫層運費設定 & 重量運費設定
// Both panels are self-contained; navigation is handled by the outer App left-nav

// ─── Local helpers ────────────────────────────────────────────────────────────

function NTInput({ value, onChange, placeholder, disabled }) {
  return (
    <div style={{ display: 'flex' }}>
      <span style={{ height: 40, padding: '0 10px', background: '#F5F7FA', border: '1px solid #DCDFE6', borderRight: 'none', display: 'flex', alignItems: 'center', fontSize: 13, color: '#909399', flexShrink: 0 }}>NT$</span>
      <input type="number" min={0} value={value} onChange={e => onChange?.(e.target.value)} placeholder={placeholder} disabled={disabled}
        style={{ width: '100%', height: 40, padding: '0 10px', border: '1px solid #DCDFE6', borderRadius: 0, fontSize: 14, outline: 'none', background: disabled ? '#F5F7FA' : '#fff', fontFamily: 'Noto Sans TC,sans-serif', color: '#303133' }} />
    </div>
  );
}

function FSTooltip({ content }) {
  const [show, setShow] = React.useState(false);
  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', marginLeft: 6, verticalAlign: 'middle' }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#C0C4CC', color: '#fff', fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'help', fontWeight: 700 }}>i</span>
      {show && (
        <div style={{ position: 'absolute', left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: 8, background: '#303133', color: '#fff', borderRadius: 4, padding: '10px 14px', fontSize: 12, width: 280, lineHeight: 1.6, zIndex: 1000, pointerEvents: 'none' }}>
          {content}
        </div>
      )}
    </span>
  );
}

function TempFields({ type, enabled, form, onForm }) {
  const isFrozen = type === 'frozen';
  return (
    <div>
      {isFrozen && enabled && (
        <div style={{ background: '#FDF6EC', border: '1px solid #f5dab1', padding: '10px 14px', fontSize: 13, color: '#8B6914', marginBottom: 16, lineHeight: 1.5 }}>
          冷凍配送費用通常高於冷藏，建議設定較高的基礎運費以反映實際物流成本。
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px', opacity: enabled ? 1 : 0.55 }}>
        <FormField label="本島基礎運費" required helper="消費者選擇本島地址時的配送費。">
          <NTInput value={form.islandBase} onChange={v => onForm({ ...form, islandBase: v })} placeholder={isFrozen ? '例：200' : '例：150'} disabled={!enabled} />
        </FormField>
        <FormField label="離島基礎運費" required helper="消費者選擇離島地址（澎湖、金門、馬祖）時的配送費。">
          <NTInput value={form.remoteBase} onChange={v => onForm({ ...form, remoteBase: v })} placeholder={isFrozen ? '例：350' : '例：250'} disabled={!enabled} />
        </FormField>
        <FormField label="本島免運門檻" helper="訂單金額達此金額時，本島運費免收。填 0 代表不設免運。">
          <NTInput value={form.islandFree} onChange={v => onForm({ ...form, islandFree: v })} placeholder="例：1500" disabled={!enabled} />
        </FormField>
        <FormField label="離島免運門檻" helper="訂單金額達此金額時，離島運費免收。填 0 代表不設免運。">
          <NTInput value={form.remoteFree} onChange={v => onForm({ ...form, remoteFree: v })} placeholder="例：2500" disabled={!enabled} />
        </FormField>
      </div>
      <FormField label="前台說明文字" helper={`選填。顯示在前台結帳頁的運費說明區。最多 50 字（已輸入 ${(form.customText || '').length} 字）。`}>
        <input type="text" value={form.customText || ''}
          onChange={e => e.target.value.length <= 50 && onForm({ ...form, customText: e.target.value })}
          placeholder={`例：${isFrozen ? '冷凍' : '冷藏'}產品採低溫宅配，運費 NT$${isFrozen ? '200' : '150'} 起`}
          disabled={!enabled}
          style={{ width: '100%', height: 40, padding: '0 10px', border: '1px solid #DCDFE6', borderRadius: 0, fontSize: 14, outline: 'none', background: enabled ? '#fff' : '#F5F7FA', fontFamily: 'Noto Sans TC,sans-serif', opacity: enabled ? 1 : 0.55 }} />
      </FormField>
    </div>
  );
}

// ─── 溫層運費設定 Panel ────────────────────────────────────────────────────────

function TempRulesPanel() {
  const { toasts, show } = useToast();
  const emptyForm = { islandBase: '', remoteBase: '', islandFree: '', remoteFree: '', customText: '' };
  const [coldRefEnabled, setColdRefEnabled] = React.useState(false);
  const [coldFrzEnabled, setColdFrzEnabled] = React.useState(false);
  const [coldRefForm, setColdRefForm]       = React.useState(emptyForm);
  const [coldFrzForm, setColdFrzForm]       = React.useState(emptyForm);
  const [saving, setSaving]                 = React.useState(false);
  const [lastSaved, setLastSaved]           = React.useState(null);
  const [showCancel, setShowCancel]         = React.useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      const now = new Date();
      setLastSaved(`${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,'0')}/${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`);
      show('溫層運費設定已儲存，將套用至所有新訂單', 'success');
    }, 1200);
  };

  return (
    <div>
      <ToastStack toasts={toasts} />
      <div style={{ padding: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#409EFF', marginBottom: 20 }}>溫層運費設定</h2>

        <p style={{ fontSize: 13, color: '#909399', lineHeight: 1.6, marginBottom: 24, padding: '10px 14px', background: '#F5F7FA', borderLeft: '3px solid #DCDFE6' }}>
          設定不同溫層產品的運費規則。結帳時，系統依訂單中最高溫層自動套用對應費率。若您的產品無需溫層管理，可略過此設定。
        </p>

        <SectionCard title="常溫設定" collapsible>
          <p style={{ fontSize: 13, color: '#606266', lineHeight: 1.6 }}>
            常溫產品使用一般運費設定（目前基礎運費：NT$ 60）。如需修改，請前往
            <a href="#" style={{ marginLeft: 4 }}>一般運費設定 →</a>
          </p>
        </SectionCard>

        <SectionCard title="冷藏設定" collapsible>
          <FormField label="啟用冷藏運費" helper={coldRefEnabled ? '' : '未啟用時，冷藏產品套用一般常溫運費。'}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Switch checked={coldRefEnabled} onChange={setColdRefEnabled} />
              <span style={{ fontSize: 13, color: '#909399' }}>
                {coldRefEnabled ? '已啟用冷藏費率' : '未啟用，冷藏產品套用常溫費率'}
              </span>
            </div>
          </FormField>
          <TempFields type="cold" enabled={coldRefEnabled} form={coldRefForm} onForm={setColdRefForm} />
        </SectionCard>

        <SectionCard title="冷凍設定" collapsible>
          <FormField label="啟用冷凍運費" helper={coldFrzEnabled ? '' : '未啟用時，冷凍產品套用一般常溫運費。'}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Switch checked={coldFrzEnabled} onChange={setColdFrzEnabled} />
              <span style={{ fontSize: 13, color: '#909399' }}>
                {coldFrzEnabled ? '已啟用冷凍費率' : '未啟用，冷凍產品套用常溫費率'}
              </span>
            </div>
          </FormField>
          <TempFields type="frozen" enabled={coldFrzEnabled} form={coldFrzForm} onForm={setColdFrzForm} />
        </SectionCard>
      </div>

      <FixedBar lastSaved={lastSaved} onCancel={() => setShowCancel(true)} onSave={handleSave} saving={saving} />

      <Dialog open={showCancel} title="確認放棄變更"
        onCancel={() => setShowCancel(false)} onConfirm={() => setShowCancel(false)}
        confirmText="確定放棄" cancelText="繼續編輯" confirmDanger>
        確定放棄未儲存的變更？所有未儲存的費率設定將恢復至上次儲存的值。
      </Dialog>
    </div>
  );
}

// ─── 重量運費設定 Panel ────────────────────────────────────────────────────────

function WeightRulesPanel() {
  const { toasts, show } = useToast();
  const [enabled, setEnabled]       = React.useState(false);
  const [weightUnit, setWeightUnit] = React.useState('kg');
  const [defWeight, setDefWeight]   = React.useState('');
  const [coexist, setCoexist]       = React.useState('higher');
  const [tiers, setTiers]           = React.useState([]);
  const [saving, setSaving]         = React.useState(false);
  const [lastSaved, setLastSaved]   = React.useState(null);
  const [showCancel, setShowCancel] = React.useState(false);
  const ul = weightUnit === 'kg' ? 'kg' : 'g';

  const addTier = () => {
    const last = tiers.length > 0 ? tiers[tiers.length - 1] : null;
    setTiers(prev => [...prev, { id: Date.now(), min: last ? (last.max !== '' ? Number(last.max) : '') : 0, max: '', islandFee: '', remoteFee: '' }]);
  };

  const deleteTier = (id) => {
    const idx = tiers.findIndex(t => t.id === id);
    const next = tiers.filter(t => t.id !== id);
    for (let i = idx; i < next.length; i++) {
      next[i] = { ...next[i], min: i === 0 ? 0 : (next[i-1].max !== '' ? Number(next[i-1].max) : '') };
    }
    setTiers(next);
  };

  const updateTier = (id, field, value) => {
    const idx = tiers.findIndex(t => t.id === id);
    const next = [...tiers];
    next[idx] = { ...next[idx], [field]: value };
    if (field === 'max' && idx + 1 < next.length) {
      next[idx + 1] = { ...next[idx + 1], min: value !== '' ? Number(value) : '' };
    }
    setTiers(next);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      const now = new Date();
      setLastSaved(`${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,'0')}/${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`);
      show('重量運費設定已儲存，將套用至所有新訂單', 'success');
    }, 1200);
  };

  const thS = { padding: '10px 12px', textAlign: 'left', background: '#F5F7FA', borderBottom: '1px solid #DCDFE6', fontSize: EvoDS.font.listMin, fontWeight: 700, color: '#303133', whiteSpace: 'nowrap' };
  const tdS = { padding: '8px 8px', borderBottom: '1px solid #DCDFE6', verticalAlign: 'middle' };
  const ntP = { height: 32, padding: '0 8px', background: '#F5F7FA', border: '1px solid #DCDFE6', borderRight: 'none', display: 'flex', alignItems: 'center', fontSize: 12, color: '#909399', flexShrink: 0 };

  return (
    <div>
      <ToastStack toasts={toasts} />
      <div style={{ padding: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#409EFF', marginBottom: 20 }}>重量運費設定</h2>

        <p style={{ fontSize: 13, color: '#909399', lineHeight: 1.6, marginBottom: 24, padding: '10px 14px', background: '#F5F7FA', borderLeft: '3px solid #DCDFE6' }}>
          設定依產品總重量計費的運費規則。結帳時，系統加總購物車內所有產品的重量（重量 × 數量），查找對應費率階梯並自動計算運費。
        </p>

        <SectionCard title="全域設定">
          <FormField label="啟用重量運費" helper="啟用後，系統將依產品重量計算運費，而非固定費率。">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Switch checked={enabled} onChange={setEnabled} />
              <span style={{ fontSize: 13, color: '#909399' }}>{enabled ? '已啟用重量運費' : '未啟用'}</span>
            </div>
          </FormField>
          <FormField label="重量單位" helper="整個商店統一使用同一單位。產品重量欄位的填寫單位也會跟著改變。">
            <RadioGroup value={weightUnit} onChange={setWeightUnit}
              options={[{ value: 'g', label: '公克 (g)' }, { value: 'kg', label: '公斤 (kg)' }]} />
          </FormField>
          <FormField label={`產品未設定重量時的預設重量（${ul}）`} helper="產品未填重量時，系統以此預設值計算重量費率。建議填入您產品的平均重量。">
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input type="number" min={0.01} step={0.01} value={defWeight} onChange={e => setDefWeight(e.target.value)} placeholder="例：500"
                disabled={!enabled}
                style={{ width: 160, height: 40, padding: '0 10px', border: '1px solid #DCDFE6', borderRadius: 0, fontSize: 14, outline: 'none', background: enabled ? '#fff' : '#F5F7FA', fontFamily: 'Noto Sans TC,sans-serif', color: '#303133', opacity: enabled ? 1 : 0.6 }} />
              <span style={{ fontSize: 13, color: '#606266', opacity: enabled ? 1 : 0.6 }}>{ul}</span>
            </div>
          </FormField>
          <FormField
            label={<span>當重量運費與一般運費並存時 <FSTooltip content="當您同時設定了一般運費（例如固定 NT$60）和重量運費（例如 5kg 以上 NT$200），系統需要決定以哪個為準。建議選擇「取兩者較高值」，確保大型產品的運費不低於實際物流成本。" /></span>}
            helper="若產品同時符合一般運費和重量運費，系統依此規則決定最終運費。">
            <RadioGroup value={coexist} onChange={setCoexist} vertical
              options={[
                { value: 'higher', label: '取兩者較高值（確保運費不低於成本）' },
                { value: 'weight', label: '使用重量運費（忽略一般費率）' },
                { value: 'normal', label: '使用一般運費（忽略重量費率）' },
              ]} />
          </FormField>
        </SectionCard>

        <div style={{ background: '#f5f0ff', border: '1px solid #e0d5ff', padding: '16px 20px', marginBottom: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#5B21B6', marginBottom: 12 }}>費率設定範例（僅供參考）</p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead><tr>{['重量範圍', '本島運費', '離島運費'].map(h =>
              <th key={h} style={{ textAlign: 'left', padding: '6px 12px', fontSize: 14, fontWeight: 700, color: '#5B21B6', borderBottom: '1px solid #e0d5ff' }}>{h}</th>
            )}</tr></thead>
            <tbody>{[['0 – 1 kg', 'NT$100', 'NT$200'], ['1 – 5 kg', 'NT$180', 'NT$320'], ['5 – 15 kg', 'NT$300', 'NT$500'], ['15 kg 以上', 'NT$500', 'NT$800']].map(([r, i, o], idx) =>
              <tr key={idx}>{[r, i, o].map((v, j) =>
                <td key={j} style={{ padding: '6px 12px', fontSize: 12, color: '#6D28D9', borderBottom: idx < 3 ? '1px solid #ece8ff' : 'none' }}>{v}</td>
              )}</tr>
            )}</tbody>
          </table>
        </div>

        <SectionCard title="重量費率階梯">
          {!enabled ? (
            <p style={{ color: '#C0C4CC', fontSize: 13, textAlign: 'center', padding: '20px 0' }}>請先啟用重量運費後，再設定費率階梯。</p>
          ) : tiers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p style={{ fontSize: 15, fontWeight: 500, color: '#303133', marginBottom: 6 }}>尚未設定任何費率階梯</p>
              <p style={{ fontSize: 13, color: '#909399', marginBottom: 16 }}>至少需要一個費率階梯，重量計費才能正常運作。</p>
              <button onClick={addTier} style={{ ...sharedBtns.plain, borderColor: '#409EFF', color: '#409EFF' }}>+ 新增費率階梯</button>
            </div>
          ) : (
            <>
              <div style={{ overflowX: 'auto', marginBottom: 12 }}>
                <table style={{ borderCollapse: 'collapse', minWidth: 580, width: '100%', fontSize: 14 }}>
                  <thead><tr>
                    <th style={thS}>下限（{ul}）</th>
                    <th style={thS}>上限（{ul}）<span style={{ fontSize: 11, color: '#909399', fontWeight: 400, marginLeft: 4 }}>填 0 = 無上限</span></th>
                    <th style={thS}>本島運費 (NT$)</th>
                    <th style={thS}>離島運費 (NT$)</th>
                    <th style={{ ...thS, width: 68, textAlign: 'center' }}>操作</th>
                  </tr></thead>
                  <tbody>
                    {tiers.map((tier, idx) => (
                      <tr key={tier.id}>
                        <td style={tdS}><input readOnly value={tier.min === '' ? '—' : tier.min} style={{ width: 80, height: 32, padding: '0 8px', border: '1px solid #DCDFE6', borderRadius: 0, fontSize: 14, background: '#F5F7FA', color: '#909399', fontFamily: 'Noto Sans TC,sans-serif', outline: 'none' }} /></td>
                        <td style={tdS}><input type="number" min={0} value={tier.max} onChange={e => updateTier(tier.id, 'max', e.target.value)} placeholder={idx === tiers.length - 1 ? '0（無上限）' : ''} style={{ width: 130, height: 32, padding: '0 8px', border: '1px solid #DCDFE6', borderRadius: 0, fontSize: 14, color: '#303133', fontFamily: 'Noto Sans TC,sans-serif', outline: 'none' }} /></td>
                        <td style={tdS}><div style={{ display: 'flex' }}><span style={ntP}>NT$</span><input type="number" min={0} value={tier.islandFee} onChange={e => updateTier(tier.id, 'islandFee', e.target.value)} style={{ width: 80, height: 32, padding: '0 8px', border: '1px solid #DCDFE6', borderRadius: 0, fontSize: 14, color: '#303133', fontFamily: 'Noto Sans TC,sans-serif', outline: 'none' }} /></div></td>
                        <td style={tdS}><div style={{ display: 'flex' }}><span style={ntP}>NT$</span><input type="number" min={0} value={tier.remoteFee} onChange={e => updateTier(tier.id, 'remoteFee', e.target.value)} style={{ width: 80, height: 32, padding: '0 8px', border: '1px solid #DCDFE6', borderRadius: 0, fontSize: 14, color: '#303133', fontFamily: 'Noto Sans TC,sans-serif', outline: 'none' }} /></div></td>
                        <td style={{ ...tdS, textAlign: 'center' }}>
                          <button onClick={() => deleteTier(tier.id)} style={{ height: 30, padding: '0 8px', background: 'none', color: '#F56C6C', border: '1px solid #fbc4c4', borderRadius: 0, fontSize: 12, fontFamily: 'Noto Sans TC,sans-serif', cursor: 'pointer' }}>刪除</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button onClick={addTier} style={{ ...sharedBtns.plain, borderColor: '#409EFF', color: '#409EFF' }}>+ 新增費率階梯</button>
            </>
          )}
        </SectionCard>
      </div>

      <FixedBar lastSaved={lastSaved} onCancel={() => setShowCancel(true)} onSave={handleSave} saving={saving} />

      <Dialog open={showCancel} title="確認放棄變更"
        onCancel={() => setShowCancel(false)} onConfirm={() => setShowCancel(false)}
        confirmText="確定放棄" cancelText="繼續編輯" confirmDanger>
        確定放棄未儲存的變更？所有未儲存的費率設定將恢復至上次儲存的值。
      </Dialog>
    </div>
  );
}

// Kept for backward compatibility (no longer used in main App)
function FreightSettingsScreen() {
  return <TempRulesPanel />;
}

Object.assign(window, { TempRulesPanel, WeightRulesPanel, FreightSettingsScreen });
