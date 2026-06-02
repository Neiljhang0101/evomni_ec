// PageWebsiteDesign — 網站設計 > 選單管理

// ─── DS Tokens ────────────────────────────────────────────────────────────────
const WmC = {
  bg:'#F5F7FA', white:'#FFFFFF', border:'#DCDFE6',
  dark:'#303133', blue:'#409EFF', text:'#303133',
  textSub:'#606266', textMuted:'#909399',
  success:'#67C23A', warning:'#E6A23C', danger:'#F56C6C',
  warningBg:'#FDF6EC', warningBdr:'#F5DAB1', selectBg:'#ECF5FF',
};
const CARD = {
  background: '#FFFFFF',
  borderRadius: 3,
  boxShadow: '0 2px 12px 0 rgba(0,0,0,0.08)',
};

// ─── Type config ──────────────────────────────────────────────────────────────
const WM_TYPES = [
  { id:'group',        label:'群組',     color:'#909399', bg:'#F5F5F5', icon:'M2 4h10M2 7h10M2 10h6' },
  { id:'link',         label:'自訂連結', color:'#E6A23C', bg:'#FDF6EC', icon:'M5.5 8.5 4 10a2.5 2.5 0 0 0 3.5 3.5l2-2M8.5 5.5 10 4a2.5 2.5 0 0 1 3.5 3.5l-2 2M8 8l-2-2' },
  { id:'article-list', label:'文章列表', color:'#409EFF', bg:'#ECF5FF', icon:'M3 3h8v2H3zM3 7h8M3 10h5' },
  { id:'article-page', label:'文章單頁', color:'#409EFF', bg:'#ECF5FF', icon:'M3 1.5h6.5L12 4v8.5H3V1.5zM9.5 1.5V4H12M5 6h4M5 8h4M5 10h2' },
  { id:'product-list', label:'產品列表', color:'#67C23A', bg:'#F0F9EB', icon:'M1.5 1.5h4v4h-4zM8.5 1.5h4v4h-4zM1.5 8.5h4v4h-4zM8.5 8.5h4v4h-4z' },
  { id:'product-page', label:'產品單頁', color:'#67C23A', bg:'#F0F9EB', icon:'M2 5h10l-1 7H3L2 5zM5 5V3.5a2 2 0 0 1 4 0V5' },
  { id:'form',         label:'表單',     color:'#9B59B6', bg:'#F5EEFB', icon:'M3 2h8v10H3zM5 5h4M5 7.5h4M5 10h2' },
  { id:'system-page',  label:'系統單頁', color:'#303133', bg:'#F5F7FA', icon:'M7 1a6 6 0 1 0 0 12A6 6 0 0 0 7 1zM7 4v3l2 1' },
];
const TYPE_MAP = Object.fromEntries(WM_TYPES.map(t => [t.id, t]));

const WM_LANGS = [
  { id:'zh', label:'繁中' },
  { id:'en', label:'EN' },
];
const WM_LANG_LABEL = Object.fromEntries(WM_LANGS.map(l => [l.id, l.label]));

const WM_TYPE_DESC = {
  'group':        '把多個項目收在同一個標題下。例如「服務介紹」底下放「設計服務」、「工程服務」，前台滑過時展開子選單。群組本身沒有單獨頁面，只做展開用。',
  'link':         '自訂任意網址，可連結到外部網站或站內其他頁面。',
  'article-list': '顯示某一文章分類下所有文章的列表頁。',
  'article-page': '直接連結到某一篇文章的內容頁。需先選擇分類，再選擇文章。',
  'product-list': '顯示某一產品分類下所有產品的列表頁。',
  'product-page': '直接連結到某一項產品的詳細頁面。需先選擇分類，再選擇產品。',
  'form':         '連結到指定的表單頁面，例如聯絡我們、預約諮詢。',
  'system-page':  '系統固定頁面，例如隱私權政策、服務條款、退換貨政策。',
};

// ─── Mock selector data ───────────────────────────────────────────────────────
const WM_ARTICLE_CATS = [
  { id:'ac1', name:'公司動態', count:10 }, { id:'ac2', name:'產品消息', count:5 },
  { id:'ac3', name:'業界動態', count:8  }, { id:'ac4', name:'媒體報導', count:3 },
];
const WM_ARTICLE_PAGES = {
  ac1:[{ id:'ap1',title:'2026 新產品發表會' },{ id:'ap2',title:'獲獎通知' },{ id:'ap3',title:'員工旅遊公告' }],
  ac2:[{ id:'ap4',title:'新品上市' },{ id:'ap5',title:'產品更新說明' }],
  ac3:[{ id:'ap6',title:'電商趨勢報告' },{ id:'ap7',title:'業界技術研討' }],
  ac4:[{ id:'ap8',title:'媒體採訪整理' }],
};
const WM_PRODUCT_CATS = [
  { id:'pc1', name:'主機設備', count:20 }, { id:'pc2', name:'週邊配件', count:15 },
  { id:'pc3', name:'軟體授權', count:8 },
];
const WM_PRODUCT_PAGES = {
  pc1:[{ id:'pp1',title:'Server X Pro' },{ id:'pp2',title:'Workstation Z' }],
  pc2:[{ id:'pp3',title:'滑鼠 M200' },{ id:'pp4',title:'鍵盤 K500' }],
  pc3:[{ id:'pp5',title:'企業授權包' }],
};
const WM_FORMS        = [{ id:'f1',name:'聯絡我們' },{ id:'f2',name:'預約諮詢' },{ id:'f3',name:'線上報名' }];
const WM_SYSTEM_PAGES = [
  { id:'sp1',name:'隱私權政策' },{ id:'sp2',name:'服務條款' },
  { id:'sp3',name:'退換貨政策' },{ id:'sp4',name:'網站地圖' },
];

// ─── Initial data ─────────────────────────────────────────────────────────────
const WM_EMPTY = { zh: [], en: [] };
const WM_DEMO  = {
  zh: [
    { id:'wm1', name:'公司動態', type:'article-list', visible:true,  openMode:'same', children:[] },
    { id:'wm2', name:'關於我們', type:'group',        visible:true,  openMode:'same', children:[
      { id:'wm2a', name:'公司簡介', type:'article-page', visible:true, openMode:'same', children:[] },
      { id:'wm2b', name:'服務流程', type:'article-page', visible:true, openMode:'same', children:[] },
    ]},
    { id:'wm3', name:'最新消息', type:'article-list', visible:true,  openMode:'same', children:[] },
    { id:'wm4', name:'產品介紹', type:'product-list', visible:true,  openMode:'same', children:[] },
    { id:'wm5', name:'聯絡我們', type:'form',         visible:false, openMode:'same', children:[] },
  ],
  en: [],
};
const WM_INIT = WM_EMPTY;

