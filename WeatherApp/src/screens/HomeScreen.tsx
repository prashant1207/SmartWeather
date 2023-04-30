import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LocationPermission} from '@src/components/LocationPermission';
import {LocationWeather} from '@src/components/LocationWeather';
import {useAppLocation} from '@src/context/AppLocation';
import {City} from '@src/types/City';
import {StackParamList} from '@src/types/StackParamList';
import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

export function HomeScreen({}: NativeStackScreenProps<
  StackParamList,
  'Home'
>): JSX.Element {
  const [items, setItems] = React.useState<City[]>([]);
  const {authorized, location} = useAppLocation();

  const renderItem = ({item}: {item: City}) => (
    <LocationWeather city={item} onPress={() => {}} />
  );

  React.useEffect(() => {
    const cityList: City[] = [];

    if (location && typeof location !== 'string') {
      cityList.push({
        type: 'location',
        id: 'location',
        location: location,
      });
    }

    setItems(cityList);
  }, [authorized, location]);
  return (
    <View style={styles.container}>
      <LocationPermission authorized={authorized} />
      <FlatList testID="location-list" data={items} renderItem={renderItem} />
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
