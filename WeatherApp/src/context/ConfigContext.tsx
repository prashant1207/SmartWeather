import React from 'react';
import {Config, Settings} from '@src/types/Config';

const ConfigContext = React.createContext<Config>({
  cities: [],
  settings: {
    unit: 'metric',
    temperatureUnit: '°C',
  },
  addCity: (_city: string) => {},
  removeCity: (_city: string) => {},
});

export function ConfigProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [cities, setCities] = React.useState<string[]>([]);
  const [config] = React.useState<Settings>({
    unit: 'metric',
    temperatureUnit: '°C',
  });

  function addCity(city: string) {
    city = city.toLowerCase();
    if (!cities.includes(city)) {
      const updatedCities = [...cities, city];
      setCities(updatedCities);
    }
  }

  function removeCity(city: string) {
    const updatedCities = cities.filter(c => c !== city.toLocaleLowerCase());
    setCities(updatedCities);
  }

  return (
    <ConfigContext.Provider
      value={{cities, settings: config, addCity, removeCity}}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig(): Config {
  return React.useContext(ConfigContext);
}
