const connectPi = async () => {
  try{
    const Pi = (window as any).Pi;
    if(!Pi){ alert("Pi SDK loading... wait 3 sec and tap again!"); return; }
    Pi.init({ version: "2.0", sandbox: false });
    const auth = await Pi.authenticate(['username','payments'], ()=>{});
    alert("WELCOME @" + auth.user.username + "! You are connected!");
    localStorage.setItem("pi_user", JSON.stringify(auth.user));
    window.location.reload();
  }catch(e:any){
    // Try sandbox mode if mainnet fails (because your domain not approved yet)
    try{
      const Pi = (window as any).Pi;
      Pi.init({ version: "2.0", sandbox: true });
      const auth = await Pi.authenticate(['username','payments'], ()=>{});
      alert("WELCOME @" + auth.user.username + " (sandbox)!");
      localStorage.setItem("pi_user", JSON.stringify(auth.user));
      window.location.reload();
    }catch(e2:any){
      alert("Error: " + e2.message);
    }
  }
}
