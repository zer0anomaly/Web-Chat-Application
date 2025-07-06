document.addEventListener("DOMContentLoaded", () => {
  const submit = document.getElementById('submit_button');
  const result = document.getElementById('result');

  submit.addEventListener('click', () => {
    const email = document.getElementById('email_input').value.trim();
    const password = document.getElementById('password_input').value;
    const confirm = document.getElementById('password_confirmation_input').value;

    // Input validation
    if (!email || !password || !confirm) {
      result.textContent = "❗ Please fill out all fields.";
      return;
    }

    if (password !== confirm) {
      result.textContent = "❗ Passwords do not match.";
      return;
    }

    // Send registration request
    fetch('http://127.0.0.1:3000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(async response => {
      const contentType = response.headers.get("Content-Type") || "";
      const raw = await response.text();

      if (!contentType.includes("application/json")) {
        throw new Error("Expected JSON, got: " + contentType + "\n" + raw);
      }

      const data = JSON.parse(raw);

      if (data.token) {
        // ✅ Save the token
        localStorage.setItem('token', data.token);

        // ✅ Redirect to login page or dashboard
        window.location.href = "../login/login.html";
      } else {
        result.textContent = "❌ Registration failed: " + (data.message || "Unknown error");
      }
    })
    .catch(err => {
      console.error(err);
      result.textContent = "❌ Error: " + err.message;
    });
  });
});
