document.addEventListener("DOMContentLoaded", () => {
  const profileBtn = document.getElementById("profile_button");
  const backBtn = document.getElementById("back_button");
  const profileView = document.getElementById("profile_view");
  const userEmail = document.getElementById("user_email");

  const backbtnadd = document.getElementById("back_button_add");
  const add_usr_btn = document.getElementById("add-user");
  const settingbtn = document.getElementById("setting_button");
  const backbtn = document.getElementById("back_button_set");
  const profile_overlay_set = document.getElementById("profile_overlay_set");
  const profile_overlay_add = document.getElementById("profile_overlay_add");
  const settingDiv = document.getElementById("setting_div");
  const change_pass = document.getElementById("change_the_password");
  const change_language = document.getElementById("change_the_language");
  const logout = document.getElementById("logout");
  const delete_account = document.getElementById("delete_account");
  const token = localStorage.getItem("token");
  const place_for_added_users = document.getElementById("place_for_added_users");

  let email_of_the_user;

  if (token) {
    fetch("http://localhost:3000/auth/me", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.email) {
          email_of_the_user = data.email;
          userEmail.textContent = email_of_the_user;
          const userIdentifier = email_of_the_user.split("@")[0];

          // ✅ Fetch chats now that email is available
          fetch(`http://localhost:3000/messages/messages/${userIdentifier}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if (Array.isArray(data.chats)) {
                data.chats.forEach((chatName) => {
                  const otherUser = chatName
                    .replace("_chat", "")
                    .split("_")
                    .find((name) => name !== userIdentifier);

                  const chat_btn = document.createElement("button");
                  chat_btn.textContent = otherUser;
                  chat_btn.className = "chat_btn_id";
                  chat_btn.id = `chat_${chatName}`;
                  place_for_added_users.appendChild(chat_btn);
                });
              }
            })
            .catch((err) => {
              console.error("Failed to fetch chats:", err);
            });

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
  });

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
        alert("Error deleting account: " + (errorData.message || "Unknown error"));
      }
    } catch (err) {
      alert("Request failed: " + err.message);
    }
  });

  // UI logic
  profile_overlay_set.style.display = "none";
  profile_overlay_add.style.display = "none";

  settingbtn.addEventListener("click", () => {
    profile_overlay_set.style.display = "flex";
  });

  backbtn.addEventListener("click", () => {
    profile_overlay_set.style.display = "none";
  });

  add_usr_btn.addEventListener("click", () => {
    profile_overlay_add.style.display = "flex";
  });

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
  const response_back = document.getElementById("response_back");

  submit_add_button.addEventListener("click", () => {
    const add_input = document.getElementById("add_input").value.trim();

    if (add_input) {
      fetch("http://localhost:3000/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data_one: email_of_the_user,
          data_two: add_input,
        }),
      })
        .then(async (response) => {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();

            if (data.result?.includes("Chat created successfully")) {
              const chat_btn = document.createElement("button");
              chat_btn.textContent = add_input;
              chat_btn.id = `chat_${add_input}`;
              chat_btn.className = "chat_btn_id";
              place_for_added_users.appendChild(chat_btn);
            } else if (data.result?.includes("Chat already exists")) {
              response_back.textContent = "Chat already exists";
            } else {
              response_back.textContent = "Unknown JSON response.";
            }
          } else {
            const text = await response.text();
            if (text.includes("Chat already exists")) {
              response_back.textContent = "Chat already exists";
            } else if (text.includes("Chat created successfully")) {
              const chat_btn = document.createElement("button");
              chat_btn.textContent = add_input;
              chat_btn.id = `chat_${add_input}`;
              chat_btn.className = "chat_btn_id";
              place_for_added_users.appendChild(chat_btn);
            } else {
              console.error("Non-JSON response from server:", text);
              response_back.textContent = "Unexpected server response.";
            }
          }
        });
    } else {
      response_back.textContent = "Please fill out the field.";
    }
  });
});
