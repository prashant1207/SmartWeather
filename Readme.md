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
