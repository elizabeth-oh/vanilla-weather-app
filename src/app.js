function formatDate(timestamp){
    let date = new Date(timestamp);
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = days[date.getDay()]
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }

    return `${day} ${hours}:${minutes}`
}

function displayForecast(response) {
    let forecastElement = document.querySelector("#weatherForecast");
    
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

    let forecastHTML = `<div class="row">`;
    
    days.forEach(function(day) {
        forecastHTML = forecastHTML +
        `<div class="col">
                    <div class="dailyForecast">
                        <div class="forecastDay">
                            ${day}
                        </div>
                        <div class="forecastIcon">
                            <img
                            src="https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png"
                            alt="Current weather icon"
                            >
                        </div>
                        <div class="forecastTemperatures">
                            <span class=forecastHigh>12</span>
                            <span class=forecastLow>5</span>
                        </div>
                    </div>
                </div>`;
    });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    let apiKey = "2465cf67c79b581f012f9a417fbb141d";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
    let cityElement = document.querySelector("#city");
    let currentTempElement = document.querySelector("#currentTemp");
    let currentWeatherDescElement = document.querySelector("#currentWeatherDesc");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let currentTimeElement = document.querySelector("#currentTime");
    let currentIconElement = document.querySelector("#currentIcon");

    celsiusTemp = response.data.main.temp;

    cityElement.innerHTML = response.data.name;
    currentTempElement.innerHTML = Math.round(response.data.main.temp);
    currentWeatherDescElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    currentTimeElement.innerHTML = formatDate(response.data.dt * 1000);
    currentIconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    currentIconElement.setAttribute("alt",`${response.data.weather[0].description}`);

    getForecast(response.data.coord);
}

function search(city) {
    let apiKey = "2465cf67c79b581f012f9a417fbb141d";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input").value;
    celsiusLinkElement.classList.add("activeUnit");
    fahrenheitLinkElement.classList.remove("activeUnit");
    search (cityInput);
}

function displayFahrenheitTemp(event) {
    event.preventDefault();
    let currentTempElement = document.querySelector("#currentTemp");
    currentTempElement.innerHTML = Math.round((celsiusTemp * 9/5) + 32);

    celsiusLinkElement.classList.remove("activeUnit");
    fahrenheitLinkElement.classList.add("activeUnit");
}

function displayCelsiusTemp(event) {
    event.preventDefault();
    let currentTempElement = document.querySelector("#currentTemp");
    currentTempElement.innerHTML = Math.round(celsiusTemp);

    celsiusLinkElement.classList.add("activeUnit");
    fahrenheitLinkElement.classList.remove("activeUnit");
}

let celsiusTemp = null;

let formElement = document.querySelector("#search-form");
formElement.addEventListener("submit", handleSubmit)

let fahrenheitLinkElement = document.querySelector("#fahrenheit-link");
fahrenheitLinkElement.addEventListener("click", displayFahrenheitTemp);

let celsiusLinkElement = document.querySelector("#celsius-link");
celsiusLinkElement.addEventListener("click", displayCelsiusTemp);

search("paris");
