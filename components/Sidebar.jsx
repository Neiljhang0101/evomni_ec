// Evomni Admin — Sidebar component
// Section-based dynamic sidebar: BASE + ECOMMERCE (conditional) + WEBSITE + SETTINGS

// ─── Menu section data ────────────────────────────────────────────────────────

const BASE_ITEMS = [
  {
    id: 'dashboard',
    label: '儀表板',

    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1" fill="currentColor" opacity="0.9"/>
        <rect x="9" y="1" width="6" height="6" rx="1" fill="currentColor" opacity="0.9"/>
        <rect x="1" y="9" width="6" height="6" rx="1" fill="currentColor" opacity="0.9"/>
        <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" opacity="0.9"/>
      </svg>
    ),
  },
  {
    id: 'products',
    label: '產品',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6.5" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.9"/>
        <rect x="8.5" y="1" width="6.5" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.9"/>
        <rect x="1" y="8.5" width="6.5" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.9"/>
        <rect x="8.5" y="8.5" width="6.5" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.9"/>
      </svg>
    ),
    children: [
      { id: 'product-list',         label: '商品管理' },
      { id: 'category-management',  label: '商品分類' },
      { id: 'inventory-management', label: '庫存管理' },
    ],
  },
  {
    id: 'articles',
    label: '文章',
    wip: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 1h7l3 3v10a1 1 0 01-1 1H3a1 1 0 01-1-1V2a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.9"/>
        <path d="M10 1v3h3" stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.9"/>
        <line x1="5" y1="8"  x2="11" y2="8"  stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.9"/>
        <line x1="5" y1="11" x2="9"  y2="11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.9"/>
      </svg>
    ),
  },
  {
    id: 'members',
    label: '顧客',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.9"/>
        <path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.9"/>
      </svg>
    ),
    children: [
      { id: 'customer-management', label: '顧客管理' },
      { id: 'member-segment',      label: '分眾篩選' },
      { id: 'member-blacklist',    label: '黑名單' },
      { id: 'member-settings',     label: '設定' },
    ],
  },
  {
    id: 'analytics',
    label: '數據中心',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2"   y="8" width="3" height="6" rx="0.5" fill="currentColor" opacity="0.9"/>
        <rect x="6.5" y="5" width="3" height="9" rx="0.5" fill="currentColor" opacity="0.9"/>
        <rect x="11"  y="2" width="3" height="12" rx="0.5" fill="currentColor" opacity="0.9"/>
      </svg>
    ),
    children: [
      { id: 'analytics-sales',     label: '銷售概覽' },
      { id: 'analytics-products',  label: '商品分析' },
      { id: 'analytics-members',   label: '會員分析' },
      { id: 'analytics-marketing', label: '行銷成效' },
    ],
  },
  {
    id: 'media-library',
    label: '媒體庫',
    wip: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.9"/>
        <circle cx="5.5" cy="7.5" r="1.5" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.9"/>
        <path d="M1 11l4-3 3.5 2.5 2-1.5L15 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
      </svg>
    ),
  },
  {
    id: 'forms',
    label: '表單訊息',
    wip: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="2" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.9"/>
        <polyline points="1,3 8,8 15,3" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none" opacity="0.9"/>
        <line x1="3" y1="14" x2="8" y2="14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
  },
  {
    id: 'notifications',
    label: '通知',
    wip: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1.5A4.5 4.5 0 003.5 6v3.5L2 11.5h12L12.5 9.5V6A4.5 4.5 0 008 1.5z" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round" opacity="0.9"/>
        <path d="M6.5 13.5a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.9"/>
      </svg>
    ),
  },
];

