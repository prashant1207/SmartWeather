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

## OpenWeather API Key

- You need to add `.env` file at `SmartWeather/WeatherApp` with `API_KEY` and `API_URL` from [OpenWeatherMap](https://openweathermap.org/)

  ```shell
  API_KEY=<YOUR_API_KEY>
  API_URL=https://api.openweathermap.org/data/2.5/weather
  ```
  
## Development Checkpoints

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
- [x] Geolocation Authorization
  - Using `@react-native-community/geolocation`
  - Implemented a NativeModule to get location permission status.
- [x] Add weather-service
  - Added `react-native-dotenv` to store and read APIKey and APIUrl from `.env` file.
  - Used `react-query` to create query for fetch weather information with cache support.
- [x] Add support for custom city
  - Added ConfigContext which will hold the cities and other configurations such as Units.
  - Used `@react-native-async-storage/async-storage` for local storage and provide persistent storage.
- [x] Add react-query
- [x] Add Detox
  - Added dev dependency
  - `detox init`
  - Updated "AppName" in `.detoxrc.js`
  - Updated `testID`.
  - Added a base test in `/e2e/homescreen.test.js`
- [x] Implement Weather Information Screens
  - Added detail pages with smaller single responsibility components.
  - Design inspiration from https://dribbble.com/shots/20675054-Mobile-Weather-app
- [x] e2e Tests
  - Added e2e Tests for Home Page and Detail Page
  

## Screenshot
|   |   |   |
|---|---|---|
|![Home](screenshot/Home.png)| ![Home](screenshot/Home_2.png)  | ![Home](screenshot/Home_3.png)|

|   |   |
|---|---|
|![Home](screenshot/Detail.png)| ![Home](screenshot/Detail_2.png)  |