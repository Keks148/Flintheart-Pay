const API = "https://flintheart-backend.onrender.com";

if (window.Telegram && Telegram.WebApp) {
  Telegram.WebApp.ready();
  Telegram.WebApp.expand();
}

async function login() {
  const loginVal = document.getElementById("loginInput").value.trim();
  const passwordVal = document.getElementById("passwordInput").value.trim();
  const errorEl = document.getElementById("error");

  errorEl.innerText = "";

  if (!loginVal || !passwordVal) {
    errorEl.innerText = "Введите логин и пароль";
    return;
  }

  try {
    const res = await fetch(API + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        login: loginVal,
        password: passwordVal
      })
    });

    const data = await res.json();

    if (!data.token) {
      errorEl.innerText = "Неверный логин или пароль";
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    showPanel(data.role);

  } catch (e) {
    errorEl.innerText = "Ошибка соединения с сервером";
    console.error(e);
  }
}

function showPanel(role) {
  document.getElementById("login").style.display = "none";
  document.getElementById("panel").style.display = "block";

  document.getElementById("roleTitle").innerText = "Роль: " + role;

  const content = document.getElementById("content");

  if (role === "admin") {
    content.innerHTML = `
      <b>Админ-панель</b><br>
      • Создание пользователей<br>
      • Управление ролями
    `;
  } else if (role === "trader") {
    content.innerHTML = `
      <b>Трейдер</b><br>
      • Подтверждение платежей
    `;
  } else if (role === "client") {
    content.innerHTML = `
      <b>Клиент</b><br>
      • Создание заявок
    `;
  } else {
    content.innerText = "Неизвестная роль";
  }
}
