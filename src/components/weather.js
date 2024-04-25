// Weather.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [weatherHistory, setWeatherHistory] = useState([]);

  const apiKey = '74e0b5d138651a7806f1447c32505376'; // Replace with your API key

  const getWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      setWeatherData(response.data);
      setError(null);
      updateWeatherHistory(response.data);
    } catch (err) {
      setWeatherData(null);
      setError('City not found');
    }
  };

  const updateWeatherHistory = (data) => {
    setWeatherHistory((prevHistory) => [...prevHistory, { time: new Date(), data }]);
  };

  useEffect(() => {
    // Fetch initial weather data when component mounts
    getWeather();
  }, []);

  return (
    <div>
      <h1>Weather Dashboard</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weatherData && (
        <div>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}

      <hr />

      {weatherHistory.length > 0 && (
        <div>
          <h2>Weather Trends</h2>
          <ul>
            {weatherHistory.map((entry, index) => (
              <li key={index}>
                <strong>{entry.time.toLocaleString()}</strong>: {entry.data.main.temp}°C, {entry.data.weather[0].description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Weather;
