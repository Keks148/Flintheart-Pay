const API = "https://flintheart-backend.onrender.com";

async function login() {
  const login = document.getElementById("loginInput").value;
  const password = document.getElementById("passwordInput").value;

  const res = await fetch(API + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login, password })
  });

  const data = await res.json();

  if (!data.token) {
    document.getElementById("error").innerText = "Неверный логин или пароль";
    return;
  }

  localStorage.setItem("token", data.token);
  showPanel(data.role);
}

function showPanel(role) {
  document.getElementById("login").style.display = "none";
  document.getElementById("panel").style.display = "block";
  document.getElementById("roleTitle").innerText = "Роль: " + role;

  const content = document.getElementById("content");
  if (role === "admin") content.innerHTML = "<b>Админ-панель</b><br>Создание пользователей";
  if (role === "trader") content.innerHTML = "<b>Трейдер</b><br>Подтверждение платежей";
  if (role === "client") content.innerHTML = "<b>Клиент</b><br>Создание заявок";
}
