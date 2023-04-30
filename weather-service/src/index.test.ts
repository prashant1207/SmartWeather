import exp from "constants";
import { initialize, getWeatherUrl } from ".";

const mockWeatherApi = "mockWeatherApi";
const mockWeatherUrl = "https://mockWeatherUrl.com";

describe("Weather Service", () => {
  beforeAll(() => {
    initialize(mockWeatherApi, mockWeatherUrl);
  });

  test("getWeatherUrl for city with metric unit", () => {
    const url = getWeatherUrl({
      type: "city",
      city: "London",
      unit: "metric",
    });
    expect(url).toBe(
      `${mockWeatherUrl}?q=London&units=metric&appid=${mockWeatherApi}`
    );
  });

  test("getWeatherUrl for city with imperial unit", () => {
    const url = getWeatherUrl({
      type: "city",
      city: "London",
      unit: "imperial",
    });
    expect(url).toBe(
      `${mockWeatherUrl}?q=London&units=imperial&appid=${mockWeatherApi}`
    );
  });

  test("getWeatherUrl for lat lng with metric unit", () => {
    const url = getWeatherUrl({
      type: "coordinate",
      lat: 51.5074,
      lng: 0.1278,
      unit: "metric",
    });

    expect(url).toBe(
      `${mockWeatherUrl}?lat=51.5074&lon=0.1278&units=metric&appid=${mockWeatherApi}`
    );
  });

  test("getWeatherUrl for lat lng with imperial unit", () => {
    const url = getWeatherUrl({
      type: "coordinate",
      lat: 51.5074,
      lng: 0.1278,
      unit: "imperial",
    });

    expect(url).toBe(
      `${mockWeatherUrl}?lat=51.5074&lon=0.1278&units=imperial&appid=${mockWeatherApi}`
    );
  });
});
