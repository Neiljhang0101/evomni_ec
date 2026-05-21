// Product Edit Page — 產品編輯

function ProductEditPage({ onNavigate, product }) {
  const isNew = !product;
  const [activeTab, setActiveTab] = React.useState('basic');
  const [status, setStatus] = React.useState(isNew ? 'draft' : 'active');
  const [productName, setProductName] = React.useState(product?.title || '');
  const [brief, setBrief] = React.useState('');
  const [price, setPrice] = React.useState(product?.price?.replace('NT$ ', '') || '');
  const [priceName, setPriceName] = React.useState('定價');
  const [salePrice, setSalePrice] = React.useState(product?.salePrice?.replace('NT$ ', '') || '');
  const [salePriceName, setSalePriceName] = React.useState('特價');
  const [categories, setCategories] = React.useState(product ? [product.category] : []);
  const [tags, setTags] = React.useState(product?.tags || []);
  const [customTabs, setCustomTabs] = React.useState([{ id: 1, name: '產品介紹', active: true }]);
  const [relatedProducts, setRelatedProducts] = React.useState([]);
  const [autoRecommend, setAutoRecommend] = React.useState(false);
  const [purchaseMode, setPurchaseMode] = React.useState('url'); // url | ecommerce
  const [purchaseUrl, setPurchaseUrl] = React.useState('');
  const [purchaseBtnLabel, setPurchaseBtnLabel] = React.useState('前往購買');
  const [frontendSearch, setFrontendSearch] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const [tagInput, setTagInput] = React.useState('');
  const [relSearchQuery, setRelSearchQuery] = React.useState('');
  const [showRelSearch, setShowRelSearch] = React.useState(false);
  const [dragOver, setDragOver] = React.useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const TABS = [
    { key: 'basic', label: '基本資料' },
    { key: 'tabs', label: '頁籤內容' },
    { key: 'related', label: '相關產品' },
    { key: 'purchase', label: '購買連動' },
    { key: 'frontend', label: '前台設定' },
  ];

  const STATUS_OPTIONS = [
    { value: 'draft', label: '草稿', color: '#E6A23C' },
    { value: 'preview', label: '預覽', color: '#409EFF' },
    { value: 'active', label: '已發布', color: '#67C23A' },
    { value: 'inactive', label: '已下架', color: '#909399' },
  ];

  const SAMPLE_PRODUCTS = [
    { id: '#346', title: '瑜珈墊專業款 6mm' },
    { id: '#345', title: '冷萃咖啡濾掛包 (10入)' },
    { id: '#344', title: '智慧手錶 Smart Watch Pro' },
    { id: '#343', title: '天然精油擴香石' },
  ];

  const addRelated = (p) => {
    if (relatedProducts.length >= 5) { showToast('最多只能選 5 個相關產品', 'info'); return; }
    if (relatedProducts.find(r => r.id === p.id)) return;
    setRelatedProducts(r => [...r, p]);
    setShowRelSearch(false);
  };

  const removeRelated = (id) => setRelatedProducts(r => r.filter(p => p.id !== id));

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) { setTags(t => [...t, tagInput]); setTagInput(''); }
  };

  const addCustomTab = () => {
    const newId = Date.now();
    setCustomTabs(t => [...t, { id: newId, name: `頁籤 ${t.length + 1}`, active: false }]);
  };

  const inputS = { height: 40, padding: '0 10px', border: '1px solid #DCDFE6', borderRadius: 0, fontSize: 14, color: '#303133', background: '#fff', outline: 'none', width: '100%' };
  const labelS = { fontSize: 13, color: '#606266', marginBottom: 6, display: 'block', fontWeight: 500 };
  const fieldS = { marginBottom: 20 };
  const sectionS = { background: '#fff', border: '1px solid #DCDFE6', padding: 24, marginBottom: 16 };

  return (
    <div style={{ position: 'relative' }}>
      {toast && (
        <div style={{
          position: 'fixed', top: 64, right: 24, zIndex: 9999,
          background: toast.type === 'success' ? '#f0f9eb' : toast.type === 'danger' ? '#fef0f0' : '#ecf5ff',
          border: `1px solid ${toast.type === 'success' ? '#c2e7b0' : toast.type === 'danger' ? '#fbc4c4' : '#b3d8ff'}`,
          color: toast.type === 'success' ? '#67C23A' : toast.type === 'danger' ? '#F56C6C' : '#409EFF',
          padding: '10px 20px', fontSize: 14,
        }}>{toast.msg}</div>
      )}

      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => onNavigate('product-list')} style={{ background: 'none', border: 'none', color: '#409EFF', cursor: 'pointer', fontSize: 13, padding: 0 }}>← 返回列表</button>
            <h1 style={{ fontSize: 20, fontWeight: 700 }}>{isNew ? '新增產品' : '編輯產品'}</h1>
            {!isNew && <span style={{ fontSize: 12, color: '#909399' }}>{product?.id}</span>}
          </div>
          <span style={{ fontSize: 13, color: '#C0C4CC' }}>首頁 / 產品 / 產品管理 / {isNew ? '新增產品' : '編輯產品'}</span>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {/* Status selector */}
          <select value={status} onChange={e => setStatus(e.target.value)} style={{ height: 32, padding: '0 8px', border: '1px solid #DCDFE6', borderRadius: 0, fontSize: 13, color: '#303133', background: '#fff' }}>
            {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
          <button style={editBtn.plain} onClick={() => showToast('已儲存草稿')}>儲存草稿</button>
          <button style={editBtn.primary} onClick={() => showToast('已發布！')}>發布</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16 }}>
        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Tab nav */}
          <div style={{ background: '#fff', border: '1px solid #DCDFE6', borderBottom: 'none', display: 'flex' }}>
            {TABS.map(t => (
              <div key={t.key} onClick={() => setActiveTab(t.key)} style={{
                padding: '10px 20px', fontSize: 14, cursor: 'pointer', userSelect: 'none',
                borderBottom: activeTab === t.key ? '2px solid #303133' : '2px solid transparent',
                color: activeTab === t.key ? '#303133' : '#606266',
                fontWeight: activeTab === t.key ? 600 : 400,
              }}>{t.label}</div>
            ))}
          </div>

          {/* ── Tab: Basic Info ─────────────────────────── */}
          {activeTab === 'basic' && (
            <div>
              <div style={sectionS}>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>基本資料</div>

                <div style={fieldS}>
                  <label style={labelS}>產品名稱 <span style={{ color: '#F56C6C' }}>*</span></label>
                  <input style={inputS} placeholder="請輸入產品名稱" value={productName} onChange={e => setProductName(e.target.value)} />
                </div>

                <div style={fieldS}>
                  <label style={labelS}>產品簡述</label>
                  <textarea style={{ ...inputS, height: 80, padding: '8px 10px', resize: 'vertical' }} placeholder="請輸入產品簡短描述（前台列表頁顯示用）" value={brief} onChange={e => setBrief(e.target.value)} />
                  <div style={{ fontSize: 11, color: '#909399', marginTop: 4 }}>建議長度 30–80 字</div>
                </div>

                {/* Price */}
                <div style={{ ...fieldS, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={labelS}>定價數值</label>
                    <div style={{ display: 'flex' }}>
                      <div style={{ height: 32, padding: '0 10px', background: '#F5F7FA', border: '1px solid #DCDFE6', borderRight: 'none', display: 'flex', alignItems: 'center', fontSize: 13, color: '#909399', whiteSpace: 'nowrap' }}>NT$</div>
                      <input style={{ ...inputS, flex: 1 }} placeholder="0" type="number" value={price} onChange={e => setPrice(e.target.value)} />
                    </div>
                    <div style={{ fontSize: 11, color: '#909399', marginTop: 4 }}>僅用於前台展示，不涉及金流</div>
                  </div>
                  <div>
                    <label style={labelS}>定價前台顯示名稱</label>
                    <input style={inputS} value={priceName} onChange={e => setPriceName(e.target.value)} />
                    <div style={{ fontSize: 11, color: '#909399', marginTop: 4 }}>如：售價、定價、參考價</div>
                  </div>
                </div>

                {/* Sale price */}
                <div style={{ ...fieldS, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={labelS}>促銷價數值 <span style={{ fontSize: 11, color: '#909399' }}>(選填)</span></label>
                    <div style={{ display: 'flex' }}>
                      <div style={{ height: 32, padding: '0 10px', background: '#F5F7FA', border: '1px solid #DCDFE6', borderRight: 'none', display: 'flex', alignItems: 'center', fontSize: 13, color: '#909399' }}>NT$</div>
                      <input style={{ ...inputS, flex: 1 }} placeholder="留空則不顯示" type="number" value={salePrice} onChange={e => setSalePrice(e.target.value)} />
                    </div>
                    {salePrice && price && (
                      <div style={{ fontSize: 11, color: '#F56C6C', marginTop: 4 }}>前台將以紅色顯示促銷價，定價顯示刪除線</div>
                    )}
                  </div>
                  <div>
                    <label style={labelS}>促銷價前台顯示名稱</label>
                    <input style={inputS} value={salePriceName} onChange={e => setSalePriceName(e.target.value)} />
                    <div style={{ fontSize: 11, color: '#909399', marginTop: 4 }}>如：特價、優惠價、活動價</div>
                  </div>
                </div>

                {/* Price preview */}
                {price && (
                  <div style={{ background: '#F5F7FA', border: '1px solid #DCDFE6', padding: '12px 16px', marginBottom: 20 }}>
                    <div style={{ fontSize: 11, color: '#909399', marginBottom: 8 }}>前台價格預覽</div>
                    {salePrice ? (
                      <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                        <span style={{ fontSize: 13, color: '#909399' }}>{salePriceName}</span>
                        <span style={{ fontSize: 22, fontWeight: 700, color: '#F56C6C' }}>NT$ {parseInt(salePrice).toLocaleString()}</span>
                        <span style={{ fontSize: 13, color: '#909399', textDecoration: 'line-through' }}>{priceName} NT$ {parseInt(price).toLocaleString()}</span>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                        <span style={{ fontSize: 13, color: '#909399' }}>{priceName}</span>
                        <span style={{ fontSize: 20, fontWeight: 700, color: '#303133' }}>NT$ {parseInt(price).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Categories */}
                <div style={fieldS}>
                  <label style={labelS}>分類</label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                    {['3C 電子', '生活用品', '運動健身', '食品飲料', '配件'].map(c => (
                      <label key={c} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 13 }}>
                        <input type="checkbox" checked={categories.includes(c)} style={{ accentColor: '#303133' }}
                          onChange={e => setCategories(cats => e.target.checked ? [...cats, c] : cats.filter(x => x !== c))} />
                        {c}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div style={fieldS}>
                  <label style={labelS}>標籤</label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                    {tags.map(t => (
                      <span key={t} style={{ padding: '2px 10px 2px 8px', borderRadius: 9999, fontSize: 12, background: '#ecf5ff', color: '#409EFF', border: '1px solid #b3d8ff', display: 'flex', alignItems: 'center', gap: 4 }}>
                        {t}
                        <span style={{ cursor: 'pointer', color: '#409EFF', fontSize: 14 }} onClick={() => setTags(ts => ts.filter(x => x !== t))}>×</span>
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input style={{ ...inputS, width: 160 }} placeholder="新增標籤" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTag()} />
                    <button style={editBtn.plain} onClick={addTag}>+ 新增</button>
                  </div>
                </div>
              </div>

              {/* Images */}
              <div style={sectionS}>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>產品圖片</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24 }}>
                  <div>
                    <label style={labelS}>主圖 / 縮圖</label>
                    <div style={{ border: '2px dashed #DCDFE6', height: 160, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', background: '#FAFAFA' }}>
                      <div style={{ fontSize: 28, color: '#C0C4CC' }}>+</div>
                      <div style={{ fontSize: 12, color: '#909399' }}>上傳主圖</div>
                      <div style={{ fontSize: 11, color: '#C0C4CC' }}>建議尺寸 800×800</div>
                    </div>
                  </div>
                  <div>
                    <label style={labelS}>輪播圖（可多張）</label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {[0, 1, 2, 3].map(i => (
                        <div key={i} style={{ width: 80, height: 80, border: '1px dashed #DCDFE6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: '#FAFAFA', fontSize: 20, color: '#C0C4CC' }}>
                          {i === 0 ? '+' : '◫'}
                        </div>
                      ))}
                      <div style={{ fontSize: 11, color: '#909399', width: '100%', marginTop: 4 }}>
                        點擊新增輪播圖，桌面端 Hover 可切換、手機端可滑動
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Tab: Page Tabs ──────────────────────────── */}
          {activeTab === 'tabs' && (
            <div style={sectionS}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>頁籤內容</div>
              <div style={{ fontSize: 12, color: '#909399', marginBottom: 16 }}>可自訂頁籤名稱，每個頁籤下方為視覺化模組建構器（GrapeJS）</div>

              {/* Tab headers */}
              <div style={{ display: 'flex', gap: 0, flexWrap: 'wrap', marginBottom: 0 }}>
                {customTabs.map((t, i) => (
                  <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                    <div onClick={() => setCustomTabs(ts => ts.map(x => ({ ...x, active: x.id === t.id })))}
                      style={{ padding: '8px 16px', border: '1px solid #DCDFE6', borderBottom: t.active ? '1px solid #fff' : '1px solid #DCDFE6', background: t.active ? '#fff' : '#F5F7FA', cursor: 'pointer', fontSize: 13, marginBottom: t.active ? -1 : 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <input style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 13, width: 80, color: '#303133', fontFamily: 'inherit' }}
                        value={t.name} onChange={e => setCustomTabs(ts => ts.map(x => x.id === t.id ? { ...x, name: e.target.value } : x))} onClick={e => e.stopPropagation()} />
                      {customTabs.length > 1 && (
                        <span style={{ color: '#C0C4CC', cursor: 'pointer', fontSize: 14 }} onClick={e => { e.stopPropagation(); setCustomTabs(ts => ts.filter(x => x.id !== t.id)); }}>×</span>
                      )}
                    </div>
                  </div>
                ))}
                <button onClick={addCustomTab} style={{ padding: '8px 12px', border: '1px solid #DCDFE6', background: '#F5F7FA', cursor: 'pointer', fontSize: 12, color: '#606266', fontFamily: 'inherit' }}>+ 新增頁籤</button>
              </div>

              {/* Builder area */}
              <div style={{ border: '1px solid #DCDFE6', minHeight: 400, background: '#F5F7FA', position: 'relative' }}>
                <div style={{ background: '#fff', borderBottom: '1px solid #DCDFE6', padding: '8px 12px', display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: '#909399' }}>模組建構器</span>
                  <div style={{ display: 'flex', gap: 4, marginLeft: 8 }}>
                    {['規格表', '特色列表', '客戶評價', '圖文區塊', '影片'].map(m => (
                      <button key={m} style={{ padding: '3px 10px', border: '1px solid #DCDFE6', background: '#fff', fontSize: 11, cursor: 'pointer', color: '#606266', fontFamily: 'inherit' }}>+ {m}</button>
                    ))}
                  </div>
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
                    <button style={{ padding: '3px 10px', border: '1px solid #DCDFE6', background: '#fff', fontSize: 11, cursor: 'pointer', color: '#409EFF', fontFamily: 'inherit' }}>預覽</button>
                  </div>
                </div>

                {/* Mock builder canvas */}
                <div style={{ padding: 24 }}>
                  {/* Sample blocks */}
                  <BuilderBlock title="規格表" onDrag={() => {}} />
                  <BuilderBlock title="產品特色列表" empty onDrag={() => {}} />
                  <div style={{ border: '2px dashed #DCDFE6', padding: 20, textAlign: 'center', color: '#C0C4CC', fontSize: 13, marginTop: 8 }}>
                    拖曳上方模組至此處，或點擊「+ 模組名稱」新增
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Tab: Related Products ──────────────────── */}
          {activeTab === 'related' && (
            <div style={sectionS}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>相關產品推薦</div>
              <div style={{ fontSize: 12, color: '#909399', marginBottom: 20 }}>手動選擇最多 5 個相關產品，可拖曳調整排序</div>

              {/* Auto-recommend toggle */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#F5F7FA', border: '1px solid #DCDFE6', marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>
                    <span style={{ fontSize: 10, background: 'linear-gradient(135deg, #5B21B6, #EC4899)', color: '#fff', padding: '1px 6px', marginRight: 6 }}>AI</span>
                    啟用自動推薦
                  </div>
                  <div style={{ fontSize: 11, color: '#909399', marginTop: 2 }}>開啟後系統自動依同分類或熱門產品推薦（手動設定優先）</div>
                </div>
                <Toggle checked={autoRecommend} onChange={setAutoRecommend} />
              </div>

              {/* Selected list */}
              {relatedProducts.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  {relatedProducts.map((p, i) => (
                    <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', border: '1px solid #DCDFE6', background: '#fff', marginBottom: 6 }}>
                      <span style={{ color: '#C0C4CC', cursor: 'grab', fontSize: 14 }}>⠿</span>
                      <div style={{ width: 36, height: 36, background: '#F5F7FA', border: '1px solid #DCDFE6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C0C4CC', flexShrink: 0 }}>◫</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, color: '#303133' }}>{p.title}</div>
                        <div style={{ fontSize: 11, color: '#909399' }}>{p.id}</div>
                      </div>
                      <span style={{ fontSize: 12, color: '#909399' }}>{i + 1} / 5</span>
                      <button onClick={() => removeRelated(p.id)} style={{ background: 'none', border: 'none', color: '#F56C6C', cursor: 'pointer', fontSize: 13 }}>刪除</button>
                    </div>
                  ))}
                </div>
              )}

              {relatedProducts.length < 5 && (
                <div style={{ position: 'relative' }}>
                  <button style={{ ...editBtn.plain, width: '100%', height: 40, justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 6 }}
                    onClick={() => setShowRelSearch(!showRelSearch)}>
                    + 搜尋並新增相關產品（{relatedProducts.length}/5）
                  </button>

                  {showRelSearch && (
                    <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', border: '1px solid #DCDFE6', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                      <div style={{ padding: '8px 12px', borderBottom: '1px solid #EBEEF5' }}>
                        <input style={{ ...inputS, width: '100%' }} placeholder="請輸入產品名稱搜尋" value={relSearchQuery} onChange={e => setRelSearchQuery(e.target.value)} autoFocus />
                      </div>
                      {SAMPLE_PRODUCTS.filter(p => !relatedProducts.find(r => r.id === p.id) && (!relSearchQuery || p.title.includes(relSearchQuery))).map(p => (
                        <div key={p.id} onClick={() => addRelated(p)} style={{ padding: '10px 12px', cursor: 'pointer', display: 'flex', gap: 10, alignItems: 'center', borderBottom: '1px solid #EBEEF5' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#F5F7FA'}
                          onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
                          <div style={{ width: 28, height: 28, background: '#F5F7FA', border: '1px solid #DCDFE6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C0C4CC' }}>◫</div>
                          <div>
                            <div style={{ fontSize: 13 }}>{p.title}</div>
                            <div style={{ fontSize: 11, color: '#909399' }}>{p.id}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ── Tab: Purchase Link ─────────────────────── */}
          {activeTab === 'purchase' && (
            <div style={sectionS}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>購買連動設定</div>
              <div style={{ fontSize: 12, color: '#909399', marginBottom: 4, lineHeight: 1.7 }}>
                本系統<strong style={{ color: '#F56C6C' }}>嚴格禁止</strong>內建交易功能。請設定外部購買連結，前台將顯示導向按鈕。
              </div>
              <div style={{ background: '#fef0f0', border: '1px solid #fbc4c4', padding: '10px 14px', marginBottom: 20, fontSize: 12, color: '#F56C6C' }}>
                前台頁面禁止出現「加入購物車」「立即購買」「結帳」等交易性文字
              </div>

              {/* Mode selector */}
              <div style={{ marginBottom: 20 }}>
                <label style={labelS}>連動模式</label>
                <div style={{ display: 'flex', gap: 0 }}>
                  {[['url', '外部 URL'], ['ecommerce', '電商產品連動']].map(([v, l]) => (
                    <button key={v} onClick={() => setPurchaseMode(v)} style={{
                      flex: 1, height: 40, border: '1px solid #DCDFE6', borderRadius: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13,
                      background: purchaseMode === v ? '#303133' : '#fff',
                      color: purchaseMode === v ? '#fff' : '#606266',
                      marginRight: v === 'url' ? -1 : 0,
                    }}>{l}</button>
                  ))}
                </div>
              </div>

              {purchaseMode === 'url' && (
                <div style={fieldS}>
                  <label style={labelS}>外部購買連結 URL</label>
                  <input style={inputS} placeholder="https://your-shop.com/product/xxx" value={purchaseUrl} onChange={e => setPurchaseUrl(e.target.value)} />
                  <div style={{ fontSize: 11, color: '#909399', marginTop: 4 }}>點擊後以外部連結方式開啟</div>
                </div>
              )}

              {purchaseMode === 'ecommerce' && (
                <div style={fieldS}>
                  <label style={labelS}>新電商系統產品</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input style={{ ...inputS, flex: 1 }} placeholder="搜尋電商產品名稱或 SKU…" />
                    <button style={editBtn.plain}>搜尋</button>
                  </div>
                  <div style={{ border: '1px solid #DCDFE6', marginTop: 8 }}>
                    {[{ id: 'EC-001', title: '無線藍牙耳機 Pro Max', sku: 'BT-PRO-001' }, { id: 'EC-002', title: '無線藍牙耳機 Lite', sku: 'BT-LITE-001' }].map(p => (
                      <div key={p.id} style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #EBEEF5', cursor: 'pointer' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#F5F7FA'}
                        onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                        onClick={() => showToast(`已連動電商產品：${p.title}`)}>
                        <div style={{ width: 28, height: 28, background: '#F5F7FA', border: '1px solid #DCDFE6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C0C4CC' }}>◫</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13 }}>{p.title}</div>
                          <div style={{ fontSize: 11, color: '#909399' }}>SKU: {p.sku}</div>
                        </div>
                        <span style={{ fontSize: 12, color: '#409EFF' }}>選擇</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 11, color: '#909399', marginTop: 6 }}>透過 API 查詢電商系統產品，系統儲存電商產品 ID 並自動組合連結</div>
                </div>
              )}

              {/* Button label */}
              <div style={fieldS}>
                <label style={labelS}>前台按鈕文字</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['前往購買', '了解更多', '聯絡我們'].map(l => (
                    <button key={l} onClick={() => setPurchaseBtnLabel(l)} style={{
                      padding: '6px 16px', border: `1px solid ${purchaseBtnLabel === l ? '#303133' : '#DCDFE6'}`,
                      background: purchaseBtnLabel === l ? '#303133' : '#fff',
                      color: purchaseBtnLabel === l ? '#fff' : '#606266',
                      borderRadius: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13,
                    }}>{l}</button>
                  ))}
                  <input style={{ ...inputS, width: 120 }} placeholder="自訂文字" value={['前往購買','了解更多','聯絡我們'].includes(purchaseBtnLabel) ? '' : purchaseBtnLabel}
                    onChange={e => setPurchaseBtnLabel(e.target.value)} />
                </div>
              </div>

              {/* Preview */}
              <div style={{ background: '#F5F7FA', border: '1px solid #DCDFE6', padding: 16 }}>
                <div style={{ fontSize: 11, color: '#909399', marginBottom: 10 }}>前台按鈕預覽</div>
                <button style={{ padding: '10px 28px', background: '#303133', color: '#fff', border: 'none', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}>{purchaseBtnLabel} ↗</button>
              </div>
            </div>
          )}

          {/* ── Tab: Frontend Settings ─────────────────── */}
          {activeTab === 'frontend' && (
            <div style={sectionS}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>前台設定</div>

              {/* Search feature toggle */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>啟用前台條件搜尋</div>
                    <div style={{ fontSize: 12, color: '#909399', marginTop: 2 }}>開啟後可於前台產品列表提供搜尋與篩選功能</div>
                  </div>
                  <Toggle checked={frontendSearch} onChange={setFrontendSearch} />
                </div>

                {frontendSearch && (
                  <div style={{ border: '1px solid #DCDFE6', padding: 16 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>搜尋列樣式</div>
                    <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                      {[
                        { id: 'A', label: '樣式 A', desc: '摺疊按鈕，點選後展開（精簡）' },
                        { id: 'B', label: '樣式 B', desc: '列表上方全展開（直觀）' },
                      ].map(s => (
                        <div key={s.id} style={{ flex: 1, border: '1px solid #DCDFE6', padding: 12, cursor: 'pointer' }}>
                          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{s.label}</div>
                          <div style={{ fontSize: 11, color: '#909399' }}>{s.desc}</div>
                          <div style={{ height: 60, background: '#F5F7FA', marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#C0C4CC' }}>
                            {s.id === 'A' ? '[ 篩選 ▼ ]  [產品列表]' : '[分類 ▼][標籤 ▼][搜尋]'}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>可搜尋規格設定</div>
                    <div style={{ border: '1px solid #DCDFE6' }}>
                      {[{ name: '顏色', type: '多選' }, { name: '尺寸', type: '單選' }].map((spec, i) => (
                        <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 12px', borderBottom: '1px solid #EBEEF5', alignItems: 'center' }}>
                          <input style={{ ...inputS, width: 120 }} defaultValue={spec.name} />
                          <select style={{ height: 32, padding: '0 8px', border: '1px solid #DCDFE6', borderRadius: 0, fontSize: 13 }}>
                            <option>多選</option><option>單選</option><option>範圍</option>
                          </select>
                          <button style={{ background: 'none', border: 'none', color: '#F56C6C', cursor: 'pointer', fontSize: 13 }}>刪除</button>
                        </div>
                      ))}
                      <div style={{ padding: '8px 12px' }}>
                        <button style={{ ...editBtn.plain, height: 36, fontSize: 12 }}>+ 新增規格篩選</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div style={{ width: 240, flexShrink: 0 }}>
          {/* Status card */}
          <div style={{ background: '#fff', border: '1px solid #DCDFE6', padding: 16, marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>發布狀態</div>
            {STATUS_OPTIONS.map(s => (
              <label key={s.value} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', cursor: 'pointer', fontSize: 13 }}>
                <input type="radio" name="status" value={s.value} checked={status === s.value} onChange={e => setStatus(e.target.value)} style={{ accentColor: '#303133' }} />
                <span style={{ color: s.color, fontWeight: status === s.value ? 600 : 400 }}>{s.label}</span>
              </label>
            ))}
          </div>

          {/* History */}
          <div style={{ background: '#fff', border: '1px solid #DCDFE6', padding: 16, marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>版本歷程</div>
            {[
              { ver: 'v3', time: '04-09 14:22', status: '已發布' },
              { ver: 'v2', time: '04-07 09:10', status: '草稿' },
              { ver: 'v1', time: '04-05 11:00', status: '草稿' },
            ].map(h => (
              <div key={h.ver} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: '1px solid #EBEEF5', fontSize: 12 }}>
                <span style={{ color: '#409EFF', cursor: 'pointer' }}>{h.ver}</span>
                <span style={{ color: '#909399' }}>{h.time}</span>
                <span style={{ color: '#606266' }}>{h.status}</span>
              </div>
            ))}
          </div>

          {/* SEO */}
          <div style={{ background: '#fff', border: '1px solid #DCDFE6', padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>SEO 設定</div>
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 11, color: '#909399', display: 'block', marginBottom: 4 }}>Meta 標題</label>
              <input style={{ ...inputS, fontSize: 12 }} placeholder="留空則使用產品名稱" />
            </div>
            <div>
              <label style={{ fontSize: 11, color: '#909399', display: 'block', marginBottom: 4 }}>Meta 描述</label>
              <textarea style={{ ...inputS, height: 60, padding: '6px 10px', fontSize: 12, resize: 'none' }} placeholder="留空則使用產品簡述" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Helper Components ───────────────────────────────────────────────────────

function Toggle({ checked, onChange }) {
  return (
    <div onClick={() => onChange(!checked)} style={{
      width: 40, height: 22, borderRadius: 11, background: checked ? '#303133' : '#DCDFE6',
      cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0,
    }}>
      <div style={{
        width: 18, height: 18, borderRadius: '50%', background: '#fff',
        position: 'absolute', top: 2, left: checked ? 20 : 2, transition: 'left 0.2s',
      }} />
    </div>
  );
}

function BuilderBlock({ title, empty }) {
  return (
    <div style={{ border: '1px solid #DCDFE6', marginBottom: 8, background: '#fff' }}>
      <div style={{ background: '#F5F7FA', padding: '6px 12px', borderBottom: '1px solid #DCDFE6', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
        <span style={{ color: '#C0C4CC', cursor: 'grab' }}>⠿</span>
        <span style={{ fontWeight: 600, color: '#606266' }}>{title}</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button style={{ background: 'none', border: 'none', color: '#409EFF', cursor: 'pointer', fontSize: 11 }}>編輯</button>
          <button style={{ background: 'none', border: 'none', color: '#F56C6C', cursor: 'pointer', fontSize: 11 }}>刪除</button>
        </div>
      </div>
      {!empty ? (
        <div style={{ padding: 12, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[['驅動單元', '10mm 動圈'], ['頻率響應', '20Hz–20kHz'], ['藍牙版本', '5.3'], ['續航時間', '8H + 32H'], ['充電介面', 'USB-C'], ['防水等級', 'IPX4']].map(([k, v]) => (
            <div key={k} style={{ border: '1px solid #EBEEF5', padding: '6px 10px' }}>
              <div style={{ fontSize: 11, color: '#909399' }}>{k}</div>
              <div style={{ fontSize: 12, color: '#303133', marginTop: 2 }}>{v}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding: '20px', textAlign: 'center', color: '#C0C4CC', fontSize: 12 }}>點擊「編輯」新增內容</div>
      )}
    </div>
  );
}

const editBtn = {
  primary: { height: 40, padding: '0 20px', background: '#303133', color: '#fff', border: '1px solid #303133', borderRadius: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14 },
  plain: { height: 40, padding: '0 16px', background: '#fff', color: '#303133', border: '1px solid #DCDFE6', borderRadius: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14 },
};

Object.assign(window, { ProductEditPage, Toggle, BuilderBlock });
