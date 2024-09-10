import React, { useState } from "react";
import axios from "axios";
import './index.css';

function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [geoData, setGeoData] = useState(null);

  const API_KEY = "429c906f95b526ec15bb3da9a4c037ff";  // Your OpenWeather API key

  // Fetch weather data based on lat and lon
  const fetchWeatherData = (lat, lon) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`;
    axios.get(weatherUrl).then((response) => {
      setWeatherData(response.data);
    }).catch((error) => {
      console.error("Error fetching weather data", error);
    });
  };

  // Fetch geolocation data
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`;
      axios.get(geoUrl).then((response) => {
        if (response.data.length > 0) {
          const geoInfo = response.data[0];
          setGeoData(geoInfo);
          fetchWeatherData(geoInfo.lat, geoInfo.lon);  // Fetch weather data for the location
        }
      }).catch((error) => {
        console.error("Error fetching geolocation data", error);
      });
      setLocation('');
    }
  };

  return (
    <div className="App">
      <div className="search">
        <input 
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text" 
        />
      </div>

      {/* Display geolocation information */}
      {geoData && (
        <div className="location-info">
          <h2>Location: {geoData.name}, {geoData.state}, {geoData.country}</h2>
          <p>Coordinates: Lat {geoData.lat}, Lon {geoData.lon}</p>
        </div>
      )}

      {/* Display weather information */}
      {weatherData.main && (
        <div className="weather-info">
          <h3>Current Weather</h3>
          <div className="temperature">
            <h1>{weatherData.main.temp} °F</h1>
          </div>
          <div className="description">
            <p>{weatherData.weather[0].main} - {weatherData.weather[0].description}</p>
          </div>
          <div className="feels">
            <p>Feels Like: {weatherData.main.feels_like} °F</p>
          </div>
          <div className="humidity">
            <p>Humidity: {weatherData.main.humidity}%</p>
          </div>
          <div className="wind">
            <p>Wind Speed: {weatherData.wind.speed} MPH</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;


















// import React from "react";
// import { useState } from "react";
// import axios from "axios";
// import './index.css'

// function App() {

//   const [data, setData] = useState({})
//   const [location, setLocation] = useState('')
  
//   const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=429c906f95b526ec15bb3da9a4c037ff`
//   const searchLocation = (event) => {
//     if (event.key === 'Enter') {
//       axios.get(url).then((response) => {
//         setData(response.data)
//         console.log(response.data)
//       })
//       setLocation('')
//     }
//   }

//   return (
//     <div className="App">
//       <div className="search">
//         <input 
//           value={location}
//           onChange={event => setLocation(event.target.value)}
//           onKeyPress={searchLocation}
//           placeholder="Enter Location"
//           type="text" 
//         />
//       </div>
//       <div className="container">
//         <div className="top">
//           <div className="location">
//             <p>{data.name}</p>
//           </div>
//           <div className="temp">
//             {data.main ? <h1>{data.main.temp}F</h1> : null}
//           </div>
//           <div className="description">
//             {data.weather ? <p>{data.weather[0].main}</p> : null}
//           </div>
//         </div>
//         <div className="bottom">
//           <div className="feels">
//             {data.main ? <p className="bold">{data.main.feels_like}F</p> : null}
//             <p>Feels Like</p>
//           </div>
//           <div className="humidity">
//             {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
//             <p>Humidity</p>
//           </div>
//           <div className="wind">
//             {data.wind ? <p>{data.wind.speed} MPH</p> : null}
//             <p>Wind Speed</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
