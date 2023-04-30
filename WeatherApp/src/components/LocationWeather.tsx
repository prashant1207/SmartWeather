import {useConfig} from '@src/context/ConfigContext';
import {fetchWeatherByCity} from '@src/query/fetchWeatherByCity';
import {fetchWeatherByLatLng} from '@src/query/fetchWeatherByLatLng';
import {getTranslation} from '@src/services/i18n';
import {Colors} from '@src/styles/Colors';
import {City} from '@src/types/City';
import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useQuery} from 'react-query';
import {Weather} from 'weather-service/src/types';

const translations = getTranslation();

export function LocationWeather({
  city,
  onPress,
}: {
  city: City;
  onPress: (weather: Weather, city: City) => void;
}): React.ReactElement {
  const {removeCity, settings} = useConfig();
  const {unit, temperatureUnit} = settings;

  const resolver =
    city.type === 'city'
      ? () => fetchWeatherByCity({cityName: city.name, unit})
      : () => fetchWeatherByLatLng({location: city.location, unit});

  const {data: result, isLoading} = useQuery(
    ['city', city.id, 'metric'],
    resolver,
  );

  const handler = React.useCallback(() => {
    if (result && result.status === 'success') {
      onPress(result.data, city);
    }
  }, [onPress, result, city]);

  const removeHandler = React.useCallback(() => {
    if (city.type === 'city') {
      removeCity(city.name);
    }
  }, [removeCity, city]);

  if (result && result.status === 'success') {
    const {data} = result;
    const weather = data.weather.length > 0 ? data.weather[0] : null;
    return (
      <TouchableOpacity style={styles.container} onPress={handler}>
        <CityText city={city} />
        <View>
          <Text style={styles.temperatureText}>
            {Math.round(data.main.temp)}
            {temperatureUnit}
          </Text>
          {weather && <Text style={styles.subtext}>{weather.main}</Text>}
        </View>
      </TouchableOpacity>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <CityText city={city} />
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CityText city={city} />
      <View>
        <Text>{translations.error}</Text>
        <TouchableOpacity style={styles.removeButton} onPress={removeHandler}>
          <Text style={styles.removeText}>{translations.remove}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function CityText({city}: {city: City}) {
  return (
    <Text style={styles.cityText}>
      {city.type === 'city' ? city.name : translations.myLocation}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: Colors.containerBackground,
  },
  removeButton: {
    marginVertical: 4,
  },
  removeText: {
    color: 'red',
  },
  cityText: {
    textTransform: 'capitalize',
    color: Colors.text,
    fontWeight: '300',
  },
  temperatureText: {
    textAlign: 'right',
    color: Colors.text,
    fontWeight: 'bold',
  },
  subtext: {
    textAlign: 'right',
    color: Colors.text,
    fontSize: 12,
    fontWeight: '300',
  },
});
