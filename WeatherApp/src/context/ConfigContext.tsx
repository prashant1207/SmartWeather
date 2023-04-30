import React from 'react';
import {getCities, storeCities} from '@src/services/storage';
import {Config, Settings} from '@src/types/Config';

const ConfigContext = React.createContext<Config>({
  cities: [],
  settings: {
    unit: 'metric',
    temperatureUnit: '°C',
  },
  addCity: (_city: string) => {},
  removeCity: (_city: string) => {},
  updateSetting: (_settings: Settings) => {},
});

export function ConfigProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [cities, setCities] = React.useState<string[]>([]);
  const [config, setConfig] = React.useState<Settings>({
    unit: 'metric',
    temperatureUnit: '°C',
  });

  React.useEffect(() => {
    initialize();
  }, []);

  async function initialize() {
    const storedCities = await getCities();
    if (storedCities) {
      setCities(storedCities);
    }
  }

  function addCity(city: string) {
    city = city.toLowerCase();
    if (!cities.includes(city)) {
      const updatedCities = [...cities, city];
      setCities(updatedCities);
      storeCities(updatedCities);
    }
  }

  function removeCity(city: string) {
    const updatedCities = cities.filter(c => c !== city.toLocaleLowerCase());
    setCities(updatedCities);
    storeCities(updatedCities);
  }

  function updateSetting(settings: Settings) {
    setConfig(settings);
  }

  return (
    <ConfigContext.Provider
      value={{cities, settings: config, addCity, removeCity, updateSetting}}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig(): Config {
  return React.useContext(ConfigContext);
}
