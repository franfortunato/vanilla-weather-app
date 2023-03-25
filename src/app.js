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
function displayWeatherCondition(response) {
  let currentcity = document.querySelector("#city");
  currentcity.innerHTML = response.data.city;
  let temperature = document.querySelector("#temp");
  let temp = Math.round(response.data.temperature.current);
  temperature.innerHTML = `${temp}`;
  let description = document.querySelector("#des");
  description.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  icon.setAttribute("alt", response.data.condition.description);
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

let citysearch = document.querySelector("#city-search");
citysearch.addEventListener("submit", handleSubmit);
let currentLocationButton = document.querySelector("#button");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity("Rome");
