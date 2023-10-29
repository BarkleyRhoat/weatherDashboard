console.log("script", "connected");

// API Key 4e5568a0982d91762ed501f8faa3eb5c

var apiKey = "4e5568a0982d91762ed501f8faa3eb5c";
var cityName = "";
var fetchButton = document.getElementById("fetch-button");

function weatherAPI(name) {
    var weatherURL = 'https:api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}';


    fetch(weatherUrl)
        .then(function (response){
            return response.json();
        })

        .then (function (data) {
            var lat = data(0).lat;
            var lon = data(0).lon;
            console.log(lat, lon);
            return fetchForecast(lat, lon)

            .then(function(){})
        })

        .then (function (data) {
            console.log(data); 
        });
}
weatherAPI("charleston");

function fetchForecast(lat,lon) {
    return fetch(
        'https://api.openweathermap.org/data/2.5/forrecast?lat=${lat}&lon=${lon}&appid${apiKey}'
    )

    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        for (var i = 0; i< data.list.length; i = i + 8) {
            console.log(data.list[i]);
        }
    })
}