import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
class Weather {
  constructor(
    public city: string,
    public date: string,
    public description: string,
    public temp: number,
    public humidity: number,
    public wind: number,
    public uvIndex: number
  ){}
}

// TODO: Complete the WeatherService class
// TODO: Define the baseURL, API key, and city name properties
class WeatherService {
  private baseURL = 'https://api.openweathermap.org/data/2.5/';
  private apiKey = process.env.WEATHER_API_KEY;
  private cityName = '';

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    const response = await fetch(query);
    return await response.json();
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    const { lat, lon } = locationData;
    return { lat, lon };
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.baseURL}weather?q=${this.cityName}&appid=${this.apiKey}`;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,hourly&appid=${this.apiKey}`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const query = this.buildGeocodeQuery();
    const locationData = await this.fetchLocationData(query);
    return this.destructureLocationData(locationData);
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const query = this.buildWeatherQuery(coordinates);
    return await this.fetchLocationData(query);
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    const { name, dt, weather, main, wind, uvIndex } = response;
    const { description } = weather[0];
    const { temp, humidity } = main;
    return new Weather(name, dt, description, temp, humidity, wind.speed, uvIndex);
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const forecastArray = [currentWeather];
    for (let i = 1; i < 6; i++) {
      const { dt, weather, main } = weatherData[i];
      const { description } = weather[0];
      const { temp, humidity } = main;
      forecastArray.push(new Weather(this.cityName, dt, description, temp, humidity, 0, 0));
    }
    return forecastArray;
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData.current);
    const forecastArray = this.buildForecastArray(currentWeather, weatherData.daily);
    return forecastArray;
  }
}

export default new WeatherService();
