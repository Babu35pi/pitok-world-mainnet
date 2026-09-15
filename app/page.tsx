"use client";
import { useState, useRef } from "react";

const VIDEOS = [
  { id: 1, user: "@crypto_king", name: "Alex Base", likes: "12.4K", desc: "First video on Pitok World! 🚀 #pitok #base #web3", song: "Original sound - pitokworld", color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
  { id: 2, user: "@pitok_queen", name: "Sarah", likes: "45.2K", desc: "How I made $500 on Pitok in 1 day 😱💸", song: "Viral sound - trending", color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
  { id: 3, user: "@web3builder", name: "Babu Pi", likes: "89.1K", desc: "Building decentralized TikTok on Base chain! 🌍", song: "Pitok anthem - official", color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
];

export default function PitokMega() {
  const [showUpload, setShowUpload] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [prog, setProg] = useState(0);
  const [balance, setBalance] = useState(12.40);
  const [liked, setLiked] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    if (!preview) return alert("📤 Please select a video first!");
    setUploading(true);
    let p = 0;
    const iv = setInterval(() => {
      p += 8;
      setProg(p);
      if (p >= 100) {
        clearInterval(iv);
        setUploading(false);
        setShowUpload(false);
        setBalance(b => b + 0.5);
        setPreview(null);
        setProg(0);
        alert("🚀 VIDEO LIVE ON PITOK WORLD! +$0.50 earned!");
      }
    }, 120);
  };

  const toggleLike = (id: number) => {
    setLiked(l => l.includes(id) ? l.filter(x => x !== id) : [...l, id]);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", fontFamily: "system-ui", overflow: "hidden", position: "relative" }}>
      
      {/* MAIN FEED */}
      <div style={{ height: "100vh", position: "relative", overflow: "hidden" }}>
        {VIDEOS.map((v, idx) => (
          <div key={v.id} style={{
            position: "absolute", inset: 0,
            background: v.color,
            display: idx === current ? "flex" : "none",
            flexDirection: "column",
            transition: "all 0.3s"
          }}>
            {/* Top Bar */}
            <div style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)", zIndex: 10 }}>
              <h1 style={{ fontWeight: 900, fontSize: "20px", letterSpacing: "-0.5px" }}>PITOK<span style={{ background: "linear-gradient(to right, #fbbf24, #ec4899)", WebkitBackgroundClip: "text", color: "transparent" }}>WORLD</span> 🌍</h1>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <div style={{ padding: "6px 12px", borderRadius: "20px", background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.2)", fontSize: "12px", fontWeight: 700 }}>${balance.toFixed(2)}</div>
                <button onClick={() => setShowUpload(true)} style={{ padding: "8px 16px", borderRadius: "20px", background: "linear-gradient(to right, #fbbf24, #f97316, #ec4899)", border: "none", color: "#fff", fontWeight: 900, fontSize: "13px", boxShadow: "0 0 20px rgba(251,146,60,0.5)", cursor: "pointer" }}>+ Upload</button>
              </div>
            </div>

            {/* Video Center */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
              <div style={{ fontSize: "80px", filter: "drop-shadow(0 0 30px rgba(0,0,0,0.5))" }}>🎬</div>
              <div style={{ marginTop: "20px", padding: "10px 20px", borderRadius: "30px", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(10px)", fontSize: "12px", letterSpacing: "1px" }}>TAP • SWIPE FOR NEXT</div>
            </div>

            {/* Right Actions - TikTok Style */}
            <div style={{ position: "absolute", right: "12px", bottom: "120px", display: "flex", flexDirection: "column", gap: "22px", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#fff", border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>👤</div>
                <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#fe2c55", marginTop: "-12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 900 }}>+</div>
              </div>
              <div onClick={() => toggleLike(v.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", transform: liked.includes(v.id) ? "scale(1.2)" : "scale(1)", transition: "0.2s" }}>{liked.includes(v.id) ? "❤️" : "🤍"}</div>
                <span style={{ fontSize: "12px", fontWeight: 700, marginTop: "4px" }}>{v.likes}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>💬</div>
                <span style={{ fontSize: "12px", fontWeight: 700, marginTop: "4px" }}>2.1K</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>↗️</div>
                <span style={{ fontSize: "12px", fontWeight: 700, marginTop: "4px" }}>Share</span>
              </div>
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "linear-gradient(to bottom right, #333, #111)", border: "2px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", animation: "spin 3s linear infinite" }}>💿</div>
            </div>

            {/* Bottom Info */}
            <div style={{ position: "absolute", bottom: "70px", left: "12px", right: "80px" }}>
              <div style={{ fontWeight: 800, fontSize: "16px", marginBottom: "6px" }}>{v.user}</div>
              <div style={{ fontSize: "14px", lineHeight: "1.3", opacity: 0.95, marginBottom: "10px" }}>{v.desc}</div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>🎵 <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.song}</span></div>
              {/* Swipe Dots */}
              <div style={{ display: "flex", gap: "6px", marginTop: "14px" }}>
                {VIDEOS.map((_, i) => (
                  <div key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? "20px" : "6px", height: "6px", borderRadius: "10px", background: i === current ? "#fff" : "rgba(255,255,255,0.4)", cursor: "pointer", transition: "0.3s" }} />
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Bottom Nav - TikTok */}
        <div style={{ position: "absolute", bottom: 0, width: "100%", display: "flex", justifyContent: "space-around", alignItems: "center", padding: "10px 0 16px 0", background: "#000", borderTop: "1px solid rgba(255,255,255,0.1)", zIndex: 20 }}>
          <span style={{ fontSize: "11px", textAlign: "center", opacity: 1, fontWeight: 700 }}>🏠<br/>Home</span>
          <span style={{ fontSize: "11px", textAlign: "center", opacity: 0.6 }}>🔍<br/>Discover</span>
          <button onClick={() => setShowUpload(true)} style={{ width: "48px", height: "32px", borderRadius: "8px", background: "linear-gradient(to right, #25F4EE, #FE2C55)", border: "none", color: "#000", fontWeight: 900, fontSize: "20px", cursor: "pointer" }}>+</button>
          <span style={{ fontSize: "11px", textAlign: "center", opacity: 0.6 }}>📥<br/>Inbox</span>
          <span onClick={() => setShowProfile(true)} style={{ fontSize: "11px", textAlign: "center", opacity: 0.6, cursor: "pointer" }}>👤<br/>You</span>
        </div>
      </div>

      {/* UPLOAD MODAL - MEGA BEAUTIFUL */}
      {showUpload && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(20px)", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: "500px", background: "#121212", borderRadius: "24px 24px 0 0", padding: "24px", borderTop: "1px solid rgba(255,255,255,0.1)", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ width: "40px", height: "4px", background: "rgba(255,255,255,0.3)", borderRadius: "10px", margin: "0 auto 20px auto" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 900 }}>Upload to Pitok 🌍</h2>
              <button onClick={() => setShowUpload(false)} style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", cursor: "pointer" }}>✕</button>
            </div>

            <input ref={fileRef} type="file" accept="video/*" hidden onChange={e => e.target.files && setPreview(URL.createObjectURL(e.target.files[0]))} />
            
            <div onClick={() => fileRef.current?.click()} style={{ border: "2px dashed rgba(255,255,255,0.15)", borderRadius: "20px", padding: preview ? "0" : "40px 20px", textAlign: "center", background: "rgba(255,255,255,0.03)", cursor: "pointer", overflow: "hidden" }}>
              {preview ? <video src={preview} controls style={{ width: "100%", maxHeight: "300px", borderRadius: "16px" }} /> : <><div style={{ fontSize: "48px", marginBottom: "10px" }}>📤</div><div style={{ fontWeight: 800, fontSize: "16px" }}>Tap to select video</div><div style={{ fontSize: "12px", opacity: 0.5, marginTop: "6px" }}>MP4, MOV max 100MB - 9:16 recommended</div></>}
            </div>

            {preview && (
              <div style={{ marginTop: "16px" }}>
                <div style={{ height: "8px", background: "rgba(255,255,255,0.1)", borderRadius: "20px", overflow: "hidden" }}><div style={{ width: `${prog}%`, height: "100%", background: "linear-gradient(to right, #fbbf24, #f97316, #ec4899)", transition: "0.2s" }} /></div>
                <div style={{ fontSize: "12px", marginTop: "6px", opacity: 0.6, textAlign: "center" }}>{uploading ? `${prog}% UPLOADING TO BASE...` : "Ready to go live!"}</div>
              </div>
            )}

            <button onClick={handleUpload} disabled={uploading} style={{
              marginTop: "20px", width: "100%", padding: "18px", borderRadius: "50px",
              background: uploading ? "#333" : "linear-gradient(to right, #fde68a, #f97316, #ec4899)",
              color: "#fff", fontWeight: 900, fontSize: "18px", border: "none",
              boxShadow: uploading ? "none" : "0 0 40px rgba(245,158,11,0.6), 0 0 80px rgba(236,72,153,0.3)",
              cursor: "pointer", opacity: uploading ? 0.6 : 1
            }}>
              {uploading ? `⏳ ${prog}% UPLOADING...` : "🚀 VISIT NOW - GO LIVE & EARN $0.50"}
            </button>
            <div style={{ fontSize: "10px", textAlign: "center", opacity: 0.4, marginTop: "10px", letterSpacing: "1px" }}>POWERED BY BASE CHAIN • DECENTRALIZED</div>
          </div>
        </div>
      )}

      {/* PROFILE MODAL */}
      {showProfile && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "#000", display: "flex", flexDirection: "column", padding: "20px" }}>
          <button onClick={() => setShowProfile(false)} style={{ alignSelf: "flex-start", padding: "8px 16px", borderRadius: "20px", background: "rgba(255,255,255,0.1)", border: "none", color: "#fff" }}>← Back</button>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <div style={{ width: "90px", height: "90px", borderRadius: "50%", background: "linear-gradient(135deg, #fbbf24, #ec4899)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", border: "3px solid #fff" }}>👤</div>
            <h2 style={{ fontSize: "24px", fontWeight: 900, marginTop: "16px" }}>@babu_pi</h2>
            <p style={{ opacity: 0.6, fontSize: "13px" }}>Founder • Pitok World on Base</p>
            <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
              <div><div style={{ fontWeight: 900, fontSize: "18px" }}>12</div><div style={{ fontSize: "12px", opacity: 0.6 }}>Following</div></div>
              <div><div style={{ fontWeight: 900, fontSize: "18px" }}>8.4K</div><div style={{ fontSize: "12px", opacity: 0.6 }}>Followers</div></div>
              <div><div style={{ fontWeight: 900, fontSize: "18px" }}>${balance.toFixed(2)}</div><div style={{ fontSize: "12px", opacity: 0.6 }}>Earned</div></div>
            </div>
            <button onClick={() => { setShowProfile(false); setShowUpload(true); }} style={{ marginTop: "30px", padding: "16px 40px", borderRadius: "50px", background: "linear-gradient(to right, #fbbf24, #ec4899)", border: "none", color: "#fff", fontWeight: 900, fontSize: "16px", boxShadow: "0 0 30px rgba(236,72,153,0.5)" }}>🚀 VISIT PITOK WORLD</button>
          </div>
        </div>
      )}
    </div>
  );
}
