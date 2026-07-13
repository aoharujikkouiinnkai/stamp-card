// auth.js
// 最小の認証ラッパー。Firebase があればそれを使い、無ければ擬似ログインを行う。

const Auth = (function(){
  let user = null;
  const subscribers = [];

  function mockSignIn(){
    user = { uid: 'demo-user', displayName: 'Demo User', email: 'demo@example.com' };
    notify();
    return Promise.resolve(user);
  }
  function mockSignOut(){
    user = null; notify(); return Promise.resolve();
  }

  function init(){
    // Try to init firebase auth if available
    if(window.firebase && firebase.auth){
      firebase.auth().onAuthStateChanged(u=>{
        user = u ? { uid: u.uid, displayName: u.displayName, email: u.email } : null;
        notify();
      });
    }
  }

  function signInWithGoogle(){
    if(window.firebase && firebase.auth && firebase.auth.GoogleAuthProvider){
      const provider = new firebase.auth.GoogleAuthProvider();
      return firebase.auth().signInWithPopup(provider);
    }
    return mockSignIn();
  }
  function signOut(){
    if(window.firebase && firebase.auth){
      return firebase.auth().signOut();
    }
    return mockSignOut();
  }

  function getUser(){ return user; }
  function onAuthChanged(cb){ subscribers.push(cb); }
  function notify(){ subscribers.forEach(cb=>cb(user)); }

  return { init, signInWithGoogle, signOut, getUser, onAuthChanged };
})();
