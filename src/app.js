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

function formatForecastDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    return days[day];
}

function displayForecast(response) {
    let forecastElement = document.querySelector("#weatherForecast");
    let dailyForecast = response.data.daily
    
    let forecastHTML = `<div class="row">`;
    
    dailyForecast.forEach(        
        function(forecastDay, index) {

        if (index<5) 
        {forecastHTML = forecastHTML +
        `<div class="col">
                    <div class="dailyForecast">
                        <div class="forecastDay">
                            ${formatForecastDay(forecastDay.dt)}
                        </div>
                        <div class="forecastIcon">
                            <img
                            src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                            alt="Forecasted weather icon"
                            >
                        </div>
                        <div class="forecastTemperatures">
                            <span class=forecastHigh>${Math.round(forecastDay.temp.max)}<span>°</span></span>
                            <span class=forecastLow>${Math.round(forecastDay.temp.min)}<span>°</span></span>
                        </div>
                    </div>
                </div>`;}
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
