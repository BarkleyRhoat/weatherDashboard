console.log("script", "connected");

var apiKey = "4e5568a0982d91762ed501f8faa3eb5c";

function fetchWeatherData(city) {
    // var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    // var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=5&units=imperial&appid=${apiKey}`;
    // var weatherUrl = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}'

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

function displayWeatherData(data) {
    var currentCity = document.getElementById("currentCity");
    var temperatureInFahrenheit = kelvinToFahrenheit(data.main.temp);
    currentCity.textContent = `Current Weather in ${data.name}: ${temperatureInFahrenheit}°F`;
}

function displayForecastData(forecastData) {
    var forecastSection = document.getElementById("forecast");
    forecastSection.innerHTML = ""; // Clear previous forecast data

    for (let i = 0; i < forecastData.list.length; i++) {
        var forecast = forecastData.list[i];
        var forecastItem = document.createElement("div");
        forecastItem.textContent = `${forecast.dt_txt} - ${forecast.main.temp}°F`;
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




