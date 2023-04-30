import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StackParamList} from '@src/types/StackParamList';
import HomeScreen from '@src/screens/HomeScreen';
import DetailScreen from '@src/screens/DetailScreen';
import {NavigationContainer} from '@react-navigation/native';
import {AppLocationProvider} from '@src/context/AppLocation';

const Stack = createNativeStackNavigator<StackParamList>();

function RootNavigation(): React.ReactElement {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}

function App(): JSX.Element {
  return (
    <AppLocationProvider>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </AppLocationProvider>
  );
}

export default App;
