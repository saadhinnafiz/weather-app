# Weather App

A weather app built with React, TypeScript, and Vite using the OpenWeatherMap API.

## Features

- Automatic weather detection using browser geolocation
- Search weather by city name
- Displays current temperature, weather condition, and icon
- Shows humidity, wind speed, and feels like temperature
- 5-day forecast strip
- Error handling for invalid city names
- Loading state while fetching data
- Accessible with screen reader support

## Tech Stack

- React 19
- TypeScript
- Vite
- OpenWeatherMap API

## Getting Started

1. Clone the repo
2. Install dependencies:

```bash
npm install
```

3. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
4. Copy the example env file and add your key:

```bash
cp .env.example .env
```

Then open `.env` and set: VITE_WEATHER_API_KEY=your_key_here

5. Run the dev server:

```bash
npm run dev
```

## Icon Attribution

Weather icon and search icon by [Flaticon](https://www.flaticon.com)