// ─── Icons ────────────────────────────────────────────────────────────────────
function WmIcDrag() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink:0,cursor:'grab' }}>
    <circle cx="4.5" cy="3.5"  r="1" fill="#C0C4CC"/><circle cx="9.5" cy="3.5"  r="1" fill="#C0C4CC"/>
    <circle cx="4.5" cy="7"    r="1" fill="#C0C4CC"/><circle cx="9.5" cy="7"    r="1" fill="#C0C4CC"/>
    <circle cx="4.5" cy="10.5" r="1" fill="#C0C4CC"/><circle cx="9.5" cy="10.5" r="1" fill="#C0C4CC"/>
  </svg>;
}
function WmIcChevron({ open }) {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transition:'transform .2s', transform:open?'rotate(90deg)':'none', flexShrink:0 }}>
    <path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;
}
function WmIcPlus({ size=13, color=WmC.blue }) {
  return <svg width={size} height={size} viewBox="0 0 13 13" fill="none"><path d="M6.5 1.5v10M1.5 6.5h10" stroke={color} strokeWidth="1.6" strokeLinecap="round"/></svg>;
}
function WmIcEye({ off, size=14 }) {
  return off
    ? <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><path d="M1 7s2-4 6-4 6 4 6 4-2 4-6 4-6-4-6-4Z" stroke="currentColor" strokeWidth="1.2" fill="none"/><circle cx="7" cy="7" r="1.8" stroke="currentColor" strokeWidth="1.2" fill="none"/><line x1="2" y1="2" x2="12" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
    : <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><path d="M1 7s2-4 6-4 6 4 6 4-2 4-6 4-6-4-6-4Z" stroke="currentColor" strokeWidth="1.2" fill="none"/><circle cx="7" cy="7" r="1.8" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg>;
}
function WmIcTrash() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 3.5h9M5.5 3.5V2.5h3v1M4.5 3.5l.5 8h4l.5-8" stroke="#C0C4CC" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function WmIcInfo({ size=14, color='#909399' }) {
  return <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke={color} strokeWidth="1.2" fill="none"/><line x1="7" y1="6.5" x2="7" y2="10" stroke={color} strokeWidth="1.3" strokeLinecap="round"/><circle cx="7" cy="4.5" r="0.65" fill={color}/></svg>;
}
function WmIcClose({ size=14 }) {
  return <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function wmFind(tree, id) {
  for (const n of tree) { if(n.id===id) return n; if(n.children){ const f=wmFind(n.children,id); if(f) return f; } }
  return null;
}
function wmUpdate(tree, id, patch) {
  return tree.map(n => n.id===id ? {...n,...patch} : {...n, children:n.children?wmUpdate(n.children,id,patch):[]});
}
function wmDelete(tree, id) {
  return tree.filter(n=>n.id!==id).map(n=>({...n, children:n.children?wmDelete(n.children,id):[]}));
}
function wmAddChild(tree, parentId, newItem) {
  if (!parentId) return [...tree, newItem];
  return tree.map(n => {
    if (n.id===parentId) return {...n, children:[...(n.children||[]), newItem]};
    if (n.children) return {...n, children:wmAddChild(n.children, parentId, newItem)};
    return n;
  });
}
// Insert item adjacent to target (before/after)
function wmInsertAdjacentTo(tree, dstId, item, pos) {
  const result = [];
  for (const node of tree) {
    if (node.id === dstId) {
      if (pos === 'before') result.push(item, node);
      else result.push(node, item);
    } else {
      result.push({ ...node, children: node.children ? wmInsertAdjacentTo(node.children, dstId, item, pos) : [] });
    }
  }
  return result;
}
// Move srcId to before/after dstId
function wmMove(tree, srcId, dstId, pos) {
  if (srcId === dstId) return tree;
  const src = wmFind(tree, srcId);
  if (!src) return tree;
  const withoutSrc = wmDelete(tree, srcId);
  return wmInsertAdjacentTo(withoutSrc, dstId, src, pos);
}

// ─── Add Item Modal ───────────────────────────────────────────────────────────
function WmAddModal({ open, onClose, onAdd, topItems, defaultParent, showToast }) {
  const [selType,   setSelType]   = React.useState(null);
  const [groupName, setGroupName] = React.useState('');
  const [linkName,  setLinkName]  = React.useState('');
  const [linkUrl,   setLinkUrl]   = React.useState('');
  const [errors,    setErrors]    = React.useState({});
  const [catFilter, setCatFilter] = React.useState(null);
  const [search,    setSearch]    = React.useState('');
  const [selected,  setSelected]  = React.useState([]);
  const [addTo,     setAddTo]     = React.useState(defaultParent||'root');

  React.useEffect(() => {
    if (open) { setSelType(null); setSelected([]); setCatFilter(null); setSearch(''); setGroupName(''); setLinkName(''); setLinkUrl(''); setAddTo(defaultParent||'root'); setErrors({}); }
  }, [open, defaultParent]);

  const toggleSel = id => setSelected(p => p.includes(id)?p.filter(x=>x!==id):[...p,id]);

  const getList = () => {
    if (!selType) return [];
    if (selType==='article-list') return WM_ARTICLE_CATS;
    if (selType==='product-list') return WM_PRODUCT_CATS;
    if (selType==='form')         return WM_FORMS;
    if (selType==='system-page')  return WM_SYSTEM_PAGES;
    if (selType==='article-page') return catFilter ? (WM_ARTICLE_PAGES[catFilter]||[]).filter(p=>p.title.includes(search)) : WM_ARTICLE_CATS;
    if (selType==='product-page') return catFilter ? (WM_PRODUCT_PAGES[catFilter]||[]).filter(p=>p.title.includes(search)) : WM_PRODUCT_CATS;
    return [];
  };

  const handleAdd = () => {
    const parentId = addTo==='root' ? null : addTo;
    let items = [];
    if (selType==='group') {
      if (!groupName.trim()) { setErrors({ groupName:true }); showToast && showToast('請填寫群組名稱', 'error'); return; }
      items=[{ type:'group', name:groupName.trim() }];
    } else if (selType==='link') {
      const errs = {};
      if (!linkName.trim()) errs.linkName = true;
      if (!linkUrl.trim())  errs.linkUrl  = true;
      if (Object.keys(errs).length) { setErrors(errs); showToast && showToast('請填寫連結名稱與網址', 'error'); return; }
      items=[{ type:'link', name:linkName.trim(), url:linkUrl.trim() }];
    } else if ((selType==='article-page'||selType==='product-page') && catFilter) {
      const pages = selType==='article-page' ? WM_ARTICLE_PAGES[catFilter] : WM_PRODUCT_PAGES[catFilter];
      items=(pages||[]).filter(p=>selected.includes(p.id)).map(p=>({ type:selType, name:p.title }));
    } else {
      const list = getList();
      items=list.filter(i=>selected.includes(i.id)).map(i=>({ type:selType, name:i.name||i.title }));
    }
    if (!items.length) return;
    setErrors({});
    onAdd(items, parentId);
    onClose();
  };

  if (!open) return null;

  const needsCatStep = (selType==='article-page'||selType==='product-page') && !catFilter;
  const needsSearch  = (selType==='article-page'||selType==='product-page') && catFilter;
  const selList = getList();

  return (
    <div style={{ position:'fixed', inset:0, zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.4)' }} onClick={onClose}/>
      <div style={{ position:'relative', width:800, height:660, background:WmC.white, borderRadius:3, boxShadow:'0 8px 32px rgba(0,0,0,0.18)', display:'flex', flexDirection:'column', overflow:'hidden' }}>

        {/* Modal header */}
        <div style={{ padding:'16px 20px', borderBottom:`1px solid ${WmC.border}`, display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
          <span style={{ fontSize:16, fontWeight:700, color:WmC.text }}>新增項目</span>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:WmC.textMuted, display:'flex', alignItems:'center' }}><WmIcClose/></button>
        </div>

        <div style={{ flex:1, overflowY:'auto', padding:'20px 24px' }}>
          {/* Type grid */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, marginBottom:selType ? 8 : 20 }}>
            {WM_TYPES.map(t => (
              <div key={t.id} onClick={()=>{ setSelType(t.id); setSelected([]); setCatFilter(null); setSearch(''); }}
                style={{ padding:'12px 8px 10px', cursor:'pointer', fontSize:13, fontWeight:500, textAlign:'center',
                  color:selType===t.id ? t.color : WmC.textSub,
                  border:`1.5px solid ${selType===t.id ? t.color : WmC.border}`,
                  background:selType===t.id ? t.bg : WmC.white,
                  transition:'all .15s', display:'flex', flexDirection:'column', alignItems:'center', gap:6,
                }}>
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none" style={{ flexShrink:0 }}>
                  <path d={t.icon} stroke={selType===t.id ? t.color : WmC.textMuted} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {t.label}
              </div>
            ))}
          </div>

          {/* Type description */}
          {selType && (
            <div style={{ padding:'10px 12px', background:'#ECF5FF', border:'1px solid #B3D8FF', fontSize:13, color:'#606266', marginBottom:16, lineHeight:1.8 }}>
              {WM_TYPE_DESC[selType]}
            </div>
          )}

          {/* Group name */}
          {selType==='group' && (
            <div style={{ marginBottom:16 }}>
              <label style={{ display:'block', fontSize:14, fontWeight:500, color:WmC.textSub, marginBottom:6 }}>
                <span style={{ color:WmC.danger,marginRight:2 }}>*</span>群組名稱
              </label>
              <input value={groupName} onChange={e=>{ setGroupName(e.target.value); setErrors(p=>({...p,groupName:false})); }} placeholder="輸入前台顯示的群組文字"
                style={{ width:'100%', height:36, padding:'0 10px', border:`1px solid ${errors.groupName?WmC.danger:WmC.border}`, borderRadius:0, fontSize:14, fontFamily:'Noto Sans TC,sans-serif', outline:'none' }}/>
              {errors.groupName && <div style={{ fontSize:12, color:WmC.danger, marginTop:4 }}>請填寫群組名稱</div>}
            </div>
          )}

          {/* Custom link */}
          {selType==='link' && (
            <div style={{ marginBottom:16, display:'flex', flexDirection:'column', gap:10 }}>
              {[{ label:'連結名稱', val:linkName, set:setLinkName, ph:'顯示於前台的名稱', errKey:'linkName' },
                { label:'連結網址', val:linkUrl,  set:setLinkUrl,  ph:'https://...',       errKey:'linkUrl'  }].map(f=>(
                <div key={f.label}>
                  <label style={{ display:'block', fontSize:14, fontWeight:500, color:WmC.textSub, marginBottom:5 }}>
                    <span style={{ color:WmC.danger,marginRight:2 }}>*</span>{f.label}
                  </label>
                  <input value={f.val} onChange={e=>{ f.set(e.target.value); setErrors(p=>({...p,[f.errKey]:false})); }} placeholder={f.ph}
                    style={{ width:'100%', height:36, padding:'0 10px', border:`1px solid ${errors[f.errKey]?WmC.danger:WmC.border}`, borderRadius:0, fontSize:14, fontFamily:'Noto Sans TC,sans-serif', outline:'none' }}/>
                  {errors[f.errKey] && <div style={{ fontSize:12, color:WmC.danger, marginTop:4 }}>此欄位為必填</div>}
                </div>
              ))}
            </div>
          )}

          {/* Two-step progress indicator */}
          {(selType==='article-page'||selType==='product-page') && (
            <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:13, marginBottom:12 }}>
              <span style={{ display:'flex', alignItems:'center', gap:4, fontWeight:!catFilter?600:400, color:!catFilter?WmC.blue:WmC.textMuted }}>
                <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:18, height:18, borderRadius:'50%', background:!catFilter?WmC.blue:WmC.border, color:'#fff', fontSize:11, fontWeight:700 }}>1</span>
                選擇分類
              </span>
              <span style={{ color:WmC.border }}>—</span>
              <span style={{ display:'flex', alignItems:'center', gap:4, fontWeight:catFilter?600:400, color:catFilter?WmC.blue:WmC.textMuted }}>
                <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:18, height:18, borderRadius:'50%', background:catFilter?WmC.blue:WmC.border, color:'#fff', fontSize:11, fontWeight:700 }}>2</span>
                {selType==='article-page'?'選擇文章':'選擇產品'}
              </span>
            </div>
          )}

          {/* Category step */}
          {needsCatStep && (
            <div style={{ marginBottom:16 }}>
              <div style={{ fontSize:14, fontWeight:500, color:WmC.textSub, marginBottom:8 }}>選擇分類</div>
              {(selType==='article-page' ? WM_ARTICLE_CATS : WM_PRODUCT_CATS).map(cat=>(
                <div key={cat.id} onClick={()=>setCatFilter(cat.id)}
                  style={{ display:'flex', justifyContent:'space-between', padding:'9px 12px', cursor:'pointer', fontSize:14, color:WmC.text, border:`1px solid ${WmC.border}`, marginBottom:4, background:WmC.white }}
                  onMouseEnter={e=>e.currentTarget.style.background=WmC.selectBg}
                  onMouseLeave={e=>e.currentTarget.style.background=WmC.white}
                >
                  <span>{cat.name}</span>
                  <span style={{ fontSize:14,color:WmC.textMuted }}>{cat.count} 筆 →</span>
                </div>
              ))}
            </div>
          )}

          {/* Search (after cat selected) */}
          {needsSearch && (
            <div style={{ marginBottom:10 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                <button onClick={()=>{ setCatFilter(null); setSelected([]); setSearch(''); }}
                  style={{ background:'none', border:'none', cursor:'pointer', color:WmC.blue, fontSize:14, padding:0 }}>← 返回分類</button>
              </div>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="搜尋關鍵字..."
                style={{ width:'100%', height:32, padding:'0 10px', border:`1px solid ${WmC.border}`, borderRadius:0, fontSize:14, fontFamily:'Noto Sans TC,sans-serif', outline:'none' }}/>
            </div>
          )}

          {/* Checkbox list with select-all */}
          {selType && !['group','link'].includes(selType) && !needsCatStep && (
            <div style={{ marginBottom:16 }}>
              {/* Select-all header row */}
              {selList.length > 0 && (
                <label style={{
                  display:'flex', alignItems:'center', gap:8,
                  padding:'8px 12px', cursor:'pointer', fontSize:14, fontWeight:500,
                  background:'#FAFBFC', border:`1px solid ${WmC.border}`,
                  borderBottom:'none',
                }}>
                  <input
                    type="checkbox"
                    checked={selList.length > 0 && selList.every(i => selected.includes(i.id))}
                    ref={el => { if (el) el.indeterminate = selected.length > 0 && !selList.every(i => selected.includes(i.id)); }}
                    onChange={() => {
                      const allIds = selList.map(i => i.id);
                      const allSelected = allIds.every(id => selected.includes(id));
                      setSelected(allSelected ? selected.filter(id => !allIds.includes(id)) : [...new Set([...selected, ...allIds])]);
                    }}
                    style={{ accentColor:WmC.blue, flexShrink:0 }}
                  />
                  <span style={{ color:WmC.text }}>全選</span>
                  {selected.length > 0 && (
                    <span style={{ marginLeft:'auto', fontSize:14, color:WmC.blue, fontWeight:400 }}>
                      已選 {selected.length} / {selList.length} 項
                    </span>
                  )}
                </label>
              )}
              <div style={{ border:`1px solid ${WmC.border}`, maxHeight:280, overflowY:'auto' }}>
                {selList.map((item,idx)=>{
                  const id=item.id; const name=item.name||item.title; const chk=selected.includes(id);
                  return (
                    <label key={id} style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 12px', cursor:'pointer', fontSize:14, borderBottom:idx<selList.length-1?`1px solid ${WmC.border}`:'none', background:chk?WmC.selectBg:WmC.white }}>
                      <input type="checkbox" checked={chk} onChange={()=>toggleSel(id)} style={{ accentColor:WmC.blue,flexShrink:0 }}/>
                      <span style={{ flex:1,color:WmC.text }}>{name}</span>
                      {item.count!==undefined && <span style={{ fontSize:14,color:WmC.textMuted }}>{item.count} 筆</span>}
                    </label>
                  );
                })}
                {selList.length===0 && <div style={{ padding:'20px',textAlign:'center',fontSize:14,color:WmC.textMuted }}>無符合項目</div>}
              </div>
            </div>
          )}

          {/* 加入到 */}
          {selType && (
            <div>
              <label style={{ display:'block', fontSize:14, fontWeight:500, color:WmC.textSub, marginBottom:6 }}>加入到</label>
              <select value={addTo} onChange={e=>setAddTo(e.target.value)}
                style={{ width:'100%', height:36, padding:'0 10px', border:`1px solid ${WmC.border}`, borderRadius:0, fontSize:14, fontFamily:'Noto Sans TC,sans-serif', background:WmC.white, outline:'none', cursor:'pointer' }}>
                <option value="root">直接放在選單列上（頂層）</option>
                {topItems.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
          )}
        </div>

        {/* Modal footer */}
        <div style={{ padding:'12px 20px', borderTop:`1px solid ${WmC.border}`, display:'flex', flexShrink:0 }}>
          <button onClick={handleAdd} style={{ ...sharedBtns.create, borderRadius:0, flex:1, height:38 }}>新增至選單</button>
        </div>
      </div>
    </div>
  );
}

// ─── Onboarding Modal ─────────────────────────────────────────────────────────
function WmOnboarding({ onDone, onStartAdd }) {
  const [step, setStep] = React.useState(0);

  const steps = [
    {
      title: '歡迎使用選單管理',
      subtitle: '設定網站前台上方導覽列的項目與順序',
      illus: (
        <div style={{ background:'#1a1a2e', borderRadius:4, padding:'12px 16px', marginBottom:4 }}>
          <div style={{ display:'flex', gap:0, alignItems:'center' }}>
            {['首頁','關於我們','產品介紹','聯絡我們'].map((item,i)=>(
              <div key={i} style={{ padding:'8px 14px', fontSize:13, color: i===2?'#fff':'rgba(255,255,255,0.4)', fontWeight:i===2?600:400, borderBottom:i===2?'2px solid #409EFF':'2px solid transparent' }}>{item}</div>
            ))}
          </div>
        </div>
      ),
      desc: '你在這裡建立的每一個項目，都會出現在網站上方的導覽列。訪客透過這些連結瀏覽你的網站內容。',
    },
    {
      title: '新增你的第一個選單項目',
      subtitle: '選擇項目類型，加入導覽連結',
      illus: (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:6 }}>
          {[
            { label:'群組', color:'#909399', bg:'#F5F5F5', icon:'M2 4h10M2 7h10M2 10h6' },
            { label:'自訂連結', color:'#E6A23C', bg:'#FDF6EC', icon:'M5.5 8.5 4 10a2.5 2.5 0 0 0 3.5 3.5l2-2M8.5 5.5 10 4a2.5 2.5 0 0 1 3.5 3.5l-2 2' },
            { label:'文章列表', color:'#409EFF', bg:'#ECF5FF', icon:'M3 3h8v2H3zM3 7h8M3 10h5' },
            { label:'產品列表', color:'#67C23A', bg:'#F0F9EB', icon:'M1.5 1.5h4v4h-4zM8.5 1.5h4v4h-4zM1.5 8.5h4v4h-4zM8.5 8.5h4v4h-4z' },
          ].map(t=>(
            <div key={t.label} style={{ padding:'10px 6px', background:t.bg, border:`1.5px solid ${t.color}44`, borderRadius:2, textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:5 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d={t.icon} stroke={t.color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontSize:11, color:t.color, fontWeight:500 }}>{t.label}</span>
            </div>
          ))}
        </div>
      ),
      desc: '共有 8 種項目類型可選擇，包含產品列表、文章、表單、外部連結等。每種類型選擇後都有白話說明，不確定的話先選「自訂連結」最簡單。',
    },
    {
      title: '排序、設定、發布',
      subtitle: '三個動作完成選單建立',
      illus: (
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {/* 1. 拖曳排序 — 顯示實際六點圖示 */}
          <div style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 12px', background:'#F5F7FA', border:'1px solid #DCDFE6', borderRadius:2 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink:0, outline:'2px solid #409EFF', outlineOffset:2, borderRadius:2 }}>
              <circle cx="4.5" cy="3.5"  r="1" fill="#409EFF"/><circle cx="9.5" cy="3.5"  r="1" fill="#409EFF"/>
              <circle cx="4.5" cy="7"    r="1" fill="#409EFF"/><circle cx="9.5" cy="7"    r="1" fill="#409EFF"/>
              <circle cx="4.5" cy="10.5" r="1" fill="#409EFF"/><circle cx="9.5" cy="10.5" r="1" fill="#409EFF"/>
            </svg>
            <span style={{ fontSize:12, color:'#303133', fontWeight:500 }}>拖曳排序</span>
            <span style={{ fontSize:11, color:'#909399' }}>— 拖曳每列左側的六點圖示調整順序</span>
          </div>
          {/* 2. 點名稱編輯 — 顯示節點列 + 點擊游標 */}
          <div style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 12px', background:'#ECF5FF', border:'1px solid #B3D8FF', borderRadius:2 }}>
            <span style={{ fontSize:13, color:'#409EFF', fontWeight:500, borderBottom:'1px dashed #409EFF', cursor:'pointer' }}>關於我們</span>
            <span style={{ fontSize:14, color:'#409EFF' }}>↖</span>
            <span style={{ fontSize:12, color:'#303133', fontWeight:500 }}>點擊名稱編輯</span>
            <span style={{ fontSize:11, color:'#909399' }}>— 點項目名稱開啟右側設定面板</span>
          </div>
          {/* 3. 發布生效 — 顯示實際橙色橫幅 */}
          <div style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 12px', background:'#FDF6EC', border:'1px solid #F5DAB1', borderRadius:2 }}>
            <span style={{ fontSize:11, color:'#906006', flex:1 }}>選單有未發布的變更...</span>
            <span style={{ fontSize:11, fontWeight:600, color:'#fff', background:'#409EFF', padding:'3px 10px', borderRadius:2 }}>立即發布</span>
          </div>
        </div>
      ),
      desc: '建立完項目後，拖曳六點圖示調整順序，點擊名稱在右側編輯設定，最後點「立即發布」讓訪客看到更新後的選單。',
    },
  ];

  const cur = steps[step];
  const isLast = step === steps.length - 1;

  return (
    <div style={{ position:'fixed', inset:0, zIndex:3000, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.45)' }} onClick={onDone}/>
      <div style={{ position:'relative', width:520, background:'#fff', borderRadius:4, boxShadow:'0 12px 40px rgba(0,0,0,0.18)', overflow:'hidden' }}>

        {/* Progress bar */}
        <div style={{ height:3, background:'#EBEEF5' }}>
          <div style={{ height:3, background:'#409EFF', width:`${((step+1)/steps.length)*100}%`, transition:'width .3s' }}/>
        </div>

        <div style={{ padding:'28px 32px' }}>
          {/* Step indicator */}
          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:12 }}>
            {steps.map((_,i)=>(
              <div key={i} style={{ width:i===step?20:8, height:8, borderRadius:4, background:i===step?'#409EFF':i<step?'#67C23A':'#DCDFE6', transition:'all .3s' }}/>
            ))}
            <span style={{ marginLeft:4, fontSize:12, color:'#909399' }}>{step+1} / {steps.length}</span>
          </div>

          {/* Title */}
          <div style={{ fontSize:18, fontWeight:700, color:'#303133', marginBottom:4 }}>{cur.title}</div>
          <div style={{ fontSize:13, color:'#909399', marginBottom:20 }}>{cur.subtitle}</div>

          {/* Illustration */}
          <div style={{ marginBottom:20 }}>{cur.illus}</div>

          {/* Description */}
          <div style={{ fontSize:14, color:'#606266', lineHeight:1.8, padding:'12px 14px', background:'#F5F7FA', borderRadius:2 }}>
            {cur.desc}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding:'14px 32px 24px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <button onClick={onDone} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#909399', padding:0 }}>略過引導</button>
          <div style={{ display:'flex', gap:8 }}>
            {step > 0 && (
              <button onClick={()=>setStep(s=>s-1)} style={{ ...sharedBtns.plain, height:36, borderRadius:0, fontSize:14, padding:'0 18px' }}>上一步</button>
            )}
            {isLast ? (
              <button onClick={()=>{ onDone(); onStartAdd(); }} style={{ ...sharedBtns.primary, height:36, borderRadius:0, fontSize:14, padding:'0 22px' }}>新增第一個項目</button>
            ) : (
              <button onClick={()=>setStep(s=>s+1)} style={{ ...sharedBtns.primary, height:36, borderRadius:0, fontSize:14, padding:'0 22px' }}>
                下一步 →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Empty language state ─────────────────────────────────────────────────────
function WmEmptyLang({ lang, menus, onCopy }) {
  const curLabel = WM_LANG_LABEL[lang] || lang;
  const srcLang  = WM_LANGS.find(l => l.id !== lang && (menus[l.id]||[]).length > 0);
  return (
    <div style={{ padding:'40px 24px', textAlign:'center', color:WmC.textMuted, fontSize:14 }}>
      <div style={{ fontSize:14, fontWeight:500, color:WmC.textSub, marginBottom:8 }}>
        {curLabel} 版選單尚未建立
      </div>
      {srcLang ? (
        <div>
          <div style={{ fontSize:13, marginBottom:20, lineHeight:1.8 }}>
            其他語系的設定不受影響。<br/>
            你可以從「{srcLang.label}」版本複製整體架構，再個別調整顯示名稱。
          </div>
          <button
            onClick={()=>onCopy(srcLang.id)}
            style={{ ...sharedBtns.create, borderRadius:0, fontSize:14, height:36, padding:'0 20px', display:'inline-flex', alignItems:'center', gap:6 }}>
            從「{srcLang.label}」複製架構
          </button>
          <div style={{ fontSize:12, color:WmC.textMuted, marginTop:10 }}>複製後所有項目預設為隱藏，可逐一開啟</div>
        </div>
      ) : (
        <div style={{ fontSize:13 }}>點擊上方「新增項目」按鈕開始建立</div>
      )}
    </div>
  );
}

// ─── Tree node row ────────────────────────────────────────────────────────────
function WmTreeNode({ node, depth, selectedId, expanded, onToggle, onSelect, onDelete, onToggleVis, onToggleMode, onAddChild, draggingId, dragOver, onDragStart, onDragOver, onDragLeave, onDrop, onDragEnd }) {
  const tc       = TYPE_MAP[node.type] || { label:node.type, color:WmC.textMuted, bg:WmC.bg };
  const hasKids  = node.children && node.children.length > 0;
  const isOpen   = expanded[node.id];
  const isActive = selectedId === node.id;
  const pl       = 12 + depth * 22;
  const isDragging  = draggingId === node.id;
  const isOverBefore = dragOver?.id === node.id && dragOver?.pos === 'before';
  const isOverAfter  = dragOver?.id === node.id && dragOver?.pos === 'after';

  const sharedDragProps = {
    draggable: true,
    onDragStart: e => { e.stopPropagation(); onDragStart(node.id, e); },
    onDragOver:  e => { e.preventDefault(); e.stopPropagation(); onDragOver(node.id, e); },
    onDragLeave: e => { e.stopPropagation(); onDragLeave(); },
    onDrop:      e => { e.preventDefault(); e.stopPropagation(); onDrop(node.id); },
    onDragEnd:   e => { e.stopPropagation(); onDragEnd(); },
  };

  return (
    <div style={{ position:'relative' }}>

      {/* Drop indicator — before */}
      {isOverBefore && (
        <div style={{ position:'absolute', top:0, left:pl, right:0, height:2, background:WmC.blue, zIndex:10, pointerEvents:'none' }}/>
      )}

      <div
        {...sharedDragProps}
        style={{
          display:'flex', alignItems:'center', gap:6,
          paddingLeft:pl, paddingRight:10, height:48,
          background: isActive ? WmC.selectBg : WmC.white,
          borderLeft:`2px solid ${isActive ? WmC.blue : 'transparent'}`,
          borderBottom:`1px solid ${WmC.border}`,
          opacity: isDragging ? 0.35 : 1,
          transition:'opacity .15s, background .12s',
          cursor: 'grab',
        }}
        onMouseEnter={e=>{ if(!isActive && !isDragging) e.currentTarget.style.background='#F5F7FA'; }}
        onMouseLeave={e=>{ if(!isActive) e.currentTarget.style.background=isActive?WmC.selectBg:WmC.white; }}
      >
        <WmIcDrag/>

        <span onClick={e=>{ e.stopPropagation(); if(hasKids) onToggle(node.id); }}
          style={{ color:WmC.textMuted, display:'flex', flexShrink:0, padding:2, cursor:hasKids?'pointer':'default', visibility:hasKids?'visible':'hidden' }}>
          <WmIcChevron open={isOpen}/>
        </span>

        {/* Name */}
        <span onClick={()=>onSelect(node.id)}
          style={{ flex:1, fontSize:14, fontWeight:isActive?500:400,
            color: !node.visible ? WmC.textMuted : isActive ? WmC.blue : WmC.text,
            cursor:'pointer', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
            textDecoration:!node.visible?'line-through':'none',
          }}>
          {node.name}
        </span>

        {/* Type badge */}
        <span style={{ fontSize:14, padding:'2px 6px', background:tc.bg, color:tc.color, flexShrink:0, whiteSpace:'nowrap' }}>
          {tc.label}
        </span>

        {/* Visibility toggle */}
        <button onClick={e=>{ e.stopPropagation(); onToggleVis(node.id); }}
          title={node.visible?'前台可見（點擊隱藏）':'前台隱藏（點擊顯示）'}
          style={{ background:'none', border:'none', cursor:'pointer', color:node.visible?WmC.textMuted:WmC.warning, display:'flex', alignItems:'center', padding:3, flexShrink:0 }}>
          <WmIcEye off={!node.visible} size={15}/>
        </button>

        {/* Add child — 最多第三層，depth 2 以上不顯示 */}
        {depth < 2 && (
          <button onClick={e=>{ e.stopPropagation(); onAddChild(node.id); }}
            title="新增子項目" style={{ background:'none', border:'none', cursor:'pointer', color:WmC.blue, display:'flex', alignItems:'center', padding:3, flexShrink:0 }}>
            <WmIcPlus size={13}/>
          </button>
        )}

        {/* Delete */}
        <button onClick={e=>{ e.stopPropagation(); onDelete(node.id); }}
          style={{ background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', padding:3, flexShrink:0, opacity:0.7 }}
          onMouseEnter={e=>e.currentTarget.style.opacity='1'}
          onMouseLeave={e=>e.currentTarget.style.opacity='0.7'}>
          <WmIcTrash/>
        </button>
      </div>

      {/* Drop indicator — after */}
      {isOverAfter && (
        <div style={{ position:'absolute', bottom:0, left:pl, right:0, height:2, background:WmC.blue, zIndex:10, pointerEvents:'none' }}/>
      )}

      {hasKids && isOpen && node.children.map(child=>(
        <WmTreeNode key={child.id} node={child} depth={depth+1}
          selectedId={selectedId} expanded={expanded} onToggle={onToggle} onSelect={onSelect}
          onDelete={onDelete} onToggleVis={onToggleVis} onToggleMode={onToggleMode} onAddChild={onAddChild}
          draggingId={draggingId} dragOver={dragOver}
          onDragStart={onDragStart} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop} onDragEnd={onDragEnd}/>
      ))}
    </div>
  );
}

// ─── Right: Settings panel ────────────────────────────────────────────────────
function WmSettingsPanel({ node, onSave }) {
  const [tab,     setTab]     = React.useState('basic');
  const [name,    setName]    = React.useState(node.name);
  const [url,     setUrl]     = React.useState(node.url||'');
  const [visible, setVisible] = React.useState(node.visible!==false);
  const [mode,    setMode]    = React.useState(node.openMode||'same');
  const [desc,    setDesc]    = React.useState(node.desc||'');
  const [seoTitle,setSeoTitle]= React.useState(node.seoTitle||'');
  const [seoDec,  setSeoDec]  = React.useState(node.seoDec||'');

  React.useEffect(()=>{ setName(node.name); setUrl(node.url||''); setVisible(node.visible!==false); setMode(node.openMode||'same'); setDesc(node.desc||''); setSeoTitle(node.seoTitle||''); setSeoDec(node.seoDec||''); }, [node.id]);

  const tc = TYPE_MAP[node.type]||{ label:node.type, color:WmC.textMuted, bg:WmC.bg };
  const showRight = tab === 'basic';
  const hasPageDesign = !['article-page','product-page','form'].includes(node.type);
  const cfgMap = {
    'article-page': { label:'文章管理', desc:'此項目連結至文章內容頁，頁面版面由文章管理模組控制。' },
    'product-page': { label:'產品中心', desc:'此項目連結至產品內容頁，頁面版面由產品中心模組控制。' },
    'form':         { label:'表單管理', desc:'此項目連結至表單頁面，表單欄位與設計由表單管理模組控制。' },
  };
  const linkedCfg = cfgMap[node.type];

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', overflow:'hidden' }}>

      {/* Header: node name + tabs split */}
      <div style={{ borderBottom:`1px solid ${WmC.border}`, flexShrink:0 }}>
        {/* Title row */}
        <div style={{ display:'flex', alignItems:'center', gap:10, padding:'14px 24px 8px' }}>
          <h2 style={{ fontSize:16, fontWeight:700, color:WmC.text }}>{node.name}</h2>
          <span style={{ fontSize:13, padding:'2px 8px', background:tc.bg, color:tc.color, border:`1px solid ${tc.color}22` }}>{tc.label}</span>
        </div>
        {/* Tab row: left 55% tabs + right 45% placeholder */}
        <div style={{ display:'flex' }}>
          <div style={{ flex:`0 0 ${showRight?'55%':'100%'}`, display:'flex', padding:'0 8px' }}>
            {[{ id:'basic',label:'基本設定' },{ id:'seo',label:'網頁 SEO' }].map(t=>(
              <div key={t.id} onClick={()=>setTab(t.id)} style={{
                padding:'12px 16px', display:'flex', alignItems:'center',
                fontSize:14, cursor:'pointer', userSelect:'none',
                color:tab===t.id?WmC.blue:'#606266',
                borderBottom:`2px solid ${tab===t.id?WmC.blue:'transparent'}`,
                marginBottom:-1, fontWeight:tab===t.id?600:400,
              }}>{t.label}</div>
            ))}
          </div>
          {showRight && <div style={{ flex:'0 0 45%' }}/>}
        </div>
      </div>

      {/* Content: two-column (basic) or full-width (seo) */}
      <div style={{ flex:1, display:'flex', overflow:'hidden' }}>

        {/* Left column — form */}
        <div style={{ flex:`0 0 ${showRight?'55%':'100%'}`, overflowY:'auto', padding:24 }}>

          {tab==='basic' && (
            <div>
              {/* Linked-content banner */}
              {linkedCfg && (
                <div style={{ background:'#ECF5FF', border:'1px solid #B3D8FF', padding:'14px 16px', marginBottom:24, display:'flex', gap:12, alignItems:'flex-start' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink:0, marginTop:1 }}>
                    <circle cx="9" cy="9" r="8" stroke="#409EFF" strokeWidth="1.5" fill="none"/>
                    <line x1="9" y1="8" x2="9" y2="13" stroke="#409EFF" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="9" cy="5.5" r="0.9" fill="#409EFF"/>
                  </svg>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:500, color:'#303133', marginBottom:6 }}>此類型由「{linkedCfg.label}」管理</div>
                    <div style={{ fontSize:14, color:'#606266', lineHeight:1.7, marginBottom:12 }}>
                      {linkedCfg.desc}<br/>在此僅設定選單顯示名稱、網址與可見度等屬性。
                    </div>
                    <button onClick={()=>{ alert(`（Prototype）前往 ${linkedCfg.label} 編輯此內容頁`); }}
                      style={{ ...sharedBtns.create, height:36, borderRadius:0, fontSize:14, display:'inline-flex', alignItems:'center', gap:6 }}>
                      前往 {linkedCfg.label} 編輯
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M4.5 2.5H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V9m0-5.5h2.5V6M10.5 2.5L6 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                </div>
              )}

              {/* 標題 */}
              <div style={{ marginBottom:20 }}>
                <label style={{ display:'block', fontSize:14, fontWeight:500, color:WmC.textSub, marginBottom:6 }}>標題</label>
                <input value={name} onChange={e=>setName(e.target.value)}
                  style={{ width:'100%', height:38, padding:'0 10px', border:`1px solid ${WmC.border}`, borderRadius:0, fontSize:14, fontFamily:'Noto Sans TC,sans-serif', color:WmC.text, outline:'none' }}/>
              </div>

              {/* 自訂網址 */}
              <div style={{ marginBottom:20 }}>
                <label style={{ display:'block', fontSize:14, fontWeight:500, color:WmC.textSub, marginBottom:6 }}>
                  自訂網址 <span style={{ fontWeight:400, fontSize:13, color:WmC.textMuted }}>（留空使用系統自動生成）</span>
                </label>
                <div style={{ display:'flex', alignItems:'center' }}>
                  <div style={{ padding:'0 12px', height:38, background:'#F5F7FA', border:`1px solid ${WmC.border}`, borderRight:'none', display:'flex', alignItems:'center', fontSize:13, color:WmC.textMuted, whiteSpace:'nowrap', flexShrink:0 }}>
                    https://domain.com/
                  </div>
                  <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="about-us"
                    style={{ flex:1, height:38, padding:'0 10px', border:`1px solid ${WmC.border}`, borderRight:'none', borderRadius:0, fontSize:14, fontFamily:'Noto Sans TC,sans-serif', color:WmC.text, outline:'none' }}
                    onFocus={e=>e.target.style.borderColor=WmC.blue}
                    onBlur={e=>e.target.style.borderColor=WmC.border}/>
                  <button style={{ ...sharedBtns.plain, height:38, borderRadius:0, padding:'0 14px', fontSize:13, borderLeft:'none', flexShrink:0 }}>編輯</button>
                </div>
              </div>

              {/* 前台可見度 */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 14px', border:`1px solid ${WmC.border}`, marginBottom:20 }}>
                <div>
                  <div style={{ fontSize:14, fontWeight:500, color:WmC.text }}>前台可見度</div>
                  <div style={{ fontSize:13, color:WmC.textMuted, marginTop:2 }}>僅影響選單顯示；直接輸入網址仍可瀏覽</div>
                </div>
                <Switch checked={visible} onChange={setVisible}/>
              </div>

              {/* 開啟方式 */}
              <div style={{ marginBottom:20 }}>
                <div style={{ fontSize:14, fontWeight:500, color:WmC.textSub, marginBottom:8 }}>開啟方式</div>
                {[{ v:'same',label:'換頁',desc:'在相同視窗開啟' },{ v:'new',label:'另開新視窗',desc:'以新分頁開啟連結' }].map(opt=>(
                  <label key={opt.v} onClick={()=>setMode(opt.v)} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', border:`1px solid ${mode===opt.v?WmC.blue:WmC.border}`, background:mode===opt.v?WmC.selectBg:WmC.white, marginBottom:8, cursor:'pointer', transition:'all .15s' }}>
                    <div style={{ width:16,height:16,borderRadius:'50%',border:`2px solid ${mode===opt.v?WmC.blue:WmC.border}`,background:mode===opt.v?WmC.blue:'transparent',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center' }}>
                      {mode===opt.v && <div style={{ width:6,height:6,borderRadius:'50%',background:'#fff' }}/>}
                    </div>
                    <div>
                      <div style={{ fontSize:14, fontWeight:mode===opt.v?500:400, color:mode===opt.v?WmC.blue:WmC.text }}>{opt.label}</div>
                      <div style={{ fontSize:13, color:WmC.textMuted }}>{opt.desc}</div>
                    </div>
                  </label>
                ))}
              </div>

              {/* 列表圖片 */}
              <div style={{ marginBottom:20 }}>
                <label style={{ display:'block', fontSize:14, fontWeight:500, color:WmC.textSub, marginBottom:6 }}>列表圖片</label>
                <div style={{ border:`1.5px dashed ${WmC.border}`, padding:'20px', textAlign:'center', cursor:'pointer', background:'#FAFBFC' }}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=WmC.blue}
                  onMouseLeave={e=>e.currentTarget.style.borderColor=WmC.border}>
                  <div style={{ fontSize:13,color:WmC.textMuted }}>點擊上傳或拖曳圖片至此</div>
                  <div style={{ fontSize:12,color:WmC.textMuted,marginTop:4 }}>建議 800×450，JPG / PNG / WebP</div>
                </div>
              </div>

              {/* 列表簡介 */}
              <div>
                <label style={{ display:'block', fontSize:14, fontWeight:500, color:WmC.textSub, marginBottom:6 }}>列表簡介</label>
                <textarea value={desc} onChange={e=>setDesc(e.target.value)} rows={4} placeholder="選填，顯示於選單列表頁的項目簡介"
                  style={{ width:'100%', padding:'8px 10px', border:`1px solid ${WmC.border}`, borderRadius:0, fontSize:14, fontFamily:'Noto Sans TC,sans-serif', resize:'none', outline:'none' }}/>
              </div>
            </div>
          )}

          {tab==='seo' && (
            <div style={{ maxWidth:560 }}>
              <div style={{ padding:'11px 14px', background:'#F5F7FA', border:`1px solid ${WmC.border}`, marginBottom:20, fontSize:13, color:WmC.textSub, lineHeight:1.8 }}>
                這裡設定的內容會出現在 Google 搜尋結果中。若不填，系統會自動使用頁面名稱與摘要，<strong>不影響網站正常運作</strong>。
              </div>
              {[
                { key:'title',label:'SEO 標題',val:seoTitle,set:setSeoTitle,ph:'留空將使用頁面標題',limit:60,min:30 },
                { key:'desc', label:'SEO 描述',val:seoDec,  set:setSeoDec,  ph:'留空將使用頁面摘要',limit:160,min:70, area:true },
              ].map(f=>{
                const len = f.val.length;
                const overLimit = len > f.limit;
                const inRange = len >= f.min && len <= f.limit;
                const countColor = overLimit ? WmC.warning : inRange ? WmC.success : WmC.textMuted;
                return (
                  <div key={f.key} style={{ marginBottom:20 }}>
                    <label style={{ display:'block',fontSize:14,fontWeight:500,color:WmC.textSub,marginBottom:6 }}>{f.label}</label>
                    {f.area
                      ? <textarea value={f.val} onChange={e=>f.set(e.target.value)} rows={4} placeholder={f.ph}
                          style={{ width:'100%',padding:'8px 10px',border:`1px solid ${WmC.border}`,borderRadius:0,fontSize:14,fontFamily:'Noto Sans TC,sans-serif',resize:'none',outline:'none' }}/>
                      : <input value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph}
                          style={{ width:'100%',height:38,padding:'0 10px',border:`1px solid ${WmC.border}`,borderRadius:0,fontSize:14,fontFamily:'Noto Sans TC,sans-serif',color:WmC.text,outline:'none' }}/>
                    }
                    <div style={{ display:'flex', justifyContent:'space-between', marginTop:4 }}>
                      <span style={{ fontSize:12, color:WmC.textMuted }}>建議 {f.min}–{f.limit} 個字元</span>
                      {len > 0 && <span style={{ fontSize:12, color:countColor, fontWeight:500 }}>{len} / {f.limit}{overLimit ? '（已超過建議）' : ''}</span>}
                    </div>
                  </div>
                );
              })}
              <div>
                <label style={{ display:'block',fontSize:14,fontWeight:500,color:WmC.textSub,marginBottom:6 }}>社群分享圖片（OG Image）</label>
                <div style={{ border:`1.5px dashed ${WmC.border}`,padding:'20px',textAlign:'center',cursor:'pointer',background:'#FAFBFC' }}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=WmC.blue}
                  onMouseLeave={e=>e.currentTarget.style.borderColor=WmC.border}>
                  <div style={{ fontSize:13,color:WmC.textMuted }}>點擊上傳 OG 圖片（建議 1200×630）</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right column — preview panel (basic tab only) */}
        {showRight && (
          <div style={{ flex:'0 0 45%', background:'#F5F7FA', padding:'28px 24px 24px', display:'flex', flexDirection:'column', borderLeft:`1px solid ${WmC.border}` }}>
            <div style={{ marginBottom:20 }}>
              <div style={{ fontSize:11, color:WmC.textMuted, marginBottom:4, letterSpacing:1 }}>前台呈現</div>
              <div style={{ fontSize:20, fontWeight:700, color:WmC.text, letterSpacing:0.5, lineHeight:1.2 }}>NAVIGATION PREVIEW</div>
              <div style={{ fontSize:11, color:WmC.textMuted, marginTop:6, lineHeight:1.6 }}>以下為此選單項目在前台導覽列的示意效果<br/>實際樣式依主題設定為準</div>
            </div>

            {/* Nav bar mockup */}
            <div style={{ background:'#1a1a2e', padding:'0 16px', marginBottom:16, display:'flex', alignItems:'center', gap:0, height:44, borderRadius:2, overflow:'hidden' }}>
              {['首頁','關於我們', name||'（未命名）','聯絡我們'].map((item, i) => {
                const isCurrent = i === 2;
                return (
                  <div key={i} style={{
                    padding:'0 14px', height:'100%', display:'flex', alignItems:'center',
                    fontSize:12, color: isCurrent ? '#fff' : 'rgba(255,255,255,0.45)',
                    fontWeight: isCurrent ? 600 : 400,
                    borderBottom: isCurrent ? '2px solid #409EFF' : '2px solid transparent',
                    whiteSpace:'nowrap',
                  }}>{item}</div>
                );
              })}
            </div>

            {/* Visibility indicator */}
            <div style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 14px', background:WmC.white, border:`1px solid ${WmC.border}`, marginBottom:20, borderRadius:2 }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background: visible ? WmC.success : WmC.warning, flexShrink:0 }}/>
              <span style={{ fontSize:13, color:WmC.textSub }}>
                {visible ? '前台可見 — 顯示於導覽列' : '前台隱藏 — 不顯示於導覽列'}
              </span>
            </div>

            {/* 頁面設計 */}
            {hasPageDesign && (
              <div style={{ textAlign:'center' }}>
                <button style={{ ...sharedBtns.plain, padding:'0 28px', height:40, fontSize:14, borderRadius:0 }}>頁面設計</button>
                <div style={{ fontSize:12, color:WmC.textMuted, marginTop:8 }}>使用頁面設計器編輯此頁面的版面</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding:'16px 24px', background:WmC.white, borderTop:`1px solid ${WmC.border}`, display:'flex', justifyContent:'flex-start', gap:8, flexShrink:0 }}>
        <button onClick={()=>onSave(node.id,{ name,url,visible,openMode:mode,desc,seoTitle,seoDec })} style={{ ...sharedBtns.primary,borderRadius:0 }}>儲存設定</button>
        <button onClick={()=>{ setName(node.name); setUrl(node.url||''); setVisible(node.visible!==false); setMode(node.openMode||'same'); setDesc(node.desc||''); setSeoTitle(node.seoTitle||''); setSeoDec(node.seoDec||''); }} style={{ ...sharedBtns.plain,borderRadius:0 }}>取消</button>
      </div>
    </div>
  );
}

// ─── Page component ───────────────────────────────────────────────────────────
function PageWebsiteDesign({ onNavigate, show }) {
  const [menus,         setMenus]         = React.useState(WM_INIT);
  const [langVisible,   setLangVisible]   = React.useState({ zh:true, en:false });
  const [lang,          setLang]          = React.useState('zh');
  const [expanded,      setExpanded]      = React.useState({});
  const [selectedId,    setSelectedId]    = React.useState(null);
  const [modalOpen,     setModalOpen]     = React.useState(false);
  const [showKebab,     setShowKebab]     = React.useState(false);
  const [menuClipboard, setMenuClipboard] = React.useState(null);
  // Drag state
  const [draggingId,  setDraggingId]  = React.useState(null);
  const [dragOver,    setDragOver]    = React.useState(null);
  const [addParent,   setAddParent]   = React.useState(null);
  const [isDirty,        setIsDirty]        = React.useState(false);
  const [showOnboarding, setShowOnboarding] = React.useState(() => {
    const allEmpty = Object.values(WM_INIT).every(arr => arr.length === 0);
    return allEmpty;
  });
  const { show: wmToast, Toast: WmToast } = useToast();

  React.useEffect(() => {
    if (!showKebab) return;
    const close = () => setShowKebab(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [showKebab]);

  const items = menus[lang] || [];
  const selectedNode = selectedId ? wmFind(items, selectedId) : null;

  const wmAllParentIds = (nodes) => nodes.reduce((acc, n) => n.children?.length ? [...acc, n.id, ...wmAllParentIds(n.children)] : acc, []);
  const handleExpandAll  = () => setExpanded(Object.fromEntries(wmAllParentIds(items).map(id=>[id,true])));
  const handleCollapseAll= () => setExpanded({});
  const handleToggle     = id => setExpanded(p=>({...p,[id]:!p[id]}));
  const handleSelect     = id => { setSelectedId(id); if(id) { const n=wmFind(items,id); if(n?.children?.length) setExpanded(p=>({...p,[id]:true})); } };
  const handleDelete = id => {
    const n = wmFind(menus[lang], id);
    const childCount = n?.children?.length || 0;
    if (childCount > 0 && !window.confirm(`刪除「${n.name}」後，底下 ${childCount} 個子項目也會一併移除，確定嗎？`)) return;
    setMenus(p=>({...p,[lang]:wmDelete(p[lang],id)}));
    setIsDirty(true);
    wmToast('項目已移除','info');
    if(selectedId===id) setSelectedId(null);
  };
  const handleToggleVis  = id => {
    const n=wmFind(menus[lang],id);
    if(n) wmToast(n.visible?'已從選單隱藏（頁面仍可透過直接網址訪問）':'已設為顯示','info');
    setMenus(p=>{ const node=wmFind(p[lang],id); return {...p,[lang]:wmUpdate(p[lang],id,{visible:!node.visible})}; });
    setIsDirty(true);
  };
  const handleToggleMode = id => { setMenus(p=>{ const n=wmFind(p[lang],id); return {...p,[lang]:wmUpdate(p[lang],id,{openMode:n.openMode==='new'?'same':'new'})}; }); setIsDirty(true); };
  const handleAddChild   = pid => { setAddParent(pid); setModalOpen(true); };
  const handleSave       = (id,patch) => { setMenus(p=>({...p,[lang]:wmUpdate(p[lang],id,patch)})); setIsDirty(true); wmToast('設定已儲存'); };
  const handlePublish    = () => { setIsDirty(false); wmToast('選單已發布，前台即時更新'); };

  // Drag handlers
  const handleDragStart = (id, e) => {
    setDraggingId(id);
    e.dataTransfer.effectAllowed = 'move';
  };
  const handleDragOver = (id, e) => {
    if (id === draggingId) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos  = e.clientY < rect.top + rect.height / 2 ? 'before' : 'after';
    setDragOver(p => (p?.id === id && p?.pos === pos) ? p : { id, pos });
  };
  const handleDragLeave  = () => setDragOver(null);
  const handleDragEnd    = () => { setDraggingId(null); setDragOver(null); };
  const handleDrop = (dstId) => {
    if (draggingId && dstId && draggingId !== dstId && dragOver) {
      setMenus(p => ({ ...p, [lang]: wmMove(p[lang], draggingId, dstId, dragOver.pos) }));
      setIsDirty(true);
    }
    setDraggingId(null);
    setDragOver(null);
  };

  const handleAdd = (newItems, parentId) => {
    const nodes = newItems.map(i=>({ id:'m'+Date.now()+Math.random().toString(36).slice(2,5), visible:true, openMode:'same', children:[], ...i }));
    setMenus(p=>{
      let updated=[...p[lang]||[]];
      nodes.forEach(n=>{ updated=wmAddChild(updated,parentId,n); });
      return {...p,[lang]:updated};
    });
    setIsDirty(true);
    wmToast(`已新增 ${nodes.length} 個項目`);
  };

  const handleCopyStructure = () => {
    setMenuClipboard(JSON.parse(JSON.stringify(menus[lang]||[])));
    wmToast('選單架構已複製');
  };

  const handleCopyFromLang = (srcId) => {
    const srcMenus = menus[srcId] || [];
    const srcLabel = WM_LANG_LABEL[srcId] || srcId;
    if (!srcMenus.length) { wmToast(`${srcLabel} 選單為空，無法複製`, 'error'); return; }
    const hide = arr => arr.map(n=>({...n, visible:false, children:hide(n.children||[])}));
    setMenus(p=>({...p, [lang]:hide(JSON.parse(JSON.stringify(srcMenus)))}));
    setIsDirty(true);
    wmToast(`已從「${srcLabel}」複製架構（預設全部隱藏，請逐一設定可見度）`);
  };

  const handlePasteStructure = () => {
    if (!menuClipboard) return;
    const hide = arr => arr.map(n=>({...n, visible:false, children:hide(n.children||[])}));
    setMenus(p=>({...p,[lang]:hide(JSON.parse(JSON.stringify(menuClipboard)))}));
    wmToast('選單架構已貼上（預設全部隱藏）');
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%' }}>

      {/* Page title + import/export */}
      <div style={{ marginBottom:16, flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:6 }}>
          <h1 style={{ fontSize:24, fontWeight:700, color:WmC.text }}>選單管理</h1>
          <button onClick={()=>setShowOnboarding(true)} title="開啟使用說明"
            style={{ width:22, height:22, borderRadius:'50%', border:`1.5px solid ${WmC.border}`, background:WmC.white, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:WmC.textMuted, fontSize:12, fontWeight:700, flexShrink:0, lineHeight:1 }}>
            ?
          </button>
          <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:14 }}>
            <span style={{ color:'#C0C4CC' }}>/</span>
            <span style={{ color:WmC.textMuted }}>網站設計</span>
            <span style={{ color:'#C0C4CC' }}>/</span>
            <span style={{ color:WmC.text }}>選單管理</span>
          </div>
          <div style={{ flex:1 }}/>
          {/* Prototype toggle */}
          <div style={{ display:'flex', alignItems:'center', background:'#F5F7FA', border:'1px solid #DCDFE6', borderRadius:3, padding:2, gap:2, fontSize:12 }}>
            <button
              onClick={()=>{ setMenus(WM_EMPTY); setSelectedId(null); setExpanded({}); setIsDirty(false); setShowOnboarding(true); }}
              style={{ padding:'4px 12px', borderRadius:2, border:'none', cursor:'pointer', fontSize:12, fontWeight:500,
                background: Object.values(menus).every(a=>a.length===0) ? '#fff' : 'transparent',
                color:      Object.values(menus).every(a=>a.length===0) ? WmC.blue   : WmC.textMuted,
                boxShadow:  Object.values(menus).every(a=>a.length===0) ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              }}>
              空狀態
            </button>
            <button
              onClick={()=>{ setMenus(WM_DEMO); setSelectedId('wm2'); setExpanded({wm2:true}); setIsDirty(false); setShowOnboarding(false); }}
              style={{ padding:'4px 12px', borderRadius:2, border:'none', cursor:'pointer', fontSize:12, fontWeight:500,
                background: !Object.values(menus).every(a=>a.length===0) ? '#fff' : 'transparent',
                color:      !Object.values(menus).every(a=>a.length===0) ? WmC.blue   : WmC.textMuted,
                boxShadow:  !Object.values(menus).every(a=>a.length===0) ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              }}>
              完整版本
            </button>
          </div>
        {/* Import / Export group */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:4 }}>
          <div style={{ display:'flex', gap:6 }}>
            {/* Import */}
            <label
              title="上傳 .xlsx 備份檔以還原選單。注意：將完整覆蓋當前語系的全部項目，操作無法復原，建議先匯出備份。"
              style={{ ...sharedBtns.plain, height:36, borderRadius:0, display:'inline-flex', alignItems:'center', gap:7, padding:'0 14px', cursor:'pointer', fontSize:14 }}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M7.5 10V3M7.5 10L4.5 7M7.5 10L10.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12.5h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              匯入
              <input type="file" accept=".xlsx,.xls" style={{ display:'none' }} onChange={e => {
                const file = e.target.files?.[0];
                if (!file) return;
                if (file.size > 5 * 1024 * 1024) {
                  wmToast('檔案超過 5 MB，建議確認內容後再匯入', 'warning');
                }
                const reader = new FileReader();
                reader.onerror = () => {
                  wmToast('檔案讀取失敗，請確認檔案未損毀', 'error');
                };
                reader.onload = ev => {
                  try {
                    const wb   = window.XLSX.read(new Uint8Array(ev.target.result), { type:'array' });
                    const ws   = wb.Sheets[wb.SheetNames[0]];
                    const rows = window.XLSX.utils.sheet_to_json(ws, { header:1 });
                    if (rows.length < 2) throw new Error('empty');
                    const typeCode = { '群組':'group','自訂連結':'link','文章列表':'article-list','文章單頁':'article-page','產品列表':'product-list','產品單頁':'product-page','表單':'form','系統單頁':'system-page' };
                    const root  = [];
                    const stack = [{ children: root }];
                    rows.slice(1).forEach(row => {
                      const depth = Number(row[0]) || 1;
                      const node  = {
                        id:       `imp-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,
                        type:     typeCode[row[1]] || String(row[1] || 'group'),
                        name:     String(row[2] || ''),
                        url:      row[3] ? String(row[3]) : undefined,
                        visible:  row[4] !== '隱藏',
                        openMode: row[5] === '另開新視窗' ? 'new' : 'same',
                        children: []
                      };
                      while (stack.length > depth) stack.pop();
                      stack[stack.length - 1].children.push(node);
                      stack.push(node);
                    });
                    const countAll = ns => ns.reduce((a, n) => a + 1 + countAll(n.children || []), 0);
                    setMenus(p => ({ ...p, [lang]: root }));
                    wmToast(`選單已匯入（共 ${countAll(root)} 個節點）`);
                  } catch {
                    wmToast('檔案格式錯誤，請上傳由本系統匯出的 .xlsx 檔案', 'error');
                  }
                };
                reader.readAsArrayBuffer(file);
                e.target.value = '';
              }}/>
            </label>
            {/* Export */}
            <button
              title={`將當前語系（${lang === 'zh' ? '繁中' : 'EN'}）的選單匯出為 .xlsx 檔案。注意：僅匯出此語系，另一語系需切換後另行匯出。`}
              style={{ ...sharedBtns.plain, height:36, borderRadius:0, display:'inline-flex', alignItems:'center', gap:7, padding:'0 14px', fontSize:14 }}
              onClick={() => {
                const nodes    = menus[lang] || [];
                const countAll = ns => ns.reduce((a, n) => a + 1 + countAll(n.children || []), 0);
                const total    = countAll(nodes);
                const date     = new Date().toISOString().slice(0, 10);
                const filename = `menu-${lang}-${date}.xlsx`;
                const typeLabel = { group:'群組', link:'自訂連結', 'article-list':'文章列表', 'article-page':'文章單頁', 'product-list':'產品列表', 'product-page':'產品單頁', form:'表單', 'system-page':'系統單頁' };
                const rows = [['層級', '類型', '名稱', '自訂網址', '前台可見', '開啟方式']];
                const flatten = (ns, depth) => ns.forEach(n => {
                  rows.push([depth, typeLabel[n.type] || n.type, n.name, n.url || '', n.visible ? '顯示' : '隱藏', n.openMode === 'new' ? '另開新視窗' : '換頁']);
                  if (n.children?.length) flatten(n.children, depth + 1);
                });
                flatten(nodes, 1);
                const ws = window.XLSX.utils.aoa_to_sheet(rows);
                const wb = window.XLSX.utils.book_new();
                window.XLSX.utils.book_append_sheet(wb, ws, lang === 'zh' ? '繁中選單' : 'EN選單');
                window.XLSX.writeFile(wb, filename);
                wmToast(`已匯出 ${filename}（共 ${total} 個節點）`);
              }}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M7.5 5V12M7.5 5L4.5 8M7.5 5L10.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12.5h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              匯出
            </button>
          </div>
          <span style={{ fontSize:12, color:'#909399' }}>
            匯入 / 匯出均為 .xlsx · 匯入將覆蓋當前語系，操作無法復原
          </span>
        </div>
        </div>
      </div>

      {/* Unsaved changes banner */}
      {isDirty && (
        <div style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 16px', background:'#FDF6EC', border:'1px solid #F5DAB1', borderRadius:3, marginBottom:12, flexShrink:0 }}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink:0 }}>
            <path d="M7.5 1.5L13.5 12.5H1.5L7.5 1.5Z" stroke="#E6A23C" strokeWidth="1.3" strokeLinejoin="round" fill="none"/>
            <line x1="7.5" y1="6" x2="7.5" y2="9.5" stroke="#E6A23C" strokeWidth="1.3" strokeLinecap="round"/>
            <circle cx="7.5" cy="11" r="0.7" fill="#E6A23C"/>
          </svg>
          <span style={{ fontSize:13, color:'#906006', flex:1 }}>選單有未發布的變更，訪客目前仍看到舊版選單。</span>
          <button onClick={handlePublish} style={{ ...sharedBtns.primary, height:30, borderRadius:0, fontSize:13, padding:'0 16px', flexShrink:0 }}>立即發布</button>
          <button onClick={()=>setIsDirty(false)} style={{ ...sharedBtns.plain, height:30, borderRadius:0, fontSize:13, padding:'0 12px', flexShrink:0 }}>略過</button>
        </div>
      )}


      {/* 4:6 Split pane */}
      <div style={{ display:'flex', gap:16, flex:1, minHeight:0, overflow:'hidden', alignItems:'stretch' }}>

        {/* Left card 40% — tree */}
        <div style={{ flex:'0 0 40%', ...CARD, display:'flex', flexDirection:'column', overflow:'hidden' }}>

          {/* Language tabs row — 僅頁簽，不放控制元件 */}
          <div style={{ borderBottom:`1px solid ${WmC.border}`, flexShrink:0 }}>
            <div style={{ display:'flex', alignItems:'center', padding:'8px 12px 0' }}>
              {WM_LANGS.map(l=>(
                <div key={l.id} onClick={()=>{ setLang(l.id); setSelectedId(null); }}
                  title="各語系選單獨立管理，切換語系不影響另一語系的設定"
                  style={{ padding:'0 14px', height:44, display:'flex', alignItems:'center', fontSize:14, cursor:'pointer', userSelect:'none', flexShrink:0,
                    color:lang===l.id?WmC.blue:WmC.textMuted, borderBottom:`2px solid ${lang===l.id?WmC.blue:'transparent'}`, marginBottom:-1, fontWeight:lang===l.id?500:400 }}>
                  {l.label}
                </div>
              ))}
            </div>
          </div>

          {/* Tree header */}
          <div style={{ padding:'10px 14px', borderBottom:`1px solid ${WmC.border}`, display:'flex', alignItems:'center', justifyContent:'space-between', background:'#FAFBFC', flexShrink:0 }}>
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <span style={{ fontSize:16, fontWeight:700, color:WmC.text }}>選單架構</span>
              {/* Three-dot kebab */}
              <div style={{ position:'relative' }}>
                <button
                  onClick={e=>{ e.stopPropagation(); setShowKebab(k=>!k); }}
                  style={{ height:26, width:28, background:showKebab?'#EBEEF5':'transparent', border:'none', borderRadius:3, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:WmC.textMuted, fontSize:18, letterSpacing:0, lineHeight:1 }}
                  title="更多選項"
                >
                  ⋮
                </button>
                {showKebab && (
                  <div onClick={e=>e.stopPropagation()} style={{ position:'absolute', top:30, left:0, zIndex:500, background:WmC.white, border:`1px solid ${WmC.border}`, boxShadow:'0 4px 12px rgba(0,0,0,0.1)', minWidth:130 }}>
                    <div
                      onClick={()=>{ handleCopyStructure(); setShowKebab(false); }}
                      style={{ padding:'9px 14px', cursor:'pointer', fontSize:13, color:WmC.text }}
                      onMouseEnter={e=>e.currentTarget.style.background='#F5F7FA'}
                      onMouseLeave={e=>e.currentTarget.style.background='transparent'}
                    >
                      複製架構
                    </div>
                    <div
                      onClick={()=>{ if(menuClipboard){ handlePasteStructure(); setShowKebab(false); } }}
                      style={{ padding:'9px 14px', cursor:menuClipboard?'pointer':'default', fontSize:13, color:menuClipboard?WmC.text:WmC.textMuted }}
                      onMouseEnter={e=>{ if(menuClipboard) e.currentTarget.style.background='#F5F7FA'; }}
                      onMouseLeave={e=>{ if(menuClipboard) e.currentTarget.style.background='transparent'; }}
                    >
                      貼上架構
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div
                title={langVisible[lang] ? `「${WM_LANG_LABEL[lang]}」語系選單目前前台可見，點擊可關閉` : `「${WM_LANG_LABEL[lang]}」語系選單目前對前台訪客隱藏，關閉後整個語系選單不顯示`}
                style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, color:WmC.textSub, cursor:'pointer', padding:'3px 8px', border:`1px solid ${WmC.border}`, background:WmC.white, borderRadius:2 }}
                onClick={()=>{ setLangVisible(p=>({...p,[lang]:!p[lang]})); setIsDirty(true); wmToast(langVisible[lang]?`「${WM_LANG_LABEL[lang]}」語系選單已隱藏，前台訪客將看不到整個選單列`:`「${WM_LANG_LABEL[lang]}」語系選單已顯示`,'info'); }}>
                <span style={{ color: langVisible[lang] ? WmC.success : WmC.warning, fontSize:16, lineHeight:1 }}>●</span>
                <span>{WM_LANG_LABEL[lang]}</span>
                <span>{langVisible[lang]?'前台顯示中':'前台已隱藏'}</span>
              </div>
              <button onClick={()=>{ setAddParent(null); setModalOpen(true); }}
                style={{ ...sharedBtns.create, height:30, fontSize:14, borderRadius:0, padding:'0 10px', display:'flex', alignItems:'center', gap:4 }}>
                <WmIcPlus size={11} color="#fff"/>
                新增項目
              </button>
            </div>
          </div>

          <div style={{ padding:'4px 10px', borderBottom:`1px solid ${WmC.border}`, background:'#FAFBFC', display:'flex', alignItems:'center', gap:4, flexShrink:0 }}>
            <button onClick={handleExpandAll} style={{ background:'none', border:'none', cursor:'pointer', fontSize:12, color:WmC.textMuted, padding:'3px 6px', borderRadius:2 }}
              onMouseEnter={e=>e.currentTarget.style.background='#EBEEF5'} onMouseLeave={e=>e.currentTarget.style.background='none'}>
              全部展開
            </button>
            <button onClick={handleCollapseAll} style={{ background:'none', border:'none', cursor:'pointer', fontSize:12, color:WmC.textMuted, padding:'3px 6px', borderRadius:2 }}
              onMouseEnter={e=>e.currentTarget.style.background='#EBEEF5'} onMouseLeave={e=>e.currentTarget.style.background='none'}>
              全部收合
            </button>
            <div style={{ flex:1 }}/>
            <a href="#" onClick={e=>e.preventDefault()} title="在新分頁開啟網站前台確認選單效果"
              style={{ fontSize:12, color:WmC.blue, textDecoration:'none', display:'flex', alignItems:'center', gap:3, padding:'3px 6px' }}
              onMouseEnter={e=>e.currentTarget.style.textDecoration='underline'}
              onMouseLeave={e=>e.currentTarget.style.textDecoration='none'}>
              查看前台
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 8L8 2M5 2h3v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>

          {/* Tree */}
          <div style={{ flex:1, overflowY:'auto' }}>
            {items.length > 0 ? items.map(node=>(
              <WmTreeNode key={node.id} node={node} depth={0}
                selectedId={selectedId} expanded={expanded} onToggle={handleToggle}
                onSelect={handleSelect} onDelete={handleDelete}
                onToggleVis={handleToggleVis} onToggleMode={handleToggleMode} onAddChild={handleAddChild}
                draggingId={draggingId} dragOver={dragOver}
                onDragStart={handleDragStart} onDragOver={handleDragOver}
                onDragLeave={handleDragLeave} onDrop={handleDrop} onDragEnd={handleDragEnd}/>
            )) : (
              <WmEmptyLang lang={lang} menus={menus} onCopy={handleCopyFromLang}/>
            )}

            <div onClick={()=>{ setAddParent(null); setModalOpen(true); }}
              style={{ display:'flex', alignItems:'center', gap:6, padding:'10px 14px', cursor:'pointer', color:WmC.blue, fontSize:14, borderTop:`1px dashed ${WmC.border}` }}
              onMouseEnter={e=>e.currentTarget.style.background=WmC.selectBg}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              <WmIcPlus size={12}/>
              新增主選單項目
            </div>
          </div>
        </div>

        {/* Right card 60% — settings */}
        <div style={{ flex:'0 0 calc(60% - 8px)', ...CARD, display:'flex', flexDirection:'column', overflow:'hidden', minWidth:0 }}>
          {selectedNode
            ? <WmSettingsPanel key={selectedId} node={selectedNode} onSave={handleSave}/>
            : (
              <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 32px', color:WmC.textMuted }}>
                {/* Arrow pointing left */}
                <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:32 }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ opacity:0.15 }}>
                    <rect x="2" y="8" width="44" height="32" rx="3" stroke="#303133" strokeWidth="2.5" fill="none"/>
                    <line x1="2" y1="18" x2="46" y2="18" stroke="#303133" strokeWidth="2"/>
                    <line x1="14" y1="8" x2="14" y2="18" stroke="#303133" strokeWidth="2"/>
                    <path d="M22 30h10M22 30l4-4M22 30l4 4" stroke="#303133" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                <div style={{ fontSize:16, fontWeight:600, color:WmC.textSub, marginBottom:8 }}>點擊左側項目名稱開始編輯</div>
                <div style={{ fontSize:13, color:WmC.textMuted, marginBottom:28, textAlign:'center', lineHeight:1.8 }}>
                  選擇任一選單項目後，在這裡設定<br/>顯示名稱、網址、可見度與 SEO。
                </div>

                {/* Step guide */}
                <div style={{ width:'100%', maxWidth:320, display:'flex', flexDirection:'column', gap:12 }}>
                  {[
                    { step:'1', text:'點擊左側「新增項目」加入導覽連結' },
                    { step:'2', text:'點擊項目名稱，在此處設定各項屬性' },
                    { step:'3', text:'拖曳排序完成後，點擊「立即發布」生效' },
                  ].map(s=>(
                    <div key={s.step} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 14px', background:'#FAFBFC', border:`1px solid ${WmC.border}`, borderRadius:2 }}>
                      <span style={{ width:22, height:22, borderRadius:'50%', background:WmC.blue, color:'#fff', fontSize:12, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{s.step}</span>
                      <span style={{ fontSize:13, color:WmC.textSub }}>{s.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          }
        </div>
      </div>

      {/* Add modal */}
      <WmAddModal open={modalOpen} onClose={()=>setModalOpen(false)} onAdd={handleAdd} topItems={items} defaultParent={addParent} showToast={wmToast}/>

      {showOnboarding && (
        <WmOnboarding
          onDone={()=>setShowOnboarding(false)}
          onStartAdd={()=>{ setAddParent(null); setModalOpen(true); }}
        />
      )}
      <WmToast/>
    </div>
  );
}
