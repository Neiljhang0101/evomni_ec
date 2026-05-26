// ─── Nav mapping ──────────────────────────────────────────────────────────────
Object.assign(NAV_GROUP_MAP, {
  'data-center': 'analytics',
});

// ─── Design tokens ────────────────────────────────────────────────────────────
const ANA_C = {
  blue:'#409EFF', green:'#67C23A', red:'#F56C6C', orange:'#E6A23C',
  grey:'#909399', dark:'#303133', mid:'#606266', light:'#C0C4CC',
  border:'#DCDFE6', bg:'#F5F7FA', white:'#fff',
  blueBg:'#ecf5ff', greenBg:'#f0f9eb', redBg:'#fef0f0', orangeBg:'#fdf6ec',
};


// ─── Mock data ────────────────────────────────────────────────────────────────
const SALES_KPI = [
  { key:'gmv',  label:'總銷售金額', value:'NT$ 284,760', delta:'+12.4%', up:true, tooltip:'已完成訂單的產品金額總和（不含取消/退款訂單）' },
  { key:'orders',label:'訂單筆數',  value:'312 筆',      delta:'+8.1%',  up:true, tooltip:'完成付款且未取消的訂單數' },
  { key:'aov',  label:'平均客單價', value:'NT$ 912',     delta:'-2.3%',  up:false,tooltip:'每筆訂單的平均金額。提高客單價可讓相同流量產生更多收入' },
  { key:'rate', label:'訂單完成率', value:'82.5%',         delta:'+1.2%',  up:true, tooltip:'從建立訂單到完成付款的比率。過低（低於 60%）可能代表結帳流程有問題或金流不穩定' },
];

const SALES_TREND = [
  {d:'5/1',v:6800},{d:'5/2',v:8200},{d:'5/3',v:7500},{d:'5/4',v:9100},
  {d:'5/5',v:11000},{d:'5/6',v:9500},{d:'5/7',v:8800},{d:'5/8',v:10200},
  {d:'5/9',v:11800},{d:'5/10',v:13400},{d:'5/11',v:12100},{d:'5/12',v:14500},
  {d:'5/13',v:13800},{d:'5/14',v:9200},
];
const COMPARE_TREND = [
  {d:'5/1',v:5500},{d:'5/2',v:7100},{d:'5/3',v:6500},{d:'5/4',v:8000},
  {d:'5/5',v:9500},{d:'5/6',v:8200},{d:'5/7',v:7800},{d:'5/8',v:9000},
  {d:'5/9',v:10000},{d:'5/10',v:11800},{d:'5/11',v:10800},{d:'5/12',v:12800},
  {d:'5/13',v:12200},{d:'5/14',v:8000},
];
const ORDERS_TREND = [
  {d:'5/1',v:8},{d:'5/2',v:10},{d:'5/3',v:9},{d:'5/4',v:11},
  {d:'5/5',v:13},{d:'5/6',v:11},{d:'5/7',v:10},{d:'5/8',v:12},
  {d:'5/9',v:14},{d:'5/10',v:16},{d:'5/11',v:14},{d:'5/12',v:17},
  {d:'5/13',v:16},{d:'5/14',v:11},
];
const ORDERS_COMPARE_TREND = [
  {d:'5/1',v:6},{d:'5/2',v:8},{d:'5/3',v:7},{d:'5/4',v:9},
  {d:'5/5',v:11},{d:'5/6',v:9},{d:'5/7',v:9},{d:'5/8',v:10},
  {d:'5/9',v:12},{d:'5/10',v:14},{d:'5/11',v:12},{d:'5/12',v:14},
  {d:'5/13',v:13},{d:'5/14',v:9},
];

const PAYMENT_PIE = [
  {label:'信用卡',pct:48,color:'#409EFF'},
  {label:'LINE Pay',pct:22,color:'#67C23A'},
  {label:'街口支付',pct:15,color:'#E6A23C'},
  {label:'ATM 轉帳',pct:10,color:'#9B59B6'},
  {label:'其他',pct:5,color:'#C0C4CC'},
];

const TOP20 = [
  {rank:1, name:'經典棉質T恤 — 白',    qty:342, amountV:171000, margin:'38.2%', stock:128},
  {rank:2, name:'運動短褲 — 黑/M',     qty:287, amountV:229600, margin:'41.5%', stock:45},
  {rank:3, name:'針織毛衣 — 米白',     qty:214, amountV:342400, margin:'52.1%', stock:8},
  {rank:4, name:'牛仔褲 — 深藍/L',     qty:198, amountV:356400, margin:'44.8%', stock:62},
  {rank:5, name:'休閒帆布鞋 — 白',     qty:176, amountV:440000, margin:'35.6%', stock:33},
  {rank:6, name:'棉麻寬褲 — 卡其',     qty:154, amountV:185880, margin:'39.4%', stock:71},
  {rank:7, name:'連帽衛衣 — 灰',       qty:132, amountV:330000, margin:'43.2%', stock:19},
  {rank:8, name:'短袖POLO衫 — 藍',     qty:118, amountV:165200, margin:'37.1%', stock:88},
  {rank:9, name:'格紋長袖襯衫 — 藍白', qty:104, amountV:187200, margin:'40.5%', stock:56},
  {rank:10,name:'寬肩西裝外套 — 黑',   qty:96,  amountV:336000, margin:'48.2%', stock:24},
  {rank:11,name:'純棉圓領T恤 — 黑',    qty:88,  amountV:88000,  margin:'36.4%', stock:142},
  {rank:12,name:'高腰直筒牛仔褲 — 淺藍',qty:82, amountV:172200, margin:'43.1%', stock:37},
  {rank:13,name:'防風立領外套 — 橄欖綠',qty:75, amountV:262500, margin:'46.7%', stock:12},
  {rank:14,name:'絲質抽繩短褲 — 米',   qty:68,  amountV:95200,  margin:'41.2%', stock:60},
  {rank:15,name:'條紋長袖上衣 — 白/藍',qty:61,  amountV:97600,  margin:'38.9%', stock:84},
  {rank:16,name:'厚底休閒鞋 — 米白',   qty:55,  amountV:192500, margin:'34.8%', stock:28},
  {rank:17,name:'針織短袖上衣 — 粉',   qty:49,  amountV:78400,  margin:'39.6%', stock:95},
  {rank:18,name:'工裝五口袋長褲 — 卡其',qty:43, amountV:120400, margin:'42.3%', stock:17},
  {rank:19,name:'棉質連身洋裝 — 白',   qty:38,  amountV:152000, margin:'50.1%', stock:6},
  {rank:20,name:'輕量羽絨背心 — 深藍', qty:32,  amountV:128000, margin:'44.5%', stock:41},
];

const SLOW_ITEMS = [
  {name:'絲絨晚宴包 — 酒紅', stock:240, sold:2,  lastOrder:'2026-03-12'},
  {name:'羊毛格紋外套 — 棕', stock:85,  sold:3,  lastOrder:'2026-04-02'},
  {name:'蕾絲上衣 — 白',     stock:120, sold:0,  lastOrder:'—'},
  {name:'皮革腰帶 — 黑',     stock:60,  sold:5,  lastOrder:'2026-04-18'},
];

const CATEGORY_PIE = [
  {label:'上衣',pct:38,color:'#409EFF'},
  {label:'褲裝',pct:27,color:'#67C23A'},
  {label:'外套',pct:18,color:'#E6A23C'},
  {label:'配件',pct:11,color:'#9B59B6'},
  {label:'鞋類',pct:6,color:'#F56C6C'},
];

const MEMBER_TREND = [
  {d:'5/1',new:42,ret:28},{d:'5/2',new:55,ret:31},{d:'5/3',new:38,ret:35},
  {d:'5/4',new:61,ret:42},{d:'5/5',new:74,ret:48},{d:'5/6',new:68,ret:52},
  {d:'5/7',new:59,ret:44},{d:'5/8',new:82,ret:61},{d:'5/9',new:90,ret:68},
  {d:'5/10',new:78,ret:72},{d:'5/11',new:95,ret:80},{d:'5/12',new:108,ret:88},
  {d:'5/13',new:92,ret:76},{d:'5/14',new:67,ret:58},
];

const MEMBER_LEVEL_PIE = [
  {label:'一般會員',pct:52,color:'#C0C4CC'},
  {label:'銀卡',    pct:26,color:'#909399'},
  {label:'金卡',    pct:15,color:'#E6A23C'},
  {label:'黑卡',    pct:7, color:'#303133'},
];

const RFM_GROUPS = [
  { label:'忠實顧客',  color:'#E6A23C', bg:'#fdf6ec', border:'#f5dab1',
    count:248, ltv:'NT$ 12,840', days:8,
    suggestion:'發送感謝禮或 VIP 專屬優惠，邀請他們留下評價' },
  { label:'高潛力顧客', color:'#409EFF', bg:'#ecf5ff', border:'#b3d8ff',
    count:412, ltv:'NT$ 4,320', days:22,
    suggestion:'推薦高單價產品，發送會員升等提醒' },
  { label:'需喚醒顧客', color:'#E6A23C', bg:'#fdf6ec', border:'#f5dab1',
    count:335, ltv:'NT$ 2,860', days:68,
    suggestion:'發送「好久不見」優惠券，透過自動化旅程觸發' },
  { label:'高風險流失', color:'#F56C6C', bg:'#fef0f0', border:'#fbc4c4',
    count:189, ltv:'NT$ 1,940', days:120,
    suggestion:'立即發送個人化優惠，避免永久流失' },
  { label:'已流失顧客', color:'#909399', bg:'#f4f4f5', border:'#d3d4d6',
    count:521, ltv:'NT$ 980',   days:280,
    suggestion:'最後一搏優惠；若無回應，接受流失' },
];

const FUNNEL_STAGES = [
  {label:'產品頁瀏覽',   count:8420, pct:100},
  {label:'加入購物車',   count:3368, pct:40.0},
  {label:'進入結帳',     count:2021, pct:24.0},
  {label:'填寫訂單資訊', count:1515, pct:18.0},
  {label:'完成付款',     count:1236, pct:14.7},
];

