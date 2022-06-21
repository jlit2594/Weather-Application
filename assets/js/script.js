var key = config.MY_API_KEY;

const cities = [];

function nextPage () {
  window.location.href = "index-two.html"
}

function saveCity (event) {
  event.preventDefault();
  cityName = $('#city-search').val()
  cities.push(JSON.stringify(cityName));
  localStorage.setItem("cities", JSON.stringify(cities))
  console.log(cities)
  setTimeout(nextPage, 2000)
};



$('#start').on('click', saveCity);