const ECOMMERCE_ITEMS = [
  {
    id: 'orders',
    label: '訂單管理',
    sectionDivider: true,
    sectionLabel: '電商系統',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="1" width="12" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.9"/>
        <line x1="5" y1="5" x2="11" y2="5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="5" y1="8" x2="11" y2="8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="5" y1="11" x2="8.5" y2="11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    children: [
      { id: 'order-list',    label: '全部訂單' },
      { id: 'order-returns', label: '退換貨申請' },
      { id: 'order-invoice', label: '電子發票管理' },
    ],
  },
  {
    id: 'marketing',
    label: '行銷中心',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1.5L9.6 5.7L14.2 6.1L10.8 9.1L11.9 13.6L8 11.3L4.1 13.6L5.2 9.1L1.8 6.1L6.4 5.7L8 1.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" opacity="0.9"/>
      </svg>
    ),
    children: [
      { id: 'marketing-promotions', label: '優惠活動' },
      { id: 'gift-items',           label: '贈品管理' },
      { id: 'marketing-journey',    label: '自動化旅程' },
      { id: 'push-logs',            label: '推播記錄' },
      { id: 'marketing-landing',    label: '一頁式商店' },
      { id: 'marketing-ad-tools',   label: '廣告投放工具' },
    ],
  },
  {
    id: 'ecommerce-settings',
    label: '電商設定',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M1 5h14l-2 7H3L1 5z" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round" opacity="0.9"/>
        <path d="M5 5L6 2h4l1 3" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round" opacity="0.9"/>
        <line x1="6.5" y1="8.5" x2="6.5" y2="11.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.9"/>
        <line x1="9.5" y1="8.5" x2="9.5" y2="11.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.9"/>
      </svg>
    ),
    children: [
      { id: 'gs-ecommerce-store', label: '電商基本設定' },
      {
        id: 'gs-payment-logistics',
        label: '金物流串接',
        children: [
          { id: 'payment-hub',     label: '金流設定' },
          { id: 'gs-temp-freight', label: '物流與運費' },
          { id: 'webhook-mgmt',    label: 'Webhook 管理' },
        ],
      },
      {
        id: 'gs-advanced',
        label: '電商進階設定',
        children: [
          { id: 'gs-third-party-login',   label: '第三方登入設定' },
          { id: 'line-oa',                label: 'LINE OA 設定' },
          { id: 'gs-cart-timeout',        label: '購物車逾時設定' },
          { id: 'gs-stock-alert',         label: '庫存警示門檻' },
          { id: 'gs-member-verification', label: '會員驗證設定' },
        ],
      },
      { id: 'gs-tracking',   label: '行銷追蹤碼' },
      { id: 'gs-newsletter', label: '電子報' },
      { id: 'gs-msl',        label: '美安串接' },
    ],
  },
];

const WEBSITE_ITEMS = [
  {
    id: 'website-cms',
    label: '品牌形象站',
    sectionDivider: true,
    sectionLabel: '網站設計',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.9"/>
        <path d="M8 1c-2 3-2 9 0 14M8 1c2 3 2 9 0 14" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.9"/>
        <line x1="1" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.2" opacity="0.9"/>
        <path d="M2 5h12M2 11h12" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
      </svg>
    ),
    children: [
      { id: 'website-menu', label: '選單管理' },
      { id: 'system-pages', label: '系統分頁' },
    ],
  },
  {
    id: 'website-ec',
    label: '電商網站',
    ecOnly: true,
    wip: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M1 2.5h2.5L5.5 10h7l2-5.5H4.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
        <circle cx="6.5"  cy="13" r="1.3" fill="currentColor" opacity="0.9"/>
        <circle cx="11.5" cy="13" r="1.3" fill="currentColor" opacity="0.9"/>
      </svg>
    ),
  },
];

const SETTINGS_ITEMS = [
  {
    id: 'global-settings',
    label: '全域設定',
    sectionDivider: true,
    sectionLabel: '設定',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.9"/>
        <path d="M8 1v1.5M8 13.5V15M15 8h-1.5M2.5 8H1M12.7 3.3l-1.06 1.06M4.36 11.64l-1.06 1.06M12.7 12.7l-1.06-1.06M4.36 4.36L3.3 3.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.9"/>
      </svg>
    ),
    children: [
      { id: 'gs-system',      label: '系統設定',  wip: true },
      { id: 'gs-permissions', label: '權限設定',  wip: true },
      { id: 'gs-accounts',    label: '帳號設定',  wip: true },
      { id: 'gs-version',     label: '系統版本' },
      { id: 'gs-ai-plan',     label: 'AI 方案',   wip: true },
      { id: 'gs-plan-status', label: '方案狀態' },
    ],
  },
];

