// Evomni Prototype — Shared Components

// ── EvoBtn ────────────────────────────────────────────────────────────────────
function EvoBtn({ variant='primary', size='md', disabled, loading, children, onClick, fullWidth, icon, style:xStyle={} }) {
  const [hov, setHov] = React.useState(false);
  const sz = { lg:{h:44,px:'0 18px',fs:14}, md:{h:40,px:'0 14px',fs:14}, sm:{h:36,px:'0 10px',fs:12} }[size]||{h:40,px:'0 14px',fs:14};
  const vr = {
    primary:      {bg:'#303133',c:'#fff',b:'#303133',hB:'#4a4d52'},
    create:       {bg:'#409EFF',c:'#fff',b:'#409EFF',hB:'#66b1ff'},
    secondary:    {bg:'#fff',c:'#303133',b:'#DCDFE6',hB:'#F5F7FA'},
    danger:       {bg:'#F56C6C',c:'#fff',b:'#F56C6C',hB:'#f78989'},
    ghost:        {bg:'transparent',c:'#409EFF',b:'#409EFF',hB:'#ecf5ff'},
    text:         {bg:'transparent',c:'#409EFF',b:'transparent',hB:'transparent'},
    'text-danger':{bg:'transparent',c:'#F56C6C',b:'transparent',hB:'transparent'},
  }[variant]||{bg:'#303133',c:'#fff',b:'#303133',hB:'#4a4d52'};
  const dis = disabled||loading;
  return (
    <button disabled={dis} onClick={!dis?onClick:undefined}
      onMouseEnter={()=>!dis&&setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{height:sz.h,padding:sz.px,fontSize:sz.fs,width:fullWidth?'100%':'auto',
        background:dis?'#F5F7FA':hov?vr.hB:vr.bg,color:dis?'#C0C4CC':vr.c,
        border:`1px solid ${dis?'#E4E7ED':vr.b}`,borderRadius:0,
        cursor:dis?'not-allowed':'pointer',fontFamily:'Noto Sans TC,sans-serif',
        display:'inline-flex',alignItems:'center',justifyContent:'center',gap:5,
        transition:'all 0.15s',whiteSpace:'nowrap',lineHeight:1,outline:'none',...xStyle}}>
      {loading&&<span style={{display:'inline-block',width:12,height:12,border:'2px solid currentColor',borderTopColor:'transparent',borderRadius:'50%',animation:'evo-spin 0.6s linear infinite',flexShrink:0}}/>}
      {icon&&!loading&&<span>{icon}</span>}
      {children}
    </button>
  );
}

// ── EvoTag ────────────────────────────────────────────────────────────────────
function EvoTag({ color='info', children, icon }) {
  const c={success:{bg:'#f0f9eb',text:'#67C23A',b:'#c2e7b0'},warning:{bg:'#fdf6ec',text:'#E6A23C',b:'#f5dab1'},danger:{bg:'#fef0f0',text:'#F56C6C',b:'#fbc4c4'},info:{bg:'#f4f4f5',text:'#909399',b:'#d3d4d6'},primary:{bg:'#ecf5ff',text:'#409EFF',b:'#b3d8ff'}}[color]||{bg:'#f4f4f5',text:'#909399',b:'#d3d4d6'};
  return <span style={{display:'inline-flex',alignItems:'center',gap:3,height:22,padding:'0 10px',borderRadius:9999,fontSize:12,border:`1px solid ${c.b}`,background:c.bg,color:c.text,whiteSpace:'nowrap',lineHeight:1,fontFamily:'Noto Sans TC,sans-serif'}}>{icon&&<span style={{fontSize:10}}>{icon}</span>}{children}</span>;
}

