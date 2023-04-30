import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '@src/types/StackParamList';
import React from 'react';
import {View, Text} from 'react-native';

export function DetailScreen({
  route,
}: NativeStackScreenProps<StackParamList, 'Detail'>): JSX.Element {
  const {weather, city} = route.params;
  return (
    <View>
      <Text>{weather.name}</Text>
      <Text>{city.type}</Text>
    </View>
  );
}

export default DetailScreen;
