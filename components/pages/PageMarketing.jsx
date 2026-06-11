// PageMarketing — 行銷中心模組

// ─── Map internal page IDs → Sidebar child IDs ───────────────────────────────
const MARKETING_NAV_MAP = {
  'coupon-list':      'marketing-promotions',
  'coupon-new':       'marketing-promotions',
  'coupon-edit':      'marketing-promotions',
  'promotion-list':   'marketing-promotions',
  'promotion-new':    'marketing-promotions',
  'gift-items':       'gift-items',
  'gift-item-new':    'gift-items',
  'gift-item-edit':   'gift-items',
  'freeship-new':     'marketing-promotions',
  'gift-new':         'marketing-promotions',
  'flash-sale-new':   'marketing-promotions',
  'bundle-new':       'marketing-promotions',
  'journey-overview': 'marketing-journey',
  'journey-cart':     'marketing-journey',
  'journey-sleep':    'marketing-journey',
  'journey-loss':     'marketing-journey',
  'journey-post':     'marketing-journey',
  'journey-expiry':   'marketing-journey',
  'line-oa':          'marketing-journey',
  'push-logs':        'marketing-journey',
  'marketing-landing':    'marketing-landing',
  'lp-create-step1':      'marketing-landing',
  'lp-create-step2':      'marketing-landing',
  'lp-create-step3':      'marketing-landing',
  'lp-create-step4':      'marketing-landing',
  'lp-detail-v2':         'marketing-landing',
};
Object.assign(NAV_GROUP_MAP, Object.fromEntries(
  Object.keys(MARKETING_NAV_MAP).map(k => [k, 'marketing'])
));


// ─── Sample Data ──────────────────────────────────────────────────────────────
// Status: active=進行中 / scheduled=未開始 / expired=已到期 / disabled=已停用
const COUPONS = [
  { id: 1, code: 'SUMMER20', name: '夏日折扣碼',   discountType: 'percent', type: 'discount_code', discount: '八折（20%）', condition: '滿 NT$1,000', used: 42,  total: 100,  start: '2026-06-01', end: '2026-08-31', status: 'active' },
  { id: 2, code: '—',        name: '新會員歡迎券', discountType: 'fixed',   type: 'auto',          discount: 'NT$150',       condition: '無門檻',       used: 128, total: null, start: '2026-01-01', end: '2026-12-31', status: 'active' },
  { id: 3, code: 'VIP2026',  name: 'VIP 專屬優惠', discountType: 'percent', type: 'discount_code', discount: '九折（10%）',   condition: '滿 NT$3,000', used: 15,  total: 50,   start: '2026-01-01', end: '2026-03-31', status: 'expired' },
  { id: 4, code: 'FLASH100', name: '閃購折扣',     discountType: 'fixed',   type: 'discount_code', discount: 'NT$100',       condition: '滿 NT$500',   used: 0,   total: 200,  start: '2026-07-01', end: '2026-07-07', status: 'scheduled' },
  { id: 5, code: 'FREESHIP', name: '週末免運優惠', discountType: 'freeship',type: 'discount_code', discount: '免運費',       condition: '無門檻',       used: 0,   total: null, start: '2026-08-01', end: '2026-08-31', status: 'disabled' },
];
const COUPON_STATUS = {
  active:    { label: '進行中', type: 'success' },
  scheduled: { label: '未開始', type: 'warning' },
  expired:   { label: '已到期', type: 'danger'  },
  disabled:  { label: '已停用', type: 'info'    },
};

const PROMOTIONS = [
  { id: 1, name: '滿千送好禮',   type: 'gift',     condition: '滿 NT$1,000', benefit: '加贈指定品項', start: '2026-06-01', end: '2026-08-31', status: 'scheduled' },
  { id: 2, name: '消費滿額免運', type: 'freeship', condition: '滿 NT$500',   benefit: '免運費',       start: '2026-01-01', end: '2026-12-31', status: 'active' },
  { id: 3, name: '滿三件八五折', type: 'discount', condition: '滿 3 件',     benefit: '85 折',        start: '2026-05-01', end: '2026-05-31', status: 'expired' },
  { id: 4, name: '加購優惠組',   type: 'addon',    condition: '任意產品',    benefit: '加購價 NT$99', start: '2026-06-01', end: '2026-09-30', status: 'active' },
];
const PROMO_STATUS = {
  active:    { label: '進行中', type: 'success' },
  scheduled: { label: '未開始', type: 'warning' },
  expired:   { label: '已結束', type: 'danger'  },
  disabled:  { label: '草稿',   type: 'info'    },
};

const UNIFIED_DISCOUNTS = [
  { id: 'c1', name: '夏日折扣碼',   code: 'SUMMER20', category: 'coupon',   condition: '滿 NT$1,000', benefit: '八折（20%）',    start: '2026-06-01', end: '2026-08-31', status: 'active'    },
  { id: 'c2', name: '新會員歡迎券', code: '—',         category: 'auto',     condition: '無門檻',       benefit: 'NT$150 折抵',   start: '2026-01-01', end: '2026-12-31', status: 'active'    },
  { id: 'c3', name: 'VIP 專屬優惠', code: 'VIP2026',  category: 'coupon',   condition: '滿 NT$3,000', benefit: '九折（10%）',    start: '2026-01-01', end: '2026-03-31', status: 'ended'     },
  { id: 'c4', name: '閃購折扣',     code: 'FLASH100', category: 'coupon',   condition: '滿 NT$500',   benefit: 'NT$100 折抵',   start: '2026-07-01', end: '2026-07-07', status: 'scheduled' },
  { id: 'c5', name: '週末免運優惠', code: 'FREESHIP', category: 'coupon',   condition: '無門檻',       benefit: '免運費',         start: '2026-08-01', end: '2026-08-31', status: 'draft'     },
  { id: 'p1', name: '滿千送好禮',   code: '—',         category: 'gift',     condition: '滿 NT$1,000', benefit: '加贈指定品項',   start: '2026-06-01', end: '2026-08-31', status: 'scheduled' },
  { id: 'p2', name: '消費滿額免運', code: '—',         category: 'freeship', condition: '滿 NT$500',   benefit: '免運費',         start: '2026-01-01', end: '2026-12-31', status: 'active'    },
  { id: 'p3', name: '滿三件八五折', code: '—',         category: 'discount', condition: '滿 3 件',     benefit: '85 折',          start: '2026-05-01', end: '2026-05-31', status: 'ended'     },
  { id: 'p4', name: '加購優惠組',   code: '—',         category: 'addon',    condition: '任意產品',    benefit: '加購價 NT$99',   start: '2026-06-01', end: '2026-09-30', status: 'active'    },
];
const UNIFIED_STATUS = {
  draft:     { label: '草稿',   type: 'info'    },
  scheduled: { label: '排程',   type: 'warning' },
  active:    { label: '進行中', type: 'success' },
  ended:     { label: '已結束', type: 'info'    },
};
const UNIFIED_CAT_LABEL = {
  coupon: '折扣碼', auto: '自動折扣', gift: '贈品活動',
  freeship: '免運活動', discount: '折扣活動', flash: '限時折扣',
  addon: '加購活動', bundle: '組合優惠',
};

const PUSH_LOGS_DATA = [
  { id: 1, sentAt: '2026-05-12', journey: '購物車未結帳挽回', channel: 'LINE',  targets: 48,  success: 45,  failed: 3, rate: '22.2%', conversion: '9 人（20.0%）' },
  { id: 2, sentAt: '2026-05-11', journey: '沉睡客喚醒',       channel: 'Email', targets: 120, success: 115, failed: 5, rate: '34.8%', conversion: '14 人（12.2%）' },
  { id: 3, sentAt: '2026-05-10', journey: '購後推薦再行銷',   channel: 'LINE',  targets: 132, success: 130, failed: 2, rate: '24.6%', conversion: '18 人（13.8%）' },
  { id: 4, sentAt: '2026-05-08', journey: '點數到期提醒',     channel: 'Email', targets: 85,  success: 83,  failed: 2, rate: '41.0%', conversion: '22 人（26.5%）' },
  { id: 5, sentAt: '2026-05-05', journey: '流失客挽留',       channel: 'Email', targets: 60,  success: 58,  failed: 2, rate: '28.3%', conversion: '6 人（10.3%）' },
];

function SortableHeader({ label, field, sort, onSort }) {
  const active = sort.field === field;
  return (
    <span onClick={() => onSort(field)} style={{ cursor: 'pointer', userSelect: 'none', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
      {label}
      <span style={{ fontSize: 10, color: active ? '#409EFF' : '#C0C4CC' }}>{active ? (sort.dir === 'asc' ? '↑' : '↓') : '↕'}</span>
    </span>
  );
}

function InfoTooltip({ content }) {
  const [show, setShow] = React.useState(false);
  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <span onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}
        style={{ width: 15, height: 15, borderRadius: '50%', border: '1px solid #C0C4CC', color: '#909399', fontSize: 10, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'help', marginLeft: 4, flexShrink: 0 }}>i</span>
      {show && (
        <div style={{ position: 'absolute', bottom: '130%', left: '50%', transform: 'translateX(-50%)', background: '#303133', color: '#fff', fontSize: 12, padding: '8px 12px', width: 260, zIndex: 200, lineHeight: 1.6, whiteSpace: 'normal', borderRadius: 2 }}>
          {content}
        </div>
      )}
    </span>
  );
}

function MktEmptyState({ icon = '', title, sub, ctaLabel, onCta }) {
  return (
    <div style={{ padding: '60px 20px', textAlign: 'center', color: '#909399' }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontSize: 16, fontWeight: 600, color: '#303133', marginBottom: 8 }}>{title}</div>
      {sub && <div style={{ fontSize: 13, color: '#909399', marginBottom: 20, maxWidth: 360, margin: '0 auto 20px' }}>{sub}</div>}
      {ctaLabel && onCta && <EvoBtn variant="primary" onClick={onCta}>{ctaLabel}</EvoBtn>}
    </div>
  );
}


// 進階電商包 lock banner
function AdvancedBanner() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: '#FDF6EC', border: '1px solid #F5DAB1', marginBottom: 16, fontSize: 13, borderRadius: 3 }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{display:"inline-block",verticalAlign:"middle"}}><rect x="2" y="6.5" width="10" height="7" rx="0" stroke="#E6A23C" strokeWidth="1.4"/><path d="M4 6.5V4.5a3 3 0 0 1 6 0v2" stroke="#E6A23C" strokeWidth="1.4" strokeLinecap="round"/></svg>
      <span style={{ color: '#E6A23C' }}>此功能需升級至<strong>進階電商包</strong>才能使用。</span>
      <EvoBtn variant="secondary" size="sm" style={{ marginLeft: 'auto' }}>了解方案</EvoBtn>
    </div>
  );
}

// 進階 badge for tabs
function AdvBadge() {
  return (
    <span style={{ fontSize: 10, background: '#E6A23C', color: '#fff', padding: '1px 5px', borderRadius: 2, marginLeft: 4, fontWeight: 600, verticalAlign: 'middle' }}>進階</span>
  );
}

// ─── 發布狀態欄位（所有優惠表單共用）────────────────────────────────────────
function PublishStatusField({ enabled, onChangeEnabled, startDate, endDate }) {
  const today = '2026-05-21';
  let statusKey = 'draft';
  let msg = '儲存後不對外顯示，可隨時切換為發布。';
  if (enabled) {
    if (endDate && endDate < today) {
      statusKey = 'ended';
      msg = '活動結束日期已過，此優惠不會顯示給顧客。';
    } else if (!startDate || startDate <= today) {
      statusKey = 'active';
      msg = '發布後立即生效，顧客結帳時可直接套用。';
    } else {
      statusKey = 'scheduled';
      msg = `將於 ${startDate} 自動生效，屆時系統會自動套用此優惠。`;
    }
  }
  const st = UNIFIED_STATUS[statusKey];
  const bg = { draft: '#F5F7FA', scheduled: '#FDF6EC', active: '#F0F9EB', ended: '#F5F7FA' };
  const br = { draft: '#EBEEF5', scheduled: '#F5DAB1', active: '#B3E19D', ended: '#EBEEF5' };
  return (
    <FormField label="發布狀態">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <Switch checked={enabled} onChange={onChangeEnabled} />
        <span style={{ fontSize: 13, color: '#606266' }}>{enabled ? '發布' : '草稿'}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: bg[statusKey], border: `1px solid ${br[statusKey]}`, fontSize: 13 }}>
        <StatusTag type={st.type}>{st.label}</StatusTag>
        <span style={{ color: '#606266' }}>{msg}</span>
      </div>
    </FormField>
  );
}

