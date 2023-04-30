export type Settings = {
  unit: 'metric' | 'imperial';
  temperatureUnit: '°C' | '°F';
};

export type Config = {
  cities: string[];
  settings: Settings;
  addCity: (city: string) => void;
  removeCity: (city: string) => void;
  updateSetting: (settings: Settings) => void;
};
