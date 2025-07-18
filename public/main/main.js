document.addEventListener("DOMContentLoaded", () => {
  const profileBtn = document.getElementById("profile_button");
  const backBtn = document.getElementById("back_button");
  const profileView = document.getElementById("profile_view");
  const userEmail = document.getElementById("user_email");

  const backbtnadd = document.getElementById("back_button_add")
  const add_usr_btn = document.getElementById('add-user')
  const settingbtn = document.getElementById("setting_button");
  const backbtn = document.getElementById("back_button_set");
  const profile_overlay_set = document.getElementById("profile_overlay_set");
  const settingDiv = document.getElementById("setting_div");
  const change_pass = document.getElementById("change_the_password");
  const change_language = document.getElementById("change_the_language");
  const logout = document.getElementById("logout");
  const delete_account = document.getElementById("delete_account");
  const token = localStorage.getItem("token");
  const submit_add_button = document.getElementById("submit_add_button")

  if (token) {
    fetch("http://localhost:3000/auth/me", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.email) {
          userEmail.textContent = data.email;
        } else {
          alert("Failed to fetch user info");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error fetching user info");
      });
  }

  logout.addEventListener("click", () => {
    window.location.href = "http://localhost:3000";
  })


  delete_account.addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    const email = userEmail.textContent?.trim();

    if (!email) {
      alert("Email is missing. Please log in or open your profile first.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/users/delete?email=${encodeURIComponent(email)}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        localStorage.removeItem("token");
        window.location.href = "http://localhost:3000";
      } else {
        const errorData = await response.json();
        alert(
          "Error deleting account: " + (errorData.message || "Unknown error")
        );
      }
    } catch (err) {
      alert("Request failed: " + err.message);
    }
  });

  // ✅ UI logic
  profile_overlay_set.style.display = "none";
  profile_overlay_add.style.display = "none"

  settingbtn.addEventListener("click", () => {
    profile_overlay_set.style.display = "flex";
  });

  backbtn.addEventListener("click", () => {
    profile_overlay_set.style.display = "none";
  });

  add_usr_btn.addEventListener("click", () => {
    profile_overlay_add.style.display = "flex"
  })

  backbtnadd.addEventListener("click", () => {
    profile_overlay_add.style.display = "none";
  });

  profileBtn.addEventListener("click", () => {
    if (!token) {
      alert("Not logged in");
      return;
    }

    document.getElementById("profile_overlay").style.display = "flex";
  });

  backBtn.addEventListener("click", () => {
    document.getElementById("profile_overlay").style.display = "none";
  });


  const submit_add_button = document.getElementById("submit_add_button");
  const response_back = document.getElementById("response_back")

  submit_add_button.addEventListener("click", () => {

    if(add_input){
      const add_input = document.getElementById("add_input").value.trim();

      fetch('http://localhost:3000/chat_creation', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: add_input
        })
    })
  }else {
    alert("Please fill out the field.")
  }
});
