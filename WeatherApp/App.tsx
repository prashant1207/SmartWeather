import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StackParamList} from '@src/types/StackParamList';
import HomeScreen from '@src/screens/HomeScreen';
import DetailScreen from '@src/screens/DetailScreen';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {AppLocationProvider} from '@src/context/AppLocation';
import {QueryClient, QueryClientProvider} from 'react-query';
import {API_URL, API_KEY} from '@env';
import {initialize} from 'weather-service';
import {ConfigProvider} from '@src/context/ConfigContext';
import {AppTitle} from '@src/components/AppTitle';

initialize(API_KEY, API_URL);

const Stack = createNativeStackNavigator<StackParamList>();
const queryClient = new QueryClient();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(0, 0, 0)',
  },
};

const options = {
  headerShown: true,
  headerTransparent: true,
  headerBackTitleVisible: false,
  headerTitle: '',
};

function RootNavigation(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        options={{
          ...options,
          headerTitle: () => <AppTitle />,
        }}
        component={HomeScreen}
      />
      <Stack.Screen name="Detail" options={options} component={DetailScreen} />
    </Stack.Navigator>
  );
}

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider>
        <AppLocationProvider>
          <NavigationContainer theme={theme}>
            <RootNavigation />
          </NavigationContainer>
        </AppLocationProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
