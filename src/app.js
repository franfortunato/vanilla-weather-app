let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let currentTime = document.querySelector("#date");
currentTime.innerHTML = `${day} ${hour}:${minute}`;

function searchCity(city) {
  let apiKey = `o07tbd43af0deae24a2d482039c7cfcf`;
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#your-city").value;
  searchCity(city);
}

function getForecast(coordinates) {
  let apiKey = `o07tbd43af0deae24a2d482039c7cfcf`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecastData = response.data.daily;
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecastData.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col">
              <h3 class="weather-forecast-date"> <strong>${formatDay(
                forecastDay.time
              )}</strong> </h3>
              <div class="weather-forecast-icon">
            <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              forecastDay.condition.icon
            }.png"
            alt="${forecastDay.condition.description}" 
            width="75"
            /> </div>
            <div class="weather-forecast-temperatures">
          <h5 class="temperature-max"> ${Math.round(
            forecastDay.temperature.maximum
          )}° <span class="temperature-min"> ${Math.round(
          forecastDay.temperature.minimum
        )}° </h5> </div> </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function displayWeatherCondition(response) {
  let currentcity = document.querySelector("#city");
  currentcity.innerHTML = response.data.city;
  let temperature = document.querySelector("#temp");
  celsiusTemp = response.data.temperature.current;
  let temp = Math.round(celsiusTemp);
  temperature.innerHTML = `${temp}`;
  let description = document.querySelector("#des");
  description.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let icon = document.querySelector("#icon");
  let feltTemp = document.querySelector("#feels");
  feltTemp.innerHTML = Math.round(response.data.temperature.feels_like);

  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  icon.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}
function searchLocation(position) {
  let apiKey = `o07tbd43af0deae24a2d482039c7cfcf`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayFahreneitTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  celsiusLink.classList.remove("active");
  farheneitLink.classList.add("active");
  let fahreneitTemp = (celsiusTemp * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahreneitTemp);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  celsiusLink.classList.add("active");
  farheneitLink.classList.remove("active");
  temperature.innerHTML = Math.round(celsiusTemp);
}
let citysearch = document.querySelector("#city-search");
citysearch.addEventListener("submit", handleSubmit);
let currentLocationButton = document.querySelector("#button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celsiusTemp = null;
let farheneitLink = document.querySelector("#farheneit-link");
farheneitLink.addEventListener("click", displayFahreneitTemp);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);
searchCity("Rome");
