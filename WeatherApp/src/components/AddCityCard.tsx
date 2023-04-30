import {useConfig} from '@src/context/ConfigContext';
import {getTranslation} from '@src/services/i18n';
import {Colors} from '@src/styles/Colors';
import {cityRegex} from '@src/utils/utils';
import React from 'react';
import {Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';

const translations = getTranslation();
export function AddCityCard(): JSX.Element {
  const {addCity} = useConfig();
  const onPressHandler = React.useCallback(() => {
    Alert.prompt(
      translations.cityName,
      translations.addCityDesc,
      text => {
        if (cityRegex.test(text)) {
          addCity(text);
        } else {
          Alert.alert('Error', 'Failed to validated city name');
        }
      },
      'plain-text',
    );
  }, [addCity]);
  return (
    <TouchableOpacity
      testID="add-city-button"
      style={styles.container}
      onPress={onPressHandler}>
      <Text style={styles.text}>{translations.addCity}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 16,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  text: {
    textAlign: 'center',
    color: Colors.text,
  },
});
