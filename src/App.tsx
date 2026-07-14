import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export default function App() {
  const [weatherData, setWeatherData] = useState<any>(null);

  async function handleSearch(city: string) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
    );
    const data = await response.json();
    setWeatherData(data);
    console.log(data);
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {weatherData && <WeatherDisplay data={weatherData} />}
    </>
  );
}
