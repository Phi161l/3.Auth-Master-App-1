document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent page reload
  
    // Get user input
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
  
    // Send POST request to backend
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });
  
    const data = await res.json();
  
    // Show response message
    const msg = document.getElementById("message");
    if (data.success) {
      msg.style.color = "green";
      msg.innerText = "Signup successful! You can now log in.";
    } else {
      msg.style.color = "red";
      msg.innerText = data.message || "Signup failed!";
    }

    document.getElementById("signupForm").reset();
  });
  