// ─── Navigation mapping ───────────────────────────────────────────────────────

const NAV_GROUP_MAP = {
  // Products
  'product-dashboard': 'products', 'product-list': 'products', 'product-add': 'products', 'product-edit': 'products',
  'category-management': 'products', 'inventory-management': 'products',
  // Members
  'customer-management': 'members', 'customer-list': 'members', 'customer-detail': 'members', 'customer-settings-hub': 'members',
  'member-segment': 'members', 'member-blacklist': 'members', 'member-settings': 'members',
  'member-tier': 'members', 'member-points': 'members', 'member-tags': 'members', 'member-notifications': 'members',
  // Analytics
  'analytics-sales': 'analytics', 'analytics-products': 'analytics', 'analytics-members': 'analytics', 'analytics-marketing': 'analytics',
  // Orders
  'order-list': 'orders', 'order-detail': 'orders', 'order-returns': 'orders', 'rma-list': 'orders', 'rma-detail': 'orders',
  'guest-query': 'orders', 'guest-result': 'orders', 'guest-rma': 'orders', 'create-order': 'orders',
  'order-invoice': 'orders', 'order-settings': 'orders',
  // Marketing
  'marketing-promotions': 'marketing', 'coupon-list': 'marketing', 'coupon-new': 'marketing', 'coupon-edit': 'marketing',
  'promotion-list': 'marketing', 'promotion-new': 'marketing', 'freeship-new': 'marketing',
  'gift-items': 'marketing', 'gift-item-new': 'marketing', 'gift-item-edit': 'marketing', 'gift-new': 'marketing',
  'flash-sale-new': 'marketing', 'bundle-new': 'marketing',
  'marketing-journey': 'marketing', 'journey-overview': 'marketing', 'journey-cart': 'marketing',
  'journey-sleep': 'marketing', 'journey-loss': 'marketing', 'journey-post': 'marketing', 'journey-expiry': 'marketing',
  'push-logs': 'marketing', 'marketing-landing': 'marketing', 'marketing-landing-v2': 'marketing', 'lp-detail-v2': 'marketing',
  'lp-create-step1': 'marketing', 'lp-create-step2': 'marketing', 'lp-create-step3': 'marketing', 'lp-create-step4': 'marketing',
  'marketing-ad-tools': 'marketing',
  // Ecommerce settings
  'gs-ecommerce-store': 'ecommerce-settings',
  'gs-payment-logistics': 'ecommerce-settings', 'payment-hub': 'ecommerce-settings', 'invoice-settings': 'ecommerce-settings', 'webhook-mgmt': 'ecommerce-settings',
  'vendor-auto': 'ecommerce-settings', 'vendor-bank': 'ecommerce-settings', 'vendor-manual': 'ecommerce-settings', 'vendor-semi': 'ecommerce-settings', 'recurring': 'ecommerce-settings',
  'gs-temp-freight': 'ecommerce-settings', 'gs-weight-freight': 'ecommerce-settings',
  'gs-advanced': 'ecommerce-settings', 'gs-third-party-login': 'ecommerce-settings', 'line-oa': 'ecommerce-settings',
  'gs-cart-timeout': 'ecommerce-settings', 'gs-stock-alert': 'ecommerce-settings', 'gs-member-verification': 'ecommerce-settings',
  'gs-tracking': 'ecommerce-settings', 'gs-newsletter': 'ecommerce-settings', 'gs-newsletter-flydove': 'ecommerce-settings',
  'gs-msl': 'ecommerce-settings', 'gs-msl-detail': 'ecommerce-settings',
  // Website CMS
  'website-menu': 'website-cms', 'system-pages': 'website-cms',
  // Global settings (CMS)
  'gs-system': 'global-settings', 'gs-permissions': 'global-settings', 'gs-accounts': 'global-settings',
  'gs-version': 'global-settings', 'gs-ai-plan': 'global-settings', 'gs-plan-status': 'global-settings',
};

