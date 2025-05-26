const baseApi = "https://api.github.com";

// وقتی صفحه لود شد...
document.addEventListener("DOMContentLoaded", () => {
  // المان‌ها از HTML
  const searchInput = document.querySelector(".search-box"); // باکس جستجو
  const submitBtn = document.querySelector(".submit"); // دکمه ارسال
  const clearBtn = document.getElementById("clear-btn"); // دکمه پاک کردن
  const main = document.querySelector("main");
  const loader = document.getElementById("loader"); // لودر
  const alertDiv = document.getElementById("alert"); // باکس هشدار
  const alertText = document.getElementById("alert-text"); // متن هشدار

  let alertTimeout; // نگهدارنده تایمر هشدار

  // عملکرد دکمه Submit (ارسال)
  submitBtn.addEventListener("click", () => {
    const query = searchInput.value.trim(); // گرفتن متن جستجو

    // بررسی اگر چیزی وارد نشده بود
    if (!query) {
      alertText.textContent = "Please enter something";
      alertDiv.style.display = "flex";

      clearTimeout(alertTimeout);
      alertTimeout = setTimeout(() => {
        alertDiv.style.display = "none";
      }, 5000);

      return;
    }

    // پنهان‌کردن هشدار، نمایش لودر
    alertDiv.style.display = "none";
    loader.style.display = "block";

    // پاک کردن نتایج قبلی
    document.querySelectorAll(".user-list").forEach((e) => e.remove());

    // ارسال درخواست به GitHub API
    fetch(`${baseApi}/search/users?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        loader.style.display = "none";

        // بررسی اگر کاربری پیدا نشد
        if (!data.items || data.items.length === 0) {
          const noResults = document.createElement("p");
          noResults.textContent = "No users found.";
          noResults.className = "user-list";
          main.appendChild(noResults);
          clearBtn.style.display = "none";
          return;
        }

        // ساختن لیست کاربران
        const container = document.createElement("div");
        container.className = "user-list";

        data.items.forEach((user) => {
          const card = document.createElement("div");
          card.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}" width="80" height="80" style="border-radius: 50%; object-fit: cover; margin-bottom: 10px;">
            <p><strong>${user.login}</strong></p>
            <button class="more-btn" onclick="goToUser('${user.login}')">More</button>
          `;
          container.appendChild(card);
        });

        main.appendChild(container);
        clearBtn.style.display = "block"; // نمایش دکمه پاک‌سازی
      })
      .catch((err) => {
        loader.style.display = "none";
        alert("An error occurred while fetching users.");
        console.error(err);
      });
  });

  // عملکرد دکمه Clear
  clearBtn.addEventListener("click", () => {
    document.querySelectorAll(".user-list").forEach((e) => e.remove());
    clearBtn.style.display = "none";
  });
});

// ذخیره نام کاربر و انتقال به صفحه user
function goToUser(username) {
  localStorage.setItem("selectedUser", username);
  location.href = "user.html";
}
