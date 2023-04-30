import {Location} from './Location';

export type City =
  | {
      type: 'city';
      id: string;
      name: string;
    }
  | {
      type: 'location';
      id: string;
      location: Location;
    };
