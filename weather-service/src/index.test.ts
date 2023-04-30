import exp from "constants";
import { initialize, getWeatherUrl, getWeatherByCityName } from ".";

const mockWeatherApi = "mockWeatherApi";
const mockWeatherUrl = "https://mockWeatherUrl.com";

const mockData = require("./mock/london.json");
const mockSuccessResponse: Response = {
  arrayBuffer(): Promise<ArrayBuffer> {
    return Promise.resolve(new ArrayBuffer(0));
  },
  blob(): Promise<Blob> {
    return Promise.resolve(new Blob());
  },
  body: null,
  bodyUsed: false,
  clone(): Response {
    return mockSuccessResponse;
  },
  formData(): Promise<FormData> {
    return Promise.resolve(new FormData());
  },
  json(): Promise<any> {
    return Promise.resolve(mockData);
  },
  ok: true,
  redirected: false,
  status: 200,
  statusText: "OK",
  text(): Promise<string> {
    return Promise.resolve("");
  },
  type: "basic",
  url: "",
  headers: {} as any,
};

const standardFetch = global.fetch;
global.fetch = jest.fn(
  () => new Promise<Response>((resolve) => resolve(mockSuccessResponse))
);

describe("Weather Service", () => {
  beforeAll(() => {
    initialize(mockWeatherApi, mockWeatherUrl);
  });

  afterAll(() => {
    global.fetch = standardFetch;
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

  test("fetches weather data by city name", async () => {
    const result = await getWeatherByCityName("London");
    expect(global.fetch).toBeCalled();
    expect(result).toEqual({ status: "success", data: mockData });
  });
});
