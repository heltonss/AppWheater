$(document).ready(function () {

    $('#weather-button').click(function () {
        var isForFahrenheit = $('#weather-button').text() === 'fahrenheit';
        var tempCurrent = $('#weather-temp').text();
        if (isForFahrenheit) {
            $('#weather-button').text('celsius');
            $('#weather-temp').text(converTempCelsiusForFahrenheint(tempCurrent).toFixed());
        } else {
            $('#weather-button').text('fahrenheit');
            $('#weather-temp').text(converTempFahrenheintForCelsius(tempCurrent).toFixed());
        }
    });

    getGeolocation()

});

function comunnicationAPI(latitud, longitud, key) {
    var appKey = 'd95959fcea1957ec239448d15d9baec8';
    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/forecast/daily?lat=" + latitud + "&lon=" + longitud + "&mode=json&units=metric&cnt=7&APPID=" + appKey,
        data: "data",
        dataType: "json",
        Headers: {
            "Accept": "application/json"
        },
        success: function (data) {
            console.log(data)
            populateWeatherWeek(data);
            populateDayCurrent(data);
        }
    });
}

function populateWeatherWeek(weekWeather) {
    var days = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
    var uriIcon = 'http://openweathermap.org/img/w/';

    weekWeather.list.forEach(function (dayWeather, index) {
        $('#weather-box')
            .append("<div class='weather-box-date'>" +
            "<div>" +
            days[index] +
            "</div>" +
            "<div>" +
            "<img src=" + uriIcon + dayWeather.weather[0].icon + ".png " + " />" +
            "</div>" +
            "<div>" +
            dayWeather.temp.day.toFixed() + "º" + "</div>" +
            "</div>")
    });
}

function getGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function getPosition(pos) {
    console.log("lat: " + pos.coords.latitude + " long: " + pos.coords.longitude)
    var local = {
        lat: pos.coords.latitude,
        long: pos.coords.longitude
    }
    comunnicationAPI(local.lat, local.long);
}

function populateDayCurrent(weekWeather) {
    var dayCurrent = getWeatherDay(weekWeather);
    $('#weather-temp').text(dayCurrent.temp.day.toFixed())
    $('#weather-local').text("local: " + weekWeather.city.name + ", " + weekWeather.city.country)
}

function getWeatherDay(weekWeather) {
    var getDayCurrent = new Date();
    return weekWeather.list[getDayCurrent.getDay()];
}

function converTempCelsiusForFahrenheint(tempCurrent) {
    return tempFarenheit = (tempCurrent * 1.8) + 32;
}

function converTempFahrenheintForCelsius(tempCurrent) {
    return tempCelsius = (tempCurrent - 32) / 1.8;
}

