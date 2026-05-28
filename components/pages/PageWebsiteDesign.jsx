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
  { id:'group',        label:'群組',     color:'#909399', bg:'#F5F5F5' },
  { id:'link',         label:'自訂連結', color:'#E6A23C', bg:'#FDF6EC' },
  { id:'article-list', label:'文章列表', color:'#409EFF', bg:'#ECF5FF' },
  { id:'article-page', label:'文章單頁', color:'#409EFF', bg:'#ECF5FF' },
  { id:'product-list', label:'產品列表', color:'#67C23A', bg:'#F0F9EB' },
  { id:'product-page', label:'產品單頁', color:'#67C23A', bg:'#F0F9EB' },
  { id:'form',         label:'表單',     color:'#9B59B6', bg:'#F5EEFB' },
  { id:'system-page',  label:'系統單頁', color:'#303133', bg:'#F5F7FA' },
];
const TYPE_MAP = Object.fromEntries(WM_TYPES.map(t => [t.id, t]));

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
const WM_INIT = {
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
function WmAddModal({ open, onClose, onAdd, topItems, defaultParent }) {
  const [selType,   setSelType]   = React.useState(null);
  const [groupName, setGroupName] = React.useState('');
  const [linkName,  setLinkName]  = React.useState('');
  const [linkUrl,   setLinkUrl]   = React.useState('');
  const [catFilter, setCatFilter] = React.useState(null);
  const [search,    setSearch]    = React.useState('');
  const [selected,  setSelected]  = React.useState([]);
  const [addTo,     setAddTo]     = React.useState(defaultParent||'root');

  React.useEffect(() => {
    if (open) { setSelType(null); setSelected([]); setCatFilter(null); setSearch(''); setGroupName(''); setLinkName(''); setLinkUrl(''); setAddTo(defaultParent||'root'); }
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
    if (selType==='group')  items=[{ type:'group',  name:groupName.trim() }];
    else if (selType==='link') items=[{ type:'link', name:linkName.trim(), url:linkUrl.trim() }];
    else if ((selType==='article-page'||selType==='product-page') && catFilter) {
      const pages = selType==='article-page' ? WM_ARTICLE_PAGES[catFilter] : WM_PRODUCT_PAGES[catFilter];
      items=(pages||[]).filter(p=>selected.includes(p.id)).map(p=>({ type:selType, name:p.title }));
    } else {
      const list = getList();
      items=list.filter(i=>selected.includes(i.id)).map(i=>({ type:selType, name:i.name||i.title }));
    }
    if (!items.length) return;
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
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, marginBottom:20 }}>
            {WM_TYPES.map(t => (
              <div key={t.id} onClick={()=>{ setSelType(t.id); setSelected([]); setCatFilter(null); setSearch(''); }}
                style={{ padding:'10px 8px', cursor:'pointer', fontSize:14, fontWeight:500, textAlign:'center',
                  color:selType===t.id ? t.color : WmC.textSub,
                  border:`1.5px solid ${selType===t.id ? t.color : WmC.border}`,
                  background:selType===t.id ? t.bg : WmC.white,
                  transition:'all .15s',
                }}>
                {t.label}
              </div>
            ))}
          </div>

          {/* Group name */}
          {selType==='group' && (
            <div style={{ marginBottom:16 }}>
              <label style={{ display:'block', fontSize:14, fontWeight:500, color:WmC.textSub, marginBottom:6 }}>
                <span style={{ color:WmC.danger,marginRight:2 }}>*</span>群組名稱
              </label>
              <input value={groupName} onChange={e=>setGroupName(e.target.value)} placeholder="輸入前台顯示的群組文字"
                style={{ width:'100%', height:36, padding:'0 10px', border:`1px solid ${WmC.border}`, borderRadius:0, fontSize:14, fontFamily:'Noto Sans TC,sans-serif', outline:'none' }}/>
            </div>
          )}

          {/* Custom link */}
          {selType==='link' && (
            <div style={{ marginBottom:16, display:'flex', flexDirection:'column', gap:10 }}>
              {[{ label:'連結名稱', val:linkName, set:setLinkName, ph:'顯示於前台的名稱' },
                { label:'連結網址', val:linkUrl, set:setLinkUrl, ph:'https://...' }].map(f=>(
                <div key={f.label}>
                  <label style={{ display:'block', fontSize:14, fontWeight:500, color:WmC.textSub, marginBottom:5 }}>
                    <span style={{ color:WmC.danger,marginRight:2 }}>*</span>{f.label}
                  </label>
                  <input value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph}
                    style={{ width:'100%', height:36, padding:'0 10px', border:`1px solid ${WmC.border}`, borderRadius:0, fontSize:14, fontFamily:'Noto Sans TC,sans-serif', outline:'none' }}/>
                </div>
              ))}
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
                <option value="root">第一層（主選單）</option>
                {topItems.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
          )}
        </div>

        {/* Modal footer */}
        <div style={{ padding:'12px 20px', borderTop:`1px solid ${WmC.border}`, display:'flex', gap:10, flexShrink:0 }}>
          <button onClick={handleAdd} style={{ ...sharedBtns.create, borderRadius:0, flex:1, height:38 }}>新增至選單</button>
          <button onClick={onClose} style={{ ...sharedBtns.plain, borderRadius:0, height:38 }}>取消</button>
        </div>
      </div>
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

        {/* Add child */}
        <button onClick={e=>{ e.stopPropagation(); onAddChild(node.id); }}
          title="新增子項目" style={{ background:'none', border:'none', cursor:'pointer', color:WmC.blue, display:'flex', alignItems:'center', padding:3, flexShrink:0 }}>
          <WmIcPlus size={13}/>
        </button>

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

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', overflow:'hidden' }}>

      {/* Panel header */}
      <div style={{ padding:'18px 24px 0', borderBottom:`1px solid ${WmC.border}`, flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
          <h2 style={{ fontSize:16, fontWeight:700, color:WmC.text }}>{node.name}</h2>
          <span style={{ fontSize:14, padding:'2px 8px', background:tc.bg, color:tc.color, border:`1px solid ${tc.color}22` }}>{tc.label}</span>
        </div>
        <div style={{ display:'flex' }}>
          {[{ id:'basic',label:'基本設定' },{ id:'seo',label:'網頁 SEO' }].map(t=>(
            <div key={t.id} onClick={()=>setTab(t.id)} style={{
              padding:'0 18px', height:40, display:'flex', alignItems:'center',
              fontSize:14, cursor:'pointer', userSelect:'none',
              color:tab===t.id?WmC.blue:WmC.textMuted,
              borderBottom:`2px solid ${tab===t.id?WmC.blue:'transparent'}`,
              marginBottom:-1, fontWeight:tab===t.id?500:400,
            }}>{t.label}</div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex:1, overflowY:'auto', padding:24 }}>
        {tab==='basic' && (
          <div style={{ maxWidth:520 }}>

            {/* Linked-content banner for article-page / product-page / form */}
            {['article-page','product-page','form'].includes(node.type) && (() => {
              const cfgMap = {
                'article-page': { label:'文章管理', path:'product-list',   desc:'此項目連結至文章內容頁，頁面版面由文章管理模組控制。' },
                'product-page': { label:'產品中心', path:'product-list',   desc:'此項目連結至產品內容頁，頁面版面由產品中心模組控制。' },
                'form':         { label:'表單管理', path:'product-list',   desc:'此項目連結至表單頁面，表單欄位與設計由表單管理模組控制。' },
              };
              const cfg = cfgMap[node.type];
              return (
                <div style={{ background:'#ECF5FF', border:'1px solid #B3D8FF', padding:'14px 16px', marginBottom:24, display:'flex', gap:12, alignItems:'flex-start' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink:0, marginTop:1 }}>
                    <circle cx="9" cy="9" r="8" stroke="#409EFF" strokeWidth="1.5" fill="none"/>
                    <line x1="9" y1="8" x2="9" y2="13" stroke="#409EFF" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="9" cy="5.5" r="0.9" fill="#409EFF"/>
                  </svg>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:500, color:'#303133', marginBottom:6 }}>
                      此類型由「{cfg.label}」管理
                    </div>
                    <div style={{ fontSize:14, color:'#606266', lineHeight:1.7, marginBottom:12 }}>
                      {cfg.desc}
                      <br/>在此僅設定選單顯示名稱、網址與可見度等屬性。
                    </div>
                    <button
                      onClick={() => { alert(`（Prototype）前往 ${cfg.label} 編輯此內容頁`); }}
                      style={{ ...sharedBtns.create, height:36, borderRadius:0, fontSize:14, display:'inline-flex', alignItems:'center', gap:6 }}>
                      前往 {cfg.label} 編輯
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M4.5 2.5H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V9m0-5.5h2.5V6M10.5 2.5L6 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* 標題 */}
            <div style={{ marginBottom:20 }}>
              <label style={{ display:'block', fontSize:14, fontWeight:500, color:WmC.textSub, marginBottom:6 }}>標題</label>
              <input value={name} onChange={e=>setName(e.target.value)}
                style={{ width:'100%', height:38, padding:'0 10px', border:`1px solid ${WmC.border}`, borderRadius:0, fontSize:14, fontFamily:'Noto Sans TC,sans-serif', color:WmC.text, outline:'none' }}/>
            </div>

            {/* 自訂網址 */}
            <div style={{ marginBottom:20 }}>
              <label style={{ display:'block', fontSize:14, fontWeight:500, color:WmC.textSub, marginBottom:6 }}>
                自訂網址 <span style={{ fontWeight:400, fontSize:14, color:WmC.textMuted }}>（留空使用系統自動生成）</span>
              </label>
              <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="/about-us"
                style={{ width:'100%', height:38, padding:'0 10px', border:`1px solid ${WmC.border}`, borderRadius:0, fontSize:14, fontFamily:'Noto Sans TC,sans-serif', color:WmC.text, outline:'none' }}/>
            </div>

            {/* 前台可見度 */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 14px', border:`1px solid ${WmC.border}`, marginBottom:12 }}>
              <div>
                <div style={{ fontSize:14, fontWeight:500, color:WmC.text }}>前台可見度</div>
                <div style={{ fontSize:14, color:WmC.textMuted, marginTop:2 }}>僅影響選單顯示；直接輸入網址仍可瀏覽</div>
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
                    <div style={{ fontSize:14, color:WmC.textMuted }}>{opt.desc}</div>
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
                <div style={{ fontSize:14,color:WmC.textMuted }}>點擊上傳或拖曳圖片至此</div>
                <div style={{ fontSize:14,color:WmC.textMuted,marginTop:4 }}>建議 800×450，JPG / PNG / WebP</div>
              </div>
            </div>

            {/* 列表簡介 */}
            <div style={{ marginBottom:20 }}>
              <label style={{ display:'block', fontSize:14, fontWeight:500, color:WmC.textSub, marginBottom:6 }}>列表簡介</label>
              <textarea value={desc} onChange={e=>setDesc(e.target.value)} rows={4} placeholder="選填，顯示於選單列表頁的項目簡介"
                style={{ width:'100%', padding:'8px 10px', border:`1px solid ${WmC.border}`, borderRadius:0, fontSize:14, fontFamily:'Noto Sans TC,sans-serif', resize:'none', outline:'none' }}/>
            </div>

            {/* 頁面設計 — 僅顯示於非 article-page / product-page / form 類型 */}
            {!['article-page','product-page','form'].includes(node.type) && (
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 14px', border:`1px solid ${WmC.border}` }}>
                <div>
                  <div style={{ fontSize:14,fontWeight:500,color:WmC.text }}>頁面設計</div>
                  <div style={{ fontSize:14,color:WmC.textMuted,marginTop:2 }}>使用頁面設計器編輯此頁面的版面</div>
                </div>
                <button style={{ ...sharedBtns.plain,height:36,fontSize:14,borderRadius:0,padding:'0 14px' }}>開啟設計器</button>
              </div>
            )}
          </div>
        )}

        {tab==='seo' && (
          <div style={{ maxWidth:520 }}>
            {[
              { key:'title',label:'SEO 標題',val:seoTitle,set:setSeoTitle,ph:'留空將使用頁面標題',helper:'建議 30–60 個字元' },
              { key:'desc', label:'SEO 描述',val:seoDec,  set:setSeoDec,  ph:'留空將使用頁面摘要',helper:'建議 70–160 個字元', area:true },
            ].map(f=>(
              <div key={f.key} style={{ marginBottom:20 }}>
                <label style={{ display:'block',fontSize:14,fontWeight:500,color:WmC.textSub,marginBottom:6 }}>{f.label}</label>
                {f.area
                  ? <textarea value={f.val} onChange={e=>f.set(e.target.value)} rows={4} placeholder={f.ph}
                      style={{ width:'100%',padding:'8px 10px',border:`1px solid ${WmC.border}`,borderRadius:0,fontSize:14,fontFamily:'Noto Sans TC,sans-serif',resize:'none',outline:'none' }}/>
                  : <input value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph}
                      style={{ width:'100%',height:38,padding:'0 10px',border:`1px solid ${WmC.border}`,borderRadius:0,fontSize:14,fontFamily:'Noto Sans TC,sans-serif',color:WmC.text,outline:'none' }}/>
                }
                <div style={{ fontSize:14,color:WmC.textMuted,marginTop:4 }}>{f.helper}</div>
              </div>
            ))}

            <div>
              <label style={{ display:'block',fontSize:14,fontWeight:500,color:WmC.textSub,marginBottom:6 }}>社群分享圖片（OG Image）</label>
              <div style={{ border:`1.5px dashed ${WmC.border}`,padding:'20px',textAlign:'center',cursor:'pointer',background:'#FAFBFC' }}
                onMouseEnter={e=>e.currentTarget.style.borderColor=WmC.blue}
                onMouseLeave={e=>e.currentTarget.style.borderColor=WmC.border}>
                <div style={{ fontSize:14,color:WmC.textMuted }}>點擊上傳 OG 圖片（建議 1200×630）</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding:'12px 24px',background:WmC.white,borderTop:`1px solid ${WmC.border}`,display:'flex',gap:10,flexShrink:0 }}>
        <button onClick={()=>onSave(node.id,{ name,url,visible,openMode:mode,desc,seoTitle,seoDec })} style={{ ...sharedBtns.primary,borderRadius:0 }}>儲存設定</button>
        <button style={{ ...sharedBtns.plain,borderRadius:0 }}>取消</button>
      </div>
    </div>
  );
}

// ─── Page component ───────────────────────────────────────────────────────────
function PageWebsiteDesign({ onNavigate, show }) {
  const [menus,         setMenus]         = React.useState(WM_INIT);
  const [langVisible,   setLangVisible]   = React.useState({ zh:true, en:false });
  const [lang,          setLang]          = React.useState('zh');
  const [expanded,      setExpanded]      = React.useState({ wm2:true });
  const [selectedId,    setSelectedId]    = React.useState('wm2');
  const [modalOpen,     setModalOpen]     = React.useState(false);
  const [showKebab,     setShowKebab]     = React.useState(false);
  const [menuClipboard, setMenuClipboard] = React.useState(null);
  // Drag state
  const [draggingId,  setDraggingId]  = React.useState(null);
  const [dragOver,    setDragOver]    = React.useState(null);
  const [addParent,   setAddParent]   = React.useState(null);
  const { show: wmToast, Toast: WmToast } = useToast();

  React.useEffect(() => {
    if (!showKebab) return;
    const close = () => setShowKebab(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [showKebab]);

  const items = menus[lang] || [];
  const selectedNode = selectedId ? wmFind(items, selectedId) : null;

  const handleToggle     = id => setExpanded(p=>({...p,[id]:!p[id]}));
  const handleSelect     = id => { setSelectedId(id); if(id) { const n=wmFind(items,id); if(n?.children?.length) setExpanded(p=>({...p,[id]:true})); } };
  const handleDelete     = id => { setMenus(p=>({...p,[lang]:wmDelete(p[lang],id)})); wmToast('項目已移除','info'); if(selectedId===id) setSelectedId(null); };
  const handleToggleVis  = id => setMenus(p=>{ const n=wmFind(p[lang],id); return {...p,[lang]:wmUpdate(p[lang],id,{visible:!n.visible})}; });
  const handleToggleMode = id => setMenus(p=>{ const n=wmFind(p[lang],id); return {...p,[lang]:wmUpdate(p[lang],id,{openMode:n.openMode==='new'?'same':'new'})}; });
  const handleAddChild   = pid => { setAddParent(pid); setModalOpen(true); };
  const handleSave       = (id,patch) => { setMenus(p=>({...p,[lang]:wmUpdate(p[lang],id,patch)})); wmToast('設定已儲存'); };

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
    wmToast(`已新增 ${nodes.length} 個項目`);
  };

  const handleCopyMenu = (fromLang) => {
    const copy = JSON.parse(JSON.stringify(menus[fromLang]||[]));
    const hide = arr => arr.map(n=>({...n, visible:false, children:hide(n.children||[])}));
    setMenus(p=>({...p,[lang]:hide(copy)}));
    wmToast(`已複製 ${fromLang==='zh'?'繁中':'EN'} 架構（預設全部隱藏）`);
  };

  const handleCopyStructure = () => {
    setMenuClipboard(JSON.parse(JSON.stringify(menus[lang]||[])));
    wmToast('選單架構已複製');
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
      <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:16, flexShrink:0 }}>
        <h1 style={{ fontSize:24, fontWeight:700, color:WmC.text }}>選單管理</h1>
        <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:14 }}>
          <span style={{ color:'#C0C4CC' }}>/</span>
          <span style={{ color:WmC.textMuted }}>網站設計</span>
          <span style={{ color:'#C0C4CC' }}>/</span>
          <span style={{ color:WmC.text }}>選單管理</span>
        </div>
        <div style={{ flex:1 }}/>
        {/* Import */}
        <label style={{ ...sharedBtns.plain, height:36, borderRadius:0, display:'inline-flex', alignItems:'center', gap:7, padding:'0 14px', cursor:'pointer', fontSize:14 }}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M7.5 10V3M7.5 10L4.5 7M7.5 10L10.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12.5h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          匯入
          <input type="file" accept=".json" style={{ display:'none' }} onChange={e => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = ev => {
              try {
                const data = JSON.parse(ev.target.result);
                if (!Array.isArray(data)) throw new Error();
                setMenus(p => ({ ...p, [lang]: data }));
                wmToast('選單已匯入');
              } catch {
                wmToast('檔案格式錯誤，請上傳正確的 JSON 檔案', 'error');
              }
            };
            reader.readAsText(file);
            e.target.value = '';
          }}/>
        </label>
        {/* Export */}
        <button
          style={{ ...sharedBtns.plain, height:36, borderRadius:0, display:'inline-flex', alignItems:'center', gap:7, padding:'0 14px', fontSize:14 }}
          onClick={() => {
            const data = JSON.stringify(menus[lang] || [], null, 2);
            const blob = new Blob([data], { type:'application/json' });
            const url  = URL.createObjectURL(blob);
            const a    = document.createElement('a');
            a.href     = url;
            a.download = `menu-${lang}-${new Date().toISOString().slice(0,10)}.json`;
            a.click();
            URL.revokeObjectURL(url);
            wmToast('選單已匯出');
          }}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M7.5 5V12M7.5 5L4.5 8M7.5 5L10.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12.5h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          匯出
        </button>
      </div>

      {/* Info banner */}
      <div style={{ background:'#606266', color:'#fff', padding:'12px 16px', marginBottom:16, flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:6, fontWeight:700, fontSize:14, marginBottom:6 }}>
          <WmIcInfo size={15} color="#fff"/>
          <span>操作說明</span>
        </div>
        <ul style={{ paddingLeft:16, fontSize:14, lineHeight:1.9, color:'rgba(255,255,255,0.88)', margin:0 }}>
          <li>點擊左側「新增項目」可選擇 8 種類型加入選單；每個列項的 + 圖示可直接新增子項</li>
          <li>眼睛圖示切換前台可見度；點擊名稱進入設定，可在設定頁調整開啟方式</li>
          <li>語系頁籤管理多語系選單；「複製架構」將項目預設為隱藏狀態</li>
        </ul>
      </div>

      {/* 4:6 Split pane */}
      <div style={{ display:'flex', gap:16, flex:1, minHeight:0, overflow:'hidden', alignItems:'stretch' }}>

        {/* Left card 40% — tree */}
        <div style={{ flex:'0 0 40%', ...CARD, display:'flex', flexDirection:'column', overflow:'hidden' }}>

          {/* Language tabs row */}
          <div style={{ borderBottom:`1px solid ${WmC.border}`, flexShrink:0 }}>
            <div style={{ display:'flex', alignItems:'center', padding:'0 12px' }}>
              {[{ id:'zh',label:'繁中' },{ id:'en',label:'EN' }].map(l=>(
                <div key={l.id} onClick={()=>{ setLang(l.id); setSelectedId(null); }}
                  style={{ padding:'0 14px', height:44, display:'flex', alignItems:'center', fontSize:14, cursor:'pointer', userSelect:'none',
                    color:lang===l.id?WmC.blue:WmC.textMuted, borderBottom:`2px solid ${lang===l.id?WmC.blue:'transparent'}`, marginBottom:-1, fontWeight:lang===l.id?500:400 }}>
                  {l.label}
                </div>
              ))}
              <div style={{ flex:1 }}/>
              <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:14, color:WmC.textSub }}>
                <span>{langVisible[lang]?'顯示中':'已隱藏'}</span>
                <Switch checked={langVisible[lang]} onChange={()=>setLangVisible(p=>({...p,[lang]:!p[lang]}))}/>
              </div>
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
                  style={{ height:26, width:28, background:showKebab?'#EBEEF5':'transparent', border:'none', borderRadius:3, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:WmC.textMuted, fontSize:18, letterSpacing:1, lineHeight:1 }}
                  title="更多選項"
                >
                  ···
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
            <button onClick={()=>{ setAddParent(null); setModalOpen(true); }}
              style={{ ...sharedBtns.create, height:30, fontSize:14, borderRadius:0, padding:'0 10px', display:'flex', alignItems:'center', gap:4 }}>
              <WmIcPlus size={11} color="#fff"/>
              新增項目
            </button>
          </div>

          <div style={{ padding:'5px 14px', fontSize:14, color:WmC.textMuted, background:'#FAFBFC', borderBottom:`1px solid ${WmC.border}`, flexShrink:0 }}>
            可拖曳列項調整順序；點擊名稱進入設定
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
              <div style={{ padding:'32px 16px', textAlign:'center', color:WmC.textMuted, fontSize:14 }}>
                此語系尚未建立選單<br/>
                <span style={{ fontSize:14 }}>點擊「新增項目」或「複製架構」開始建立</span>
              </div>
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
              <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', color:WmC.textMuted }}>
                <div style={{ textAlign:'center' }}>
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ marginBottom:16, opacity:0.25 }}>
                    <rect x="4" y="12" width="48" height="32" rx="2" stroke="#909399" strokeWidth="2" fill="none"/>
                    <line x1="4" y1="22" x2="52" y2="22" stroke="#909399" strokeWidth="2"/>
                    <line x1="18" y1="12" x2="18" y2="22" stroke="#909399" strokeWidth="2"/>
                  </svg>
                  <div style={{ fontSize:14, marginBottom:8 }}>選擇左側選單項目以編輯設定</div>
                  <div style={{ fontSize:14, color:WmC.textMuted }}>點擊項目名稱即可進入設定頁面</div>
                </div>
              </div>
            )
          }
        </div>
      </div>

      {/* Add modal */}
      <WmAddModal open={modalOpen} onClose={()=>setModalOpen(false)} onAdd={handleAdd} topItems={items} defaultParent={addParent}/>

      <WmToast/>
    </div>
  );
}
