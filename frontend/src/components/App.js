import React, { useState } from 'react';
import WeatherInfo from './WeatherInfo';
import AddLocation from './AddLocation';
import { fetchWeatherDataByCoordinates } from '../api';
import Map from './Map';
import SearchHistory from './SearchHistory';
import { getWeatherImageUrl } from '../cloudinary';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [weatherGif, setWeatherGif] = useState('');


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
    const currentTime = new Date().getTime() / 1000; // Convert to UNIX timestamp
    const isDayTime = currentTime > sunrise && currentTime < sunset;
  
    switch (weatherCondition) {
      case 'Clear':
        return getWeatherImageUrl('rz6nhff14au7jshx08i0');
      case 'Clouds':
        return getWeatherImageUrl('tyj2riqh5jnl7aio3jwl');
      case 'Rain':
        return getWeatherImageUrl('pbseiq176ywwrj3zd5cj');
      case 'Snow':
        return getWeatherImageUrl('acdcpllvsayvcptzg0rh');
      default:
        return isDayTime ? getWeatherImageUrl('favckal5glch3oztgzg8') : getWeatherImageUrl('p8qilopv0xvwdjdgtlyr');
    }
  };  

  return (
    <div id="app" className="app" style={{ backgroundImage: `url(${weatherGif})` }}>
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Veður- og hitastigsstöð</h5>
        </div>
        <div className="card-body">
          <AddLocation onAddLocation={handleWeatherData} />
          {weatherData && <WeatherInfo data={weatherData} />}
          {weatherData && weatherData.coord && (
            <div style={{ height: '400px', width: '80%', marginTop: '20px' }}>
              <Map
                position={[weatherData.coord.lat, weatherData.coord.lon]}
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

export default App;