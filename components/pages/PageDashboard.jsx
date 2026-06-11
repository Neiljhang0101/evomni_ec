// PageDashboard — 儀表板首頁
// 統一 Prototype 入口，提供系統各模組快速概覽與導覽

function PageDashboard({ onNavigate, demoState, onDemoChange }) {
  const [hasData, setHasData] = React.useState(true);

  const stats = [
    { label: '總產品數', value: '128', sub: '+3 本週新增', color: '#409EFF', page: 'product-list' },
    { label: '本月訂單', value: '47', sub: '較上月 +8%', color: '#67C23A', page: 'order-list' },
    { label: '本月成交金額（GMV）', value: 'NT$ 238,400', sub: '較上月 +12%', color: '#E6A23C', page: 'analytics-sales' },
    { label: '本月有消費的會員（30 天內有購買紀錄）', value: '1,284', sub: '本月新增 32', color: '#909399', page: 'customer-management' },
  ];

  const onboardingSteps = [
    { n: 1, title: '設定金物流', desc: '先設定收款與配送方式，訂單才能順利完成', page: 'gs-payment-logistics' },
    { n: 2, title: '新增第一個產品', desc: '上架產品後，消費者才能瀏覽與購買', page: 'add-product' },
    { n: 3, title: '建立產品分類', desc: '幫產品分類，讓消費者更容易找到商品', page: 'category-management' },
  ];

  const quickLinks = [
    { label: '產品管理', desc: '管理所有產品與庫存', page: 'product-list' },
    { label: '全部訂單', desc: '查看與處理訂單', page: 'order-list' },
    { label: '顧客管理', desc: '會員列表與分眾', page: 'customer-management' },
    { label: '優惠活動', desc: '折扣碼與促銷設定', page: 'marketing-promotions' },
    { label: '銷售概覽', desc: '數據分析報表', page: 'analytics-sales' },
    { label: '金物流串接', desc: '金流與物流廠商設定', page: 'gs-payment-logistics' },
  ];

  const ds = demoState || {};
  const activeTab   = ds.tab   || 'planA';
  const planAChecked = ds.planAChecked || { cms: false, ecommerce: true };
  const planBActive  = ds.planBActive  || 'ecommerce';

  const S = { border: '1px solid #DCDFE6', borderRadius: 2 };
  const btnBase = { border: 'none', cursor: 'pointer', fontSize: 12, fontFamily: 'Noto Sans TC,sans-serif', transition: 'background 0.15s, color 0.15s', padding: '4px 14px' };

  return (
    <div>
      {/* 示意控制面板 */}
      {onDemoChange && (
        <div style={{ background: '#fff', border: '1px solid #DCDFE6', borderLeft: '3px solid #409EFF', padding: '14px 16px', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 11, color: '#909399', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>左側選單方案示意</span>
            {/* Plan tab switcher */}
            <div style={{ display: 'flex', ...S, overflow: 'hidden' }}>
              {[{ k: 'planA', l: '方案一（複選）' }, { k: 'planB', l: '方案二（切換）' }].map(t => (
                <button key={t.k} onClick={() => onDemoChange({ tab: t.k })}
                  style={{ ...btnBase, background: activeTab === t.k ? '#303133' : '#fff', color: activeTab === t.k ? '#fff' : '#606266', fontWeight: activeTab === t.k ? 600 : 400 }}>
                  {t.l}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'planA' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <span style={{ fontSize: 12, color: '#606266' }}>勾選此網站啟用的功能模組：</span>
              <div style={{ display: 'flex', gap: 16 }}>
                {[{ k: 'cms', l: '品牌形象站' }, { k: 'ecommerce', l: '電商系統' }].map(opt => (
                  <label key={opt.k} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 13, color: '#303133', userSelect: 'none' }}>
                    <input type="checkbox" checked={!!planAChecked[opt.k]}
                      onChange={e => onDemoChange({ planAChecked: { ...planAChecked, [opt.k]: e.target.checked } })}
                      style={{ width: 14, height: 14, accentColor: '#409EFF', cursor: 'pointer' }} />
                    {opt.l}
                  </label>
                ))}
              </div>
              <span style={{ fontSize: 11, color: '#C0C4CC' }}>可複選——同時有形象站與電商的商家</span>
            </div>
          )}

          {activeTab === 'planB' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 12, color: '#606266' }}>目前編輯的網站：</span>
              <div style={{ display: 'flex', ...S, overflow: 'hidden' }}>
                {[{ k: 'cms', l: '品牌形象站' }, { k: 'ecommerce', l: '電商網站' }].map(opt => (
                  <button key={opt.k} onClick={() => onDemoChange({ planBActive: opt.k })}
                    style={{ ...btnBase, background: planBActive === opt.k ? '#409EFF' : '#fff', color: planBActive === opt.k ? '#fff' : '#606266', fontWeight: planBActive === opt.k ? 600 : 400 }}>
                    {opt.l}
                  </button>
                ))}
              </div>
              <span style={{ fontSize: 11, color: '#C0C4CC' }}>切換後側欄只顯示目前選取網站的功能</span>
            </div>
          )}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#303133' }}>儀表板</h1>
        <button
          onClick={() => setHasData(v => !v)}
          style={{ height: 28, padding: '0 12px', background: '#F5F7FA', color: '#909399', border: '1px solid #DCDFE6', borderRadius: 0, cursor: 'pointer', fontSize: 12, fontFamily: 'Noto Sans TC,sans-serif' }}
        >
          Prototype：切換為{hasData ? '零數據（首次開店）' : '有資料狀態'}
        </button>
      </div>

      {!hasData ? (
        <div style={{ background: '#fff', border: '1px solid #DCDFE6', padding: '40px 32px', borderRadius: 3, marginBottom: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#303133', marginBottom: 8 }}>歡迎使用 Evomni 電商後台</div>
          <div style={{ fontSize: 14, color: '#606266', marginBottom: 32, lineHeight: 1.8 }}>
            完成以下三個步驟，就能開始接受訂單了。
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
            {onboardingSteps.map((step, i) => (
              <React.Fragment key={step.n}>
                <div
                  onClick={() => onNavigate(step.page)}
                  style={{ background: '#F5F7FA', border: '1px solid #DCDFE6', padding: '24px 20px', cursor: 'pointer', textAlign: 'center', width: 190, transition: 'border-color 0.15s, box-shadow 0.15s', borderRadius: 3 }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#409EFF'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(64,158,255,0.15)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#DCDFE6'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ width: 28, height: 28, background: '#409EFF', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, margin: '0 auto 12px' }}>
                    {step.n}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#303133', marginBottom: 6 }}>{step.title}</div>
                  <div style={{ fontSize: 12, color: '#909399', lineHeight: 1.6 }}>{step.desc}</div>
                </div>
                {i < onboardingSteps.length - 1 && (
                  <div style={{ color: '#C0C4CC', fontSize: 22, padding: '0 12px', lineHeight: 1 }}>→</div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center', gap: 12 }}>
            <button
              onClick={() => onNavigate('gs-payment-logistics')}
              style={{ height: 40, padding: '0 24px', background: '#409EFF', color: '#fff', border: 'none', borderRadius: 0, cursor: 'pointer', fontSize: 14, fontWeight: 600, fontFamily: 'Noto Sans TC,sans-serif' }}
            >
              開始建立第一個產品 →
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
          {stats.map(s => (
            <div
              key={s.label}
              onClick={() => onNavigate(s.page)}
              style={{ background: '#fff', border: '1px solid #DCDFE6', padding: 24, borderRadius: 3, cursor: 'pointer', transition: 'border-color 0.15s, box-shadow 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#409EFF'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(64,158,255,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#DCDFE6'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ fontSize: 12, color: '#909399', marginBottom: 8 }}>{s.label}</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: s.color, marginBottom: 4 }}>{s.value}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 12, color: '#909399' }}>{s.sub}</div>
                <div style={{ fontSize: 12, color: '#409EFF' }}>查看詳情 →</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ background: '#fff', border: '1px solid #DCDFE6', padding: 24, marginBottom: 16, borderRadius: 3 }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>快速前往</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
          {quickLinks.map(item => (
            <div key={item.page} onClick={() => onNavigate(item.page)}
              style={{ padding: '16px', border: '1px solid #DCDFE6', borderRadius: 3, cursor: 'pointer', background: '#fff', transition: 'border-color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#409EFF'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#DCDFE6'}
            >
              <div style={{ fontWeight: 600, color: '#303133', marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 12, color: '#909399' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 前台 Prototype 頁面 */}
      <div style={{ background: '#fff', border: '1px solid #DCDFE6', padding: 24, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#303133', marginBottom: 2 }}>前台 Prototype 頁面</div>
            <div style={{ fontSize: 12, color: '#909399' }}>消費者端（前台）Prototype — 點擊在新分頁開啟</div>
          </div>
          <span style={{ padding: '2px 8px', background: '#F0F9EB', border: '1px solid #C2E7B0', color: '#67C23A', fontSize: 11, fontWeight: 600, letterSpacing: '0.04em' }}>STOREFRONT</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {[
            { label: '商品列表',     desc: '/products',       href: 'html/商品列表.html' },
            { label: '商品詳情',     desc: '/products/:slug', href: 'html/商品詳情.html' },
            { label: '購物車',       desc: '/cart',           href: 'html/購物車.html' },
            { label: '結帳頁',       desc: '/checkout',       href: 'html/結帳頁.html' },
            { label: '訂單確認頁',   desc: '/order/confirm',  href: 'html/訂單確認頁.html' },
            { label: '會員中心',     desc: '/account',        href: 'html/會員中心.html' },
            { label: '訪客訂單查詢', desc: '/order-query',    href: 'html/訪客訂單查詢.html' },
          ].map(item => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener"
              style={{ padding: '14px 16px', border: '1px solid #DCDFE6', background: '#fff', textDecoration: 'none', display: 'block', transition: 'border-color 0.15s, box-shadow 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#67C23A'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(103,194,58,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#DCDFE6'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, opacity: 0.4 }}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="#303133" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><polyline points="15 3 21 3 21 9" stroke="#303133" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><line x1="10" y1="14" x2="21" y2="3" stroke="#303133" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <div style={{ fontWeight: 600, color: '#303133', fontSize: 13 }}>{item.label}</div>
              </div>
              <div style={{ fontSize: 11, color: '#C0C4CC', fontFamily: 'SF Mono,Consolas,monospace', letterSpacing: '0.02em' }}>{item.desc}</div>
            </a>
          ))}
        </div>
      </div>

      <div style={{ background: '#F0F9EB', border: '1px solid #C2E7B0', padding: '12px 16px', fontSize: 13, color: '#67C23A' }}>
        Prototype 整合版本 — 所有模組已串接為單一入口，請透過左側導覽列切換頁面。
      </div>
    </div>
  );
}
