// src/app.ts
import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const apiKey:string = '3b1f7bf823d53fd03160341d195612f9';
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files
app.use(express.urlencoded({extended:true}));

// Interface for weather response data
interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
  };
}

// Route to render the main page with default values
app.get('/', (req: Request, res: Response) => {
  res.render('index', { weather: null, error: null });
});
// Route to fetch weather data
app.post('/get-weather', async (req: Request, res: Response) => {
  const city = req.body.city;
  try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const weather = response.data;
      res.render('index', { weather, error: null });
  } catch (error) {
      console.error(error);
      res.render('index', { weather: null, error: 'Error fetching weather data' });
  }
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
