# weather-service

This package provides service to fetch weather information.

## Installation

You can install the package using yarn:

```shell
yarn add weather-service
```

## Usage

To use weather-service, first initialize the package with APIKey and Url:

```typescript
import { initialize } from "weather-service";

initialize(API_KEY, API_URL);
```

after the initialization, you can use following APIs to get weather information:

## API

### `getWeatherByCityName`

Fetches weather information by city name.

```typescript
const result = await getWeatherByCityName("London");
```

### `getWeatherByLatLng`

Fetches weather by Lat and Lng

```typescript
const result = await getWeatherByLatLng(51.5074, 0.1278);
```

### Units

You can also provide preferred unit in the optional parameter for the same API.

- Metric Units

```typescript
const result = await getWeatherByCityName("London", "metric")
```

- Imperial Units

```typescript
const result = await getWeatherByCityName("London", "imperial")
```

### Types

This package also export the types for `Weather` and `Result`

- Result:

```typescript
export type Result =
  | {
      status: "error";
      message: string;
    }
  | {
      status: "success";
      data: Weather;
    };
```

- Weather

```typescript

export type Weather = {
  coord: Coord;
  weather: WeatherElement[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type Clouds = {
  all: number;
};

export type Coord = {
  lon: number;
  lat: number;
};

export type Main = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
};

export type Sys = {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
};

export type WeatherElement = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type Wind = {
  speed: number;
  deg: number;
  gust: number;
};

```