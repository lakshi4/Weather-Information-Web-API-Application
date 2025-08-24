import React , {useState,useEffect} from 'react'
import { FaSearch, FaArrowLeft , FaCloud, FaSun, FaCloudSun, FaCloudRain, FaSnowflake } from 'react-icons/fa'
import './Weather.css'

//import clear_icon from '../assets/clear.png'
//import humidity_icon from '../assets/humidity.png'


const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


     // Get appropriate weather icon based on condition
  const getWeatherIcon = (description) => {
    if (description.includes('Clear')) return <FaSun className="weather-icon" />;
    if (description.includes('Cloud')) return <FaCloud className="weather-icon" />;
    if (description.includes('Rain')) return <FaCloudRain className="weather-icon" />;
    if (description.includes('Snow')) return <FaSnowflake className="weather-icon" />;
    return <FaCloudSun className="weather-icon" />;
  };

    //Fetch weather data from backend
    const fetchWeatherData = async (cityName) => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`http://localhost:8080/weather/${cityName}`);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            setWeatherData(data);
        } catch (err) {
            setError(err.message);
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch =(e) =>{
        e.preventDefault();
        if (city.trim()) {
            fetchWeatherData(city.trim());
        }
    };

    //Load default city
   useEffect(() => {
  fetch("http://localhost:8080/weather/Colombo")
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


  return (
    <div className = 'weather' >
       <div className= "weatherCard">
            <div claaName= "search-section">
                <form onSubmit={handleSearch} className ="search-bar">
                    <input 
                    type="text"
                    placeholder ="Search City Name"
                    value={city}
                    onChange={(e)=> setCity(e.target.value)}
                    />  
                    <button type="submit">
                        <FaSearch className="search-icon" />
                    </button>
                </form>
            </div>

            {loading && <div className ="loading">Loading weather data...</div>}

            {error && (
                <div className ="error">
                    <P>{error}</P>
                    <button onClick={()  =>fetchWeatherData('')}>
                    <FaArrowLeft /> Back
                    </button>
                    </div>

            )}


            {weatherData && !loading &&(
                <>
                <div className ="location-time">
                    <h1 className ="location">{weatherData.city}, {weatherData.country}</h1>
                    <p className="time">{weatherData.time}</p>
                </div>

                <div className ="temperature-section">
                    <div className ="weather-icon-container">
                        {getWeatherIcon(weatherData.description)}
                    </div>
                    <h2 className ="temperature">{weatherData.temperature} °C </h2>
                    <p className ="description">{weatherData.description}  </p>
                    <div className ="temp-minmax">
                        <span>Min: {weatherData.temp_min} °C</span>
                        <span>Max: {weatherData.temp_max} °C</span>
                    </div>
                </div>

                <div className="weather-details">
                    <div className ="detail-row">
                        <div className="detail-item">
                            <span className="lable">Pressure:</span>
                            <span className="value">{weatherData.pressure}hPa</span>
                        </div>
                        <div className="detail-item">
                            <span className="lable">Humidity:</span>
                            <span className="value">{weatherData.humidity}%</span>
                        </div>
                        <div className="detail-item">
                            <span className="lable">Visibility:</span>
                            <span className="value">{weatherData.visibility}km</span>
                        </div>
                    </div>

                    <div className ="detail-row">
                        <div className="detail-item">
                            <span className="lable">wind:</span>
                            <span className="value">{weatherData.windSpeed}m/s{weatherData.windDirection}</span>
                        </div>
                    </div>    

                     <div className ="detail-row">
                        <div className="detail-item">
                            <span className="lable">Sunrise:</span>
                            <span className="value">{weatherData.sunrise}</span>
                        </div>
                        <div className="detail-item">
                            <span className="lable">Sunset:</span>
                            <span className="value">{weatherData.sunset}</span>
                        </div>
                    </div> 
                </div>

                </>
            )}







        </div>      
    </div>
  )
}

export default Weather 


//<div className = "search-bar">
  //          <input type = "text" placeholder = 'Search city name'/>
  ///          <FaSearch className="search-icon" />
   // /    </div>
     //   <img src={clear_icon} alt="weather icon" className='weather-icon'/>
       // <h2 className='city'>Colombo</h2> 
 //       <h2 className='temperature'>25°C</h2>  
   //     <h3 className='description'>Clear Sky</h3>
     //   <div className='weather-data'>
       //     <div className='col'>
         //       <img src={humidity_icon} alt="humidity icon" className='weather-data-icon'/>
           //     <div>
             //   <span className='label'>Humidity:</span>
               // <span className='value'>60%</span>
//                </div>
  //          </div>
    //        <div className='detail-item'>
      //          <span className='label'>Wind Speed:</span>
        //        <span className='value'>10 km/h</span>
          //  </div>
 //           <div className='detail-item'>
   //             <span className='label'>Pressure:</span>
     //           <span className='value'>1015 hPa</span>
       //     </div> 
         //   </div>