import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import Forecast from "./components/Forecast";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export default function App() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchByCoords(lat: number, lon: number) {
    setLoading(true);
    try {
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
      setError(null);
    } catch {
      setError("Failed to fetch weather. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(city: string) {
    setLoading(true);
    setError(null);
    try {
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

      if (weatherData.cod !== 200) {
        setError("City not found. Please try again.");
        setWeatherData(null);
        setForecastData(null);
        return;
      }

      setError(null);
      setWeatherData(weatherData);
      setForecastData(forecastData);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchByCoords(latitude, longitude);
      },
      () => {
        // user denied location — do nothing, wait for manual search
      },
    );
  }, []);

  return (
    <main className="app-container" aria-label="Weather application">
      <SearchBar onSearch={handleSearch} />

      {/* Status announcements for screen readers */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {loading && "Loading weather data..."}
        {error && error}
        {weatherData && `Weather loaded for ${weatherData.name}`}
      </div>

      {loading && (
        <p className="loading-message" role="status">
          Fetching weather...
        </p>
      )}

      {error && (
        <p className="error-message" role="alert" aria-live="assertive">
          {error}
        </p>
      )}

      {!loading && weatherData && <WeatherDisplay data={weatherData} />}
      {!loading && forecastData && <Forecast data={forecastData} />}
    </main>
  );
}
