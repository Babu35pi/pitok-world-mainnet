'use client'
import React,{useState,useRef,useEffect} from 'react'
import {motion,AnimatePresence} from 'framer-motion'
import {Heart,MessageCircle,Bookmark,Share2,Music2,Volume2,VolumeX,Search,Home as HomeIcon,Plus,User,Download,X,Zap,Sparkles,Hash,Send,Wallet,Play} from 'lucide-react'

type Comment = {id:number,user:string,text:string}
type Video = {id:number,creator:string,name:string,avatar:string,color:string,title:string,tags:string,likes:string,commentsCount:string,shares:string,video:string,song:string,commentsList:Comment[]}

const DEMO:Video[]=[
{id:1,creator:'@luna.pi',name:'Luna Chen',avatar:'LC',color:'from-[#6e00ff] via-[#b21cff] to-[#ffb800]',title:'POV: you found the best sunset spot on Pi Island 🌅🔥',tags:'#PiIsland #SunsetTok #PiNetwork #Kampala',likes:'24.8K',commentsCount:'492',shares:'1.8K',video:'https://cdn.coverr.co/videos/coverr-a-woman-walking-on-the-beach-1576/1080p.mp4',song:'original sound · luna.pi',commentsList:[{id:1,user:'@pi_lover',text:'This is fire! 🔥'}, {id:2,user:'@ug_boy',text:'Masajja vibes! 🇺🇬'}]},
{id:2,creator:'@tesla.pi',name:'Tesla Maker',avatar:'TM',color:'from-[#00f2ff] to-[#6e00ff]',title:'Building Pitok World in 24 hours with Pi Network ⚡️ Full build log',tags:'#BuildInPublic #PiNetwork #TeslaPi #Web3',likes:'18.2K',commentsCount:'312',shares:'902',video:'https://cdn.coverr.co/videos/coverr-typing-on-computer-keyboard-1584/1080p.mp4',song:'pitok beat · tesla.pi',commentsList:[{id:1,user:'@builder',text:'Insane work bro'}]},
{id:3,creator:'@masajja.vibe',name:'Kampala Vibe',avatar:'KV',color:'from-[#ffb800] to-[#ff0055]',title:'Masajja nights are different! You need to be here 🇺🇬✨',tags:'#Uganda #Kampala #Masajja #PitokWorld',likes:'32.1K',commentsCount:'1.2K',shares:'2.3K',video:'https://cdn.coverr.co/videos/coverr-city-at-night-1578/1080p.mp4',song:'Uganda vibe · kampala.vibe',commentsList:[]},
{id:4,creator:'@pi.pioneer',name:'Pi Pioneer',avatar:'PP',color:'from-[#00ff88] to-[#6e00ff]',title:'How I earned 500 Pi from my Pitok videos this week 💰 Tutorial',tags:'#PiTips #EarnPi #CryptoTok',likes:'45K',commentsCount:'2K',shares:'5K',video:'https://cdn.coverr.co/videos/coverr-people-dancing-at-a-festival-1579/1080p.mp4',song:'money sound · pi.pioneer',commentsList:[]},
]

