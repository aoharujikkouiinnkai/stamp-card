// stampManager.js
// スタンプ読み込み・描画・取得処理（LocalStorageベースの最小実装）

const StampManager = (function(){
  const STORAGE_KEY = 'aoharu:stamps';
  let config = null;
  let stamps = [];

  async function load(){
    config = await Utils.readJSON('data/config.json');
    const d = await Utils.readJSON('data/stamps.json');
    stamps = d.stamps || [];
    renderCard();
    // process ?id= param
    const q = Utils.parseQuery();
    if(q.id){
      // try to acquire stamp by id
      setTimeout(()=>{ tryAcquireById(q.id); }, 600);
    }
  }

  function getLocal(){
    try{
      const s = localStorage.getItem(STORAGE_KEY);
      return s ? JSON.parse(s) : { stamps: {} };
    }catch(e){ return { stamps:{} }; }
  }
  function saveLocal(obj){ localStorage.setItem(STORAGE_KEY, JSON.stringify(obj)); }

  function isAcquiredLocally(stampId){
    const local = getLocal();
    return !!(local.stamps && local.stamps[stampId]);
  }

  function computeJSTNow(){ return Utils.jstNow(); }

  function determineAcquisitionKind(dateStr){
    // dateStr is like '2026-08-01'
    const jst = computeJSTNow();
    const hour = jst.getHours();
    const minute = jst.getMinutes();
    if(hour < config.realtimeWindow.startHour) return {allowed:false, reason:'too_early'};
    if(hour > config.realtimeWindow.endHour) return {allowed:true, kind:'archive'};
    // between startHour and endHour inclusive -> realtime
    return {allowed:true, kind:'realtime'};
  }

  function renderCard(){
    const container = document.getElementById('stamps-container');
    container.innerHTML = '';
    const cardRect = document.querySelector('.card').getBoundingClientRect();
    const cardWidth = cardRect.width || 960;

    stamps.forEach(s=>{
      // determine weekday position
      const date = new Date(s.date + 'T00:00:00');
      const weekday = date.getDay(); // 0=Sun
      // Our config uses 7 positions for Sat..Fri as in spec; map weekday to index
      // Spec mapping: 1st: Sat, 2nd:Sun,3:Mon,4:Tue,5:Wed,6:Thu,7:Fri
      // We'll map: Sat(6)->0, Sun(0)->1, Mon(1)->2, Tue(2)->3, Wed(3)->4, Thu(4)->5, Fri(5)->6
      const mapIdx = (weekday === 6 ? 0 : weekday === 0 ? 1 : weekday + 1);
      const pos = config.stampPositions[mapIdx] || config.stampPositions[0];

      const el = document.createElement('button');
      el.className = 'stamp not-acquired';
      el.style.left = (pos.x / config.cardSize.width * 100) + '%';
      el.style.top = (pos.y / config.cardSize.height * 100) + '%';
      el.title = s.title + ' (' + s.date + ')';
      el.dataset.stampId = s.id;
      el.dataset.date = s.date;

      const img = document.createElement('img');
      img.src = 'images/' + (s.stampImage || 'stamp_archive.png');
      img.alt = s.title;
      el.appendChild(img);

      el.addEventListener('click', onStampClick);

      if(isAcquiredLocally(s.id)){
        el.classList.remove('not-acquired');
        el.classList.add('acquired');
      }

      container.appendChild(el);
    });
  }

  function onStampClick(e){
    const btn = e.currentTarget;
    const stampId = btn.dataset.stampId;
    tryAcquireById(stampId);
  }

  function tryAcquireById(stampId){
    const stamp = stamps.find(s=>s.id===stampId);
    if(!stamp){ alert('指定のスタンプが見つかりません'); return; }

    const kindCheck = determineAcquisitionKind(stamp.date);
    if(!kindCheck.allowed){
      // too early
      animateError('21:00以降に取得できます');
      return;
    }

    // prefer realtime if in realtime window
    const isRealtime = kindCheck.kind === 'realtime';

    const local = getLocal();
    if(local.stamps && local.stamps[stampId]){
      animateInfo('この日付のスタンプはすでに取得しています！');
      return;
    }

    // acquire
    local.stamps = local.stamps || {};
    local.stamps[stampId] = { date: stamp.date, acquiredAt: new Date().toISOString(), isRealtime };
    saveLocal(local);
    // re-render simple
    renderCard();
    // simple popup
    animateSuccess(isRealtime ? 'リアタイスタンプを取得しました！' : 'アーカイブスタンプを取得しました！');
  }

  function animateSuccess(msg){
    alert(msg);
  }
  function animateError(msg){ alert('エラー: '+msg); }
  function animateInfo(msg){ alert(msg); }

  function clearLocal(){ localStorage.removeItem(STORAGE_KEY); renderCard(); }

  return { load, clearLocal };
})();
