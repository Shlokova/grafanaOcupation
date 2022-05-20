export interface SimpleOptions {
  time: number;
}

export type MapObject = {
  src: string; // background map image
  width: number;
  height: number;
};

export type ZonesList = {
  count: number;
  next: null;
  previous: null;
  results: [];
};
export type ZoneObject = {
  id: number;
  name: string;
  description: string;
  coordinates: string;
  image: string | null;
  type: 'ROOM' | 'FLOOR' | 'BUILDING';
  plan: string | null;
  parent_zone_id: number | null;
  building: number;
};
