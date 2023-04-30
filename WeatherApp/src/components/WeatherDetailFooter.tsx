import {useNavigation} from '@react-navigation/native';
import {useConfig} from '@src/context/ConfigContext';
import {getTranslation} from '@src/services/i18n';
import {City} from '@src/types/City';
import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';

const translations = getTranslation();

export function WeatherDetailFooter({city}: {city: City}): React.ReactElement {
  const {removeCity} = useConfig();
  const navigation = useNavigation();
  const removeHandler = () => {
    if (city.type === 'city') {
      removeCity(city.name);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{translations.weatherSource}</Text>
      {city.type === 'city' && (
        <TouchableOpacity style={styles.removeButton} onPress={removeHandler}>
          <Text style={styles.text}>{translations.removeCity}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  removeButton: {
    marginVertical: 8,
  },
  text: {
    textAlign: 'center',
    fontSize: 12,
  },
  row: {flexDirection: 'row', justifyContent: 'space-between'},
});
