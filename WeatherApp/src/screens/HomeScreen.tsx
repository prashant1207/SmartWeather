import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AddCityCard} from '@src/components/AddCityCard';
import {LocationPermission} from '@src/components/LocationPermission';
import {LocationWeather} from '@src/components/LocationWeather';
import {UnitSwitcher} from '@src/components/UnitSwitcher';
import {useAppLocation} from '@src/context/AppLocation';
import {useConfig} from '@src/context/ConfigContext';
import {Colors} from '@src/styles/Colors';
import {City} from '@src/types/City';
import {StackParamList} from '@src/types/StackParamList';
import React from 'react';
import {StyleSheet, FlatList, SafeAreaView} from 'react-native';
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
    <SafeAreaView style={styles.container}>
      <UnitSwitcher />
      <LocationPermission authorized={authorized} />
      <FlatList
        testID="location-list"
        data={items}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
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
    backgroundColor: Colors.primary,
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
