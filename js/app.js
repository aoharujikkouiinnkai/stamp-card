// app.js - ページ初期化

document.addEventListener('DOMContentLoaded', ()=>{
  // Init firebase (optional)
  AppFirebase.init();
  Auth.init();

  // wire auth buttons
  const btnLogin = document.getElementById('btn-login');
  const btnLogout = document.getElementById('btn-logout');
  btnLogin.addEventListener('click', ()=>{
    Auth.signInWithGoogle().then(()=>console.log('signed in')).catch(e=>console.error(e));
  });
  btnLogout.addEventListener('click', ()=>{
    Auth.signOut();
  });

  Auth.onAuthChanged(user=>{
    if(user){ document.getElementById('btn-login').style.display='none'; document.getElementById('btn-logout').style.display='inline-block'; }
    else{ document.getElementById('btn-login').style.display='inline-block'; document.getElementById('btn-logout').style.display='none'; }
  });

  // debug param
  const q = Utils.parseQuery();
  if(q.debug === 'true'){
    document.getElementById('debug-panel').style.display = 'block';
  }

  document.getElementById('btn-clear-local').addEventListener('click', ()=>{
    if(confirm('LocalStorage を初期化しますか？')){ StampManager.clearLocal(); }
  });

  // load stamps
  StampManager.load().catch(e=>{ console.error(e); alert('読み込みエラー'); });
});
