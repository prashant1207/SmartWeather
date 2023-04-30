import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StackParamList} from '@src/types/StackParamList';
import HomeScreen from '@src/screens/HomeScreen';
import DetailScreen from '@src/screens/DetailScreen';
import {NavigationContainer} from '@react-navigation/native';
import {AppLocationProvider} from '@src/context/AppLocation';
import {QueryClient, QueryClientProvider} from 'react-query';
import {API_URL, API_KEY} from '@env';
import {initialize} from 'weather-service';
import {ConfigProvider} from '@src/context/ConfigContext';

initialize(API_KEY, API_URL);

const Stack = createNativeStackNavigator<StackParamList>();
const queryClient = new QueryClient();

function RootNavigation(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider>
        <AppLocationProvider>
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </AppLocationProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