const PROMO_ROWS = [
  {name:'夏日折扣碼 SUMMER20', type:'折扣碼', period:'6/1–8/31', used:42, rate:'42%', amount:'NT$ 86,100', discount:'NT$ 17,220', roi:5.0, tag:'best'},
  {name:'新會員歡迎券',        type:'自動發放',period:'全年',     used:128,rate:'—',  amount:'NT$ 213,400',discount:'NT$ 19,200', roi:11.1,tag:'best'},
  {name:'閃購折扣 FLASH100',   type:'折扣碼', period:'7/1–7/7',  used:0,  rate:'0%',  amount:'NT$ 0',      discount:'NT$ 0',      roi:0,   tag:''},
  {name:'週末免運優惠',        type:'折扣碼', period:'8/1–8/31', used:0,  rate:'0%',  amount:'NT$ 0',      discount:'NT$ 0',      roi:0,   tag:'low'},
];

const JOURNEY_ROWS = [
  {name:'購物車未結帳提醒', trigger:842, open:'—', click:'—', orders:168, rate:'20.0%', amount:'NT$ 386,904'},
  {name:'首購後感謝信',     trigger:412, open:'68%',click:'22%',orders:89, rate:'21.6%', amount:'NT$ 204,700'},
  {name:'生日優惠旅程',     trigger:127, open:'72%',click:'38%',orders:31, rate:'24.4%', amount:'NT$ 71,300'},
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Skel({ w='100%', h=16, style={} }) {
  return <div style={{ width: w, height: h, background: '#EBEEF5', borderRadius: 2, animation: 'evo-shimmer 1.4s ease infinite', ...style }} />;
}

const EMPTY_ICONS = {
  sales: (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <rect x="4" y="4" width="48" height="48" rx="2" stroke="#DCDFE6" strokeWidth="1.5" strokeDasharray="5 3"/>
      <path d="M12 40L22 26l7 7 8-11 9 14" stroke="#C0C4CC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  products: (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <path d="M10 20l18-8 18 8v18l-18 8-18-8V20z" stroke="#DCDFE6" strokeWidth="1.5" strokeDasharray="5 3" strokeLinejoin="round"/>
      <path d="M28 12v26M10 20l18 8 18-8" stroke="#C0C4CC" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  members: (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="20" r="10" stroke="#DCDFE6" strokeWidth="1.5" strokeDasharray="5 3"/>
      <path d="M8 50c0-11 8.9-20 20-20s20 8.9 20 20" stroke="#DCDFE6" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="5 3"/>
    </svg>
  ),
  marketing: (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <path d="M14 22h8l20-10v32L22 34h-8V22z" stroke="#DCDFE6" strokeWidth="1.5" strokeLinejoin="round" strokeDasharray="5 3"/>
      <path d="M22 34l4 12M8 28h6" stroke="#C0C4CC" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

function AnaEmptyState({ icon = 'sales', title, subtitle, compact = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: compact ? '28px 16px' : '56px 24px', textAlign: 'center' }}>
      <div style={{ marginBottom: 14, opacity: 0.6 }}>{EMPTY_ICONS[icon] || EMPTY_ICONS.sales}</div>
      <div style={{ fontSize: compact ? 13 : 15, fontWeight: 700, color: ANA_C.mid, marginBottom: 6 }}>{title}</div>
      {subtitle && <div style={{ fontSize: 12, color: ANA_C.light, lineHeight: 1.8, maxWidth: 320 }}>{subtitle}</div>}
    </div>
  );
}

function ANA_Tooltip({ text, children }) {
  const [show, setShow] = React.useState(false);
  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div style={{ position: 'absolute', bottom: '120%', left: '50%', transform: 'translateX(-50%)',
          background: '#303133', color: '#fff', fontSize: 12, padding: '6px 10px', whiteSpace: 'pre-wrap',
          maxWidth: 280, lineHeight: 1.6, zIndex: 999, boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          pointerEvents: 'none', textAlign: 'left' }}>
          {text}
          <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
            border: '4px solid transparent', borderTopColor: '#303133' }} />
        </div>
      )}
    </span>
  );
}

function InfoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ cursor: 'help', flexShrink: 0 }}>
      <circle cx="7" cy="7" r="6" stroke="#C0C4CC" strokeWidth="1.3"/>
      <line x1="7" y1="6.5" x2="7" y2="10" stroke="#C0C4CC" strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="7" cy="4.5" r="0.6" fill="#C0C4CC"/>
    </svg>
  );
}

function DeltaBadge({ delta, up }) {
  if (!delta) return null;
  const color = up ? ANA_C.green : ANA_C.red;
  const arrow = up ? '↑' : '↓';
  return (
    <span style={{ fontSize: 12, color, display: 'inline-flex', alignItems: 'center', gap: 2, fontWeight: 500 }}>
      {arrow} {delta} 較上期
    </span>
  );
}

function AnaSectionTitle({ children, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: ANA_C.dark }}>{children}</div>
      {right && <div>{right}</div>}
    </div>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: ANA_C.white,
      borderRadius: 3,
      padding: 20,
      boxShadow: '0 2px 12px 0 rgba(0,0,0,0.08)',
      ...style,
    }}>
      {children}
    </div>
  );
}


// ─── SVG Charts ───────────────────────────────────────────────────────────────
function LineChart({ data, compareData, unit = 'amount', width = 700, height = 200, color = ANA_C.blue }) {
  const W = width, H = height, PAD = { t: 10, r: 20, b: 30, l: 60 };
  const vals = data.map(d => d.v);
  const allVals = compareData ? [...vals, ...compareData.map(d => d.v)] : vals;
  const minV = 0, maxV = Math.max(...allVals) * 1.1;
  const px = (i) => PAD.l + (i / (data.length - 1)) * (W - PAD.l - PAD.r);
  const py = (v) => H - PAD.b - ((v - minV) / (maxV - minV)) * (H - PAD.t - PAD.b);
  const pts = data.map((d, i) => `${px(i)},${py(d.v)}`).join(' ');
  const cpts = compareData ? compareData.map((d, i) => `${px(i)},${py(d.v)}`).join(' ') : '';
  const areaPath = `M ${px(0)},${py(data[0].v)} ${data.map((d,i)=>`L ${px(i)},${py(d.v)}`).join(' ')} L ${px(data.length-1)},${H-PAD.b} L ${px(0)},${H-PAD.b} Z`;

  const maxI = vals.indexOf(Math.max(...vals));
  const [hov, setHov] = React.useState(null);

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(r => Math.round(minV + r * (maxV - minV)));
  const fmtY = (v) => unit === '筆' ? v : (v >= 1000 ? `${(v/1000).toFixed(0)}K` : v);
  const fmtPeak = (v) => unit === '筆' ? `${v} 筆` : `${(v/1000).toFixed(1)}K`;
  const fmtVal = (v) => unit === '筆' ? `訂單：${v} 筆` : `金額：NT$ ${v.toLocaleString()}`;
  const fmtCmp = (v) => unit === '筆' ? `上期：${v} 筆` : `上期：NT$ ${v.toLocaleString()}`;

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', overflow: 'visible' }}>
      {/* Grid lines */}
      {yTicks.map((v, i) => (
        <line key={i} x1={PAD.l} x2={W - PAD.r} y1={py(v)} y2={py(v)}
          stroke="#EBEEF5" strokeWidth="1" />
      ))}
      {/* Y-axis labels */}
      {yTicks.map((v, i) => (
        <text key={i} x={PAD.l - 6} y={py(v) + 4} textAnchor="end"
          fontSize="7" fill={ANA_C.grey}>{fmtY(v)}</text>
      ))}
      {/* Area */}
      <path d={areaPath} fill={`${color}15`} />
      {/* Compare line */}
      {compareData && <polyline points={cpts} fill="none" stroke={ANA_C.grey} strokeWidth="1.5" strokeDasharray="4 3" />}
      {/* Main line */}
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" />
      {/* Peak annotation */}
      <circle cx={px(maxI)} cy={py(data[maxI].v)} r="4" fill={color} />
      <text x={px(maxI)} y={py(data[maxI].v) - 10} textAnchor="middle" fontSize="7" fill={color} fontWeight="700">
        最高：{fmtPeak(data[maxI].v)}（{data[maxI].d}）
      </text>
      {/* X-axis labels */}
      {data.map((d, i) => i % 2 === 0 && (
        <text key={i} x={px(i)} y={H - PAD.b + 12} textAnchor="middle" fontSize="7" fill={ANA_C.grey}>{d.d}</text>
      ))}
      {/* Hover zones */}
      {data.map((d, i) => (
        <rect key={i} x={px(i) - 15} y={0} width={30} height={H - PAD.b}
          fill="transparent" style={{ cursor: 'crosshair' }}
          onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} />
      ))}
      {/* Hover indicator */}
      {hov !== null && (() => {
        const dayPct = hov > 0 ? ((data[hov].v - data[hov-1].v) / data[hov-1].v * 100) : null;
        const dayUp = dayPct !== null && dayPct >= 0;
        return (
          <>
            <line x1={px(hov)} x2={px(hov)} y1={PAD.t} y2={H - PAD.b}
              stroke={ANA_C.light} strokeWidth="1" strokeDasharray="3 2" />
            <circle cx={px(hov)} cy={py(data[hov].v)} r="5" fill={color} stroke="#fff" strokeWidth="2" />
            <foreignObject x={Math.min(px(hov) - 70, W - 180)} y={py(data[hov].v) - 56} width="180" height="52">
              <div xmlns="http://www.w3.org/1999/xhtml" style={{
                background: ANA_C.dark, color: '#fff', fontSize: 8, padding: '4px 8px',
                lineHeight: 1.7, whiteSpace: 'nowrap' }}>
                {data[hov].d}｜{fmtVal(data[hov].v)}<br/>
                {dayPct !== null && <span style={{ color: dayUp ? '#67C23A' : '#F56C6C' }}>較前日 {dayUp ? '↑' : '↓'} {Math.abs(dayPct).toFixed(1)}%</span>}
                {compareData && <><br/>{fmtCmp(compareData[hov].v)}</>}
              </div>
            </foreignObject>
          </>
        );
      })()}
    </svg>
  );
}

