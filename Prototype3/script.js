let weather = {
  apikey: "b38e11d9578194e82bc2d7f503a42dd9",

  fetchWeather: function(city) {
    city = city.toUpperCase();
    const storedData = this.getStoredWeatherData(city);
    if (storedData) {
      this.displayWeather(storedData);
    } else {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apikey
      )
        .then((response) => response.json())
        .then((data) => {
          this.saveWeatherDataToStorage(city, data);
          this.displayWeather(data);
        })
        .catch((error) => console.log("Error fetching weather:", error));
    }
  },

  fetchPastWeekWeather: function(city) {
    city = city.toUpperCase();
    fetch("store_weather.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `city=${city}`,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          this.displayWeather(data);
          this.saveWeatherDataToStorage(city, data);
        } else {
          console.log("No past week's weather data available.");
        }
      })
      .catch((error) =>
        console.log("Error fetching past week's weather:", error)
      );
  },

  getStoredWeatherData: function(city) {
    const storedData = localStorage.getItem(city);
    if (storedData) {
      return JSON.parse(storedData);
    }
    return null;
  },

  saveWeatherDataToStorage: function(city, data) {
    localStorage.setItem(city, JSON.stringify(data));
  },

  displayWeather: function(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind Speed: " + speed + " km/h";
  },

  search: function() {
    let city = document.querySelector(".search-bar").value;
    if (city) {
      city = city.toUpperCase();
      this.fetchWeather(city);
      document.querySelector(".search-bar").value = "";
    }
  },
};

document
  .querySelector(".search button")
  .addEventListener("click", function() {
    weather.search();
  });

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    weather.search();
  }
});

document
  .querySelector("#past-week-button")
  .addEventListener("click", function() {
    const city = document.querySelector(".search-bar").value;
    if (city) {
      weather.fetchPastWeekWeather(city);
    }
  });

weather.fetchWeather("Noma");