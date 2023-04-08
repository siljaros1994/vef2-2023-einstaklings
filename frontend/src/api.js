//const API_KEY = 'f5fec0946bc550184dec442698c35d67';

const API_URL = "http://localhost:3001/api/weather";

export const fetchWeatherDataByLocation = async (location) => {
  const response = await fetch(`${API_URL}/${location}`);

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  return await response.json();
};

export const fetchWeatherDataByCoordinates = async (lat, lon) => {
  const response = await fetch(`${API_URL}/lat/${lat}/lon/${lon}`);

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  return await response.json();
};