/* ===========================
   AETHER WEATHER — script.js
   =========================== */

// ── CONFIG ────────────────────────────────────────────────────────────────────
const API_KEY = "bd5e378503939ddaee76f12ad7a97608";
const BASE    = "https://api.openweathermap.org/data/2.5";
const ICON    = "https://openweathermap.org/img/wn";

// ── STATE ─────────────────────────────────────────────────────────────────────
let isCelsius       = true;
let lastWeatherData = null;
let lastForecast    = null;

// ── DOM REFS ──────────────────────────────────────────────────────────────────
const cityInput   = document.getElementById("cityInput");
const searchBtn   = document.getElementById("searchBtn");
const geoBtn      = document.getElementById("geoBtn");
const loader      = document.getElementById("loader");
const weatherCard = document.getElementById("weatherCard");
const placeholder = document.getElementById("placeholder");
const errorMsg    = document.getElementById("errorMsg");
const errorText   = document.getElementById("errorText");
const btnC        = document.getElementById("btnC");
const btnF        = document.getElementById("btnF");
const tabHourly   = document.getElementById("tabHourly");
const tab5day     = document.getElementById("tab5day");
const panelHourly = document.getElementById("panelHourly");
const panel5day   = document.getElementById("panel5day");

// ── UTILITIES ─────────────────────────────────────────────────────────────────
const toF  = c  => Math.round(c * 9/5 + 32);
const fmt  = c  => isCelsius ? `${Math.round(c)}°` : `${toF(c)}°`;
const kmph = ms => Math.round(ms * 3.6);

function showLoader()   { loader.classList.remove("hidden"); weatherCard.classList.add("hidden"); placeholder.classList.add("hidden"); errorMsg.classList.add("hidden"); }
function hideLoader()   { loader.classList.add("hidden"); }
function showError(msg) { errorText.textContent = msg; errorMsg.classList.remove("hidden"); hideLoader(); }
function showCard()     { weatherCard.classList.remove("hidden"); placeholder.classList.add("hidden"); }

function formatTime(unix, tz) {
  const d = new Date((unix + tz) * 1000);
  let h = d.getUTCHours(), m = d.getUTCMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${String(m).padStart(2, "0")} ${ampm}`;
}

function formatHour(unix) {
  const d = new Date(unix * 1000);
  let h = d.getHours();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h} ${ampm}`;
}

function dayName(unix) {
  return ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][new Date(unix * 1000).getDay()];
}

function positionSunDot(sunriseUnix, sunsetUnix) {
  const now   = Date.now() / 1000;
  const dot   = document.getElementById("sunDot");
  const total = sunsetUnix - sunriseUnix;
  const pct   = (Math.min(Math.max(now - sunriseUnix, 0), total) / total) * 100;
  dot.style.left = `calc(${pct}% - 5px)`;
}

// ── AQI ───────────────────────────────────────────────────────────────────────
const AQI_LEVELS = [
  { label: "Good",      color: "#34d399" },
  { label: "Fair",      color: "#fbbf24" },
  { label: "Moderate",  color: "#f97316" },
  { label: "Poor",      color: "#ef4444" },
  { label: "Very Poor", color: "#a855f7" },
];

function renderAQI(data) {
  if (!data || !data.list || !data.list[0]) return;
  const aqi  = data.list[0].main.aqi;
  const comp = data.list[0].components;
  const lvl  = AQI_LEVELS[aqi - 1] || AQI_LEVELS[0];

  document.getElementById("aqiDot").style.background = lvl.color;
  document.getElementById("aqiStatus").textContent   = lvl.label;
  document.getElementById("aqiStatus").style.color   = lvl.color;

  const shown = [
    { name: "PM2.5", val: comp.pm2_5?.toFixed(1) },
    { name: "PM10",  val: comp.pm10?.toFixed(1)  },
    { name: "NO₂",   val: comp.no2?.toFixed(1)   },
    { name: "O₃",    val: comp.o3?.toFixed(1)    },
  ];
  document.getElementById("aqiComponents").innerHTML = shown.map(c =>
    `<div class="aqi-comp">
       <div class="aqi-comp-val">${c.val ?? "—"}</div>
       <div class="aqi-comp-name">${c.name}</div>
     </div>`
  ).join("");
}

