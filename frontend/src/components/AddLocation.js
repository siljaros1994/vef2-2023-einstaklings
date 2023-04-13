import React, { useState } from 'react';
import { generateApiUrl } from '../utils/generateApiUrl';
import '../css/styles.css';

const AddLocation = ({ onAddLocation }) => {
  const [location, setLocation] = useState('');
  const [language, setLanguage] = useState('en');

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const url = generateApiUrl(`api/weather/${location}`);
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
  
      // Log response headers and content-type
      console.log('Response headers:', response.headers);
      console.log('Response content-type:', response.headers.get("content-type"));
  
      if (response.headers.get("content-type") !== "application/json") {
        throw new Error("Response is not JSON");
      }
  
      const data = await response.json();
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
