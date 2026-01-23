async function login() {
  const login = document.getElementById("loginInput").value;
  const password = document.getElementById("passwordInput").value;

  try {
    const res = await fetch("https://flintheart-backend.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ login, password })
    });

    const data = await res.json();

    if (!data.success) {
      document.getElementById("error").innerText = "Неверный логин или пароль";
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    document.getElementById("login").style.display = "none";
    document.getElementById("panel").style.display = "block";
    document.getElementById("roleTitle").innerText =
      "Роль: " + data.role.toUpperCase();

  } catch (e) {
    document.getElementById("error").innerText = "Ошибка соединения";
  }
}
