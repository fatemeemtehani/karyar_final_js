function updateClock() {
  const now = new Date();

  // برای هماهنگی با ساعت رسمی(یکساعت عقب میموند)
  now.setHours(now.getHours() + 1);

  // گرفتن ساعت، دقیقه و ثانیه
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  //   زاویه چرخش عقربه‌ها
  const hourDeg = (hours % 12) * 30 + minutes * 0.5; // هر ساعت = 30 درجه + دقت به دقیقه
  const minuteDeg = minutes * 6; // هر دقیقه = 6 درجه
  const secondDeg = seconds * 6; // هر ثانیه = 6 درجه

  // اعمال چرخش به عناصر HTML مربوط به عقربه‌ها
  document.getElementById("hour").style.transform = `rotate(${hourDeg}deg)`;
  document.getElementById("minute").style.transform = `rotate(${minuteDeg}deg)`;
  document.getElementById("second").style.transform = `rotate(${secondDeg}deg)`;

  // تنظیم ساعت دیجیتال با فرمت AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 || 12; //ساعت 0 باید به 12 تبدیل بشع
  // تابع کمکی برای صفر گذاشتن جلوی اعداد کوچکتر از 10
  function formatNumber(num) {
    return num < 10 ? "0" + num : num;
  }

  const formatted = `${formatNumber(displayHour)} : ${formatNumber(
    minutes
  )} : ${formatNumber(seconds)} ${ampm}`;

  // نمایش ساعت دیجیتال
  document.getElementById("digital-clock").textContent = formatted;
}

//
setInterval(updateClock, 1000);

updateClock();
