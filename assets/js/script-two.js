// Global Variables
let now = document.querySelector("#time");
let timeHolder = document.createElement("h2");
now.appendChild(timeHolder);

// originally hid this in a .gigignore but that breaks the whole website so I have to put it here. Good thing the api is free. 
var key = 'cfbc8d3087msh6c6ea9d7d95f9e1p1b1cecjsn764def6fdef3';

let source = "https://embed.windy.com/embed2.html"

let dashboard = document.querySelector("#dashboard");
let hourBox = document.querySelector("#middle-container");
let fiveForecast = document.querySelector("#forecast");
let historyBar = document.querySelector("#history")

let city = JSON.parse(localStorage.getItem("cities"))

// sets up empty objects/arrays which will be added to later
let currentWeather = {};
let hourWeather = {};
let fiveDayForecast = {};

// when the user enters a location, this function runs a search for the current weather
function citySearch () {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': key,
            'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
        }
    };
    
    fetch('https://community-open-weather-map.p.rapidapi.com/weather?q=' + JSON.parse(city[0]) + '&lang=null&units=imperial', options)
    .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Sorry, we were unable to complete your request.");
        }
      })
      .then(data => {
        console.log(data);
        currentWeather = data;
      })
      .catch((error) => console.error("FETCH ERROR:", error));

};

// runs a search for an hourly forecast for the same location
function hourlyWeather () {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': key,
      'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
    }
  };
  
  fetch('https://community-open-weather-map.p.rapidapi.com/forecast?q=' + JSON.parse(city[0]) + '%2Cus&units=imperial', options)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Sorry, we were unable to complete your request.");
    }
  })
  .then(data => {
    console.log(data);
    hourWeather = data;
  })
  .catch((error) => console.error("FETCH ERROR:", error));

};

// runs a search for a five-day forecast
function fiveDay () {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': key,
      'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
    }
  };
  
  fetch('https://community-open-weather-map.p.rapidapi.com/forecast/daily?q=' + JSON.parse(city[0]) + '&cnt=6&units=imperial', options)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Sorry, we were unable to complete your request.");
    }
  })
  .then(data => {
    console.log(data);
    fiveDayForecast = data;
  })
  .catch((error) => console.error("FETCH ERROR:", error));

  setTimeout(populatePage, 1000)
};

// this function, which is called after all searches are run, populates the page with current conditions
function populatePage() {
    let cityName = document.querySelector("#city-name");
    cityName.textContent = currentWeather.name;

    let currentWea = document.querySelector("#current-weather");
    let conditions = document.createElement("div");
    conditions.innerHTML = "<img src='http://openweathermap.org/img/wn/" + currentWeather.weather[0].icon + ".png' width='100' height='100'><br><h4>" + currentWeather.weather[0].main + "</h4>";
    currentWea.appendChild(conditions);


    let currentTemp = document.querySelector("#current-temp");
    currentTemp.textContent = Math.round(currentWeather.main.temp) + "° F";

    let currentFeel = document.querySelector("#feels-like");
    currentFeel.textContent = Math.round(currentWeather.main.feels_like) + "° F";

    let clouds = document.querySelector("#clouds");
    clouds.textContent = currentWeather.clouds.all + " %";

    let currPress = document.querySelector("#pressure");
    currPress.textContent = currentWeather.main.pressure + " hPa";

    let currHumid = document.querySelector("#humidity");
    currHumid.textContent = currentWeather.main.humidity + "%";

    let currWind = document.querySelector("#wind");
    currWind.textContent = currentWeather.wind.deg + "°, " + Math.round(currentWeather.wind.speed) + " mph";

    let radarMap = document.querySelector("#radar-map");
    radarMap.innerHTML = "<iframe src='" + source + "?lat=" + currentWeather.coord.lat + "&lon=" + currentWeather.coord.lon + "&detailLat=" + currentWeather.coord.lat + "&detailLon=" + currentWeather.coord.lon + "&width=650&height=450&zoom=8&level=surface&overlay=radar&product=radar&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1' frameborder='0'></iframe>"

    loadHourly();
    forecastFive();
}

