<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Spyder Login</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="login.css">
</head>
<body>

<div class="matrix"></div>
<div class="pulse-circle"></div>
<div class="spyder-logo">🕷</div>
<div class="login-card">
  
  <h3>Spyder Login</h3>
  <div class="mb-3">
    <input type="email" id="email" class="form-control" placeholder="Email" required />
  </div>
  <div class="mb-3">
    <input type="password" id="password" class="form-control" placeholder="Password" required />
  </div>
  <button id="loginBtn" class="btn btn-primary w-100">Login</button>
  <div id="error"></div>
</div>

<script  type="module" src="login.js"></script>
</body>
</html>