export default function PitokWorld(){
const[videos,setVideos]=useState<Video[]>(DEMO)
const[activeIdx,setActiveIdx]=useState(0)
const[liked,setLiked]=useState<number[]>([])
const[saved,setSaved]=useState<number[]>([])
const[followed,setFollowed]=useState<number[]>([])
const[muted,setMuted]=useState(true)
const[heart,setHeart]=useState<number|null>(null)
const[progress,setProgress]=useState(0)
const[showComments,setShowComments]=useState<Video|null>(null)
const[showUpload,setShowUpload]=useState(false)
const[showProfile,setShowProfile]=useState(false)
const[searchTag,setSearchTag]=useState('')
const[commentText,setCommentText]=useState('')
const containerRef=useRef<HTMLDivElement>(null)
const videoRefs=useRef<(HTMLVideoElement|null)[]>([])

const filtered = searchTag? videos.filter(v=>v.tags.toLowerCase().includes(searchTag.toLowerCase()) || v.title.toLowerCase().includes(searchTag.toLowerCase())) : videos
const currentVideo = filtered[activeIdx] || filtered[0]

useEffect(()=>{
const obs=new IntersectionObserver((entries)=>{
entries.forEach(e=>{
if(e.isIntersecting){
const idx=Number((e.target as HTMLElement).dataset.index)
setActiveIdx(idx)
videoRefs.current[idx]?.play().catch(()=>{})
}})
},{threshold:0.7})
document.querySelectorAll('[data-index]').forEach(el=>obs.observe(el))
return()=>obs.disconnect()
},[filtered])

const handleTap=(id:number)=>{
setHeart(id)
if(!liked.includes(id)) setLiked([...liked,id])
setTimeout(()=>setHeart(null),900)
}
const toggleLike=(id:number)=>{
setLiked(p=>p.includes(id)?p.filter(i=>i!==id):[...p,id])
if(!liked.includes(id)){setHeart(id);setTimeout(()=>setHeart(null),900)}
}
const handleDownload=(v:Video)=>{
const a=document.createElement('a')
a.href=v.video
a.download=`pitok-${v.creator}-${Date.now()}.mp4`
a.target='_blank'
a.click()
}
const handleShare=async(v:Video)=>{
if(navigator.share){try{await navigator.share({title:v.title,text:v.tags,url:window.location.href})}catch{}}else{await navigator.clipboard.writeText(window.location.href);alert('Link copied! 🔗')}
}
const addComment=()=>{
if(!commentText.trim()||!showComments) return
const newC={id:Date.now(),user:'@you.on.pi',text:commentText}
setVideos(vs=>vs.map(v=>v.id===showComments.id?{...v,commentsList:[...v.commentsList,newC]}:v))
setShowComments(s=>s?{...s,commentsList:[...s.commentsList,newC]}:null)
setCommentText('')
}
const handlePublish=(data:{url:string,title:string,tags:string})=>{
const nv:Video={id:Date.now(),creator:'@you.on.pi',name:'You',avatar:'YO',color:'from-[#6e00ff] via-[#ff00d4] to-[#ffb800]',title:data.title||'My Pitok moment ✨',tags:data.tags||'#PitokWorld #PiNetwork',likes:'0',commentsCount:'0',shares:'0',video:data.url,song:'original sound · you.on.pi',commentsList:[]}
setVideos([nv,...videos])
setActiveIdx(0)
setTimeout(()=>containerRef.current?.scrollTo({top:0,behavior:'smooth'}),100)
}

return(
<div className="relative h-[100dvh] w-screen bg-black text-white overflow-hidden font-sans">
<style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap'); *{font-family:'Outfit',sans-serif} ::-webkit-scrollbar{display:none}`}</style>

{/* HEADER */}
<div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
<div className="flex items-center gap-2"><div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6e00ff] to-[#ffb800] flex items-center justify-center font-black">P</div><b>Pitok World</b><span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">MAINNET</span></div>
<div className="flex gap-2">
<div className="relative"><Search size={16} className="absolute left-2 top-2.5 opacity-50"/><input value={searchTag} onChange={e=>setSearchTag(e.target.value)} placeholder="Search #hashtag" className="bg-white/10 backdrop-blur rounded-full pl-8 pr-3 py-2 text-sm outline-none w-32 focus:w-44 transition-all"/></div>
<button onClick={()=>setMuted(!muted)} className="w-9 h-9 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">{muted?<VolumeX size={18}/>:<Volume2 size={18}/>}</button>
</div>
</div>

{/* FEED */}
<div ref={containerRef} className="h-full overflow-y-scroll snap-y snap-mandatory">
{filtered.map((v,idx)=>(
<div key={v.id} data-index={idx} className="relative h-[100dvh] w-full snap-start flex items-center justify-center bg-[#0a0014] overflow-hidden" onClick={()=>handleTap(v.id)}>
<video ref={el=>{videoRefs.current[idx]=el}} src={v.video} muted={muted} loop playsInline autoPlay={idx===0} onTimeUpdate={e=>{if(idx===activeIdx){const p=(e.currentTarget.currentTime/e.currentTarget.duration)*100; setProgress(p||0)}}} className="absolute inset-0 w-full h-full object-cover"/>
<div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"/>
{idx===activeIdx && <div className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-[#6e00ff] to-[#ffb800] transition-all" style={{width:`${progress}%`}}/>}
<AnimatePresence>{heart===v.id&&<motion.div initial={{scale:0,opacity:0}} animate={{scale:1.2,opacity:1}} exit={{scale:1.5,opacity:0}} className="absolute z-20 pointer-events-none"><Heart size={100} className="text-[#ff2a6d] fill-[#ff2a6d] drop-shadow-2xl"/></motion.div>}</AnimatePresence>

{/* LEFT INFO */}
<div className="absolute bottom-24 left-4 right-20 z-10">
<div className="flex items-center gap-3 mb-3">
<div className={`w-11 h-11 rounded-full bg-gradient-to-br ${v.color} flex items-center justify-center font-black border-2 border-white`}>{v.avatar}</div>
<div className="flex-1"><div className="font-bold text-[15px]">{v.creator} <span className="text-[#00f2ff]">✓</span></div><div className="text-xs opacity-70">{v.name} · 2h ago · Masajja, UG</div></div>
<button onClick={e=>{e.stopPropagation();setFollowed(p=>p.includes(v.id)?p.filter(i=>i!==v.id):[...p,v.id])}} className={`px-4 py-1.5 rounded-full text-xs font-bold ${followed.includes(v.id)?'bg-white/20 text-white':'bg-white text-black'}`}>{followed.includes(v.id)?'Following':'Follow'}</button>
</div>
<p className="text-[15px] leading-5 mb-1.5 pr-2">{v.title}</p>
<div className="flex flex-wrap gap-1.5 mb-2">
{v.tags.split(' ').map((t,i)=><button key={i} onClick={e=>{e.stopPropagation();setSearchTag(t)}} className="text-[#a78bfa] text-[13px] font-bold hover:text-white"> {t}</button>)}
</div>
<div className="flex items-center gap-2 text-xs opacity-80"><Music2 size={12}/><span className="animate-pulse">{v.song}</span></div>
</div>

{/* RIGHT ACTIONS */}
<div className="absolute right-2 bottom-28 z-10 flex flex-col gap-5 items-center">
<button onClick={e=>{e.stopPropagation();toggleLike(v.id)}} className="flex flex-col items-center"><div className={`w-12 h-12 rounded-full backdrop-blur bg-white/15 flex items-center justify-center ${liked.includes(v.id)?'text-[#ff2a6d]':''}`}><Heart fill={liked.includes(v.id)?'currentColor':'none'} /></div><span className="text-[11px] font-bold mt-1">{liked.includes(v.id)?(parseInt(v.likes.replace('K',''))+0.1).toFixed(1)+'K':v.likes}</span></button>
<button onClick={e=>{e.stopPropagation();setShowComments(v)}} className="flex flex-col items-center"><div className="w-12 h-12 rounded-full backdrop-blur bg-white/15 flex items-center justify-center"><MessageCircle/></div><span className="text-[11px] font-bold mt-1">{v.commentsList.length||v.commentsCount}</span></button>
<button onClick={e=>{e.stopPropagation();setSaved(p=>p.includes(v.id)?p.filter(i=>i!==v.id):[...p,v.id])}} className="flex flex-col items-center"><div className={`w-12 h-12 rounded-full backdrop-blur bg-white/15 flex items-center justify-center ${saved.includes(v.id)?'text-[#ffb800]':''}`}><Bookmark fill={saved.includes(v.id)?'currentColor':'none'}/></div><span className="text-[11px] mt-1">Save</span></button>
<button onClick={e=>{e.stopPropagation();handleShare(v)}} className="flex flex-col items-center"><div className="w-12 h-12 rounded-full backdrop-blur bg-white/15 flex items-center justify-center"><Share2/></div><span className="text-[11px] mt-1">{v.shares}</span></button>
<button onClick={e=>{e.stopPropagation();handleDownload(v)}} className="flex flex-col items-center"><div className="w-12 h-12 rounded-full backdrop-blur bg-white/15 flex items-center justify-center"><Download size={20}/></div><span className="text-[11px] mt-1">Save</span></button>
<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6e00ff] to-[#ffb800] animate-spin-slow flex items-center justify-center"><Music2 size={14}/></div>
</div>
</div>
))}
{filtered.length===0 && <div className="h-[100dvh] flex flex-col items-center justify-center gap-3"><Hash size={40} className="opacity-30"/><p>No videos for {searchTag}</p><button onClick={()=>setSearchTag('')} className="px-4 py-2 bg-white text-black rounded-full font-bold">Clear search</button></div>}
</div>

{/* BOTTOM NAV */}
<div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black to-transparent pt-8 pb-6 flex justify-around items-end">
<button className="flex flex-col items-center text-white"><HomeIcon/><span className="text-[10px] mt-1 font-bold">Home</span></button>
<button className="flex flex-col items-center opacity-60"><Search size={20}/><span className="text-[10px]">Discover</span></button>
<button onClick={()=>setShowUpload(true)} className="flex flex-col items-center"><div className="w-12 h-[34px] bg-white rounded-[10px] flex items-center justify-center -mb-1 border-2 border-black"><Plus className="text-black"/><div className="w-0.5"/></div><span className="text-[10px] mt-2 font-bold">Create</span></button>
<button onClick={()=>setShowProfile(true)} className="flex flex-col items-center opacity-60"><Wallet size={20}/><span className="text-[10px]">Wallet</span></button>
<button onClick={()=>setShowProfile(true)} className="flex flex-col items-center opacity-60"><div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"><User size={14}/></div><span className="text-[10px]">You</span></button>
</div>

{/* COMMENTS */}
<AnimatePresence>{showComments&&(
<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 z-30 bg-black/60 backdrop-blur-sm flex items-end" onClick={()=>setShowComments(null)}>
<motion.div initial={{y:'100%'}} animate={{y:0}} exit={{y:'100%'}} onClick={e=>e.stopPropagation()} className="w-full bg-[#161616] rounded-t-[24px] max-h-[75vh] flex flex-col">
<div className="p-4 flex justify-between border-b border-white/10"><b>{showComments.commentsList.length} comments</b><button onClick={()=>setShowComments(null)}><X size={18}/></button></div>
<div className="flex-1 overflow-y-auto p-4 space-y-4">
{showComments.commentsList.map(c=><div key={c.id} className="flex gap-3"><div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs">{c.user[1]}</div><div><b className="text-sm">{c.user}</b><p className="text-sm opacity-90">{c.text}</p></div></div>)}
{showComments.commentsList.length===0 && <p className="text-center opacity-50 py-10">No comments yet. Be first! ✨</p>}
</div>
<div className="p-3 flex gap-2 border-t border-white/10"><input value={commentText} onChange={e=>setCommentText(e.target.value)} placeholder="Add comment... #hashtag" className="flex-1 bg-white/10 rounded-full px-4 py-2.5 text-sm outline-none"/><button onClick={addComment} className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center"><Send size={18}/></button></div>
</motion.div>
</motion.div>
)}</AnimatePresence>

{/* UPLOAD */}
<AnimatePresence>{showUpload&&<UploadPanel onClose={()=>setShowUpload(false)} onPublish={handlePublish}/>}</AnimatePresence>

{/* PROFILE */}
<AnimatePresence>{showProfile&&(
<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 z-30 bg-[#0a0014] p-6 overflow-y-auto">
<button onClick={()=>setShowProfile(false)} className="mb-6 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center"><X/></button>
<div className="text-center">
<div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#6e00ff] to-[#ffb800] flex items-center justify-center text-3xl font-black">YO</div>
<h2 className="mt-4 text-2xl font-black">@you.on.pi ✓</h2><p className="opacity-60 text-sm">Masajja, Kampala · Pi Pioneer since 2021</p>
<div className="grid grid-cols-3 gap-4 mt-6 bg-white/5 rounded-2xl p-4"><div><b>{videos.filter(v=>v.creator==='@you.on.pi').length}</b><div className="text-xs opacity-60">Videos</div></div><div><b>12.4K</b><div className="text-xs opacity-60">Followers</div></div><div><b>847</b><div className="text-xs opacity-60">Pi Earned</div></div></div>
<button className="mt-6 w-full py-3 rounded-full bg-gradient-to-r from-[#6e00ff] to-[#b21cff] font-bold flex items-center justify-center gap-2"><Wallet/> Connect Pi Wallet</button>
<div className="mt-6 grid grid-cols-3 gap-2">{videos.filter(v=>v.creator==='@you.on.pi').map(v=><div key={v.id} className="aspect-[9/16] bg-white/5 rounded-xl overflow-hidden relative"><video src={v.video} className="w-full h-full object-cover"/><div className="absolute bottom-1 left-1 text-[10px] flex gap-1"><Play size={10}/>{v.likes}</div></div>)}</div>
</div>
</motion.div>
)}</AnimatePresence>
</div>
)
}

function UploadPanel({onClose,onPublish}:{onClose:()=>void,onPublish:(d:{url:string,title:string,tags:string})=>void}){
const fileRef=useRef<HTMLInputElement>(null)
const[preview,setPreview]=useState('')
const[title,setTitle]=useState('')
const[tags,setTags]=useState('')
const[uploading,setUploading]=useState(false)
const[progress,setProg]=useState(0)

const handleFile=(f:File)=>{
setPreview(URL.createObjectURL(f))
setProg(0)
}
const simulateUpload=()=>{
if(!preview) {alert('Select video first! 🎬'); return}
setUploading(true)
let p=0
const iv=setInterval(()=>{p+=12; setProg(p); if(p>=100){clearInterval(iv); onPublish({url:preview,title,tags}); setUploading(false); onClose()}},200)
}

return(
<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 z-40 bg-black/70 backdrop-blur-md flex items-end" onClick={onClose}>
<motion.div initial={{y:'100%'}} animate={{y:0}} exit={{y:'100%'}} onClick={e=>e.stopPropagation()} className="w-full bg-[#181818] rounded-t-[28px] p-5 max-h-[90vh] overflow-y-auto">
<div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4"/>
<div className="flex justify-between items-center mb-4"><h3 className="font-black text-lg flex items-center gap-2"><Sparkles className="text-[#ffb800]"/> Create Pitok</h3><button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><X size={16}/></button></div>
<input ref={fileRef} type="file" accept="video/*" className="hidden" onChange={e=>{const f=e.target.files?.[0]; if(f) handleFile(f)}}/>
<div onClick={()=>fileRef.current?.click()} className="border-2 border-dashed border-[#6e00ff]/50 rounded-2xl p-6 text-center bg-[#6e00ff]/5 cursor-pointer">
{preview?<video src={preview} controls className="w-full max-h-64 rounded-xl mx-auto"/>:<><div className="text-5xl mb-3">🎬</div><b>Tap to upload video</b><p className="text-xs opacity-60 mt-1">MP4, MOV, WebM - up to 500MB, TikTok style</p><div className="mt-3 px-5 py-2 bg-white text-black rounded-full inline-block font-bold text-sm">Select from Gallery</div></>}
</div>
{preview &&!uploading && <div className="mt-3 text-xs text-[#00ff88] font-bold">✓ Ready - {title.length>0?'':'Add caption'} and Publish!</div>}
{uploading && <div className="mt-4"><div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-[#6e00ff] to-[#ffb800] transition-all" style={{width:`${progress}%`}}/></div><p className="text-xs mt-2 text-center">Uploading to Pi Mainnet... {progress}%</p></div>}
<div className="mt-4 space-y-3">
<div className="bg-white/5 rounded-xl p-3 flex gap-2"><input value={title} onChange={e=>setTitle(e.target.value)} maxLength={150} placeholder="Tell your story... What is happening?" className="flex-1 bg-transparent outline-none text-sm"/><span className="text-[11px] opacity-40">{title.length}/150</span></div>
<div className="bg-white/5 rounded-xl p-3 flex items-center gap-2"><Hash size={16} className="opacity-50"/><input value={tags} onChange={e=>setTags(e.target.value)} placeholder="#hashtags e.g. #Pi #Kampala #PitokWorld" className="flex-1 bg-transparent outline-none text-sm"/></div>
<div className="grid grid-cols-2 gap-2 text-[11px]"><button className="py-2 rounded-full bg-white/10">🎵 Add Sound</button><button className="py-2 rounded-full bg-white/10">✨ Effects</button></div>
</div>
<button disabled={uploading} onClick={simulateUpload} className="mt-5 w-full py-4 rounded-full bg-gradient-to-r from-[#6e00ff] via-[#b21cff] to-[#ffb800] font-black text-[16px] flex items-center justify-center gap-2 disabled:opacity-50"><Zap/> {uploading?`Publishing ${progress}%`:'Publish to Pitok World'} </button>
<p className="text-[10px] opacity-40 text-center mt-3">By publishing, you agree to Pitok community guidelines. Video will be on Pi Mainnet.</p>
</motion.div>
</motion.div>
)
}
