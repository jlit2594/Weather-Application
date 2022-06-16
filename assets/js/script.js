var key = config.MY_API_KEY;

function nextPage () {
    window.location.href = "index-two.html"
}

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
        localStorage.setItem("city data", JSON.stringify(data))
      })
      .catch((error) => console.error("FETCH ERROR:", error));

hourlyWeather();
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
    localStorage.setItem("hourly", JSON.stringify(data))
  })
  .catch((error) => console.error("FETCH ERROR:", error));

  fiveDay();
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
    localStorage.setItem("five day", JSON.stringify(data))
  })
  .catch((error) => console.error("FETCH ERROR:", error));

  setTimeout(nextPage, 1000);
};


$('#start').on('click', citySearch);