import React, { useState } from 'react';
import '../css/styles.css';

const AddLocation = ({ onAddLocation }) => {
  const [location, setLocation] = useState('');
  const [language, setLanguage] = useState('en');

  const fetchWeatherData = async (location) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=f5fec0946bc550184dec442698c35d67`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      onAddLocation(data);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch weather data. Please try again.');
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    fetchWeatherData(location);
  };

  const placeholderText =
    language === 'en' ? 'Enter location' : 'Sláðu inn staðsetningu';

  return (
    <form onSubmit={handleAdd} className="form-group">
      <div className="search-bar-container">
        <input
          type="text"
          className="form-control"
          placeholder={placeholderText}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <label htmlFor="language-select"></label>
        <select
            id="language-select"
            className="form-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
        >
            <option value="en">English</option>
            <option value="is">Icelandic</option>
        </select>
      </div>
    </form>
  );
};

export default AddLocation;
