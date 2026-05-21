// Screen 2 & 3: 新增產品 / 編輯產品

function AddEditProductPage({ onNavigate, mode }) {
  const isEdit = mode === 'edit';

  // Form state
  const [name, setName] = React.useState(isEdit ? '夏日純棉T恤' : '');
  const [shortDesc, setShortDesc] = React.useState(isEdit ? '輕薄透氣，適合夏季穿著' : '');
  const [status, setStatus] = React.useState(isEdit ? 'published' : 'draft');
  const [category, setCategory] = React.useState(isEdit ? '女裝' : '');
  const [scheduleStart, setScheduleStart] = React.useState('');
  const [scheduleEnd, setScheduleEnd] = React.useState('');
  const [multiSpec, setMultiSpec] = React.useState(false);
  const [specLayers, setSpecLayers] = React.useState([
  { name: '顏色', values: ['紅色', '藍色', '白色'] }]
  );
  const [singlePrice, setSinglePrice] = React.useState(isEdit ? '880' : '');
  const [singleSalePrice, setSingleSalePrice] = React.useState('');
  const [singleStock, setSingleStock] = React.useState(isEdit ? '32' : '');
  const [singleSku, setSingleSku] = React.useState(isEdit ? 'SKU-T001' : '');
  const [seoLocale, setSeoLocale] = React.useState('繁中');
  const [seoTitle, setSeoTitle] = React.useState({ '繁中': '', 'EN': '' });
  const [seoDesc, setSeoDesc] = React.useState({ '繁中': '', 'EN': '' });
  const [seoKeywords, setSeoKeywords] = React.useState({ '繁中': [], 'EN': [] });
  const [seoRobots, setSeoRobots] = React.useState({ '繁中': 'index-follow', 'EN': 'index-follow' });
  const [ogTitle, setOgTitle] = React.useState({ '繁中': '', 'EN': '' });
  const [ogDesc, setOgDesc] = React.useState({ '繁中': '', 'EN': '' });
  const [salesDisplayMode, setSalesDisplayMode] = React.useState('none');
  const [salesBase, setSalesBase] = React.useState('0');
  const [tempType, setTempType] = React.useState('normal');
  const [showBadge, setShowBadge] = React.useState(false);
  const [weightValue, setWeightValue] = React.useState('');
  const [weightUnit, setWeightUnit] = React.useState('g');
  const [freeProduct, setFreeProduct] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const [errors, setErrors] = React.useState({});
  const [specInput, setSpecInput] = React.useState(['', '']);
  const [multiSpecConfirm, setMultiSpecConfirm] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('basic');

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = (publish) => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = '請填寫產品名稱';
    if (!freeProduct && !singlePrice) newErrors.price = '請填寫售價';
    if (!singleStock && !multiSpec) newErrors.stock = '請填寫庫存數量';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      showToast(publish ? '產品已上架！消費者現在可以瀏覽並購買此產品。' : '產品已儲存為草稿');
      setTimeout(() => onNavigate('product-list'), 1200);
    }, 1200);
  };

  const handleEnableMultiSpec = () => {
    if (singlePrice || singleStock) {
      setMultiSpecConfirm(true);
    } else {
      setMultiSpec(true);
    }
  };

  const confirmMultiSpec = () => {
    setSinglePrice('');
    setSingleStock('');
    setMultiSpec(true);
    setMultiSpecConfirm(false);
  };

  // SKU matrix generation
  const getSkuMatrix = () => {
    if (specLayers.length === 0) return [];
    if (specLayers.length === 1) return specLayers[0].values.map((v) => ({ specs: [v], price: '', salePrice: '', stock: '', sku: '', enabled: true }));
    const result = [];
    for (const v1 of specLayers[0].values) {
      for (const v2 of specLayers[1]?.values || []) {
        result.push({ specs: [v1, v2], price: '', salePrice: '', stock: '', sku: '', enabled: true });
      }
    }
    return result;
  };
  const [skuMatrix, setSkuMatrix] = React.useState(getSkuMatrix());
  const [batchField, setBatchField] = React.useState('price');
  const [batchValue, setBatchValue] = React.useState('');

  const applyBatch = () => {
    setSkuMatrix((prev) => prev.map((row) => ({ ...row, [batchField]: batchValue })));
    showToast('已套用至所有 SKU', 'info');
  };

  const TAB_FIELDS = { basic: ['name'], sales: ['price', 'stock'], shipping: [], related: [], seo: [] };

  const tabs = [
  { id: 'basic',    label: '基本設定' },
  { id: 'sales',    label: '銷售資訊' },
  { id: 'shipping', label: '運送設定' },
  { id: 'related',  label: '相關產品' },
  { id: 'seo',      label: '搜尋引擎設定（SEO）' }];


  return (
    <div style={{ position: 'relative' }}>
      {/* Toast */}
      {toast &&
      <div style={{
        position: 'fixed', top: 64, right: 24, zIndex: 9999,
        background: toast.type === 'success' ? '#f0f9eb' : '#f4f4f5',
        border: `1px solid ${toast.type === 'success' ? '#c2e7b0' : '#d3d4d6'}`,
        color: toast.type === 'success' ? '#67C23A' : '#909399',
        padding: '10px 20px', fontSize: 14
      }}>{toast.msg}</div>
      }

      {/* Multi-spec confirm modal */}
      {multiSpecConfirm &&
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9998, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', border: '1px solid #DCDFE6', width: 420, padding: 24 }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>啟用多規格</div>
            <div style={{ fontSize: 14, color: '#606266', marginBottom: 24 }}>啟用多規格後，目前的單規格價格和庫存設定將會清除，並由 SKU 矩陣取代。確定繼續？</div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button style={plainBtn} onClick={() => setMultiSpecConfirm(false)}>取消</button>
              <button style={primaryBtn} onClick={confirmMultiSpec}>確定啟用</button>
            </div>
          </div>
        </div>
      }

      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => onNavigate('product-list')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#303133', fontSize: 18, padding: '4px 6px', display: 'flex', alignItems: 'center', lineHeight: 1 }}>←</button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <h1 style={{ fontSize: 20, fontWeight: 700 }}>{isEdit ? '編輯產品內容' : '新增產品'}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#909399' }}>
                <span style={{ cursor: 'pointer', color: '#606266' }} onClick={() => onNavigate('product-list')}>產品</span>
                <span>/</span>
                <span style={{ cursor: 'pointer', color: '#606266' }} onClick={() => onNavigate('product-list')}>內容管理</span>
                <span>/</span>
                <span style={{ color: '#909399' }}>產品內容</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={plainBtn} onClick={() => handleSave(false)} disabled={saving}>{saving ? '儲存中…' : '儲存草稿'}</button>
          <button style={primaryBtn} onClick={() => handleSave(true)} disabled={saving}>{saving ? '儲存中…' : '儲存並上架'}</button>
        </div>
      </div>

      {/* Main layout: left form + right preview panel */}
      <div style={{ background: '#fff', minHeight: 600 }}>

        {/* Top row: Tabs (left) + nothing on right — tabs span full width */}
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          {/* Tab bar */}
          <div style={{ flex: activeTab === 'basic' ? '0 0 55%' : '1', maxWidth: activeTab === 'basic' ? '55%' : '100%' }}>
            <div style={{ display: 'flex', padding: '0 24px' }}>
              {tabs.map((tab) => {
                const hasError = (TAB_FIELDS[tab.id] || []).some(f => errors[f]);
                return (
                <div key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '12px 16px', cursor: 'pointer', fontSize: 14, fontWeight: activeTab === tab.id ? 600 : 400,
                  color: activeTab === tab.id ? '#409EFF' : '#606266',
                  borderBottom: activeTab === tab.id ? '2px solid #409EFF' : '2px solid transparent',
                  marginBottom: -1, display: 'flex', alignItems: 'center', gap: 4
                }}>
                  {tab.label}
                  {hasError && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F56C6C', display: 'inline-block' }} />}
                </div>
                );
              })}
            </div>
          </div>
          {/* Right side top — empty, matches tab height, only on basic tab */}
          {activeTab === 'basic' && <div style={{ flex: '0 0 45%', maxWidth: '45%' }}></div>}
        </div>

        {/* Two-column layout below tabs */}
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        {/* Left column — form */}
        <div style={{ flex: activeTab === 'basic' ? '0 0 55%' : '1', maxWidth: activeTab === 'basic' ? '55%' : '100%', padding: 24, minHeight: 500 }}>

          {activeTab === 'basic' &&
            <>
              {/* URL */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 13, color: '#606266', marginBottom: 6 }}>網址</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                  <div style={{ padding: '0 12px', height: 40, background: '#F5F7FA', border: '1px solid #DCDFE6', borderRight: 'none', display: 'flex', alignItems: 'center', fontSize: 13, color: '#909399', whiteSpace: 'nowrap' }}>https://domain.com/</div>
                  <input defaultValue={isEdit ? 'product-d4vh0l' : ''} style={{ ...inputStyle, flex: 1, borderRight: 'none' }} onFocus={(e) => e.target.style.borderColor = '#409EFF'} onBlur={(e) => e.target.style.borderColor = '#DCDFE6'} />
                  <button style={{ ...plainBtn, borderLeft: 'none' }}>編輯</button>
                </div>
              </div>

              {/* Status */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 13, color: '#606266', marginBottom: 8 }}>狀態</div>
                <div style={{ display: 'flex', gap: 20 }}>
                  {[['published', '公開'], ['draft', '未公開'], ['scheduled', '指定公開時間']].map(([val, label]) =>
                  <label key={val} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14 }}>
                      <input type="radio" name="status" value={val} checked={status === val} onChange={() => setStatus(val)} style={{ accentColor: '#409EFF' }} />
                      {label}
                    </label>
                  )}
                </div>
              </div>

              {/* Publish date */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 13, color: '#606266', marginBottom: 6 }}>
                  發布日期 <span style={{ color: '#409EFF', cursor: 'pointer' }}>ⓘ</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input type="date" style={{ ...inputStyle, width: 180 }} value={scheduleStart} onChange={(e) => setScheduleStart(e.target.value)} onFocus={(e) => e.target.style.borderColor = '#409EFF'} onBlur={(e) => e.target.style.borderColor = '#DCDFE6'} />
                  <span style={{ fontSize: 13, color: '#909399' }}>內頁顯示發布日期</span>
                </div>
              </div>

              {/* Category */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 13, color: '#606266', marginBottom: 6 }}>產品分類</div>
                <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ ...selectStyle, width: '100%' }}>
                  <option value="">輸入人分類</option>
                  {['女裝', '鞋款', '配件', '童裝', '外套'].map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Lang tabs using design system LocaleTabs */}
              <LocaleTabs locales={['繁中', 'EN']} renderContent={(locale) =>
              <div>
                  {/* Product images */}
                  <LocaleField label="產品圖片">
                    <ImageUpload width={100} height={100} />
                    <div style={{ fontSize: 12, color: '#909399', marginTop: 4 }}>建議正方形，JPG/PNG/WebP，最大 10MB</div>
                  </LocaleField>

                  {/* Product name */}
                  <LocaleField label="產品名稱" required error={errors.name}>
                    <input value={locale === '繁中' ? name : ''} onChange={(e) => locale === '繁中' && setName(e.target.value)} maxLength={100}
                  style={{ ...inputStyle, width: '100%', borderColor: errors.name ? '#F56C6C' : '#DCDFE6' }}
                  placeholder={locale === '繁中' ? '例：夏日純棉T恤（最多 100 字）' : 'e.g. Summer Cotton T-Shirt (max 100 chars)'}
                  onFocus={(e) => e.target.style.borderColor = errors.name ? '#F56C6C' : '#409EFF'}
                  onBlur={(e) => e.target.style.borderColor = errors.name ? '#F56C6C' : '#DCDFE6'} />
                  
                    <div style={{ fontSize: 12, color: '#909399', textAlign: 'right', marginTop: 2 }}>{name.length}/100 字</div>
                    {errors.name && <div style={{ fontSize: 12, color: '#F56C6C', marginTop: 2 }}>{errors.name}</div>}
                  </LocaleField>

                  {/* Short desc */}
                  <LocaleField label="產品簡短說明">
                    <textarea value={locale === '繁中' ? shortDesc : ''} onChange={(e) => locale === '繁中' && setShortDesc(e.target.value)} maxLength={200}
                  rows={3} placeholder={locale === '繁中' ? '選填。顯示於產品列表卡片下方，最多 200 字' : 'Optional. Shown below product card, max 200 chars.'}
                  style={{ ...inputStyle, width: '100%', height: 'auto', padding: '8px 12px', resize: 'vertical' }}
                  onFocus={(e) => e.target.style.borderColor = '#409EFF'}
                  onBlur={(e) => e.target.style.borderColor = '#DCDFE6'} />
                  
                    <div style={{ fontSize: 12, color: '#909399', textAlign: 'right', marginTop: 2 }}>{shortDesc.length}/200 字</div>
                  </LocaleField>

                  {/* Rich text editor */}
                  <LocaleField label="產品詳細說明">
                    <div style={{ border: '1px solid #DCDFE6' }}>
                      <div style={{ background: '#F5F7FA', borderBottom: '1px solid #DCDFE6', padding: '6px 12px', display: 'flex', gap: 8 }}>
                        {['H2', 'H3', 'B', 'I', '≡', '🖼', '▶', '⊞'].map((t) =>
                      <button key={t} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px', fontSize: 13, color: '#606266', fontWeight: t === 'B' ? 700 : 400 }}>{t}</button>
                      )}
                      </div>
                      <textarea placeholder={locale === '繁中' ? '請輸入產品詳細說明…' : 'Enter product description...'} rows={5}
                    style={{ width: '100%', border: 'none', resize: 'vertical', padding: '10px 12px', fontSize: 14, fontFamily: 'Noto Sans TC, sans-serif', outline: 'none', color: '#303133' }} />
                    
                    </div>
                    <div style={{ fontSize: 12, color: '#909399', marginTop: 4 }}>支援標題、粗體、列表、圖片、影片嵌入</div>
                  </LocaleField>
                </div>
              } />

            </>
            }

          {activeTab === 'seo' &&
            <div style={{ padding: '0 0 32px' }}>

              {/* Locale radio */}
              <div style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
                {['繁中', 'EN'].map(loc =>
                  <label key={loc} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', padding: '4px 12px', border: `1px solid ${seoLocale === loc ? '#409EFF' : '#DCDFE6'}`, borderRadius: 4, background: seoLocale === loc ? '#EFF6FF' : '#fff' }}>
                    <input type="radio" name="seoLocale" value={loc} checked={seoLocale === loc} onChange={() => setSeoLocale(loc)} style={{ accentColor: '#409EFF' }} />
                    <span style={{ fontSize: 14, color: seoLocale === loc ? '#409EFF' : '#606266', fontWeight: seoLocale === loc ? 600 : 400 }}>{loc}</span>
                  </label>
                )}
              </div>

              {/* Section: 網頁資訊 */}
              <div style={{ marginBottom: 36 }}>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  網頁資訊<span style={{ fontSize: 12, color: '#909399', fontWeight: 400 }}>meta</span>
                </div>
                <div style={{ borderTop: '1px solid #EBEEF5' }}>

                  {/* 標題 */}
                  <div style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #EBEEF5' }}>
                    <div style={{ width: 68, fontSize: 14, color: '#606266', flexShrink: 0 }}>標題</div>
                    <input value={seoTitle[seoLocale] || ''}
                      onChange={(e) => setSeoTitle(prev => ({ ...prev, [seoLocale]: e.target.value }))}
                      style={{ flex: 1, height: 40, border: '1px solid #DCDFE6', padding: '0 10px', fontSize: 14, outline: 'none', fontFamily: 'Noto Sans TC, sans-serif' }}
                      onFocus={(e) => e.target.style.borderColor = '#409EFF'} onBlur={(e) => e.target.style.borderColor = '#DCDFE6'} />
                  </div>

                  {/* 關鍵字 tag input */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', padding: '12px 0', borderBottom: '1px solid #EBEEF5' }}>
                    <div style={{ width: 68, fontSize: 14, color: '#606266', flexShrink: 0, paddingTop: 7 }}>關鍵字</div>
                    <div style={{ flex: 1, border: '1px solid #DCDFE6', padding: '4px 8px', display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'center', minHeight: 36, cursor: 'text' }}
                      onClick={(e) => e.currentTarget.querySelector('input').focus()}>
                      {(seoKeywords[seoLocale] || []).map((kw, i) =>
                        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 3, padding: '2px 8px', background: '#F0F7FF', border: '1px solid #B3D8FF', borderRadius: 3, fontSize: 13, color: '#409EFF' }}>
                          {kw}
                          <span style={{ cursor: 'pointer', color: '#909399', fontSize: 15, lineHeight: 1 }}
                            onClick={(e) => { e.stopPropagation(); setSeoKeywords(prev => ({ ...prev, [seoLocale]: prev[seoLocale].filter((_, j) => j !== i) })); }}>×</span>
                        </span>
                      )}
                      <input
                        placeholder={(seoKeywords[seoLocale] || []).length === 0 ? '輸入關鍵字後按 Enter' : ''}
                        style={{ border: 'none', outline: 'none', fontSize: 14, minWidth: 120, flex: 1, fontFamily: 'Noto Sans TC, sans-serif', padding: '2px 0' }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && e.target.value.trim()) {
                            setSeoKeywords(prev => ({ ...prev, [seoLocale]: [...(prev[seoLocale] || []), e.target.value.trim()] }));
                            e.target.value = '';
                          }
                        }} />
                    </div>
                  </div>

                  {/* 簡介 */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', padding: '12px 0', borderBottom: '1px solid #EBEEF5' }}>
                    <div style={{ width: 68, fontSize: 14, color: '#606266', flexShrink: 0, paddingTop: 8 }}>簡介</div>
                    <textarea value={seoDesc[seoLocale] || ''} rows={3}
                      onChange={(e) => setSeoDesc(prev => ({ ...prev, [seoLocale]: e.target.value }))}
                      placeholder="請輸入頁面的簡短描述（建議 50-160 字元，能清楚傳達內容並吸引點擊）"
                      style={{ flex: 1, border: '1px solid #DCDFE6', padding: '8px 10px', fontSize: 14, resize: 'vertical', outline: 'none', fontFamily: 'Noto Sans TC, sans-serif' }}
                      onFocus={(e) => e.target.style.borderColor = '#409EFF'} onBlur={(e) => e.target.style.borderColor = '#DCDFE6'} />
                  </div>

                  {/* robots */}
                  <div style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #EBEEF5' }}>
                    <div style={{ width: 68, fontSize: 14, color: '#606266', flexShrink: 0 }}>robots</div>
                    <select value={seoRobots[seoLocale] || 'index-follow'}
                      onChange={(e) => setSeoRobots(prev => ({ ...prev, [seoLocale]: e.target.value }))}
                      style={{ flex: 1, height: 40, border: '1px solid #DCDFE6', padding: '0 10px', fontSize: 14, background: '#fff', outline: 'none', fontFamily: 'Noto Sans TC, sans-serif' }}>
                      <option value="index-follow">索引且追蹤連結</option>
                      <option value="noindex-follow">不索引但追蹤連結</option>
                      <option value="index-nofollow">索引但不追蹤連結</option>
                      <option value="noindex-nofollow">不索引且不追蹤連結</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section: 社群分享設定 */}
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  社群分享設定<span style={{ fontSize: 12, color: '#909399', fontWeight: 400 }}>og.meta</span>
                </div>
                <div style={{ borderTop: '1px solid #EBEEF5' }}>

                  {/* 分享圖片 */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', padding: '12px 0', borderBottom: '1px solid #EBEEF5' }}>
                    <div style={{ width: 68, fontSize: 14, color: '#606266', flexShrink: 0, paddingTop: 4 }}>分享圖片</div>
                    <div>
                      <div style={{ width: 120, height: 90, border: '1px dashed #DCDFE6', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#C0C4CC', fontSize: 28, marginBottom: 6 }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = '#409EFF'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = '#DCDFE6'}>+</div>
                      <div style={{ fontSize: 12, color: '#909399' }}>支援 圖片 格式，檔案大小不超過 20MB</div>
                    </div>
                  </div>

                  {/* 分享標題 */}
                  <div style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #EBEEF5' }}>
                    <div style={{ width: 68, fontSize: 14, color: '#606266', flexShrink: 0 }}>分享標題</div>
                    <input value={ogTitle[seoLocale] || ''}
                      onChange={(e) => setOgTitle(prev => ({ ...prev, [seoLocale]: e.target.value }))}
                      style={{ flex: 1, height: 40, border: '1px solid #DCDFE6', padding: '0 10px', fontSize: 14, outline: 'none', fontFamily: 'Noto Sans TC, sans-serif' }}
                      onFocus={(e) => e.target.style.borderColor = '#409EFF'} onBlur={(e) => e.target.style.borderColor = '#DCDFE6'} />
                  </div>

                  {/* 分享描述 */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', padding: '12px 0', borderBottom: '1px solid #EBEEF5' }}>
                    <div style={{ width: 68, fontSize: 14, color: '#606266', flexShrink: 0, paddingTop: 8 }}>分享描述</div>
                    <textarea value={ogDesc[seoLocale] || ''} rows={3}
                      onChange={(e) => setOgDesc(prev => ({ ...prev, [seoLocale]: e.target.value }))}
                      placeholder="請輸入頁面的簡短描述（建議 50-160 字元，能清楚傳達內容並吸引點擊）"
                      style={{ flex: 1, border: '1px solid #DCDFE6', padding: '8px 10px', fontSize: 14, resize: 'vertical', outline: 'none', fontFamily: 'Noto Sans TC, sans-serif' }}
                      onFocus={(e) => e.target.style.borderColor = '#409EFF'} onBlur={(e) => e.target.style.borderColor = '#DCDFE6'} />
                  </div>

                  <div style={{ paddingTop: 16 }}>
                    <button style={plainBtn}>清除Facebook快取</button>
                  </div>
                </div>
              </div>
            </div>
            }

          {activeTab === 'sales' &&
            <div style={{ padding: '0 0 24px' }}>

              {/* 規格與定價 */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 14, color: '#303133' }}>規格與定價</div>

                {/* Multi-spec toggle */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, padding: '10px 14px', background: '#F5F7FA', border: '1px solid #DCDFE6' }}>
                  <label style={{ position: 'relative', display: 'inline-block', width: 40, height: 20, flexShrink: 0 }}>
                    <input type="checkbox" checked={multiSpec} onChange={() => multiSpec ? setMultiSpec(false) : handleEnableMultiSpec()} style={{ opacity: 0, width: 0, height: 0 }} />
                    <span style={{ position: 'absolute', cursor: 'pointer', inset: 0, background: multiSpec ? '#409EFF' : '#C0C4CC', borderRadius: 10, transition: '0.2s' }}>
                      <span style={{ position: 'absolute', width: 16, height: 16, background: '#fff', borderRadius: '50%', top: 2, left: multiSpec ? 22 : 2, transition: '0.2s' }} />
                    </span>
                  </label>
                  <span style={{ fontSize: 14, color: '#303133' }}>啟用多規格（如顏色、尺寸）</span>
                </div>

                {!multiSpec ?
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                    <FormField label="售價（NT$）" required error={errors.price}>
                      <input value={singlePrice} onChange={(e) => setSinglePrice(e.target.value)} type="number" min="0"
                    placeholder="0" style={{ ...inputStyle, width: '100%', borderColor: errors.price ? '#F56C6C' : '#DCDFE6' }}
                    onFocus={(e) => e.target.style.borderColor = '#409EFF'} onBlur={(e) => e.target.style.borderColor = errors.price ? '#F56C6C' : '#DCDFE6'} />
                    
                    </FormField>
                    <FormField label="特價（NT$）">
                      <input value={singleSalePrice} onChange={(e) => setSingleSalePrice(e.target.value)} type="number" min="0"
                    placeholder="留空不顯示" style={{ ...inputStyle, width: '100%' }}
                    onFocus={(e) => e.target.style.borderColor = '#409EFF'} onBlur={(e) => e.target.style.borderColor = '#DCDFE6'} />
                    
                      <div style={{ fontSize: 12, color: '#909399', marginTop: 2 }}>特價必須低於售價</div>
                    </FormField>
                    <FormField label="成本價（NT$）">
                      <input type="number" min="0" placeholder="僅後台毛利計算用" style={{ ...inputStyle, width: '100%' }}
                    onFocus={(e) => e.target.style.borderColor = '#409EFF'} onBlur={(e) => e.target.style.borderColor = '#DCDFE6'} />
                    
                      <div style={{ fontSize: 12, color: '#909399', marginTop: 2 }}>不顯示於前台</div>
                    </FormField>
                    <FormField label="庫存數量" required error={errors.stock}>
                      <input value={singleStock} onChange={(e) => setSingleStock(e.target.value)} type="number" min="0"
                    placeholder="0" style={{ ...inputStyle, width: '100%', borderColor: errors.stock ? '#F56C6C' : '#DCDFE6' }}
                    onFocus={(e) => e.target.style.borderColor = '#409EFF'} onBlur={(e) => e.target.style.borderColor = errors.stock ? '#F56C6C' : '#DCDFE6'} />
                    
                      <div style={{ fontSize: 12, color: '#909399', marginTop: 2 }}>設為 0 時前台顯示「售完」</div>
                    </FormField>
                    <FormField label="SKU 編號">
                      <input value={singleSku} onChange={(e) => setSingleSku(e.target.value)} placeholder="產品貨號（選填）"
                    style={{ ...inputStyle, width: '100%' }} onFocus={(e) => e.target.style.borderColor = '#409EFF'} onBlur={(e) => e.target.style.borderColor = '#DCDFE6'} />
                    
                    </FormField>
                    <FormField label="低庫存通知閾值">
                      <input type="number" min="0" placeholder="使用全局設定（5）" style={{ ...inputStyle, width: '100%' }}
                    onFocus={(e) => e.target.style.borderColor = '#409EFF'} onBlur={(e) => e.target.style.borderColor = '#DCDFE6'} />
                    
                      <div style={{ fontSize: 12, color: '#909399', marginTop: 2 }}>低於此數量時自動發送補貨提醒</div>
                    </FormField>
                  </div> :

                <div>
                    {specLayers.map((layer, li) =>
                  <div key={li} style={{ marginBottom: 16, padding: 14, background: '#F5F7FA', border: '1px solid #DCDFE6' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                          <span style={{ fontSize: 13, color: '#606266', width: 80 }}>規格名稱{li + 1} *</span>
                          <input value={layer.name} onChange={(e) => {const nl = [...specLayers];nl[li] = { ...nl[li], name: e.target.value };setSpecLayers(nl);}}
                      placeholder={li === 0 ? '例：顏色' : '例：尺寸'} style={{ ...inputStyle, width: 140 }}
                      onFocus={(e) => e.target.style.borderColor = '#409EFF'} onBlur={(e) => e.target.style.borderColor = '#DCDFE6'} />
                      
                          <button onClick={() => setSpecLayers((prev) => prev.filter((_, i) => i !== li))} style={{ ...textBtn('#F56C6C'), fontSize: 12 }}>刪除</button>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                          {layer.values.map((val, vi) =>
                      <span key={vi} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 24, padding: '0 12px', borderRadius: 9999, fontSize: 12, border: '1px solid #b3d8ff', background: '#ecf5ff', color: '#409EFF' }}>
                              {val}<span style={{ cursor: 'pointer', marginLeft: 4 }} onClick={() => {const nl = [...specLayers];nl[li].values = nl[li].values.filter((_, i) => i !== vi);setSpecLayers(nl);}}>×</span>
                            </span>
                      )}
                          <input value={specInput[li] || ''} onChange={(e) => {const s = [...specInput];s[li] = e.target.value;setSpecInput(s);}}
                      placeholder="輸入後按 Enter" style={{ ...inputStyle, width: 120 }}
                      onFocus={(e) => e.target.style.borderColor = '#409EFF'} onBlur={(e) => e.target.style.borderColor = '#DCDFE6'}
                      onKeyDown={(e) => {if (e.key === 'Enter' && specInput[li]?.trim()) {const nl = [...specLayers];nl[li].values = [...nl[li].values, specInput[li].trim()];setSpecLayers(nl);const s = [...specInput];s[li] = '';setSpecInput(s);}}} />
                      
                        </div>
                      </div>
                  )}
                    {specLayers.length < 2 &&
                  <button style={{ ...plainBtn, marginBottom: 14 }} onClick={() => {setSpecLayers((prev) => [...prev, { name: '', values: [] }]);setSpecInput((prev) => [...prev, '']);}}>+ 新增規格層</button>
                  }
                    {getSkuMatrix().length > 0 &&
                  <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, padding: '8px 12px', background: '#F5F7FA', border: '1px solid #DCDFE6' }}>
                          <span style={{ fontSize: 13, color: '#606266' }}>批次填入</span>
                          <select value={batchField} onChange={(e) => setBatchField(e.target.value)} style={{ ...selectStyle, width: 90 }}>
                            <option value="price">售價</option><option value="stock">庫存</option><option value="salePrice">特價</option>
                          </select>
                          <input value={batchValue} onChange={(e) => setBatchValue(e.target.value)} type="number" style={{ ...inputStyle, width: 90 }} onFocus={(e) => e.target.style.borderColor = '#409EFF'} onBlur={(e) => e.target.style.borderColor = '#DCDFE6'} />
                          <button style={plainBtn} onClick={applyBatch}>套用至所有 SKU</button>
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                            <thead><tr>
                              {specLayers.map((l, i) => <th key={i} style={{ ...thStyle, textAlign: 'left' }}>{l.name || `規格${i + 1}`}</th>)}
                              <th style={{ ...thStyle, textAlign: 'left' }}>售價(NT$)</th><th style={{ ...thStyle, textAlign: 'left' }}>特價</th><th style={{ ...thStyle, textAlign: 'left' }}>庫存</th><th style={{ ...thStyle, textAlign: 'left' }}>SKU</th><th style={{ ...thStyle, textAlign: 'left' }}>啟用</th>
                            </tr></thead>
                            <tbody>{getSkuMatrix().map((row, ri) =>
                          <tr key={ri}>{row.specs.map((s, si) => <td key={si} style={tdStyle}>{s}</td>)}
                                {['price', 'salePrice', 'stock', 'sku'].map((field) =>
                            <td key={field} style={tdStyle}><input value={skuMatrix[ri]?.[field] || ''} onChange={(e) => {const nm = [...skuMatrix];if (!nm[ri]) nm[ri] = { ...row };nm[ri][field] = e.target.value;setSkuMatrix(nm);}} style={{ ...inputStyle, width: 72 }} onFocus={(e) => e.target.style.borderColor = '#409EFF'} onBlur={(e) => e.target.style.borderColor = '#DCDFE6'} /></td>
                            )}
                                <td style={tdStyle}><input type="checkbox" defaultChecked style={{ accentColor: '#303133' }} /></td>
                              </tr>
                          )}</tbody>
                          </table>
                        </div>
                      </div>
                  }
                  </div>
                }
              </div>

              {/* 銷售數量顯示 */}
              <div style={{ borderTop: '1px solid #DCDFE6', paddingTop: 20, marginBottom: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 14, color: '#303133' }}>銷售數量顯示</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <FormField label="顯示模式">
                    <select value={salesDisplayMode} onChange={(e) => setSalesDisplayMode(e.target.value)} style={{ ...selectStyle, width: '100%' }}>
                      <option value="none">不顯示</option>
                      <option value="actual">顯示實際數字</option>
                      <option value="hot">顯示「熱銷中」文字</option>
                    </select>
                  </FormField>
                  {salesDisplayMode === 'actual' &&
                  <FormField label="銷售起始基數">
                      <input value={salesBase} onChange={(e) => setSalesBase(e.target.value)} type="number" min="0"
                    style={{ ...inputStyle, width: '100%' }}
                    onFocus={(e) => e.target.style.borderColor = '#409EFF'} onBlur={(e) => e.target.style.borderColor = '#DCDFE6'} />
                    
                      <div style={{ fontSize: 12, color: '#909399', marginTop: 2 }}>前台顯示 = 實際銷售量 + 此基數</div>
                    </FormField>
                  }
                </div>
              </div>

              {/* 編輯模式：產品數據 */}
              {isEdit &&
              <div style={{ borderTop: '1px solid #DCDFE6', paddingTop: 20 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 14, color: '#303133' }}>產品數據</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                    {[['建立時間', '2026-04-10 01:58'], ['最後修改時間', '2026-05-01 09:30'], ['累計銷售數量', '128 件'], ['累計瀏覽數（PV）', '2,340 次']].map(([label, value]) =>
                  <div key={label} style={{ padding: '10px 14px', background: '#F5F7FA', border: '1px solid #DCDFE6' }}>
                        <div style={{ fontSize: 12, color: '#909399', marginBottom: 4 }}>{label}</div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: '#303133' }}>{value}</div>
                      </div>
                  )}
                  </div>
                  <div style={{ padding: 14, background: '#F5F7FA', border: '1px solid #DCDFE6', textAlign: 'center', color: '#909399', fontSize: 13 }}>
                    近 30 天 PV / UV 趨勢圖表（整合中）
                  </div>
                </div>
              }
            </div>
            }

          {activeTab === 'shipping' &&
            <div style={{ padding: '0 0 24px' }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, color: '#303133' }}>運送設定</div>

              {/* 溫層屬性 */}
              <FormField label="溫層屬性" helper="影響結帳時的運費計算。請選擇產品需要的配送溫度。">
                <div style={{ display: 'flex', gap: 24 }}>
                  {[['normal', '常溫'], ['cold', '冷藏（7°C 以下）'], ['frozen', '冷凍（-18°C 以下）']].map(([val, label]) =>
                    <label key={val} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14 }}>
                      <input type="radio" name="tempType" value={val} checked={tempType === val} onChange={() => { setTempType(val); if (val === 'normal') setShowBadge(false); }} style={{ accentColor: '#409EFF' }} />
                      {label}
                    </label>
                  )}
                </div>
              </FormField>

              {/* 前台溫層標示 Switch — 冷藏/冷凍才顯示 */}
              {tempType !== 'normal' && (
                <FormField label="前台溫層標示" helper={`開啟後，產品頁會顯示溫層圖示（${tempType === 'frozen' ? '❄️ 冷凍' : '🌡️ 冷藏'}）。`}>
                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                    <span style={{ position: 'relative', display: 'inline-block', width: 40, height: 20, flexShrink: 0 }}>
                      <input type="checkbox" checked={showBadge} onChange={() => setShowBadge(!showBadge)} style={{ opacity: 0, width: 0, height: 0 }} />
                      <span style={{ position: 'absolute', cursor: 'pointer', inset: 0, background: showBadge ? '#409EFF' : '#C0C4CC', borderRadius: 10, transition: '0.2s' }}>
                        <span style={{ position: 'absolute', width: 16, height: 16, background: '#fff', borderRadius: '50%', top: 2, left: showBadge ? 22 : 2, transition: '0.2s' }} />
                      </span>
                    </span>
                    <span style={{ fontSize: 13, color: '#909399' }}>
                      {showBadge ? `顯示 ${tempType === 'frozen' ? '❄️ 冷凍' : '🌡️ 冷藏'} 圖示於產品頁` : '不顯示溫層圖示'}
                    </span>
                  </label>
                </FormField>
              )}

              {/* 產品重量 */}
              <FormField label="產品重量" helper="若您的商店啟用重量計費，建議填寫此欄位。未填寫時將套用系統預設重量。">
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input type="number" min={0} value={weightValue} onChange={e => setWeightValue(e.target.value)} placeholder="例：500"
                    style={{ ...inputStyle, width: 160 }}
                    onFocus={e => e.target.style.borderColor = '#409EFF'}
                    onBlur={e => e.target.style.borderColor = '#DCDFE6'} />
                  <select value={weightUnit} onChange={e => setWeightUnit(e.target.value)} style={{ ...selectStyle, width: 130 }}>
                    <option value="g">公克 (g)</option>
                    <option value="kg">公斤 (kg)</option>
                  </select>
                </div>
              </FormField>

              {/* Warning: 未設定重量 */}
              {!weightValue && (
                <div style={{ background: '#FDF6EC', border: '1px solid #f5dab1', padding: '10px 14px', display: 'flex', gap: 10, alignItems: 'flex-start', borderRadius: 3 }}>
                  <svg style={{ flexShrink: 0, marginTop: 1 }} width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1L13 13H1L7 1Z" stroke="#E6A23C" strokeWidth="1.4" strokeLinejoin="round"/>
                    <line x1="7" y1="5.5" x2="7" y2="8.5" stroke="#E6A23C" strokeWidth="1.4" strokeLinecap="round"/>
                    <circle cx="7" cy="10.5" r="0.6" fill="#E6A23C"/>
                  </svg>
                  <span style={{ fontSize: 13, color: '#8B6914', lineHeight: 1.5 }}>此產品尚未設定重量。若您已啟用重量運費，系統將以預設重量計算，可能導致費用不準確。</span>
                </div>
              )}
            </div>
            }

          {activeTab === 'related' &&
            <div style={{ padding: '0 0 24px', color: '#909399', fontSize: 14 }}>相關產品設定（整合中）</div>
            }
        </div>

        {/* Right column — only visible on basic tab */}
        {activeTab === 'basic' && <div style={{ flex: '0 0 45%', maxWidth: '45%', background: '#F5F7FA', minHeight: 400, display: 'flex', flexDirection: 'column', padding: '32px 24px 24px 24px', border: 'none', outline: 'none' }}>
          {/* Preview header */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: '#909399', marginBottom: 4, letterSpacing: 1 }}>行銷案例</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: '#303133', letterSpacing: 1, lineHeight: 1.2 }}>MARKETING CASE</div>
            <div style={{ fontSize: 11, color: '#909399', marginTop: 6, lineHeight: 1.6 }}>以此作為您的電商後台參考範例<br />幫您更好地展示產品，提高轉換率</div>
          </div>

          {/* Image grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 16 }}>
            {[
              { bg: '#d4b896', label: '享咖啡生活，精選品味 - 每周美好' },
              { bg: '#8fa8c8', label: '' },
              { bg: '#c9b8d4', label: '品牌・心意一起送，提案你想要的完美禮品' }].
              map((item, i) =>
              <div key={i} style={{
                height: 110, background: item.bg,
                display: 'flex', alignItems: 'flex-end', padding: 6,
                position: 'relative', overflow: 'hidden'
              }}>
                {i === 1 &&
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 36, height: 36, border: '2px solid rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 18, height: 18, background: 'rgba(255,255,255,0.5)' }} />
                    </div>
                  </div>
                }
                {item.label &&
                <div style={{ fontSize: 9, color: '#fff', lineHeight: 1.3, zIndex: 1, textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>{item.label}</div>
                }
              </div>
              )}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button style={{ ...primaryBtn, padding: '0 28px', height: 40, fontSize: 13 }}>頁面設計</button>
          </div>
        </div>}
        </div>{/* end two-column */}
      </div>{/* end white container */}
    </div>);

}

