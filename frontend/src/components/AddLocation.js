import React, { useState } from 'react';
import { fetchWeatherDataByLocation } from '../api';
import '../css/styles.css';

const AddLocation = ({ onAddLocation }) => {
  const [location, setLocation] = useState('');
  const [language, setLanguage] = useState('en');

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchWeatherDataByLocation(location);
      onAddLocation(data);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch weather data. Please try again.');
    }
  };

  const placeholderText =
    language === 'en' ? 'Enter location' : 'Staðsetning';

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
            <option value="is">Íslenska</option>
        </select>
      </div>
    </form>
  );
};

export default AddLocation;