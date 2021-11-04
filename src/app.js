function displayWeather(response) {
    let cityElement = document.querySelector("#city");
    let currentTempElement = document.querySelector("#currentTemp");
    let currentWeatherDescElement = document.querySelector("#currentWeatherDesc");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    cityElement.innerHTML = response.data.name;
    currentTempElement.innerHTML = Math.round(response.data.main.temp);
    currentWeatherDescElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "2465cf67c79b581f012f9a417fbb141d"
let city = "New York"
let units = "metric"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`

axios.get(apiUrl).then(displayWeather)