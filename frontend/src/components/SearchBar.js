import React, { useState } from 'react';
import '../css/styles.css';

const SearchBar = ({ onWeatherData }) => {
  const [location, setLocation] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();

    const API_KEY = "f5fec0946bc550184dec442698c35d67";
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric&lang=is`);
    const data = await response.json();

    onWeatherData(data);
  };

  return (
    <form className="form-inline justify-content-center" onSubmit={handleSearch}>
      <input
        type="text"
        className="form-control mr-2"
        placeholder="Sláðu inn staðsetningu"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">
        Leita
      </button>
    </form>
  );
};

export default SearchBar;