// ── RENDER WEATHER ────────────────────────────────────────────────────────────
function renderWeather(data) {
  lastWeatherData = data;
  const tz = data.timezone;

  document.getElementById("cityName").textContent    = data.name;
  document.getElementById("countryName").textContent = data.sys.country;
  document.getElementById("currentDate").textContent = new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });

  const iconCode = data.weather[0].icon;
  document.getElementById("weatherIcon").src = `${ICON}/${iconCode}@2x.png`;
  document.getElementById("weatherIcon").alt = data.weather[0].description;

  document.getElementById("tempValue").textContent  = fmt(data.main.temp);
  document.getElementById("condition").textContent  = data.weather[0].description;
  document.getElementById("feelsLike").textContent  = fmt(data.main.feels_like);
  document.getElementById("humidity").textContent   = `${data.main.humidity}%`;
  document.getElementById("windSpeed").textContent  = `${kmph(data.wind.speed)} km/h`;
  document.getElementById("cloudiness").textContent = `${data.clouds.all}%`;
  document.getElementById("pressure").textContent   = `${data.main.pressure} hPa`;
  document.getElementById("visibility").textContent = data.visibility ? `${(data.visibility / 1000).toFixed(1)} km` : "N/A";
  document.getElementById("uvIndex").textContent    = "—";
  document.getElementById("sunrise").textContent    = formatTime(data.sys.sunrise, tz);
  document.getElementById("sunset").textContent     = formatTime(data.sys.sunset, tz);
  positionSunDot(data.sys.sunrise, data.sys.sunset);

  showCard();
}

// ── RENDER HOURLY ─────────────────────────────────────────────────────────────
function renderHourly(data) {
  const list  = document.getElementById("hourlyList");
  list.innerHTML = "";
  const items = data.list.slice(0, 8); // 3-hour intervals → 24 h

  items.forEach((item, i) => {
    const isNow = i === 0;
    const el    = document.createElement("div");
    el.className = "hourly-item" + (isNow ? " active-hour" : "");
    const pop = item.pop ? Math.round(item.pop * 100) : 0;
    el.innerHTML = `
      <span class="h-time">${isNow ? "Now" : formatHour(item.dt)}</span>
      <img  class="h-icon" src="${ICON}/${item.weather[0].icon}@2x.png" alt="${item.weather[0].description}"/>
      <span class="h-temp">${fmt(item.main.temp)}</span>
      ${pop > 0 ? `<span class="h-pop">💧 ${pop}%</span>` : ""}
    `;
    list.appendChild(el);
  });
}

// ── RENDER 5-DAY FORECAST ─────────────────────────────────────────────────────
function renderForecast(data) {
  lastForecast = data;
  const list   = document.getElementById("forecastList");
  list.innerHTML = "";

  const days = {};
  data.list.forEach(item => {
    const key = new Date(item.dt * 1000).toDateString();
    if (!days[key]) days[key] = [];
    days[key].push(item);
  });

  Object.keys(days).slice(1, 6).forEach(key => {
    const items = days[key];
    const mid   = items[Math.floor(items.length / 2)];
    const hi    = Math.max(...items.map(i => i.main.temp_max));
    const lo    = Math.min(...items.map(i => i.main.temp_min));
    const pop   = Math.round(Math.max(...items.map(i => i.pop || 0)) * 100);

    const el = document.createElement("div");
    el.className = "forecast-item";
    el.innerHTML = `
      <span class="fc-day">${dayName(mid.dt)}</span>
      <img  class="fc-icon" src="${ICON}/${mid.weather[0].icon}@2x.png" alt="${mid.weather[0].description}"/>
      <span class="fc-desc">${mid.weather[0].description}${pop > 0 ? ` · 💧${pop}%` : ""}</span>
      <span class="fc-temps">
        <span class="fc-hi">${fmt(hi)}</span>
        <span class="fc-lo">${fmt(lo)}</span>
      </span>
    `;
    list.appendChild(el);
  });
}

