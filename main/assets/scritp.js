console.log("script", "connected");

// API Key 4e5568a0982d91762ed501f8faa3eb5c

var apiKey = "4e5568a0982d91762ed501f8faa3eb5c";
var cityName = "";
var fetchButton = document.getElementById("searchButton");
var cityBox = document.getElementById("previousCities")

var currentCity = document.getElementById("currentCity");
var forecastSection = document.getElementById("forecast");


function weatherAPI(city) {
    var weatherUrl = "https:bulk.openweathermap.org/archive/{BULK_FILE_NAME}?appid=${apiKey}";


    fetch(weatherUrl)
        .then(function (response){
            return response.json();
        })

        .then (function (data) {
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            console.log(lat, lon);
            return fetchForecast(lat, lon)
        })
            .then(function (forecastData) {
                displayForecastData(forecastData);
         })
            .catch(function (error) {
                console.error("Error fetching weather data:", error); 
        });
}

function fetchForecast(lat,lon) {
    return fetch(
        "https:bulk.openweathermap.org/archive/{BULK_FILE_NAME}?appid=${apikey}"
    )
        .then(function (response) {
            return response.json();
        })
        .catch(function (error) {
            console.error("Error fetching forecast data:", error);
        });
}

function displayWeatherData(data) {
    currentCity.textContent = "Current Weather in ${data.name}";
}

function displayForecastData(forecastData) {
    forecastSection.innerhtml = "";

    for (var i = 0; i < forecastData.list.length; i += 8) {
        var forecast = forecastData.list[i];
        var forecastItem = document.createElement("div");
        forecastItem.textContent = forecast.dt_txt + "-" + forecast.main.temp + "°F"
        forecastSection.appendChild(forecastItem);
    }
}

fetchButton.addEventListener("click", citySearch);

function citySearch() {
    var searchCity = document.getElementById("searchCity").value;
    weatherAPI(searchCity);
}
// weatherAPI("charleston");

// function fetchForecast(lat,lon) {
//     return fetch(
//         'https://api.openweathermap.org/data/2.5/forrecast?lat=${lat}&lon=${lon}&appid=4e5568a0982d91762ed501f8faa3eb5c}'
//     )

//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//         for (var i = 0; i< data.list.length; i = i + 8) {
//             console.log(data.list[i]);
//         }
//     })
// }

// fetchButton.addEventListener("click", citySearch);

// function citySearch() {
//     var searchCity = document.getElementById("searchCity").value;
//     weatherAPI(searchCity);
// }

 
