"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VIDEOS = [
  { id: 1, user: "@africa_dance", likes: 12300, comments: 342, caption: "PITOK World is LIVE! 🌍", bg: "from-violet-600 to-blue-600", verified: true },
  { id: 2, user: "@kampala_vibes", likes: 8900, comments: 201, caption: "Kampala to the world! 🚀", bg: "from-pink-600 to-orange-600", verified: false },
  { id: 3, user: "@you.world", likes: 1200, comments: 12, caption: "Welcome to Pitok!", bg: "from-emerald-600 to-teal-600", verified: false },
];

export default function Page() {
  const [idx, setIdx] = useState(0);
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const [preview, setPreview] = useState<string|null>(null);
  const [prog, setProg] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [balance, setBalance] = useState(12.4);
  const fileRef = useRef<HTMLInputElement>(null);
  const current = VIDEOS[idx];
  const isLiked = likedIds.includes(current.id);

  const toggleLike = () => {
    if (isLiked) setLikedIds(likedIds.filter(id => id!== current.id));
    else setLikedIds([...likedIds, current.id]);
  };
  const handleFile = (f: File) => { setPreview(URL.createObjectURL(f)); };
  const doUpload = () => {
    if (!preview) return alert('Select video!');
    setUploading(true); let p=0;
    const iv=setInterval(()=>{ p+=10; setProg(p); if(p>=100){ clearInterval(iv); setUploading(false); setShowUpload(false); setPreview(null); setBalance(b=>b+0.5); alert('LIVE!'); } },150);
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      <div className="absolute top-0 w-full z-40 p-4 flex justify-between bg-gradient-to-b from-black/80 to-transparent">
        <h1 className="font-black text-xl">PITOK<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-500">WORLD</span></h1>
        <div className="flex gap-2">
          <button onClick={()=>setShowUpload(true)} className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 to-pink-600 font-black text-sm shadow-[0_0_20px_rgba(251,146,60,0.6)]">+ Upload</button>
          <button onClick={()=>setShowProfile(true)} className="w-9 h-9 rounded-full bg-white/15">👤</button>
        </div>
      </div>        <div className="h-screen w-full relative bg-black">
        <div className={`absolute inset-0 bg-gradient-to-br ${current.bg} flex flex-col justify-end`}>
          <div className="absolute right-2 bottom-[110px] flex flex-col gap-5 items-center z-20">
            <button onClick={toggleLike} className="flex flex-col items-center"><div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${isLiked?'bg-gradient-to-r from-pink-500 to-red-600':'bg-white/20'}`}>{isLiked?'❤️':'🤍'}</div><span className="text-xs font-bold mt-1">{current.likes}</span></button>
            <button onClick={()=>setShowComments(true)} className="flex flex-col items-center"><div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">💬</div><span className="text-xs font-bold mt-1">{current.comments}</span></button>
          </div>
          <div className="p-4 pr-20 pb-20 bg-gradient-to-t from-black via-black/60 to-transparent">
            <p className="font-black text-lg">{current.user}</p>
            <p className="text-sm mt-1">{current.caption}</p>
          </div>
        </div>

        {/* MEGA VISIT BUTTON - NO BLACK - 100% RAINBOW */}
        <button onClick={()=>setShowUpload(true)} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 group px-10 py-4 rounded-full bg-gradient-to-r from-amber-300 via-orange-500 to-pink-600 font-black text-white text-xl shadow-[0_0_60px_rgba(245,158,11,1)] hover:scale-110 transition-all">
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-pink-600 blur-2xl opacity-80 -z-10 animate-pulse"></span>
          🚀 VISIT NOW
        </button>

        <div className="absolute bottom-0 w-full z-30 flex justify-around py-3 bg-black border-t border-white/10">
          <span>🏠 Home</span><span>🔍</span><button onClick={()=>setShowUpload(true)} className="w-12 h-8 rounded-lg bg-gradient-to-r from-amber-400 to-pink-600 font-black">+</button><span>📥</span><button onClick={()=>setShowProfile(true)}>👤</button>
        </div>
      </div>

      <AnimatePresence>
        {showUpload && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
            <motion.div initial={{y:'100%'}} animate={{y:0}} exit={{y:'100%'}} className="w-full max-w-md bg-[#161616] rounded-[2rem] p-7 border border-white/10">
              <div className="flex justify-between mb-6"><h2 className="text-xl font-black">Upload</h2><button onClick={()=>setShowUpload(false)} className="w-8 h-8 rounded-full bg-white/10">✕</button></div>
              <input ref={fileRef} type="file" accept="video/*" hidden onChange={e=>e.target.files&&handleFile(e.target.files[0])}/>
              <div onClick={()=>fileRef.current?.click()} className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center bg-white/5 cursor-pointer">{preview?<video src={preview} controls className="w-full rounded-xl"/>:<p>📤 Tap to select video</p>}</div>
              {preview && <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden"><div style={{width:`${prog}%`}} className="h-full bg-gradient-to-r from-amber-400 to-pink-600"/></div>}
              <button disabled={uploading} onClick={doUpload} className="mt-6 w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-pink-600 font-black text-white text-lg shadow-[0_0_40px_rgba(245,158,11,0.8)] hover:scale-[1.02] transition-all">
                {uploading?`${prog}% UPLOADING...`:'🚀 VISIT NOW - GO LIVE!'}
              </button>
            </motion.div>
          </motion.div>
        )}
        {showProfile && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[80] bg-black flex flex-col p-6 text-center">
            <button onClick={()=>setShowProfile(false)} className="absolute top-5 left-5 text-2xl">←</button>
            <div className="mt-16">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-amber-400 to-pink-600 p-1"><div className="w-full h-full rounded-full bg-black flex items-center justify-center text-3xl">👤</div></div>
              <h2 className="mt-4 text-2xl font-black">@you.world</h2>
              <p className="opacity-60 text-sm">Kampala, Uganda 🇺🇬</p>
              <div className="mt-6 bg-white/5 rounded-2xl p-4"><p className="text-xs opacity-50">Total Earned</p><p className="font-black text-xl text-amber-400">${balance.toFixed(2)}</p></div>
              <button onClick={()=>{setShowProfile(false); setShowUpload(true);}} className="mt-6 w-full py-4 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-pink-600 font-black text-white text-lg shadow-[0_0_40px_rgba(245,158,11,0.9)] hover:scale-[1.02] transition-all">
                🚀 VISIT PITOK WORLD
              </button>
            </div>
          </motion.div>
        )}
        {showComments && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[80] bg-black/60 flex items-end" onClick={()=>setShowComments(false)}>
            <motion.div initial={{y:'100%'}} animate={{y:0}} exit={{y:'100%'}} onClick={e=>e.stopPropagation()} className="w-full bg-[#161616] rounded-t-[2rem] p-5 h-[50vh]"><h3 className="font-black mb-4">Comments</h3><p className="opacity-50">No comments yet!</p></motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
      }
