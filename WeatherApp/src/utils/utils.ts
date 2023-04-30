import {InfoBlockProp} from '@src/components/InfoBlock';
import {getTranslation} from '@src/services/i18n';
import {Weather} from 'weather-service';

const translations = getTranslation();
export const cityRegex =
  /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;

export function makeInfoBlocks(
  weather: Weather,
  temperatureUnit: string,
): InfoBlockProp[] {
  const {main} = weather;
  const result: InfoBlockProp[] = [
    {
      text: translations.feelsLike,
      value: `${Math.round(main.feels_like)}${temperatureUnit}`,
      description: translations.feelsLikeTemperature,
    },
    {
      text: translations.min,
      value: `${Math.round(main.temp_min)}${temperatureUnit}`,
      description: translations.minTemperature,
    },
    {
      text: translations.max,
      value: `${Math.round(main.temp_max)}${temperatureUnit}`,
      description: translations.maxTemperature,
    },
    {
      text: translations.pressure,
      value: main.pressure,
      description: translations.pressure,
    },
    {
      text: translations.humidity,
      value: main.humidity,
      description: translations.humidity,
    },
    {
      text: translations.windSpeed,
      value: weather.wind.speed,
      description: translations.windSpeedDesc,
    },
  ];
  return result;
}

export function timeFromUnixTimestamp(timestamp: number): Date {
  const date = new Date(timestamp * 1000);
  return date;
}
