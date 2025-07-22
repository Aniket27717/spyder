import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDvFaH5h4KI3x4e4Vm9mMiwE73vBO0GPl0",
    authDomain: "spyder-7967e.firebaseapp.com",
    databaseURL: "https://spyder-7967e-default-rtdb.firebaseio.com",
    projectId: "spyder-7967e",
    storageBucket: "spyder-7967e.firebasestorage.app",
    messagingSenderId: "100352332121",
    appId: "1:100352332121:web:668d283297679d6a7f3c48"
  };

  const app = initializeApp(firebaseConfig);
  const authh = getAuth(app);

  onAuthStateChanged(authh, (user) => {
    if (!user) {
      window.location.href = "index.html";
    }
  });
