//Abdelaziz Omar 101292570

import './App.css';
import './index.css';
import React, { useState } from 'react';
import axios from 'axios';

const api = {
  key: '5a72406af61f5244cca7f7cade971629',
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  // Setting Today's Date using Date() library
  let today = new Date().toDateString();

  // Setting Query for Search, and Weather for data
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  const search = event => {

    if (event.key === "Enter") {
      axios.get(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)

        .then(feedback => {
          setQuery('');
          setWeather(feedback.data);
          console.log(feedback.data);
        })
        .catch(error => {
          console.log(error)
          alert("Oops! No location found...")
        });
    }
  }

  return (
    <div className={'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Enter city..."
            autoComplete="on"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{today}</div>
            </div>
            <div className="icon-box">
              <img className="icon" alt="icon" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°c
                <div className="feels-like">Feels like {Math.round(weather.main.feels_like)}°c</div>
              </div>
              <div className="weather">{weather.weather[0].description}</div>
            </div>
            <div className="extra-data">
              <div className="first">
                <div>Min: {Math.round(weather.main.temp_min)}°c</div>
                <div>Humidity: {Math.round(weather.main.humidity)}%</div>
                <div>Wind Direction: {weather.wind.deg}°</div>
              </div>
              <div className="second">
                <div>Max: {Math.round(weather.main.temp_max)}°c</div>
                <div>Air Pressure: {weather.main.pressure}hPa</div>
                <div>Wind Speed: {weather.wind.speed}m/s</div>
              </div>
            </div>
          </div>
      </main>
    </div>
  );
}


export default App;