// populates hourly forecast
function loadHourly () {
  for (i = 0; i < 7; i++) {
    let hourLine = document.createElement("div");
    hourLine.className = "hour-line variables"
    let time = document.createElement("p")

    let date = new Date (hourWeather.list[i].dt * 1000);

    function getTwelve(date) {
        return date.getHours() % 12 || 12;
    };

    let minutes = date.getMinutes();
    time.textContent = getTwelve(date) + ":" + minutes + "0 ";

    let conditions = document.createElement("p");
    conditions.innerHTML= "<img src='http://openweathermap.org/img/wn/" + hourWeather.list[i].weather[0].icon + ".png'><br><p>" + hourWeather.list[i].weather[0].main + "</p>"

    let temperature = document.createElement("h5");
    temperature.textContent = Math.round(hourWeather.list[i].main.temp) + "°"
    hourLine.append(time, conditions, temperature)
    hourBox.appendChild(hourLine);
  };
}

// populates five day forecast
function forecastFive () {
  for (i = 1; i < fiveDayForecast.list.length; i++) {
    let fiveFore = document.createElement("div")
    fiveFore.className = "card col text-bg-light vh-50 vw-10 five-day border-info"

    let fiveCond = document.createElement("div")
    fiveCond.className = "condition-container"

    let foreDay = document.createElement("h2");
    foreDay.className = "variables"
    let date = new Date (fiveDayForecast.list[i].dt *1000);
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let name = month[date.getMonth()];
    let day = date.getDate();
    
    foreDay.textContent = (name) + " " + day
        
    let fiveWea = document.createElement("div");
    fiveWea.innerHTML = "<img src='http://openweathermap.org/img/wn/" + fiveDayForecast.list[i].weather[0].icon + ".png' width='100' height='100'><br><h3>" + fiveDayForecast.list[i].weather[0].main + "</h3>"

    let fiveTemp = document.createElement("div");
    fiveTemp.innerHTML = "<h1>" + Math.round(fiveDayForecast.list[i].temp.max) + "° F</h1><br><h4>" + Math.round(fiveDayForecast.list[i].temp.min) + "° F</h4>"
        
    fiveCond.append(fiveWea, fiveTemp)
    fiveFore.append(foreDay, fiveCond)
    fiveForecast.appendChild(fiveFore);
    };

 
}

// I put this in because I felt like most weather sites show you the current time. it felt relevant.
function currentTime () {
    let rightNow = moment().format("MMMM Do, YYYY - hh:mm a");
    timeHolder.textContent = rightNow;
   
}

// when the user attempts to search another location, this function is run
function searchAgain(event) {
  event.preventDefault();
  newCity = JSON.stringify($('#new-city').val())
  //adds the entered city to the front of the array
  city.unshift(newCity);
  localStorage.setItem("cities", JSON.stringify(city))
  let reload = location.reload()
  setTimeout(reload, 5000);
}


// adds the recent searches to the header as buttons
function populateHistory () {
  for (let i = 0; i < city.length; i++) {
    let history = document.createElement("div")
    let prevCity = document.createElement("button")

    prevCity.id = city[i]
    prevCity.value = city[i]
    prevCity.className = "city-history btn btn-primary" 
    prevCity.textContent = JSON.parse(city[i]);
    history.appendChild(prevCity)
    historyBar.appendChild(history);
    
    document.getElementById(city[i]).addEventListener('click', push)

    function push () {
      city.unshift(prevCity.value);
      localStorage.setItem('cities', JSON.stringify(city))
      setTimeout(reloadPage, 2000)
    }
  };
};

// reloads the page
function reloadPage () {
  let reloadTwo = location.reload();
  setTimeout(reloadTwo, 5000)
}

citySearch();
fiveDay();
hourlyWeather();

setTimeout(populateHistory, 3000)
setInterval(currentTime, 1000);
$("#search-again").on('click', searchAgain);
