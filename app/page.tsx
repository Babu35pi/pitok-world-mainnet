"use client";
import { useState, useRef, useEffect } from "react";

declare global {
  interface Window {
    Pi: any;
  }
}

const FEED = [
{
id:1,
user:"@crypto_king",
handle:"Alex Pi",
likes:12400,
desc:"First TikTok on Pi! 🚀 #pitok #pi",
song:"Pitok Anthem",
video:"https://www.w3schools.com/html/mov_bbb.mp4"
},
{
id:2,
user:"@pitok_queen",
handle:"Sarah Pi",
likes:45200,
desc:"Earned 10 Pi in 1 day 😱💸",
song:"Pi Viral",
video:"https://www.w3schools.com/html/movie.mp4"
},
{
id:3,
user:"@web3_babu",
handle:"Babu Pi",
likes:89100,
desc:"Building on Pi Day 7 🌍 Uganda!",
song:"Building on Pi",
video:"https://www.w3schools.com/html/mov_bbb.mp4"
}
];

export default function Page(){
const [c,setC]=useState(0);
const [o,setO]=useState(false);
const [p,setP]=useState("");
const [pr,setPr]=useState(0);
const [up,setUp]=useState(false);
const [bal,setBal]=useState(12.4);
const [liked,setLiked]=useState<number[]>([]);
const [hearts,setHearts]=useState<any[]>([]);
const [piUser,setPiUser]=useState<any>(null);
const [auth,setAuth]=useState(false);
const fR=useRef<HTMLInputElement>(null);
const vR=useRef<HTMLVideoElement>(null);

useEffect(()=>{
if(typeof window!== "undefined"){
const s=document.createElement("script");
s.src="https://sdk.minepi.com/pi-sdk.js";
s.async=true;
s.onload=()=>{
console.log("Pi SDK loaded");
if((window as any).Pi){
(window as any).Pi.init({
version:"2.0",
sandbox:false
});
console.log("Pi init done");
}
};
document.head.appendChild(s);
}
},[]);

useEffect(()=>{
vR.current?.play().catch(()=>{});
},[c]);

const connectPi=async()=>{
try{
console.log("Connect clicked");
let pi=(window as any).Pi;
if(!pi){
alert("Pi SDK still loading... wait 3 sec and tap again!");
return;
}
const scopes=["username","payments","wallet_address"];
function onIncPay(pay:any){
console.log("Incomplete pay",pay);
}
const res=await pi.authenticate(scopes,onIncPay);
console.log("Auth OK",res);
setPiUser(res.user);
setAuth(true);
setBal(24.8);
alert("Welcome "+res.user.username+"! 🟣 Pi Connected!");
}catch(e:any){
console.log("Pi error",e);
alert("Auth failed: "+(e?.message||e));
}
};

const like=(id:number,e:any)=>{
const is=liked.includes(id);
setLiked(x=>is?x.filter(y=>y!==id):[...x,id]);
if(!is){
const r=e.currentTarget.getBoundingClientRect();
const nh={x:r.left+20,y:r.top,id:Date.now()};
setHearts(h=>[...h,nh]);
setTimeout(()=>setHearts(
h=>h.filter(z=>z.id!==nh.id)),800);
}
};

const addHeart=(e:any)=>{
const nh={
x:e.clientX-15,
y:e.clientY-30,
id:Date.now()
};
setHearts(h=>[...h,nh]);
setTimeout(()=>setHearts(
h=>h.filter(z=>z.id!==nh.id)),800);
};

const upload=()=>{
if(!p){
alert("Select video!");
return;
}
setUp(true);
let x=0;
const iv=setInterval(()=>{
x+=10;
setPr(x);
if(x>=100){
clearInterval(iv);
setUp(false);
setBal(b=>b+0.5);
alert(auth?
"✅ +0.5 Pi Earned!":
"✅ Uploaded! Connect Pi to earn Pi");
setO(false);
setP("");
setPr(0);
}
},150);
};

const v=FEED[c];

return(
<div style={{
height:"100vh",
background:"#000",
color:"#fff",
position:"relative",
overflow:"hidden"
}}>
<div style={{position:"absolute",inset:0}}
onClick={addHeart}>
<video
ref={vR}
src={v.video}
loop
muted
playsInline
autoPlay
style={{
width:"100%",
height:"100%",
objectFit:"cover"
}}
/>
<div style={{
position:"absolute",
inset:0,
background:"linear-gradient(to top,rgba(0,0,0,0.7),transparent 50%,rgba(0,0,0,0.3))"
}}/>
</div>

<div style={{
position:"absolute",
top:0,
left:0,
right:0,
display:"flex",
justifyContent:"space-between",
padding:"12px 14px",
zIndex:10
}}>
<div style={{fontWeight:900}}>
PITOKWORLD π
</div>
<div style={{display:"flex",gap:"8px"}}>
<div style={{
padding:"6px 10px",
background:"rgba(0,0,0,0.5)",
borderRadius:"20px",
fontSize:"12px"
}}>
{auth?`${bal.toFixed(2)} π`:`$${bal.toFixed(2)}`}
</div>
<button onClick={connectPi} style={{
padding:"6px 12px",
borderRadius:"20px",
border:"none",
background:auth?"#8a2be2":"#fff",
color:auth?"#fff":"#000",
fontWeight:700,
fontSize:"12px"
}}>
{auth?`🟣 ${piUser?.username}`:"Connect Pi"}
</button>
<button onClick={()=>setO(true)} style={{
padding:"6px 12px",
borderRadius:"20px",
border:"none",
background:"linear-gradient(90deg,#f9ff00,#a855f7)",
fontWeight:900,
fontSize:"12px"
}}>
+ Upload
</button>
</div>
</div>

{hearts.map((h:any)=>(
<div key={h.id} style={{
position:"fixed",
left:h.x,
top:h.y,
fontSize:"40px",
pointerEvents:"none",
animation:"pop 0.8s ease-out forwards",
zIndex:50
}}>
❤️
</div>
))}

<div style={{
position:"absolute",
right:"10px",
bottom:"120px",
display:"flex",
flexDirection:"column",
gap:"22px",
alignItems:"center",
zIndex:10
}}>
<button onClick={(e)=>like(v.id,e)}
style={{background:"none",border:"none",color:"#fff"}}>
<div style={{fontSize:"32px"}}>
{liked.includes(v.id)?"❤️":"🤍"}
</div>
<div style={{fontSize:"12px"}}>
{v.likes+(liked.includes(v.id)?1:0)}
</div>
</button>
<div>💬<div style={{fontSize:"12px"}}>2.1k</div></div>
<div>🔗<div style={{fontSize:"12px"}}>Share</div></div>
</div>

<div style={{
position:"absolute",
bottom:"65px",
left:"12px",
right:"75px",
zIndex:10
}}>
<div style={{fontWeight:700}}>
{v.user} • {v.handle}
</div>
<div style={{fontSize:"14px",marginTop:"4px"}}>
{v.desc}
</div>
<div style={{fontSize:"12px",marginTop:"6px"}}>
🎵 {v.song}
</div>
<div style={{display:"flex",gap:"8px",marginTop:"12px"}}>
<button onClick={()=>setC((c-1+FEED.length)%FEED.length)}
style={{
padding:"7px 14px",
borderRadius:"20px",
border:"none",
background:"rgba(255,255,255,0.2)",
color:"#fff"
}}>
⬆️ Prev
</button>
<button onClick={()=>setC((c+1)%FEED.length)}
style={{
padding:"7px 14px",
borderRadius:"20px",
border:"none",
background:"#fff",
color:"#000",
fontWeight:700
}}>
⬇️ Next
</button>
</div>
</div>

<div style={{
position:"absolute",
bottom:0,
left:0,
right:0,
height:"50px",
background:"#000",
display:"flex",
justifyContent:"space-around",
alignItems:"center",
borderTop:"1px solid #222",
zIndex:10,
fontSize:"12px"
}}>
<div>🏠 Home</div>
<div>🔍 Discover</div>
<div>📥 Inbox</div>
<div>👤 You</div>
</div>

{o&&(
<div style={{
position:"absolute",
inset:0,
background:"rgba(0,0,0,0.92)",
zIndex:100,
display:"flex",
justifyContent:"center",
alignItems:"center",
padding:"16px"
}}>
<div style={{
background:"#111",
width:"100%",
maxWidth:"360px",
borderRadius:"20px",
padding:"20px",
border:"1px solid #333"
}}>
<div style={{
display:"flex",
justifyContent:"space-between",
marginBottom:"14px"
}}>
<div style={{fontWeight:900}}>
{auth?"Upload & Earn Pi π":"Upload to Pitok"}
</div>
<button onClick={()=>setO(false)}
style={{
background:"#222",
border:"none",
color:"#fff",
width:"28px",
height:"28px",
borderRadius:"50%"
}}>
✕
</button>
</div>
<div onClick={()=>fR.current?.click()}
style={{
height:"170px",
border:"2px dashed #444",
borderRadius:"14px",
display:"flex",
justifyContent:"center",
alignItems:"center",
overflow:"hidden",
background:"#000"
}}>
{p?(
<video
src={p}
style={{width:"100%",height:"100%",objectFit:"cover"}}
muted
/>
):(
<div style={{textAlign:"center"}}>
<div style={{fontSize:"30px"}}>📹</div>
<div style={{
fontSize:"13px",
opacity:0.7,
marginTop:"6px"
}}>
Tap to select video<br/>
{auth?"Earn 0.5 π":"Earn $0.50"}
</div>
</div>
)}
</div>
<input
ref={fR}
type="file"
accept="video/*"
hidden
onChange={e=>{
const f=e.target.files?.[0];
if(f)setP(URL.createObjectURL(f));
}}
/>
{up&&(
<div style={{marginTop:"14px"}}>
<div style={{
height:"8px",
background:"#222",
borderRadius:"10px",
overflow:"hidden"
}}>
<div style={{
width:`${pr}%`,
height:"100%",
background:"linear-gradient(90deg,#f9ff00,#a855f7)"
}}/>
</div>
<div style={{
textAlign:"center",
fontSize:"12px",
marginTop:"6px"
}}>
{pr}% Uploading...
</div>
</div>
)}
<button onClick={upload} disabled={up}
style={{
width:"100%",
marginTop:"16px",
padding:"14px",
borderRadius:"30px",
border:"none",
background:"linear-gradient(90deg,#f9ff00,#a855f7)",
fontWeight:900
}}>
{up?`Uploading ${pr}%...`:`🚀 POST NOW - EARN ${auth?"0.5 π":"$0.50"}`}
</button>
{!auth&&(
<div style={{
textAlign:"center",
fontSize:"11px",
marginTop:"8px",
opacity:0.7
}}>
Connect Pi Wallet to earn Pi!
</div>
)}
</div>
</div>
)}

<style>{`@keyframes pop{
0%{transform:translateY(0) scale(0);opacity:1}
50%{transform:translateY(-70px) scale(1.3);opacity:1}
100%{transform:translateY(-140px) scale(0.7);opacity:0}
}`}</style>
</div>
);
  }
