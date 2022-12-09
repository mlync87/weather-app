import React, { useState } from "react";
// import css to make app more user friendly
import "./App.css";
// use useState hook to create a state variable thast will contain weather data.
// the same state variable can be used to display this state variable retrieved from api.
function App() {
  // create a way to store my api key
  const apiKey = "73d1cbd2ab7957f84c57e5d8ca4ede86";
  // create state variable
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");

  const getWeather = (event) => {
    if (event.key === "Enter") {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          setCity("");
        });
    }
  };

  return (
    <div className="container">
      <input
        className="input"
        placeholder="Enter City..."
        onChange={(e) => setCity(e.target.value)}
        value={city}
        onKeyPress={getWeather}
      />

      {typeof weatherData.main === "undefined" ? (
        <div>
          <p>
            Welcome to weather app! Enter a city to get the weather in that
            area. Or don't, I couldnt care less!
          </p>
        </div>
      ) : (
        <div className="weather-data">
          <p className="city">{weatherData.name}</p>
          <p className="temp">{Math.round(weatherData.main.temp)}°C</p>
          <p className="weather">
            {weatherData.weather[0].main}
            <p className="tag-line">You should maybe wear a coat mate</p>
          </p>
        </div>
      )}

      {weatherData.cod === "404" ? <p>City not found.</p> : <></>}
    </div>
  );
}

export default App;
