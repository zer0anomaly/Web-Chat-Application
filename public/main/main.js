document.addEventListener("DOMContentLoaded", () => {  
  const profileBtn = document.getElementById("profile_button");
  const backBtn = document.getElementById("back_button");
  const profileView = document.getElementById("profile_view");
  const userEmail = document.getElementById("user_email");

  const settingbtn = document.getElementById('setting_button');
  const backbtn = document.getElementById('back_button_set');
  const profile_overlay_set = document.getElementById('profile_overlay_set');
  const settingDiv = document.getElementById('setting_div');
  const change_pass = document.getElementById('change_the_password');
  const change_language = document.getElementById('change_the_language');
  const logout = document.getElementById('logout');
  const delete_account = document.getElementById('delete_account');

  profile_overlay_set.style.display = "none";

  settingbtn.addEventListener("click", () => {
    const token = localStorage.getItem("token")
    profile_overlay_set.style.display = "flex";
  })

  backbtn.addEventListener("click", () => {
    profile_overlay_set.style.display = "none";
  });


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
