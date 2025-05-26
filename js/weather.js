const baseApi =
  "http://api.weatherstack.com/current?access_key=051691821d3b52ddeea7d0b63709fd95&query=";

document.getElementById("search-btn").addEventListener("click", () => {
  // دریافت نام شهر وارد شده توسط کاربر
  const cityName = document.getElementById("city-input").value.trim();
  // گرفتن المان نمایش نتیجه آب و هوا
  const weatherDisplay = document.getElementById("weather-result");

  // پیام خطا وقتی فرم خالی سابمیت شه
  if (!cityName) {
    weatherDisplay.innerHTML = "<p>لطفاً نام یک شهر را وارد کنید</p>";
    weatherDisplay.classList.remove("hidden");
    return;
  }

  // ارسال درخاست به api
  fetch(baseApi + cityName)
    .then((response) => response.json())
    .then((weatherData) => {
      // بررسی معتبر بودن
      if (weatherData.success === false || !weatherData.location) {
        weatherDisplay.innerHTML = "<p>شهر موردنظر پیدا نشد</p>";
      } else {
        const location = weatherData.location;

        const currentWeather = weatherData.current;

        //  نمایش اطلاعات در صفحه
        weatherDisplay.innerHTML = `
          <h3>${location.name}, ${location.country}</h3>
          <p><strong>وضعیت:</strong> ${currentWeather.weather_descriptions[0]}</p>
          <p><strong>عرض جغرافیایی:</strong> ${location.lat}</p>
          <p><strong>طول جغرافیایی:</strong> ${location.lon}</p>
          <p><strong>دمای هوا:</strong> °C ${currentWeather.temperature}</p>
          <p><strong>رطوبت:</strong> % ${currentWeather.humidity}</p>
          <p><strong>سرعت باد:</strong>  km/h ${currentWeather.wind_speed} </p>
        `;
      }

      weatherDisplay.classList.remove("hidden");
    })
    .catch(() => {
      weatherDisplay.innerHTML = "<p>مشکلی در دریافت اطلاعات رخ داد.</p>";
      weatherDisplay.classList.remove("hidden");
    });
});
