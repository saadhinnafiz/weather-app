import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import Forecast from "./components/Forecast";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export default function App() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any>(null);

  async function fetchByCoords(lat: number, lon: number) {
    const [weatherRes, forecastRes] = await Promise.all([
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
      ),
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
      ),
    ]);

    const weatherData = await weatherRes.json();
    const forecastData = await forecastRes.json();

    setWeatherData(weatherData);
    setForecastData(forecastData);
  }

  async function handleSearch(city: string) {
    const [weatherRes, forecastRes] = await Promise.all([
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
      ),
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`,
      ),
    ]);

    const weatherData = await weatherRes.json();
    const forecastData = await forecastRes.json();

    setWeatherData(weatherData);
    setForecastData(forecastData);
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
      {forecastData && <Forecast data={forecastData} />}
    </>
  );
}
