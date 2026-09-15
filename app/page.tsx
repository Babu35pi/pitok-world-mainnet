"use client";
import { useState, useRef, useEffect } from "react";

const FEED = [
{id:1,user:"@crypto_king",handle:"Alex Base",likes:12400,desc:"First TikTok on Base! 🚀 #pitok #base",song:"Pitok Anthem - Original",video:"https://www.w3schools.com/html/mov_bbb.mp4"},
{id:2,user:"@pitok_queen",handle:"Sarah",likes:45200,desc:"Earned $500 in 1 day with Pitok 😱💸 #earn",song:"Viral Sound",video:"https://www.w3schools.com/html/movie.mp4"},
{id:3,user:"@web3_babu",handle:"Babu Pi",likes:89100,desc:"Building Pitok World Day 7 🌍 Uganda to Base!",song:"Building in Public",video:"https://www.w3schools.com/html/mov_bbb.mp4"},
];

export default function Page(){
const [c,setC]=useState(0);
const [o,setO]=useState(false);
const [p,setP]=useState("");
const [pr,setPr]=useState(0);
const [up,setUp]=useState(false);
const [bal,setBal]=useState(12.40);
const [liked,setLiked]=useState<number[]>([]);
const [hearts,setHearts]=useState<any[]>([]);
const [wallet,setWallet]=useState(false);
const fR=useRef<HTMLInputElement>(null);
const vR=useRef<HTMLVideoElement>(null);

useEffect(()=>{ vR.current?.play().catch(()=>{}); },[c]);

const like=(id:number,e:any)=>{
const isLiked=liked.includes(id);
setLiked(x=>isLiked?x.filter(y=>y!==id):[...x,id]);
if(!isLiked){
const rect=e.currentTarget.getBoundingClientRect();
const nh={x:rect.left+20,y:rect.top,id:Date.now()};
setHearts(h=>[...h,nh]);
setTimeout(()=>setHearts(h=>h.filter(x=>x.id!==nh.id)),800);
}
};

const addHeart=(e:any)=>{
const nh={x:e.clientX-15,y:e.clientY-30,id:Date.now()};
setHearts(h=>[...h,nh]);
setTimeout(()=>setHearts(h=>h.filter(x=>x.id!==nh.id)),800);
};

const upload=()=>{
if(!p) return alert("Select video first!");
setUp(true);let x=0;
const iv=setInterval(()=>{
x+=10;setPr(x);
if(x>=100){clearInterval(iv);setUp(false);setBal(b=>b+0.50);alert("✅ Uploaded! +$0.50 Earned!");setO(false);setP("");setPr(0);}
},150);
};

const v=FEED[c];

return(
<div style={{height:"100vh",background:"#000",color:"#fff",position:"relative",overflow:"hidden",fontFamily:"system-ui"}}>

{/* VIDEO */}
<div style={{position:"absolute",inset:0}} onClick={addHeart}>
<video ref={vR} src={v.video} poster="https://picsum.photos/400/800?random=1" loop muted playsInline autoPlay style={{width:"100%",height:"100%",objectFit:"cover"}}/>
<div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 50%,rgba(0,0,0,0.3) 100%)"}}/>
</div>

{/* HEADER */}
<div style={{position:"absolute",top:0,left:0,right:0,display:"flex",justifyContent:"space-between",padding:"12px 14px",zIndex:10}}>
<div style={{fontWeight:900,fontSize:"18px",letterSpacing:"1px"}}>PITOKWORLD 🌍</div>
<div style={{display:"flex",gap:"8px",alignItems:"center"}}>
<div style={{padding:"6px 10px",background:"rgba(0,0,0,0.5)",borderRadius:"20px",fontSize:"12px",backdropFilter:"blur(10px)",border:"1px solid rgba(255,255,255,0.2)"}}>${bal.toFixed(2)}</div>
<button onClick={()=>setWallet(!wallet)} style={{padding:"6px 12px",borderRadius:"20px",border:"none",background:wallet?"#22c55e":"#fff",color:wallet?"#fff":"#000",fontWeight:700,fontSize:"12px"}}>{wallet?"🟢 0xBabu...Pi":"Connect"}</button>
<button onClick={()=>setO(true)} style={{padding:"6px 12px",borderRadius:"20px",border:"none",background:"linear-gradient(90deg,#f9ff00,#ff00cc)",fontWeight:900,fontSize:"12px",color:"#000"}}>+ Upload</button>
</div>
</div>

{/* HEARTS */}
{hearts.map((h:any)=><div key={h.id} style={{position:"fixed",left:h.x,top:h.y,fontSize:"40px",pointerEvents:"none",animation:"pop 0.8s ease-out forwards",zIndex:50}}>❤️</div>)}

{/* RIGHT ACTIONS */}
<div style={{position:"absolute",right:"10px",bottom:"120px",display:"flex",flexDirection:"column",gap:"22px",alignItems:"center",zIndex:10}}>
<button onClick={(e)=>like(v.id,e)} style={{background:"none",border:"none",color:"#fff",display:"flex",flexDirection:"column",alignItems:"center"}}>
<div style={{fontSize:"32px",filter:liked.includes(v.id)?"drop-shadow(0 0 8px red)":"none"}}>{liked.includes(v.id)?"❤️":"🤍"}</div>
<div style={{fontSize:"12px",fontWeight:700}}>{(v.likes+(liked.includes(v.id)?1:0)).toLocaleString()}</div>
</button>
<div style={{display:"flex",flexDirection:"column",alignItems:"center"}}><div style={{fontSize:"28px"}}>💬</div><div style={{fontSize:"12px",fontWeight:700}}>2.1k</div></div>
<div style={{display:"flex",flexDirection:"column",alignItems:"center"}}><div style={{fontSize:"28px"}}>🔗</div><div style={{fontSize:"12px",fontWeight:700}}>Share</div></div>
</div>

{/* BOTTOM INFO */}
<div style={{position:"absolute",bottom:"65px",left:"12px",right:"75px",zIndex:10}}>
<div style={{fontWeight:700,fontSize:"15px"}}>{v.user} <span style={{fontWeight:400,opacity:0.8}}>• {v.handle}</span></div>
<div style={{fontSize:"14px",marginTop:"4px",lineHeight:"1.3"}}>{v.desc}</div>
<div style={{fontSize:"12px",marginTop:"6px",opacity:0.9}}>🎵 {v.song}</div>
<div style={{display:"flex",gap:"8px",marginTop:"12px"}}>
<button onClick={()=>setC((c-1+FEED.length)%FEED.length)} style={{padding:"7px 14px",borderRadius:"20px",border:"none",background:"rgba(255,255,255,0.2)",color:"#fff",backdropFilter:"blur(10px)"}}>⬆️ Prev</button>
<button onClick={()=>setC((c+1)%FEED.length)} style={{padding:"7px 14px",borderRadius:"20px",border:"none",background:"#fff",color:"#000",fontWeight:700}}>⬇️ Next</button>
</div>
</div>

{/* NAV */}
<div style={{position:"absolute",bottom:0,left:0,right:0,height:"50px",background:"#000",display:"flex",justifyContent:"space-around",alignItems:"center",borderTop:"1px solid #222",zIndex:10,fontSize:"12px"}}>
<div style={{display:"flex",flexDirection:"column",alignItems:"center",opacity:1}}> <span style={{fontSize:"18px"}}>🏠</span> Home</div>
<div style={{display:"flex",flexDirection:"column",alignItems:"center",opacity:0.6}}> <span style={{fontSize:"18px"}}>🔍</span> Discover</div>
<div style={{display:"flex",flexDirection:"column",alignItems:"center",opacity:0.6}}> <span style={{fontSize:"18px"}}>📥</span> Inbox</div>
<div style={{display:"flex",flexDirection:"column",alignItems:"center",opacity:0.6}}> <span style={{fontSize:"18px"}}>👤</span> You</div>
</div>

{/* UPLOAD MODAL */}
{o&&<div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.92)",zIndex:100,display:"flex",justifyContent:"center",alignItems:"center",padding:"16px"}}>
<div style={{background:"#111",width:"100%",maxWidth:"360px",borderRadius:"20px",padding:"20px",border:"1px solid #333"}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:"14px",alignItems:"center"}}><div style={{fontWeight:900,fontSize:"16px"}}>Upload to Pitok 🌍</div><button onClick={()=>setO(false)} style={{background:"#222",border:"none",color:"#fff",width:"28px",height:"28px",borderRadius:"50%"}}>✕</button></div>
<div onClick={()=>fR.current?.click()} style={{height:"170px",border:"2px dashed #444",borderRadius:"14px",display:"flex",justifyContent:"center",alignItems:"center",overflow:"hidden",background:"#000"}}>
{p?<video src={p} style={{width:"100%",height:"100%",objectFit:"cover"}} muted/>:<div style={{textAlign:"center"}}><div style={{fontSize:"30px"}}>📹</div><div style={{fontSize:"13px",opacity:0.7,marginTop:"6px"}}>Tap to select video<br/>Earn $0.50 per upload</div></div>}
</div>
<input ref={fR} type="file" accept="video/*" hidden onChange={e=>{const f=e.target.files?.[0];if(f)setP(URL.createObjectURL(f));}}/>
{up&&<div style={{marginTop:"14px"}}><div style={{height:"8px",background:"#222",borderRadius:"10px",overflow:"hidden"}}><div style={{width:`${pr}%`,height:"100%",background:"linear-gradient(90deg,#f9ff00,#ff00cc)",transition:"width 0.2s"}}/></div><div style={{textAlign:"center",fontSize:"12px",marginTop:"6px"}}>{pr}% Uploading to Base...</div></div>}
<button onClick={upload} disabled={up} style={{width:"100%",marginTop:"16px",padding:"14px",borderRadius:"30px",border:"none",background:"linear-gradient(90deg,#f9ff00,#ff00cc)",fontWeight:900,fontSize:"14px"}}>{up?`Uploading ${pr}%...`:"🚀 POST NOW - EARN $0.50"}</button>
<div style={{textAlign:"center",fontSize:"10px",opacity:0.5,marginTop:"10px"}}>Powered by Base • Instant payout</div>
</div>
</div>}

<style>{`@keyframes pop{0%{transform:translateY(0) scale(0);opacity:1}50%{transform:translateY(-70px) scale(1.3);opacity:1}100%{transform:translateY(-140px) scale(0.7);opacity:0}}`}</style>
</div>
);}
