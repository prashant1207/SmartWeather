# Smart Weather

React Native App for showing weather information with following features:

1. Show weather information of current location.
2. Add cities as favorite to see weather information.
3. Settings to change the units between `metric` or `imperial`.
4. Localization based on system locale.
5. Detox for e2e testing.

## Structure

- I am planning to have a separate package for `weather-service` and `WeatherApp`.

- `weather-service`
  - Will provide APIs to get the weather information.
  - Have the types for `Weather` object.
  - Can be maintained and update separately from the actual WeatherApp.

- `WeatherApp`
  - React Native App for showing weather information.

## Checkpoint

### weather-service package

- [x] Setup package
- [x] Implement function to initialize and construct weatherUrl
- [x] Implement function for getWeatherByCity with UTs
- [x] Implement function for getWeatherByLatLng with UTs

### WeatherApp

- [x] Create React Native WeatherApp
  - Have to use react-native 0.70.0 to have support for Detox, refer https://wix.github.io/Detox/docs/introduction/getting-started/
  - React Native typescript template version based on: https://github.com/react-native-community/react-native-template-typescript
  - `npx react-native@0.70.7 init WeatherApp --template react-native-template-typescript@6.12.10`
- [x] Add react-navigation
  - Path `@src` notation using `babel-plugin-module-resolver` to avoid using relative paths.
  - Setup Stack Navigation at `App.tsx`.
  - Implemented basic navigation between `HomeScreen` and `DetailScreen`.
- [ ] Add weather-service
- [ ] Add react-query
- [ ] Add Detox
- [ ] Implement Weather Information Screens [TBD]