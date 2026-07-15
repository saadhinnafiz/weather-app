import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export default function App() {
  const [weatherData, setWeatherData] = useState<any>(null);

  async function fetchByCoords(lat: number, lon: number) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
    );
    const data = await response.json();
    setWeatherData(data);
  }

  async function handleSearch(city: string) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
    );
    const data = await response.json();
    setWeatherData(data);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      fetchByCoords(latitude, longitude);
    });
  }, []);

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {weatherData && <WeatherDisplay data={weatherData} />}
    </>
  );
}
