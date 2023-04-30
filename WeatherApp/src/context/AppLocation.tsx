import {Location} from '@src/types/Location';
import React from 'react';
import Geolocation from '@react-native-community/geolocation';
import {NativeModules} from 'react-native';

type AppLocation = {
  authorized: boolean;
  location?: Location;
  error?: string;
  refresh: () => void;
};

export const AppLocationContext = React.createContext<AppLocation>({
  authorized: false,
  refresh: () => {},
});

export function AppLocationProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [authorized, setAuthorized] = React.useState<boolean>(false);
  const [location, setLocation] = React.useState<Location | undefined>();
  const [error, setError] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    initialize();
  }, []);

  React.useEffect(() => {
    if (authorized) {
      Geolocation.getCurrentPosition(
        position => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        err => {
          setError(err.message);
        },
      );
    }
  }, [authorized]);

  function refresh() {
    console.log('called refresh');
    initialize();
  }

  function initialize() {
    const {NativeHelper} = NativeModules;
    if (NativeHelper) {
      NativeHelper.isLocationAuthorized((status: boolean) => {
        setAuthorized(status);
      });
    }
  }

  return (
    <AppLocationContext.Provider value={{authorized, location, refresh, error}}>
      {children}
    </AppLocationContext.Provider>
  );
}

export function useAppLocation(): AppLocation {
  return React.useContext(AppLocationContext);
}
