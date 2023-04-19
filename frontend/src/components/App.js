import React, { useState } from 'react';
import WeatherInfo from './WeatherInfo';
import AddLocation from './AddLocation';
import { fetchWeatherDataByCoordinates } from '../api';
import Map from './Map';
import SearchHistory from './SearchHistory';
import { getWeatherImageUrl } from '../cloudinary';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [weatherGif, setWeatherGif] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);


  const handleWeatherData = (data) => {
    setWeatherData(data);
    setSearchHistory((prevHistory) => [
      ...prevHistory,
      { location: data.name, timestamp: new Date() },
    ]);
    const gifUrl = getWeatherGifUrl(data.weather[0].main, data.sys.sunrise, data.sys.sunset);
    setWeatherGif(gifUrl);
  };

  const handlePositionChange = async (newPosition) => {
    try {
      const data = await fetchWeatherDataByCoordinates(newPosition.lat, newPosition.lng);
      setWeatherData(data);
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
    }
  };  

  const getWeatherGifUrl = (weatherCondition, sunrise, sunset) => {
    const currentTime = new Date().getTime() / 1000;
    const isDayTime = currentTime > sunrise && currentTime < sunset;
  
    if (isDayTime) {
      switch (weatherCondition) {
        case 'Clear':
          return getWeatherImageUrl('k2d7bgxescboub8ywkpx');
        case 'Clouds':
          return getWeatherImageUrl('tyj2riqh5jnl7aio3jwl');
        case 'Rain':
          return getWeatherImageUrl('pbseiq176ywwrj3zd5cj');
        case 'Snow':
          return getWeatherImageUrl('acdcpllvsayvcptzg0rh');
        default:
          return getWeatherImageUrl('favckal5glch3oztgzg8');
      }
    } else {
      switch (weatherCondition) {
        case 'Clear':
          return getWeatherImageUrl('k2d7bgxescboub8ywkpx');
        case 'Clouds':
          return getWeatherImageUrl('tyj2riqh5jnl7aio3jwl');
        case 'Rain':
          return getWeatherImageUrl('pbseiq176ywwrj3zd5cj');
        case 'Snow':
          return getWeatherImageUrl('acdcpllvsayvcptzg0rh');
        default:
          return getWeatherImageUrl('p8qilopv0xvwdjdgtlyr');
      }
    }
  };

  const handleLogin = (success) => {
    setLoggedIn(success);
  };  

  const renderAppContent = () => {
    if (!loggedIn) {
      return <Login onLogin={handleLogin} />;
    }

    return (
      <div
        id="app"
        className="app"
        style={{ backgroundImage: `url(${weatherGif})` }}
      >
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">Veður- og hitastig</h5>
          </div>
          <div className="card-body">
            <AddLocation onAddLocation={handleWeatherData} />
            {weatherData && <WeatherInfo data={weatherData} />}
            {weatherData && weatherData.coord && (
              <div
                style={{ height: "400px", width: "80%", marginTop: "20px" }}
              >
                <Map
                  position={[
                    weatherData.coord.lat,
                    weatherData.coord.lon,
                  ]}
                  zoom={13}
                  onPositionChange={handlePositionChange}
                />
              </div>
            )}
            <SearchHistory history={searchHistory} />
          </div>
        </div>
      </div>
    );
  };

  return <>{renderAppContent()}</>;
};

export default App;