import {useConfig} from '@src/context/ConfigContext';
import {Colors} from '@src/styles/Colors';
import React from 'react';
import {Text, View, Switch, StyleSheet} from 'react-native';

export function UnitSwitcher(): JSX.Element {
  const {settings, updateSetting} = useConfig();
  const [isEnabled, setIsEnabled] = React.useState(settings.unit === 'metric');

  const toggleSwitch = () => {
    if (settings.unit === 'metric') {
      updateSetting({unit: 'imperial', temperatureUnit: '°F'});
    } else {
      updateSetting({unit: 'metric', temperatureUnit: '°C'});
    }
  };

  React.useEffect(() => {
    setIsEnabled(settings.unit === 'metric');
  }, [settings]);

  return (
    <View style={styles.switchContainer}>
      <Text style={styles.switchText}>{settings.unit}</Text>
      <Switch
        testID="unit-switch"
        trackColor={{
          false: Colors.containerBackground,
          true: Colors.containerBackground,
        }}
        thumbColor={Colors.secondary}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
    backgroundColor: '#BB86FC',
  },
  switchText: {
    fontSize: 16,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
});
