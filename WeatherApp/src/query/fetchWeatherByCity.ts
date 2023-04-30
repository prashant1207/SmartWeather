import {getWeatherByCityName, Result, Unit} from 'weather-service';

export async function fetchWeatherByCity({
  cityName,
  unit,
}: {
  cityName: string;
  unit?: Unit;
}): Promise<Result> {
  if (cityName === undefined || cityName === '') {
    return {status: 'error', message: 'Invalid city name'};
  }

  return await getWeatherByCityName(cityName, unit);
}