function refreshDisplayUnits() {
  if (!lastWeatherData) return;
  document.getElementById("tempValue").textContent = fmt(lastWeatherData.main.temp);
  document.getElementById("feelsLike").textContent = fmt(lastWeatherData.main.feels_like);
  if (lastForecast) { renderForecast(lastForecast); renderHourly(lastForecast); }
}

// ── API CALLS ─────────────────────────────────────────────────────────────────
async function fetchByCity(city) {
  showLoader();
  try {
    const [wRes, fRes] = await Promise.all([
      fetch(`${BASE}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`),
      fetch(`${BASE}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`)
    ]);

    if (!wRes.ok) {
      const errData = await wRes.json().catch(() => ({}));
      if      (wRes.status === 401) showError("API key invalid or not yet activated. New keys can take up to 2 hours at openweathermap.org.");
      else if (wRes.status === 404) showError(`"${city}" not found. Try a different city name.`);
      else if (wRes.status === 429) showError("Too many requests — please wait a minute and try again.");
      else                          showError(`Error ${wRes.status}: ${errData.message || "Something went wrong."}`);
      return;
    }

    const [wData, fData] = await Promise.all([wRes.json(), fRes.json()]);
    hideLoader();
    renderWeather(wData);
    renderForecast(fData);
    renderHourly(fData);

    // AQI — non-blocking
    fetch(`${BASE}/air_pollution?lat=${wData.coord.lat}&lon=${wData.coord.lon}&appid=${API_KEY}`)
      .then(r => r.json()).then(renderAQI).catch(() => {});

  } catch (e) {
    showError("Network error — cannot reach OpenWeatherMap. Check your internet connection.");
  }
}

async function fetchByCoords(lat, lon) {
  showLoader();
  try {
    const [wRes, fRes] = await Promise.all([
      fetch(`${BASE}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`),
      fetch(`${BASE}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    ]);

    if (!wRes.ok) {
      const errData = await wRes.json().catch(() => ({}));
      if      (wRes.status === 401) showError("API key invalid or not yet activated.");
      else if (wRes.status === 429) showError("Too many requests — please wait a minute.");
      else                          showError(`Error ${wRes.status}: ${errData.message || "Could not fetch weather for your location."}`);
      return;
    }

    const [wData, fData] = await Promise.all([wRes.json(), fRes.json()]);
    hideLoader();
    renderWeather(wData);
    renderForecast(fData);
    renderHourly(fData);

    fetch(`${BASE}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then(r => r.json()).then(renderAQI).catch(() => {});

  } catch (e) {
    showError("Network error. Check your connection and try again.");
  }
}

// ── EVENTS ────────────────────────────────────────────────────────────────────
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) { errorMsg.classList.add("hidden"); fetchByCity(city); }
});

cityInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) { errorMsg.classList.add("hidden"); fetchByCity(city); }
  }
});

geoBtn.addEventListener("click", () => {
  if (!navigator.geolocation) { showError("Geolocation is not supported by your browser."); return; }
  navigator.geolocation.getCurrentPosition(
    pos  => fetchByCoords(pos.coords.latitude, pos.coords.longitude),
    ()   => showError("Location access denied. Please allow location or search manually.")
  );
});

btnC.addEventListener("click", () => {
  if (isCelsius) return;
  isCelsius = true;
  btnC.classList.add("active"); btnF.classList.remove("active");
  refreshDisplayUnits();
});

btnF.addEventListener("click", () => {
  if (!isCelsius) return;
  isCelsius = false;
  btnF.classList.add("active"); btnC.classList.remove("active");
  refreshDisplayUnits();
});

// Forecast tabs
tabHourly.addEventListener("click", () => {
  tabHourly.classList.add("active"); tab5day.classList.remove("active");
  panelHourly.classList.remove("hidden"); panel5day.classList.add("hidden");
});

tab5day.addEventListener("click", () => {
  tab5day.classList.add("active"); tabHourly.classList.remove("active");
  panel5day.classList.remove("hidden"); panelHourly.classList.add("hidden");
});