// ── Toast hook ────────────────────────────────────────────────────────────────
function useToast() {
  const [list, setList] = React.useState([]);
  const show = React.useCallback((msg, type='success') => {
    const id = Date.now();
    setList(t=>[...t,{id,msg,type}]);
    setTimeout(()=>setList(t=>t.filter(x=>x.id!==id)),3000);
  },[]);
  const Toast = ()=>{
    const map={success:{bg:'#f0f9eb',b:'#c2e7b0',c:'#67C23A',i:'✓'},error:{bg:'#fef0f0',b:'#fbc4c4',c:'#F56C6C',i:'✕'},warning:{bg:'#fdf6ec',b:'#f5dab1',c:'#E6A23C',i:'⚠'},info:{bg:'#ecf5ff',b:'#b3d8ff',c:'#409EFF',i:'ℹ'}};
    return <div style={{position:'fixed',top:20,right:20,zIndex:3000,display:'flex',flexDirection:'column',gap:8,pointerEvents:'none'}}>
      {list.map(t=>{const s=map[t.type]||map.success;return <div key={t.id} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',background:s.bg,border:`1px solid ${s.b}`,borderRadius:3,boxShadow:'0 2px 12px rgba(0,0,0,0.1)',minWidth:260,maxWidth:400,animation:'evo-toast-in 0.3s ease'}}><span style={{color:s.c,fontWeight:700,flexShrink:0,fontSize:14}}>{s.i}</span><span style={{fontSize:13,color:'#303133',flex:1,lineHeight:1.5}}>{t.msg}</span></div>;})}
    </div>;
  };
  return {show,Toast};
}

// ── AdminModal ────────────────────────────────────────────────────────────────
function AdminModal({open,onClose,title,body,confirmLabel='確定',cancelLabel='取消',danger=false,onConfirm,children}) {
  return (
    <Dialog
      open={open}
      title={title}
      width={460}
      onClose={onClose}
      footer={
        <React.Fragment>
          <EvoBtn variant="secondary" onClick={onClose}>{cancelLabel}</EvoBtn>
          <EvoBtn variant={danger?'danger':'primary'} onClick={()=>{onConfirm&&onConfirm();onClose();}}>{confirmLabel}</EvoBtn>
        </React.Fragment>
      }
    >
      {children||body}
    </Dialog>
  );
}

// ── EvoTimeline ───────────────────────────────────────────────────────────────
function EvoTimeline({events}) {
  return <div style={{padding:'4px 0'}}>
    {events.map((ev,i)=>{
      const isL=i===0,isLast=i===events.length-1;
      return <div key={i} style={{display:'flex',gap:12,position:'relative',paddingBottom:isLast?0:18}}>
        {!isLast&&<div style={{position:'absolute',left:5,top:14,bottom:0,width:1,background:'#DCDFE6'}}/>}
        <div style={{width:11,height:11,borderRadius:'50%',flexShrink:0,marginTop:3,zIndex:1,background:isL?'#409EFF':'#fff',border:`2px solid ${isL?'#409EFF':'#DCDFE6'}`,boxShadow:isL?'0 0 0 3px #d9ecff':'none'}}/>
        <div style={{flex:1}}>
          <div style={{fontSize:13,color:isL?'#303133':'#606266',fontWeight:isL?600:400,lineHeight:1.4}}>
            {ev.label}{ev.trackingNo&&<span> — <a href="#" onClick={e=>e.preventDefault()} style={{color:'#409EFF',fontSize:12}}>追蹤號：{ev.trackingNo}</a></span>}
          </div>
          {ev.operator&&<div style={{fontSize:11,color:'#C0C4CC',marginTop:1}}>操作人：{ev.operator}</div>}
          <div style={{fontSize:11,color:'#909399',marginTop:1}}>{ev.time}</div>
        </div>
      </div>;
    })}
  </div>;
}

// ── InfoCard ──────────────────────────────────────────────────────────────────
function InfoCard({title,rows}) {
  return <div style={{background:'#fff',border:'1px solid #DCDFE6',borderRadius:3}}>
    <div style={{padding:'10px 16px',borderBottom:'1px solid #DCDFE6',fontSize:14,fontWeight:700,color:'#303133',background:'#FAFAFA'}}>{title}</div>
    <div style={{padding:'4px 16px 8px'}}>
      {rows.map((row,i)=><div key={i} style={{display:'flex',gap:12,padding:'6px 0',borderBottom:i<rows.length-1?'1px solid #F5F7FA':'none'}}>
        <div style={{width:80,fontSize:12,color:'#909399',flexShrink:0,paddingTop:1}}>{row.label}</div>
        <div style={{fontSize:13,color:'#303133',flex:1,wordBreak:'break-word',lineHeight:1.5}}>{row.value}</div>
      </div>)}
    </div>
  </div>;
}

// ── AmountDetail ──────────────────────────────────────────────────────────────
function AmountDetail({rows,helpText}) {
  return <div style={{padding:16,background:'#fff',border:'1px solid #DCDFE6',borderRadius:3}}>
    {rows.map((row,i)=>{
      if(row.type==='divider')return <div key={i} style={{borderTop:'1px solid #DCDFE6',margin:'6px 0'}}/>;
      const isTot=row.type==='total'||row.type==='paid';
      return <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'3px 0',fontSize:isTot?14:13,fontWeight:isTot?700:400}}>
        <span style={{color:row.labelColor||(isTot?'#303133':'#606266')}}>{row.label}</span>
        <span style={{color:row.valueColor||(isTot?'#303133':'#606266')}}>{row.value}</span>
      </div>;
    })}
    {helpText&&<div style={{fontSize:11,color:'#909399',marginTop:8,lineHeight:1.6,borderTop:'1px dashed #EBEEF5',paddingTop:6}}>{helpText}</div>}
  </div>;
}

// ── AlertBanner ───────────────────────────────────────────────────────────────
function AlertBanner({message,action,type='warning'}) {
  const s={warning:{bg:'#fdf6ec',b:'#E6A23C',c:'#E6A23C'},error:{bg:'#FEF0F0',b:'#F56C6C',c:'#F56C6C'}}[type]||{bg:'#fdf6ec',b:'#E6A23C',c:'#E6A23C'};
  return <div style={{display:'flex',alignItems:'center',gap:10,padding:'10px 16px',background:s.bg,borderLeft:`4px solid ${s.b}`,marginBottom:16}}>
    <span style={{color:s.c,flexShrink:0,fontSize:15}}>⚠</span>
    <span style={{fontSize:13,color:'#606266',flex:1,lineHeight:1.5}}>{message}</span>
    {action&&<EvoBtn variant={type==='error'?'danger':'primary'} size="sm" onClick={action.onClick}>{action.label}</EvoBtn>}
  </div>;
}

// ── PageHeader ────────────────────────────────────────────────────────────────
function PageHeader({title,breadcrumbs,children}) {
  return <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20,flexWrap:'wrap',gap:8}}>
    <div style={{display:'flex',alignItems:'center',gap:14,flexWrap:'wrap'}}>
      <h1 style={{fontSize:20,fontWeight:700,color:'#303133',margin:0}}>{title}</h1>
      {breadcrumbs&&<nav style={{display:'flex',alignItems:'center',gap:5,fontSize:13}}>
        {breadcrumbs.map((b,i)=><React.Fragment key={i}>
          {i>0&&<span style={{color:'#C0C4CC'}}>/</span>}
          {i<breadcrumbs.length-1?<a href="#" onClick={e=>e.preventDefault()} style={{color:'#909399',textDecoration:'none'}}>{b}</a>:<span style={{color:'#303133'}}>{b}</span>}
        </React.Fragment>)}
      </nav>}
    </div>
    {children&&<div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>{children}</div>}
  </div>;
}

