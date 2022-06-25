const cities = [];

// directs to the next page
function nextPage () {
  window.location.href = "index-two.html"
}

// saves the location entered to localstorage, to be called back when the next page loads
function saveCity (event) {
  event.preventDefault();
  cityName = $('#city-search').val()
  cities.push(JSON.stringify(cityName));
  localStorage.setItem("cities", JSON.stringify(cities))
  console.log(cities)
  setTimeout(nextPage, 2000)
};



$('#start').on('click', saveCity);