// ─── 優惠類型選擇 Dialog ──────────────────────────────────────────────────────
function DiscountTypePickerDialog({ open, onClose, onNavigate }) {
  const types = [
    {
      id: 'coupon-new',
      label: '優惠券',
      desc: '建立折扣碼或自動折扣，結帳時輸入代碼或自動套用優惠',
    },
    {
      id: 'freeship-new',
      label: '免運活動',
      desc: '達到消費門檻（滿額或滿件）自動免除本次訂單運費',
    },
    {
      id: 'gift-new',
      label: '贈品活動',
      desc: '達到消費門檻（滿額或滿件）自動加贈指定品項',
    },
    {
      id: 'promotion-new',
      label: '折扣活動',
      desc: '訂單達金額或件數門檻自動折扣，支援多階梯設定（最多 5 組）',
    },
    {
      id: 'flash-sale-new',
      label: '限時折扣',
      desc: '指定商品期間限時特價，製造搶購氛圍',
      pro: true,
    },
    {
      id: 'bundle-new',
      label: '組合優惠',
      desc: '搭配購買享專屬折扣，有效提升客單價',
      pro: true,
    },
  ];

  return (
    <Dialog open={open} onClose={onClose} title="選擇優惠類型" width={500}>
      <div style={{ margin: '0 -24px -24px', borderTop: '1px solid #EBEEF5' }}>
        {types.map((t, i) => (
          <div
            key={t.id}
            onClick={() => { onNavigate(t.id); onClose(); }}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '16px 24px',
              borderBottom: i < types.length - 1 ? '1px solid #EBEEF5' : 'none',
              cursor: 'pointer', background: '#fff',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#F5F7FA'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#303133', display: 'flex', alignItems: 'center', gap: 6 }}>
                {t.label}
                {t.pro && <AdvBadge />}
              </div>
              <div style={{ fontSize: 12, color: '#909399', marginTop: 3 }}>{t.desc}</div>
            </div>
            <i className="ri-arrow-right-s-line" style={{ color: '#C0C4CC', fontSize: 20, flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </Dialog>
  );
}

// ─── SCREEN 0: 優惠活動統一列表 ──────────────────────────────────────────────
function UnifiedDiscountListPage({ onNavigate, show }) {
  const [tab, setTab] = React.useState('all');
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('');
  const [sort, setSort] = React.useState({ field: 'start', dir: 'desc' });
  const [page, setPage] = React.useState(1);
  const pageSize = 20;
  const [typePickerOpen, setTypePickerOpen] = React.useState(false);
  const [disableTarget, setDisableTarget] = React.useState(null);
  const [selectedIds, setSelectedIds] = React.useState(new Set());
  const [expandedAll, setExpandedAll] = React.useState(false);
  const [batchAction, setBatchAction] = React.useState(null);
  const [batchCapMode, setBatchCapMode] = React.useState('shared');
  const [sharedCapVal, setSharedCapVal] = React.useState('');

  const handleSort = f => setSort(s => ({ field: f, dir: s.field === f && s.dir === 'asc' ? 'desc' : 'asc' }));

  const TAB_CATS = {
    all:      null,
    coupon:   ['coupon', 'auto'],
    freeship: ['freeship'],
    gift:     ['gift'],
    discount: ['discount'],
    flash:    ['flash'],
    bundle:   ['bundle'],
  };

  const filtered = UNIFIED_DISCOUNTS.filter(d => {
    const cats = TAB_CATS[tab];
    if (cats && !cats.includes(d.category)) return false;
    if (statusFilter && d.status !== statusFilter) return false;
    if (search && !d.name.includes(search) && !d.code.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    const dir = sort.dir === 'asc' ? 1 : -1;
    if (a[sort.field] < b[sort.field]) return -dir;
    if (a[sort.field] > b[sort.field]) return dir;
    return 0;
  });

  const CAP = 500;
  const pageItems = sorted.slice((page - 1) * pageSize, page * pageSize);
  const pageIds = pageItems.map(d => d.id);
  const allPageChecked = pageIds.length > 0 && pageIds.every(id => selectedIds.has(id));
  const somePageChecked = !allPageChecked && pageIds.some(id => selectedIds.has(id));
  const effectiveTotal = Math.min(sorted.length, CAP);

  React.useEffect(() => { setSelectedIds(new Set()); setExpandedAll(false); }, [tab, search, statusFilter, page]);

  return (
    <div>
      <PageHeader title="優惠活動" breadcrumbs={['行銷中心', '優惠活動']} />
      <div style={{ background: '#ECF5FF', border: '1px solid #b3d8ff', borderRadius: 3, padding: '10px 16px', display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, marginBottom: 16 }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
          <circle cx="7" cy="7" r="6" stroke="#409EFF" strokeWidth="1.2"/><line x1="7" y1="6" x2="7" y2="10" stroke="#409EFF" strokeWidth="1.2" strokeLinecap="round"/><circle cx="7" cy="4.5" r="0.6" fill="#409EFF"/>
        </svg>
        <span style={{ color: '#606266', lineHeight: 1.8 }}>系統依照固定優先序自動套用各層折扣（產品折扣→訂單折扣→贈品→優惠券→點數），同一層取最優惠者，跨層可疊加。<a href="html/優惠計算流程圖.html" target="_blank" rel="noopener noreferrer" style={{ color: '#409EFF', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.textDecoration='underline'} onMouseLeave={e => e.currentTarget.style.textDecoration='none'}>查看完整優惠計算流程圖</a></span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginBottom: 16 }}>
        <EvoBtn variant="secondary">匯出報表</EvoBtn>
        <EvoBtn variant="primary" onClick={() => setTypePickerOpen(true)}>＋ 新增優惠</EvoBtn>
      </div>

      <TabSearchBar
        tabs={[
          { key: 'all',      label: '全部',    count: UNIFIED_DISCOUNTS.length },
          { key: 'coupon',   label: '折扣碼',  count: UNIFIED_DISCOUNTS.filter(d => ['coupon','auto'].includes(d.category)).length },
          { key: 'freeship', label: '免運活動', count: UNIFIED_DISCOUNTS.filter(d => d.category === 'freeship').length },
          { key: 'gift',     label: '贈品活動', count: UNIFIED_DISCOUNTS.filter(d => d.category === 'gift').length },
          { key: 'discount', label: '折扣活動', count: UNIFIED_DISCOUNTS.filter(d => d.category === 'discount').length },
          { key: 'flash',    label: <span>限時折扣<AdvBadge /></span> },
          { key: 'bundle',   label: <span>組合優惠<AdvBadge /></span> },
        ]}
        activeTab={tab} onTabChange={t => { setTab(t); setPage(1); }}
      >
        <div style={{ padding: '12px 16px', display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <EInput value={search} onChange={setSearch} placeholder="搜尋優惠名稱或折扣碼..." style={{ width: 240 }} />
          <ESelect value={statusFilter} onChange={v => { setStatusFilter(v); setPage(1); }} width={140} placeholder="全部狀態"
            options={[
              { value: 'draft',     label: '草稿'   },
              { value: 'scheduled', label: '排程'   },
              { value: 'active',    label: '進行中' },
              { value: 'ended',     label: '已結束' },
            ]}
          />
          {(search || statusFilter) && (
            <EvoBtn variant="secondary" onClick={() => { setSearch(''); setStatusFilter(''); }}>清除篩選</EvoBtn>
          )}
        </div>
      </TabSearchBar>

      {allPageChecked && !expandedAll && sorted.length > pageSize && (
        <div style={{ background: '#EBF5FF', border: '1px solid #b3d8ff', borderRadius: 3, padding: '8px 16px', marginBottom: 8, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>已選取本頁 <strong>{pageIds.length}</strong> 筆。</span>
          <a href="#" onClick={e => { e.preventDefault(); setExpandedAll(true); setSelectedIds(new Set(sorted.slice(0, CAP).map(d => d.id))); }}
            style={{ color: '#409EFF', textDecoration: 'none' }}>
            選取全部符合條件的 {effectiveTotal} 筆{sorted.length > CAP ? `（已達 ${CAP} 筆上限）` : ''}
          </a>
        </div>
      )}
      {expandedAll && (
        <div style={{ background: '#EBF5FF', border: '1px solid #b3d8ff', borderRadius: 3, padding: '8px 16px', marginBottom: 8, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>已選取全部 <strong>{effectiveTotal}</strong> 筆。</span>
          {sorted.length > CAP && <span style={{ color: '#E6A23C' }}>（筆數超過 {CAP} 筆上限，僅處理前 {CAP} 筆）</span>}
          <a href="#" onClick={e => { e.preventDefault(); setExpandedAll(false); setSelectedIds(new Set()); }}
            style={{ color: '#909399', textDecoration: 'none', marginLeft: 4 }}>取消全選</a>
        </div>
      )}
      {selectedIds.size > 0 && (
        <div style={{ background: '#fff', border: '1px solid #EBEEF5', borderRadius: 3, padding: '8px 16px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12, fontSize: 13 }}>
          <span style={{ color: '#606266' }}>已選取 <strong style={{ color: '#303133' }}>{selectedIds.size}</strong> 筆</span>
          <div style={{ flex: 1 }} />
          <EvoBtn variant="secondary" size="sm" onClick={() => setBatchAction('disable')}>批次停用</EvoBtn>
          <EvoBtn variant="secondary" size="sm" onClick={() => setBatchAction('setcap')}>批次設定使用上限</EvoBtn>
          <EvoBtn variant="secondary" size="sm" onClick={() => { setSelectedIds(new Set()); setExpandedAll(false); }}>× 清除選取</EvoBtn>
        </div>
      )}

      {sorted.length === 0 ? (
        <MktEmptyState title="目前沒有符合條件的優惠活動" sub="試試調整篩選條件，或新增一個優惠活動。" ctaLabel="＋ 新增優惠" onCta={() => setTypePickerOpen(true)} />
      ) : (
        <>
          <TableWrapper>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr>
                  <th style={{ ...tableThStyle, width: 40, textAlign: 'center', padding: '8px 0' }}>
                    <input type="checkbox"
                      checked={allPageChecked}
                      ref={el => { if (el) el.indeterminate = somePageChecked; }}
                      onChange={e => {
                        if (e.target.checked) {
                          setSelectedIds(s => { const n = new Set(s); pageIds.forEach(id => n.add(id)); return n; });
                        } else {
                          setSelectedIds(s => { const n = new Set(s); pageIds.forEach(id => n.delete(id)); return n; });
                          setExpandedAll(false);
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    />
                  </th>
                  <th style={tableThStyle}><SortableHeader label="名稱" field="name" sort={sort} onSort={handleSort} /></th>
                  <th style={tableThStyle}>折扣碼</th>
                  <th style={tableThStyle}>類型</th>
                  <th style={tableThStyle}>適用條件</th>
                  <th style={tableThStyle}>優惠內容</th>
                  <th style={tableThStyle}><SortableHeader label="開始日期" field="start" sort={sort} onSort={handleSort} /></th>
                  <th style={tableThStyle}><SortableHeader label="結束日期" field="end" sort={sort} onSort={handleSort} /></th>
                  <th style={tableThStyle}>狀態</th>
                  <th style={tableThStyle}>操作</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((d, i) => {
                  const st = UNIFIED_STATUS[d.status];
                  return (
                    <tr key={d.id} style={{ background: i % 2 === 0 ? '#fff' : '#FAFAFA' }}>
                      <td style={{ ...tableTdStyle, width: 40, textAlign: 'center', padding: '8px 0' }}>
                        <input type="checkbox"
                          checked={selectedIds.has(d.id)}
                          onChange={e => {
                            setSelectedIds(s => {
                              const n = new Set(s);
                              if (e.target.checked) n.add(d.id);
                              else { n.delete(d.id); setExpandedAll(false); }
                              return n;
                            });
                          }}
                          style={{ cursor: 'pointer' }}
                        />
                      </td>
                      <td style={tableTdStyle}>
                        <span style={{ fontWeight: 500, color: '#409EFF', cursor: 'pointer' }}
                          onClick={() => onNavigate('coupon-edit')}>{d.name}</span>
                      </td>
                      <td style={{ ...tableTdStyle, fontFamily: 'monospace', fontSize: 13, color: d.code === '—' ? '#C0C4CC' : '#303133' }}>{d.code}</td>
                      <td style={tableTdStyle}>
                        <span style={{ fontSize: 12, color: '#606266', background: '#F5F7FA', border: '1px solid #EBEEF5', padding: '2px 8px', borderRadius: 9999, whiteSpace: 'nowrap' }}>
                          {UNIFIED_CAT_LABEL[d.category]}
                        </span>
                      </td>
                      <td style={tableTdStyle}>{d.condition}</td>
                      <td style={tableTdStyle}>{d.benefit}</td>
                      <td style={tableTdStyle}>{d.start}</td>
                      <td style={tableTdStyle}>{d.end}</td>
                      <td style={tableTdStyle}><StatusTag type={st.type}>{st.label}</StatusTag></td>
                      <td style={tableTdStyle}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <EvoBtn variant="secondary" size="sm" onClick={() => onNavigate('coupon-edit')}>編輯</EvoBtn>
                          {(d.status === 'active' || d.status === 'scheduled') && (
                            <EvoBtn variant="secondary" size="sm" onClick={() => setDisableTarget(d)}>停用</EvoBtn>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TableWrapper>
          <Pagination current={page} total={sorted.length} pageSize={pageSize} onChange={setPage} />
        </>
      )}

      <DiscountTypePickerDialog open={typePickerOpen} onClose={() => setTypePickerOpen(false)} onNavigate={onNavigate} />

      <AdminModal open={!!disableTarget} onClose={() => setDisableTarget(null)} title="停用優惠活動"
        confirmLabel="確定停用" onConfirm={() => { show('優惠活動已停用，狀態回到草稿', 'warning'); setDisableTarget(null); }}>
        <p style={{ marginBottom: 8 }}>確定停用「{disableTarget?.name}」？</p>
        <p style={{ fontSize: 13, color: '#909399' }}>停用後此優惠將立即失效，狀態將改為草稿，可重新編輯後再發布。</p>
      </AdminModal>

      <AdminModal open={batchAction === 'disable'} onClose={() => setBatchAction(null)} title="批次停用優惠活動"
        confirmLabel="確定停用" onConfirm={() => {
          show(`已批次停用 ${selectedIds.size} 筆優惠活動，狀態回到草稿`, 'warning');
          setSelectedIds(new Set()); setExpandedAll(false); setBatchAction(null);
        }}>
        <p style={{ marginBottom: 8 }}>確定停用已選取的 <strong>{selectedIds.size}</strong> 筆優惠活動？</p>
        <p style={{ fontSize: 13, color: '#909399' }}>停用後這些優惠將立即失效，狀態將改為草稿，可重新編輯後再發布。</p>
      </AdminModal>

      <AdminModal open={batchAction === 'setcap'} onClose={() => { setBatchAction(null); setSharedCapVal(''); setBatchCapMode('shared'); }} title="批次設定使用上限"
        confirmLabel="確認套用" onConfirm={() => {
          show(`已套用使用上限設定至 ${selectedIds.size} 筆優惠活動`, 'success');
          setSelectedIds(new Set()); setExpandedAll(false); setBatchAction(null); setSharedCapVal(''); setBatchCapMode('shared');
        }}>
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: 'inline-flex', border: '1px solid #DCDFE6', borderRadius: 3, overflow: 'hidden', marginBottom: 16 }}>
            <button onClick={() => setBatchCapMode('shared')} style={{ padding: '6px 20px', fontSize: 13, border: 'none', cursor: 'pointer', background: batchCapMode === 'shared' ? '#409EFF' : '#fff', color: batchCapMode === 'shared' ? '#fff' : '#606266', fontFamily: 'Noto Sans TC, sans-serif' }}>共用上限</button>
            <button onClick={() => setBatchCapMode('individual')} style={{ padding: '6px 20px', fontSize: 13, border: 'none', borderLeft: '1px solid #DCDFE6', cursor: 'pointer', background: batchCapMode === 'individual' ? '#409EFF' : '#fff', color: batchCapMode === 'individual' ? '#fff' : '#606266', fontFamily: 'Noto Sans TC, sans-serif' }}>指定值</button>
          </div>
          {batchCapMode === 'shared' ? (
            <div>
              <p style={{ fontSize: 13, color: '#606266', marginBottom: 10 }}>將已選取的 <strong>{selectedIds.size}</strong> 筆優惠活動的使用上限統一設定為：</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="number" min="1" value={sharedCapVal} onChange={e => setSharedCapVal(e.target.value)} placeholder="輸入次數"
                  style={{ width: 120, height: 32, border: '1px solid #DCDFE6', borderRadius: 3, padding: '0 10px', fontSize: 13, color: '#303133', fontFamily: 'Noto Sans TC, sans-serif', outline: 'none' }} />
                <span style={{ fontSize: 13, color: '#606266' }}>次</span>
                <EvoBtn variant="secondary" size="sm" onClick={() => setSharedCapVal('')}>不限制</EvoBtn>
              </div>
              <p style={{ fontSize: 12, color: '#909399', marginTop: 6 }}>留空表示不限制使用次數。</p>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: 13, color: '#606266', marginBottom: 10 }}>為每筆優惠活動分別設定使用上限：</p>
              <div style={{ background: '#F5F7FA', border: '1px solid #EBEEF5', borderRadius: 3, padding: '10px 14px', fontSize: 13, color: '#909399', textAlign: 'center' }}>
                已選取 {selectedIds.size} 筆，逐筆設定上限（正式版提供逐筆輸入欄位，Prototype 示意）
              </div>
            </div>
          )}
        </div>
      </AdminModal>
    </div>
  );
}

// ─── SCREEN 1: 優惠券管理（列表）────────────────────────────────────────────
function CouponListPage({ onNavigate, show }) {
  const [tab, setTab] = React.useState('all');
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('');
  const [typeFilter, setTypeFilter] = React.useState('');
  const [sort, setSort] = React.useState({ field: 'start', dir: 'desc' });
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(20);
  const [disableTarget, setDisableTarget] = React.useState(null);
  const handleSort = f => setSort(s => ({ field: f, dir: s.field === f && s.dir === 'asc' ? 'desc' : 'asc' }));

  const filtered = COUPONS.filter(c => {
    if (tab === 'discount_code' && c.type !== 'discount_code') return false;
    if (tab === 'auto' && c.type !== 'auto') return false;
    if (statusFilter && c.status !== statusFilter) return false;
    if (typeFilter && c.discountType !== typeFilter) return false;
    if (search && !c.name.includes(search) && !c.code.includes(search)) return false;
    return true;
  });

  const discountTypeLabel = { percent: '百分比折扣', fixed: '固定金額折扣', freeship: '免運費折扣' };

  return (
    <div>
      <PageHeader title="優惠券管理" breadcrumbs={['行銷中心', '優惠活動', '優惠券管理']} />
      <div style={{ background: '#ECF5FF', border: '1px solid #b3d8ff', borderRadius: 3, padding: '10px 16px', display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, marginBottom: 16 }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
          <circle cx="7" cy="7" r="6" stroke="#409EFF" strokeWidth="1.2"/><line x1="7" y1="6" x2="7" y2="10" stroke="#409EFF" strokeWidth="1.2" strokeLinecap="round"/><circle cx="7" cy="4.5" r="0.6" fill="#409EFF"/>
        </svg>
        <span style={{ color: '#606266', lineHeight: 1.8 }}><strong style={{ color: '#303133' }}>優惠券 vs 促銷活動的差別：</strong>優惠券需要消費者在結帳時輸入專屬代碼才能使用。促銷活動則是自動套用，消費者達到條件（如滿額、滿件）就直接享有折扣，不需輸入任何代碼。</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <a href="html/優惠計算流程圖.html" target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#409EFF', textDecoration: 'none', fontWeight: 500 }}
          onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
          onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="#409EFF" strokeWidth="1.4"/>
            <path d="M7 6.5v3.5" stroke="#409EFF" strokeWidth="1.4" strokeLinecap="round"/>
            <circle cx="7" cy="4.5" r="0.75" fill="#409EFF"/>
          </svg>
          了解優惠計算優先序
        </a>
        <div style={{ display: 'flex', gap: 8 }}>
          <EvoBtn variant="secondary">匯出報表</EvoBtn>
          <EvoBtn variant="primary" onClick={() => onNavigate('coupon-new')}>＋ 新增優惠券</EvoBtn>
        </div>
      </div>
      <TabSearchBar
        tabs={[
          { key: 'all',           label: '全部',       count: COUPONS.length },
          { key: 'discount_code', label: '折扣代碼',   count: COUPONS.filter(c => c.type === 'discount_code').length },
          { key: 'auto',          label: '自動發放券', count: COUPONS.filter(c => c.type === 'auto').length },
        ]}
        activeTab={tab} onTabChange={t => { setTab(t); setPage(1); }}
      >
        <div style={{ padding: '12px 16px', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <EInput value={search} onChange={setSearch} placeholder="搜尋優惠券名稱或代碼…" style={{ width: 240 }} />
          <ESelect value={statusFilter} onChange={v => { setStatusFilter(v); setPage(1); }} width={140} placeholder="全部狀態"
            options={[{ value: 'active', label: '進行中' }, { value: 'scheduled', label: '未開始' }, { value: 'expired', label: '已到期' }, { value: 'disabled', label: '已停用' }]}
          />
          <ESelect value={typeFilter} onChange={v => { setTypeFilter(v); setPage(1); }} width={160} placeholder="全部折扣類型"
            options={[{ value: 'percent', label: '百分比折扣' }, { value: 'fixed', label: '固定金額折扣' }, { value: 'freeship', label: '免運費折扣' }]}
          />
          {(search || statusFilter || typeFilter) && (
            <EvoBtn variant="secondary" onClick={() => { setSearch(''); setStatusFilter(''); setTypeFilter(''); }}>清除篩選</EvoBtn>
          )}
        </div>
      </TabSearchBar>

      {filtered.length === 0 ? (
        <MktEmptyState icon="" title="尚無優惠券" sub="建立折扣代碼或設定自動發放規則，讓顧客享受購物優惠。" ctaLabel="＋ 新增優惠券" onCta={() => onNavigate('coupon-new')} />
      ) : (
        <>
          <TableWrapper>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr>
                  <th style={tableThStyle}><SortableHeader label="優惠券名稱" field="name" sort={sort} onSort={handleSort} /></th>
                  <th style={tableThStyle}>類型</th>
                  <th style={tableThStyle}>折扣方式</th>
                  <th style={tableThStyle}>折扣內容</th>
                  <th style={tableThStyle}>使用條件</th>
                  <th style={tableThStyle}><SortableHeader label="已使用" field="used" sort={sort} onSort={handleSort} /></th>
                  <th style={tableThStyle}><SortableHeader label="開始日期" field="start" sort={sort} onSort={handleSort} /></th>
                  <th style={tableThStyle}><SortableHeader label="結束日期" field="end" sort={sort} onSort={handleSort} /></th>
                  <th style={tableThStyle}>狀態</th>
                  <th style={tableThStyle}>操作</th>
                </tr>
              </thead>
              <tbody>
                {filtered.slice((page - 1) * pageSize, page * pageSize).map((c, i) => {
                  const st = COUPON_STATUS[c.status];
                  return (
                    <tr key={c.id}
                      style={{ background: tableRowBg(i) }}
                      {...tableRowHandlers(i, false)}>
                      <td style={tableTdStyle}>
                        <div style={{ fontWeight: 500, color: '#303133' }}>{c.name}</div>
                        {c.code !== '—' && <code style={{ fontSize: 11, background: '#F5F7FA', padding: '1px 5px', border: '1px solid #DCDFE6' }}>{c.code}</code>}
                      </td>
                      <td style={tableTdStyle}><StatusTag type="info">{c.type === 'discount_code' ? '折扣代碼' : '自動發放'}</StatusTag></td>
                      <td style={tableTdStyle}>{discountTypeLabel[c.discountType]}</td>
                      <td style={tableTdStyle}>{c.discount}</td>
                      <td style={tableTdStyle}>{c.condition}</td>
                      <td style={tableTdStyle}>{c.used}{c.total ? <span style={{ color: '#C0C4CC' }}> / {c.total}</span> : null}</td>
                      <td style={tableTdStyle}>{c.start}</td>
                      <td style={tableTdStyle}>{c.end}</td>
                      <td style={tableTdStyle}><StatusTag type={st.type}>{st.label}</StatusTag></td>
                      <td style={tableTdStyle}>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <EvoBtn variant="secondary" size="sm" onClick={() => onNavigate('coupon-edit')}>編輯</EvoBtn>
                          {c.status === 'active' ? (
                            <EvoBtn variant="secondary" size="sm" onClick={() => setDisableTarget(c)}>停用</EvoBtn>
                          ) : (
                            <EvoBtn variant="secondary" size="sm" onClick={() => show('已複製優惠券', 'success')}>複製</EvoBtn>
                          )}
                          <EvoBtn variant="secondary" size="sm" onClick={() => show('已複製優惠券', 'success')}>複製</EvoBtn>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TableWrapper>
          <Pagination page={page} total={filtered.length} pageSize={pageSize} pageSizes={[20, 50, 100]} onChange={setPage} onPageSizeChange={ps => { setPageSize(ps); setPage(1); }} style={{ marginTop: 16 }} />
        </>
      )}

      {/* 停用確認 Modal */}
      <AdminModal open={!!disableTarget} onClose={() => setDisableTarget(null)} title="停用優惠券"
        confirmLabel="確定停用" onConfirm={() => { show('優惠券已停用', 'warning'); setDisableTarget(null); }}>
        <p style={{ marginBottom: 8 }}>確定停用此優惠券？</p>
        <p style={{ fontSize: 13, color: '#909399' }}>停用後此優惠券不再顯示於結帳頁面，已發放給會員的優惠券仍可使用至有效期。</p>
      </AdminModal>
    </div>
  );
}

// ─── SCREEN 2: 優惠券 新增／編輯 ──────────────────────────────────────────────
function CouponFormPage({ onNavigate, mode, show }) {
  const isEdit = mode === 'edit';
  const [tab, setTab] = React.useState('basic');
  const [form, setForm] = React.useState({
    name: isEdit ? '夏日折扣碼' : '', couponType: 'discount_code',
    discountType: 'percent', discountValue: isEdit ? '20' : '',
    maxDiscountCap: '',
    code: isEdit ? 'SUMMER20' : '', totalLimit: isEdit ? '100' : '',
    perMemberLimit: '1', minOrderAmount: isEdit ? '1000' : '',
    minQuantity: '', productScope: 'all', excludeProducts: [],
    startDate: isEdit ? '2026-06-01' : '',
    endDate: isEdit ? '2026-08-31' : '', enabled: isEdit ? true : false, triggerEvent: 'register',
    triggerAmount: '', distributionTarget: 'all',
    expiryDays: '30', exclusive: false,
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div>
      <PageHeader title={isEdit ? '編輯優惠券' : '新增優惠券'}
        onBack={() => onNavigate('marketing-promotions')}
        breadcrumbs={['行銷中心', '優惠活動', isEdit ? '編輯優惠券' : '新增優惠券']} />
      <ETabs
        tabs={[{ id: 'basic', label: '基本設定' }, { id: 'condition', label: '使用條件' }, { id: 'distribution', label: '發放設定' }]}
        active={tab} onChange={setTab} style={{ marginBottom: 0 }}
      />

      {tab === 'basic' && (
        <SectionCard title="基本設定">
          <div style={{ maxWidth: 600 }}>
            <FormField label="優惠券名稱" required helper="此名稱會顯示於顧客的優惠券清單，最多 60 字。">
              <EInput value={form.name} onChange={v => set('name', v)} placeholder="例：夏日購物節折扣" />
            </FormField>
            <FormField label="優惠券類型" required>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { v: 'discount_code', l: '折扣代碼', d: '顧客在結帳時手動輸入代碼套用優惠' },
                  { v: 'auto', l: '自動發放券', d: '系統自動發送給符合觸發條件的會員' },
                ].map(o => (
                  <label key={o.v} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 16px', border: `1px solid ${form.couponType === o.v ? '#409EFF' : '#DCDFE6'}`, background: form.couponType === o.v ? '#EFF7FF' : '#fff', cursor: 'pointer' }}>
                    <input type="radio" name="couponType" checked={form.couponType === o.v} onChange={() => set('couponType', o.v)} style={{ marginTop: 3 }} />
                    <div>
                      <div style={{ fontWeight: 500 }}>{o.l}</div>
                      <div style={{ fontSize: 12, color: '#909399', marginTop: 2 }}>{o.d}</div>
                    </div>
                  </label>
                ))}
              </div>
            </FormField>
            <FormField label="折扣方式" required>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <ESelect value={form.discountType} onChange={v => set('discountType', v)} width={160}
                  options={[{ value: 'percent', label: '百分比折扣' }, { value: 'fixed', label: '固定金額折扣' }, { value: 'freeship', label: '免運費' }]}
                />
                {form.discountType !== 'freeship' && (
                  <>
                    <NumberInput value={form.discountValue} onChange={v => set('discountValue', v)} width={100} />
                    <span style={{ color: '#909399' }}>{form.discountType === 'percent' ? '% 折扣（輸入 20 = 打八折）' : 'NT$ 折扣'}</span>
                  </>
                )}
              </div>
            </FormField>
            {form.discountType === 'percent' && (
              <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>最高折扣上限<InfoTooltip content="範例：設定九折且上限 NT$500，即使消費者購買 NT$10,000 的商品，最多只折 NT$500，不會無限制放大折扣。" /></span>}
                helper="選填。設定後，折扣金額最高不超過此上限，即使訂單金額很高也適用。">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#909399' }}>NT$</span>
                  <NumberInput value={form.maxDiscountCap} onChange={v => set('maxDiscountCap', v)} width={160} placeholder="例：500" />
                </div>
              </FormField>
            )}
            <FormField label="有效期間" required>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <EInput type="date" value={form.startDate} onChange={v => set('startDate', v)} style={{ width: 160 }} />
                <span style={{ color: '#909399' }}>至</span>
                <EInput type="date" value={form.endDate} onChange={v => set('endDate', v)} style={{ width: 160 }} />
              </div>
            </FormField>
            <PublishStatusField enabled={form.enabled} onChangeEnabled={v => set('enabled', v)} startDate={form.startDate} endDate={form.endDate} />
          </div>
        </SectionCard>
      )}

      {tab === 'condition' && (
        <SectionCard title="使用條件">
          <div style={{ maxWidth: 520 }}>
            <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>最低訂單金額<InfoTooltip content="顧客的購物車訂單必須達到此金額才能使用本優惠券。填 0 或留空代表無最低消費限制。" /></span>}
              helper="填 0 或留空表示無最低消費限制。">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#909399' }}>NT$</span>
                <NumberInput value={form.minOrderAmount} onChange={v => set('minOrderAmount', v)} width={160} />
              </div>
            </FormField>
            <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>最低購買數量<InfoTooltip content="顧客的購物車產品件數必須達到此數量才能使用。填 0 或留空代表無數量限制。" /></span>}
              helper="填 0 或留空表示無最低數量限制。">
              <NumberInput value={form.minQuantity} onChange={v => set('minQuantity', v)} width={120} />
            </FormField>
            <FormField label="適用產品範圍" helper="預設全店通用，可限制只在指定分類或產品使用。">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[{ v: 'all', l: '全部產品' }, { v: 'category', l: '指定分類' }, { v: 'product', l: '指定產品' }].map(o => (
                  <label key={o.v} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <input type="radio" checked={form.productScope === o.v} onChange={() => set('productScope', o.v)} />
                    <span style={{ fontSize: 14 }}>{o.l}</span>
                  </label>
                ))}
                {form.productScope !== 'all' && (
                  <div style={{ padding: '10px 12px', background: '#F5F7FA', border: '1px solid #DCDFE6', marginTop: 4 }}>
                    <EInput placeholder={`輸入${form.productScope === 'category' ? '分類' : '產品'}名稱搜尋…`} onChange={() => {}} />
                    <div style={{ fontSize: 12, color: '#909399', marginTop: 6 }}>尚未選擇任何{form.productScope === 'category' ? '分類' : '產品'}</div>
                  </div>
                )}
              </div>
            </FormField>
            <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>排除產品<InfoTooltip content="常見用途：活動期間某些特定品項（例：限量新品、已有折扣商品）不希望再被優惠券折抵，可在此排除。" /></span>}
              helper="選填。此清單中的產品不適用本券，即使符合其他條件也無法使用。">
              <CouponExcludeSelector products={form.excludeProducts} onChange={v => set('excludeProducts', v)} />
            </FormField>
            <FormField label="可與其他優惠疊加" helper="開啟後，顧客結帳時可同時套用本券與其他促銷活動。">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Switch checked={form.exclusive} onChange={v => set('exclusive', v)} />
                <span style={{ fontSize: 13, color: '#606266' }}>{form.exclusive ? '已開啟 — 可與促銷活動同時使用' : '已關閉 — 不可與其他優惠同時使用'}</span>
              </div>
            </FormField>
          </div>
        </SectionCard>
      )}

      {tab === 'distribution' && (
        <SectionCard title="發放設定">
          <div style={{ maxWidth: 520 }}>
            {form.couponType === 'discount_code' ? (
              <>
                <FormField label="折扣代碼" required helper="最多 20 字，僅限英文字母與數字。留空將自動產生隨機代碼。">
                  <div style={{ display: 'flex', gap: 8 }}>
                    <EInput value={form.code} onChange={v => set('code', v.toUpperCase())} placeholder="例：SUMMER20" />
                    <EvoBtn variant="secondary" onClick={() => set('code', 'CODE' + Math.random().toString(36).slice(2,6).toUpperCase())}>隨機產生</EvoBtn>
                  </div>
                </FormField>
                <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>總使用次數上限<InfoTooltip content="整張優惠券的最高使用次數，達到後自動失效，與有效期間無關。留空代表無上限。" /></span>}
                  helper="留空表示無使用次數限制。">
                  <NumberInput value={form.totalLimit} onChange={v => set('totalLimit', v)} width={160} />
                </FormField>
              </>
            ) : (
              <>
                <FormField label="觸發發放時機" required helper="符合以下條件時，系統自動發放優惠券至會員帳戶。">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {[
                      { v: 'register',     l: '會員完成帳號啟用（入會贈券）',      pro: false },
                      { v: 'first_purchase', l: '會員首次消費成功後',              pro: false },
                      { v: 'tier_upgrade', l: '會員等級升級時',                   pro: false },
                      { v: 'birthday',     l: '會員生日當月第一天（生日贈券）',     pro: true  },
                      { v: 'order_amount', l: '訂單達指定金額後（滿額贈券）',      pro: true  },
                    ].map(o => (
                      <label key={o.v} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: `1px solid ${form.triggerEvent === o.v ? '#409EFF' : '#DCDFE6'}`, background: form.triggerEvent === o.v ? '#EFF7FF' : '#fff', cursor: 'pointer' }}>
                        <input type="radio" checked={form.triggerEvent === o.v} onChange={() => set('triggerEvent', o.v)} />
                        <span style={{ fontSize: 13, flex: 1 }}>{o.l}</span>
                        {o.pro && <span style={{ fontSize: 10, background: '#E6A23C', color: '#fff', padding: '1px 5px', borderRadius: 2, fontWeight: 600 }}>進階</span>}
                      </label>
                    ))}
                  </div>
                </FormField>
                {form.triggerEvent === 'order_amount' && (
                  <FormField label="滿額門檻金額" required helper="訂單結帳金額達到此金額後，系統自動發放優惠券。此券供下次使用，不折抵本筆訂單。">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: '#909399' }}>NT$</span>
                      <NumberInput value={form.triggerAmount} onChange={v => set('triggerAmount', v)} width={160} placeholder="例：3000" />
                    </div>
                  </FormField>
                )}
                <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>發放對象<InfoTooltip content="選填。限制此優惠券只自動發放給符合條件的會員。留空或選「全體會員」則所有會員均可收到。" /></span>}
                  helper="選填。預設發放給全體會員。">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {[{ v: 'all', l: '全體會員' }, { v: 'tier', l: '指定會員等級' }, { v: 'tag', l: '指定分眾標籤' }].map(o => (
                      <label key={o.v} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                        <input type="radio" checked={form.distributionTarget === o.v} onChange={() => set('distributionTarget', o.v)} />
                        <span style={{ fontSize: 14 }}>{o.l}</span>
                      </label>
                    ))}
                    {form.distributionTarget !== 'all' && (
                      <div style={{ marginTop: 4 }}>
                        <EInput placeholder={`輸入${form.distributionTarget === 'tier' ? '等級名稱' : '標籤名稱'}搜尋…`} onChange={() => {}} />
                      </div>
                    )}
                  </div>
                </FormField>
                <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>優惠券有效天數<InfoTooltip content="從系統將優惠券發放至會員帳戶的當天起算，超過天數後自動失效。填 0 代表永不過期。" /></span>}
                  helper="從發放日起算。填 0 代表永不過期。">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <NumberInput value={form.expiryDays} onChange={v => set('expiryDays', v)} width={100} />
                    <span style={{ color: '#909399' }}>天</span>
                  </div>
                </FormField>
              </>
            )}
            <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>每人使用次數上限<InfoTooltip content="同一個會員帳號可以使用這張優惠券的最高次數。設定為 1 可防止重複使用。" /></span>}
              helper="建議設為 1，防止同一位顧客重複使用。">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <NumberInput value={form.perMemberLimit} onChange={v => set('perMemberLimit', v)} width={100} />
                <span style={{ color: '#909399' }}>次</span>
              </div>
            </FormField>
          </div>
        </SectionCard>
      )}

      <FixedBar onCancel={() => onNavigate('marketing-promotions')}
        onSave={() => { show(isEdit ? '優惠券已更新' : '優惠券已建立', 'success'); onNavigate('marketing-promotions'); }} />
    </div>
  );
}

// ─── Helper: 排除產品選擇器 ───────────────────────────────────────────────────
const MOCK_EXCLUDE_PRODUCTS = ['限量新品-春季聯名款', '北海道牛奶麵包禮盒', '台灣有機蜂蜜', '手沖濾掛咖啡10入', '日本進口香皂禮盒'];
function CouponExcludeSelector({ products, onChange }) {
  const [query, setQuery] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const filtered = MOCK_EXCLUDE_PRODUCTS.filter(p => p.includes(query) && !products.includes(p));
  return (
    <div style={{ position: 'relative' }}>
      <EInput value={query} onChange={v => { setQuery(v); setOpen(true); }}
        placeholder="輸入產品名稱搜尋…" />
      {open && query.length > 0 && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', border: '1px solid #DCDFE6', zIndex: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', maxHeight: 180, overflowY: 'auto' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '10px 12px', fontSize: 13, color: '#909399' }}>找不到符合的產品</div>
          ) : filtered.map(p => (
            <div key={p} onClick={() => { onChange([...products, p]); setQuery(''); setOpen(false); }}
              style={{ padding: '8px 12px', fontSize: 13, cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background = '#F5F7FA'}
              onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
              {p}
            </div>
          ))}
        </div>
      )}
      {products.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
          {products.map(p => (
            <span key={p} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', background: '#F5F7FA', border: '1px solid #DCDFE6', fontSize: 12, color: '#606266', borderRadius: 9999 }}>
              {p}
              <span onClick={() => onChange(products.filter(x => x !== p))}
                style={{ cursor: 'pointer', color: '#C0C4CC', fontSize: 15, lineHeight: 1 }}>×</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── SCREEN 3: 滿額／滿件優惠（列表）────────────────────────────────────────
function PromotionListPage({ onNavigate, show }) {
  const [tab, setTab] = React.useState('all');
  const [isAdvanced, setIsAdvanced] = React.useState(window.__evomni_isPro || false);
  React.useEffect(() => {
    const handler = e => setIsAdvanced(e.detail.isPro);
    window.addEventListener('evomni:planchange', handler);
    return () => window.removeEventListener('evomni:planchange', handler);
  }, []);
  const [sort, setSort] = React.useState({ field: 'start', dir: 'desc' });
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(20);
  const handleSort = f => setSort(s => ({ field: f, dir: s.field === f && s.dir === 'asc' ? 'desc' : 'asc' }));
  // 批次選取狀態
  const [selected, setSelected] = React.useState([]);
  const [expandedToAll, setExpandedToAll] = React.useState(false);
  const [batchModal, setBatchModal] = React.useState(false);
  const [batchLimitVal, setBatchLimitVal] = React.useState('');
  const [batchMode, setBatchMode] = React.useState('global');
  const BATCH_LIMIT = 500;
  const TYPE_LABEL = { gift: '贈品活動', freeship: '免運活動', discount: '折扣活動', flash: '限時折扣', addon: '加購活動', bundle: '組合優惠' };
  const filtered = PROMOTIONS.filter(p => tab === 'all' || p.type === tab || (tab === 'flash' && p.type === 'discount'));
  const isLockedTab = !isAdvanced && (tab === 'addon' || tab === 'bundle' || tab === 'flash');
  const TAB_NEW_MAP = { gift: 'gift-new', flash: 'flash-sale-new', bundle: 'bundle-new' };
  const newPageId = TAB_NEW_MAP[tab] || 'promotion-new';
  const newBtnLabel = { gift: '＋ 新增贈品活動', flash: '＋ 新增限時折扣活動', bundle: '＋ 新增組合優惠活動' }[tab] || '＋ 新增優惠活動';
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);
  const allPageSelected = pageItems.length > 0 && pageItems.every((p, i) => selected.includes((page - 1) * pageSize + i));
  const totalSelected = expandedToAll ? Math.min(filtered.length, BATCH_LIMIT) : selected.length;
  const toggleRow = i => {
    const globalIdx = (page - 1) * pageSize + i;
    if (totalSelected >= BATCH_LIMIT && !selected.includes(globalIdx)) { show(`最多可同時操作 ${BATCH_LIMIT} 筆，請分批執行`, 'warning'); return; }
    setSelected(s => s.includes(globalIdx) ? s.filter(x => x !== globalIdx) : [...s, globalIdx]);
    setExpandedToAll(false);
  };
  const toggleAllPage = () => {
    const pageIdxs = pageItems.map((_, i) => (page - 1) * pageSize + i);
    if (allPageSelected) { setSelected(s => s.filter(x => !pageIdxs.includes(x))); setExpandedToAll(false); }
    else { setSelected(s => [...new Set([...s, ...pageIdxs])]); }
  };
  const clearSelection = () => { setSelected([]); setExpandedToAll(false); };
  const doBatch = () => { show(`已對 ${totalSelected} 筆活動套用批次設定`, 'success'); setBatchModal(false); clearSelection(); };

  return (
    <div>
      <PageHeader title="滿額／滿件優惠" breadcrumbs={['行銷中心', '優惠活動', '滿額／滿件優惠']} />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <EvoBtn variant="primary" onClick={() => onNavigate(newPageId)}>{newBtnLabel}</EvoBtn>
      </div>
      <TabSearchBar
        tabs={[
          { key: 'all',      label: '全部',    count: PROMOTIONS.length },
          { key: 'gift',     label: '贈品活動' },
          { key: 'freeship', label: '免運活動' },
          { key: 'discount', label: '折扣活動' },
          { key: 'flash',    label: <span>限時折扣<AdvBadge /></span> },
          { key: 'addon',    label: <span>加購活動<AdvBadge /></span> },
          { key: 'bundle',   label: <span>組合優惠<AdvBadge /></span> },
        ]}
        activeTab={tab} onTabChange={setTab}
      />

      {isLockedTab ? (
        <>
          <AdvancedBanner />
          <MktEmptyState icon="" title="此功能需進階電商包" sub="升級後即可建立加購優惠與組合優惠活動，有效提升客單價。" ctaLabel="了解進階電商包" onCta={() => {}} />
        </>
      ) : filtered.length === 0 ? (
        <MktEmptyState icon="" title="尚無優惠活動" sub="建立滿額贈品、免運費或折扣活動，提升顧客購物意願。" ctaLabel="＋ 新增優惠活動" onCta={() => onNavigate('promotion-new')} />
      ) : (
        <>
          {/* 批次工具列（選取後出現）*/}
          {selected.length > 0 && (
            <div style={{ position: 'sticky', top: 0, zIndex: 100, background: '#ECF5FF', border: '1px solid #b3d8ff', padding: '10px 16px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 13, color: '#409EFF', fontWeight: 600 }}>
                已選取本頁 {selected.length} 筆。
              </span>
              {!expandedToAll && filtered.length > selected.length && selected.length < BATCH_LIMIT && (
                <button onClick={() => setExpandedToAll(true)}
                  style={{ background: 'none', border: 'none', color: '#409EFF', cursor: 'pointer', fontSize: 13, padding: 0, fontFamily: 'inherit', textDecoration: 'underline' }}>
                  選取全部 {Math.min(filtered.length, BATCH_LIMIT)} 筆活動
                </button>
              )}
              {expandedToAll && (
                <span style={{ fontSize: 13, color: '#606266' }}>已擴大至全部 {Math.min(filtered.length, BATCH_LIMIT)} 筆（上限 {BATCH_LIMIT} 筆）</span>
              )}
              {totalSelected >= BATCH_LIMIT && (
                <span style={{ fontSize: 12, color: '#E6A23C' }}>已達 {BATCH_LIMIT} 筆上限，請分批執行</span>
              )}
              <div style={{ flex: 1 }} />
              <EvoBtn variant="primary" size="sm" onClick={() => setBatchModal(true)}>批次操作（{totalSelected} 筆）</EvoBtn>
              <EvoBtn variant="ghost" size="sm" onClick={clearSelection}>取消選取</EvoBtn>
            </div>
          )}

          <TableWrapper>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr>
                  <th style={{ ...tableThStyle, width: 40, textAlign: 'center' }}>
                    <input type="checkbox" checked={allPageSelected} onChange={toggleAllPage}
                      style={{ accentColor: '#303133', cursor: 'pointer' }} />
                  </th>
                  <th style={tableThStyle}><SortableHeader label="活動名稱" field="name" sort={sort} onSort={handleSort} /></th>
                  <th style={tableThStyle}>類型</th>
                  <th style={tableThStyle}>觸發條件</th>
                  <th style={tableThStyle}>優惠內容</th>
                  <th style={tableThStyle}><SortableHeader label="開始日期" field="start" sort={sort} onSort={handleSort} /></th>
                  <th style={tableThStyle}><SortableHeader label="結束日期" field="end" sort={sort} onSort={handleSort} /></th>
                  <th style={tableThStyle}>狀態</th>
                  <th style={tableThStyle}>操作</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((p, i) => {
                  const st = PROMO_STATUS[p.status];
                  const globalIdx = (page - 1) * pageSize + i;
                  const isSel = expandedToAll || selected.includes(globalIdx);
                  return (
                    <tr key={p.id}
                      style={{ background: isSel ? '#EFF7FF' : tableRowBg(i) }}
                      {...tableRowHandlers(i, isSel)}>
                      <td style={{ ...tableTdStyle, textAlign: 'center' }}>
                        <input type="checkbox" checked={isSel} onChange={() => toggleRow(i)}
                          onClick={e => e.stopPropagation()} style={{ accentColor: '#303133', cursor: 'pointer' }} />
                      </td>
                      <td style={{ ...tableTdStyle, fontWeight: 500, color: '#303133' }}>{p.name}</td>
                      <td style={tableTdStyle}><StatusTag type="primary">{TYPE_LABEL[p.type]}</StatusTag></td>
                      <td style={tableTdStyle}>{p.condition}</td>
                      <td style={tableTdStyle}>{p.benefit}</td>
                      <td style={tableTdStyle}>{p.start}</td>
                      <td style={tableTdStyle}>{p.end}</td>
                      <td style={tableTdStyle}><StatusTag type={st.type}>{st.label}</StatusTag></td>
                      <td style={tableTdStyle}>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <EvoBtn variant="secondary" size="sm">編輯</EvoBtn>
                          {p.status === 'active' && <EvoBtn variant="secondary" size="sm" onClick={() => show('優惠活動已停用', 'warning')}>停用</EvoBtn>}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TableWrapper>
          <Pagination page={page} total={filtered.length} pageSize={pageSize} pageSizes={[20, 50, 100]} onChange={setPage} onPageSizeChange={ps => { setPageSize(ps); setPage(1); }} style={{ marginTop: 16 }} />

          {/* 批次設定 Modal */}
          {batchModal && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ background: '#fff', width: 440, maxWidth: '90vw', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #DCDFE6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#303133' }}>批次設定贈品上限（{totalSelected} 筆）</span>
                  <button onClick={() => setBatchModal(false)} style={{ background: 'none', border: 'none', fontSize: 20, color: '#909399', cursor: 'pointer' }}>×</button>
                </div>
                <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { v: 'global', l: '改為使用共用上限', d: '回歸全域贈品設定的預設值' },
                    { v: 'custom', l: '統一設定為指定值', d: '輸入 1–15 的整數，套用至所選活動' },
                  ].map(o => (
                    <label key={o.v} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px',
                      border: `1px solid ${batchMode === o.v ? '#409EFF' : '#DCDFE6'}`,
                      background: batchMode === o.v ? '#EFF7FF' : '#fff', cursor: 'pointer' }}>
                      <input type="radio" checked={batchMode === o.v} onChange={() => setBatchMode(o.v)} style={{ marginTop: 3 }} />
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 500 }}>{o.l}</div>
                        <div style={{ fontSize: 12, color: '#909399', marginTop: 2 }}>{o.d}</div>
                      </div>
                    </label>
                  ))}
                  {batchMode === 'custom' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 14 }}>
                      <span style={{ fontSize: 13, color: '#606266' }}>每筆活動上限：</span>
                      <NumberInput value={batchLimitVal} onChange={setBatchLimitVal} width={80} placeholder="1–15" />
                      <span style={{ fontSize: 13, color: '#606266' }}>件</span>
                    </div>
                  )}
                </div>
                <div style={{ padding: '12px 20px', borderTop: '1px solid #DCDFE6', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                  <EvoBtn variant="secondary" onClick={() => setBatchModal(false)}>取消</EvoBtn>
                  <EvoBtn variant="primary" onClick={doBatch}>確認套用</EvoBtn>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── SCREEN 4: 優惠活動 新增 ──────────────────────────────────────────────────
function PromotionFormPage({ onNavigate, show }) {
  const [type, setType] = React.useState('gift');
  const [name, setName] = React.useState('');
  const [conditionType, setConditionType] = React.useState('amount');
  const [conditionValue, setConditionValue] = React.useState('');
  // 折扣活動多階梯
  const [discCondType, setDiscCondType] = React.useState('amount');
  const [discType, setDiscType] = React.useState('percent');
  const [tiers, setTiers] = React.useState([{ condValue: '', discValue: '' }]);
  const addTier = () => { if (tiers.length < 5) setTiers(t => [...t, { condValue: '', discValue: '' }]); };
  const removeTier = i => setTiers(t => t.filter((_, idx) => idx !== i));
  const setTierField = (i, k, v) => setTiers(t => t.map((row, idx) => idx === i ? { ...row, [k]: v } : row));
  const highestTier = tiers.filter(t => t.condValue && t.discValue).sort((a, b) => Number(b.condValue) - Number(a.condValue))[0];

  const TYPES = [
    { v: 'gift',     l: '贈品活動', d: '達到條件可兌換指定贈品' },
    { v: 'freeship', l: '免運活動', d: '達到條件免除本次訂單運費' },
    { v: 'discount', l: '折扣活動', d: '達到條件享折扣，可指定百分比或固定金額' },
    { v: 'addon',    l: '加購活動', d: '達到條件可低價加購指定產品（需進階電商包）' },
  ];

  return (
    <div>
      <PageHeader title="新增優惠活動" onBack={() => onNavigate('marketing-promotions')} breadcrumbs={['行銷中心', '優惠活動', '新增優惠活動']} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <SectionCard title="活動類型">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {TYPES.map(t => (
              <label key={t.v} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px', border: `1px solid ${type === t.v ? '#409EFF' : '#DCDFE6'}`, background: type === t.v ? '#EFF7FF' : '#fff', cursor: 'pointer' }}>
                <input type="radio" checked={type === t.v} onChange={() => setType(t.v)} style={{ marginTop: 3 }} />
                <div>
                  <div style={{ fontWeight: 500 }}>{t.l}</div>
                  <div style={{ fontSize: 12, color: '#909399', marginTop: 2 }}>{t.d}</div>
                </div>
              </label>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="活動設定">
          <FormField label="活動名稱" required>
            <EInput value={name} onChange={setName} placeholder="例：滿千送好禮" />
          </FormField>
          <FormField label="觸發條件" required>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <ESelect value={conditionType} onChange={setConditionType} width={140}
                options={[{ value: 'amount', label: '訂單金額滿' }, { value: 'qty', label: '購買數量滿' }]}
              />
              {conditionType === 'amount' && <span style={{ color: '#909399' }}>NT$</span>}
              <NumberInput value={conditionValue} onChange={setConditionValue} width={100} />
              {conditionType === 'qty' && <span style={{ color: '#909399' }}>件</span>}
            </div>
          </FormField>
          {type === 'gift' && <FormField label="贈品產品" required helper="選擇顧客達到條件後可獲得的贈品。"><EvoBtn variant="secondary">＋ 選擇贈品產品</EvoBtn></FormField>}
          {type === 'freeship' && <Banner type="success">達到條件後，系統將自動免除本次訂單的運費，無需顧客手動操作。</Banner>}
          {type === 'discount' && (
            <div>
              {/* 折扣條件類型（全部階梯共用）*/}
              <FormField label="折扣條件類型" required helper="同一活動所有階梯共用同一條件類型。">
                <div style={{ display: 'flex', gap: 16 }}>
                  {[{ v: 'amount', l: '滿額（NT$X）' }, { v: 'qty', l: '滿件（N 件）' }].map(o => (
                    <label key={o.v} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                      <input type="radio" checked={discCondType === o.v} onChange={() => setDiscCondType(o.v)} />
                      <span style={{ fontSize: 14 }}>{o.l}</span>
                    </label>
                  ))}
                </div>
              </FormField>
              {/* 折扣類型（全部階梯共用）*/}
              <FormField label="折扣類型" required helper="同一活動所有階梯共用同一折扣類型。">
                <div style={{ display: 'flex', gap: 16 }}>
                  {[{ v: 'percent', l: '百分比折扣（%）' }, { v: 'fixed', l: '固定金額折扣（NT$）' }].map(o => (
                    <label key={o.v} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                      <input type="radio" checked={discType === o.v} onChange={() => setDiscType(o.v)} />
                      <span style={{ fontSize: 14 }}>{o.l}</span>
                    </label>
                  ))}
                </div>
              </FormField>
              {/* 多階梯設定 */}
              <FormField label={`折扣階梯設定（${tiers.length}/5）`} required helper="條件數值需依序遞增，結帳時自動套用消費者符合的最高階梯。">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {tiers.map((tier, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: '#F5F7FA', border: '1px solid #EBEEF5' }}>
                      <span style={{ fontSize: 12, color: '#909399', fontWeight: 600, minWidth: 44 }}>第 {i + 1} 階</span>
                      <span style={{ fontSize: 13, color: '#606266' }}>{discCondType === 'amount' ? '滿 NT$' : '滿'}</span>
                      <NumberInput value={tier.condValue} onChange={v => setTierField(i, 'condValue', v)} width={90} placeholder={discCondType === 'amount' ? '金額' : '件數'} />
                      {discCondType === 'qty' && <span style={{ fontSize: 13, color: '#606266' }}>件</span>}
                      <span style={{ fontSize: 13, color: '#606266' }}>{discType === 'percent' ? '折' : '折扣'}</span>
                      <NumberInput value={tier.discValue} onChange={v => setTierField(i, 'discValue', v)} width={80} placeholder={discType === 'percent' ? '1–99' : 'NT$'} />
                      <span style={{ fontSize: 13, color: '#606266' }}>{discType === 'percent' ? '%' : 'NT$'}</span>
                      {tiers.length > 1 && (
                        <button onClick={() => removeTier(i)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#F56C6C', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: '0 4px' }}>×</button>
                      )}
                    </div>
                  ))}
                  {tiers.length < 5 && (
                    <button onClick={addTier} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', background: 'none', border: '1px dashed #DCDFE6', cursor: 'pointer', fontSize: 13, color: '#409EFF', fontFamily: 'inherit' }}>
                      ＋ 新增階梯（最多 5 組）
                    </button>
                  )}
                </div>
              </FormField>
              {/* 最高可觸達階梯即時預覽 */}
              {highestTier && (
                <div style={{ padding: '10px 14px', background: '#ECF5FF', border: '1px solid #b3d8ff', fontSize: 13, color: '#606266', lineHeight: 1.7 }}>
                  目前最高可觸達階梯：{discCondType === 'amount' ? `消費滿 NT$${highestTier.condValue}` : `購買滿 ${highestTier.condValue} 件`}，享{discType === 'percent' ? ` ${highestTier.discValue}% 折扣` : ` NT$${highestTier.discValue} 折扣`}
                </div>
              )}
            </div>
          )}
          {type === 'addon' && <FormField label="加購產品與優惠價" required helper="設定顧客可以加購的產品及其優惠價格。"><EvoBtn variant="secondary">＋ 選擇加購產品</EvoBtn></FormField>}
          <FormField label="活動期間" required>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <EInput type="date" value="" onChange={() => {}} style={{ width: 150 }} />
              <span style={{ color: '#909399' }}>至</span>
              <EInput type="date" value="" onChange={() => {}} style={{ width: 150 }} />
            </div>
          </FormField>
        </SectionCard>
      </div>
      <FixedBar onCancel={() => onNavigate('marketing-promotions')} onSave={() => { show('優惠活動已建立', 'success'); onNavigate('marketing-promotions'); }} />
    </div>
  );
}

// ─── 贈品管理：Mock 資料 ──────────────────────────────────────────────────────
const GIFT_ITEMS = [
  { id: 1, name: '質感購物袋', sku: 'GIFT-001', stock: 120, usedIn: 1, status: 'active'   },
  { id: 2, name: '旅行組合包', sku: 'GIFT-002', stock: 0,   usedIn: 0, status: 'active'   },
  { id: 3, name: '環保水瓶',   sku: 'GIFT-003', stock: 55,  usedIn: 2, status: 'active'   },
  { id: 4, name: '手工皂禮盒', sku: 'GIFT-004', stock: 38,  usedIn: 1, status: 'active'   },
  { id: 5, name: '帆布托特包', sku: 'GIFT-005', stock: 15,  usedIn: 0, status: 'disabled' },
];

// ─── 贈品管理：列表頁 ─────────────────────────────────────────────────────────
function GiftItemsPage({ onNavigate, show }) {
  const [search, setSearch] = React.useState('');
  const [disableTarget, setDisableTarget] = React.useState(null);

  const filtered = GIFT_ITEMS.filter(g =>
    !search || g.name.includes(search) || g.sku.includes(search)
  );

  return (
    <div>
      <PageHeader title="贈品管理" breadcrumbs={['行銷中心', '贈品管理']} />
      <div style={{ background: '#ECF5FF', border: '1px solid #b3d8ff', borderRadius: 3, padding: '10px 16px', display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, marginBottom: 16 }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
          <circle cx="7" cy="7" r="6" stroke="#409EFF" strokeWidth="1.2"/><line x1="7" y1="6" x2="7" y2="10" stroke="#409EFF" strokeWidth="1.2" strokeLinecap="round"/><circle cx="7" cy="4.5" r="0.6" fill="#409EFF"/>
        </svg>
        <span style={{ color: '#606266', lineHeight: 1.8 }}>贈品品項為僅供贈品活動使用的品項，不會在前台商品列表中顯示，庫存獨立管理。</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <EInput value={search} onChange={setSearch} placeholder="搜尋贈品名稱或品號…" style={{ width: 280 }} />
        <EvoBtn variant="primary" onClick={() => onNavigate('gift-item-new')}>＋ 新增贈品品項</EvoBtn>
      </div>
      <TableWrapper>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr>
              <th style={tableThStyle}>贈品名稱</th>
              <th style={tableThStyle}>品號</th>
              <th style={tableThStyle}>可用庫存</th>
              <th style={tableThStyle}>使用中活動數</th>
              <th style={tableThStyle}>狀態</th>
              <th style={tableThStyle}>操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((g, i) => (
              <tr key={g.id} style={{ background: i % 2 === 0 ? '#fff' : '#FAFAFA' }}>
                <td style={tableTdStyle}>
                  <span style={{ fontWeight: 500, color: '#409EFF', cursor: 'pointer' }}
                    onClick={() => onNavigate('gift-item-edit')}>{g.name}</span>
                </td>
                <td style={{ ...tableTdStyle, fontFamily: 'monospace', fontSize: 13, color: '#606266' }}>{g.sku}</td>
                <td style={tableTdStyle}>
                  <span style={{ color: g.stock === 0 ? '#F56C6C' : '#303133', fontWeight: g.stock === 0 ? 500 : 400 }}>
                    {g.stock === 0 ? '缺貨' : `${g.stock} 件`}
                  </span>
                </td>
                <td style={tableTdStyle}>
                  {g.usedIn > 0
                    ? <span style={{ color: '#409EFF' }}>{g.usedIn} 個活動</span>
                    : <span style={{ color: '#C0C4CC' }}>未使用</span>}
                </td>
                <td style={tableTdStyle}>
                  <StatusTag type={g.status === 'active' ? 'success' : 'info'}>
                    {g.status === 'active' ? '啟用中' : '已停用'}
                  </StatusTag>
                </td>
                <td style={tableTdStyle}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <EvoBtn variant="secondary" size="sm" onClick={() => onNavigate('gift-item-edit')}>編輯</EvoBtn>
                    {g.status === 'active' && (
                      <EvoBtn variant="secondary" size="sm" onClick={() => setDisableTarget(g)}>停用</EvoBtn>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrapper>
      {filtered.length === 0 && (
        <MktEmptyState title="找不到符合的贈品品項" sub="請嘗試其他關鍵字，或新增贈品品項。" ctaLabel="＋ 新增贈品品項" onCta={() => onNavigate('gift-item-new')} />
      )}
      <AdminModal open={!!disableTarget} onClose={() => setDisableTarget(null)} title="停用贈品品項"
        confirmLabel="確定停用" onConfirm={() => { show(`「${disableTarget?.name}」已停用`, 'warning'); setDisableTarget(null); }}>
        <p style={{ marginBottom: 8 }}>確定停用「{disableTarget?.name}」？</p>
        <p style={{ fontSize: 13, color: '#909399' }}>停用後此品項無法被選入新的贈品活動，已設定的進行中活動不受影響。</p>
      </AdminModal>
    </div>
  );
}

// ─── 贈品管理：新增／編輯表單 ────────────────────────────────────────────────
function GiftItemFormPage({ onNavigate, mode, show }) {
  const isEdit = mode === 'edit';
  const [form, setForm] = React.useState({
    name:        isEdit ? '質感購物袋' : '',
    sku:         isEdit ? 'GIFT-001'   : '',
    stock:       isEdit ? '120'        : '',
    description: isEdit ? '附品牌 LOGO，尺寸 38x40cm，環保棉材質' : '',
    note:        '',
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div>
      <PageHeader title={isEdit ? '編輯贈品品項' : '新增贈品品項'}
        onBack={() => onNavigate('gift-items')}
        breadcrumbs={['行銷中心', '贈品管理', isEdit ? '編輯贈品品項' : '新增贈品品項']} />
      <div style={{ maxWidth: 600 }}>
        <SectionCard title="品項資訊">
          <FormField label="贈品名稱" required>
            <EInput value={form.name} onChange={v => set('name', v)} placeholder="例：質感購物袋" />
          </FormField>
          <FormField label="品號" helper="選填。留空將由系統自動產生，格式為 GIFT-XXX。">
            <EInput value={form.sku} onChange={v => set('sku', v)} placeholder="例：GIFT-001" style={{ width: 200 }} />
          </FormField>
          <FormField label="品項說明" helper="選填，說明尺寸、材質、顏色等，顯示於贈品活動設定頁供管理員參考。">
            <textarea value={form.description} onChange={e => set('description', e.target.value)} maxLength={200}
              placeholder="例：附品牌 LOGO，尺寸 38x40cm，環保棉材質"
              style={{ width: '100%', minHeight: 72, padding: '8px 12px', border: '1px solid #DCDFE6', resize: 'vertical', fontSize: 14, fontFamily: 'inherit', outline: 'none', lineHeight: 1.6, color: '#303133' }} />
            <div style={{ fontSize: 12, color: '#909399', textAlign: 'right' }}>{form.description.length}/200</div>
          </FormField>
        </SectionCard>
        <SectionCard title="庫存設定">
          <FormField label="可用庫存數量" required helper="設定此贈品品項的可用庫存。贈品活動核發贈品時會自動扣減。">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <NumberInput value={form.stock} onChange={v => set('stock', v)} width={140} placeholder="例：100" />
              <span style={{ color: '#909399' }}>件</span>
            </div>
          </FormField>
          <FormField label="備注" helper="選填，供內部人員參考，不對外顯示。">
            <EInput value={form.note} onChange={v => set('note', v)} placeholder="例：2026 Q3 備貨" />
          </FormField>
        </SectionCard>
      </div>
      <FixedBar
        onCancel={() => onNavigate('gift-items')}
        onSave={() => { show(isEdit ? '贈品品項已更新' : '贈品品項已建立', 'success'); onNavigate('gift-items'); }} />
    </div>
  );
}

// ─── SCREEN 4A: 免運活動 新增表單 ────────────────────────────────────────────
function FreeshippingFormPage({ onNavigate, show }) {
  const [form, setForm] = React.useState({
    name: '', freeshipType: 'all', conditionType: 'amount', conditionValue: '',
    calcBasis: 'after_discount',
    productScope: 'all', description: '', enabled: false,
    startDate: '', endDate: '',
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div>
      <PageHeader title="新增免運活動" onBack={() => onNavigate('marketing-promotions')}
        breadcrumbs={['行銷中心', '優惠活動', '新增免運活動']} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start' }}>

        {/* 左欄：通用設定 */}
        <SectionCard title="基本設定">
          <FormField label="活動名稱" required>
            <EInput value={form.name} onChange={v => set('name', v)} placeholder="例：消費滿額免運費" />
          </FormField>
          <FormField label="活動期間" required helper="活動開始前可儲存草稿，到時間後依啟用狀態自動生效。">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <EInput type="date" value={form.startDate} onChange={v => set('startDate', v)} style={{ width: 150 }} />
              <span style={{ color: '#909399' }}>至</span>
              <EInput type="date" value={form.endDate} onChange={v => set('endDate', v)} style={{ width: 150 }} />
            </div>
          </FormField>
          <FormField label="適用產品範圍">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { v: 'all',      l: '全店商品' },
                { v: 'category', l: '指定分類' },
                { v: 'specific', l: '指定產品' },
              ].map(o => (
                <label key={o.v} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="radio" checked={form.productScope === o.v} onChange={() => set('productScope', o.v)} />
                  <span style={{ fontSize: 14 }}>{o.l}</span>
                </label>
              ))}
            </div>
          </FormField>
          <FormField label="活動說明（前台顯示）" helper="選填，最多 100 字，顯示於購物車旁說明文字。">
            <textarea value={form.description} onChange={e => set('description', e.target.value)} maxLength={100}
              placeholder="例：消費滿 NT$500 即享免運費優惠"
              style={{ width: '100%', minHeight: 72, padding: '8px 12px', border: '1px solid #DCDFE6', resize: 'vertical', fontSize: 14, fontFamily: 'inherit', outline: 'none', lineHeight: 1.6, color: '#303133' }} />
            <div style={{ fontSize: 12, color: '#909399', textAlign: 'right' }}>{form.description.length}/100</div>
          </FormField>
          <PublishStatusField enabled={form.enabled} onChangeEnabled={v => set('enabled', v)} startDate={form.startDate} endDate={form.endDate} />
        </SectionCard>

        {/* 右欄：免運條件設定 */}
        <SectionCard title="免運條件設定">
          {/* 免運類型 */}
          <FormField label="免運類型" required>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { v: 'all',     l: '整單免運', d: '整筆訂單達到條件即免除所有運費' },
                { v: 'partial', l: '部分商品免運', d: '指定範圍商品達到條件，僅免除該批商品運費' },
              ].map(o => (
                <label key={o.v} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px',
                  border: `1px solid ${form.freeshipType === o.v ? '#409EFF' : '#DCDFE6'}`,
                  background: form.freeshipType === o.v ? '#EFF7FF' : '#fff', cursor: 'pointer' }}>
                  <input type="radio" checked={form.freeshipType === o.v} onChange={() => set('freeshipType', o.v)} style={{ marginTop: 3 }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{o.l}</div>
                    <div style={{ fontSize: 12, color: '#909399', marginTop: 2 }}>{o.d}</div>
                  </div>
                </label>
              ))}
            </div>
          </FormField>

          {/* 條件類型（整單免運才顯示）*/}
          {form.freeshipType === 'all' && (
            <FormField label="條件類型" required>
              <div style={{ display: 'flex', gap: 16 }}>
                {[
                  { v: 'amount', l: '滿額門檻（NT$X）' },
                  { v: 'qty',    l: '滿件門檻（N 件）' },
                ].map(o => (
                  <label key={o.v} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                    <input type="radio" checked={form.conditionType === o.v}
                      onChange={() => { set('conditionType', o.v); set('conditionValue', ''); }} />
                    <span style={{ fontSize: 14 }}>{o.l}</span>
                  </label>
                ))}
              </div>
            </FormField>
          )}

          {/* 條件數值（整單免運才顯示）*/}
          {form.freeshipType === 'all' && (
            <FormField label={form.conditionType === 'amount' ? '門檻金額' : '門檻件數'} required>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {form.conditionType === 'amount' && <span style={{ color: '#909399' }}>NT$</span>}
                <NumberInput value={form.conditionValue} onChange={v => set('conditionValue', v)} width={140}
                  placeholder={form.conditionType === 'amount' ? '例：500' : '例：3'} />
                {form.conditionType === 'qty' && <span style={{ color: '#909399' }}>件</span>}
              </div>
            </FormField>
          )}

          {/* 計算基準（整單免運 + 滿額門檻才顯示）*/}
          {form.freeshipType === 'all' && form.conditionType === 'amount' && (
            <FormField label={
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                計算基準
                <span style={{ position: 'relative', display: 'inline-block' }}
                  title="決定以哪個金額判斷是否達到免運門檻。「折扣後金額」含優惠券折扣；「購物金點數折抵後金額」另再扣除點數折抵。">
                  <span style={{ fontSize: 13, color: '#909399', cursor: 'help' }}>ⓘ</span>
                </span>
              </span>
            }>
              <div style={{ display: 'flex', gap: 16 }}>
                {[
                  { v: 'after_discount', l: '折扣後金額' },
                  { v: 'after_points',   l: '購物金點數折抵後金額' },
                ].map(o => (
                  <label key={o.v} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                    <input type="radio" checked={form.calcBasis === o.v} onChange={() => set('calcBasis', o.v)} />
                    <span style={{ fontSize: 14 }}>{o.l}</span>
                  </label>
                ))}
              </div>
            </FormField>
          )}

          <div style={{ padding: '12px 14px', background: '#F0F9EB', border: '1px solid #B3E19D', fontSize: 13, color: '#606266', lineHeight: 1.7 }}>
            達到條件後，系統將自動免除本次訂單的運費，無需顧客手動操作或輸入折扣碼。
          </div>
        </SectionCard>
      </div>
      <FixedBar onCancel={() => onNavigate('marketing-promotions')}
        onSave={() => { show('免運活動已建立', 'success'); onNavigate('marketing-promotions'); }} />
    </div>
  );
}

// ─── SCREEN 4B: 贈品活動 新增表單 ────────────────────────────────────────────
const MOCK_GIFT_PRODUCTS = [
  { name: '質感購物袋', stock: 120 },
  { name: '旅行組合包', stock: 0   },
  { name: '環保水瓶',   stock: 55  },
  { name: '手工皂禮盒', stock: 38  },
  { name: '帆布托特包', stock: 15  },
];
function GiftFormPage({ onNavigate, show }) {
  const [form, setForm] = React.useState({
    name: '', conditionType: 'amount', conditionValue: '',
    giftProduct: null, giftQty: '1', stockAction: 'pause',
    productScope: 'all', description: '', enabled: false,
    startDate: '', endDate: '',
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const [giftQuery, setGiftQuery] = React.useState('');
  const [giftOpen, setGiftOpen] = React.useState(false);
  const filteredGifts = MOCK_GIFT_PRODUCTS.filter(g => g.name.includes(giftQuery));

  return (
    <div>
      <PageHeader title="新增贈品活動" onBack={() => onNavigate('marketing-promotions')}
        breadcrumbs={['行銷中心', '優惠活動', '滿額滿件優惠', '新增贈品活動']} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

        {/* 左欄：通用設定 */}
        <SectionCard title="通用設定">
          <FormField label="活動名稱" required helper="最多 50 字，商家自用，不顯示於前台。">
            <EInput value={form.name} onChange={v => set('name', v)} placeholder="例：滿千五送好禮" />
          </FormField>
          <FormField label="活動期間" required helper="活動開始前可儲存草稿，到時間後依啟用狀態自動生效。">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <EInput type="date" value={form.startDate} onChange={v => set('startDate', v)} style={{ width: 150 }} />
              <span style={{ color: '#909399' }}>至</span>
              <EInput type="date" value={form.endDate} onChange={v => set('endDate', v)} style={{ width: 150 }} />
            </div>
          </FormField>
          <FormField label="適用產品範圍" helper="可限定只計入指定分類或產品的金額或件數。">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[{ v: 'all', l: '全部產品' }, { v: 'category', l: '指定分類' }, { v: 'product', l: '指定產品' }].map(o => (
                <label key={o.v} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="radio" checked={form.productScope === o.v} onChange={() => set('productScope', o.v)} />
                  <span style={{ fontSize: 14 }}>{o.l}</span>
                </label>
              ))}
              {form.productScope !== 'all' && (
                <div style={{ padding: '10px 12px', background: '#F5F7FA', border: '1px solid #DCDFE6' }}>
                  <EInput placeholder={`輸入${form.productScope === 'category' ? '分類' : '產品'}名稱搜尋…`} onChange={() => {}} />
                  <div style={{ fontSize: 12, color: '#909399', marginTop: 6 }}>尚未選擇任何{form.productScope === 'category' ? '分類' : '產品'}</div>
                </div>
              )}
            </div>
          </FormField>
          <FormField label="活動說明（前台顯示）" helper="選填，最多 100 字，顯示於購物車旁說明文字。">
            <textarea value={form.description} onChange={e => set('description', e.target.value)} maxLength={100}
              placeholder="例：消費滿 NT$1,500 即贈好禮一份"
              style={{ width: '100%', minHeight: 72, padding: '8px 12px', border: '1px solid #DCDFE6', resize: 'vertical', fontSize: 14, fontFamily: 'inherit', outline: 'none', lineHeight: 1.6, color: '#303133' }} />
            <div style={{ fontSize: 12, color: '#909399', textAlign: 'right' }}>{form.description.length}/100</div>
          </FormField>
          <PublishStatusField enabled={form.enabled} onChangeEnabled={v => set('enabled', v)} startDate={form.startDate} endDate={form.endDate} />
        </SectionCard>

        {/* 右欄：贈品設定 */}
        <SectionCard title="贈品設定">
          <FormField label="條件類型" required>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { v: 'amount', l: '訂單金額滿 NT$X 送贈品（滿額贈品）' },
                { v: 'qty',    l: '訂單商品件數滿 N 件送贈品（滿件贈品）' },
              ].map(o => (
                <label key={o.v} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px',
                  border: `1px solid ${form.conditionType === o.v ? '#409EFF' : '#DCDFE6'}`,
                  background: form.conditionType === o.v ? '#EFF7FF' : '#fff', cursor: 'pointer' }}>
                  <input type="radio" checked={form.conditionType === o.v} onChange={() => { set('conditionType', o.v); set('conditionValue', ''); }} style={{ marginTop: 2 }} />
                  <span style={{ fontSize: 14 }}>{o.l}</span>
                </label>
              ))}
            </div>
          </FormField>
          <FormField label="條件數值" required
            helper={form.conditionType === 'amount' ? '消費者購物車折後金額達此數值後，系統自動加入贈品。' : '消費者購物車中符合適用範圍的商品件數達此數值後，自動加入贈品。'}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {form.conditionType === 'amount' && <span style={{ color: '#909399' }}>NT$</span>}
              <NumberInput value={form.conditionValue} onChange={v => set('conditionValue', v)} width={140}
                placeholder={form.conditionType === 'amount' ? '例：1500' : '例：3'} />
              {form.conditionType === 'qty' && <span style={{ color: '#909399' }}>件</span>}
            </div>
          </FormField>
          <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>贈品產品<InfoTooltip content="建議將贈品的「定價」設為 NT$0，以免贈品售價影響訂單金額計算。贈品庫存會在訂單成立時自動扣除。" /></span>}
            required helper="選定後顯示目前庫存數量。">
            <div style={{ position: 'relative' }}>
              <EInput value={giftQuery} onChange={v => { setGiftQuery(v); setGiftOpen(true); }}
                placeholder="輸入產品名稱搜尋…" />
              {giftOpen && giftQuery.length > 0 && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', border: '1px solid #DCDFE6', zIndex: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', maxHeight: 200, overflowY: 'auto' }}>
                  {filteredGifts.length === 0 ? (
                    <div style={{ padding: '10px 12px', fontSize: 13, color: '#909399' }}>找不到符合的產品</div>
                  ) : filteredGifts.map(g => (
                    <div key={g.name} onClick={() => { set('giftProduct', g); setGiftQuery(''); setGiftOpen(false); }}
                      style={{ padding: '10px 12px', fontSize: 13, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#F5F7FA'}
                      onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
                      <span>{g.name}</span>
                      <span style={{ fontSize: 12, color: g.stock === 0 ? '#F56C6C' : '#909399' }}>剩餘庫存：{g.stock} 件</span>
                    </div>
                  ))}
                </div>
              )}
              {form.giftProduct && (
                <div style={{ marginTop: 8, padding: '8px 12px', background: '#F5F7FA', border: '1px solid #DCDFE6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{form.giftProduct.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 12, color: form.giftProduct.stock === 0 ? '#F56C6C' : '#909399' }}>
                      剩餘庫存：{form.giftProduct.stock} 件
                    </span>
                    <span onClick={() => set('giftProduct', null)} style={{ fontSize: 12, color: '#C0C4CC', cursor: 'pointer' }}>移除</span>
                  </div>
                </div>
              )}
              {form.giftProduct && form.giftProduct.stock === 0 && (
                <div style={{ marginTop: 6, padding: '8px 12px', background: '#FDF6EC', border: '1px solid #F5DAB1', fontSize: 12, color: '#E6A23C' }}>
                  此產品目前無庫存，活動啟用後若庫存仍為 0，將依「贈品庫存不足時」的設定處理。
                </div>
              )}
            </div>
          </FormField>
          <FormField label="贈品數量" required helper="每筆達標訂單贈送幾件，最少 1 件。">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <NumberInput value={form.giftQty} onChange={v => set('giftQty', v)} width={100} />
              <span style={{ color: '#909399' }}>件</span>
            </div>
          </FormField>
          <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>贈品庫存不足時<InfoTooltip content="推薦選「自動暫停」，可避免消費者達門檻後無法獲贈的落差體驗。選「繼續但不發」則系統不會通知消費者無法獲贈，需自行追蹤庫存。" /></span>}
            required>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { v: 'pause',    l: '自動暫停贈品發送（推薦）', d: '庫存不足時暫停送贈品，消費者購物體驗不受影響' },
                { v: 'continue', l: '繼續活動但不發贈品',       d: '消費者達條件後仍不會收到贈品，可能造成體驗落差' },
              ].map(o => (
                <label key={o.v} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px',
                  border: `1px solid ${form.stockAction === o.v ? '#409EFF' : '#DCDFE6'}`,
                  background: form.stockAction === o.v ? '#EFF7FF' : '#fff', cursor: 'pointer' }}>
                  <input type="radio" checked={form.stockAction === o.v} onChange={() => set('stockAction', o.v)} style={{ marginTop: 2 }} />
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 13 }}>{o.l}</div>
                    <div style={{ fontSize: 12, color: '#909399', marginTop: 2 }}>{o.d}</div>
                  </div>
                </label>
              ))}
            </div>
          </FormField>
        </SectionCard>
      </div>
      <FixedBar onCancel={() => onNavigate('marketing-promotions')}
        onSave={() => { show('贈品活動已建立', 'success'); onNavigate('marketing-promotions'); }} />
    </div>
  );
}

// ─── SCREEN 4C: 限時折扣活動 新增表單（進階電商包）──────────────────────────
function FlashSaleFormPage({ onNavigate, show }) {
  const [isPro] = React.useState(window.__evomni_isPro || false);
  const [form, setForm] = React.useState({
    name: '', discountType: 'percent', discountValue: '',
    productScope: 'all', description: '', enabled: false,
    showCountdown: false, showOriginalPrice: false,
    startDate: '', endDate: '',
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div>
      {!isPro && <UpgradeLockBanner featureName="限時折扣活動"
        valueProp="可對指定產品設定期間折扣，並在產品頁顯示倒數計時，製造購買緊迫感"
        onLearnMore={() => {}} />}
      <PageHeader title="新增限時折扣活動" onBack={() => onNavigate('marketing-promotions')}
        breadcrumbs={['行銷中心', '優惠活動', '滿額滿件優惠', '新增限時折扣活動']} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

        {/* 左欄：通用設定 */}
        <SectionCard title="通用設定">
          <FormField label="活動名稱" required helper="最多 50 字，商家自用，不顯示於前台。">
            <EInput value={form.name} onChange={v => set('name', v)} placeholder="例：週末特賣七折" />
          </FormField>
          <FormField label="活動期間" required helper="活動開始前可儲存草稿，到時間後依啟用狀態自動生效。">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <EInput type="date" value={form.startDate} onChange={v => set('startDate', v)} style={{ width: 150 }} />
              <span style={{ color: '#909399' }}>至</span>
              <EInput type="date" value={form.endDate} onChange={v => set('endDate', v)} style={{ width: 150 }} />
            </div>
          </FormField>
          <FormField label="適用產品範圍">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[{ v: 'all', l: '全部產品' }, { v: 'category', l: '指定分類' }, { v: 'product', l: '指定產品' }].map(o => (
                <label key={o.v} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="radio" checked={form.productScope === o.v} onChange={() => set('productScope', o.v)} />
                  <span style={{ fontSize: 14 }}>{o.l}</span>
                </label>
              ))}
              {form.productScope !== 'all' && (
                <div style={{ padding: '10px 12px', background: '#F5F7FA', border: '1px solid #DCDFE6' }}>
                  <EInput placeholder={`輸入${form.productScope === 'category' ? '分類' : '產品'}名稱搜尋…`} onChange={() => {}} />
                  <div style={{ fontSize: 12, color: '#909399', marginTop: 6 }}>尚未選擇任何{form.productScope === 'category' ? '分類' : '產品'}</div>
                </div>
              )}
            </div>
          </FormField>
          <FormField label="活動說明（前台顯示）" helper="選填，最多 100 字，顯示於前台購物車旁說明文字。">
            <textarea value={form.description} onChange={e => set('description', e.target.value)} maxLength={100}
              placeholder="例：本活動適用期間不可與其他優惠同時使用"
              style={{ width: '100%', minHeight: 72, padding: '8px 12px', border: '1px solid #DCDFE6', resize: 'vertical', fontSize: 14, fontFamily: 'inherit', outline: 'none', lineHeight: 1.6, color: '#303133' }} />
            <div style={{ fontSize: 12, color: '#909399', textAlign: 'right' }}>{form.description.length}/100</div>
          </FormField>
          <PublishStatusField enabled={form.enabled} onChangeEnabled={v => set('enabled', v)} startDate={form.startDate} endDate={form.endDate} />
        </SectionCard>

        {/* 右欄：折扣設定 */}
        <SectionCard title="折扣設定">
          <FormField label="折扣類型" required>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[{ v: 'percent', l: '百分比折扣' }, { v: 'fixed', l: '固定金額折扣' }].map(o => (
                <label key={o.v} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px',
                  border: `1px solid ${form.discountType === o.v ? '#409EFF' : '#DCDFE6'}`,
                  background: form.discountType === o.v ? '#EFF7FF' : '#fff', cursor: 'pointer' }}>
                  <input type="radio" checked={form.discountType === o.v} onChange={() => set('discountType', o.v)} />
                  <span style={{ fontSize: 14 }}>{o.l}</span>
                </label>
              ))}
            </div>
          </FormField>
          <FormField label="折扣數值" required
            helper={form.discountType === 'percent' ? '輸入 1–99 的整數，輸入 20 代表打八折（折扣 20%）。' : '最少 NT$1。'}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {form.discountType === 'fixed' && <span style={{ color: '#909399' }}>NT$</span>}
              <NumberInput value={form.discountValue} onChange={v => set('discountValue', v)} width={120}
                placeholder={form.discountType === 'percent' ? '例：20' : '例：200'} />
              {form.discountType === 'percent' && <span style={{ color: '#909399' }}>%（輸入 20 = 打八折）</span>}
            </div>
          </FormField>
          <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>前台倒數計時顯示<InfoTooltip content="倒數計時顯示格式為「時:分:秒」，每秒即時更新。活動結束後自動停止顯示，不需手動關閉。建議搭配「顯示原價劃除」一起開啟，視覺效果更好。" /></span>}
            helper="開啟後，前台產品頁顯示「距活動結束剩餘時間」倒數計時器。">
            <div style={{ padding: '12px 16px', background: form.showCountdown ? '#EFF7FF' : '#F5F7FA', border: `1px solid ${form.showCountdown ? '#409EFF' : '#DCDFE6'}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Switch checked={form.showCountdown} onChange={v => set('showCountdown', v)} />
                <span style={{ fontSize: 13, color: '#606266' }}>
                  {form.showCountdown ? '已開啟 — 產品頁顯示倒數計時器' : '已關閉'}
                </span>
              </div>
              {form.showCountdown && (
                <div style={{ marginTop: 8, padding: '6px 10px', background: '#fff', border: '1px solid #DCDFE6', fontSize: 12, color: '#606266' }}>
                  預覽效果：距活動結束 <span style={{ fontWeight: 700, color: '#F56C6C', fontVariantNumeric: 'tabular-nums' }}>23:41:08</span>
                </div>
              )}
            </div>
          </FormField>
          <FormField label="顯示原價劃除" helper="開啟後，前台折扣價旁以劃除樣式顯示原始售價。">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Switch checked={form.showOriginalPrice} onChange={v => set('showOriginalPrice', v)} />
              <span style={{ fontSize: 13, color: '#606266' }}>
                {form.showOriginalPrice ? '已開啟 — 折扣價旁顯示劃除原價' : '已關閉'}
              </span>
            </div>
            {form.showOriginalPrice && form.discountType === 'percent' && form.discountValue && (
              <div style={{ marginTop: 8, padding: '8px 12px', background: '#F5F7FA', border: '1px solid #DCDFE6', fontSize: 12, color: '#606266' }}>
                預覽效果：<span style={{ textDecoration: 'line-through', color: '#C0C4CC', marginRight: 6 }}>NT$1,200</span>
                <span style={{ color: '#F56C6C', fontWeight: 700 }}>NT${Math.round(1200 * (1 - parseInt(form.discountValue || 0) / 100))}</span>
              </div>
            )}
          </FormField>
        </SectionCard>
      </div>
      <FixedBar onCancel={() => onNavigate('marketing-promotions')}
        onSave={() => { show('限時折扣活動已建立', 'success'); onNavigate('marketing-promotions'); }} />
    </div>
  );
}

// ─── SCREEN 4D: 組合優惠（紅配綠）活動 新增表單（進階電商包）─────────────────
const MOCK_BUNDLE_PRODUCTS = ['休閒上衣A款', '休閒上衣B款', '條紋長袖T', '牛仔褲', '休閒長褲', '棉質短褲', '牛仔外套', '連帽帽T'];
function BundleFormPage({ onNavigate, show }) {
  const [isPro] = React.useState(window.__evomni_isPro || false);
  const [form, setForm] = React.useState({
    name: '', discountType: 'percent', discountValue: '',
    description: '', enabled: false, startDate: '', endDate: '',
  });
  const [groupA, setGroupA] = React.useState([]);
  const [groupB, setGroupB] = React.useState([]);
  const [queryA, setQueryA] = React.useState('');
  const [queryB, setQueryB] = React.useState('');
  const [openA, setOpenA] = React.useState(false);
  const [openB, setOpenB] = React.useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const conflict = groupA.filter(p => groupB.includes(p));

  const ProductGroupPicker = ({ label, color, items, setItems, query, setQuery, open, setOpen }) => (
    <div style={{ borderLeft: `4px solid ${color}`, paddingLeft: 14 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color, marginBottom: 8 }}>{label}</div>
      <div style={{ position: 'relative' }}>
        <EInput value={query} onChange={v => { setQuery(v); setOpen(true); }}
          placeholder="輸入分類名稱或產品名稱搜尋…" />
        {open && query.length > 0 && (
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', border: '1px solid #DCDFE6', zIndex: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', maxHeight: 180, overflowY: 'auto' }}>
            {MOCK_BUNDLE_PRODUCTS.filter(p => p.includes(query) && !items.includes(p)).length === 0 ? (
              <div style={{ padding: '8px 12px', fontSize: 13, color: '#909399' }}>找不到符合的產品</div>
            ) : MOCK_BUNDLE_PRODUCTS.filter(p => p.includes(query) && !items.includes(p)).map(p => (
              <div key={p} onClick={() => { setItems([...items, p]); setQuery(''); setOpen(false); }}
                style={{ padding: '8px 12px', fontSize: 13, cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = '#F5F7FA'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
                {p}
              </div>
            ))}
          </div>
        )}
      </div>
      {items.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
          {items.map(p => (
            <span key={p} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px',
              background: color + '15', border: `1px solid ${color}55`, fontSize: 12, color: '#303133', borderRadius: 9999 }}>
              {p}
              <span onClick={() => setItems(items.filter(x => x !== p))}
                style={{ cursor: 'pointer', color: '#C0C4CC', fontSize: 14 }}>×</span>
            </span>
          ))}
        </div>
      )}
      {items.length === 0 && <div style={{ fontSize: 12, color: '#C0C4CC', marginTop: 6 }}>尚未加入任何產品或分類</div>}
    </div>
  );

  return (
    <div>
      {!isPro && <UpgradeLockBanner featureName="組合優惠（紅配綠）"
        valueProp="設定 A 組 + B 組產品組合購買享折扣，有效帶動交叉銷售"
        onLearnMore={() => {}} />}
      <PageHeader title="新增組合優惠活動" onBack={() => onNavigate('marketing-promotions')}
        breadcrumbs={['行銷中心', '優惠活動', '滿額滿件優惠', '新增組合優惠活動']} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

        <SectionCard title="基本設定">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <FormField label="活動名稱" required helper="最多 50 字，商家自用，不顯示於前台。">
              <EInput value={form.name} onChange={v => set('name', v)} placeholder="例：上衣搭褲子享折扣" />
            </FormField>
            <FormField label="活動期間" required>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <EInput type="date" value={form.startDate} onChange={v => set('startDate', v)} style={{ width: 150 }} />
                <span style={{ color: '#909399' }}>至</span>
                <EInput type="date" value={form.endDate} onChange={v => set('endDate', v)} style={{ width: 150 }} />
              </div>
            </FormField>
          </div>
          <PublishStatusField enabled={form.enabled} onChangeEnabled={v => set('enabled', v)} startDate={form.startDate} endDate={form.endDate} />
        </SectionCard>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <SectionCard title="A 組產品（主購品）">
            <div style={{ fontSize: 12, color: '#606266', marginBottom: 12, padding: '8px 12px', background: '#FFF5F5', border: '1px solid #FFE0E0', lineHeight: 1.6 }}>
              主購品，例：上衣系列。消費者需從此組選購至少一件。
            </div>
            <ProductGroupPicker label="A 組（主購品）" color="#F56C6C"
              items={groupA} setItems={setGroupA}
              query={queryA} setQuery={setQueryA}
              open={openA} setOpen={setOpenA} />
          </SectionCard>
          <SectionCard title="B 組產品（搭配品）">
            <div style={{ fontSize: 12, color: '#606266', marginBottom: 12, padding: '8px 12px', background: '#F0FFF4', border: '1px solid #D0F0DC', lineHeight: 1.6 }}>
              搭配品，例：褲子系列。消費者從 A 組和 B 組各選一件，即可享有以下優惠。
            </div>
            <ProductGroupPicker label="B 組（搭配品）" color="#67C23A"
              items={groupB} setItems={setGroupB}
              query={queryB} setQuery={setQueryB}
              open={openB} setOpen={setOpenB} />
          </SectionCard>
        </div>

        {conflict.length > 0 && (
          <div style={{ padding: '10px 16px', background: '#FDF6EC', border: '1px solid #F5DAB1', fontSize: 13, color: '#E6A23C' }}>
            有 {conflict.length} 件產品（{conflict.join('、')}）同時出現在 A 組和 B 組中，建議將同一產品移至同一組。
          </div>
        )}

        <SectionCard title="優惠條件">
          <FormField label="優惠類型" required>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { v: 'percent', l: 'A 組＋B 組各一件，享百分比折扣' },
                { v: 'fixed',   l: 'A 組＋B 組各一件，享固定金額折扣' },
              ].map(o => (
                <label key={o.v} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
                  border: `1px solid ${form.discountType === o.v ? '#409EFF' : '#DCDFE6'}`,
                  background: form.discountType === o.v ? '#EFF7FF' : '#fff', cursor: 'pointer' }}>
                  <input type="radio" checked={form.discountType === o.v} onChange={() => set('discountType', o.v)} />
                  <span style={{ fontSize: 14 }}>{o.l}</span>
                </label>
              ))}
            </div>
          </FormField>
          <FormField label="折扣數值" required
            helper={form.discountType === 'percent' ? '輸入 1–99 的整數，輸入 20 代表打八折。' : '最少 NT$1。'}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {form.discountType === 'fixed' && <span style={{ color: '#909399' }}>NT$</span>}
              <NumberInput value={form.discountValue} onChange={v => set('discountValue', v)} width={120}
                placeholder={form.discountType === 'percent' ? '例：20' : '例：200'} />
              {form.discountType === 'percent' && <span style={{ color: '#909399' }}>%</span>}
            </div>
          </FormField>
          <FormField label="活動說明（前台顯示）" helper="選填，最多 100 字，顯示於前台購物車旁說明文字。">
            <textarea value={form.description} onChange={e => set('description', e.target.value)} maxLength={100}
              placeholder="例：上衣＋褲子組合購買享 NT$200 折扣"
              style={{ width: '100%', minHeight: 72, padding: '8px 12px', border: '1px solid #DCDFE6', resize: 'vertical', fontSize: 14, fontFamily: 'inherit', outline: 'none', lineHeight: 1.6, color: '#303133' }} />
            <div style={{ fontSize: 12, color: '#909399', textAlign: 'right' }}>{form.description.length}/100</div>
          </FormField>
        </SectionCard>
      </div>
      <FixedBar onCancel={() => onNavigate('marketing-promotions')}
        onSave={() => { show('組合優惠活動已建立', 'success'); onNavigate('marketing-promotions'); }} />
    </div>
  );
}

// ─── SCREEN 5: 旅程總覽 ───────────────────────────────────────────────────────
function JourneyOverviewPage({ onNavigate, show }) {
  const [enabled, setEnabled] = React.useState({ cart: true, sleep: false, loss: false, post: true, expiry: false });
  const [isPro, setIsPro] = React.useState(window.__evomni_isPro || false);
  React.useEffect(() => {
    const handler = e => setIsPro(e.detail.isPro);
    window.addEventListener('evomni:planchange', handler);
    return () => window.removeEventListener('evomni:planchange', handler);
  }, []);

  const JOURNEYS = [
    {
      key: 'cart',   page: 'journey-cart',
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M5 7h3l3 10h10l2-7H9" stroke="#409EFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12.5" cy="19.5" r="1.5" fill="#409EFF"/>
          <circle cx="19.5" cy="19.5" r="1.5" fill="#409EFF"/>
        </svg>
      ),
      title: '購物車未結帳挽回',
      desc: '顧客將產品加入購物車後超過設定時間未結帳，系統自動發送提醒訊息喚回購買意願。',
      configured: true,
      stats: [{ l: '本月觸發', v: '48' }, { l: '訊息送達', v: '45' }, { l: '挽回率', v: '18.7%' }],
    },
    {
      key: 'sleep',  page: 'journey-sleep',
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M20 14a8 8 0 1 1-8-8 6 6 0 0 0 8 8z" stroke="#409EFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: '沉睡客喚醒',
      desc: '90–180 天未消費的會員，系統每日自動偵測並觸發喚醒訊息，搭配專屬優惠提升回購率。',
      configured: false,
      stats: [{ l: '本月觸發', v: '—' }, { l: '訊息送達', v: '—' }, { l: '喚回率', v: '—' }],
    },
    {
      key: 'loss',   page: 'journey-loss',
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="12" cy="10" r="3.5" stroke="#409EFF" strokeWidth="1.6" fill="none"/>
          <path d="M5 23c0-3.9 3.1-7 7-7" stroke="#409EFF" strokeWidth="1.6" strokeLinecap="round"/>
          <path d="M18 17l4 4m0-4l-4 4" stroke="#409EFF" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      ),
      title: '流失客挽留',
      desc: '超過 180 天未消費的會員，系統自動觸發強力挽留訊息，可搭配 RFM 分群篩選高價值客群。',
      configured: false,
      stats: [{ l: '本月觸發', v: '—' }, { l: '訊息送達', v: '—' }, { l: '挽回率', v: '—' }],
    },
    {
      key: 'post',   page: 'journey-post',
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M8 11h12l-1.5 9H9.5L8 11z" stroke="#409EFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 11V9a3 3 0 0 1 6 0v2" stroke="#409EFF" strokeWidth="1.6" strokeLinecap="round"/>
          <path d="M14 14l.6 1.3 1.4.2-1 1 .24 1.4-1.24-.65-1.24.65.24-1.4-1-1 1.4-.2.6-1.3z" fill="#409EFF"/>
        </svg>
      ),
      title: '購後推薦再行銷',
      desc: '顧客完成購買後，根據購買品項自動推薦搭配產品，促進二次購買。',
      configured: true,
      stats: [{ l: '本月觸發', v: '132' }, { l: '訊息送達', v: '130' }, { l: '點擊率', v: '24.2%' }],
    },
    {
      key: 'expiry', page: 'journey-expiry',
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="7" stroke="#409EFF" strokeWidth="1.6" fill="none"/>
          <path d="M14 10v4l3 3" stroke="#409EFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: '點數 / 優惠券到期提醒',
      desc: '在會員點數或優惠券即將到期前自動發送提醒，降低遺失率並促進消費。',
      configured: false,
      stats: [{ l: '本月觸發', v: '—' }, { l: '訊息送達', v: '—' }, { l: '點擊率', v: '—' }],
    },
  ];

  return (
    <div>
      <PageHeader title="自動化旅程" breadcrumbs={['行銷中心', '自動化行銷', '旅程總覽']} />
      {!isPro && <UpgradeLockBanner featureName="自動化行銷旅程" valueProp="讓行銷工作自動化、用數據驅動再行銷" onLearnMore={() => show('請前往「全域設定 → 方案狀態」查看升級方案，或聯絡您的營運輔導顧問', 'info')} />}
      <div style={{ filter: !isPro ? 'blur(3px)' : 'none', pointerEvents: isPro ? 'auto' : 'none' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {JOURNEYS.map(j => (
          <div key={j.key} style={{ background: '#fff', border: '1px solid #DCDFE6', padding: 24, borderRadius: 3 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, marginTop: 2 }}>{j.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{j.title}</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <StatusTag type={enabled[j.key] ? 'success' : 'info'}>{enabled[j.key] ? '啟用中' : '停用'}</StatusTag>
                    {!j.configured && <StatusTag type="warning">未完成設定</StatusTag>}
                  </div>
                </div>
              </div>
              <Switch checked={enabled[j.key]} onChange={v => {
                setEnabled(e => ({ ...e, [j.key]: v }));
                show(v ? `${j.title} 已啟用` : `${j.title} 已停用`, v ? 'success' : 'warning');
              }} />
            </div>
            <p style={{ fontSize: 13, color: '#909399', lineHeight: 1.65, marginBottom: 16 }}>{j.desc}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '12px 0', borderTop: '1px solid #EBEEF5', borderBottom: '1px solid #EBEEF5', marginBottom: 16 }}>
              {j.stats.map(s => (
                <div key={s.l} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#303133' }}>{s.v}</div>
                  <div style={{ fontSize: 11, color: '#909399', marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
            <EvoBtn variant="ghost" onClick={() => onNavigate(j.page)}>前往設定 →</EvoBtn>
          </div>
        ))}
      </div>
      </div>{/* end isPro wrapper */}
    </div>
  );
}

// ─── SCREEN 6: 購物車挽回 ────────────────────────────────────────────────────
function CartRecoveryPage({ onNavigate, show }) {
  const [tab, setTab] = React.useState('trigger');
  const [enabled, setEnabled] = React.useState(true);
  const [delay, setDelay] = React.useState('1');
  const [delayUnit, setDelayUnit] = React.useState('hour');
  const [cooldown, setCooldown] = React.useState('3');
  const [includeCoupon, setIncludeCoupon] = React.useState(false);
  const [lineEnabled, setLineEnabled] = React.useState(true);
  const [lineConnected] = React.useState(false);
  const [isPro, setIsPro] = React.useState(window.__evomni_isPro || false);
  React.useEffect(() => {
    const handler = e => setIsPro(e.detail.isPro);
    window.addEventListener('evomni:planchange', handler);
    return () => window.removeEventListener('evomni:planchange', handler);
  }, []);

  return (
    <div>
      <PageHeader title="購物車未結帳挽回" onBack={() => onNavigate('journey-overview')} breadcrumbs={['行銷中心', '自動化行銷', '購物車挽回']} />
      {!isPro && <UpgradeLockBanner featureName="自動化行銷旅程" valueProp="讓行銷工作自動化、用數據驅動再行銷" onLearnMore={() => show('請前往「全域設定 → 方案狀態」查看升級方案，或聯絡您的營運輔導顧問', 'info')} />}
      <div style={{ filter: !isPro ? 'blur(3px)' : 'none', pointerEvents: isPro ? 'auto' : 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', background: '#fff', border: '1px solid #DCDFE6', marginBottom: 16, borderRadius: 3 }}>
        <span style={{ fontWeight: 600 }}>旅程狀態</span>
        <Switch checked={enabled} onChange={v => { setEnabled(v); show(v ? '旅程已啟用' : '旅程已停用', v ? 'success' : 'warning'); }} />
        <span style={{ fontSize: 13, color: '#909399' }}>{enabled ? '啟用中 — 顧客將自動收到購物車提醒訊息' : '停用中 — 旅程不會自動觸發'}</span>
      </div>
      <ETabs
        tabs={[{ id: 'trigger', label: '觸發條件' }, { id: 'message', label: '訊息設定' }, { id: 'stats', label: '旅程數據' }]}
        active={tab} onChange={setTab} style={{ marginBottom: 0 }}
      />

      {tab === 'trigger' && (
        <SectionCard title="觸發條件設定">
          <div style={{ maxWidth: 520 }}>
            <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>等待多久後發送<InfoTooltip content="顧客將產品加入購物車後，若未完成結帳，系統等待此時間後自動發送提醒。建議 1–3 小時，太快會打擾顧客，太慢則挽回效果降低。" /></span>} required>
              <div style={{ display: 'flex', gap: 8 }}>
                <NumberInput value={delay} onChange={setDelay} width={80} />
                <ESelect value={delayUnit} onChange={setDelayUnit} width={120} options={[{ value: 'hour', label: '小時後' }, { value: 'day', label: '天後' }]} />
              </div>
            </FormField>
            <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>冷卻期<InfoTooltip content="同一位顧客在此天數內已觸發過購物車挽回旅程，就不會再次收到提醒，避免反覆打擾。預設值為 3 天。" /></span>}
              helper="冷卻期內，同一位顧客不會重複收到購物車提醒。">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <NumberInput value={cooldown} onChange={setCooldown} width={80} />
                <span style={{ color: '#909399' }}>天</span>
                <span style={{ fontSize: 12, color: '#C0C4CC' }}>最短 1 天，最長 30 天</span>
              </div>
            </FormField>
            <FormField label="觸發條件">
              <div style={{ padding: '10px 14px', background: '#F5F7FA', border: '1px solid #DCDFE6', fontSize: 13, color: '#606266' }}>加入購物車後，在等待時間內未完成結帳</div>
            </FormField>
          </div>
        </SectionCard>
      )}

      {tab === 'message' && (
        <SectionCard title="訊息設定">
          <div style={{ maxWidth: 600 }}>
            <FormField label="Email 主旨" required>
              <EInput value="嘿！您的購物車還有產品等著您" onChange={() => {}} placeholder="請輸入 Email 主旨" />
            </FormField>
            <FormField label="開場問候語" required helper="此段文字將顯示在 Email 正文最上方，最多 200 字。">
              <textarea
                defaultValue={'親愛的 {{姓名}}，\n\n您上次瀏覽時，我們發現您還有產品留在購物車中還未結帳。現在回來完成購買，讓這些產品早日到達您手中吧！'}
                style={{ width: '100%', height: 100, padding: '8px 12px', border: '1px solid #DCDFE6', fontSize: 13, color: '#303133', resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.7 }}
              />
            </FormField>
            <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>同時發送 LINE 推播<InfoTooltip content="開啟後，除 Email 外也會透過 LINE 官方帳號發送提醒。消費者需已綁定 LINE 帳號才能收到。需先完成 LINE OA 串接設定。" /></span>}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: lineEnabled && !lineConnected ? 12 : 0 }}>
                <Switch checked={lineEnabled} onChange={setLineEnabled} />
                <span style={{ fontSize: 13, color: '#606266' }}>{lineEnabled ? '開啟 LINE 推播' : '僅發送 Email'}</span>
              </div>
              {lineEnabled && !lineConnected && (
                <Banner type="warning" cta="前往 LINE OA 設定" onCta={() => onNavigate('line-oa')}>
                  尚未完成 LINE OA 串接，開啟後暫時只會發送 Email。請先完成串接設定才能啟用 LINE 推播。
                </Banner>
              )}
            </FormField>
            <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>是否附上優惠券<InfoTooltip content="開啟後，系統在發送提醒訊息時自動附上選定的優惠券，提升顧客回購意願。附上優惠券可提升挽回率約 15–20%。" /></span>}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: includeCoupon ? 12 : 0 }}>
                <Switch checked={includeCoupon} onChange={setIncludeCoupon} />
                <span style={{ fontSize: 13, color: '#909399' }}>附上優惠券可提升挽回率約 15–20%</span>
              </div>
              {includeCoupon && (
                <ESelect value="" onChange={() => {}} width={320} placeholder="選擇要附上的優惠券…"
                  options={[{ value: 'summer20', label: 'SUMMER20 — 夏日折扣碼（八折）' }, { value: 'welcome', label: '新會員歡迎券（NT$150）' }]}
                />
              )}
            </FormField>
          </div>
        </SectionCard>
      )}

      {tab === 'stats' && (
        <SectionCard title="旅程數據（本月）">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
            {[{ l: '觸發次數', v: '48', c: '#409EFF' }, { l: '訊息送達', v: '45', c: '#67C23A' }, { l: '點擊回購', v: '9', c: '#E6A23C' }, { l: '挽回率', v: '18.7%', c: '#F56C6C' }].map(s => (
              <div key={s.l} style={{ padding: 20, border: '1px solid #DCDFE6', textAlign: 'center' }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: s.c, marginBottom: 6 }}>{s.v}</div>
                <div style={{ fontSize: 12, color: '#909399' }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'right', marginBottom: 8 }}>
            <EvoBtn variant="secondary" size="sm" onClick={() => onNavigate('push-logs')}>查看完整推播記錄 →</EvoBtn>
          </div>
          <div style={{ padding: 40, textAlign: 'center', color: '#C0C4CC', border: '1px dashed #DCDFE6', fontSize: 13 }}>趨勢圖表（整合中）</div>
        </SectionCard>
      )}

      <FixedBar onCancel={() => onNavigate('journey-overview')} onSave={() => show('旅程設定已儲存', 'success')} />
      </div>{/* end isPro wrapper */}
    </div>
  );
}

// ─── SCREEN 7: 沉睡 / 流失客喚醒 ─────────────────────────────────────────────
function SleepWakeupPage({ onNavigate, show, initialTab = 'sleep' }) {
  const [tab, setTab] = React.useState(initialTab);
  const [sleepEnabled, setSleepEnabled] = React.useState(false);
  const [lossEnabled, setLossEnabled] = React.useState(false);
  const [lineConnected] = React.useState(false);
  const [sleepForm, setSleepForm] = React.useState({ time: '10:00', cooldown: '30', coupon: '', lineEnabled: false });
  const [lossForm, setLossForm] = React.useState({ time: '10:00', cooldown: '30', coupon: '', rfm: false, lineEnabled: false });
  const setSleep = (k, v) => setSleepForm(f => ({ ...f, [k]: v }));
  const setLoss = (k, v) => setLossForm(f => ({ ...f, [k]: v }));
  const [isPro, setIsPro] = React.useState(window.__evomni_isPro || false);
  React.useEffect(() => {
    const handler = e => setIsPro(e.detail.isPro);
    window.addEventListener('evomni:planchange', handler);
    return () => window.removeEventListener('evomni:planchange', handler);
  }, []);

  const COUPON_OPTIONS = [{ value: 'summer20', label: 'SUMMER20 — 夏日折扣碼（八折）' }, { value: 'welcome', label: '新會員歡迎券（NT$150）' }];

  const LineSwitch = ({ value, onChange }) => (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: value && !lineConnected ? 12 : 0 }}>
        <Switch checked={value} onChange={onChange} />
        <span style={{ fontSize: 13, color: '#606266' }}>{value ? '開啟 LINE 推播' : '僅發送 Email'}</span>
      </div>
      {value && !lineConnected && (
        <Banner type="warning" cta="前往設定" onCta={() => onNavigate('line-oa')}>
          尚未完成 LINE OA 串接。請先完成設定才能啟用 LINE 推播。
        </Banner>
      )}
    </div>
  );

  return (
    <div>
      <PageHeader title="沉睡 / 流失客喚醒旅程設定" onBack={() => onNavigate('journey-overview')} breadcrumbs={['行銷中心', '自動化行銷', '沉睡/流失客喚醒']} />
      {!isPro && <UpgradeLockBanner featureName="沉睡客自動喚醒" valueProp="自動找回三個月沒來的顧客，降低流失率" onLearnMore={() => show('請前往「全域設定 → 方案狀態」查看升級方案，或聯絡您的營運輔導顧問', 'info')} />}
      <div style={{ filter: !isPro ? 'blur(3px)' : 'none', pointerEvents: isPro ? 'auto' : 'none' }}>
      <ETabs
        tabs={[{ id: 'sleep', label: '沉睡客旅程（90天）' }, { id: 'loss', label: '流失客旅程（180天）' }]}
        active={tab} onChange={setTab} style={{ marginBottom: 0 }}
      />

      {tab === 'sleep' && (
        <SectionCard title="沉睡客旅程設定"
          extra={<Switch checked={sleepEnabled} onChange={v => { setSleepEnabled(v); show(v ? '沉睡客旅程已啟用' : '沉睡客旅程已停用', v ? 'success' : 'warning'); }} />}>
          <div style={{ padding: '10px 14px', background: '#EFF7FF', border: '1px solid #B3D8FF', fontSize: 13, color: '#409EFF', marginBottom: 20 }}>
            90–180 天未下訂的會員，系統每日自動偵測並觸發喚醒訊息
          </div>
          {!sleepEnabled && <Banner type="warning">旅程目前為停用狀態，設定後請開啟右上角的開關以啟用。</Banner>}
          <div style={{ maxWidth: 520 }}>
            <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>旅程啟用<InfoTooltip content="開啟後，系統每日自動掃描 90–180 天未消費的會員並發送喚醒訊息。" /></span>}>
              <Switch checked={sleepEnabled} onChange={v => { setSleepEnabled(v); show(v ? '沉睡客旅程已啟用' : '沉睡客旅程已停用', v ? 'success' : 'warning'); }} />
            </FormField>
            <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>每日發送時間<InfoTooltip content="排程在每天此時間發送喚醒訊息。建議選擇上午 9:00–11:00 時段，避免深夜時段打擾消費者。" /></span>} required>
              <EInput type="time" value={sleepForm.time} onChange={v => setSleep('time', v)} style={{ width: 140 }} />
            </FormField>
            <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>冷卻期<InfoTooltip content="同一位沉睡客在此天數內只觸發一次喚醒訊息，避免重複打擾。預設 30 天。" /></span>}
              helper="最短 1 天，最長 90 天">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <NumberInput value={sleepForm.cooldown} onChange={v => setSleep('cooldown', v)} width={100} />
                <span style={{ color: '#909399' }}>天</span>
              </div>
            </FormField>
            <FormField label="沉睡喚醒優惠券" helper="選填。建議搭配 9 折或 NT$50 折扣，提高回購機率。">
              <ESelect value={sleepForm.coupon} onChange={v => setSleep('coupon', v)} width={320} placeholder="選擇優惠券（選填）" options={COUPON_OPTIONS} />
            </FormField>
            <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>同時發送 LINE 推播<InfoTooltip content="開啟後，除 Email 外也會透過 LINE 官方帳號發送喚醒訊息。消費者需已綁定 LINE 帳號。" /></span>}>
              <LineSwitch value={sleepForm.lineEnabled} onChange={v => setSleep('lineEnabled', v)} />
            </FormField>
          </div>
        </SectionCard>
      )}

      {tab === 'loss' && (
        <SectionCard title="流失客旅程設定"
          extra={<Switch checked={lossEnabled} onChange={v => { setLossEnabled(v); show(v ? '流失客旅程已啟用' : '流失客旅程已停用', v ? 'success' : 'warning'); }} />}>
          <div style={{ padding: '10px 14px', background: '#EFF7FF', border: '1px solid #B3D8FF', fontSize: 13, color: '#409EFF', marginBottom: 20 }}>
            超過 180 天未下訂的會員，系統每日自動偵測並觸發強力挽留訊息
          </div>
          {!lossEnabled && <Banner type="warning">旅程目前為停用狀態，設定後請開啟右上角的開關以啟用。</Banner>}
          <div style={{ maxWidth: 520 }}>
            <FormField label="旅程啟用">
              <Switch checked={lossEnabled} onChange={v => { setLossEnabled(v); show(v ? '流失客旅程已啟用' : '流失客旅程已停用', v ? 'success' : 'warning'); }} />
            </FormField>
            <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>每日發送時間<InfoTooltip content="排程在每天此時間發送挽留訊息。建議選擇上午 9:00–11:00 時段。" /></span>} required>
              <EInput type="time" value={lossForm.time} onChange={v => setLoss('time', v)} style={{ width: 140 }} />
            </FormField>
            <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>冷卻期<InfoTooltip content="同一位流失客在此天數內只觸發一次挽留訊息。最短 1 天，最長 90 天。" /></span>}
              helper="最短 1 天，最長 90 天">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <NumberInput value={lossForm.cooldown} onChange={v => setLoss('cooldown', v)} width={100} />
                <span style={{ color: '#909399' }}>天</span>
              </div>
            </FormField>
            <FormField label="流失挽留優惠券" helper="選填。建議設定比沉睡客更強力的優惠（如 85 折或 NT$100 折扣）。">
              <ESelect value={lossForm.coupon} onChange={v => setLoss('coupon', v)} width={320} placeholder="選擇優惠券（選填）" options={COUPON_OPTIONS} />
            </FormField>
            <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>RFM 連動篩選<InfoTooltip content="開啟後，此旅程只針對「歷史上高消費（RFM 評分高）的流失客」觸發，避免對低價值流失客過度行銷浪費行銷預算。RFM 分群由數據中心每日自動計算。" /></span>}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: lossForm.rfm ? 10 : 0 }}>
                  <Switch checked={lossForm.rfm} onChange={v => setLoss('rfm', v)} />
                  <span style={{ fontSize: 13, color: '#606266' }}>{lossForm.rfm ? '已開啟 — 只觸發 RFM 高評分流失客' : '關閉 — 觸發所有流失客'}</span>
                </div>
                {lossForm.rfm && (
                  <div style={{ padding: '10px 14px', background: '#F5F7FA', border: '1px solid #DCDFE6', fontSize: 13, color: '#606266' }}>
                    此旅程將只觸發 <strong>符合 RFM 中、高等級</strong> 的流失客（數字由數據中心每日自動計算）
                  </div>
                )}
              </div>
            </FormField>
            <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>同時發送 LINE 推播<InfoTooltip content="開啟後，除 Email 外也會透過 LINE 官方帳號發送挽留訊息。" /></span>}>
              <LineSwitch value={lossForm.lineEnabled} onChange={v => setLoss('lineEnabled', v)} />
            </FormField>
          </div>
        </SectionCard>
      )}

      <FixedBar onCancel={() => onNavigate('journey-overview')} onSave={() => show('沉睡/流失客旅程設定已儲存', 'success')} />
      </div>{/* end isPro wrapper */}
    </div>
  );
}

// ─── SCREEN 8: 購後推薦再行銷 ────────────────────────────────────────────────
function PostPurchasePage({ onNavigate, show }) {
  const [tab, setTab] = React.useState('trigger');
  const [enabled, setEnabled] = React.useState(true);
  const [lineConnected] = React.useState(false);
  const [form, setForm] = React.useState({
    waitDays: '3', cooldown: '14', includeCoupon: false, coupon: '',
    lineEnabled: false, recommendSource: 'auto',
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const [isPro, setIsPro] = React.useState(window.__evomni_isPro || false);
  React.useEffect(() => {
    const handler = e => setIsPro(e.detail.isPro);
    window.addEventListener('evomni:planchange', handler);
    return () => window.removeEventListener('evomni:planchange', handler);
  }, []);

  const LineSwitch = ({ value, onChange }) => (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: value && !lineConnected ? 12 : 0 }}>
        <Switch checked={value} onChange={onChange} />
        <span style={{ fontSize: 13, color: '#606266' }}>{value ? '開啟 LINE 推播' : '僅發送 Email'}</span>
      </div>
      {value && !lineConnected && (
        <Banner type="warning" cta="前往設定" onCta={() => onNavigate('line-oa')}>
          尚未完成 LINE OA 串接。請先完成設定才能啟用 LINE 推播。
        </Banner>
      )}
    </div>
  );

  return (
    <div>
      <PageHeader title="購後推薦再行銷 — 旅程設定" onBack={() => onNavigate('journey-overview')} breadcrumbs={['行銷中心', '自動化行銷', '購後推薦']} />
      {!isPro && <UpgradeLockBanner featureName="購後產品自動推薦" valueProp="在最對的時機推薦最可能購買的產品" onLearnMore={() => show('請前往「全域設定 → 方案狀態」查看升級方案，或聯絡您的營運輔導顧問', 'info')} />}
      <div style={{ filter: !isPro ? 'blur(3px)' : 'none', pointerEvents: isPro ? 'auto' : 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', background: '#fff', border: '1px solid #DCDFE6', marginBottom: 16, borderRadius: 3 }}>
        <span style={{ fontWeight: 600 }}>旅程狀態</span>
        <Switch checked={enabled} onChange={v => { setEnabled(v); show(v ? '旅程已啟用' : '旅程已停用', v ? 'success' : 'warning'); }} />
        <span style={{ fontSize: 13, color: '#909399' }}>{enabled ? '啟用中' : '停用中'}</span>
      </div>
      <ETabs
        tabs={[{ id: 'trigger', label: '觸發條件' }, { id: 'recommend', label: '推薦規則' }, { id: 'stats', label: '旅程數據' }]}
        active={tab} onChange={setTab} style={{ marginBottom: 0 }}
      />

      {tab === 'trigger' && (
        <SectionCard title="觸發條件">
          <div style={{ maxWidth: 520 }}>
            <FormField label="觸發事件" helper="顧客訂單狀態更新為「已完成」時觸發。">
              <div style={{ padding: '10px 14px', background: '#F5F7FA', border: '1px solid #DCDFE6', fontSize: 13, color: '#606266' }}>訂單狀態更新為「已完成（已送達）」</div>
            </FormField>
            <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>訂單完成後等待天數<InfoTooltip content="訂單狀態變為「已完成」後等待幾天才發送推薦訊息。可依產品特性調整：消耗品（保養品）建議 14–30 天，耐用品（3C）建議 3–7 天。" /></span>} required
              helper="最少 1 天，最多 60 天">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <NumberInput value={form.waitDays} onChange={v => set('waitDays', v)} width={80} />
                <span style={{ color: '#909399' }}>天後發送</span>
              </div>
            </FormField>
            <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>冷卻期<InfoTooltip content="同一位會員在此天數內只觸發一次購後推薦，避免重複打擾。最少 1 天，最多 60 天。" /></span>}
              helper="最少 1 天，最多 60 天">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <NumberInput value={form.cooldown} onChange={v => set('cooldown', v)} width={80} />
                <span style={{ color: '#909399' }}>天</span>
              </div>
            </FormField>
            <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>是否附上優惠券<InfoTooltip content="開啟後，推薦訊息中將附上優惠券，提升點擊率。" /></span>}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: form.includeCoupon ? 12 : 0 }}>
                <Switch checked={form.includeCoupon} onChange={v => set('includeCoupon', v)} />
                <span style={{ fontSize: 13, color: '#909399' }}>附券可提升推薦產品的點擊率</span>
              </div>
              {form.includeCoupon && (
                <ESelect value={form.coupon} onChange={v => set('coupon', v)} width={320} placeholder="請選擇一張優惠券"
                  options={[{ value: 'summer20', label: 'SUMMER20 — 夏日折扣碼（八折）' }, { value: 'welcome', label: '新會員歡迎券（NT$150）' }]}
                />
              )}
            </FormField>
            <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>同時發送 LINE 推播<InfoTooltip content="開啟後，除 Email 外也會透過 LINE 官方帳號發送推薦訊息。需先完成 LINE OA 串接設定。" /></span>}>
              <LineSwitch value={form.lineEnabled} onChange={v => set('lineEnabled', v)} />
            </FormField>
          </div>
        </SectionCard>
      )}

      {tab === 'recommend' && (
        <SectionCard title="推薦規則">
          <div style={{ maxWidth: 560 }}>
            <FormField label="推薦產品來源" required>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { v: 'auto', l: '自動算法', d: '由系統依購買記錄、同分類熱銷產品自動推薦' },
                  { v: 'manual', l: '手動設定交叉銷售規則', d: '為每個產品手動設定推薦的搭配產品' },
                ].map(o => (
                  <label key={o.v} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 16px', border: `1px solid ${form.recommendSource === o.v ? '#409EFF' : '#DCDFE6'}`, background: form.recommendSource === o.v ? '#EFF7FF' : '#fff', cursor: 'pointer' }}>
                    <input type="radio" checked={form.recommendSource === o.v} onChange={() => set('recommendSource', o.v)} style={{ marginTop: 3 }} />
                    <div>
                      <div style={{ fontWeight: 500 }}>{o.l}</div>
                      <div style={{ fontSize: 12, color: '#909399', marginTop: 2 }}>{o.d}</div>
                    </div>
                  </label>
                ))}
              </div>
            </FormField>
            {form.recommendSource === 'auto' && (
              <div style={{ padding: '14px 16px', background: '#EFF7FF', border: '1px solid #B3D8FF', fontSize: 13, color: '#606266', lineHeight: 1.7 }}>
                <strong style={{ display: 'block', marginBottom: 6, color: '#409EFF' }}>自動推薦優先序</strong>
                ① 產品後台手動設定的「常買產品」<br />
                ② 同分類近 30 天熱銷前 3 件<br />
                ③ 全站近 30 天熱銷前 5 件<br />
                <span style={{ fontSize: 12, color: '#909399', marginTop: 6, display: 'block' }}>已購過或已售完 / 下架的產品不推薦</span>
              </div>
            )}
            {form.recommendSource === 'manual' && (
              <div style={{ padding: '14px 16px', background: '#FDF6EC', border: '1px solid #F5DAB1', fontSize: 13, color: '#E6A23C', borderRadius: 3 }}>
                ⚠️ PRD 待補：手動交叉銷售規則管理介面開發中，正式版本請 PM 補充完整規格。
              </div>
            )}
          </div>
        </SectionCard>
      )}

      {tab === 'stats' && (
        <SectionCard title="旅程數據（本月）">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
            {[{ l: '觸發次數', v: '132', c: '#409EFF' }, { l: '訊息送達', v: '130', c: '#67C23A' }, { l: '點擊率', v: '24.2%', c: '#E6A23C' }, { l: '含推薦產品連結點擊率', v: '18.5%', c: '#F56C6C' }].map(s => (
              <div key={s.l} style={{ padding: 20, border: '1px solid #DCDFE6', textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: s.c, marginBottom: 6 }}>{s.v}</div>
                <div style={{ fontSize: 12, color: '#909399' }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'right', marginBottom: 8 }}>
            <EvoBtn variant="secondary" size="sm" onClick={() => onNavigate('push-logs')}>查看完整推播記錄 →</EvoBtn>
          </div>
          <div style={{ padding: 40, textAlign: 'center', color: '#C0C4CC', border: '1px dashed #DCDFE6', fontSize: 13 }}>趨勢圖表（整合中）</div>
        </SectionCard>
      )}

      <FixedBar onCancel={() => onNavigate('journey-overview')} onSave={() => show('購後推薦旅程設定已儲存', 'success')} />
      </div>{/* end isPro wrapper */}
    </div>
  );
}

// ─── SCREEN 9: 到期提醒 ───────────────────────────────────────────────────────
function ExpiryReminderPage({ onNavigate, show }) {
  const [pointsEnabled, setPointsEnabled] = React.useState(false);
  const [couponEnabled, setCouponEnabled] = React.useState(false);
  const [lineConnected] = React.useState(false);
  const [pointsForm, setPointsForm] = React.useState({ days: '30', lineEnabled: false });
  const [couponForm, setCouponForm] = React.useState({ days: '7', lineEnabled: false });
  const setP = (k, v) => setPointsForm(f => ({ ...f, [k]: v }));
  const setC = (k, v) => setCouponForm(f => ({ ...f, [k]: v }));
  const [isPro, setIsPro] = React.useState(window.__evomni_isPro || false);
  React.useEffect(() => {
    const handler = e => setIsPro(e.detail.isPro);
    window.addEventListener('evomni:planchange', handler);
    return () => window.removeEventListener('evomni:planchange', handler);
  }, []);

  const LineSwitch = ({ value, onChange }) => (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: value && !lineConnected ? 12 : 0 }}>
        <Switch checked={value} onChange={onChange} />
        <span style={{ fontSize: 13, color: '#606266' }}>{value ? '同時發送 LINE 推播' : '僅發送 Email'}</span>
      </div>
      {value && !lineConnected && (
        <Banner type="warning" cta="前往設定" onCta={() => onNavigate('line-oa')}>
          尚未完成 LINE OA 串接。請先完成設定才能啟用 LINE 推播。
        </Banner>
      )}
    </div>
  );

  return (
    <div>
      <BackLink label="旅程總覽" onClick={() => onNavigate('journey-overview')} />
      <PageHeader title="點數 / 優惠券到期提醒 — 旅程設定" breadcrumbs={['行銷中心', '自動化行銷', '到期提醒']} />
      {!isPro && <UpgradeLockBanner featureName="自動化行銷旅程" valueProp="讓行銷工作自動化、用數據驅動再行銷" onLearnMore={() => show('請前往「全域設定 → 方案狀態」查看升級方案，或聯絡您的營運輔導顧問', 'info')} />}
      <div style={{ filter: !isPro ? 'blur(3px)' : 'none', pointerEvents: isPro ? 'auto' : 'none' }}>

      {/* Section 1: 點數到期提醒 */}
      <SectionCard title="點數到期提醒" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{ fontSize: 13, color: '#606266' }}>啟用點數到期提醒</span>
          <Switch checked={pointsEnabled} onChange={v => { setPointsEnabled(v); show(v ? '點數到期提醒已啟用' : '點數到期提醒已停用', v ? 'success' : 'warning'); }} />
        </div>
        {!pointsEnabled && <Banner type="warning">旅程目前為停用狀態，設定後請開啟上方的開關以啟用。</Banner>}
        <div style={{ maxWidth: 520 }}>
          <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>提醒提前天數<InfoTooltip content="在點數到期日的前幾天發送提醒訊息給會員。此設定與「會員管理 → 點數設定」中的點數有效期連動，如需修改到期規則，請至會員管理模組。" /></span>} required>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <NumberInput value={pointsForm.days} onChange={v => setP('days', v)} width={80} />
              <span style={{ color: '#909399' }}>天前發送</span>
            </div>
          </FormField>
          <FormField label="點數有效期（唯讀同步）">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: '#F5F7FA', border: '1px solid #DCDFE6', fontSize: 13, color: '#606266' }}>
              <span>點數有效期：365 天（由會員管理設定）</span>
              <button onClick={() => {}} style={{ background: 'none', border: 'none', color: '#409EFF', fontSize: 13, cursor: 'pointer', padding: 0 }}>前往點數設定 →</button>
            </div>
          </FormField>
          <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>同時發送 LINE 推播<InfoTooltip content="開啟後，除 Email 外也會透過 LINE 官方帳號發送到期提醒。消費者需已綁定 LINE 帳號。" /></span>}>
            <LineSwitch value={pointsForm.lineEnabled} onChange={v => setP('lineEnabled', v)} />
          </FormField>
        </div>
      </SectionCard>

      {/* Section 2: 優惠券到期提醒 */}
      <SectionCard title="優惠券到期提醒">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{ fontSize: 13, color: '#606266' }}>啟用優惠券到期提醒</span>
          <Switch checked={couponEnabled} onChange={v => { setCouponEnabled(v); show(v ? '優惠券到期提醒已啟用' : '優惠券到期提醒已停用', v ? 'success' : 'warning'); }} />
        </div>
        {!couponEnabled && <Banner type="warning">旅程目前為停用狀態，設定後請開啟上方的開關以啟用。</Banner>}
        <div style={{ maxWidth: 520 }}>
          <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>提醒提前天數<InfoTooltip content="消費者帳戶中「尚未使用且即將到期」的優惠券，在到期前幾天自動發送提醒。每張券只通知一次。" /></span>} required
            helper="最少 1 天，最多 30 天">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <NumberInput value={couponForm.days} onChange={v => setC('days', v)} width={80} />
              <span style={{ color: '#909399' }}>天前發送</span>
            </div>
          </FormField>
          <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>同時發送 LINE 推播<InfoTooltip content="開啟後，除 Email 外也會透過 LINE 官方帳號發送優惠券到期提醒。" /></span>}>
            <LineSwitch value={couponForm.lineEnabled} onChange={v => setC('lineEnabled', v)} />
          </FormField>
        </div>
      </SectionCard>

      <FixedBar onCancel={() => onNavigate('journey-overview')} onSave={() => show('到期提醒旅程設定已儲存', 'success')} />
      </div>{/* end isPro wrapper */}
    </div>
  );
}

// ─── SCREEN 10: LINE OA 串接設定 ─────────────────────────────────────────────
function LineOAPage({ onNavigate, show }) {
  const [connectionStatus, setConnectionStatus] = React.useState('unset'); // unset / connected / failed
  const [verifying, setVerifying] = React.useState(false);
  const [verifyResult, setVerifyResult] = React.useState(null); // null / {success, msg}
  const [channelId, setChannelId] = React.useState('');
  const [channelSecret, setChannelSecret] = React.useState('');
  const [accessToken, setAccessToken] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const WEBHOOK_URL = 'https://your-domain.com/api/webhooks/line';
  const handleCopy = () => {
    setCopied(true);
    show('已複製 Webhook URL', 'success');
    setTimeout(() => setCopied(false), 2000);
  };
  const handleVerify = () => {
    if (!channelId || !channelSecret || !accessToken) {
      show('請填寫完整的 LINE OA 憑證資訊', 'error'); return;
    }
    setVerifying(true);
    setVerifyResult(null);
    setTimeout(() => {
      setVerifying(false);
      setConnectionStatus('connected');
      setVerifyResult({ success: true, msg: `LINE OA 連線成功！帳號名稱：Evomni 官方帳號，目前追蹤人數：1,234 人` });
      show('LINE OA 連線成功！', 'success');
    }, 1500);
  };
  const handleSave = () => show('設定已儲存', 'success');

  const statusBadge = { unset: { label: '未設定', type: 'info' }, connected: { label: '已連線', type: 'success' }, failed: { label: '連線失敗', type: 'danger' } };
  const st = statusBadge[connectionStatus];

  return (
    <div>
      <PageHeader title="LINE OA 串接設定" breadcrumbs={['行銷中心', 'LINE OA 設定']} />

      {/* 連線狀態 Badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', background: '#fff', border: '1px solid #DCDFE6', marginBottom: 16, borderRadius: 3 }}>
        <span style={{ fontWeight: 600 }}>連線狀態</span>
        <StatusTag type={st.type}>{st.label}</StatusTag>
        {connectionStatus === 'connected' && <span style={{ fontSize: 13, color: '#909399' }}>Evomni 官方帳號 · 追蹤人數：1,234</span>}
      </div>

      <div style={{ fontSize: 13, color: '#909399', marginBottom: 20, lineHeight: 1.7 }}>
        完成設定後，系統即可透過您的 LINE 官方帳號自動推播行銷訊息給已綁定 LINE 的消費者。
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16 }}>
        <SectionCard title="LINE OA 憑證設定">
          <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>LINE Channel ID<InfoTooltip content="在 LINE Developers Console 的「Messaging API」頁面找到 Channel ID，通常為 10 位純數字。" /></span>} required>
            <EInput value={channelId} onChange={setChannelId} placeholder="請輸入 Channel ID（純數字）" disabled={connectionStatus === 'connected'} />
          </FormField>
          <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>LINE Channel Secret<InfoTooltip content="儲存後以 ●●●●●●●● 顯示；點擊「重新設定」可清空並重新輸入。" /></span>} required>
            <PasswordInput value={channelSecret} onChange={setChannelSecret} placeholder="請輸入 Channel Secret" disabled={connectionStatus === 'connected'} />
          </FormField>
          <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>LINE Channel Access Token<InfoTooltip content="儲存後以 ●●●●●●●● 顯示；Access Token 需在 LINE Developers Console 手動生成。" /></span>} required>
            <PasswordInput value={accessToken} onChange={setAccessToken} placeholder="請輸入 Long-lived Channel Access Token" disabled={connectionStatus === 'connected'} />
          </FormField>

          {/* Webhook URL 唯讀欄位 */}
          <FormField label={<span style={{ display: 'inline-flex', alignItems: 'center' }}>Webhook URL（請複製至 LINE Developers Console）<InfoTooltip content="請將此 URL 設定至 LINE Developers Console → Messaging API → Webhook URL 欄位，並開啟「Use webhook」選項，系統才能接收消費者點擊 LINE 訊息後的回傳事件。" /></span>}>
            <div style={{ display: 'flex', gap: 8 }}>
              <EInput value={WEBHOOK_URL} onChange={() => {}} disabled style={{ flex: 1, background: '#F5F7FA', color: '#606266' }} />
              <EvoBtn variant="secondary" onClick={handleCopy}>{copied ? '已複製' : '複製'}</EvoBtn>
            </div>
          </FormField>

          {verifyResult && (
            <div style={{ padding: '12px 16px', background: verifyResult.success ? '#F0F9EB' : '#FEF0F0', border: `1px solid ${verifyResult.success ? '#C2E7B0' : '#FBC4C4'}`, marginBottom: 16, fontSize: 13, color: verifyResult.success ? '#67C23A' : '#F56C6C' }}>
              {verifyResult.msg}
            </div>
          )}

          <div style={{ display: 'flex', gap: 8 }}>
            {connectionStatus !== 'connected' && (
              <EvoBtn variant="primary" loading={verifying} onClick={handleVerify}>
                {verifying ? '驗證連線中，請稍候…' : '驗證連線'}
              </EvoBtn>
            )}
            <EvoBtn variant="secondary" onClick={handleSave}>儲存設定</EvoBtn>
            {connectionStatus === 'connected' && (
              <EvoBtn variant="secondary" onClick={() => { setConnectionStatus('unset'); setVerifyResult(null); setChannelId(''); setChannelSecret(''); setAccessToken(''); show('已解除 LINE OA 連結', 'warning'); }}>解除連結</EvoBtn>
            )}
          </div>
        </SectionCard>

        <SectionCard title="如何取得 LINE OA 憑證">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { step: '1', text: '登入 LINE Developers Console，前往「Provider」→ 選擇您的 Channel' },
              { step: '2', text: '在「Basic settings」頁籤取得 Channel ID 與 Channel secret（點擊 Issue）' },
              { step: '3', text: '在「Messaging API」頁籤取得長效型 Channel access token（點擊 Issue）' },
              { step: '4', text: '將上方的 Webhook URL 填入「Messaging API」→「Webhook URL」欄位，並開啟「Use webhook」' },
            ].map(s => (
              <div key={s.step} style={{ padding: '10px 14px', background: '#F5F7FA', border: '1px solid #DCDFE6', display: 'flex', gap: 10, fontSize: 13, color: '#606266' }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#409EFF', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{s.step}</div>
                <span style={{ lineHeight: 1.6 }}>{s.text}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12 }}>
            <Banner type="warning">Channel Secret 和 Access Token 屬於敏感資訊，請勿截圖或分享給他人。</Banner>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

// ─── SCREEN 11: 推播記錄查詢 ─────────────────────────────────────────────────
function PushLogsPage({ onNavigate, show }) {
  const [dateFrom, setDateFrom] = React.useState('');
  const [dateTo, setDateTo] = React.useState('');
  const [journeyFilter, setJourneyFilter] = React.useState('');
  const [channelFilter, setChannelFilter] = React.useState('');
  const [sort, setSort] = React.useState({ field: 'sentAt', dir: 'desc' });
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(20);
  const handleSort = f => setSort(s => ({ field: f, dir: s.field === f && s.dir === 'asc' ? 'desc' : 'asc' }));

  const JOURNEY_OPTIONS = [...new Set(PUSH_LOGS_DATA.map(l => l.journey))].map(j => ({ value: j, label: j }));
  const hasFilter = dateFrom || dateTo || journeyFilter || channelFilter;

  const filtered = PUSH_LOGS_DATA.filter(l => {
    if (journeyFilter && l.journey !== journeyFilter) return false;
    if (channelFilter && l.channel !== channelFilter) return false;
    if (dateFrom && l.sentAt < dateFrom) return false;
    if (dateTo && l.sentAt > dateTo) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    let av = a[sort.field], bv = b[sort.field];
    if (typeof av === 'string') return sort.dir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    return sort.dir === 'asc' ? av - bv : bv - av;
  });

  const channelBadge = ch => <StatusTag type={ch === 'LINE' ? 'primary' : 'success'}>{ch}</StatusTag>;

  return (
    <div>
      <PageHeader title="推播記錄" breadcrumbs={['行銷中心', '推播記錄']} />

      {/* Filters */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <EInput type="date" value={dateFrom} onChange={setDateFrom} placeholder="開始日期" style={{ width: 150 }} />
            <span style={{ color: '#909399', fontSize: 13 }}>至</span>
            <EInput type="date" value={dateTo} onChange={setDateTo} placeholder="結束日期" style={{ width: 150 }} />
          </div>
          <ESelect value={journeyFilter} onChange={v => { setJourneyFilter(v); setPage(1); }} width={200} placeholder="全部旅程" options={JOURNEY_OPTIONS} />
          <ESelect value={channelFilter} onChange={v => { setChannelFilter(v); setPage(1); }} width={130} placeholder="全部管道"
            options={[{ value: 'Email', label: 'Email' }, { value: 'LINE', label: 'LINE' }]}
          />
          {hasFilter && <EvoBtn variant="secondary" onClick={() => { setDateFrom(''); setDateTo(''); setJourneyFilter(''); setChannelFilter(''); }}>清除篩選</EvoBtn>}
        </div>

        {filtered.length === 0 ? (
          hasFilter ? (
            <MktEmptyState icon="🔍" title="找不到符合條件的推播記錄"
              sub="嘗試調整日期範圍或篩選條件" ctaLabel="清除篩選" onCta={() => { setDateFrom(''); setDateTo(''); setJourneyFilter(''); setChannelFilter(''); }} />
          ) : (
            <MktEmptyState icon="" title="尚無推播記錄"
              sub="自動化行銷旅程啟用後，每次觸發的推播結果將記錄在此頁面" ctaLabel="前往設定旅程" onCta={() => onNavigate('journey-overview')} />
          )
        ) : (
          <>
            <TableWrapper>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr>
                    <th style={tableThStyle}><SortableHeader label="發送時間" field="sentAt" sort={sort} onSort={handleSort} /></th>
                    <th style={tableThStyle}>旅程名稱</th>
                    <th style={tableThStyle}>發送管道</th>
                    <th style={tableThStyle}><SortableHeader label="發送對象" field="targets" sort={sort} onSort={handleSort} /></th>
                    <th style={tableThStyle}><SortableHeader label="成功發送" field="success" sort={sort} onSort={handleSort} /></th>
                    <th style={tableThStyle}><SortableHeader label="失敗 / 退信" field="failed" sort={sort} onSort={handleSort} /></th>
                    <th style={tableThStyle}><SortableHeader label="開信 / 點擊率" field="rate" sort={sort} onSort={handleSort} /></th>
                    <th style={tableThStyle}><SortableHeader label="最終轉換（下單）" field="conversion" sort={sort} onSort={handleSort} /></th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.slice((page - 1) * pageSize, page * pageSize).map((l, i) => (
                    <tr key={l.id}
                      style={{ background: tableRowBg(i) }}
                      {...tableRowHandlers(i, false)}>
                      <td style={tableTdStyle}>{l.sentAt}</td>
                      <td style={tableTdStyle}>{l.journey}</td>
                      <td style={tableTdStyle}>{channelBadge(l.channel)}</td>
                      <td style={tableTdStyle}>{l.targets} 人</td>
                      <td style={tableTdStyle}>{l.success} 人</td>
                      <td style={tableTdStyle}><span style={{ color: l.failed > 0 ? '#F56C6C' : '#C0C4CC' }}>{l.failed > 0 ? `${l.failed} 人` : '—'}</span></td>
                      <td style={tableTdStyle}>{l.rate}</td>
                      <td style={tableTdStyle}>{l.conversion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableWrapper>
            <Pagination page={page} total={sorted.length} pageSize={pageSize} pageSizes={[20, 50, 100]} onChange={setPage} onPageSizeChange={ps => { setPageSize(ps); setPage(1); }} style={{ marginTop: 16 }} />
          </>
        )}
    </div>
  );
}

// ─── 一頁式商店 ───────────────────────────────────────────────────────────────
let __lpEditTarget = null; // 暫存目前正在編輯的 LP，null 表示新增模式

const LP_DATA = [
  { id: 1, name: '夏日美白精華限量搶購', product: '水光精華 EX',        slug: 'summer-glow-2026',     status: 'active',    todayPV: 1842, cvr: 6.2,  todayGMV: 145800, hasKOL: true,  kolName: '阿甜',       kolRate: '10%', isBest: true,  createdAt: 20260510 },
  { id: 2, name: '夏季護膚組合優惠',      product: '超保濕乳液 3件組',  slug: 'summer-skincare',      status: 'active',    todayPV: 923,  cvr: 4.8,  todayGMV: 82400,  hasKOL: false, kolName: '',           kolRate: '',    isBest: false, createdAt: 20260508 },
  { id: 3, name: '限時閃購：防曬噴霧',    product: '全效防曬噴霧 SPF50',slug: 'sunscreen-flash',      status: 'scheduled', todayPV: 0,    cvr: null, todayGMV: 0,      hasKOL: true,  kolName: 'MissA 美妝', kolRate: '8%',  isBest: false, createdAt: 20260512, scheduleStart: '2026-06-01 10:00', scheduleEnd: '2026-08-31 23:59' },
  { id: 4, name: 'VIP 會員專屬優惠',      product: '安瓶精華液 5ml',    slug: 'vip-ampoule-2026',     status: 'ended',     todayPV: 234,  cvr: 3.1,  todayGMV: 18600,  hasKOL: false, kolName: '',           kolRate: '',    isBest: false, createdAt: 20260415, endedReason: 'system', endedAt: '2026-05-01' },
  { id: 5, name: '新品上市：膠原蛋白面膜',product: '膠原蛋白面膜 10片', slug: 'collagen-mask-launch', status: 'disabled',  todayPV: 0,    cvr: null, todayGMV: 0,      hasKOL: false, kolName: '',           kolRate: '',    isBest: false, createdAt: 20260501 },
];
const LP_STATUS_MAP = {
  active:    { label: '啟用',   type: 'success' },
  disabled:  { label: '停用',   type: 'info'    },
  scheduled: { label: '排程中', type: 'primary' },
  ended:     { label: '已結束', type: 'warning' },
};
const LP_FEATURES = ['深層補水', '美白淡斑', '緊緻提亮', '溫和無刺激'];
const LP_REVIEWS  = ['質地清爽不黏膩，皮膚明顯變亮了！', '持續使用兩週後，色斑淡了很多。'];

function LPStepper({ step, onNavigate }) {
  const steps = ['基礎設定', '銷售頁設計', '加購設定', '預覽與發布'];
  const routes = ['lp-create-step1', 'lp-create-step2', 'lp-create-step3', 'lp-create-step4'];
  const isEdit = !!__lpEditTarget;
  return (
    <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #DCDFE6', padding: '20px 24px', marginBottom: 24, borderRadius: 3 }}>
      {steps.map((label, i) => {
        const n = i + 1;
        const done = n < step;
        const active = n === step;
        const clickable = isEdit && !active && !!onNavigate;
        return (
          <React.Fragment key={i}>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, cursor: clickable ? 'pointer' : 'default' }}
              onClick={clickable ? () => onNavigate(routes[i]) : undefined}
            >
              <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: done ? '#67C23A' : active ? '#303133' : '#fff', border: '2px solid ' + (done ? '#67C23A' : active ? '#303133' : '#DCDFE6'), color: done || active ? '#fff' : '#909399', fontSize: 11, fontWeight: 700 }}>
                {done ? '✓' : n}
              </div>
              <span style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? '#303133' : done ? '#606266' : clickable ? '#606266' : '#C0C4CC', whiteSpace: 'nowrap', textDecoration: clickable ? 'underline' : 'none', textDecorationColor: '#C0C4CC' }}>{label}</span>
            </div>
            {i < steps.length - 1 && <div style={{ flex: 1, height: 1, background: done ? '#67C23A' : '#DCDFE6', margin: '0 12px', minWidth: 16 }} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

let __lpV2EditTarget = null;

function LandingPageDashboard({ onNavigate, show }) {
  const [lpList, setLpList]     = React.useState(LP_DATA);
  const [keyword, setKeyword]   = React.useState('');
  const [statusFilter, setStatus] = React.useState('');
  const [dateFrom, setDateFrom] = React.useState('');
  const [dateTo, setDateTo]     = React.useState('');
  const [sortField, setSortField] = React.useState('cvr');
  const [sortDir, setSortDir]   = React.useState('desc');
  const [deleteTarget, setDelTarget] = React.useState(null);
  const [loading, setLoading]   = React.useState(true);
  const [selected, setSelected] = React.useState([]);
  const [batchOpen, setBatchOpen] = React.useState(false);
  const [page, setPage]         = React.useState(1);
  const [pageSize, setPageSize] = React.useState(20);

  const [isPro, setIsPro] = React.useState(window.__evomni_isPro || false);
  React.useEffect(() => {
    const handler = e => setIsPro(e.detail.isPro);
    window.addEventListener('evomni:planchange', handler);
    return () => window.removeEventListener('evomni:planchange', handler);
  }, []);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  React.useEffect(() => {
    if (!batchOpen) return;
    const close = () => setBatchOpen(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [batchOpen]);

  const handleSort = (f) => {
    if (f === sortField) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(f); setSortDir('desc'); }
  };

  const filtered = lpList.filter(lp => {
    if (keyword && !lp.name.includes(keyword) && !lp.product.includes(keyword)) return false;
    if (statusFilter && lp.status !== statusFilter) return false;
    return true;
  }).slice().sort((a, b) => {
    const av = sortField === 'pv' ? a.todayPV : sortField === 'cvr' ? (a.cvr ?? -1) : sortField === 'gmv' ? a.todayGMV : a.createdAt;
    const bv = sortField === 'pv' ? b.todayPV : sortField === 'cvr' ? (b.cvr ?? -1) : sortField === 'gmv' ? b.todayGMV : b.createdAt;
    return sortDir === 'desc' ? bv - av : av - bv;
  });

  const totalPV     = lpList.reduce((s, l) => s + l.todayPV, 0);
  const totalGMV    = lpList.reduce((s, l) => s + l.todayGMV, 0);
  const withCvr     = lpList.filter(l => l.cvr !== null);
  const avgCVR      = withCvr.length ? withCvr.reduce((s, l) => s + l.cvr, 0) / withCvr.length : 0;
  const totalOrders = Math.round(totalPV * avgCVR / 100);

  const allIds     = filtered.map(l => l.id);
  const allChecked = allIds.length > 0 && allIds.every(id => selected.includes(id));
  const toggleAll  = () => setSelected(allChecked ? [] : allIds);
  const toggleOne  = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const handleDelete = () => {
    setLpList(list => list.filter(l => l.id !== deleteTarget.id));
    show('「' + deleteTarget.name + '」已刪除', 'success');
    setSelected(s => s.filter(x => x !== deleteTarget.id));
    setDelTarget(null);
  };

  const handleBatch = (action) => {
    setBatchOpen(false);
    if (action === 'disable') {
      setLpList(list => list.map(l => selected.includes(l.id) && l.status === 'active' ? { ...l, status: 'disabled' } : l));
      show(selected.length + ' 個商店已停用', 'warning');
    } else if (action === 'delete') {
      const canDelete = selected.filter(id => { const lp = lpList.find(l => l.id === id); return lp && lp.status !== 'active'; });
      if (!canDelete.length) { show('請先停用選取的商店再刪除', 'warning'); return; }
      setLpList(list => list.filter(l => !canDelete.includes(l.id)));
      show(canDelete.length + ' 個商店已刪除', 'success');
    }
    setSelected([]);
  };

  const handleEdit = (lp) => { __lpV2EditTarget = lp;  onNavigate('lp-detail-v2'); };
  const handleNew  = ()   => { __lpV2EditTarget = null; onNavigate('lp-detail-v2'); };

  const sortArrow = (f) => {
    if (sortField !== f) return <span style={{ color: '#C0C4CC', fontSize: 10, marginLeft: 3 }}>↕</span>;
    return <span style={{ color: '#409EFF', fontSize: 10, marginLeft: 3 }}>{sortDir === 'desc' ? '↓' : '↑'}</span>;
  };

  const skSt = { background: 'linear-gradient(90deg, #F5F7FA 25%, #EBEEF5 50%, #F5F7FA 75%)', backgroundSize: '200% 100%', animation: 'evo-shimmer 1.2s infinite' };
  const dateInSt = { height: 40, border: '1px solid #DCDFE6', padding: '0 10px', fontSize: 13, fontFamily: 'inherit', outline: 'none', background: '#fff', width: 130 };

  const statCards = [
    { label: '今日瀏覽次數（PV）',    value: totalPV.toLocaleString() + ' 次' },
    { label: '總訂單數',              value: totalOrders.toLocaleString() + ' 筆' },
    { label: '今日成交金額（GMV）',   value: 'NT$ ' + totalGMV.toLocaleString() },
    { label: '平均購買轉換率（CVR）', value: avgCVR.toFixed(1) + '%' },
  ];

  return (
    <div>
      {!isPro && (
        <UpgradeLockBanner
          featureName="一頁式商店"
          valueProp="建立專屬銷售頁，搭配限時促銷與加購設計，大幅提升單頁轉換率"
          onLearnMore={() => show('請前往「全域設定 → 方案狀態」查看升級方案，或聯絡您的營運輔導顧問', 'info')}
        />
      )}
      <div style={{ filter: !isPro ? 'blur(3px)' : 'none', pointerEvents: isPro ? 'auto' : 'none' }}>
      <PageHeader title="一頁式商店" onNavigate={onNavigate} breadcrumbs={['行銷中心', '一頁式商店']} />
      <div style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
        {loading
          ? [0,1,2,3].map(i => (
              <div key={i} style={{ flex: 1, background: '#fff', border: '1px solid #DCDFE6', padding: '20px 24px', borderRadius: 3 }}>
                <div style={{ ...skSt, height: 12, width: '50%', marginBottom: 10 }} />
                <div style={{ ...skSt, height: 24, width: '70%' }} />
              </div>
            ))
          : statCards.map((c, i) => (
              <div key={i} style={{ flex: 1, background: '#fff', border: '1px solid #DCDFE6', padding: '20px 24px', borderRadius: 3 }}>
                <div style={{ fontSize: 12, color: '#909399', marginBottom: 6 }}>{c.label}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#303133' }}>{c.value}</div>
              </div>
            ))
        }
      </div>
      <div style={{ fontSize: 12, color: '#C0C4CC', textAlign: 'right', marginBottom: 16 }}>今日所有商店合計 · 每 5 分鐘自動更新</div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 12 }}>
        <EInput value={keyword} onChange={setKeyword} placeholder="搜尋商店名稱或產品名稱…" style={{ width: 220 }} />
        <ESelect value={statusFilter} onChange={setStatus} width={130} placeholder="全部狀態"
          options={[{ value: 'active', label: '啟用' }, { value: 'disabled', label: '停用' }, { value: 'scheduled', label: '排程中' }, { value: 'ended', label: '已結束' }]} />
        <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} style={{ ...dateInSt }}
          onFocus={e => e.target.style.borderColor = '#409EFF'} onBlur={e => e.target.style.borderColor = '#DCDFE6'} />
        <span style={{ color: '#909399', fontSize: 13 }}>至</span>
        <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} style={{ ...dateInSt }}
          onFocus={e => e.target.style.borderColor = '#409EFF'} onBlur={e => e.target.style.borderColor = '#DCDFE6'} />
        <EvoBtn variant="secondary" onClick={() => { setKeyword(''); setStatus(''); setDateFrom(''); setDateTo(''); }}>清除</EvoBtn>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <div style={{ position: 'relative' }} onClick={e => e.stopPropagation()}>
            <EvoBtn variant="secondary" style={{ opacity: selected.length === 0 ? 0.5 : 1 }}
              onClick={() => selected.length > 0 && setBatchOpen(o => !o)}>批次操作 ▾</EvoBtn>
            {batchOpen && selected.length > 0 && (
              <div style={{ position: 'absolute', top: '100%', right: 0, background: '#fff', border: '1px solid #DCDFE6', zIndex: 100, minWidth: 148, marginTop: 2, boxShadow: '0 4px 12px rgba(0,0,0,.1)' }}>
                {[{ a: 'disable', l: '批次停用', c: '#E6A23C' }, { a: 'delete', l: '批次刪除', c: '#F56C6C' }].map(item => (
                  <div key={item.a} onClick={() => handleBatch(item.a)}
                    style={{ padding: '9px 14px', fontSize: 13, cursor: 'pointer', color: item.c }}
                    onMouseEnter={e => e.currentTarget.style.background = '#F5F7FA'}
                    onMouseLeave={e => e.currentTarget.style.background = '#fff'}>{item.l}</div>
                ))}
              </div>
            )}
          </div>
          <EvoBtn variant="create" onClick={handleNew}>新增商店</EvoBtn>
        </div>
      </div>

      {selected.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: '#ECF5FF', border: '1px solid #b3d8ff', marginBottom: 12, fontSize: 13, borderRadius: 3 }}>
          <span style={{ color: '#409EFF', fontWeight: 500 }}>已選 {selected.length} 個商店</span>
          <EvoBtn variant="secondary" size="sm" onClick={() => handleBatch('disable')}>批次停用</EvoBtn>
          <EvoBtn variant="secondary" size="sm" style={{ color: '#F56C6C', borderColor: '#F56C6C' }} onClick={() => handleBatch('delete')}>批次刪除</EvoBtn>
          <span style={{ marginLeft: 'auto', color: '#909399', cursor: 'pointer', fontSize: 12 }} onClick={() => setSelected([])}>取消選取</span>
        </div>
      )}

      <TableWrapper>
        {loading ? (
          <div style={{ padding: 20 }}>
            {[0,1,2,3,4].map(i => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid #F5F7FA' }}>
                <div style={{ ...skSt, flex: 2, height: 14 }} /> <div style={{ ...skSt, flex: 1, height: 14 }} />
                <div style={{ ...skSt, flex: 1, height: 14 }} /> <div style={{ ...skSt, flex: 1, height: 14 }} />
              </div>
            ))}
          </div>
        ) : lpList.length === 0 ? (
          <MktEmptyState title="還沒有一頁式商店" sub="一頁式商店是廣告投放的最佳落地頁——無選單干擾，消費者專注完成購買。立即建立您的第一個！" ctaLabel="新增商店" onCta={handleNew} />
        ) : filtered.length === 0 ? (
          <div style={{ padding: '48px 0', textAlign: 'center' }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, color: '#303133' }}>找不到符合條件的商店</div>
            <div style={{ fontSize: 13, color: '#909399', marginBottom: 16 }}>試試看調整關鍵字或清除篩選條件</div>
            <EvoBtn variant="secondary" onClick={() => { setKeyword(''); setStatus(''); setDateFrom(''); setDateTo(''); }}>清除篩選</EvoBtn>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ ...tableThStyle, width: 40 }}>
                  <input type="checkbox" checked={allChecked} onChange={toggleAll} style={{ accentColor: '#303133' }} />
                </th>
                <th style={{ ...tableThStyle, minWidth: 220 }}>商店名稱</th>
                <th style={tableThStyle}>主推產品</th>
                <th style={tableThStyle}>狀態</th>
                <th style={{ ...tableThStyle, cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort('pv')}>今日瀏覽次數（PV）{sortArrow('pv')}</th>
                <th style={{ ...tableThStyle, cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort('cvr')}>購買轉換率（CVR）{sortArrow('cvr')}</th>
                <th style={{ ...tableThStyle, cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort('gmv')}>今日成交金額（GMV）{sortArrow('gmv')}</th>
                <th style={tableThStyle}>網路紅人分潤（KOL）</th>
                <th style={{ ...tableThStyle, width: 160 }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice((page - 1) * pageSize, page * pageSize).map((lp, i) => {
                const st = LP_STATUS_MAP[lp.status] || LP_STATUS_MAP.disabled;
                const isSelected = selected.includes(lp.id);
                const canDelete  = lp.status !== 'active';
                return (
                  <tr key={lp.id}
                    style={{ background: isSelected ? tableRowSelectedBg : tableRowBg(i) }}
                    {...tableRowHandlers(i, isSelected)}>
                    <td style={{ ...tableTdStyle, textAlign: 'center' }}>
                      <input type="checkbox" checked={isSelected} onChange={() => toggleOne(lp.id)} style={{ accentColor: '#303133' }} />
                    </td>
                    <td style={tableTdStyle}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 48, height: 48, background: '#F5F7FA', border: '1px solid #DCDFE6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C0C4CC', fontSize: 18, flexShrink: 0 }}>◫</div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 3 }}>
                            <span style={{ fontWeight: 500, color: '#303133', cursor: 'pointer', textDecoration: 'underline', textDecorationColor: '#C0C4CC' }}
                              onClick={() => handleEdit(lp)}>{lp.name}</span>
                            {lp.isBest && <span style={{ fontSize: 11, color: '#E6A23C', fontWeight: 700 }}>★ 本週最佳</span>}
                            {lp.hasKOL && <StatusTag type="primary">KOL</StatusTag>}
                          </div>
                          <code style={{ fontSize: 11, color: '#909399', background: 'none' }}>/lp/{lp.slug}</code>
                        </div>
                      </div>
                    </td>
                    <td style={{ ...tableTdStyle, color: '#606266' }}>{lp.product}</td>
                    <td style={tableTdStyle}>
                      <StatusTag type={st.type}>{st.label}</StatusTag>
                      {lp.status === 'scheduled' && lp.scheduleStart && (
                        <div style={{ fontSize: 11, color: '#909399', marginTop: 4 }}>{lp.scheduleStart.slice(0,10)} 上架</div>
                      )}
                      {lp.status === 'ended' && lp.endedReason === 'system' && (
                        <div style={{ fontSize: 11, color: '#909399', marginTop: 4 }}>{lp.endedAt} 系統自動停用</div>
                      )}
                    </td>
                    <td style={{ ...tableTdStyle, color: '#303133' }}>{lp.todayPV > 0 ? lp.todayPV.toLocaleString() : '—'}</td>
                    <td style={{ ...tableTdStyle, color: '#303133' }}>{lp.cvr !== null ? lp.cvr.toFixed(1) + '%' : '—'}</td>
                    <td style={{ ...tableTdStyle, color: '#303133' }}>{lp.todayGMV > 0 ? 'NT$ ' + lp.todayGMV.toLocaleString() : '—'}</td>
                    <td style={{ ...tableTdStyle, fontSize: 14, color: '#606266' }}>
                      {lp.hasKOL ? lp.kolName + '（' + lp.kolRate + '）' : <span style={{ color: '#C0C4CC' }}>—</span>}
                    </td>
                    <td style={tableTdStyle}>
                      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                        <EvoBtn variant="text" size="sm" onClick={() => handleEdit(lp)}>編輯</EvoBtn>
                        <EvoBtn variant="text" size="sm" onClick={() => show('連結已複製', 'success')}>複製連結</EvoBtn>
                        {lp.hasKOL && <EvoBtn variant="text" size="sm" onClick={() => show('分享連結已複製', 'success')}>分享</EvoBtn>}
                        <EvoBtn variant="text-danger" size="sm" disabled={!canDelete} onClick={() => canDelete && setDelTarget(lp)}>刪除</EvoBtn>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </TableWrapper>
      <Pagination
        total={filtered.length}
        page={page}
        pageSize={pageSize}
        pageSizes={[20, 50, 100]}
        onChange={setPage}
        onPageSizeChange={ps => { setPageSize(ps); setPage(1); }}
        style={{ borderTop: '1px solid #EBEEF5', padding: '10px 12px' }}
      />

      <AdminModal open={deleteTarget !== null} onClose={() => setDelTarget(null)} title="確定刪除此商店？" confirmLabel="確認刪除" danger={true} onConfirm={handleDelete}>
        <p style={{ marginBottom: 8 }}>確定刪除「<strong>{deleteTarget && deleteTarget.name}</strong>」嗎？</p>
        <p style={{ fontSize: 13, color: '#909399' }}>此操作無法復原，相關統計數據也將一併刪除。</p>
      </AdminModal>
      </div>{/* end isPro wrapper */}
    </div>
  );
}

function LandingPageStep1({ onNavigate, show }) {
  const editLp = __lpEditTarget;
  const isEdit = !!editLp;

  const toDatetimeLocal = (s) => s ? s.replace(' ', 'T') : '';
  const parseKolRate = (r) => r ? parseFloat(r) || '' : '';

  const [form, setForm] = React.useState(() => isEdit ? {
    name:             editLp.name || '',
    product:          editLp.product || '',
    slug:             editLp.slug || '',
    seoTitle:         '',
    seoDesc:          '',
    scheduleEnabled:  !!(editLp.scheduleStart),
    startDate:        toDatetimeLocal(editLp.scheduleStart),
    endDate:          toDatetimeLocal(editLp.scheduleEnd),
    countdownEnabled: false,
    countdownEnd:     '',
    countdownAction:  'message',
    kolOpen:          editLp.hasKOL,
    kolEnabled:       editLp.hasKOL,
    kolName:          editLp.kolName || '',
    kolRate:          parseKolRate(editLp.kolRate),
    kolEmail:         '',
  } : {
    name: '', product: '', slug: '',
    seoTitle: '', seoDesc: '',
    scheduleEnabled: false, startDate: '', endDate: '',
    countdownEnabled: false, countdownEnd: '', countdownAction: 'message',
    kolOpen: false, kolEnabled: false, kolName: '', kolRate: '', kolEmail: '',
  });
  const [errors, setErrors]     = React.useState({});
  const [slugStatus, setSlugStatus] = React.useState(isEdit && editLp.slug ? 'ok' : 'idle');
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const checkSlug = React.useCallback((slug) => {
    if (!slug) { setSlugStatus('idle'); return; }
    setSlugStatus('checking');
    setTimeout(() => {
      setSlugStatus(slug.includes('summer-glow') || slug === 'test' ? 'error' : 'ok');
    }, 600);
  }, []);

  const handleSlugChange = (v) => {
    const clean = v.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    set('slug', clean);
    checkSlug(clean);
  };

  const handleProductSelect = (v) => {
    set('product', v);
    if (!form.slug && v) {
      const sug = v.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/^-+|-+$/g, '').replace(/-{2,}/g, '-').slice(0, 40);
      if (sug.length >= 3) { set('slug', sug); checkSlug(sug); }
    }
  };

  const handleSubmit = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = '請填寫商店名稱';
    if (!form.product)     errs.product = '請選擇主推產品';
    if (!form.slug)        errs.slug = '請填寫網址';
    else if (slugStatus === 'error') errs.slug = '此網址已被使用，請換一個';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    if (isEdit) {
      show('「' + form.name + '」已儲存', 'success');
      onNavigate('marketing-landing');
    } else {
      onNavigate('lp-create-step2');
    }
  };

  const slugHint = (() => {
    if (slugStatus === 'checking') return <span style={{ fontSize: 12, color: '#909399' }}>驗證中…</span>;
    if (slugStatus === 'ok')       return <span style={{ fontSize: 12, color: '#67C23A' }}>✓ 此網址可以使用</span>;
    if (slugStatus === 'error')    return <span style={{ fontSize: 12, color: '#F56C6C' }}>✗ 此網址已被使用，請換一個</span>;
    return null;
  })();

  const productOptions = [
    { value: '水光精華 EX',        label: '水光精華 EX'        },
    { value: '超保濕乳液 3件組',    label: '超保濕乳液 3件組'    },
    { value: '全效防曬噴霧 SPF50',  label: '全效防曬噴霧 SPF50'  },
    { value: '安瓶精華液 5ml',      label: '安瓶精華液 5ml'      },
    { value: '膠原蛋白面膜 10片',   label: '膠原蛋白面膜 10片'   },
  ];

  const pageTitle     = isEdit ? '編輯一頁式商店' : '建立一頁式商店';
  const crumbCurrent  = isEdit ? '編輯' : '建立';

  return (
    <div>
      <PageHeader
        title={pageTitle}
        breadcrumbs={['行銷中心', '一頁式商店', crumbCurrent]}
        onBack={() => onNavigate('marketing-landing')}
      />
      <LPStepper step={1} onNavigate={onNavigate} />

      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0 }}>

          <SectionCard title="基礎設定">
            <div style={{ maxWidth: 560 }}>
              <FormField label="商店名稱" required helper="僅供後台識別，不顯示於前台">
                <EInput value={form.name}
                  onChange={v => { set('name', v.slice(0, 50)); if (errors.name) setErrors(e => ({ ...e, name: '' })); }}
                  placeholder="例：夏日美白精華限量搶購"
                  style={errors.name ? { border: '1px solid #F56C6C' } : {}} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
                  {errors.name ? <span style={{ fontSize: 12, color: '#F56C6C' }}>{errors.name}</span> : <span />}
                  <span style={{ fontSize: 11, color: '#C0C4CC' }}>{form.name.length}/50</span>
                </div>
              </FormField>

              <FormField label="主推產品" required error={errors.product}>
                <ESelect value={form.product} onChange={handleProductSelect} width="100%" placeholder="搜尋產品名稱…" options={productOptions} />
              </FormField>

              <FormField label="網址（Slug）" required error={errors.slug}
                helper={<span>https://shop.brand.com/lp/<strong>{form.slug || '[您的網址]'}</strong></span>}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <EInput value={form.slug} onChange={handleSlugChange} placeholder="summer-sale-2026"
                    style={errors.slug ? { flex: 1, border: '1px solid #F56C6C' } : { flex: 1 }} />
                  {slugHint}
                </div>
              </FormField>
            </div>
          </SectionCard>

          <SectionCard title="SEO 設定（選填）">
            <div style={{ maxWidth: 560 }}>
              <FormField label="SEO 標題" helper="建議 30–60 字">
                <EInput value={form.seoTitle} onChange={v => set('seoTitle', v.slice(0, 60))} placeholder="預設使用產品名稱" />
                <div style={{ fontSize: 11, color: '#C0C4CC', textAlign: 'right', marginTop: 2 }}>{form.seoTitle.length}/60</div>
              </FormField>
              <FormField label="SEO 描述" helper="建議 50–160 字">
                <textarea value={form.seoDesc} onChange={e => set('seoDesc', e.target.value.slice(0, 160))}
                  placeholder="簡短描述此活動頁的重點，吸引消費者點擊…"
                  style={{ width: '100%', height: 80, resize: 'vertical', border: '1px solid #DCDFE6', padding: '8px 12px', fontSize: 13, fontFamily: 'inherit', outline: 'none', background: '#fff' }} />
                <div style={{ fontSize: 11, color: '#C0C4CC', textAlign: 'right', marginTop: 2 }}>{form.seoDesc.length}/160</div>
              </FormField>
              <FormField label="社群分享預覽圖（OG）" helper="分享連結到 LINE / FB 時顯示的預覽圖，建議尺寸 1200×630px">
                <div style={{ border: '2px dashed #DCDFE6', padding: '24px', textAlign: 'center', cursor: 'pointer', background: '#FAFAFA' }}
                  onClick={() => show('圖片上傳功能規格待實作（Stage 2）', 'info')}>
                  <div style={{ fontSize: 12, color: '#909399', lineHeight: 1.8 }}>
                    點擊或拖拉圖片至此處上傳<br />
                    <span style={{ color: '#C0C4CC' }}>支援 JPG / PNG，建議 1200×630px</span>
                  </div>
                </div>
              </FormField>
            </div>
          </SectionCard>

          <SectionCard title="進階設定（選填）">
            <div style={{ maxWidth: 560 }}>
              <FormField label="啟用活動排程">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Switch checked={form.scheduleEnabled} onChange={v => set('scheduleEnabled', v)} />
                  <span style={{ fontSize: 13, color: '#606266' }}>自動在設定時間上下架</span>
                </div>
              </FormField>
              {form.scheduleEnabled && (
                <div style={{ background: '#F5F7FA', border: '1px solid #DCDFE6', padding: '16px 20px', marginTop: -8, marginBottom: 16, borderRadius: 3 }}>
                  <FormField label="上架時間">
                    <EInput type="datetime-local" value={form.startDate} onChange={v => set('startDate', v)} style={{ width: 240 }} />
                  </FormField>
                  <FormField label="下架時間（選填）">
                    <EInput type="datetime-local" value={form.endDate} onChange={v => set('endDate', v)} style={{ width: 240 }} />
                  </FormField>
                </div>
              )}
              <FormField label="啟用倒數計時">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Switch checked={form.countdownEnabled} onChange={v => set('countdownEnabled', v)} />
                  <span style={{ fontSize: 13, color: '#606266' }}>在銷售頁上方顯示倒數計時</span>
                </div>
              </FormField>
              {form.countdownEnabled && (
                <div style={{ background: '#F5F7FA', border: '1px solid #DCDFE6', padding: '16px 20px', marginTop: -8, marginBottom: 16, borderRadius: 3 }}>
                  <FormField label="倒數結束時間">
                    <EInput type="datetime-local" value={form.countdownEnd} onChange={v => set('countdownEnd', v)} style={{ width: 240 }} />
                  </FormField>
                  <FormField label="活動結束後">
                    {[
                      { v: 'message', l: '在頁面上顯示「活動已結束」訊息' },
                      { v: 'replace', l: '整個頁面替換為結束畫面' },
                    ].map(o => (
                      <label key={o.v} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer' }}>
                        <input type="radio" name="countdownAction" checked={form.countdownAction === o.v} onChange={() => set('countdownAction', o.v)} />
                        <span style={{ fontSize: 13, color: '#606266' }}>{o.l}</span>
                      </label>
                    ))}
                  </FormField>
                </div>
              )}
            </div>
          </SectionCard>

          <div style={{ background: '#fff', border: '1px solid #DCDFE6', marginBottom: 16, padding: 24, borderRadius: 3 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', paddingBottom: form.kolOpen ? 16 : 0, borderBottom: form.kolOpen ? '1px solid #DCDFE6' : 'none', marginBottom: form.kolOpen ? 16 : 0 }}
              onClick={() => set('kolOpen', !form.kolOpen)}>
              <span style={{ fontWeight: 500, color: '#303133', fontSize: 14 }}>KOL 分潤設定（選填）</span>
              <span style={{ color: '#909399', fontSize: 12 }}>{form.kolOpen ? '▲' : '▼'}</span>
            </div>
            {form.kolOpen && (
              <div style={{ maxWidth: 560 }}>
                <FormField label="啟用 KOL 分潤">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Switch checked={form.kolEnabled} onChange={v => set('kolEnabled', v)} />
                    <span style={{ fontSize: 13, color: '#606266' }}>啟用後可設定 KOL 姓名與分潤比率</span>
                  </div>
                </FormField>
                {form.kolEnabled && (
                  <React.Fragment>
                    <FormField label="KOL 姓名 / 暱稱" helper="僅顯示於報表，不對消費者公開">
                      <EInput value={form.kolName} onChange={v => set('kolName', v)} placeholder="例：阿甜、MissA 美妝" />
                    </FormField>
                    <FormField label="分潤比率" helper="輸入 10 代表訂單金額的 10%">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <NumberInput value={form.kolRate} onChange={v => set('kolRate', v)} width={100} />
                        <span style={{ fontSize: 13, color: '#909399' }}>%</span>
                      </div>
                    </FormField>
                    <FormField label="KOL 聯絡 Email（選填）" helper="用於發送報表分享連結">
                      <EInput value={form.kolEmail} onChange={v => set('kolEmail', v)} placeholder="kol@example.com" />
                    </FormField>
                  </React.Fragment>
                )}
              </div>
            )}
          </div>
        </div>

      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24, paddingTop: 16, borderTop: '1px solid #DCDFE6' }}>
        <EvoBtn variant="secondary" onClick={() => show('草稿已儲存', 'success')}>儲存草稿</EvoBtn>
        <EvoBtn variant="primary" onClick={handleSubmit}>
          {isEdit ? '儲存變更' : '下一步：設計頁面 (Step 2)'}
        </EvoBtn>
      </div>
    </div>
  );
}

function LandingPageStep2({ onNavigate, show }) {
  return (
    <div>
      <PageHeader title={__lpEditTarget ? '編輯一頁式商店' : '建立一頁式商店'} breadcrumbs={['行銷中心', '一頁式商店', __lpEditTarget ? '編輯' : '銷售頁設計']} onBack={() => onNavigate('marketing-landing')} />
      <LPStepper step={2} onNavigate={onNavigate} />
      <SectionCard title="銷售頁設計">
        <div style={{ padding: '48px 0', textAlign: 'center' }}>
          <div style={{ fontSize: 32, color: '#DCDFE6', marginBottom: 16 }}>[ ]</div>
          <div style={{ fontSize: 15, fontWeight: 500, color: '#303133', marginBottom: 8 }}>GrapeJS 視覺化頁面編輯器</div>
          <div style={{ fontSize: 13, color: '#909399', maxWidth: 400, margin: '0 auto', lineHeight: 1.8 }}>
            此步驟將整合 GrapeJS 拖拉式編輯器，讓您透過版型快速設計一頁式商店的視覺內容。<br />
            規格待實作（Stage 2）。
          </div>
        </div>
      </SectionCard>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24, paddingTop: 16, borderTop: '1px solid #DCDFE6' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <EvoBtn variant="secondary" onClick={() => onNavigate('lp-create-step1')}>上一步</EvoBtn>
          <EvoBtn variant="secondary" onClick={() => show('草稿已儲存', 'success')}>儲存草稿</EvoBtn>
        </div>
        <EvoBtn variant="primary" onClick={() => onNavigate('lp-create-step3')}>下一步：加購設定</EvoBtn>
      </div>
    </div>
  );
}

function LandingPageStep3({ onNavigate, show }) {
  const [enabled, setEnabled] = React.useState(false);
  return (
    <div>
      <PageHeader title={__lpEditTarget ? '編輯一頁式商店' : '建立一頁式商店'} breadcrumbs={['行銷中心', '一頁式商店', __lpEditTarget ? '編輯' : '加購設定']} onBack={() => onNavigate('marketing-landing')} />
      <LPStepper step={3} onNavigate={onNavigate} />
      <SectionCard title="加購設定（選填）">
        <div style={{ maxWidth: 560 }}>
          <FormField label="啟用加購推薦">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Switch checked={enabled} onChange={v => setEnabled(v)} />
              <span style={{ fontSize: 13, color: '#606266' }}>在消費者選規格時顯示加購推薦產品（最多 4 件）</span>
            </div>
          </FormField>
          {enabled && (
            <div style={{ background: '#F5F7FA', border: '1px solid #DCDFE6', padding: '16px 20px', marginTop: -8, borderRadius: 3 }}>
              <FormField label="加購區標題" helper="消費者可見，建議用如「搭配更划算」">
                <EInput placeholder="搭配更划算" style={{ width: 320 }} />
              </FormField>
              <FormField label="加購產品">
                <ESelect placeholder="搜尋並新增產品…" options={[
                  { value: '1', label: '超保濕乳液 3件組' },
                  { value: '2', label: '全效防曬噴霧 SPF50' },
                  { value: '3', label: '膠原蛋白面膜 10片' },
                ]} />
                <div style={{ fontSize: 12, color: '#909399', marginTop: 4 }}>最多新增 4 件產品</div>
              </FormField>
            </div>
          )}
        </div>
      </SectionCard>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24, paddingTop: 16, borderTop: '1px solid #DCDFE6' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <EvoBtn variant="secondary" onClick={() => onNavigate('lp-create-step2')}>上一步</EvoBtn>
          <EvoBtn variant="secondary" onClick={() => show('草稿已儲存', 'success')}>儲存草稿</EvoBtn>
        </div>
        <EvoBtn variant="primary" onClick={() => onNavigate('lp-create-step4')}>下一步：預覽與發布</EvoBtn>
      </div>
    </div>
  );
}

function LPFeatureItem({ label }) {
  return (
    <div style={{ padding: '8px 6px', border: '1px solid #EBEEF5', textAlign: 'center' }}>
      <div style={{ fontSize: 14, marginBottom: 3, color: '#B0B0B0' }}>◈</div>
      <div style={{ fontSize: 9, fontWeight: 500, color: '#303133' }}>{label}</div>
    </div>
  );
}

function LPMobilePreview() {
  return (
    <div style={{ width: 296, margin: '0 auto' }}>
      <div style={{ border: '12px solid #222', background: '#222', overflow: 'hidden' }}>
        <div style={{ background: '#111', height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 56, height: 7, background: '#333', borderRadius: 4 }} />
        </div>
        <div style={{ background: '#fff', height: 500, overflowY: 'hidden', position: 'relative' }}>
          <div style={{ background: 'linear-gradient(160deg, #3a3a3a 0%, #1a1a1a 100%)', height: 170, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 14 }}>
            <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, lineHeight: 1.5, marginBottom: 5 }}>夏日美白精華<br />限量搶購</div>
            <div style={{ color: 'rgba(255,255,255,.65)', fontSize: 9, marginBottom: 10 }}>限時優惠，搶完為止</div>
            <div style={{ background: '#fff', color: '#303133', padding: '5px 16px', fontSize: 10, fontWeight: 600, display: 'inline-block' }}>立即購買</div>
          </div>
          <div style={{ background: '#303133', color: '#fff', textAlign: 'center', padding: '8px 0' }}>
            <div style={{ fontSize: 8, opacity: .65, marginBottom: 2 }}>限時優惠剩餘</div>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 3 }}>23:45:12</div>
          </div>
          <div style={{ padding: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {LP_FEATURES.map(f => <LPFeatureItem key={f} label={f} />)}
          </div>
          <div style={{ padding: '0 10px' }}>
            <div style={{ fontSize: 9, fontWeight: 600, color: '#303133', marginBottom: 8 }}>顧客評價</div>
            {LP_REVIEWS.map((r, i) => (
              <div key={i} style={{ border: '1px solid #EBEEF5', padding: '8px', marginBottom: 6 }}>
                <div style={{ color: '#E6A23C', fontSize: 9, marginBottom: 3 }}>★★★★★</div>
                <div style={{ fontSize: 9, color: '#606266', lineHeight: 1.5 }}>{r}</div>
                <div style={{ fontSize: 8, color: '#C0C4CC', marginTop: 3 }}>林小姐</div>
              </div>
            ))}
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: '1px solid #DCDFE6', padding: '7px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, background: '#F5F7FA', border: '1px solid #EBEEF5', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 8, fontWeight: 500, color: '#303133' }}>水光精華 EX</div>
              <div style={{ fontSize: 9, fontWeight: 700, color: '#303133' }}>NT$ 1,280</div>
            </div>
            <div style={{ background: '#303133', color: '#fff', padding: '5px 10px', fontSize: 9, fontWeight: 500, flexShrink: 0 }}>立即購買</div>
          </div>
        </div>
        <div style={{ background: '#111', height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 40, height: 3, background: '#444', borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );
}

function LPDesktopPreview() {
  return (
    <div style={{ border: '1px solid #DCDFE6', overflow: 'hidden' }}>
      <div style={{ background: '#F5F7FA', borderBottom: '1px solid #DCDFE6', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {['#F56C6C', '#E6A23C', '#67C23A'].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />)}
        </div>
        <div style={{ flex: 1, background: '#fff', border: '1px solid #DCDFE6', padding: '3px 10px', fontSize: 10, color: '#909399', marginLeft: 4 }}>
          https://shop.brand.com/lp/summer-glow-2026
        </div>
      </div>
      <div style={{ background: 'linear-gradient(160deg, #3a3a3a 0%, #1a1a1a 100%)', height: 220, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '28px 48px' }}>
        <div style={{ color: '#fff', fontSize: 22, fontWeight: 700, lineHeight: 1.4, marginBottom: 8 }}>夏日美白精華限量搶購</div>
        <div style={{ color: 'rgba(255,255,255,.7)', fontSize: 13, marginBottom: 20 }}>限時優惠，搶完為止</div>
        <div style={{ background: '#fff', color: '#303133', padding: '10px 28px', fontSize: 13, fontWeight: 600, display: 'inline-block' }}>立即購買</div>
      </div>
      <div style={{ background: '#303133', color: '#fff', textAlign: 'center', padding: '14px' }}>
        <div style={{ fontSize: 11, opacity: .65, marginBottom: 3 }}>限時優惠剩餘</div>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 4 }}>23:45:12</div>
      </div>
      <div style={{ padding: '24px 48px', background: '#fff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
          {LP_FEATURES.map(f => (
            <div key={f} style={{ padding: '16px', border: '1px solid #EBEEF5', textAlign: 'center' }}>
              <div style={{ fontSize: 18, marginBottom: 6, color: '#C0C4CC' }}>◈</div>
              <div style={{ fontSize: 12, fontWeight: 500, color: '#303133' }}>{f}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#303133', marginBottom: 12 }}>顧客評價</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {LP_REVIEWS.map((r, i) => (
            <div key={i} style={{ border: '1px solid #EBEEF5', padding: '14px' }}>
              <div style={{ color: '#E6A23C', fontSize: 12, marginBottom: 4 }}>★★★★★</div>
              <div style={{ fontSize: 12, color: '#606266', lineHeight: 1.6 }}>{r}</div>
              <div style={{ fontSize: 11, color: '#C0C4CC', marginTop: 6 }}>林小姐</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LandingPageStep4({ onNavigate, show }) {
  const [previewMode, setPreviewMode] = React.useState('mobile');
  const [published, setPublished]     = React.useState(false);
  const [publishing, setPublishing]   = React.useState(false);
  const [copied, setCopied]           = React.useState(false);

  const handlePublish = () => {
    if (publishing || published) return;
    setPublishing(true);
    setTimeout(() => { setPublishing(false); setPublished(true); show('商店已成功發布！', 'success'); }, 1200);
  };
  const handleCopyLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    show('連結已複製', 'success');
  };

  return (
    <div>
      <PageHeader title={__lpEditTarget ? '編輯一頁式商店' : '建立一頁式商店'} breadcrumbs={['行銷中心', '一頁式商店', __lpEditTarget ? '編輯' : '預覽與發布']} onBack={() => onNavigate('marketing-landing')} />
      <LPStepper step={4} onNavigate={onNavigate} />

      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <SectionCard title="預覽">
            <div style={{ display: 'flex', border: '1px solid #DCDFE6', width: 'fit-content', marginBottom: 24 }}>
              {[{ v: 'mobile', l: '手機預覽' }, { v: 'desktop', l: '桌機預覽' }].map(t => (
                <button key={t.v} onClick={() => setPreviewMode(t.v)} style={{ padding: '8px 22px', border: 'none', background: previewMode === t.v ? '#303133' : '#fff', color: previewMode === t.v ? '#fff' : '#606266', cursor: 'pointer', fontSize: 13, fontWeight: previewMode === t.v ? 500 : 400, fontFamily: 'inherit' }}>
                  {t.l}
                </button>
              ))}
            </div>
            {previewMode === 'mobile' ? <LPMobilePreview /> : <LPDesktopPreview />}
            {published && (
              <div style={{ marginTop: 24, background: '#f0f9eb', border: '1px solid #c2e7b0', padding: '20px 24px', borderRadius: 3 }}>
                <div style={{ fontWeight: 600, color: '#67C23A', fontSize: 14, marginBottom: 12 }}>商店已成功發布！</div>
                <div style={{ fontSize: 12, color: '#606266', marginBottom: 8 }}>推廣連結：</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #DCDFE6', padding: '8px 12px', marginBottom: 12, borderRadius: 3 }}>
                  <code style={{ flex: 1, fontSize: 12, color: '#303133' }}>https://shop.brand.com/lp/summer-glow-2026</code>
                  <EvoBtn variant="secondary" size="sm" onClick={handleCopyLink}>{copied ? '已複製' : '複製連結'}</EvoBtn>
                </div>
                <div style={{ fontSize: 12, color: '#909399', lineHeight: 1.6 }}>
                  建議下一步：前往廣告小幫手為此連結加上 UTM 追蹤標籤，追蹤廣告成效。
                  <span style={{ color: '#409EFF', cursor: 'pointer', marginLeft: 4 }} onClick={() => show('廣告小幫手模組即將推出，敬請期待', 'info')}>前往廣告小幫手 →</span>
                </div>
              </div>
            )}
          </SectionCard>
        </div>
        <div style={{ width: 200, flexShrink: 0 }}>
          <div style={{ background: '#fff', border: '1px solid #DCDFE6', padding: 20, borderRadius: 3 }}>
            <div style={{ fontWeight: 500, fontSize: 13, color: '#303133', marginBottom: 12 }}>發布設定</div>
            <div style={{ fontSize: 12, color: '#909399', marginBottom: 16, lineHeight: 1.7 }}>確認頁面預覽無誤後，點擊「立即發布」即可上線，消費者可立即訪問。</div>
            <EvoBtn variant="primary" fullWidth onClick={handlePublish} disabled={publishing || published}>
              {publishing ? '發布中…' : published ? '已發布' : '立即發布'}
            </EvoBtn>
            <div style={{ marginTop: 8 }}>
              <EvoBtn variant="secondary" fullWidth onClick={() => show('草稿已儲存，您可以稍後繼續編輯。', 'success')}>儲存草稿</EvoBtn>
            </div>
            {published && (
              <div style={{ marginTop: 8 }}>
                <EvoBtn variant="secondary" fullWidth onClick={() => onNavigate('marketing-landing')}>返回列表</EvoBtn>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, paddingTop: 16, borderTop: '1px solid #DCDFE6' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <EvoBtn variant="secondary" onClick={() => onNavigate('lp-create-step3')}>上一步</EvoBtn>
          <EvoBtn variant="secondary" onClick={() => show('草稿已儲存', 'success')}>儲存草稿</EvoBtn>
        </div>
        {!published && <EvoBtn variant="primary" onClick={handlePublish} disabled={publishing}>{publishing ? '發布中…' : '立即發布'}</EvoBtn>}
      </div>
    </div>
  );
}

// ─── 一頁式商店 v2：內頁（頁籤架構） ────────────────────────────────────────
function LandingPageDetailV2({ onNavigate, show }) {
  const editLp = __lpV2EditTarget;
  const isEdit = !!editLp;

  const toDatetimeLocal = (s) => s ? s.replace(' ', 'T') : '';
  const parseKolRate    = (r) => r ? parseFloat(r) || '' : '';

  const [activeTab, setActiveTab] = React.useState('basic');

  const [form, setForm] = React.useState(() => isEdit ? {
    name: editLp.name || '', product: editLp.product || '', slug: editLp.slug || '',
    scheduleEnabled: !!(editLp.scheduleStart), startDate: toDatetimeLocal(editLp.scheduleStart), endDate: toDatetimeLocal(editLp.scheduleEnd),
    countdownEnabled: false, countdownEnd: '', countdownAction: 'message',
    kolEnabled: editLp.hasKOL, kolName: editLp.kolName || '', kolRate: parseKolRate(editLp.kolRate), kolEmail: '',
    upsellEnabled: false, upsellTitle: '',
  } : {
    name: '', product: '', slug: '',
    scheduleEnabled: false, startDate: '', endDate: '',
    countdownEnabled: false, countdownEnd: '', countdownAction: 'message',
    kolEnabled: false, kolName: '', kolRate: '', kolEmail: '',
    upsellEnabled: false, upsellTitle: '',
  });

  const [publishStatus, setPublishStatus] = React.useState(isEdit ? editLp.status : 'disabled');
  const [errors, setErrors]       = React.useState({});
  const [slugStatus, setSlugStatus] = React.useState(isEdit && editLp?.slug ? 'ok' : 'idle');
  const [publishing, setPublishing] = React.useState(false);
  const [copied, setCopied]         = React.useState(false);

  const [seoLocale, setSeoLocale]   = React.useState('繁中');
  const [seoTitle, setSeoTitle]     = React.useState({ '繁中': '', 'EN': '' });
  const [seoDesc, setSeoDesc]       = React.useState({ '繁中': '', 'EN': '' });
  const [seoKeywords, setSeoKeywords] = React.useState({ '繁中': [], 'EN': [] });
  const [seoRobots, setSeoRobots]   = React.useState({ '繁中': 'index-follow', 'EN': 'index-follow' });
  const [ogTitle, setOgTitle]       = React.useState({ '繁中': '', 'EN': '' });
  const [ogDesc, setOgDesc]         = React.useState({ '繁中': '', 'EN': '' });

  const [isPro, setIsPro] = React.useState(window.__evomni_isPro || false);
  React.useEffect(() => {
    const handler = e => setIsPro(e.detail.isPro);
    window.addEventListener('evomni:planchange', handler);
    return () => window.removeEventListener('evomni:planchange', handler);
  }, []);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const checkSlug = React.useCallback((slug) => {
    if (!slug) { setSlugStatus('idle'); return; }
    setSlugStatus('checking');
    setTimeout(() => { setSlugStatus(slug.includes('summer-glow') || slug === 'test' ? 'error' : 'ok'); }, 600);
  }, []);

  const handleSlugChange = (v) => {
    const clean = v.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    set('slug', clean); checkSlug(clean);
  };

  const handleProductSelect = (v) => {
    set('product', v);
    if (!form.slug && v) {
      const sug = v.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/^-+|-+$/g, '').replace(/-{2,}/g, '-').slice(0, 40);
      if (sug.length >= 3) { set('slug', sug); checkSlug(sug); }
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = '請填寫商店名稱';
    if (!form.product) errs.product = '請選擇主推產品';
    if (!form.slug) errs.slug = '請填寫網址';
    else if (slugStatus === 'error') errs.slug = '此網址已被使用，請換一個';
    setErrors(errs);
    if (Object.keys(errs).length > 0) { setActiveTab('basic'); }
    return Object.keys(errs).length === 0;
  };

  const handleSaveDraft = () => { if (!validate()) return; show('草稿已儲存', 'success'); };

  const handlePublish = () => {
    if (!validate() || publishing) return;
    setPublishing(true);
    setTimeout(() => {
      setPublishing(false);
      if (publishStatus !== 'scheduled') setPublishStatus('active');
      show(isEdit ? '「' + form.name + '」已儲存並上架' : '商店已成功上架！', 'success');
    }, 1000);
  };

  const handleCopyLink = () => { setCopied(true); setTimeout(() => setCopied(false), 1500); show('連結已複製', 'success'); };

  const slugHint = (() => {
    if (slugStatus === 'checking') return <span style={{ fontSize: 12, color: '#909399' }}>驗證中…</span>;
    if (slugStatus === 'ok')       return <span style={{ fontSize: 12, color: '#67C23A' }}>✓ 此網址可以使用</span>;
    if (slugStatus === 'error')    return <span style={{ fontSize: 12, color: '#F56C6C' }}>✗ 此網址已被使用，請換一個</span>;
    return null;
  })();

  const productOptions = [
    { value: '水光精華 EX', label: '水光精華 EX' },
    { value: '超保濕乳液 3件組', label: '超保濕乳液 3件組' },
    { value: '全效防曬噴霧 SPF50', label: '全效防曬噴霧 SPF50' },
    { value: '安瓶精華液 5ml', label: '安瓶精華液 5ml' },
    { value: '膠原蛋白面膜 10片', label: '膠原蛋白面膜 10片' },
  ];

  const statusDisplayMap = {
    active: { label: '啟用中', type: 'success' }, disabled: { label: '停用', type: 'info' },
    scheduled: { label: '排程中', type: 'primary' }, ended: { label: '已結束', type: 'warning' },
  };
  const curStatus  = statusDisplayMap[publishStatus] || statusDisplayMap.disabled;
  const formatDate = (n) => n ? String(n).replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') : '—';

  const tabs = [
    { id: 'basic',    label: '基本設定' },
    { id: 'upsell',   label: '加購與KOL' },
    { id: 'advanced', label: '進階設定' },
    { id: 'seo',      label: '網頁SEO' },
  ];

  const isBasic = activeTab === 'basic';

  return (
    <div style={{ position: 'relative' }}>
      {!isPro && (
        <UpgradeLockBanner
          featureName="一頁式商店"
          valueProp="建立專屬銷售頁，搭配限時促銷與加購設計，大幅提升單頁轉換率"
          onLearnMore={() => show('請前往「全域設定 → 方案狀態」查看升級方案，或聯絡您的營運輔導顧問', 'info')}
        />
      )}
      <div style={{ filter: !isPro ? 'blur(3px)' : 'none', pointerEvents: isPro ? 'auto' : 'none' }}>

      {/* ── 頁面標題列 ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => onNavigate('marketing-landing')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#303133', fontSize: 18, padding: '4px 6px', display: 'flex', alignItems: 'center', lineHeight: 1 }}>←</button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <h1 style={{ fontSize: 20, fontWeight: 700 }}>{isEdit ? '編輯一頁式商店' : '建立一頁式商店'}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#909399' }}>
                <span>行銷中心</span><span style={{ color: '#C0C4CC' }}>/</span>
                <span style={{ cursor: 'pointer', color: '#606266' }} onClick={() => onNavigate('marketing-landing')}>一頁式商店</span>
                <span style={{ color: '#C0C4CC' }}>/</span>
                <span>{isEdit ? '編輯' : '建立'}</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <EvoBtn variant="secondary" onClick={handleSaveDraft}>儲存草稿</EvoBtn>
          <EvoBtn variant="primary" onClick={handlePublish} disabled={publishing}>
            {publishing ? '儲存中…' : '儲存並上架'}
          </EvoBtn>
        </div>
      </div>

      {/* ── 主體容器 ── */}
      <div style={{ background: '#fff', minHeight: 600 }}>

        {/* 頁籤列 */}
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          <div style={{ flex: isBasic ? '0 0 55%' : '1', maxWidth: isBasic ? '55%' : '100%' }}>
            <div style={{ display: 'flex', padding: '8px 24px 0' }}>
              {tabs.map(tab => (
                <div key={tab.id} onClick={() => setActiveTab(tab.id)}
                  style={{ padding: '12px 16px', cursor: 'pointer', fontSize: 14,
                    fontWeight: activeTab === tab.id ? 600 : 400,
                    color: activeTab === tab.id ? '#409EFF' : '#606266',
                    borderBottom: activeTab === tab.id ? '2px solid #409EFF' : '2px solid transparent',
                    marginBottom: -1, whiteSpace: 'nowrap' }}>
                  {tab.label}
                </div>
              ))}
            </div>
          </div>
          {isBasic && <div style={{ flex: '0 0 45%', maxWidth: '45%' }} />}
        </div>

        {/* 兩欄內容區 */}
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>

          {/* 左欄：表單 */}
          <div style={{ flex: isBasic ? '0 0 55%' : '1', maxWidth: isBasic ? '55%' : '100%', padding: 24, minHeight: 500 }}>

            {/* ── 基本設定 ── */}
            {activeTab === 'basic' && (
              <div style={{ maxWidth: 520 }}>
                <FormField label="商店名稱" required helper="僅供後台識別，不顯示於前台">
                  <EInput value={form.name}
                    onChange={v => { set('name', v.slice(0, 50)); if (errors.name) setErrors(e => ({ ...e, name: '' })); }}
                    placeholder="例：夏日美白精華限量搶購"
                    style={errors.name ? { border: '1px solid #F56C6C' } : {}} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
                    {errors.name ? <span style={{ fontSize: 12, color: '#F56C6C' }}>{errors.name}</span> : <span />}
                    <span style={{ fontSize: 11, color: '#C0C4CC' }}>{form.name.length}/50</span>
                  </div>
                </FormField>

                {/* 商店連結（編輯模式） */}
                {isEdit && (
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 13, color: '#606266', marginBottom: 6 }}>商店連結</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <code style={{ fontSize: 12, color: '#606266', background: '#F5F7FA', border: '1px solid #DCDFE6', padding: '6px 10px', flex: 1, wordBreak: 'break-all' }}>/lp/{editLp.slug}</code>
                      <EvoBtn variant="secondary" size="sm" onClick={handleCopyLink}>{copied ? '已複製' : '複製連結'}</EvoBtn>
                    </div>
                    {editLp.hasKOL && (
                      <div style={{ marginTop: 6 }}>
                        <EvoBtn variant="secondary" size="sm" onClick={() => show('KOL 報表連結已複製', 'success')}>複製網路紅人報表連結</EvoBtn>
                      </div>
                    )}
                  </div>
                )}

                <FormField label="主推產品" required error={errors.product}>
                  <ESelect value={form.product} onChange={handleProductSelect} width="100%" placeholder="搜尋產品名稱…" options={productOptions} />
                </FormField>
                <FormField label="網址（Slug）" required error={errors.slug}
                  helper={<span>https://shop.brand.com/lp/<strong>{form.slug || '[您的網址]'}</strong></span>}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <EInput value={form.slug} onChange={handleSlugChange} placeholder="summer-sale-2026"
                      style={errors.slug ? { flex: 1, border: '1px solid #F56C6C' } : { flex: 1 }} />
                    {slugHint}
                  </div>
                </FormField>

                {/* 發布狀態 */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 13, color: '#606266', marginBottom: 8 }}>發布狀態</div>
                  <div style={{ display: 'flex', gap: 20 }}>
                    {[['active', '啟用（立即上架）'], ['disabled', '停用'], ['scheduled', '排程發布']].map(([val, label]) =>
                      <label key={val} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14 }}>
                        <input type="radio" name="lpPublishStatus" value={val} checked={publishStatus === val} onChange={() => setPublishStatus(val)} style={{ accentColor: '#409EFF' }} />
                        {label}
                      </label>
                    )}
                  </div>
                </div>

                {/* 今日數據快覽（編輯模式） */}
                {isEdit && (
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 13, color: '#606266', marginBottom: 8 }}>今日數據快覽</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                      {[
                        { label: '瀏覽次數（PV）',    value: editLp.todayPV > 0 ? editLp.todayPV.toLocaleString() + ' 次' : '—' },
                        { label: '購買轉換率（CVR）', value: editLp.cvr !== null ? editLp.cvr.toFixed(1) + '%' : '—' },
                        { label: '成交金額（GMV）',   value: editLp.todayGMV > 0 ? 'NT$ ' + editLp.todayGMV.toLocaleString() : '—' },
                      ].map((row, i) => (
                        <div key={i} style={{ background: '#F5F7FA', border: '1px solid #DCDFE6', padding: '10px 12px', borderRadius: 3 }}>
                          <div style={{ fontSize: 11, color: '#909399', marginBottom: 4 }}>{row.label}</div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#303133' }}>{row.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── 加購與 KOL ── */}
            {activeTab === 'upsell' && (
              <div style={{ maxWidth: 520 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#303133', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #EBEEF5' }}>加購推薦設定</div>
                <FormField label="啟用加購推薦">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Switch checked={form.upsellEnabled} onChange={v => set('upsellEnabled', v)} />
                    <span style={{ fontSize: 13, color: '#606266' }}>在消費者選規格時顯示加購推薦產品（最多 4 件）</span>
                  </div>
                </FormField>
                {form.upsellEnabled && (
                  <div style={{ background: '#F5F7FA', border: '1px solid #DCDFE6', padding: '16px 20px', marginTop: -8, marginBottom: 16, borderRadius: 3 }}>
                    <FormField label="加購區標題" helper="消費者可見，建議用如「搭配更划算」">
                      <EInput value={form.upsellTitle} onChange={v => set('upsellTitle', v)} placeholder="搭配更划算" style={{ width: 320 }} />
                    </FormField>
                    <FormField label="加購產品">
                      <ESelect placeholder="搜尋並新增產品…" options={[
                        { value: '1', label: '超保濕乳液 3件組' },
                        { value: '2', label: '全效防曬噴霧 SPF50' },
                        { value: '3', label: '膠原蛋白面膜 10片' },
                      ]} />
                      <div style={{ fontSize: 12, color: '#909399', marginTop: 4 }}>最多新增 4 件產品</div>
                    </FormField>
                  </div>
                )}

                <div style={{ fontSize: 14, fontWeight: 600, color: '#303133', marginTop: 24, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #EBEEF5' }}>網路紅人分潤設定（KOL）</div>
                <FormField label="啟用分潤機制">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Switch checked={form.kolEnabled} onChange={v => set('kolEnabled', v)} />
                    <span style={{ fontSize: 13, color: '#606266' }}>啟用後可設定網路紅人姓名與分潤比率</span>
                  </div>
                </FormField>
                {form.kolEnabled && (
                  <div style={{ background: '#F5F7FA', border: '1px solid #DCDFE6', padding: '16px 20px', marginTop: -8, borderRadius: 3 }}>
                    <FormField label="網路紅人姓名 / 暱稱（KOL）" helper="僅顯示於報表，不對消費者公開">
                      <EInput value={form.kolName} onChange={v => set('kolName', v)} placeholder="例：阿甜、MissA 美妝" />
                    </FormField>
                    <FormField label="分潤比率" helper="輸入 10 代表訂單金額的 10%">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <NumberInput value={form.kolRate} onChange={v => set('kolRate', v)} width={100} />
                        <span style={{ fontSize: 13, color: '#909399' }}>%</span>
                      </div>
                    </FormField>
                    <FormField label="聯絡信箱（選填）" helper="用於發送報表分享連結">
                      <EInput value={form.kolEmail} onChange={v => set('kolEmail', v)} placeholder="kol@example.com" />
                    </FormField>
                  </div>
                )}
              </div>
            )}

            {/* ── 進階設定 ── */}
            {activeTab === 'advanced' && (
              <div style={{ maxWidth: 520 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#303133', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #EBEEF5' }}>活動排程</div>
                <FormField label="啟用活動排程">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Switch checked={form.scheduleEnabled} onChange={v => set('scheduleEnabled', v)} />
                    <span style={{ fontSize: 13, color: '#606266' }}>自動在設定時間上下架</span>
                  </div>
                </FormField>
                {form.scheduleEnabled && (
                  <div style={{ background: '#F5F7FA', border: '1px solid #DCDFE6', padding: '16px 20px', marginTop: -8, marginBottom: 16, borderRadius: 3 }}>
                    <FormField label="上架時間">
                      <EInput type="datetime-local" value={form.startDate} onChange={v => set('startDate', v)} style={{ width: 240 }} />
                    </FormField>
                    <FormField label="下架時間（選填）">
                      <EInput type="datetime-local" value={form.endDate} onChange={v => set('endDate', v)} style={{ width: 240 }} />
                    </FormField>
                  </div>
                )}

                <div style={{ fontSize: 14, fontWeight: 600, color: '#303133', marginTop: 24, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #EBEEF5' }}>倒數計時</div>
                <FormField label="啟用倒數計時">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Switch checked={form.countdownEnabled} onChange={v => set('countdownEnabled', v)} />
                    <span style={{ fontSize: 13, color: '#606266' }}>在銷售頁上方顯示倒數計時</span>
                  </div>
                </FormField>
                {form.countdownEnabled && (
                  <div style={{ background: '#F5F7FA', border: '1px solid #DCDFE6', padding: '16px 20px', marginTop: -8, borderRadius: 3 }}>
                    <FormField label="倒數結束時間">
                      <EInput type="datetime-local" value={form.countdownEnd} onChange={v => set('countdownEnd', v)} style={{ width: 240 }} />
                    </FormField>
                    <FormField label="活動結束後">
                      {[
                        { v: 'message', l: '在頁面上顯示「活動已結束」訊息' },
                        { v: 'replace', l: '整個頁面替換為結束畫面' },
                      ].map(o => (
                        <label key={o.v} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer' }}>
                          <input type="radio" name="countdownAction_v2" checked={form.countdownAction === o.v} onChange={() => set('countdownAction', o.v)} />
                          <span style={{ fontSize: 13, color: '#606266' }}>{o.l}</span>
                        </label>
                      ))}
                    </FormField>
                  </div>
                )}
              </div>
            )}

            {/* ── 網頁 SEO ── */}
            {activeTab === 'seo' && (
              <div style={{ padding: '0 0 32px' }}>

                {/* 語系切換 */}
                <div style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
                  {['繁中', 'EN'].map(loc =>
                    <label key={loc} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', padding: '4px 12px', border: `1px solid ${seoLocale === loc ? '#409EFF' : '#DCDFE6'}`, borderRadius: 4, background: seoLocale === loc ? '#EFF6FF' : '#fff' }}>
                      <input type="radio" name="lp_seoLocale" value={loc} checked={seoLocale === loc} onChange={() => setSeoLocale(loc)} style={{ accentColor: '#409EFF' }} />
                      <span style={{ fontSize: 14, color: seoLocale === loc ? '#409EFF' : '#606266', fontWeight: seoLocale === loc ? 600 : 400 }}>{loc}</span>
                    </label>
                  )}
                </div>

                {/* 網頁資訊 */}
                <div style={{ marginBottom: 36 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    網頁資訊<span style={{ fontSize: 12, color: '#909399', fontWeight: 400 }}>meta</span>
                  </div>
                  <div style={{ borderTop: '1px solid #EBEEF5' }}>

                    <div style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #EBEEF5' }}>
                      <div style={{ width: 68, fontSize: 14, color: '#606266', flexShrink: 0 }}>標題</div>
                      <input value={seoTitle[seoLocale] || ''}
                        onChange={(e) => setSeoTitle(prev => ({ ...prev, [seoLocale]: e.target.value }))}
                        style={{ flex: 1, height: 40, border: '1px solid #DCDFE6', padding: '0 10px', fontSize: 14, outline: 'none', fontFamily: 'Noto Sans TC, sans-serif' }}
                        onFocus={(e) => e.target.style.borderColor = '#409EFF'} onBlur={(e) => e.target.style.borderColor = '#DCDFE6'} />
                    </div>

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

                    <div style={{ display: 'flex', alignItems: 'flex-start', padding: '12px 0', borderBottom: '1px solid #EBEEF5' }}>
                      <div style={{ width: 68, fontSize: 14, color: '#606266', flexShrink: 0, paddingTop: 8 }}>簡介</div>
                      <textarea value={seoDesc[seoLocale] || ''} rows={3}
                        onChange={(e) => setSeoDesc(prev => ({ ...prev, [seoLocale]: e.target.value }))}
                        placeholder="請輸入頁面的簡短描述（建議 50-160 字元，能清楚傳達內容並吸引點擊）"
                        style={{ flex: 1, border: '1px solid #DCDFE6', padding: '8px 10px', fontSize: 14, resize: 'vertical', outline: 'none', fontFamily: 'Noto Sans TC, sans-serif' }}
                        onFocus={(e) => e.target.style.borderColor = '#409EFF'} onBlur={(e) => e.target.style.borderColor = '#DCDFE6'} />
                    </div>

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

                {/* 社群分享設定 */}
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    社群分享設定<span style={{ fontSize: 12, color: '#909399', fontWeight: 400 }}>og.meta</span>
                  </div>
                  <div style={{ borderTop: '1px solid #EBEEF5' }}>

                    <div style={{ display: 'flex', alignItems: 'flex-start', padding: '12px 0', borderBottom: '1px solid #EBEEF5' }}>
                      <div style={{ width: 68, fontSize: 14, color: '#606266', flexShrink: 0, paddingTop: 4 }}>分享圖片</div>
                      <div>
                        <div style={{ width: 120, height: 90, border: '1px dashed #DCDFE6', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#C0C4CC', fontSize: 28, marginBottom: 6 }}
                          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#409EFF'}
                          onMouseLeave={(e) => e.currentTarget.style.borderColor = '#DCDFE6'}>+</div>
                        <div style={{ fontSize: 12, color: '#909399' }}>支援 圖片 格式，檔案大小不超過 20MB</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #EBEEF5' }}>
                      <div style={{ width: 68, fontSize: 14, color: '#606266', flexShrink: 0 }}>分享標題</div>
                      <input value={ogTitle[seoLocale] || ''}
                        onChange={(e) => setOgTitle(prev => ({ ...prev, [seoLocale]: e.target.value }))}
                        style={{ flex: 1, height: 40, border: '1px solid #DCDFE6', padding: '0 10px', fontSize: 14, outline: 'none', fontFamily: 'Noto Sans TC, sans-serif' }}
                        onFocus={(e) => e.target.style.borderColor = '#409EFF'} onBlur={(e) => e.target.style.borderColor = '#DCDFE6'} />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', padding: '12px 0', borderBottom: '1px solid #EBEEF5' }}>
                      <div style={{ width: 68, fontSize: 14, color: '#606266', flexShrink: 0, paddingTop: 8 }}>分享描述</div>
                      <textarea value={ogDesc[seoLocale] || ''} rows={3}
                        onChange={(e) => setOgDesc(prev => ({ ...prev, [seoLocale]: e.target.value }))}
                        placeholder="請輸入頁面的簡短描述（建議 50-160 字元，能清楚傳達內容並吸引點擊）"
                        style={{ flex: 1, border: '1px solid #DCDFE6', padding: '8px 10px', fontSize: 14, resize: 'vertical', outline: 'none', fontFamily: 'Noto Sans TC, sans-serif' }}
                        onFocus={(e) => e.target.style.borderColor = '#409EFF'} onBlur={(e) => e.target.style.borderColor = '#DCDFE6'} />
                    </div>

                    <div style={{ paddingTop: 16 }}>
                      <button onClick={() => show('Facebook 快取已清除', 'success')}
                        style={{ background: 'none', border: '1px solid #DCDFE6', padding: '6px 14px', fontSize: 13, cursor: 'pointer', color: '#606266', fontFamily: 'Noto Sans TC, sans-serif' }}>
                        清除Facebook快取
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* 右欄：頁面設計入口（只在「基本設定」頁籤顯示） */}
          {isBasic && (
            <div style={{ flex: '0 0 45%', maxWidth: '45%', background: '#F5F7FA', minHeight: 400, padding: '32px 24px 24px 24px', display: 'flex', flexDirection: 'column' }}>

              {/* 頁面設計入口（參考產品管理） */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, color: '#909399', marginBottom: 4, letterSpacing: 1 }}>頁面設計</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: '#303133', letterSpacing: 1, lineHeight: 1.2 }}>PAGE DESIGN</div>
                <div style={{ fontSize: 11, color: '#909399', marginTop: 6, lineHeight: 1.6 }}>以視覺化拖拉編輯器設計<br />您的一頁式商店外觀</div>
              </div>

              {/* 預覽色塊 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 16 }}>
                {[
                  { bg: '#d4b896', label: '產品主視覺' },
                  { bg: '#8fa8c8', label: '' },
                  { bg: '#c9b8d4', label: '購買轉換區' },
                ].map((item, i) => (
                  <div key={i} style={{ height: 110, background: item.bg, display: 'flex', alignItems: 'flex-end', padding: 6, position: 'relative', overflow: 'hidden' }}>
                    {i === 1 && (
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: 36, height: 36, border: '2px solid rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div style={{ width: 18, height: 18, background: 'rgba(255,255,255,0.5)' }} />
                        </div>
                      </div>
                    )}
                    {item.label && <div style={{ fontSize: 9, color: '#fff', lineHeight: 1.3, zIndex: 1, textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>{item.label}</div>}
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center' }}>
                <EvoBtn variant="primary" onClick={() => show('頁面編輯器規格待實作（Stage 2）', 'info')}>頁面設計</EvoBtn>
              </div>

            </div>
          )}

        </div>
      </div>
      </div>{/* end isPro wrapper */}
    </div>
  );
}

// ─── Page Map ─────────────────────────────────────────────────────────────────
const MKT_PAGE_MAP = {
  'coupon-list':         p => <UnifiedDiscountListPage {...p} />,
  'coupon-new':          p => <CouponFormPage          {...p} mode="add" />,
  'coupon-edit':         p => <CouponFormPage          {...p} mode="edit" />,
  'promotion-list':      p => <UnifiedDiscountListPage {...p} />,
  'promotion-new':       p => <PromotionFormPage       {...p} />,
  'gift-items':          p => <GiftItemsPage        {...p} />,
  'gift-item-new':       p => <GiftItemFormPage     {...p} mode="add" />,
  'gift-item-edit':      p => <GiftItemFormPage     {...p} mode="edit" />,
  'freeship-new':        p => <FreeshippingFormPage {...p} />,
  'gift-new':            p => <GiftFormPage        {...p} />,
  'flash-sale-new':      p => <FlashSaleFormPage   {...p} />,
  'bundle-new':          p => <BundleFormPage      {...p} />,
  'marketing-promotions':p => <UnifiedDiscountListPage {...p} />,
  'marketing-journey':   p => <JourneyOverviewPage {...p} />,
  'journey-overview':    p => <JourneyOverviewPage {...p} />,
  'journey-cart':     p => <CartRecoveryPage    {...p} />,
  'journey-sleep':    p => <SleepWakeupPage     {...p} initialTab="sleep" />,
  'journey-loss':     p => <SleepWakeupPage     {...p} initialTab="loss" />,
  'journey-post':     p => <PostPurchasePage    {...p} />,
  'journey-expiry':   p => <ExpiryReminderPage  {...p} />,
  'line-oa':          p => <LineOAPage          {...p} />,
  'push-logs':        p => <PushLogsPage        {...p} />,
  'marketing-landing':    p => <LandingPageDashboard   {...p} />,
  'lp-create-step1':     p => <LandingPageStep1       {...p} />,
  'lp-create-step2':     p => <LandingPageStep2       {...p} />,
  'lp-create-step3':     p => <LandingPageStep3       {...p} />,
  'lp-create-step4':     p => <LandingPageStep4       {...p} />,
  
  'lp-detail-v2':        p => <LandingPageDetailV2    {...p} />,
};

// ─── App ──────────────────────────────────────────────────────────────────────
function PageMarketing({ currentPage, onNavigate, show }) {
  const showToast = show || (() => {});
  const PageComponent = MKT_PAGE_MAP[currentPage] || MKT_PAGE_MAP['marketing-promotions'];
  return <PageComponent onNavigate={onNavigate} show={showToast} />;
}