"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [auth, setAuth] = useState(false);
  const [piUser, setPiUser] = useState<any>(null);
  const [pr, setPr] = useState(0);
  const [up, setUp] = useState(false);

  // Pi Init
  useEffect(() => {
    const Pi = (window as any).Pi;
    if (Pi) Pi.init({ version: "2.0", sandbox: false });
  }, []);

  // CONNECT PI - FINAL FIXED VERSION
  const connectPi = async () => {
    try {
      const Pi = (window as any).Pi;
      if (!Pi) {
        alert("Open this in Pi Browser app!");
        return;
      }
      const scopes = ["username", "payments"];
      function onIncompletePaymentFound(payment: any) {
        console.log("Incomplete payment:", payment);
      }
      const result = await Pi.authenticate(scopes, onIncompletePaymentFound);
      setPiUser(result.user);
      setAuth(true);
      alert(`Connected! Welcome ${result.user.username}`);
    } catch (e: any) {
      console.log(e);
      alert("Pi Connect failed: " + e.message);
    }
  };

  // UPLOAD - BLOCKED IF NOT CONNECTED
  const upload = async () => {
    // FINAL FIX: BLOCK IF NOT CONNECTED
    if (!auth || !piUser) {
      alert("Please Connect Pi Wallet First! Tap Connect Pi at top!");
      return;
    }
    setUp(true);
    setPr(0);
    // Fake progress for demo
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(r => setTimeout(r, 100));
      setPr(i);
    }
    setUp(false);
    alert(`Uploaded! You earned 0.1 Pi! ${piUser.username}`);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "16px", fontFamily: "system-ui" }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontWeight: 900, fontSize: "20px" }}>PiTok 🌍</h1>
        {!auth ? (
          <button onClick={connectPi} style={{ background: "#a855f7", color: "#fff", border: "none", padding: "10px 16px", borderRadius: "20px", fontWeight: 800 }}>
            Connect Pi
          </button>
        ) : (
          <div style={{ background: "#222", padding: "8px 14px", borderRadius: "20px", fontSize: "13px" }}>
            👤 {piUser?.username}
          </div>
        )}
      </div>

      {/* UPLOAD BOX */}
      <div style={{ marginTop: "40px", background: "#111", padding: "20px", borderRadius: "20px" }}>
        <h2 style={{ textAlign: "center" }}>Post a Video & Earn Pi</h2>
        
        <div style={{ marginTop: "16px" }}>
          <button onClick={upload} disabled={up}
            style={{
              width: "100%",
              marginTop: "16px",
              padding: "14px",
              borderRadius: "30px",
              border: "none",
              background: "linear-gradient(90deg,#f9ff00,#a855f7)",
              fontWeight: 900,
              opacity: up ? 0.6 : 1
            }}>
            {up ? `Uploading ${pr}%... 🚀 POST NOW - EARN` : "POST NOW - EARN Pi"}
          </button>
          {!auth && (
            <div style={{
              textAlign: "center",
              fontSize: "11px",
              marginTop: "8px",
              opacity: 0.7
            }}>
              Connect Pi Wallet to earn Pi!
            </div>
          )}
        </div>
      </div>

      <style>{`@keyframes pop{
        0%{transform:translateY(0) scale(0);opacity:1}
        50%{transform:translateY(-70px) scale(1.3);opacity:1}
        100%{transform:translateY(-140px) scale(0.7);opacity:0}
      }`}</style>
    </div>
  );
      }
