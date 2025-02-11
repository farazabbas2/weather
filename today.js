document.getElementById('searchBtn').addEventListener('click', function() {
  const city = document.getElementById('cityInput').value.trim();
  const apiKey = "58449f4fde09b008bca0212dd4ae897b"; // Replace with your OpenWeatherMap API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  if (city === "") {
      document.getElementById('weatherInfo').innerHTML = "<p>Please enter a city name.</p>";
      return;
  }

  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
      if (data.cod === 200) {
          document.getElementById('weatherInfo').innerHTML = `
              <div class="weather-info">
                  <h3>${data.name}, ${data.sys.country}</h3>
                  <p>Temperature: ${data.main.temp}°C</p>
                  <p>Weather: ${data.weather[0].description}</p>
                  <p>Humidity: ${data.main.humidity}%</p>
                  <p>Wind Speed: ${data.wind.speed} m/s</p>
                  <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">
              </div>
          `;
      } else {
          document.getElementById('weatherInfo').innerHTML = `<p>City not found. Please try again.</p>`;
      }
  })
  .catch(error => {
      console.error("Error fetching weather:", error);
      document.getElementById('weatherInfo').innerHTML = "<p>Failed to fetch weather data. Try again later.</p>";
  });
});
