const apiKey = "7b2d2783855bbd8846ffb4bd7d058dd8";
const defaultCity = "الرياض";
const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weatherDescription");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const pressure = document.getElementById("pressure");
const feelsLike = document.getElementById("feelsLike");
const weatherIcon = document.getElementById("weatherIcon");
const status = document.getElementById("status");
const forecastList = document.getElementById("forecastList");

const weatherIcons = {
  "Clear": "☀️",
  "Clouds": "☁️",
  "Rain": "🌧️",
  "Drizzle": "🌦️",
  "Thunderstorm": "⛈️",
  "Snow": "❄️",
  "Mist": "🌫️",
  "Smoke": "🌫️",
  "Haze": "🌫️",
  "Dust": "🌫️",
  "Fog": "🌫️",
  "Sand": "🌫️",
  "Ash": "🌫️",
  "Squall": "🌬️",
  "Tornado": "🌪️"
};

function setStatus(message, isError = false) {
  status.textContent = message;
  status.style.color = isError ? "#f87171" : "#cbd5e1";
}

function getDayName(dateString) {
  const date = new Date(dateString * 1000);
  return new Intl.DateTimeFormat("ar-SA", { weekday: "short" }).format(date);
}

function mapWeatherToArabic(main) {
  const map = {
    Clear: "صافي",
    Clouds: "غائم",
    Rain: "ممطر",
    Drizzle: "ممطر خفيف",
    Thunderstorm: "عاصف رعدي",
    Snow: "مثلج",
    Mist: "ضباب",
    Smoke: "دخان",
    Haze: "ضباب خفيف",
    Dust: "غبار",
    Fog: "ضباب",
    Sand: "رمل",
    Ash: "رماد",
    Squall: "عاصفة",
    Tornado: "إعصار"
  };

  return map[main] || main;
}

function renderForecast(data) {
  forecastList.innerHTML = "";

  const list = data.list.slice(0, 5);

  list.forEach((item) => {
    const card = document.createElement("article");
    card.className = "forecast-item";

    card.innerHTML = `
      <div class="day">${getDayName(item.dt)}</div>
      <div>${weatherIcons[item.weather[0].main] || "🌤️"}</div>
      <div class="forecast-temp">${Math.round(item.main.temp)}°</div>
      <div class="forecast-desc">${mapWeatherToArabic(item.weather[0].main)}</div>
    `;

    forecastList.appendChild(card);
  });
}

async function fetchWeather(city) {
  setStatus("جاري تحميل الطقس...");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=ar`
    );

    if (!response.ok) {
      throw new Error("city_not_found");
    }

    const current = await response.json();

    cityName.textContent = current.name;
    temperature.textContent = Math.round(current.main.temp);
    weatherDescription.textContent = mapWeatherToArabic(current.weather[0].main);
    humidity.textContent = `${current.main.humidity}%`;
    windSpeed.textContent = `${Math.round(current.wind.speed)} م/ث`;
    pressure.textContent = `${current.main.pressure} hPa`;
    feelsLike.textContent = `${Math.round(current.main.feels_like)}°`;
    weatherIcon.textContent = weatherIcons[current.weather[0].main] || "🌤️";

    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=ar`
    );

    if (!forecastResponse.ok) {
      throw new Error("forecast_failed");
    }

    const forecastData = await forecastResponse.json();
    renderForecast(forecastData);
    setStatus("تم تحديث الطقس بنجاح");
  } catch (error) {
    if (error.message === "city_not_found") {
      setStatus("لم يتم العثور على المدينة، حاول مرة أخرى.", true);
      return;
    }

    setStatus("تعذر الاتصال بالخدمة، تأكد من اتصال الإنترنت.", true);
  }
}

searchButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) {
    setStatus("أدخل اسم المدينة أولاً.", true);
    return;
  }

  fetchWeather(city);
});

cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const city = cityInput.value.trim();
    if (!city) return;
    fetchWeather(city);
  }
});

cityInput.value = defaultCity;
fetchWeather(defaultCity);
