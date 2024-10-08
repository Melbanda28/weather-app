import React, { useState } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import axios from "axios";

import "./Weather.css";
import WeatherForecastPreview from "./WeatherForecastPreview";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);

 function handleResponse(response) {
    console.log(response.data.coord)
    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      temperature: response.data.temperature.current,
      humidity: response.data.temperature.humidity,
      date: new Date(response.data.time * 1000),
      description: response.data.condition.description,
      icon: response.data.condition.icon,
      wind: response.data.wind.speed,
      city: response.data.name,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function search() {
   
 let apiKey = "0a266418598ob604ae10378et2402a5f";
 let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
 console.log(apiUrl);
    axios.get(apiUrl).then(handleResponse);
  }

  
  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9 ">
              <input
                type="search"
                placeholder="Enter a city.."
                className="form-control search-input"
                onChange={handleCityChange}
              />
            </div>
            <div className="col-3 p-0">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>
          </div>
        </form>
        <WeatherInfo data={weatherData} />
        <WeatherForecast
          coordinates={weatherData.coordinates}
          city={weatherData.city}
        />

        <footer>
          This was coded by
          <a
            href="https://www.shecodes.io/graduates/123422-mellania-banda"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mellania Banda
          </a>
          , code hosted on
          <a
            href="https://github.com/Melbanda28/weather-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Git Hub
          </a>
          and website hosted on
          <a
            href="https://weather-namhlanje.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Netlify
          </a>
        </footer>
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}



