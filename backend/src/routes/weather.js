import express from "express";
import axios from "axios";
//import fetch from 'node-fetch';

const router = express.Router();

//const API_KEY = "f5fec0946bc550184dec442698c35d67";
const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

router.get('/:location', async (req, res) => {
  const { location } = req.params;
  try {
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`);
      res.json(weatherResponse.data);
  } catch (error) {
      console.error('Error in weather.js router:', error.message);
      console.error('Error details:', error);
      res.status(500).json({ error: 'Villa við að sækja veðurupplýsingar' });
  }
});

router.get('/lat/:lat/lon/:lon', async (req, res) => {
  const { lat, lon } = req.params;
  try {
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      res.json(weatherResponse.data);
  } catch (error) {
      console.error('Error in weather.js router:', error.message);
      console.error('Error details:', error);
      res.status(500).json({ error: 'Villa við að sækja veðurupplýsingar' });
  }
});

export default router;
