import "./WeatherDisplay.css";

type WeatherDisplayProps = {
  data: any;
};

export default function WeatherDisplay(props: WeatherDisplayProps) {
  const iconUrl = `https://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`;

  return (
    <div className="weather-display">
      <div className="weather-location">
        <h2 className="weather-city">{props.data.name}</h2>
        <p className="weather-country">{props.data.sys.country}</p>
      </div>

      <div className="weather-main">
        <img
          src={iconUrl}
          alt={props.data.weather[0].description}
          className="weather-icon"
        />
        <h3 className="weather-temp">{Math.round(props.data.main.temp)}°C</h3>
        <p className="weather-condition">{props.data.weather[0].description}</p>
      </div>

      <div className="weather-stats">
        <div className="stat-card">
          <p className="stat-value">{props.data.main.humidity}%</p>
          <p className="stat-label">Humidity</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">{Math.round(props.data.wind.speed)} km/h</p>
          <p className="stat-label">Wind</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">
            {Math.round(props.data.main.feels_like)}°C
          </p>
          <p className="stat-label">Feels Like</p>
        </div>
      </div>
    </div>
  );
}
