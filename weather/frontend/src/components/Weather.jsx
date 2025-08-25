// src/pages/Weather.jsx
import React , {useState,useEffect} from 'react'
import { FaSearch, FaArrowLeft , FaCloud, FaSun, FaCloudSun, FaCloudRain, FaSnowflake } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
//import { useAuth0 } from "@auth0/auth0-react";
import './Weather.css'

const Weather = () => {
  const [cityName, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //const [savedMsg, setSavedMsg] = useState('');
  const navigate = useNavigate();
  //const { getAccessTokenSilently } = useAuth0();

  // Get appropriate weather icon based on condition
  const getWeatherIcon = (description) => {
    if (!description || typeof description !== 'string') return <FaCloudSun className="weather-icon" />;
    if (description.includes('Clear')) return <FaSun className="weather-icon" />;
    if (description.includes('Cloud')) return <FaCloud className="weather-icon" />;
    if (description.includes('Rain')) return <FaCloudRain className="weather-icon" />;
    if (description.includes('Snow')) return <FaSnowflake className="weather-icon" />;
    return <FaCloudSun className="weather-icon" />;
  };

  // Fetch weather data from backend
  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError('');
    try {
      //const token = await getAccessTokenSilently();
      const response = await fetch(`http://localhost:8080/weather/${cityName}`, {
        // headers: {
        //   Authorization: `Bearer ${token}`
        // }
      });

      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();

      setWeatherData({
        city: data.name,
        country: data.sys?.country,
        temperature: data.main?.temp,
        description: data.weather && data.weather[0] ? data.weather[0].description : '',
        temp_min: data.main?.temp_min,
        temp_max: data.main?.temp_max,
        pressure: data.main?.pressure,
        humidity: data.main?.humidity,
        visibility: data.visibility,
        windSpeed: data.wind?.speed,
        windDirection: data.wind?.deg,
        sunrise: data.sys?.sunrise,
        sunset: data.sys?.sunset,
      });

      setCity(data.name && data.sys?.country ? `${data.name}, ${data.sys.country}` : data.name);

    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (cityName.trim()) {
      fetchWeatherData(cityName.trim());
    }
  };

  // const handleSaveToDashboard = () => {
  //   if (weatherData) {
  //     let savedCities = JSON.parse(localStorage.getItem('savedWeatherCities') || '[]');
  //     if (!savedCities.find(c => c.city === weatherData.city && c.country === weatherData.country)) {
  //       savedCities.push(weatherData);
  //       localStorage.setItem('savedWeatherCities', JSON.stringify(savedCities));
  //       setSavedMsg('Saved to dashboard!');
  //     } else {
  //       setSavedMsg('Already saved!');
  //     }
  //     setTimeout(() => setSavedMsg(''), 2000);
  //   }
  // };

  // Load default city on mount
 useEffect(() => {
  const defaultCity = 'Colombo'; // Use a city from cities.json
  fetch(`http://localhost:8080/weather/${defaultCity}`)
    .then(res => {
      if (!res.ok) {
        throw new Error("Failed to fetch weather data");
      }
      return res.json();
    })
    .then(data => setWeatherData(data))
    .catch(err => {
      console.error("Error fetching weather:", err);
      setError(err.message);
    });
}, []); 

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className='weather'>
      <div className="weatherCard">
        {/* Navigation button */}
        <button
          className="nav-back-btn"
          style={{ top: '10px', left: '10px', background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', zIndex: 2 }}
          onClick={() => navigate('/')}
          aria-label="Back to Dashboard"
        >
          <FaArrowLeft />
        </button>

        {/* Search bar */}
        <div className="search-section">
          <form onSubmit={handleSearch} className="search-bar">
            <input 
              type="text"
              placeholder="Search City Name"
              value={cityName}
              onChange={(e)=> setCity(e.target.value)}
            />  
            <button type="submit">
              <FaSearch className="search-icon" />
            </button>
          </form>
        </div>

        {loading && <div className="loading">Loading weather data...</div>}

        {error && (
          <div className="error">
            <p>{error}</p>
            <button onClick={() => { setError(null); setWeatherData(null); setCity(''); navigate('/'); }}>
              <FaArrowLeft /> Back
            </button>
          </div>
        )}

        {weatherData && !loading && (
          <>
            <div className="location-time">
              <h1 className="location">
                {weatherData.city}{weatherData.country ? `, ${weatherData.country}` : ''}
              </h1>
            </div>

            <div className="temperature-section">
              <div className="weather-icon-container">
                {getWeatherIcon(weatherData.description)}
              </div>
              <h2 className="temperature">{weatherData.temperature} °C </h2>
              <p className="description">{weatherData.description}</p>
              <div className="temp-minmax">
                <span>Min: {weatherData.temp_min} °C</span>
                <span>Max: {weatherData.temp_max} °C</span>
              </div>
            </div>

            <div className="weather-details">
              <div className="detail-row">
                <div className="detail-item"><span className="label">Pressure:</span> <span className="value">{weatherData.pressure} hPa</span></div>
                <div className="detail-item"><span className="label">Humidity:</span> <span className="value">{weatherData.humidity}%</span></div>
                <div className="detail-item"><span className="label">Visibility:</span> <span className="value">{weatherData.visibility ? (weatherData.visibility / 1000) : ''} km</span></div>
              </div>
              <div className="detail-row">
                <div className="detail-item"><span className="label">Wind:</span> <span className="value">{weatherData.windSpeed} m/s {weatherData.windDirection}</span></div>
              </div>
              <div className="detail-row">
                <div className="detail-item"><span className="label">Sunrise:</span> <span className="value">{formatTime(weatherData.sunrise)}</span></div>
                <div className="detail-item"><span className="label">Sunset:</span> <span className="value">{formatTime(weatherData.sunset)}</span></div>
              </div>
            </div>

            {/* <button
              style={{ marginTop: '1.5rem', width: '100%', padding: '0.8rem', background: '#0d6a5959', color: '#0c2a47ff', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer' }}
              onClick={handleSaveToDashboard}
            >
              Save to Dashboard
            </button>
            {savedMsg && (
              <div style={{ textAlign: 'center', color: '#0984e3', marginTop: '0.5rem', fontWeight: 500 }}>
                {savedMsg}
              </div>
            )} */}
          </>
        )}
      </div>      
    </div>
  )
}

export default Weather;
