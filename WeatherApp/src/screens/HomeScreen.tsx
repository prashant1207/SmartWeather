import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AddCityCard} from '@src/components/AddCityCard';
import {LocationPermission} from '@src/components/LocationPermission';
import {LocationWeather} from '@src/components/LocationWeather';
import {useAppLocation} from '@src/context/AppLocation';
import {useConfig} from '@src/context/ConfigContext';
import {City} from '@src/types/City';
import {StackParamList} from '@src/types/StackParamList';
import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
