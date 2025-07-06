document.addEventListener("DOMContentLoaded", () => {
  const profileBtn = document.getElementById("profile_button");
  const backBtn = document.getElementById("back_button");
  const profileView = document.getElementById("profile_view");
  const userEmail = document.getElementById("user_email");

  profileBtn.addEventListener("click", () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Not logged in");
      return;
    }

    fetch("http://localhost:3000/auth/me", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.email) {
          userEmail.textContent = data.email;
          document.getElementById("profile_overlay").style.display = "flex";
        } else {
          alert("Failed to fetch user info");
        }
      })
      .catch(err => {
        console.error(err);
        alert("Error fetching user info");
      });
  });

  backBtn.addEventListener("click", () => {
    document.getElementById("profile_overlay").style.display = "none";
  });
});
