let city = document.querySelector("input");
let search_btn = document.getElementById("search_btn");
let temp = document.getElementById("temp");
let wind = document.getElementById("wind");
let weather_status = document.getElementById("weather_status");
const apiKey = "bdd64c736f51fb2ffa936eaf1baa8bb3";
const weather = (city) =>{
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${apiKey}`;
  fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
      if(city.value != data.name){
        alert("OOPS! Check your city name")
      }
       temp.innerHTML = "City Temperature : " + Math.floor(data.main.temp) + "&degC";
       weather_status.innerHTML = "Weather Status : " + data.weather[0].description;
       wind.innerHTML = "Wind speed : " + data.wind.speed;
      }).catch((error)=>{
       console.log(error)
      })
    }
    search_btn.addEventListener("click", ( ) => {
      weather(city)
    }); 
