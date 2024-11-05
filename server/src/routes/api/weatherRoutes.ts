import { Router, type Request, type Response } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const router = Router();

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req: Request, res: Response) => {
  const { city } = req.body.city;
  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }
  // TODO: GET weather data from city name
  const weather = WeatherService.getWeatherForCity(city);
  // TODO: save city to search history
  HistoryService.addCity(city);
  return res.json(weather);
});

// TODO: GET search history
router.get('/history', (_, res) => {
  const cities = HistoryService.getCities();
  return res.json(cities);
});
// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  HistoryService.removeCity(id);
  return res.json({ message: 'City removed' });
});

export default router;
