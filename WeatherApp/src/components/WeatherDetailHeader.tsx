import {useConfig} from '@src/context/ConfigContext';
import {getTranslation} from '@src/services/i18n';
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Weather} from 'weather-service';
import {Pill} from './Pill';
import {HeaderInfo} from './HeaderInfo';
import {timeFromUnixTimestamp} from '@src/utils/utils';

const translations = getTranslation();

export function WeatherDetailHeader({
  weather,
}: {
  weather: Weather;
}): JSX.Element {
  const {settings} = useConfig();
  const sunriseTime = timeFromUnixTimestamp(
    weather.sys.sunrise,
  ).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const sunsetTime = timeFromUnixTimestamp(
    weather.sys.sunset,
  ).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  return (
    <View style={styles.container}>
      <Pill text={`${weather.name}, ${weather.sys.country}`} />
      <View style={styles.center}>
        <Text style={styles.tempText}>
          {Math.round(weather.main.temp)}
          {settings.temperatureUnit}
        </Text>
      </View>
      <View style={styles.info}>
        <HeaderInfo title={translations.sunset} text={sunriseTime} />
        <HeaderInfo title={translations.sunrise} text={sunsetTime} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {flexDirection: 'row', justifyContent: 'center'},
  tempText: {
    fontSize: 72,
    fontWeight: '600',
  },
  subtitle: {
    padding: 4,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});