// ── AdminLayout — uses design-system Sidebar + Header ────────────────────────
function AdminLayout({page, onNav, children}) {
  const [col, setCol] = React.useState(false);
  return (
    <div style={{display:'flex',height:'100vh',overflow:'hidden'}}>
      <Sidebar currentPage={page} onNavigate={onNav} collapsed={col} />
      <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden',minWidth:0}}>
        <Header onToggleSidebar={()=>setCol(c=>!c)} breadcrumbs={[]} />
        <main style={{flex:1,overflowY:'auto',padding:40,background:'#F5F7FA'}}>{children}</main>
      </div>
    </div>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function SkeletonBlock({w='100%',h=14}) {
  return <div style={{width:w,height:h,background:'#EBEEF5',animation:'evo-shimmer 1.4s ease-in-out infinite'}}/>;
}

// ── Back link ─────────────────────────────────────────────────────────────────
function BackLink({label,onClick}) {
  const [hov,setHov]=React.useState(false);
  return <a href="#" onClick={e=>{e.preventDefault();onClick&&onClick();}} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
    style={{display:'inline-flex',alignItems:'center',gap:4,fontSize:14,color:hov?'#66b1ff':'#409EFF',textDecoration:'none',transition:'color 0.15s',marginBottom:16}}>
    ← {label}
  </a>;
}

// ── Divider ───────────────────────────────────────────────────────────────────
function Divider({my=16}) { return <div style={{borderTop:'1px solid #DCDFE6',margin:`${my}px 0`}}/>; }

// ── Input ─────────────────────────────────────────────────────────────────────
function EvoInput({label,placeholder,value:init='',helper,error,disabled,onChange,type='text',suffix}) {
  const [val,setVal]=React.useState(init);
  const [foc,setFoc]=React.useState(false);
  const bdr=error?'#F56C6C':foc?'#409EFF':'#DCDFE6';
  return <div>
    {label&&<div style={{fontSize:13,color:'#606266',marginBottom:6}}>{label}</div>}
    <div style={{display:'flex',alignItems:'center',height:36,border:`1px solid ${bdr}`,background:disabled?'#F5F7FA':'#fff',transition:'border-color 0.2s'}}>
      <input type={type} disabled={disabled} placeholder={placeholder} value={val}
        onChange={e=>{setVal(e.target.value);onChange&&onChange(e.target.value);}}
        onFocus={()=>setFoc(true)} onBlur={()=>setFoc(false)}
        style={{flex:1,height:'100%',border:'none',outline:'none',padding:'0 10px',fontSize:14,color:disabled?'#C0C4CC':'#303133',background:'transparent',fontFamily:'Noto Sans TC,sans-serif'}}/>
      {suffix&&<span style={{padding:'0 10px',color:'#909399',fontSize:13,flexShrink:0}}>{suffix}</span>}
    </div>
    {(helper||error)&&<div style={{fontSize:12,color:error?'#F56C6C':'#909399',marginTop:4}}>{error||helper}</div>}
  </div>;
}

// ── Select ────────────────────────────────────────────────────────────────────
function EvoSelect({label,options=[],placeholder='請選擇',value:init=null,onChange,helper}) {
  const [val,setVal]=React.useState(init);
  const [open,setOpen]=React.useState(false);
  const ref=React.useRef(null);
  React.useEffect(()=>{
    const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};
    document.addEventListener('mousedown',h);return()=>document.removeEventListener('mousedown',h);
  },[]);
  const sel=options.find(o=>o.value===val);
  return <div ref={ref} style={{position:'relative'}}>
    {label&&<div style={{fontSize:13,color:'#606266',marginBottom:6}}>{label}</div>}
    <div onClick={()=>setOpen(o=>!o)} style={{height:40,border:`1px solid ${open?'#409EFF':'#DCDFE6'}`,background:'#fff',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 10px',cursor:'pointer',fontSize:14,transition:'border-color 0.2s'}}>
      <span style={{color:sel?'#303133':'#909399'}}>{sel?sel.label:placeholder}</span>
      <span style={{fontSize:10,color:'#909399',transform:open?'rotate(180deg)':'none',transition:'transform 0.2s'}}>▾</span>
    </div>
    {open&&<div style={{position:'absolute',top:'calc(100% + 2px)',left:0,right:0,zIndex:400,background:'#fff',border:'1px solid #DCDFE6',boxShadow:'0 4px 16px rgba(0,0,0,0.1)',maxHeight:200,overflowY:'auto'}}>
      {options.map(opt=><div key={opt.value} onClick={()=>{setVal(opt.value);onChange&&onChange(opt.value);setOpen(false);}}
        style={{padding:'8px 12px',fontSize:14,cursor:'pointer',color:val===opt.value?'#409EFF':'#303133',background:val===opt.value?'#F5F7FA':'#fff'}}
        onMouseEnter={e=>{if(val!==opt.value)e.currentTarget.style.background='#F5F7FA';}}
        onMouseLeave={e=>{if(val!==opt.value)e.currentTarget.style.background='#fff';}}
      >{opt.label}</div>)}
    </div>}
    {helper&&<div style={{fontSize:12,color:'#909399',marginTop:4}}>{helper}</div>}
  </div>;
}

// ── Textarea ──────────────────────────────────────────────────────────────────
function EvoTextarea({label,placeholder,value:init='',helper,error,maxLength=500,rows=3,onChange}) {
  const [val,setVal]=React.useState(init);
  const [foc,setFoc]=React.useState(false);
  return <div>
    {label&&<div style={{fontSize:13,color:'#606266',marginBottom:6}}>{label}</div>}
    <div style={{position:'relative'}}>
      <textarea placeholder={placeholder} value={val} maxLength={maxLength} rows={rows}
        onChange={e=>{setVal(e.target.value);onChange&&onChange(e.target.value);}}
        onFocus={()=>setFoc(true)} onBlur={()=>setFoc(false)}
        style={{width:'100%',padding:'8px 10px 22px',border:`1px solid ${error?'#F56C6C':foc?'#409EFF':'#DCDFE6'}`,borderRadius:0,outline:'none',fontSize:13,color:'#303133',fontFamily:'Noto Sans TC,sans-serif',lineHeight:1.6,background:'#fff',resize:'vertical',boxSizing:'border-box',transition:'border-color 0.2s'}}/>
      <div style={{position:'absolute',bottom:5,right:8,fontSize:11,color:val.length>=maxLength?'#F56C6C':'#909399',pointerEvents:'none'}}>{val.length}/{maxLength}</div>
    </div>
    {(helper||error)&&<div style={{fontSize:12,color:error?'#F56C6C':'#909399',marginTop:4}}>{error||helper}</div>}
  </div>;
}

// ── RadioGroup ────────────────────────────────────────────────────────────────
function RadioGroup({options,value:init,onChange,card=false}) {
  const [val,setVal]=React.useState(init);
  return <div style={{display:'flex',gap:card?10:16,flexWrap:'wrap'}}>
    {options.map(opt=>{
      const sel=val===opt.value;
      if(card)return <div key={opt.value} onClick={()=>{setVal(opt.value);onChange&&onChange(opt.value);}} style={{border:`1px solid ${sel?'#409EFF':'#DCDFE6'}`,background:sel?'#ECF5FF':'#fff',padding:'8px 14px',cursor:'pointer',display:'flex',alignItems:'center',gap:6,color:sel?'#409EFF':'#303133',fontSize:13,transition:'all 0.15s'}}>{opt.icon&&<span>{opt.icon}</span>}{opt.label}</div>;
      return <div key={opt.value} onClick={()=>{setVal(opt.value);onChange&&onChange(opt.value);}} style={{display:'flex',alignItems:'center',gap:6,cursor:'pointer',fontSize:13,color:'#303133'}}>
        <div style={{width:14,height:14,borderRadius:'50%',border:`1px solid ${sel?'#409EFF':'#DCDFE6'}`,background:'#fff',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
          {sel&&<div style={{width:6,height:6,borderRadius:'50%',background:'#409EFF'}}/>}
        </div>
        {opt.label}
      </div>;
    })}
  </div>;
}

// 訂單狀態 Tag + ⓘ hover tooltip（PRD Part3 §6.2.A R8）
function StatusTagTooltip({ status }) {
  const s = (typeof ORDER_STATUS !== 'undefined' && ORDER_STATUS[status]) || {};
  const [vis, setVis] = React.useState(false);
  return (
    <div style={{ display:'inline-flex', alignItems:'center', gap:4, position:'relative' }}>
      <EvoTag color={s.color}>{s.label || status}</EvoTag>
      {s.tooltip && (
        <span
          onMouseEnter={() => setVis(true)}
          onMouseLeave={() => setVis(false)}
          style={{ fontSize:14, color:'#909399', cursor:'help', lineHeight:1, userSelect:'none', flexShrink:0 }}>
          ⓘ
        </span>
      )}
      {vis && s.tooltip && (
        <div style={{
          position:'absolute', left:0, top:'calc(100% + 6px)', zIndex:999,
          background:'#303133', color:'#fff', padding:'10px 12px', width:280,
          fontSize:12, lineHeight:1.65, boxShadow:'0 4px 16px rgba(0,0,0,0.2)',
          pointerEvents:'none',
        }}>
          <div style={{ marginBottom:5 }}><span style={{ color:'#E6A23C', fontWeight:600 }}>狀態說明：</span>{s.tooltip.what}</div>
          <div style={{ marginBottom:5 }}><span style={{ color:'#E6A23C', fontWeight:600 }}>影響範圍：</span>{s.tooltip.impact}</div>
          <div><span style={{ color:'#E6A23C', fontWeight:600 }}>後續步驟：</span>{s.tooltip.next}</div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, {
  EvoBtn,EvoTag,useToast,AdminModal,EvoTimeline,InfoCard,AmountDetail,
  AlertBanner,PageHeader,AdminLayout,
  SkeletonBlock,BackLink,Divider,EvoInput,EvoSelect,EvoTextarea,RadioGroup,
  StatusTagTooltip,
});
