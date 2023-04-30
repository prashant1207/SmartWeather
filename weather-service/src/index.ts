import { Result, Weather, Unit } from "./types";

let weatherApi: string | undefined = undefined;
let weatherUrl: string | undefined = undefined;

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

export { Result, Weather, Unit };
export function initialize(api: string, url: string) {
  weatherApi = api;
  weatherUrl = url;
}

export function getWeatherUrl(params: WeatherUrlParams): string | Result {
  if (!weatherUrl || !weatherApi) {
    return {
      status: "error",
      message: "Weather service is not initialized",
    };
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

export async function getWeatherByCityName(
  cityName: string,
  unit: Unit = "metric"
): Promise<Result> {
  const result = getWeatherUrl({
    type: "city",
    city: cityName,
    unit,
  });

  if (typeof result !== "string") {
    return result;
  }

  return fetchWeather(result);
}

export async function getWeatherByLatLng(
  lat: number,
  lng: number,
  unit: Unit = "metric"
): Promise<Result> {
  const result = getWeatherUrl({
    type: "coordinate",
    lat,
    lng,
    unit,
  });

  if (typeof result !== "string") {
    return result;
  }

  return fetchWeather(result);
}

async function fetchWeather(requestUrl: string): Promise<Result> {
  let result: Result = { status: "loading" };
  try {
    const response = await fetch(requestUrl);
    if (!response.ok) {
      return {
        status: "error",
        message: `Service error: ${response.status} ${response.statusText}`,
      };
    }

    const data = (await response.json()) as Weather;
    result = { status: "success", data };
  } catch (error) {
    result = { status: "error", message: "Service error" };
  }

  return result;
}
