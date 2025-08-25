/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import AuthButton from "./AuthButton";
import './Dashboard.css';

// Weather Card Component
const WeatherCard = ({ weather, color }) => {
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="weatherCard dashboard-card" style={{ background: color, color: '#fff', position: 'relative' }}>
      <div className="dashboard-card-header">
        <span className="dashboard-card-city">
          {weather.name || weather.city}, {weather.sys?.country || weather.country}
        </span>
        <span className="dashboard-card-temp">
          {weather.main?.temp || weather.temperature}°C
        </span>
      </div>
      {weather.dt && <div className="dashboard-card-date">{new Date(weather.dt * 1000).toLocaleDateString()}</div>}
      <div className="dashboard-card-desc">
        {weather.weather?.[0]?.description || weather.description}
      </div>
      <div className="dashboard-card-minmax">
        Temp Min: {weather.main?.temp_min || weather.temp_min}°C, Temp Max: {weather.main?.temp_max || weather.temp_max}°C
      </div>
      <div className="dashboard-card-details">
        <div>
          Pressure: {weather.main?.pressure || weather.pressure} hPa<br />
          Humidity: {weather.main?.humidity || weather.humidity}%
        </div>
        <div>
          Visibility: {weather.visibility ? (weather.visibility / 1000) : ''} km<br />
          Wind: {weather.wind?.speed || weather.windSpeed} m/s {weather.wind?.deg || weather.windDirection}
        </div>
        <div>
          Sunrise: {formatTime(weather.sys?.sunrise || weather.sunrise)}<br />
          Sunset: {formatTime(weather.sys?.sunset || weather.sunset)}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [cities, setCities] = useState([]);
  const [weatherList, setWeatherList] = useState([]);
  const [cityName, setCityName] = useState('');
  const [loading, setLoading] = useState(false);
  const [savedWeather, setSavedWeather] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const cardColors = ['#4e8cff', '#7c4dff', '#00b894', '#fdcb6e', '#d63031', '#0984e3'];

  // Auth loading state
  if (isLoading) return <div className="loading">Loading authentication...</div>;

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="login-page">
        <div className="app-title-container">
          <h1 className="app-title">Weather App</h1>
          
        </div>
        <h2>Please login to the Weather App</h2>
        <div className="auth-buttons-container">
          <button className="auth-btn login-btn" onClick={() => navigate("/login")}>Login</button>
          <button className="auth-btn register-btn" onClick={() => navigate("/register")}>Register</button>
        </div>
      </div>
    );
  }

  // Fetch city list
  useEffect(() => {
    fetch('http://localhost:8080/weather/cities')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch cities');
        return res.json();
      })
      .then(data => setCities(data))
      .catch(() => setCities([]));
  }, []);

  // Fetch weather for cities
  useEffect(() => {
    if (cities.length === 0) return;

    setLoading(true);
    setError('');

    Promise.all(
      cities.map(city =>
        fetch(`http://localhost:8080/weather/${city.cityName}`)
          .then(res => res.ok ? res.json() : null)
          .catch(() => null)
      )
    )
      .then(results => {
        const filtered = results.filter(Boolean);
        setWeatherList(filtered);
        if (filtered.length === 0) setError('Failed to fetch weather data.');
        setLoading(false);
      });
  }, [cities]);

  // Load saved weather from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedWeatherCities') || '[]');
    setSavedWeather(saved);
  }, []);

  // Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    if (!cityName.trim()) return;
    navigate('/weather', { state: { cityName: cityName.trim() } });
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="app-title">WeatherWise</h1>
        <AuthButton />
      </div>
      
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
      {error && <div className="error">{error}</div>}

      <div className="dashboard-grid">
        {weatherList.map((w, idx) => (
          <WeatherCard key={idx} weather={w} color={cardColors[idx % cardColors.length]} />
        ))}
      </div>

      {savedWeather.length > 0 && (
        <>
          <h3>Saved Cities</h3>
          <div className="dashboard-grid">
            {savedWeather.map((w, idx) => (
              <WeatherCard key={w.city + w.country} weather={w} color={cardColors[(idx + 3) % cardColors.length]} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;