function DualLineChart({ data, width = 700, height = 180 }) {
  const W = width, H = height, PAD = { t: 10, r: 20, b: 30, l: 50 };
  const newVals = data.map(d => d.new), retVals = data.map(d => d.ret);
  const maxV = Math.max(...newVals, ...retVals) * 1.15;
  const px = (i) => PAD.l + (i / (data.length - 1)) * (W - PAD.l - PAD.r);
  const py = (v) => H - PAD.b - (v / maxV) * (H - PAD.t - PAD.b);
  const newPts = data.map((d, i) => `${px(i)},${py(d.new)}`).join(' ');
  const retPts = data.map((d, i) => `${px(i)},${py(d.ret)}`).join(' ');
  const [hov, setHov] = React.useState(null);

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', overflow: 'visible' }}>
      {[0, 0.5, 1].map((r, i) => {
        const v = Math.round(r * maxV);
        return <line key={i} x1={PAD.l} x2={W - PAD.r} y1={py(v)} y2={py(v)} stroke="#EBEEF5" strokeWidth="1" />;
      })}
      {[0, 0.5, 1].map((r, i) => {
        const v = Math.round(r * maxV);
        return <text key={i} x={PAD.l - 5} y={py(v) + 4} textAnchor="end" fontSize="7" fill={ANA_C.grey}>{v}</text>;
      })}
      <polyline points={newPts} fill="none" stroke={ANA_C.blue} strokeWidth="2" />
      <polyline points={retPts} fill="none" stroke={ANA_C.orange} strokeWidth="2" />
      {data.map((d, i) => i % 2 === 0 && (
        <text key={i} x={px(i)} y={H - PAD.b + 12} textAnchor="middle" fontSize="7" fill={ANA_C.grey}>{d.d}</text>
      ))}
      {data.map((d, i) => (
        <rect key={i} x={px(i) - 15} y={0} width={30} height={H - PAD.b}
          fill="transparent" style={{ cursor: 'crosshair' }}
          onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} />
      ))}
      {hov !== null && (
        <>
          <line x1={px(hov)} x2={px(hov)} y1={PAD.t} y2={H - PAD.b} stroke={ANA_C.light} strokeWidth="1" strokeDasharray="3 2" />
          <circle cx={px(hov)} cy={py(data[hov].new)} r="4" fill={ANA_C.blue} stroke="#fff" strokeWidth="2" />
          <circle cx={px(hov)} cy={py(data[hov].ret)} r="4" fill={ANA_C.orange} stroke="#fff" strokeWidth="2" />
          <foreignObject x={Math.min(px(hov) - 70, W - 200)} y={10} width="200" height="30">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{
              background: ANA_C.dark, color: '#fff', fontSize: 8, padding: '4px 8px', lineHeight: 1.7 }}>
              {data[hov].d}｜新客：{data[hov].new} 人｜回購客：{data[hov].ret} 人
            </div>
          </foreignObject>
        </>
      )}
    </svg>
  );
}

