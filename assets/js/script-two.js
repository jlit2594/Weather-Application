let now = document.querySelector("#time");
let timeHolder = document.createElement("h2") 
now.appendChild(timeHolder)

let source = "https://embed.windy.com/embed2.html"

function populatePage() {
    let cityData = JSON.parse(localStorage.getItem("city data"))
    console.log(cityData)

    let cityName = document.querySelector("#city-name")
    cityName.textContent = cityData.name;
    console.log(cityName)

    let currentWea = document.querySelector("#current-weather")
    let conditions = document.createElement("div")
    conditions.innerHTML = "<img src='http://openweathermap.org/img/wn/" + cityData.weather[0].icon + ".png' width='100' height='100'><br><h4>" + cityData.weather[0].main + "</h4><br><h5>" + cityData.weather[0].description + "</h5>";
    currentWea.appendChild(conditions)


    let currentTemp = document.querySelector("#current-temp")
    currentTemp.textContent = cityData.main.temp + "° F"

    let currentFeel = document.querySelector("#feels-like")
    currentFeel.textContent = cityData.main.feels_like + "° F"

    let clouds = document.querySelector("#clouds")
    clouds.textContent = cityData.clouds.all + " %"

    let currPress = document.querySelector("#pressure")
    currPress.textContent = cityData.main.pressure + " hPa"

    let currHumid = document.querySelector("#humidity")
    currHumid.textContent = cityData.main.humidity + "%"

    let currWind = document.querySelector("#wind")
    currWind.textContent = cityData.wind.deg + "°, " + cityData.wind.speed + " mph"

    let highLow = document.querySelector("#high-low");
    let currHigh = document.createElement("div")
    currHigh.className = "min-max";
    currHigh.innerHTML = "<h3 class='variables'>Today's High</h3><br><h1>" + cityData.main.temp_max + "</h1><br><h3 class='variables'>Today's Low</h3><br><h1>" + cityData.main.temp_min + "</h1>" 
    highLow.appendChild(currHigh);

    let radarMap = document.querySelector("#radar-map")
    radarMap.innerHTML = "<iframe width='650' height='450' src='" + source + "?lat=" + cityData.coord.lat + "&lon=" + cityData.coord.lon + "&detailLat=" + cityData.coord.lat + "&detailLon=" + cityData.coord.lon + "&width=650&height=450&zoom=8&level=surface&overlay=radar&product=radar&menu=&message=&marker=true&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1' frameborder='0'></iframe>"

}

function currentTime () {
    let rightNow = moment().format("MMMM Do, YYYY - hh:mm a");
    timeHolder.textContent = rightNow;
   
}

populatePage();
setInterval(currentTime, 1000);
// $("#search-again").on('click', citySearch);