// Auto-build L3 → L2 parent map from all sections
const L3_PARENT_MAP = (() => {
  const map = {};
  [...BASE_ITEMS, ...ECOMMERCE_ITEMS, ...WEBSITE_ITEMS, ...SETTINGS_ITEMS].forEach(l1 => {
    (l1.children || []).forEach(l2 => {
      (l2.children || []).forEach(l3 => {
        map[l3.id] = l2.id;
      });
    });
  });
  return map;
})();

// ─── Active child resolution ──────────────────────────────────────────────────

function getActiveSidebarChild(page) {
  if (['order-detail','create-order','guest-query','guest-result','guest-rma','order-settings'].includes(page)) return 'order-list';
  if (['rma-list','rma-detail'].includes(page)) return 'order-returns';
  if (['product-dashboard','product-add','product-edit'].includes(page)) return 'product-list';
  if (['coupon-list','coupon-new','coupon-edit','promotion-list','promotion-new','freeship-new','gift-new','flash-sale-new','bundle-new'].includes(page)) return 'marketing-promotions';
  if (['journey-overview','journey-cart','journey-sleep','journey-loss','journey-post','journey-expiry'].includes(page)) return 'marketing-journey';
  if (['lp-create-step1','lp-create-step2','lp-create-step3','lp-create-step4','marketing-landing-v2','lp-detail-v2'].includes(page)) return 'marketing-landing';
  if (['gift-item-new','gift-item-edit'].includes(page)) return 'gift-items';
  if (['vendor-auto','vendor-bank','vendor-manual','vendor-semi','recurring','invoice-settings'].includes(page)) return 'payment-hub';
  if (['gs-weight-freight'].includes(page)) return 'gs-temp-freight';
  if (['customer-list','customer-detail'].includes(page)) return 'customer-management';
  if (['customer-settings-hub','member-tier','member-points','member-tags','member-notifications'].includes(page)) return 'member-settings';
  if (['gs-newsletter-flydove'].includes(page)) return 'gs-newsletter';
  if (['gs-msl-detail'].includes(page)) return 'gs-msl';
  return page;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function LockIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" style={{ flexShrink: 0 }}>
      <rect x="2" y="5" width="7" height="5" rx="1" stroke="#C0C4CC" strokeWidth="1.2" fill="none"/>
      <path d="M3.5 5V3.5a2 2 0 014 0V5" stroke="#C0C4CC" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function ChevronIcon({ open, size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none"
      style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none', flexShrink: 0 }}>
      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ─── Sidebar component ────────────────────────────────────────────────────────

function Sidebar({ currentPage, onNavigate, collapsed, showEcommerce = true }) {
  const menuData = React.useMemo(() => [
    ...BASE_ITEMS,
    ...(showEcommerce ? ECOMMERCE_ITEMS : []),
    ...WEBSITE_ITEMS.filter(item => !item.ecOnly || showEcommerce),
    ...SETTINGS_ITEMS,
  ], [showEcommerce]);

  const activeGroup = NAV_GROUP_MAP[currentPage] || currentPage;
  const activeSidebarChild = getActiveSidebarChild(currentPage);

  const [expanded, setExpanded] = React.useState(() => {
    const initial = {};
    menuData.forEach(item => {
      if (item.children) initial[item.id] = item.id === activeGroup;
    });
    const l2Parent = L3_PARENT_MAP[activeSidebarChild];
    if (l2Parent) initial[l2Parent] = true;
    return initial;
  });

  // Re-expand relevant group when page changes
  React.useEffect(() => {
    const group = NAV_GROUP_MAP[currentPage] || currentPage;
    const child = getActiveSidebarChild(currentPage);
    const l2Parent = L3_PARENT_MAP[child];
    setExpanded(prev => {
      const next = { ...prev, [group]: true };
      if (l2Parent) next[l2Parent] = true;
      return next;
    });
  }, [currentPage]);

  // Reset expanded state when ecommerce visibility changes
  React.useEffect(() => {
    const initial = {};
    menuData.forEach(item => {
      if (item.children) initial[item.id] = item.id === activeGroup;
    });
    setExpanded(initial);
  }, [showEcommerce]);

  const toggleGroup = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  const ACCENT    = '#4F8EF7';
  const ACCENT_BG = 'rgba(79,142,247,0.08)';
  const BG_HOVER  = '#F5F7FA';
  const TEXT_PRIMARY   = '#303133';
  const TEXT_SECONDARY = '#909399';
  const BORDER = '#DCDFE6';

  const isParentActive = (id) => (NAV_GROUP_MAP[currentPage] || currentPage) === id;

  const calcL1MaxHeight = (children) => {
    let h = 0;
    children.forEach(child => {
      h += 44;
      if (child.children && expanded[child.id]) h += child.children.length * 40;
    });
    return h + 'px';
  };

  return (
    <div style={{
      width: collapsed ? 56 : 240, minWidth: collapsed ? 56 : 240,
      height: '100%', background: '#fff', borderRight: `1px solid ${BORDER}`,
      overflow: 'hidden', transition: 'width 0.22s cubic-bezier(.4,0,.2,1), min-width 0.22s cubic-bezier(.4,0,.2,1)',
      display: 'flex', flexDirection: 'column', flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: collapsed ? 0 : '0 16px', borderBottom: `1px solid ${BORDER}`, flexShrink: 0, overflow: 'hidden' }}>
        <img src="/assets/logo.jpg" alt="Evomni" style={{ height: 28, maxWidth: collapsed ? 36 : 160, objectFit: collapsed ? 'cover' : 'contain', objectPosition: 'left center' }} />
      </div>

      {/* Nav */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {menuData.map((item) => {
          const parentActive = isParentActive(item.id) || currentPage === item.id;
          const isOpen = !collapsed && expanded[item.id];
          return (
            <div key={item.id}>
              {/* Section label */}
              {!collapsed && item.sectionLabel && (
                <div style={{ padding: '24px 16px 2px', fontSize: 12, color: '#B0B6BF', letterSpacing: '0.04em', fontWeight: 500, userSelect: 'none' }}>
                  {item.sectionLabel}
                </div>
              )}

              {/* L1 row */}
              <div
                onClick={() => {
                  if (collapsed) {
                    onNavigate(item.children ? item.children[0].id : item.id);
                  } else if (item.wip) {
                    onNavigate(item.id);
                  } else {
                    item.children ? toggleGroup(item.id) : onNavigate(item.id);
                  }
                }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between', padding: collapsed ? 0 : '0 16px', height: 48, cursor: 'pointer', background: parentActive ? BG_HOVER : 'transparent', color: parentActive ? TEXT_PRIMARY : TEXT_SECONDARY, fontSize: 13.5, fontWeight: parentActive ? 500 : 400, userSelect: 'none', transition: 'background 0.15s, color 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.background = BG_HOVER; e.currentTarget.style.color = TEXT_PRIMARY; }}
                onMouseLeave={e => { e.currentTarget.style.background = parentActive ? BG_HOVER : 'transparent'; e.currentTarget.style.color = parentActive ? TEXT_PRIMARY : TEXT_SECONDARY; }}
              >
                {collapsed ? (
                  <span style={{ color: parentActive ? ACCENT : TEXT_SECONDARY, display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                ) : (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ color: parentActive ? ACCENT : TEXT_SECONDARY, display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                      <span style={{ whiteSpace: 'nowrap' }}>{item.label}</span>
                      {item.wip && (
                        <span style={{ fontSize: 10, padding: '1px 5px', background: '#FDF6EC', color: '#E6A23C', border: '1px solid #FAECD8', borderRadius: 2, lineHeight: '14px' }}>建置中</span>
                      )}
                    </div>
                    {item.children && <span style={{ color: TEXT_SECONDARY }}><ChevronIcon open={isOpen} /></span>}
                  </>
                )}
              </div>

              {/* L2 + L3 */}
              {!collapsed && item.children && (
                <div style={{ overflow: 'hidden', maxHeight: isOpen ? calcL1MaxHeight(item.children) : '0', transition: 'max-height 0.22s cubic-bezier(.4,0,.2,1)' }}>
                  {item.children.map((child) => {
                    if (child.children) {
                      // L2 with L3
                      const childIsOpen = expanded[child.id];
                      const anyL3Active = child.children.some(gc => activeSidebarChild === gc.id);
                      return (
                        <div key={child.id}>
                          <div
                            onClick={() => toggleGroup(child.id)}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px 0 42px', height: 44, cursor: 'pointer', background: anyL3Active ? ACCENT_BG : 'transparent', color: anyL3Active ? ACCENT : TEXT_SECONDARY, fontSize: 13, fontWeight: anyL3Active ? 500 : 400, borderLeft: `2px solid ${anyL3Active ? ACCENT : 'transparent'}`, transition: 'background 0.15s', userSelect: 'none' }}
                            onMouseEnter={e => { if (!anyL3Active) { e.currentTarget.style.background = BG_HOVER; e.currentTarget.style.color = TEXT_PRIMARY; }}}
                            onMouseLeave={e => { if (!anyL3Active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = TEXT_SECONDARY; }}}
                          >
                            <span style={{ whiteSpace: 'nowrap' }}>{child.label}</span>
                            <ChevronIcon open={childIsOpen} size={11} />
                          </div>
                          <div style={{ overflow: 'hidden', maxHeight: childIsOpen ? child.children.length * 40 + 'px' : '0', transition: 'max-height 0.2s' }}>
                            {child.children.map(gc => {
                              const gcActive = activeSidebarChild === gc.id;
                              return (
                                <div key={gc.id} onClick={() => onNavigate(gc.id)}
                                  style={{ display: 'flex', alignItems: 'center', padding: '0 16px 0 58px', height: 40, cursor: 'pointer', background: gcActive ? ACCENT_BG : 'transparent', color: gcActive ? ACCENT : TEXT_SECONDARY, fontSize: 12.5, fontWeight: gcActive ? 500 : 400, borderLeft: `2px solid ${gcActive ? ACCENT : 'transparent'}`, transition: 'background 0.15s', userSelect: 'none' }}
                                  onMouseEnter={e => { if (!gcActive) { e.currentTarget.style.background = BG_HOVER; e.currentTarget.style.color = TEXT_PRIMARY; }}}
                                  onMouseLeave={e => { if (!gcActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = TEXT_SECONDARY; }}}
                                >
                                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{gc.label}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }
                    // Normal L2
                    const active = activeSidebarChild === child.id;
                    return (
                      <React.Fragment key={child.id}>
                        {child.dividerBefore && (
                          <div style={{ height: 1, background: BORDER, margin: '4px 16px 4px 42px' }} />
                        )}
                        <div
                          onClick={() => !child.locked && onNavigate(child.id)}
                          title={child.locked ? '進階電商包專屬功能' : undefined}
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px 0 42px', height: 44, cursor: child.locked ? 'default' : 'pointer', background: active ? ACCENT_BG : 'transparent', color: active ? ACCENT : child.locked ? '#C0C4CC' : TEXT_SECONDARY, fontSize: 13, fontWeight: active ? 500 : 400, borderLeft: `2px solid ${active ? ACCENT : 'transparent'}`, transition: 'background 0.15s', userSelect: 'none' }}
                          onMouseEnter={e => { if (!child.locked && !active) { e.currentTarget.style.background = BG_HOVER; e.currentTarget.style.color = TEXT_PRIMARY; }}}
                          onMouseLeave={e => { if (!child.locked && !active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = TEXT_SECONDARY; }}}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: 6, overflow: 'hidden' }}>
                            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{child.label}</span>
                            {child.wip && !child.locked && (
                              <span style={{ fontSize: 10, padding: '1px 5px', background: '#FDF6EC', color: '#E6A23C', border: '1px solid #FAECD8', borderRadius: 2, flexShrink: 0, lineHeight: '14px' }}>建置中</span>
                            )}
                          </span>
                          {child.locked && <LockIcon />}
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { Sidebar, NAV_GROUP_MAP });
