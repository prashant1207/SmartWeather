import Geolocation from '@react-native-community/geolocation';
import {useAppLocation} from '@src/context/AppLocation';
import {getTranslation} from '@src/services/i18n';
import {Colors} from '@src/styles/Colors';
import React from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';

const translations = getTranslation();
export function LocationPermission({
  authorized,
}: {
  authorized: boolean;
}): JSX.Element | null {
  const [errorText, setErrorText] = React.useState<string | undefined>(
    undefined,
  );
  const {refresh, location} = useAppLocation();
  const onPress = React.useCallback(() => {
    Geolocation.requestAuthorization(
      refresh,
      ({code, message, PERMISSION_DENIED, POSITION_UNAVAILABLE, TIMEOUT}) => {
        console.log(
          code,
          message,
          PERMISSION_DENIED,
          POSITION_UNAVAILABLE,
          TIMEOUT,
        );

        setErrorText(message);
      },
    );
  }, [refresh]);

  if (authorized) {
    return null;
  }

  if (errorText) {
    return (
      <View testID="location-permission" style={styles.container}>
        <Text style={styles.errorText}>
          {errorText} {'\n'} {translations.gotoSettingsToEnableLocation}
        </Text>
      </View>
    );
  }

  if (location) {
    return (
      <View testID="location-permission" style={styles.container}>
        <Text style={styles.text}>
          {location.lat} {location.lng}
        </Text>
      </View>
    );
  }

  return (
    <View testID="location-permission" style={styles.container}>
      <Text style={styles.text}>{translations.authorizeLocation}</Text>
      <Button
        testID="location-permission-button"
        title={errorText ? translations.retry : translations.authorize}
        onPress={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 16,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    marginHorizontal: 16,
    backgroundColor: Colors.containerBackground,
  },
  text: {
    textAlign: 'center',
    color: Colors.text,
  },
  errorText: {
    paddingVertical: 8,
    textAlign: 'center',
    color: 'red',
  },
});