function PieChart({ data, size = 180 }) {
  const cx = size / 2, cy = size / 2, r = size / 2 - 16;
  let angle = -90;
  const slices = data.map(d => {
    const a1 = angle, a2 = angle + d.pct * 3.6;
    angle = a2;
    const rad1 = (a1 * Math.PI) / 180, rad2 = (a2 * Math.PI) / 180;
    const x1 = cx + r * Math.cos(rad1), y1 = cy + r * Math.sin(rad1);
    const x2 = cx + r * Math.cos(rad2), y2 = cy + r * Math.sin(rad2);
    const large = d.pct > 50 ? 1 : 0;
    return { ...d, path: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z` };
  });
  const [hov, setHov] = React.useState(null);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink: 0 }}>
        {slices.map((s, i) => (
          <path key={i} d={s.path} fill={s.color}
            stroke="#fff" strokeWidth={hov === i ? 2 : 1}
            transform={hov === i ? `translate(${Math.cos((angle - s.pct * 3.6 / 2 - 90) * Math.PI / 180) * 4}, ${Math.sin((angle - s.pct * 3.6 / 2 - 90) * Math.PI / 180) * 4})` : ''}
            style={{ cursor: 'pointer', transition: 'transform 0.15s' }}
            onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} />
        ))}
      </svg>
      <div style={{ fontSize: 12, lineHeight: 2 }}>
        {data.map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6,
            fontWeight: hov === i ? 700 : 400, color: hov === i ? ANA_C.dark : ANA_C.mid }}>
            <div style={{ width: 10, height: 10, background: d.color, flexShrink: 0 }} />
            {d.label} {d.pct}%
          </div>
        ))}
      </div>
    </div>
  );
}

function Heatmap({ blurred, onUpgrade }) {
  const days = ['一','二','三','四','五','六','日'];
  const hours = Array.from({length:24}, (_,i) => i);
  const mockData = {};
  days.forEach(d => hours.forEach(h => {
    const peak = (d==='六'||d==='日') ? [13,14,15,20,21] : [12,13,19,20,21];
    mockData[`${d}-${h}`] = peak.includes(h) ? Math.random()*60+40 : Math.random()*20;
  }));
  const maxV = 100;

  return (
    <div style={{ filter: blurred ? 'blur(3px)' : 'none', pointerEvents: blurred ? 'none' : 'auto' }}>
      <div style={{ overflowX: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: `40px repeat(24, 28px)`, gap: 2, minWidth: 720 }}>
          <div />
          {hours.map(h => (
            <div key={h} style={{ fontSize: 10, color: ANA_C.grey, textAlign: 'center', paddingBottom: 4 }}>
              {h}
            </div>
          ))}
          {days.map(d => (
            <React.Fragment key={d}>
              <div style={{ fontSize: 12, color: ANA_C.mid, display: 'flex', alignItems: 'center' }}>週{d}</div>
              {hours.map(h => {
                const v = mockData[`${d}-${h}`] || 0;
                const intensity = v / maxV;
                return (
                  <ANA_Tooltip key={h} text={`週${d} ${h}:00–${h}:59｜訂單：${Math.round(v/3)} 筆`}>
                    <div style={{
                      width: 28, height: 22,
                      background: `rgba(64,158,255,${0.08 + intensity * 0.92})`,
                      border: `1px solid rgba(64,158,255,${0.1 + intensity * 0.3})`,
                    }} />
                  </ANA_Tooltip>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
      {!blurred && (
        <div style={{ marginTop: 12, fontSize: 13, color: ANA_C.mid, background: ANA_C.bg, padding: '10px 14px', border: `1px solid ${ANA_C.border}` }}>
          建議：您的訂單最集中在 <strong>週六 20:00–21:00</strong>，在此時段發送行銷推播效果最佳。
        </div>
      )}
    </div>
  );
}

function FunnelChart({ stages }) {
  const biggest = stages.reduce((acc, s, i) => {
    if (i === 0) return acc;
    const drop = stages[i-1].count - s.count;
    return drop > acc.drop ? { i, drop } : acc;
  }, { i: -1, drop: 0 });

  // 用像素寬度，不用百分比（百分比需要父容器有明確寬度才能正確解析）
  const MAX_W = 500; // 最寬的階段（第一層）像素寬
  const MIN_W = 220; // 最窄的階段（最後一層）像素寬

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, padding: '8px 0', position: 'relative' }}>
      {/* 中軸線 */}
      <div style={{
        position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1,
        background: 'linear-gradient(to bottom, rgba(64,158,255,0.4), rgba(64,158,255,0.04))',
        transform: 'translateX(-50%)', zIndex: 0, pointerEvents: 'none',
      }} />

      {stages.map((s, i) => {
        const n = Math.max(stages.length - 1, 1);
        const stageW = Math.round(MAX_W - (i / n) * (MAX_W - MIN_W));
        const isLast = i === stages.length - 1;
        const isBiggestDrop = i === biggest.i;
        const dropPct = i > 0
          ? ((stages[i-1].count - s.count) / stages[i-1].count * 100).toFixed(0)
          : null;

        const accentColor = isLast ? ANA_C.green : (isBiggestDrop ? ANA_C.red : ANA_C.blue);
        const stageBg     = isLast ? ANA_C.greenBg : (isBiggestDrop ? ANA_C.redBg : ANA_C.white);
        const stageBorder = isLast
          ? 'rgba(103,194,58,0.35)'
          : (isBiggestDrop ? 'rgba(245,108,108,0.35)' : 'rgba(0,0,0,0.08)');
        const subLabel = i === 0 ? '漏斗頂端' : isLast ? '最終轉換' : `整體 ${s.pct}%`;

        return (
          <React.Fragment key={i}>
            {i > 0 && (
              <div style={{
                fontSize: 11, padding: '4px 0', position: 'relative', zIndex: 1,
                whiteSpace: 'nowrap', textAlign: 'center',
                color: isBiggestDrop ? ANA_C.red : ANA_C.grey,
                fontWeight: isBiggestDrop ? 700 : 400,
              }}>
                ↓ 流失 {dropPct}%（{(stages[i-1].count - s.count).toLocaleString()} 人離開）
              </div>
            )}
            <ANA_Tooltip text={`${s.label}｜${s.count.toLocaleString()} 人（${s.pct}%）`}>
              <div style={{
                width: stageW,
                background: stageBg,
                border: `1px solid ${stageBorder}`,
                borderRadius: 3,
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8,
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.08)',
                position: 'relative', zIndex: 1,
                cursor: 'default',
              }}>
                {/* 左側：圓形標號 + 文字 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden' }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                    background: `${accentColor}18`,
                    border: `1px solid ${accentColor}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: accentColor }}>{i + 1}</span>
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: accentColor, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.label}</div>
                    <div style={{ fontSize: 10, color: ANA_C.grey, marginTop: 1, whiteSpace: 'nowrap' }}>{subLabel}</div>
                  </div>
                </div>
                {/* 右側：人數 */}
                <div style={{ fontSize: 16, fontWeight: 700, color: accentColor, flexShrink: 0, whiteSpace: 'nowrap' }}>
                  {s.count.toLocaleString()}
                </div>
              </div>
            </ANA_Tooltip>
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── Sub-screens ──────────────────────────────────────────────────────────────
function SalesOverview({ showCompare, isPro, onUpgrade, onOpenAdDrawer, isEmpty }) {
  const [chartMode, setChartMode] = React.useState('amount');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {SALES_KPI.map(kpi => (
          <Card key={kpi.key}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, color: ANA_C.mid, fontSize: 13 }}>
              {kpi.label}
              <ANA_Tooltip text={kpi.tooltip}><InfoIcon /></ANA_Tooltip>
            </div>
            {isEmpty ? (
              <>
                <div style={{ fontSize: 24, fontWeight: 700, color: ANA_C.light, marginBottom: 6 }}>—</div>
                <span style={{ fontSize: 12, color: ANA_C.light }}>所選期間無資料</span>
              </>
            ) : (
              <>
                <div style={{ fontSize: 24, fontWeight: 700, color: ANA_C.dark, marginBottom: 6 }}>{kpi.value}</div>
                <DeltaBadge delta={kpi.delta} up={kpi.up} />
              </>
            )}
          </Card>
        ))}
      </div>

      {/* Line Chart */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: isEmpty ? 0 : 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: ANA_C.dark }}>銷售趨勢</div>
          {!isEmpty && (
            <div style={{ display: 'flex', gap: 4 }}>
              {['amount','orders'].map(m => (
                <button key={m} onClick={() => setChartMode(m)} style={{
                  height: 36, padding: '0 12px', fontSize: 12, border: `1px solid ${chartMode === m ? ANA_C.blue : ANA_C.border}`,
                  background: chartMode === m ? ANA_C.blueBg : ANA_C.white, color: chartMode === m ? ANA_C.blue : ANA_C.mid,
                  cursor: 'pointer', borderRadius: 0 }}>
                  {m === 'amount' ? '銷售金額' : '訂單筆數'}
                </button>
              ))}
            </div>
          )}
        </div>
        {isEmpty ? (
          <AnaEmptyState icon="sales" title="所選期間沒有銷售資料"
            subtitle="請選擇其他時間範圍，或確認商店是否已開始接受訂單。" />
        ) : (
          <>
            <LineChart
              data={chartMode === 'orders' ? ORDERS_TREND : SALES_TREND}
              compareData={chartMode === 'orders' ? (showCompare ? ORDERS_COMPARE_TREND : null) : (showCompare ? COMPARE_TREND : null)}
              unit={chartMode === 'orders' ? '筆' : 'amount'} />
            {showCompare && (
              <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: 12, color: ANA_C.grey }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 20, height: 2, background: ANA_C.blue, display: 'inline-block' }} /> 本期
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 20, height: 1, background: ANA_C.grey, display: 'inline-block', borderTop: '1px dashed' }} /> 上期
                </span>
              </div>
            )}
            {showCompare && (
              <div style={{ fontSize: 12, color: '#909399', marginTop: 4 }}>
                比較期間：2026/04/27 – 2026/05/11（上一個相同天數區間）
              </div>
            )}
          </>
        )}
      </Card>

      {/* Pie + Heatmap row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card>
          <AnaSectionTitle>付款方式分佈</AnaSectionTitle>
          {isEmpty
            ? <AnaEmptyState icon="sales" title="尚無付款紀錄" compact />
            : <PieChart data={PAYMENT_PIE} />}
        </Card>
        <Card style={{ position: 'relative', minHeight: 240 }}>
          <AnaSectionTitle>時段熱力圖</AnaSectionTitle>
          <div style={{ fontSize: 12, color: ANA_C.grey, marginBottom: 10, lineHeight: 1.6 }}>
            顏色越深代表該時段訂單量越高。用來決定推播通知與廣告投放的最佳時機，例如：若週五晚上 8–10 點最深，推播應在該時段前發出。
          </div>
          {!isPro && <UpgradeLockBanner featureName="時段訂單熱力圖" valueProp="找出下單最集中的時段，決定推播與廣告投放的最佳時機" onLearnMore={onUpgrade} />}
          <Heatmap blurred={!isPro} onUpgrade={onUpgrade} />
        </Card>
      </div>

      {/* Order Source Table */}
      <div style={{ position: 'relative' }}>
        <Card style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Header row always accessible — outside blur/overlay */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 8, position: 'relative', zIndex: 12 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: ANA_C.dark }}>訂單來源分析</div>
            <EvoBtn variant="secondary" size="sm" onClick={onOpenAdDrawer}>設定廣告花費</EvoBtn>
          </div>
          {!isPro && <UpgradeLockBanner featureName="進階促銷活動成效分析" valueProp="深度拆解每場活動的 ROI，精準優化下次促銷" onLearnMore={onUpgrade} />}
          <div style={{ filter: !isPro ? 'blur(3px)' : 'none', pointerEvents: !isPro ? 'none' : 'auto' }}>
            {isEmpty ? (
              <AnaEmptyState icon="sales" title="所選期間無訂單來源資料"
                subtitle="有訂單產生後，各渠道的流量與轉換數據將顯示於此。" compact />
            ) : (
              <>
                <div style={{ fontSize: 12, color: ANA_C.mid, marginBottom: 12 }}>
                  填入廣告花費後，系統將自動計算各渠道的廣告 ROI（ROAS）
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${ANA_C.border}` }}>
                      {['來源','媒介','訂單數↓','銷售金額','平均客單價','轉換率','廣告 ROI'].map(h => (
                        <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: ANA_C.grey, fontWeight: 500, fontSize: 12 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {src:'google',med:'cpc',orders:312,amount:'NT$ 718,160',aov:'NT$ 2,302',cvr:'2.4%',roas:'5.2'},
                      {src:'facebook',med:'paid',orders:198,amount:'NT$ 455,400',aov:'NT$ 2,299',cvr:'1.8%',roas:'3.8'},
                      {src:'line',med:'paid',orders:142,amount:'NT$ 327,000',aov:'NT$ 2,302',cvr:'1.5%',roas:'4.1'},
                      {src:'direct',med:'(none)',orders:584,amount:'NT$ 1,347,040',aov:'NT$ 2,307',cvr:'—',roas:'—'},
                    ].map((r, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${ANA_C.border}` }}>
                        <td style={{ padding: '10px 12px' }}>{r.src}</td>
                        <td style={{ padding: '10px 12px', color: ANA_C.mid }}>{r.med}</td>
                        <td style={{ padding: '10px 12px', fontWeight: 500 }}>{r.orders}</td>
                        <td style={{ padding: '10px 12px' }}>{r.amount}</td>
                        <td style={{ padding: '10px 12px' }}>{r.aov}</td>
                        <td style={{ padding: '10px 12px', color: ANA_C.grey }}>
                          {r.cvr === '—' ? <ANA_Tooltip text="轉換率計算需搭配 GA4 資料，目前尚未串接"><span style={{ color: ANA_C.light }}>—</span></ANA_Tooltip> : r.cvr}
                        </td>
                        <td style={{ padding: '10px 12px' }}>{r.roas}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

