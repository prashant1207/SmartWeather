import {Colors} from '@src/styles/Colors';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

export function HeaderInfo({
  text,
  title,
}: {
  text: string;
  title: string;
}): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignSelf: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    margin: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginRight: 8,
  },
});
