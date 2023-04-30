import {Colors} from '@src/styles/Colors';
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

export type InfoBlockProp = {
  text: string;
  value: string | number;
  description: string;
};

export function InfoBlock({model}: {model: InfoBlockProp}): React.ReactElement {
  const {text, value, description} = model;
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    marginHorizontal: 16,
    backgroundColor: Colors.containerBackground,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  description: {
    paddingTop: 4,
    fontSize: 12,
    color: Colors.text,
  },
  row: {flexDirection: 'row', justifyContent: 'space-between'},
});
