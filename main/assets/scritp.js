console.log("script", "connected");

var apiKey = "4e5568a0982d91762ed501f8faa3eb5c";

function fetchWeatherData(city) {
    var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=5&units=standard&appid=${apiKey}`;
   
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
    var windSpeed = data.wind.speed;
    var humidity = data.main.humidity;
    var feelsLike = kelvinToFahrenheit(data.main.feels_like);
    currentCity.innerHTML = `Current Weather in ${data.name}: ${temperatureInFahrenheit}°F<br>Wind Speed: ${windSpeed} m/s<br>Humidity: ${humidity} %<br>Feels Like: ${feelsLike}°F`;
}

function displayForecastData(forecastData, currentWeatherData) {
    var forecastSection = document.getElementById("forecast");
    forecastSection.innerHTML = ""; 

    for (let i = 0; i < forecastData.list.length; i++) {
        var forecast = forecastData.list[i];
        var forecastItem = document.createElement("div");
        var temperature = forecast.main.temp;
        var windSpeed = forecast.wind.speed;
        var humidity = forecast.main.humidity;
        var feelsLike = kelvinToFahrenheit(forecast.main.feels_like);

        forecastItem.innerHTML = `${forecast.dt_txt} - ${temperature}°F<br>Wind Speed: ${windSpeed} m/s<br>Humidity: ${humidity} %<br>Feels Like: ${feelsLike}°F`;
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



  

