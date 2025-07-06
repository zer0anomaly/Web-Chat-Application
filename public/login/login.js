document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("emailinput");
  const passwordInput = document.getElementById("passwordinput");
  const result = document.getElementById("result");
  const submit = document.getElementById("submit_button");

  if (!emailInput || !passwordInput || !result || !submit) {
    console.error("❌ Missing DOM elements.");
    return;
  }

  submit.addEventListener("click", (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
      result.textContent = "Please fill out all fields";
      return;
    }

    fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(async (response) => {
        const contentType = response.headers.get("content-type");
        const raw = await response.text();

        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Expected JSON, got:\n" + raw);
        }

        const data = JSON.parse(raw);

        if (data.token) {
          // ✅ Save token to localStorage
          localStorage.setItem("token", data.token);

          // ✅ Redirect to main app
          window.location.href = "/main/main.html";
        } else {
          result.textContent =
            "Login failed: " + (data.message || "Unknown error");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        result.textContent = "Server error";
      });
  });
});
