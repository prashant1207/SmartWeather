export type Settings = {
  unit: 'metric' | 'imperial';
};

export type Config = {
  cities: string[];
  settings: Settings;
  addCity: (city: string) => void;
  removeCity: (city: string) => void;
};
