import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {InfoBlock, InfoBlockProp} from '@src/components/InfoBlock';
import {WeatherDetailFooter} from '@src/components/WeatherDetailFooter';
import {WeatherDetailHeader} from '@src/components/WeatherDetailHeader';
import {useConfig} from '@src/context/ConfigContext';
import {Colors} from '@src/styles/Colors';
import {StackParamList} from '@src/types/StackParamList';
import {makeInfoBlocks} from '@src/utils/utils';
import React from 'react';
import {FlatList, StyleSheet, SafeAreaView} from 'react-native';

export function DetailScreen({
  route,
}: NativeStackScreenProps<StackParamList, 'Detail'>): JSX.Element {
  const {weather, city} = route.params;
  const {temperatureUnit} = useConfig().settings;
  const data = makeInfoBlocks(weather, temperatureUnit);
  const renderItem = ({item}: {item: InfoBlockProp}) => (
    <InfoBlock model={item} />
  );

  const renderFooter = () => <WeatherDetailFooter city={city} />;
  const renderHeader = () => <WeatherDetailHeader weather={weather} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        ListHeaderComponent={renderHeader}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
});

export default DetailScreen;
