import { RefObject } from 'react';

// type SeriesSize = 'sm' | 'md' | 'lg';

export interface SimpleOptions {
  time: number;
}

export type MapObject = {
  src: string; // background map image
  width: number;
  height: number;
};
export type Region = {
  name: string; // works kinda like id
  description: string;
  cameraIds: string[];
  ref: RefObject<SVGSVGElement>;
  src: string; // region map image
  width: number;
  height: number;
  x: number; // in percent of map width
  y: number; // in percent of map heights
};
export type FloorType = {
  number: string;
  regions: Region[];
  ref: RefObject<HTMLDivElement>;
  floorMap: MapObject;
};

export type ZonesList = {

  "count": number,
  "next": null,
  "previous": null,
  "results": []
}
export type ZoneObject = {
  "id": number,
  "name": string,
  "description": string,
  "coordinates": string,
  "image": string | null,
  "type": "ROOM" | "FLOOR" | "BUILDING",
  "plan": string | null,
  "parent_zone_id": number | null,
  "building": number
}

