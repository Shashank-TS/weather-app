import React, { useEffect, useState } from "react";
import "./WeatherApp.css";
import { FaSearch, FaWind } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&&units=metric&APPID=${apiKey}`;

  const fetchData = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      if (response.ok) {
        setWeatherData(data);
        setError("");
      } else {
        setError("No data found, Please enter a valid city name.");
        setWeatherData(null);
      }
      console.log(weatherData);
    } catch (error) {
      console.error(error);
      setWeatherData(null);
    }
  };

  return (
    <div className="container">
      <div className="city">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="enter city name.."
        />
        <button onClick={() => fetchData()}>
          <FaSearch></FaSearch>
        </button>
        {/* <p>{JSON.stringify(weatherData)}</p> */}
      </div>
      {error && <p className="error-message">{error}</p>}
      {weatherData && weatherData.weather && (
        <div className="content">
          <div className="weather-image">
            {/* from url:https://openweathermap.org/weather-conditions */}
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            />
            <h3 className="desc">{weatherData.weather[0].description}</h3>
          </div>
          <div className="weather-temp">
            <h2>
              {weatherData.main.temp}
              <span>&deg;C</span>
            </h2>
          </div>
          <div className="weather-city">
            <div className="location">
              <MdLocationOn />
            </div>
            <p>
              {weatherData.name},<span>{weatherData.sys.country}</span>
            </p>
          </div>

          <div className="weather-stats">
            <div className="wind">
              <div className="wind-icon">
                <FaWind></FaWind>
              </div>
              <h3 className="wind-speed">
                {weatherData.wind.speed}
                <span>km/h</span>
              </h3>
              <h3 className="wind-heading">WIND SPEED</h3>
            </div>
            <div className="humidity">
              <div className="humidity-icon">
                <WiHumidity></WiHumidity>
              </div>
              <h3 className="humidity-percent">
                {weatherData.main.humidity}
                <span>%</span>
              </h3>
              <h3 className="humidity-heading">HUMIDITY</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
