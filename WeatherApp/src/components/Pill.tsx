import {Colors} from '@src/styles/Colors';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

export function Pill({text}: {text: string}): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: Colors.containerBackground,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },
  text: {
    padding: 4,
    fontSize: 18,
    color: Colors.text,
    textAlign: 'center',
  },
});
