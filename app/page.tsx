"use client";
import { useState, useRef, useEffect } from "react";

const FEED = [
  { id: 1, user: "@crypto_king", handle: "Alex Base", likes: 12400, desc: "First decentralized TikTok on Base! This changes everything 🚀 #pitok #base", song: "Pitok Anthem - Original", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
  { id: 2, user: "@pitok_queen", handle: "Sarah", likes: 45200, desc: "I earned $500 in 1 day on Pitok 😱💸 Tutorial inside!", song: "Viral - trending sound", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
  { id: 3, user: "@web3_babu", handle: "Babu Pi", likes: 89100, desc: "Building Pitok World in public 🌍 Day 7 - MAINNET LIVE!", song: "Building in public - pitokworld", video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
];

export default function PitokV2() {
  const [cur, setCur] = useState(0);
  const [showUpload, setShowUpload] = useState(false);
  const [preview, setPreview] = useState<string|null>(null);
  const [prog, setProg] = useState(0);
  const [uping, setUping] = useState(false);
  const [bal, setBal] = useState(12.4);
  const [liked, setLiked] = useState<number[]>([]);
  const [hearts, setHearts] = useState<{x:number,y:number,id:number}[]>([]);
  const [wallet, setWallet] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const vidRef = useRef<HTMLVideoElement>(null);

  useEffect(()=>{ vidRef.current?.play().catch(()=>{}); },[cur]);

  const like = (id:number, e:any)=>{
    const isLiked = liked.includes(id);
    setLiked(l=> isLiked? l.filter(x=>x!==id) : [...l,id]);
    if(!isLiked){
      const rect = e.currentTarget.getBoundingClientRect();
      const newH = {x: rect.left+20, y: rect.top, id: Date.now()};
      setHearts(h=>[...h,newH]);
      setTimeout(()=>setHearts(h=>h.filter(x=>x.id!==newH.id)),800);
    }
  };

  const upload = ()=>{
    if(!preview) return alert("📤 Select video!");
    setUping(true); let p=0;
    const iv=setInterval(()=>{ p+=10; setProg(p);
      if(p>=100){ clearInterval(iv); setUping(false); setShowUpload(false); setBal(b=>b+0.5); setPreview(null); setProg(0); alert("🚀 LIVE ON BASE! +$0.50 USDC! Wallet: "+(wallet?"0x...Babu":"Connect wallet to claim")); }
    },120);
  };

  const v = FEED[cur];

  return (
    <div style={{height:"100vh", background:"#000", color:"#fff", overflow:"hidden", position:"relative", fontFamily:"system-ui"}}>
      {/* VIDEO FEED */}
      <div style={{position:"absolute", inset:0}}>
        <video ref={vidRef} src={v.video} loop muted playsInline autoPlay style={{width:"100%", height:"100%", objectFit:"cover"}} onClick={(e:any)=>{like(v.id,e);}}/>
        <div style={{position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.8) 100%)", pointerEvents:"none"}}/>
      </div>

      {/* TOP */}
      <div style={{position:"absolute", top:0, width:"100%", padding:"12px 14px", display:"flex", justifyContent:"space-between", zIndex:10}}>
        <div style={{fontWeight:900, fontSize:"19px", textShadow:"0 2px 10px rgba(0,0,0,0.8)"}}>PITOK<span style={{background:"linear-gradient(to right, #fbbf24, #ff2c8a)", WebkitBackgroundClip:"text", color:"transparent"}}>WORLD</span> 🌍</div>
        <div style={{display:"flex", gap:"8px", alignItems:"center"}}>
          <div style={{padding:"5px 10px", borderRadius:"20px", background:"rgba(0,0,0,0.6)", border:"1px solid rgba(255,255,255,0.2)", fontSize:"11px", fontWeight:800}}>${bal.toFixed(2)}</div>
          <button onClick={()=>setWallet(!wallet)} style={{padding:"6px 12px", borderRadius:"20px", background: wallet? "#22c55e" : "rgba(0,0,0,0.6)", border:"1px solid rgba(255,255,255,0.3)", color:"#fff", fontSize:"11px", fontWeight:800}}>{wallet? "🟢 0xBabu" : "Connect"}</button>
          <button onClick={()=>setShowUpload(true)} style={{padding:"7px 14px", borderRadius:"20px", background:"linear-gradient(to right, #fbbf24, #ff2c8a)", border:"none", color:"#fff", fontWeight:900, fontSize:"12px", boxShadow:"0 0 15px rgba(255,44,138,0.5)"}}>+ Upload</button>
        </div>
      </div>

      {/* HEART POP ANIMATION */}
      {hearts.map(h=>(
        <div key={h.id} style={{position:"fixed", left:h.x, top:h.y, fontSize:"80px", animation:"pop 0.8s ease-out forwards", pointerEvents:"none", zIndex:50}}>❤️</div>
      ))}

      {/* RIGHT ACTIONS */}
      <div style={{position:"absolute", right:"10px", bottom:"110px", display:"flex", flexDirection:"column", gap:"18px", alignItems:"center", zIndex:10}}>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
          <div style={{width:"48px", height:"48px", borderRadius:"50%", background:"#fff", border:"2px solid #fff", display:"flex", alignItems:"center", justifyContent:"center"}}>👤</div>
          <div style={{width:"20px", height:"20px", borderRadius:"50%", background:"#fe2c55", marginTop:"-10px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"12px", fontWeight:900}}>+</div>
        </div>
        <div onClick={(e)=>like(v.id,e)} style={{display:"flex", flexDirection:"column", alignItems:"center", cursor:"pointer"}}>
          <div style={{width:"48px", height:"48px", borderRadius:"50%", background: liked.includes(v.id)? "rgba(254,44,85,0.3)" : "rgba(255,255,255,0.15)", backdropFilter:"blur(10px)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"28px", transform: liked.includes(v.id)? "scale(1.25)" : "scale(1)", transition:"0.2s"}}>{liked.includes(v.id)? "❤️" : "🤍"}</div>
          <span style={{fontSize:"12px", fontWeight:800, marginTop:"3px", textShadow:"0 1px 4px #000"}}>{(v.likes + (liked.includes(v.id)? 1 : 0)).toLocaleString()}</span>
        </div>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}><div style={{width:"48px", height:"48px", borderRadius:"50%", background:"rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px"}}>💬</div><span style={{fontSize:"12px", fontWeight:800}}>2.1K</span></div>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}><div style={{width:"48px", height:"48px", borderRadius:"50%", background:"rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px"}}>↗️</div><span style={{fontSize:"12px", fontWeight:800}}>Share</span></div>
        <div style={{width:"48px", height:"48px", borderRadius:"12px", background:"linear-gradient(135deg,#333,#000)", border:"1px solid rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden"}}><img src="https://i.pravatar.cc/100" style={{width:"28px", height:"28px", borderRadius:"50%"}}/></div>
      </div>

      {/* BOTTOM INFO */}
      <div style={{position:"absolute", bottom:"70px", left:"12px", right:"80px", zIndex:10, textShadow:"0 1px 8px rgba(0,0,0,0.9)"}}>
        <div style={{fontWeight:800, fontSize:"15px"}}>{v.user} • <span style={{opacity:0.7, fontSize:"12px"}}>{v.handle}</span></div>
        <div style={{fontSize:"13px", marginTop:"6px", lineHeight:"1.3"}}>{v.desc}</div>
        <div style={{display:"flex", alignItems:"center", gap:"6px", marginTop:"8px", fontSize:"12px"}}>🎵 {v.song} • <span style={{opacity:0.7}}>Base Chain</span></div>
        <div style={{display:"flex", gap:"5px", marginTop:"12px"}}>{FEED.map((_,i)=><div key={i} onClick={()=>setCur(i)} style={{width:i===cur?"22px":"6px", height:"6px", borderRadius:"10px", background:i===cur?"#fff":"rgba(255,255,255,0.4)", cursor:"pointer"}}/>)}</div>
      </div>

      {/* BOTTOM NAV */}
      <div style={{position:"absolute", bottom:0, width:"100%", display:"flex", justifyContent:"space-around", alignItems:"center", padding:"8px 0 14px 0", background:"#000", borderTop:"1px solid rgba(255,255,255,0.08)", zIndex:10}}>
        <span style={{fontSize:"10px", textAlign:"center", fontWeight:800}}>🏠<br/>Home</span>
        <span style={{fontSize:"10px", textAlign:"center", opacity:0.5}}>🔍<br/>Discover</span>
        <button onClick={()=>setShowUpload(true)} style={{width:"46px", height:"30px", borderRadius:"8px", background:"linear-gradient(to right, #25F4EE, #FE2C55)", border:"none", fontWeight:900, fontSize:"18px"}}>+</button>
        <span style={{fontSize:"10px", textAlign:"center", opacity:0.5}}>📥<br/>Inbox</span>
        <span style={{fontSize:"10px", textAlign:"center", opacity:0.5}}>👤<br/>You</span>
      </div>

      {/* UPLOAD MODAL V2 */}
      {showUpload && (
        <div style={{position:"fixed", inset:0, zIndex:100, background:"rgba(0,0,0,0.9)", backdropFilter:"blur(15px)", display:"flex", alignItems:"flex-end", justifyContent:"center"}}>
          <div style={{width:"100%", maxWidth:"500px", background:"#121212", borderRadius:"24px 24px 0 0", padding:"20px", borderTop:"1px solid #222"}}>
            <div style={{width:"36px", height:"4px", background:"#333", borderRadius:"10px", margin:"0 auto 18px"}}/>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px"}}><h2 style={{fontWeight:900}}>Upload to Pitok 🌍 V2</h2><button onClick={()=>setShowUpload(false)} style={{width:"30px", height:"30px", borderRadius:"50%", background:"#222", border:"none", color:"#fff"}}>✕</button></div>
            <input ref={fileRef} type="file" accept="video/*" hidden onChange={e=>e.target.files && setPreview(URL.createObjectURL(e.target.files[0]))}/>
            <div onClick={()=>fileRef.current?.click()} style={{border:"2px dashed #2a2a2a", borderRadius:"18px", padding: preview?"0":"36px 16px", textAlign:"center", background:"#0f0f0f", overflow:"hidden"}}>
              {preview? <video src={preview} controls style={{width:"100%", maxHeight:"280px"}}/> : <><div style={{fontSize:"42px"}}>📤</div><div style={{fontWeight:800, marginTop:"6px"}}>Tap to select video</div><div style={{fontSize:"11px", opacity:0.5, marginTop:"4px"}}>MP4 up to 100MB • 9:16 • IPFS + Base</div></>}
            </div>
            {preview && <div style={{marginTop:"12px"}}><div style={{height:"6px", background:"#222", borderRadius:"10px", overflow:"hidden"}}><div style={{width:`${prog}%`, height:"100%", background:"linear-gradient(to right, #fbbf24, #ff2c8a)", transition:"0.2s"}}/></div><div style={{fontSize:"10px", textAlign:"center", marginTop:"6px", opacity:0.6}}>{uping?`${prog}% UPLOADING TO IPFS & BASE...`:"Ready to mint on Base!"}</div></div>}
            <button onClick={upload} disabled={uping} style={{marginTop:"16px", width:"100%", padding:"16px", borderRadius:"50px", background: uping?"#222":"linear-gradient(to right, #fde68a, #ff2c8a)", border:"none", color:"#fff", fontWeight:900, fontSize:"16px", boxShadow: uping?"none":"0 0 30px rgba(255,44,138,0.5)", cursor:"pointer"}}>{uping?`⏳ ${prog}% MINTING...`:"🚀 VISIT NOW - GO LIVE & EARN $0.50 USDC"}</button>
            <div style={{fontSize:"9px", textAlign:"center", opacity:0.35, marginTop:"8px", letterSpacing:"1px"}}>AUTO PLAY • LIKE POP ❤️ • WALLET • IPFS • BASE MAINNET</div>
          </div>
        </div>
      )}

      <style>{`@keyframes pop{0%{transform:translateY(0) scale(0) rotate(-20deg);opacity:0}15%{opacity:1}100%{transform:translateY(-200px) scale(1.5) rotate(20deg);opacity:0}}`}</style>
    </div>
  );
}
