// utils.js
// 共通ユーティリティ
const Utils = (function(){
  function jstNow(){
    // JST の現在日時を返す Date オブジェクト
    const local = Date.now();
    const tzOffsetMin = new Date().getTimezoneOffset(); // UTC - local in minutes
    const jst = new Date(local + (tzOffsetMin + 9*60) * 60 * 1000);
    return jst;
  }

  function parseQuery(){
    const q = {};
    location.search.slice(1).split('&').forEach(pair=>{
      if(!pair) return;
      const [k,v] = pair.split('=');
      q[decodeURIComponent(k)] = v ? decodeURIComponent(v) : '';
    });
    return q;
  }

  function readJSON(path){
    return fetch(path).then(r=>{
      if(!r.ok) throw new Error('fetch failed '+path);
      return r.json();
    });
  }

  return { jstNow, parseQuery, readJSON };
})();
