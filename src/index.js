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

function displaycity(event) {
  event.preventDefault();
  let city = document.querySelector("#your-city").value;
  let apiKey = `5f472b7acba333cd8a035ea85a0d4d4c`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(url).then(displayWeatherCondition);
}
function displayWeatherCondition(response) {
  let currentcity = document.querySelector("#city");
  currentcity.innerHTML = `${response.data.name}`;
  let temperature = document.querySelector("#temp");
  let temp = Math.round(response.data.main.temp);
  temperature.innerHTML = `${temp}`;
  let description = document.querySelector("#des");
  description.innerHTML = `${response.data.weather[0].description}`;
}
function searchLocation(position) {
  let apiKey = `5f472b7acba333cd8a035ea85a0d4d4c`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let citysearch = document.querySelector("#city-search");
citysearch.addEventListener("submit", displaycity);
let currentLocationButton = document.querySelector("#button");
currentLocationButton.addEventListener("click", getCurrentLocation);
