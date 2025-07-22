 import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

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
  const auth = getAuth(app);

  document.getElementById("loginBtn").addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMsg = document.getElementById("error");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "dashboard.html";
    } catch (error) {
      errorMsg.textContent = "Invalid credentials. Try again.";
    }
  });
