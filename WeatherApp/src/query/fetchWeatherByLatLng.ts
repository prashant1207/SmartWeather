import {Location} from '@src/types/Location';
import {getWeatherByLatLng, Result, Unit} from 'weather-service';

export async function fetchWeatherByLatLng({
  location,
  unit,
}: {
  location: Location;
  unit?: Unit;
}): Promise<Result> {
  const {lat, lng} = location;
  if (!lat || !lng) {
    return {status: 'error', message: 'Invalid lat lng'};
  }

  return await getWeatherByLatLng(lat, lng, unit);
}
