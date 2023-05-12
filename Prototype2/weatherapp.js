const apiKey = 'bdd64c736f51fb2ffa936eaf1baa8bb3';
const cityNameElement = document.querySelector('#city-name');
const temperatureElement = document.querySelector('#temperature');
const humidityElement = document.querySelector('#humidity');
const pressureElement = document.querySelector('#pressure');
const windElement = document.querySelector('#wind');
const timeElement = document.querySelector('#time');
const descriptionElement = document.querySelector('#description');
const searchButton = document.querySelector('#search-button');
const cityInput = document.querySelector('#city-input');

function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      cityNameElement.textContent = data.name;
      temperatureElement.textContent = data.main.temp;
      humidityElement.textContent = data.main.humidity;
      pressureElement.textContent = data.main.pressure;
      windElement.textContent = data.wind.speed;
      const d = new Date();
      const localTime = d.getTime();
      const localOffset = d.getTimezoneOffset() * 60000;
      const utc = localTime + localOffset;
      const cityTime = utc + (data.timezone * 1000);
      const nd = new Date(cityTime);
      timeElement.textContent = nd.toLocaleTimeString();
      descriptionElement.textContent = data.weather[0].description;
      const weatherIcon = document.querySelector('#weather-icon');
      const weatherCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${weatherCode}.png`;
      weatherIcon.setAttribute('src', iconUrl);
    })
    .catch(error => {
      alert('Error');
      console.error(error);
    });
}


searchButton.addEventListener('click', event => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city !== '') {
    getWeatherData(city);
  }
});

getWeatherData("Noma");