function ProductAnalysis({ isPro, onUpgrade, isEmpty }) {
  const [sortMode, setSortMode] = React.useState('qty');
  const [catMode, setCatMode] = React.useState('pie');
  const [threshold, setThreshold] = React.useState(5);
  const [selected, setSelected] = React.useState([]);

  const toggle = (name) => setSelected(s => s.includes(name) ? s.filter(x=>x!==name) : [...s, name]);

  const RANK_COLORS = {1:'#FFD700', 2:'#C0C0C0', 3:'#CD7F32'};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Top 20 */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: ANA_C.dark }}>熱賣排行 Top 20</div>
          <div style={{ display: 'flex', gap: 4 }}>
            {['qty','amount'].map(m => (
              <button key={m} onClick={() => setSortMode(m)} style={{
                height: 36, padding: '0 12px', fontSize: 12, border: `1px solid ${sortMode === m ? ANA_C.blue : ANA_C.border}`,
                background: sortMode === m ? ANA_C.blueBg : ANA_C.white, color: sortMode === m ? ANA_C.blue : ANA_C.mid,
                cursor: 'pointer', borderRadius: 0 }}>
                {m === 'qty' ? '依銷售數量排序' : '依銷售金額排序'}
              </button>
            ))}
          </div>
        </div>
        {isEmpty ? (
          <AnaEmptyState icon="products" title="所選期間沒有銷售紀錄"
            subtitle="開始收到訂單後，暢銷產品排行將自動更新顯示於此。" />
        ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${ANA_C.border}` }}>
              {['排名','產品','銷售數量','銷售金額','毛利率','庫存剩餘','操作'].map(h => (
                <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: ANA_C.grey, fontWeight: 500, fontSize: 12 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...TOP20].sort((a, b) => sortMode === 'qty' ? b.qty - a.qty : b.amountV - a.amountV).map((p, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${ANA_C.border}` }}>
                <td style={{ padding: '10px 12px' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%',
                    background: RANK_COLORS[i+1] || ANA_C.bg, border: `1px solid ${RANK_COLORS[i+1] || ANA_C.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, color: i < 3 ? '#fff' : ANA_C.grey }}>
                    {i+1}
                  </div>
                </td>
                <td style={{ padding: '10px 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 40, height: 40, background: ANA_C.bg, border: `1px solid ${ANA_C.border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="14" height="14" rx="1" stroke="#C0C4CC" strokeWidth="1.2"/><circle cx="6.5" cy="6.5" r="1.5" fill="#C0C4CC"/><path d="M2 12l4-3 3 3 2-2 5 4" stroke="#C0C4CC" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span style={{ fontWeight: 500 }}>{p.name}</span>
                  </div>
                </td>
                <td style={{ padding: '10px 12px', fontWeight: 500 }}>{p.qty.toLocaleString()}</td>
                <td style={{ padding: '10px 12px' }}>NT$ {p.amountV.toLocaleString()}</td>
                <td style={{ padding: '10px 12px', color: ANA_C.green }}>{p.margin}</td>
                <td style={{ padding: '10px 12px' }}>
                  {p.stock < 20 ? (
                    <span style={{ color: ANA_C.red, fontWeight: 500 }}>剩 {p.stock} 件</span>
                  ) : (
                    <span style={{ color: ANA_C.mid }}>{p.stock} 件</span>
                  )}
                </td>
                <td style={{ padding: '10px 12px' }}>
                  <EvoBtn variant="ghost" size="sm">查看產品</EvoBtn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </Card>

      {/* Category + Slow row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: ANA_C.dark }}>品類銷售佔比</div>
            {!isEmpty && (
              <div style={{ display: 'flex', gap: 4 }}>
                {['pie','bar'].map(m => (
                  <button key={m} onClick={() => setCatMode(m)} style={{
                    height: 36, padding: '0 10px', fontSize: 12, border: `1px solid ${catMode === m ? ANA_C.blue : ANA_C.border}`,
                    background: catMode === m ? ANA_C.blueBg : ANA_C.white, color: catMode === m ? ANA_C.blue : ANA_C.mid,
                    cursor: 'pointer', borderRadius: 0 }}>
                    {m === 'pie' ? '圓餅圖' : '長條圖'}
                  </button>
                ))}
              </div>
            )}
          </div>
          {isEmpty ? (
            <AnaEmptyState icon="products" title="尚無品類銷售資料" compact />
          ) : catMode === 'pie' ? (
            <PieChart data={CATEGORY_PIE} />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 8 }}>
              {CATEGORY_PIE.map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
                  <div style={{ width: 40, color: ANA_C.mid, flexShrink: 0 }}>{c.label}</div>
                  <div style={{ flex: 1, height: 24, background: ANA_C.bg, position: 'relative' }}>
                    <div style={{ width: `${c.pct}%`, height: '100%', background: c.color }} />
                  </div>
                  <div style={{ width: 36, textAlign: 'right', color: ANA_C.dark, fontWeight: 500 }}>{c.pct}%</div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: ANA_C.dark }}>滯銷產品提醒</div>
            {!isEmpty && <EvoBtn variant="primary" size="sm" disabled={selected.length === 0}>批次加入促銷</EvoBtn>}
          </div>
          {isEmpty ? (
            <AnaEmptyState icon="products" title="所選期間無銷售資料，無法判斷滯銷"
              subtitle="有產品銷售紀錄後，低於門檻銷量的產品將顯示於此。" compact />
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 13, color: ANA_C.mid }}>低於</span>
                <input type="number" value={threshold} onChange={e => setThreshold(Number(e.target.value))} min={0}
                  style={{ width: 64, height: 40, border: `1px solid ${ANA_C.border}`, padding: '0 8px', fontSize: 13, outline: 'none' }} />
                <span style={{ fontSize: 13, color: ANA_C.mid }}>件銷售量視為滯銷</span>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${ANA_C.border}` }}>
                    <th style={{ width: 32, padding: '6px 8px' }}></th>
                    {['產品名稱','庫存量','期間銷量','最後訂單日'].map(h => (
                      <th key={h} style={{ padding: '6px 8px', textAlign: 'left', color: ANA_C.grey, fontWeight: 500, fontSize: 12 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const filtered = SLOW_ITEMS.filter(s => s.sold <= threshold);
                    if (filtered.length === 0) return (
                      <tr><td colSpan={5}>
                        <div style={{ padding: '24px 0', textAlign: 'center', fontSize: 13, color: ANA_C.light }}>
                          所有產品的銷售量均高於門檻，目前沒有滯銷產品
                        </div>
                      </td></tr>
                    );
                    return filtered.map((s, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${ANA_C.border}` }}>
                        <td style={{ padding: '8px' }}>
                          <input type="checkbox" checked={selected.includes(s.name)} onChange={() => toggle(s.name)} style={{ cursor: 'pointer' }} />
                        </td>
                        <td style={{ padding: '8px' }}>{s.name}</td>
                        <td style={{ padding: '8px', color: ANA_C.mid }}>{s.stock}</td>
                        <td style={{ padding: '8px', color: s.sold === 0 ? ANA_C.red : ANA_C.mid }}>{s.sold}</td>
                        <td style={{ padding: '8px', color: ANA_C.grey, fontSize: 12 }}>{s.lastOrder}</td>
                      </tr>
                    ));
                  })()}
                </tbody>
              </table>
            </>
          )}
        </Card>
      </div>

      {/* Advanced: Funnel */}
      <div style={{ position: 'relative' }}>
        {!isPro && <UpgradeLockBanner featureName="進階促銷活動成效分析" valueProp="深度拆解每場活動的 ROI，精準優化下次促銷" onLearnMore={onUpgrade} />}
        <Card style={{ overflow: 'hidden' }}>
          <div style={{ filter: !isPro ? 'blur(3px)' : 'none', pointerEvents: !isPro ? 'none' : 'auto' }}>
            <AnaSectionTitle>產品加購漏斗</AnaSectionTitle>
            <FunnelChart stages={[
              {label:'產品頁瀏覽',count:8420,pct:100},
              {label:'加入購物車',count:3368,pct:40.0},
              {label:'完成購買',count:1236,pct:14.7},
            ]} />
            <div style={{ marginTop: 12, background: ANA_C.blueBg, border: `1px solid ${ANA_C.blue}40`, padding: '10px 14px', fontSize: 13, color: ANA_C.mid }}>
              建議：主要流失點在「產品頁瀏覽 → 加入購物車」，流失率 60%。可優化產品主圖與描述，或提供更多規格選項。
            </div>
          </div>
        </Card>
      </div>

      {/* Advanced: Search Keywords */}
      <div style={{ position: 'relative' }}>
        {!isPro && <UpgradeLockBanner featureName="站內搜尋關鍵字分析" valueProp="追蹤顧客搜尋意圖，優化產品能見度" onLearnMore={onUpgrade} />}
        <Card style={{ overflow: 'hidden' }}>
          <div style={{ filter: !isPro ? 'blur(3px)' : 'none', pointerEvents: !isPro ? 'none' : 'auto' }}>
            <AnaSectionTitle>搜尋關鍵字分析</AnaSectionTitle>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${ANA_C.border}` }}>
                  {['關鍵字','搜尋次數','點擊產品數','加購率','轉換率'].map(h => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: ANA_C.grey, fontWeight: 500, fontSize: 12 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {kw:'棉質T恤',cnt:842,click:612,cart:'38%',cvr:'18%'},
                  {kw:'連帽衛衣',cnt:634,click:445,cart:'31%',cvr:'14%'},
                  {kw:'牛仔褲',cnt:521,click:378,cart:'42%',cvr:'21%'},
                  {kw:'白色上衣',cnt:498,click:310,cart:'28%',cvr:'12%'},
                  {kw:'運動短褲',cnt:412,click:298,cart:'35%',cvr:'16%'},
                ].map((r, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${ANA_C.border}` }}>
                    <td style={{ padding: '10px 12px', fontWeight: 500 }}>{r.kw}</td>
                    <td style={{ padding: '10px 12px' }}>{r.cnt}</td>
                    <td style={{ padding: '10px 12px' }}>{r.click}</td>
                    <td style={{ padding: '10px 12px', color: ANA_C.blue }}>{r.cart}</td>
                    <td style={{ padding: '10px 12px', color: ANA_C.green, fontWeight: 500 }}>{r.cvr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Advanced: Inventory Turnover */}
      <div style={{ position: 'relative' }}>
        {!isPro && <UpgradeLockBanner featureName="倉儲物流串接" valueProp="統一管理庫存與出貨，告別人工對帳" onLearnMore={onUpgrade} />}
        <Card style={{ overflow: 'hidden' }}>
          <div style={{ filter: !isPro ? 'blur(3px)' : 'none', pointerEvents: !isPro ? 'none' : 'auto' }}>
            <AnaSectionTitle>庫存周轉分析</AnaSectionTitle>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${ANA_C.border}` }}>
                  {['產品名稱','庫存量','月銷量','周轉天數','健康度'].map(h => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: ANA_C.grey, fontWeight: 500, fontSize: 12 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {name:'經典棉質T恤 — 白',stock:128,monthly:342,days:11,health:'healthy'},
                  {name:'休閒帆布鞋 — 白',stock:33,monthly:176,days:6,health:'healthy'},
                  {name:'棉麻寬褲 — 卡其',stock:71,monthly:154,days:14,health:'healthy'},
                  {name:'短袖POLO衫 — 藍',stock:88,monthly:118,days:22,health:'warning'},
                  {name:'絲絨晚宴包 — 酒紅',stock:240,monthly:2,days:360,health:'danger'},
                ].map((r, i) => {
                  const healthColor = r.health === 'healthy' ? ANA_C.green : r.health === 'warning' ? ANA_C.orange : ANA_C.red;
                  const healthLabel = r.health === 'healthy' ? '健康' : r.health === 'warning' ? '偏高' : '積壓';
                  return (
                    <tr key={i} style={{ borderBottom: `1px solid ${ANA_C.border}` }}>
                      <td style={{ padding: '10px 12px' }}>{r.name}</td>
                      <td style={{ padding: '10px 12px', color: ANA_C.mid }}>{r.stock} 件</td>
                      <td style={{ padding: '10px 12px' }}>{r.monthly} 件</td>
                      <td style={{ padding: '10px 12px', fontWeight: 500 }}>{r.days} 天</td>
                      <td style={{ padding: '10px 12px' }}>
                        <span style={{ color: healthColor, fontWeight: 500, fontSize: 12,
                          background: `${healthColor}15`, padding: '2px 8px', border: `1px solid ${healthColor}40` }}>
                          {healthLabel}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

function MemberAnalysis({ isPro, onUpgrade, showToast, isEmpty }) {
  const [rfmTipOpen, setRfmTipOpen] = React.useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Trend + Level */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: ANA_C.dark }}>新客 / 回購趨勢</div>
            {!isEmpty && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 12, color: ANA_C.mid }}>回購率</span>
                <span style={{ fontSize: 20, fontWeight: 700, color: ANA_C.blue }}>34.2%</span>
                <ANA_Tooltip text="回購率 30% 以上為健康水準，電商行業平均約 25%。計算方式：回購顧客 ÷ 有購買顧客 × 100%"><InfoIcon /></ANA_Tooltip>
              </div>
            )}
          </div>
          {isEmpty ? (
            <AnaEmptyState icon="members" title="所選期間沒有會員資料"
              subtitle="需要至少一筆完成購買的訂單，新客與回購趨勢才能開始統計。" />
          ) : (
            <>
              <div style={{ display: 'flex', gap: 16, marginBottom: 8, fontSize: 12 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 16, height: 2, background: ANA_C.blue, display: 'inline-block' }} /> 新客
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 16, height: 2, background: ANA_C.orange, display: 'inline-block' }} /> 回購客
                </span>
              </div>
              <DualLineChart data={MEMBER_TREND} />
            </>
          )}
        </Card>
        <Card>
          <AnaSectionTitle>會員等級分佈</AnaSectionTitle>
          {isEmpty ? (
            <AnaEmptyState icon="members" title="尚無會員等級資料"
              subtitle="會員完成購買並累積消費後，等級分佈將顯示於此。" />
          ) : (
            <>
              <PieChart data={MEMBER_LEVEL_PIE} />
              <div style={{ marginTop: 12 }}>
                {MEMBER_LEVEL_PIE.map((m, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0',
                    borderBottom: i < MEMBER_LEVEL_PIE.length - 1 ? `1px solid ${ANA_C.border}` : 'none', fontSize: 13 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 8, height: 8, background: m.color }} />
                      {m.label}
                    </span>
                    <span style={{ fontWeight: 500 }}>{m.pct}%</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>
      </div>

      <div style={{ background: '#ECF5FF', border: '1px solid #B3D8FF', borderRadius: 3, marginBottom: 20, overflow: 'hidden' }}>
        <button onClick={() => setRfmTipOpen(o => !o)}
          style={{ width: '100%', padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, color: '#409EFF', fontFamily: 'Noto Sans TC,sans-serif', fontWeight: 500 }}>
          <span>什麼是會員消費習慣分群（RFM）？</span>
          <span>{rfmTipOpen ? '▲' : '▼'}</span>
        </button>
        {rfmTipOpen && (
          <div style={{ padding: '0 16px 12px', fontSize: 13, color: '#606266', lineHeight: 1.8 }}>
            系統根據顧客的消費時間（多久前購買）、消費頻率（買過幾次）、消費金額（總計花多少），自動將顧客分成不同群體，幫助你針對不同客群採取最合適的行動。
          </div>
        )}
      </div>

      {!isPro && <UpgradeLockBanner featureName="RFM 會員價值分群" valueProp="識別高價值客群，把行銷預算花在刀口上" onLearnMore={onUpgrade} />}

      {/* RFM Cards - advanced */}
      <div style={{ position: 'relative' }}>
        <Card style={{ overflow: 'hidden' }}>
          <div style={{ filter: !isPro ? 'blur(3px)' : 'none', pointerEvents: !isPro ? 'none' : 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: ANA_C.dark }}>RFM 顧客價值分群</div>
              <span style={{ fontSize: 12, color: ANA_C.grey }}>分群資料更新至 2026/05/14</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {RFM_GROUPS.map((g, i) => (
                <div key={i} style={{ border: `1px solid ${g.border}`, background: g.bg, padding: 16 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: g.color, marginBottom: 6 }}>
                    {g.label}
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: ANA_C.dark, marginBottom: 4 }}>{g.count} 人</div>
                  <div style={{ fontSize: 12, color: ANA_C.mid, marginBottom: 2 }}>平均 LTV：{g.ltv}</div>
                  <div style={{ fontSize: 12, color: ANA_C.mid, marginBottom: 10 }}>平均距上次購買：{g.days} 天前</div>
                  <div style={{ fontSize: 12, color: ANA_C.mid, marginBottom: 12, lineHeight: 1.6,
                    background: ANA_C.white, padding: '8px 10px', border: `1px solid ${ANA_C.border}` }}>
                    建議：{g.suggestion}
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <EvoBtn variant="primary" size="sm" onClick={() => showToast('行銷旅程已啟動，將在下一個觸發週期執行', 'success')}>發送行銷旅程</EvoBtn>
                    <EvoBtn variant="secondary" size="sm" onClick={() => showToast('優惠券發送中，預計 5 分鐘內完成', 'info')}>發送優惠券</EvoBtn>
                    <EvoBtn variant="ghost" size="sm" onClick={() => showToast('名單匯出中，完成後將寄送至您的信箱', 'info')}>匯出名單</EvoBtn>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Top 20 customers - advanced */}
      <div style={{ position: 'relative' }}>
        <Card style={{ overflow: 'hidden' }}>
          <div style={{ filter: !isPro ? 'blur(3px)' : 'none', pointerEvents: !isPro ? 'none' : 'auto' }}>
            <AnaSectionTitle>高消費顧客 Top 20</AnaSectionTitle>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${ANA_C.border}` }}>
                  {['Email（部分遮蔽）','消費金額','訂單數','最後購買日','操作'].map(h => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: ANA_C.grey, fontWeight: 500, fontSize: 12 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {email:'te***@gmail.com',amount:'NT$ 48,200',orders:12,last:'2026-05-13'},
                  {email:'wa***@yahoo.com.tw',amount:'NT$ 38,650',orders:9,last:'2026-05-10'},
                  {email:'ch***@gmail.com',amount:'NT$ 31,400',orders:8,last:'2026-05-12'},
                  {email:'li***@gmail.com',amount:'NT$ 27,890',orders:7,last:'2026-05-08'},
                  {email:'su***@hotmail.com',amount:'NT$ 24,100',orders:6,last:'2026-05-11'},
                ].map((r, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${ANA_C.border}` }}>
                    <td style={{ padding: '10px 12px', fontFamily: 'monospace' }}>{r.email}</td>
                    <td style={{ padding: '10px 12px', fontWeight: 500 }}>{r.amount}</td>
                    <td style={{ padding: '10px 12px' }}>{r.orders}</td>
                    <td style={{ padding: '10px 12px', color: ANA_C.grey }}>{r.last}</td>
                    <td style={{ padding: '10px 12px' }}><EvoBtn variant="ghost" size="sm">查看顧客</EvoBtn></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Advanced: Cohort Analysis */}
      <div style={{ position: 'relative' }}>
        <Card style={{ overflow: 'hidden' }}>
          <div style={{ filter: !isPro ? 'blur(3px)' : 'none', pointerEvents: !isPro ? 'none' : 'auto' }}>
            <AnaSectionTitle>同期群分析</AnaSectionTitle>
            <div style={{ fontSize: 12, color: ANA_C.mid, marginBottom: 12 }}>
              追蹤各月份首購會員在後續每個月的回購留存率
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${ANA_C.border}` }}>
                    <th style={{ padding: '8px 12px', textAlign: 'left', color: ANA_C.grey, fontWeight: 500, whiteSpace: 'nowrap' }}>首購月份</th>
                    <th style={{ padding: '8px 12px', textAlign: 'right', color: ANA_C.grey, fontWeight: 500 }}>人數</th>
                    {['第1月','第2月','第3月','第4月','第5月'].map(m => (
                      <th key={m} style={{ padding: '8px 12px', textAlign: 'center', color: ANA_C.grey, fontWeight: 500 }}>{m}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {month:'2026/01',count:412,rates:[100,38,24,18,14]},
                    {month:'2026/02',count:356,rates:[100,41,26,19,null]},
                    {month:'2026/03',count:489,rates:[100,35,22,null,null]},
                    {month:'2026/04',count:521,rates:[100,42,null,null,null]},
                    {month:'2026/05',count:287,rates:[100,null,null,null,null]},
                  ].map((row, ri) => (
                    <tr key={ri} style={{ borderBottom: `1px solid ${ANA_C.border}` }}>
                      <td style={{ padding: '8px 12px', fontWeight: 500 }}>{row.month}</td>
                      <td style={{ padding: '8px 12px', textAlign: 'right', color: ANA_C.mid }}>{row.count}</td>
                      {row.rates.map((r, ci) => {
                        if (r === null) return <td key={ci} style={{ padding: '8px 12px', background: ANA_C.bg }} />;
                        const intensity = r / 100;
                        return (
                          <td key={ci} style={{ padding: '8px 12px', textAlign: 'center', fontWeight: ci === 0 ? 700 : 400,
                            background: `rgba(64,158,255,${0.08 + intensity * 0.45})`,
                            color: intensity > 0.6 ? ANA_C.dark : ANA_C.mid }}>
                            {r}%
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>

      {/* Advanced: Spending Distribution Horizontal Bar Chart */}
      <div style={{ position: 'relative' }}>
        <Card style={{ overflow: 'hidden' }}>
          <div style={{ filter: !isPro ? 'blur(3px)' : 'none', pointerEvents: !isPro ? 'none' : 'auto' }}>
            <AnaSectionTitle>顧客消費分佈</AnaSectionTitle>
            <div style={{ fontSize: 12, color: ANA_C.mid, marginBottom: 16 }}>各消費金額區間的顧客人數與佔比</div>
            {(() => {
              const DIST = [
                { label: 'NT$ 10,000 以上', count: 48,  pct: 8  },
                { label: 'NT$ 5,000 – 9,999', count: 124, pct: 21 },
                { label: 'NT$ 2,000 – 4,999', count: 203, pct: 34 },
                { label: 'NT$ 500 – 1,999',   count: 167, pct: 28 },
                { label: 'NT$ 500 以下',       count: 53,  pct: 9  },
              ];
              const maxPct = Math.max(...DIST.map(d => d.pct));
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {DIST.map((d, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 140, fontSize: 13, color: ANA_C.mid, textAlign: 'right', flexShrink: 0 }}>{d.label}</div>
                      <div style={{ flex: 1, background: ANA_C.bg, height: 28, position: 'relative' }}>
                        <div style={{
                          position: 'absolute', left: 0, top: 0, bottom: 0,
                          width: `${(d.pct / maxPct) * 100}%`,
                          background: i === 0 ? ANA_C.blue : i === 1 ? `${ANA_C.blue}CC` : i === 2 ? `${ANA_C.blue}99` : i === 3 ? `${ANA_C.blue}66` : `${ANA_C.blue}44`,
                          transition: 'width 0.3s'
                        }} />
                        <div style={{ position: 'absolute', left: 10, top: 0, bottom: 0, display: 'flex', alignItems: 'center',
                          fontSize: 12, fontWeight: 500, color: d.pct > 20 ? '#fff' : ANA_C.dark }}>
                          {d.count} 人
                        </div>
                      </div>
                      <div style={{ width: 40, fontSize: 13, fontWeight: 700, color: ANA_C.blue, flexShrink: 0 }}>{d.pct}%</div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </Card>
      </div>
    </div>
  );
}

function MarketingEfficiency({ isPro, onUpgrade, isEmpty }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {!isPro && <UpgradeLockBanner featureName="進階促銷活動成效分析" valueProp="深度拆解每場活動的 ROI，精準優化下次促銷" onLearnMore={onUpgrade} />}
      <div style={{ filter: !isPro ? 'blur(3px)' : 'none', pointerEvents: !isPro ? 'none' : 'auto',
        display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Funnel */}
      <Card>
        <AnaSectionTitle>購物車轉換漏斗</AnaSectionTitle>
        {isEmpty ? (
          <AnaEmptyState icon="marketing" title="所選期間無轉換資料" subtitle={'有訂單進入結帳流程後，\n轉換漏斗將開始統計。'} />
        ) : (
          <>
            <div style={{ fontSize: 12, color: ANA_C.grey, marginBottom: 12, lineHeight: 1.7 }}>
              顧客從看到產品到完成購買的每個步驟流失比例。完成付款率目前為 <strong style={{ color: FUNNEL_STAGES[FUNNEL_STAGES.length - 1].pct < 15 ? ANA_C.red : ANA_C.green }}>{FUNNEL_STAGES[FUNNEL_STAGES.length - 1].pct}%</strong>
              {FUNNEL_STAGES[FUNNEL_STAGES.length - 1].pct < 15 && (
                <span style={{ color: ANA_C.red }}>（低於 15%，建議檢查結帳流程或金流設定）</span>
              )}
              。
            </div>
            <FunnelChart stages={FUNNEL_STAGES} />
            <div style={{ marginTop: 16, background: ANA_C.blueBg, border: `1px solid ${ANA_C.blue}40`, padding: '10px 14px', fontSize: 13, color: ANA_C.mid }}>
              建議：購物車主要流失發生在「加入購物車 → 進入結帳」，流失率 40%。可設定購物車提醒，或提供更有吸引力的滿額優惠。
            </div>
          </>
        )}
      </Card>

      {/* Promo Table */}
      <Card>
        <AnaSectionTitle>優惠活動成效</AnaSectionTitle>
        {isEmpty ? (
          <AnaEmptyState icon="marketing" title="尚無優惠活動使用紀錄" subtitle="建立優惠券或折扣碼後，活動使用率與帶動金額將在此顯示。" />
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${ANA_C.border}` }}>
                {['活動名稱','類型','使用次數','核銷率','帶動金額','折扣金額','ROI','效益'].map(h => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: ANA_C.grey, fontWeight: 500, fontSize: 12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PROMO_ROWS.map((r, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${ANA_C.border}` }}>
                  <td style={{ padding: '10px 12px', color: ANA_C.blue, cursor: 'pointer' }}>{r.name}</td>
                  <td style={{ padding: '10px 12px', color: ANA_C.mid }}>{r.type}</td>
                  <td style={{ padding: '10px 12px' }}>{r.used}</td>
                  <td style={{ padding: '10px 12px' }}>{r.rate}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 500 }}>{r.amount}</td>
                  <td style={{ padding: '10px 12px', color: ANA_C.red }}>{r.discount}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 700,
                    color: r.roi >= 3 ? ANA_C.green : r.roi >= 1 ? ANA_C.orange : ANA_C.red }}>
                    {r.roi > 0 ? r.roi.toFixed(1) : '—'}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    {r.tag === 'best' && <EvoTag color="success">最佳活動</EvoTag>}
                    {r.tag === 'low' && <EvoTag color="danger">低效活動</EvoTag>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {/* Ad ROI Table */}
      <Card>
        <AnaSectionTitle right={
          <EvoBtn variant="secondary" size="sm" onClick={() => {}}>設定廣告花費</EvoBtn>
        }>廣告 ROI 分析</AnaSectionTitle>
        {isEmpty ? (
          <AnaEmptyState icon="marketing" title="尚無廣告花費記錄" subtitle="請先設定廣告花費，系統將自動計算各渠道 ROAS。" />
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${ANA_C.border}` }}>
                {['廣告活動名稱','廣告平台','訂單數','銷售金額','廣告花費','廣告投資報酬率（ROAS）'].map(h => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: ANA_C.grey, fontWeight: 500, fontSize: 12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {utm:'2026_summer_sale',platform:'Google Ads',orders:312,amount:'NT$ 718,160',cost:'NT$ 138,000',roas:5.2},
                {utm:'fb_retarget_may',platform:'Facebook',orders:198,amount:'NT$ 455,400',cost:'NT$ 119,700',roas:3.8},
                {utm:'line_brand_may',platform:'LINE Ads',orders:142,amount:'NT$ 327,000',cost:'NT$ 79,800',roas:4.1},
                {utm:'ig_summer_story',platform:'Instagram',orders:88,amount:'NT$ 202,400',cost:'NT$ 168,000',roas:1.2},
              ].map((r, i) => {
                const roasColor = r.roas >= 2 ? ANA_C.green : r.roas >= 1 ? ANA_C.orange : ANA_C.red;
                return (
                  <tr key={i} style={{ borderBottom: `1px solid ${ANA_C.border}` }}>
                    <td style={{ padding: '10px 12px', fontFamily: 'monospace', fontSize: 12 }}>{r.utm}</td>
                    <td style={{ padding: '10px 12px', color: ANA_C.mid }}>{r.platform}</td>
                    <td style={{ padding: '10px 12px' }}>{r.orders}</td>
                    <td style={{ padding: '10px 12px', fontWeight: 500 }}>{r.amount}</td>
                    <td style={{ padding: '10px 12px', color: ANA_C.mid }}>{r.cost}</td>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: roasColor }}>{r.roas.toFixed(1)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Card>

      {/* Journey Table */}
      <Card>
        <AnaSectionTitle>自動化旅程成效</AnaSectionTitle>
        {isEmpty ? (
          <AnaEmptyState icon="marketing" title="尚無自動化旅程觸發紀錄" subtitle="啟用行銷旅程後，觸發次數、Email 成效與轉換資料將在此顯示。" />
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${ANA_C.border}` }}>
                {['旅程名稱','觸發次數','Email 開信率','Email 點擊率','轉換訂單','轉換率','帶動金額','操作'].map(h => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: ANA_C.grey, fontWeight: 500, fontSize: 12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {JOURNEY_ROWS.map((r, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${ANA_C.border}` }}>
                  <td style={{ padding: '10px 12px', fontWeight: 500 }}>{r.name}</td>
                  <td style={{ padding: '10px 12px' }}>{r.trigger}</td>
                  <td style={{ padding: '10px 12px', color: ANA_C.green }}>{r.open}</td>
                  <td style={{ padding: '10px 12px', color: ANA_C.blue }}>{r.click}</td>
                  <td style={{ padding: '10px 12px' }}>{r.orders}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 500 }}>{r.rate}</td>
                  <td style={{ padding: '10px 12px' }}>{r.amount}</td>
                  <td style={{ padding: '10px 12px' }}><EvoBtn variant="ghost" size="sm">查看旅程設定</EvoBtn></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
      </div>
    </div>
  );
}

// ─── Upgrade Dialog ────────────────────────────────────────────────────────────
function UpgradeDialog({ open, onClose, onContact }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: ANA_C.white, width: 480, maxWidth: '90vw', maxHeight: '85vh', overflowY: 'auto',
        animation: 'evo-modal-in 0.2s ease', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${ANA_C.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>解鎖進階電商分析</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer',
            color: ANA_C.grey, fontSize: 20, padding: 0 }}>x</button>
        </div>
        <div style={{ padding: '20px' }}>
          <p style={{ fontSize: 14, color: ANA_C.mid, marginBottom: 16, lineHeight: 1.8 }}>
            升級至進階電商包後，即可查看完整的電商數據分析，用數據驅動每一個行銷決策。
          </p>
          <ul style={{ listStyle: 'none', lineHeight: 2.2, fontSize: 14, marginBottom: 20 }}>
            {[
              '時段熱力圖：找出最佳推播與廣告投放時機',
              '訂單來源分析：知道顧客從哪裡來',
              '廣告投資報酬率（ROAS）計算：每塊廣告費的報酬一目了然',
              '產品加購漏斗：找出轉換效率差的產品',
              '搜尋關鍵字分析：知道顧客在找什麼',
              '庫存周轉分析：評估庫存健康程度',
              'RFM 顧客分群：自動分類，對症下藥',
              '同期群分析：追蹤各批次會員留存',
              '購物車五段轉換漏斗，找出最大流失點',
              '優惠活動投資報酬率（ROI）自動計算',
              '自動化旅程開信率與轉換追蹤',
            ].map((f, i) => (
              <li key={i} style={{ color: ANA_C.mid }}>· {f}</li>
            ))}
          </ul>
          <EvoBtn variant="primary" fullWidth onClick={onContact}>聯絡營運輔導顧問了解升級方案</EvoBtn>
        </div>
        <div style={{ padding: '12px 20px', borderTop: `1px solid ${ANA_C.border}`, textAlign: 'center' }}>
          <EvoBtn variant="text" onClick={onClose}>先不了解</EvoBtn>
        </div>
      </div>
    </div>
  );
}

// ─── Ad Cost Drawer ────────────────────────────────────────────────────────────
function AdCostDrawer({ open, onClose, showToast }) {
  const [costs, setCosts] = React.useState({0: '', 1: '', 2: ''});
  const campaigns = [
    {name:'2026_summer_sale',platform:'Google Ads'},
    {name:'fb_retarget_may',platform:'Facebook'},
    {name:'line_brand_may',platform:'LINE Ads'},
  ];
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1800, pointerEvents: open ? 'auto' : 'none' }}>
      {open && <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />}
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 480,
        background: ANA_C.white, boxShadow: '-4px 0 20px rgba(0,0,0,0.15)',
        transform: open ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.25s ease',
        display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${ANA_C.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>設定廣告花費</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: ANA_C.grey, fontSize: 20 }}>x</button>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
          <p style={{ fontSize: 13, color: ANA_C.mid, marginBottom: 16, lineHeight: 1.7 }}>
            為每個廣告活動填入廣告花費，系統將自動計算廣告投資報酬率（ROAS）。
          </p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${ANA_C.border}` }}>
                {['廣告活動名稱','廣告平台','花費日期','廣告花費（NT$）'].map(h => (
                  <th key={h} style={{ padding: '8px 10px', textAlign: 'left', color: ANA_C.grey, fontWeight: 500, fontSize: 12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${ANA_C.border}` }}>
                  <td style={{ padding: '10px' }}>{c.name}</td>
                  <td style={{ padding: '10px', color: ANA_C.mid }}>{c.platform}</td>
                  <td style={{ padding: '10px' }}>
                    <input type="date" defaultValue="2026-05-14"
                      style={{ height: 36, border: `1px solid ${ANA_C.border}`, padding: '0 8px', fontSize: 13, outline: 'none' }} />
                  </td>
                  <td style={{ padding: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ color: ANA_C.mid, fontSize: 12 }}>NT$</span>
                      <input type="number" min="0" placeholder="輸入花費金額"
                        value={costs[i]}
                        onChange={e => setCosts(prev => ({...prev, [i]: e.target.value}))}
                        style={{ width: 120, height: 40, border: `1px solid ${ANA_C.border}`, padding: '0 8px', fontSize: 13, outline: 'none' }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '12px 20px', borderTop: `1px solid ${ANA_C.border}`, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <EvoBtn variant="secondary" onClick={onClose}>取消</EvoBtn>
          <EvoBtn variant="primary" onClick={() => { onClose(); showToast('廣告花費已儲存，ROAS 計算將於 5 分鐘內更新。', 'success'); }}>儲存設定</EvoBtn>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
const ANA_TIME_PRESETS = ['今天','昨天','本週','本月','上月','近 7 天','近 30 天','近 90 天','自訂'];

const ANA_PAGE_MAP = {
  'analytics-sales':     { title: '銷售概覽'  },
  'analytics-products':  { title: '產品分析'  },
  'analytics-members':   { title: '會員分析'  },
  'analytics-marketing': { title: '行銷成效'  },
};

function PageAnalytics({ currentPage, onNavigate, show }) {
  const showToast = show || (() => {});
  const [timePreset, setTimePreset] = React.useState('本月');
  const [showCompare, setShowCompare] = React.useState(false);
  const [isPro, setIsPro] = React.useState(window.__evomni_isPro || false);

  React.useEffect(() => {
    const handler = e => setIsPro(e.detail.isPro);
    window.addEventListener('evomni:planchange', handler);
    return () => window.removeEventListener('evomni:planchange', handler);
  }, []);
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [upgradeOpen, setUpgradeOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const navigate = page => onNavigate(page);

  const handleTimeChange = (preset) => {
    setTimePreset(preset);
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  const handleExport = () => {
    showToast('報表產生中，完成後將寄送至您的信箱', 'info');
  };

  const handleUpgradeContact = () => {
    setUpgradeOpen(false);
    showToast('感謝您的興趣！我們的顧問將在 1 個工作日內與您聯繫。', 'success');
  };

  const route = ANA_PAGE_MAP[currentPage] || ANA_PAGE_MAP['analytics-sales'];
  const sharedProps = { isPro, onUpgrade: () => setUpgradeOpen(true), showCompare, onNavigate: navigate, showToast, isEmpty };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', marginTop: -40, marginLeft: -40, marginRight: -40 }}>
      {/* Shared date control bar */}
      <div style={{ background: ANA_C.white, borderBottom: `1px solid ${ANA_C.border}`, padding: '10px 24px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          {/* Time presets */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            {ANA_TIME_PRESETS.map(p => (
              <button key={p} onClick={() => handleTimeChange(p)} style={{
                height: 36, padding: '0 10px', fontSize: 12, cursor: 'pointer',
                border: `1px solid ${timePreset === p ? ANA_C.blue : ANA_C.border}`,
                background: timePreset === p ? ANA_C.blueBg : ANA_C.white,
                color: timePreset === p ? ANA_C.blue : ANA_C.mid, borderRadius: 0,
                fontFamily: 'Noto Sans TC,sans-serif' }}>
                {p}
              </button>
            ))}
            {timePreset === '自訂' && (
              <>
                <input type="date" defaultValue="2026-05-01"
                  style={{ height: 36, border: `1px solid ${ANA_C.blue}`, padding: '0 8px', fontSize: 13,
                    outline: 'none', fontFamily: 'Noto Sans TC,sans-serif' }} />
                <span style={{ fontSize: 13, color: ANA_C.grey }}>至</span>
                <input type="date" defaultValue="2026-05-14"
                  style={{ height: 36, border: `1px solid ${ANA_C.blue}`, padding: '0 8px', fontSize: 13,
                    outline: 'none', fontFamily: 'Noto Sans TC,sans-serif' }} />
              </>
            )}
            <span style={{ fontSize: 12, color: ANA_C.grey, marginLeft: 4, whiteSpace: 'nowrap' }}>
              資料更新至 2026/05/14 00:30
              {timePreset === '今天' && <span style={{ color: ANA_C.blue }}> （即時，5 分鐘快取）</span>}
            </span>
          </div>
          {/* Right controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 13, color: ANA_C.mid, whiteSpace: 'nowrap' }}>顯示同期對照</span>
              <div onClick={() => setShowCompare(c => !c)} style={{
                width: 40, height: 20, borderRadius: 10, background: showCompare ? ANA_C.blue : ANA_C.light,
                position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
                <div style={{ position: 'absolute', top: 2, left: showCompare ? 22 : 2,
                  width: 16, height: 16, borderRadius: '50%', background: '#fff',
                  transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
              </div>
            </div>
            {/* Demo: Empty state toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 5,
              padding: '2px 10px', border: `1px solid ${isEmpty ? ANA_C.orange : ANA_C.border}`,
              background: isEmpty ? ANA_C.orangeBg : ANA_C.white, fontSize: 12 }}>
              <span style={{ color: isEmpty ? ANA_C.orange : ANA_C.grey }}>空狀態（Demo）</span>
              <div onClick={() => setIsEmpty(e => !e)} style={{
                width: 32, height: 16, borderRadius: 8, background: isEmpty ? ANA_C.orange : ANA_C.light,
                position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}>
                <div style={{ position: 'absolute', top: 1, left: isEmpty ? 17 : 1,
                  width: 14, height: 14, borderRadius: '50%', background: '#fff',
                  transition: 'left 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }} />
              </div>
            </div>
            <EvoBtn variant="secondary" size="sm" onClick={handleExport}>匯出報表</EvoBtn>
          </div>
        </div>
      </div>

      {/* Scrollable main content */}
      <main style={{ flex: 1, overflowY: 'auto', padding: 40, background: '#F5F7FA' }}>
        <PageHeader title={route.title} />

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{ background: ANA_C.white, border: `1px solid ${ANA_C.border}`, padding: 20 }}>
                  <Skel h={14} w="60%" style={{ marginBottom: 12 }} />
                  <Skel h={28} w="80%" style={{ marginBottom: 8 }} />
                  <Skel h={12} w="40%" />
                </div>
              ))}
            </div>
            <div style={{ background: ANA_C.white, border: `1px solid ${ANA_C.border}`, padding: 20 }}>
              <Skel h={14} w="20%" style={{ marginBottom: 16 }} />
              <Skel h={200} />
            </div>
          </div>
        ) : (
          <>
            {currentPage === 'analytics-sales' && (
              <SalesOverview {...sharedProps} onOpenAdDrawer={() => setDrawerOpen(true)} />
            )}
            {currentPage === 'analytics-products' && (
              <ProductAnalysis {...sharedProps} />
            )}
            {currentPage === 'analytics-members' && (
              <MemberAnalysis {...sharedProps} />
            )}
            {currentPage === 'analytics-marketing' && (
              <MarketingEfficiency {...sharedProps} />
            )}
          </>
        )}
      </main>

      <UpgradeDialog open={upgradeOpen} onClose={() => setUpgradeOpen(false)} onContact={handleUpgradeContact} />
      <AdCostDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} showToast={showToast} />
    </div>
  );
}
