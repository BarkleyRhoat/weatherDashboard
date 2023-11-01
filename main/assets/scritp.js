console.log("script", "connected");

var apiKey = "4e5568a0982d91762ed501f8faa3eb5c";
var cityName = "";
var fetchButton = document.getElementById("searchButton");
var cityBox = document.getElementById("previousCities");
var currentCity = document.getElementById("currentCity");
var forecastSection = document.getElementById("forecast");

function weatherAPI(city) {
    var weatherUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data[0].lat; 
            var lon = data[0].lon;
            console.log(lat, lon);
            return fetchForecast(lat, lon);
        })
        .then(function (forecastData) {
            displayForecastData(forecastData);
        })
        .catch(function (error) {
            // console.error("Error fetching weather data:", error);
        });
}


function displayWeatherData(data) {
    // var currentWeather = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}'

    currentCity.textContent = `Current Weather in ${data.name}`;
}

function displayForecastData(forecastData) {
    forecastSection.innerHTML = "";

    for (var i = 0; i < forecastData.list.length; i += 5) {
        var forecast = forecastData.list[i];
        var forecastItem = document.getElementById("forecast");
        forecastItem.textContent = `${forecast.dt_txt} - ${forecast.main.temp}°F`;
        forecastSection.appendChild(forecastItem);
    }
}

fetchButton.addEventListener("click", citySearch);

function citySearch() {
    var searchCity = document.getElementById("searchCity").value;
    weatherAPI(searchCity);
}
