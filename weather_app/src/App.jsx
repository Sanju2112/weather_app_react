import { useState } from 'react';
import './App.css';

// Importing weather images
import cloudsImg from './images/clouds.png';
import clearImg from './images/clear.png';
import rainImg from './images/rain.png';
import mistImg from './images/mist.png';
import drizzleImg from './images/drizzle.png';
import snowImg from './images/snow.png';


const api = {
  key: "356ee34cc2fab97fb77fe99dcee9e19a",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(''); // New state for error handling

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(result => {
        if (result.cod === "404") {
          setError("Invalid city name, please try again."); // Set error if city not found
          setWeather({});
        } else {
          setError(''); // Reset error if valid city is found
          setWeather(result);
        }
      })
      .catch(() => {
        setError("An error occurred. Please try again."); // Catch any fetch errors
      });
  };

  // Function to select image based on weather condition
  const getWeatherImage = () => {
    if (typeof weather.weather !== "undefined") {
      const condition = weather.weather[0].main.toLowerCase();
      switch (condition) {
        case 'clouds':
          return cloudsImg;
        case 'clear':
          return clearImg;
        case 'rain':
          return rainImg;
        case 'mist':
          return mistImg;
        case 'drizzle':
          return drizzleImg;
        case 'snow':
          return snowImg;
        default:
          return clearImg; // Default to clear if condition is unknown
      }
    }
    return null;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>

        {/* Search Box */}
        <div>
          <input
            type="text"
            placeholder="Enter city/town..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        {/* If weather is not undefined and no error, display results */}
        {typeof weather.main !== "undefined" && !error ? (
          <div className="weather-info">
            {/* Location */}
            <p>{weather.name}</p>

            {/* Temperature */}
            <p>{weather.main.temp}°C</p>

            {/* Condition */}
            <p>{weather.weather[0].main}</p>
            <p>({weather.weather[0].description})</p>

            {/* Weather Image */}
            <img src={getWeatherImage()} alt={weather.weather[0].main} className="weather-image" />
          </div>
        ) : (
          !error && <p>Please enter a city to see the weather details.</p> // Only display this if no error
        )}
      </header>
    </div>
  );
}

export default App;
