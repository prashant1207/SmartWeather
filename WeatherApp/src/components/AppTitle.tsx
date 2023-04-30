import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

export function AppTitle(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.titleSubtle}>{'Smart'}</Text>
      <Text style={styles.titleBold}>{'Weather'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  titleSubtle: {
    fontSize: 18,
    fontWeight: '300',
    color: 'white',
  },
  titleBold: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
