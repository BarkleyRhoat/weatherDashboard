console.log("script", "connected");

var apiKey = "4e5568a0982d91762ed501f8faa3eb5c";
var searchedCities = [];

function fetchWeatherData(city) {
    var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=standard&appid=${apiKey}`;
    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=5&units=standard&appid=${apiKey}`;
   
    searchedCities.push(city);
    updateSearchHistory();

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
            return fetch(forecastUrl);
        })
        .then(response => response.json())
        .then(forecastData => {
            displayForecastData(forecastData);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });
}

function updateSearchHistory() {
    var previousCities = document.getElementById("previousCities");
    previousCities.innerHTML = "";
    currentCity.innerHTML = "";
    forecast.innerHTML = "";// Clear the previous search history

    for (var i = 0; i < searchedCities.length; i++) {
        var cityElement = document.createElement("button");
        cityElement.textContent = searchedCities[i];
        cityElement.classList.add("cityItem");
        previousCities.appendChild(cityElement);

        cityElement.addEventListener("click", function() {
            var cityName = this.textContent;
            fetchWeatherData(cityName);
        });
}}

function displayWeatherData(data) {
    var currentCity = document.getElementById("currentCity");
    var temperatureInFahrenheit = kelvinToFahrenheit(data.main.temp);
    var windSpeed = data.wind.speed;
    var humidity = data.main.humidity;
    var weatherIcon = data.main.icon;
    var feelsLike = kelvinToFahrenheit(data.main.feels_like);
    currentCity.innerHTML = `Current Weather in ${data.name}: ${temperatureInFahrenheit}°F<br>Wind Speed: ${windSpeed} m/s<br>Humidity: ${humidity} %<br>Feels Like: ${feelsLike}°F <br> ${weatherIcon}`;
}

function displayForecastData(forecastData, currentWeatherData) {
    var forecastSection = document.getElementById("forecast");
     

    for (let i = 0; i < forecastData.list.length; i++) {
        var forecast = forecastData.list[i];
        var forecastItem = document.createElement("div");
        var temperature = forecast.main.temp;
        var windSpeed = forecast.wind.speed;
        var humidity = forecast.main.humidity;
        var forecastIcon = forecast.main.icon;
        var feelsLike = kelvinToFahrenheit(forecast.main.feels_like);

        forecastItem.innerHTML = `${forecast.dt_txt} - ${temperature}°F<br>Wind Speed: ${windSpeed} m/s<br>Humidity: ${humidity} %<br>Feels Like: ${feelsLike}°F <br> ${forecastIcon}`;
        forecastSection.appendChild(forecastItem);
        
    }
}


function kelvinToFahrenheit(kelvin) {
    return ((kelvin - 273.15) * 9/5 + 32).toFixed(2);
}

var searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", () => {
    var searchCity = document.getElementById("searchCity").value;
    fetchWeatherData(searchCity);
});



  

