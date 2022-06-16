let now = document.querySelector("#time");
let timeHolder = document.createElement("h2");
now.appendChild(timeHolder);

let source = "https://embed.windy.com/embed2.html"

let dashboard = document.querySelector("#dashboard");
let hourBox = document.querySelector("#middle-container");
let fiveForecast = document.querySelector("#forecast");

function populatePage() {
    let cityData = JSON.parse(localStorage.getItem("city data"));
    console.log(cityData);

    let cityName = document.querySelector("#city-name");
    cityName.textContent = cityData.name;

    let currentWea = document.querySelector("#current-weather");
    let conditions = document.createElement("div");
    conditions.innerHTML = "<img src='http://openweathermap.org/img/wn/" + cityData.weather[0].icon + ".png' width='100' height='100'><br><h4>" + cityData.weather[0].main + "</h4>";
    currentWea.appendChild(conditions);


    let currentTemp = document.querySelector("#current-temp");
    currentTemp.textContent = Math.round(cityData.main.temp) + "° F";

    let currentFeel = document.querySelector("#feels-like");
    currentFeel.textContent = Math.round(cityData.main.feels_like) + "° F";

    let clouds = document.querySelector("#clouds");
    clouds.textContent = cityData.clouds.all + " %";

    let currPress = document.querySelector("#pressure");
    currPress.textContent = cityData.main.pressure + " hPa";

    let currHumid = document.querySelector("#humidity");
    currHumid.textContent = cityData.main.humidity + "%";

    let currWind = document.querySelector("#wind");
    currWind.textContent = cityData.wind.deg + "°, " + cityData.wind.speed + " mph";

    let radarMap = document.querySelector("#radar-map");
    radarMap.innerHTML = "<iframe width='650' height='450' src='" + source + "?lat=" + cityData.coord.lat + "&lon=" + cityData.coord.lon + "&detailLat=" + cityData.coord.lat + "&detailLon=" + cityData.coord.lon + "&width=650&height=450&zoom=8&level=surface&overlay=radar&product=radar&menu=&message=&marker=true&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1' frameborder='0'></iframe>"

    loadHourly();
    forecastFive();
}

function loadHourly () {
    let hourly = JSON.parse(localStorage.getItem("hourly"));
    console.log(hourly);

    for (i = 0; i < 7; i++) {
    let hourLine = document.createElement("div");
    hourLine.className = "hour-line variables"
    let time = document.createElement("p")

    let date = new Date (hourly.list[i].dt * 1000);

    function getTwelve(date) {
        return date.getHours() % 12 || 12;
    };

    let minutes = date.getMinutes();
    time.textContent = getTwelve(date) + ":" + minutes + "0 ";

    let conditions = document.createElement("p");
    conditions.innerHTML= "<img src='http://openweathermap.org/img/wn/" + hourly.list[i].weather[0].icon + ".png'><br><p>" + hourly.list[i].weather[0].main + "</p>"

    let temperature = document.createElement("h5");
    temperature.textContent = Math.round(hourly.list[i].main.temp) + "°"
    hourLine.append(time, conditions, temperature)
    hourBox.appendChild(hourLine);
    };
}

function forecastFive () {
    let forecast = JSON.parse(localStorage.getItem("five day"));
    console.log(forecast);

    for (i = 1; i < forecast.list.length; i++) {
        let fiveFore = document.createElement("div")
        fiveFore.className = "card col text-bg-light vh-50 vw-10 five-day border-info"

        let fiveCond = document.createElement("div")
        fiveCond.className = "condition-container"

        let foreDay = document.createElement("h2");
        foreDay.className = "variables"
        let date = new Date (forecast.list[i].dt *1000);
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        let name = month[date.getMonth()];
        let day = date.getDate();
        // document.write(day.toDateString());
        foreDay.textContent = (name) + " " + day
        
        let fiveWea = document.createElement("div");
        fiveWea.innerHTML = "<img src='http://openweathermap.org/img/wn/" + forecast.list[i].weather[0].icon + ".png' width='100' height='100'><br><h3>" + forecast.list[i].weather[0].main + "</h3>"

        let fiveTemp = document.createElement("div");
        fiveTemp.innerHTML = "<h1>" + Math.round(forecast.list[i].temp.max) + "° F</h1><br><h4>" + Math.round(forecast.list[i].temp.min) + "° F</h4>"
        
        fiveCond.append(fiveWea, fiveTemp)
        fiveFore.append(foreDay, fiveCond)
        fiveForecast.appendChild(fiveFore);
        // console.log(forecast.list[0].)
    }
}

function currentTime () {
    let rightNow = moment().format("MMMM Do, YYYY - hh:mm a");
    timeHolder.textContent = rightNow;
   
}

populatePage();
setInterval(currentTime, 1000);
// $("#search-again").on('click', citySearch);
