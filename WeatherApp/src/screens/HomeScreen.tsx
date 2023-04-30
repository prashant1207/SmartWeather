import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AddCityCard} from '@src/components/AddCityCard';
import {LocationPermission} from '@src/components/LocationPermission';
import {LocationWeather} from '@src/components/LocationWeather';
import {useAppLocation} from '@src/context/AppLocation';
import {useConfig} from '@src/context/ConfigContext';
import {City} from '@src/types/City';
import {StackParamList} from '@src/types/StackParamList';
import React from 'react';
import {Text, View, StyleSheet, Switch, FlatList} from 'react-native';
import {Weather} from 'weather-service';

export function HomeScreen({
  navigation,
}: NativeStackScreenProps<StackParamList, 'Home'>): JSX.Element {
  const [items, setItems] = React.useState<City[]>([]);
  const {cities} = useConfig();
  const {authorized, location} = useAppLocation();

  const onPress = (weather: Weather, city: City) =>
    navigation.navigate('Detail', {
      weather,
      city: city,
    });

  const renderItem = ({item}: {item: City}) => (
    <LocationWeather city={item} onPress={onPress} />
  );

  const renderFooter = () => <AddCityCard />;

  React.useEffect(() => {
    const cityList: City[] = cities.map(item => {
      return {
        type: 'city',
        name: item,
        id: item,
      };
    });

    if (location && typeof location !== 'string') {
      cityList.push({
        type: 'location',
        id: 'location',
        location: location,
      });
    }

    setItems(cityList);
  }, [authorized, location, cities]);
  return (
    <View style={styles.container}>
      <UnitSwitcher />
      <LocationPermission authorized={authorized} />
      <FlatList
        testID="location-list"
        data={items}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}

function UnitSwitcher(): JSX.Element {
  const {settings, updateSetting} = useConfig();
  const [isEnabled, setIsEnabled] = React.useState(settings.unit === 'metric');

  const toggleSwitch = () => {
    if (settings.unit === 'metric') {
      setIsEnabled(false);
      updateSetting({unit: 'imperial', temperatureUnit: '°F'});
    } else {
      setIsEnabled(true);
      updateSetting({unit: 'metric', temperatureUnit: '°C'});
    }
  };
  return (
    <View style={styles.switchContainer}>
      <Text style={styles.switchText}>{settings.unit}</Text>
      <Switch
        testID="unit-switch"
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
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
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default HomeScreen;
