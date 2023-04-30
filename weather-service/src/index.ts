import { Result, Weather, Unit } from "./types";

export { Result, Weather };

let weatherApi: string | undefined = undefined;
let weatherUrl: string | undefined = undefined;

export function initialize(api: string, url: string) {
  weatherApi = api;
  weatherUrl = url;
}

type WeatherUrlParams = (
  | {
      type: "city";
      city: string;
    }
  | {
      type: "coordinate";
      lat: number;
      lng: number;
    }
) & {
  unit: Unit;
};

export function getWeatherUrl(params: WeatherUrlParams): string {
  if (!weatherUrl || !weatherApi) {
    throw new Error("Weather Service is not initialized");
  }
  const { type, unit } = params;

  if (type === "coordinate") {
    const { lat, lng } = params;
    return `${weatherUrl}?lat=${lat}&lon=${lng}&units=${unit}&appid=${weatherApi}`;
  } else {
    const { city } = params;
    return `${weatherUrl}?q=${city}&units=${unit}&appid=${weatherApi}`;
  }
}
