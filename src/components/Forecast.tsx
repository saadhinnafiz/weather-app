import "./Forecast.css";

type ForecastProps = {
  data: any;
};

export default function Forecast(props: ForecastProps) {
  const dailyForecast = props.data.list.filter((item: any) =>
    item.dt_txt.includes("12:00:00"),
  );

  const forecastElements = dailyForecast.map((item: any) => {
    const dayName = new Date(item.dt_txt).toLocaleDateString("en-US", {
      weekday: "short",
    });

    return (
      <div key={item.dt} className="forecast-card">
        <p className="forecast-day">{dayName}</p>
        <img
          src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
          alt={item.weather[0].description}
          className="forecast-icon"
        />
        <p className="forecast-temp">{Math.round(item.main.temp)}°C</p>
      </div>
    );
  });

  return (
    <div className="forecast">
      <p className="forecast-title">5-DAY FORECAST</p>
      <div className="forecast-list">{forecastElements}</div>
    </div>
  );
}
