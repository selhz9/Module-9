// TODO: Define a City class with name and id properties
import fs from 'fs';
import path from 'path';

interface City {
  id: number;
  name: string;
}

// TODO: Complete the HistoryService class
class HistoryService {
  private filePath = path.join(__dirname, '../db/searchHistory.json');
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data);
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    fs.writeFileSync(this.filePath, JSON.stringify(cities));
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    const cities = await this.read();
    return cities;
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    const cities = await this.read();
    const newCity = { id: cities.length + 1, name: city };
    cities.push(newCity);
    await this.write(cities);
    return newCity;
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    const cities = await this.read();
    const newCities = cities.filter((city: City) => city.id !== parseInt(id));
    await this.write(newCities);
  }
}

export default new HistoryService();
