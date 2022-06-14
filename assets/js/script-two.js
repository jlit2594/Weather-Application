let now = document.querySelector("#time");
let timeHolder = document.createElement("h2") 
now.appendChild(timeHolder)

let source = "https://embed.windy.com/embed2.html"

function populatePage() {
    let cityData = JSON.parse(localStorage.getItem("city data"))

    let cityName = document.querySelector("#city-name")
    cityName.textContent = cityData.name;
    console.log(cityName)

    let currentWea = document.querySelector("#current-weather")
    currentWea.textContent = cityData.weather

    // let weaImg = document.createElement("div")
    // weaImg.innerHTML = "<img>" + cityData.weather.icon

    let currentTemp = document.querySelector("#current-temp")
    currentTemp.textContent = cityData.main.temp + "° F"

    let currentFeel = document.querySelector("#feels-like")
    currentFeel.textContent = cityData.main.feels_like + "° F"

    let currPress = document.querySelector("#pressure")
    currPress.textContent = cityData.main.pressure + " MBPS"

    let currHumid = document.querySelector("#humidity")
    currHumid.textContent = cityData.main.humidity + "%"

    let currVis = document.querySelector("#visibility")
    currVis.textContent = cityData.visibility

    let currWind = document.querySelector("#wind")
    currWind.textContent = cityData.wind.deg + "°, " + cityData.wind.speed + " mph"

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
