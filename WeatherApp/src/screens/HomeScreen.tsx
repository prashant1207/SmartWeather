import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '@src/types/StackParamList';
import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

export function HomeScreen({
  navigation,
}: NativeStackScreenProps<StackParamList, 'Home'>): JSX.Element {
  return (
    <View style={styles.container}>
      <Text testID="title-text" style={styles.title}>
        Welcome to SmartWeather!
      </Text>
      <Text style={styles.subtitle}>Get latest weather information</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
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