// ── Helper components ──────────────────────────────────────────────────────

function SectionCard({ title, children }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #DCDFE6', marginBottom: 16, borderRadius: 3 }}>
      {title && <div style={{ padding: '12px 24px', borderBottom: '1px solid #DCDFE6', fontSize: 14, fontWeight: 600, color: '#303133' }}>{title}</div>}
      <div style={{ padding: 24 }}>{children}</div>
    </div>);

}

function SideCard({ title, children }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #DCDFE6', borderRadius: 3 }}>
      {title && <div style={{ padding: '10px 16px', borderBottom: '1px solid #DCDFE6', fontSize: 14, fontWeight: 600, color: '#303133' }}>{title}</div>}
      <div style={{ padding: 16 }}>{children}</div>
    </div>);

}

function FormField({ label, required, error, compact, children }) {
  return (
    <div style={{ marginBottom: compact ? 0 : 16 }}>
      {label &&
      <label style={{ display: 'block', fontSize: 13, color: '#606266', marginBottom: 4 }}>
          {label}{required && <span style={{ color: '#F56C6C', marginLeft: 2 }}>*</span>}
        </label>
      }
      {children}
      {error && <div style={{ fontSize: 12, color: '#F56C6C', marginTop: 2 }}>{error}</div>}
    </div>);

}

Object.assign(window, { AddEditProductPage, SectionCard, SideCard, FormField });