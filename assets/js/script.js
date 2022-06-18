var key = config.MY_API_KEY;

function nextPage () {
    window.location.href = "index-two.html"
}

function search (event) {
  event.preventDefault();
  var city = {};

  function saveData(weatherData) {
    var weatherData = [];
    weatherData.push(city);
    console.log(weatherData);
    localStorage.setItem("weather", JSON.stringify(weatherData));
  };

  // function pushData () {
      
  //     
  //     saveData();
  // };

  function citySearch () {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': key,
            'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
        }
    };
    
    fetch('https://community-open-weather-map.p.rapidapi.com/weather?q=' + $('#city-search').val() + '&lang=null&units=imperial', options)
    .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Sorry, we were unable to complete your request.");
        }
      })
      .then(data => {
        console.log(data);
        let current = data
        city.current = JSON.stringify(current);
        // localStorage.setItem("city data", weatherData.current)
      })
      .catch((error) => console.error("FETCH ERROR:", error));

  };

  function hourlyWeather () {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': key,
      'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
    }
  };
  
  fetch('https://community-open-weather-map.p.rapidapi.com/forecast?q=' + $('#city-search').val() + '%2Cus&units=imperial', options)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Sorry, we were unable to complete your request.");
    }
  })
  .then(data => {
    console.log(data);
    let hourly = data
    city.hourly = JSON.stringify(hourly);
    // localStorage.setItem("hourly", )
  })
  .catch((error) => console.error("FETCH ERROR:", error));

};

function fiveDay () {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': key,
      'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
    }
  };
  
  fetch('https://community-open-weather-map.p.rapidapi.com/forecast/daily?q=' + $('#city-search').val() + '&cnt=6&units=imperial', options)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Sorry, we were unable to complete your request.");
    }
  })
  .then(data => {
    console.log(data);
    let forecast = data
    city.forecast = JSON.stringify(forecast);
    // localStorage.setItem("five day", )
  })
  .catch((error) => console.error("FETCH ERROR:", error));

  // pushData();
  saveData();
};



citySearch();
hourlyWeather();
fiveDay();

};



$('#start').on('click', search);