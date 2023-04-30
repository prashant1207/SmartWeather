import {Weather} from 'weather-service';
import {City} from './City';

export type StackParamList = {
  Home: undefined;
  Detail: {weather: Weather; city: City};
};
