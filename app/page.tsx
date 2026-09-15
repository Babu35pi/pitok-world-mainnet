"use client";
import { useState,useRef,useEffect } from "react";
const F=[
{id:1,u:"@crypto_king",d:"Pitok on Base! 🚀",v:"https://www.w3schools.com/html/movie.mp4"},
{id:2,u:"@pitok_queen",d:"Earned $500 😱",v:"https://www.w3schools.com/html/mov_bbb.mp4"},
{id:3,u:"@web3_babu",d:"Day 7 LIVE 🌍",v:"https://www.w3schools.com/html/movie.mp4"}];
export default function P(){
const [c,s]=useState(0);
const r=useRef<HTMLVideoElement>(null);
useEffect(()=>{r.current?.play().catch(()=>{});},[c]);
const x=F[c];
return(<div style={{height:"100vh",background:"#000",color:"#fff",position:"relative",overflow:"hidden"}}>
<video ref={r} src={x.v} autoPlay loop muted playsInline style={{width:"100%",height:"100%",objectFit:"cover"}}/>
<div style={{position:"absolute",top:10,left:10,fontWeight:900}}>PITOKWORLD 🌍 FIXED</div>
<div style={{position:"absolute",bottom:80,left:10,right:60}}>
<div>{x.u}</div><div>{x.d}</div>
<div style={{display:"flex",gap:10,marginTop:10}}>
<button onClick={()=>s((c-1+F.length)%F.length)}>⬆️ Prev</button>
<button onClick={()=>s((c+1)%F.length)}>⬇️ Next</button>
</div></div></div>);}
