import React from 'react';
import './floor.scss';
import SVG from 'react-inlinesvg';

import {ZoneObject} from '../../types';
import { TransformComponent } from 'react-zoom-pan-pinch';
import {useLocation} from "react-router-dom";
import {findSearch} from "../../utils";

type FloorProps = {
  number: string;
  // regions: Region[];
  // refFloor: RefObject<HTMLDivElement>;
  zones: ZoneObject[];
  floorMap: ZoneObject;
};
const Floor = ({ number,  floorMap, zones }: FloorProps) => {
  const css = {
    background: `url("https://storage.yandexcloud.net/cctv-media/${floorMap.plan}")`,
    // width: floorMap.width,
    // height: floorMap.height,
      width: 2515,
      height: 3121,
  };

  const regions = zones.filter(el => el.parent_zone_id === floorMap.id)

  const location = useLocation()
  const {region:currentRegion} = findSearch(location.search)

  return (
    <TransformComponent
      wrapperStyle={{
        width: '100%',
        height: '100%',
      }}
    >
      <div className="svgMap" style={css} >

        {regions.map((region) => {
          return (
            <div
              className={'regions ' + (currentRegion === region.name && 'active')}
              // width={100}
              id={region.name}
              // height={}
              key={region.name}
              style={{
                top: `${region.coordinates.split(' ')[1]}px`,
                left: `${region.coordinates.split(' ')[0]}px`,
              }}
            >
              <SVG src={`https://storage.yandexcloud.net/cctv-media/${region.plan}` ?? ' '} description={region.description} />
              <div className="aboutSvg_container">
                <div className="aboutSvg">{region.description}</div>
              </div>
            </div>
          );
        })}
      </div>
    </TransformComponent>
  );
};

export default Floor;
