import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

export function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Weather App</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
