document.getElementById('searchButton').addEventListener('click', function () {
  const city = document.getElementById('cityInput').value.trim(); // Get the input value and trim whitespace
  const apiKey = '58449f4fde09b008bca0212dd4ae897b'; // Replace with your OpenWeatherMap API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  if (!city) {
    alert('Please enter a city name.');
    return;
  }

  fetch(apiUrl)
    .then(response => response.json()) // Convert the response to JSON
    .then(data => {
      if (data.cod === 200) { // If city is found
        const weatherContainer = document.getElementById('weather');
        const weatherData = `
          <div class="weather-info">
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">
          </div>
        `;
        weatherContainer.innerHTML = weatherData; // Update the HTML with the weather data
      } else {
        alert('City not found!');
      }
    })
    .catch(error => {
      alert('Error fetching weather data');
      console.error(error);
    });
});