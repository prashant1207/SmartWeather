import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LocationPermission} from '@src/components/LocationPermission';
import {StackParamList} from '@src/types/StackParamList';
import React from 'react';
import {View, StyleSheet, Button} from 'react-native';

export function HomeScreen({
  navigation,
}: NativeStackScreenProps<StackParamList, 'Home'>): JSX.Element {
  return (
    <View style={styles.container}>
      <LocationPermission authorized={false} />
      <Button
        title="Go to Detail"
        onPress={() => {
          navigation.navigate('Detail');
        }}
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
