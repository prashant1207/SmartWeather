import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {InfoBlock, InfoBlockProp} from '@src/components/InfoBlock';
import {WeatherDetailFooter} from '@src/components/WeatherDetailFooter';
import {Colors} from '@src/styles/Colors';
import {StackParamList} from '@src/types/StackParamList';
import {makeInfoBlocks} from '@src/utils/utils';
import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

export function DetailScreen({
  route,
}: NativeStackScreenProps<StackParamList, 'Detail'>): JSX.Element {
  const {weather, city} = route.params;
  const data = makeInfoBlocks(weather);
  const renderItem = ({item}: {item: InfoBlockProp}) => (
    <InfoBlock model={item} />
  );

  const renderFooter = () => <WeatherDetailFooter city={city} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: Colors.secondary,
  },
});

export default DetailScreen;
