// firebase.js
// Firebase 設定プレースホルダ。実運用時は firebase/firebaseConfig.js を編集してください.
// firebaseConfig.js で window.FIREBASE_CONFIG を定義している想定。

function initFirebaseIfAvailable(){
  if(window.firebase) return; // already
  // This project leaves firebase optional. If you add Firebase SDK scripts and
  // provide window.FIREBASE_CONFIG, auth and firestore will attempt to initialize.
  if(window.FIREBASE_CONFIG && window.firebase !== undefined){
    try{
      firebase.initializeApp(window.FIREBASE_CONFIG);
      console.log('Firebase initialized');
    }catch(e){
      console.warn('Firebase init error', e);
    }
  }
}

// Export simple helpers (no module system used)
window.AppFirebase = {
  init: initFirebaseIfAvailable
};
