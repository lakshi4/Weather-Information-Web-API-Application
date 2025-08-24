/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";  
import AuthButton from "./AuthButton";  
import './Dashboard.css';


const Dashboard = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [cities, setCities] = useState([]);
  const [weatherList, setWeatherList] = useState([]);
  const [cityName, setCityName] = useState('');
  const [loading, setLoading] = useState(false);
  const [savedWeather, setSavedWeather] = useState([]);
  const navigate = useNavigate();

    // If Auth0 still loading

  if (isLoading) return <div>Loading authentication...</div>;

   // If not logged in
  if (!isAuthenticated) {
    return (
      <div className="login-page">
        <h2>Please log in to  the Weather App</h2>
        <AuthButton />
      </div>
    );
  }

  useEffect(() => {
    // Fetch city list from backend
    fetch('http://localhost:8080/weather/cities')
      .then(res => res.json())
      .then(data => setCities(data))
      .catch(() => setCities([]));
  }, []);

  useEffect(() => {
    if (cities.length > 0) {
      setLoading(true);
      // Fetch weather for all cities (by name)
      Promise.all(
        cities.map(city =>
          fetch(`http://localhost:8080/weather/${city.cityName}`)
            .then(res => res.json())
            .catch(() => null)
        )
      ).then(results => {
        setWeatherList(results.filter(Boolean));
        setLoading(false);
      });
    }
  }, [cities]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // Load saved weather cards from localStorage
    const saved = JSON.parse(localStorage.getItem('savedWeatherCities') || '[]');
    setSavedWeather(saved);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (cityName.trim()) {
      navigate('/weather', { state: { cityName: cityName.trim() } });
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Card color palette
  const cardColors = [
    '#4e8cff', '#7c4dff', '#00b894', '#fdcb6e', '#d63031', '#0984e3'
  ];

  
  return (
    <div className="dashboard">
      <h2>Weather App</h2>
      <AuthButton />
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Enter a city"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {loading && <div className="loading">Loading dashboard...</div>}
      <div className="dashboard-grid">
        {weatherList.map((w, idx) => (
          <div
            key={idx}
            className="weatherCard dashboard-card"
            style={{
              background: cardColors[idx % cardColors.length],
              color: '#fff',
              position: 'relative'
            }}
          >
            <div className="dashboard-card-header">
              <span className="dashboard-card-city">
                {w.name || w.city}, {w.sys?.country || w.country}
              </span>
              <span className="dashboard-card-temp">
                {w.main?.temp || w.temperature}°C
              </span>
            </div>
            <div className="dashboard-card-date">
              {w.dt ? new Date(w.dt * 1000).toLocaleDateString() : ''}
            </div>
            <div className="dashboard-card-desc">
              {w.weather && w.weather[0] ? w.weather[0].description : w.description}
            </div>
            <div className="dashboard-card-minmax">
              Temp Min: {w.main?.temp_min || w.temp_min}°C, Temp Max: {w.main?.temp_max || w.temp_max}°C
            </div>
            <div className="dashboard-card-details">
              <div>
                Pressure: {w.main?.pressure || w.pressure} hPa<br />
                Humidity: {w.main?.humidity || w.humidity}%
              </div>
              <div>
                Visibility: {w.visibility ? (w.visibility / 1000) : ''} km<br />
                Wind: {w.wind?.speed || w.windSpeed} m/s {w.wind?.deg || w.windDirection}
              </div>
              <div>
                Sunrise: {formatTime(w.sys?.sunrise || w.sunrise)}<br />
                Sunset: {formatTime(w.sys?.sunset || w.sunset)}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Saved Weather Cards Section */}
      {savedWeather.length > 0 && (
        <div style={{marginTop: '2.5rem', width: '100%'}}>
          <h3 style={{color: '#2c3e50', textAlign: 'center', marginBottom: '1rem'}}>Saved Cities</h3>
          <div className="dashboard-grid">
            {savedWeather.map((w, idx) => (
              <div
                key={w.city + w.country}
                className="weatherCard dashboard-card"
                style={{
                  background: cardColors[(idx + 3) % cardColors.length],
                  color: '#fff',
                  position: 'relative'
                }}
              >
                <div className="dashboard-card-header">
                  <span className="dashboard-card-city">
                    {w.city}{w.country ? `, ${w.country}` : ''}
                  </span>
                  <span className="dashboard-card-temp">
                    {w.temperature}°C
                  </span>
                </div>
                <div className="dashboard-card-desc">
                  {w.description}
                </div>
                <div className="dashboard-card-minmax">
                  Temp Min: {w.temp_min}°C, Temp Max: {w.temp_max}°C
                </div>
                <div className="dashboard-card-details">
                  <div>
                    Pressure: {w.pressure} hPa<br />
                    Humidity: {w.humidity}%
                  </div>
                  <div>
                    Visibility: {w.visibility ? (w.visibility / 1000) : ''} km<br />
                    Wind: {w.windSpeed} m/s {w.windDirection}
                  </div>
                  <div>
                    Sunrise: {formatTime(w.sunrise)}<br />
                    Sunset: {formatTime(w.sunset)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
