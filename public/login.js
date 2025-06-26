document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  const msg = document.getElementById("message");

  if (data.success) {
    // Redirect to index page
    window.location.href = "/";
  } else {
    msg.style.color = "red";
    msg.innerText = data.message || "Login failed!";
  }
});
