import { generateApiUrl } from './utils/generateApiUrl';

const API_URL = generateApiUrl("/api/weather");

export const fetchWeatherDataByLocation = async (location) => {
  const response = await fetch(`${API_URL}/${location}`, { credentials: 'include' });

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  return await response.json();
};

export const fetchWeatherDataByCoordinates = async (lat, lon) => {
  const response = await fetch(`${API_URL}/lat/${lat}/lon/${lon}`, { credentials: 'include' });

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  return await response.json();
};