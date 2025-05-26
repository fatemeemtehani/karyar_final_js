
const baseApi = "https://api.github.com";

// اجرای کد پس از لود کامل DOM
document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("selectedUser");

  // اگر یوزری انتخاب نشده بود
  if (!username) {
    document.body.innerHTML = "<p>User not found.</p>";
    return;
  }

  // گرفتن المنت‌ها از صفحه
  const userDetails = document.getElementById("user-details");
  const userStats = document.getElementById("user-stats");
  const repoList = document.getElementById("repo-list");
  const hireableStatus = document.getElementById("hireable-status");

  // دریافت اطلاعات کاربر از گیت‌هاب
  fetch(`${baseApi}/users/${username}`)
    .then((res) => res.json())
    .then((user) => {
      // نمایش اطلاعات پروفایل کاربر
      userDetails.innerHTML = `
        <div class="user-top">
          <div class="user-left">
            <img src="${user.avatar_url}" alt="${
        user.login
      }" class="avatar-large" />
            <h2 class="user-name">${user.name || ""}</h2>
            <p class="user-login">${user.login}</p>
          </div>
          <div class="user-info">
            <p class="user-bio-title">Bio:</p>
            <p class="user-bio">${user.bio || "No bio available."}</p>
            <a href="${
              user.html_url
            }" target="_blank" class="github-link">Visit Github Page</a>
            <p><strong>Login:</strong> ${user.login}</p>
            <p><strong>Company:</strong> ${user.company || "N/A"}</p>
          </div>
        </div>
      `;

      // نمایش وضعیت استخدام‌پذیری (hireable)
      let hireableContent = "<span style='color:gray;'>Unknown</span>";
      if (user.hireable === true) {
        hireableContent = `<i class="fas fa-check-circle" style="color: green;"></i>`;
      } else if (user.hireable === false) {
        hireableContent = `<i class="fas fa-times-circle" style="color: red;"></i>`;
      }
      hireableStatus.innerHTML = `hireable : ${hireableContent}`;

      // نمایش آمار گیت‌هاب
      userStats.innerHTML = `
        <div class="stats">
          <span class="badge red">Followers : ${user.followers}</span>
          <span class="badge gray">Following : ${user.following}</span>
          <span class="badge green">Public Repos : ${user.public_repos}</span>
          <span class="badge dark">Public Gists : ${user.public_gists}</span>
        </div>
      `;
    });

  // دریافت ۵ ریپوی اخیر کاربر
  fetch(`${baseApi}/users/${username}/repos?per_page=5&sort=created:asc`)
    .then((res) => res.json())
    .then((repos) => {
      // نمایش ریپوزیتوری‌ها
      repoList.innerHTML = repos
        .map(
          (repo) => `
            <a class="repo-box" href="${repo.html_url}" target="_blank">
              ${repo.name}
            </a>
          `
        )
        .join("");
    });
});
