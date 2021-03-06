import React from 'react';
import './floor.scss';
import SVG from 'react-inlinesvg';
import { ZoneObject } from '../../types';
import { TransformComponent } from 'react-zoom-pan-pinch';
import { Link, useLocation } from 'react-router-dom';
import { convertingNumberToClass, findSearch } from '../../utils';

type FloorProps = {
  workload: { [key: string]: number };
  zones: ZoneObject[];
  floorMap: ZoneObject;
  size: { width: string; height: string };
  zoomToElement: (
    node: HTMLElement | string,
    customScale: number | undefined,
    animationTime: number,
    animationName: string
  ) => void;
};
const Floor = ({ size, workload, floorMap, zones, zoomToElement }: FloorProps) => {
  const css = {
    background: `url('https://storage.yandexcloud.net/cctv-media/${floorMap.plan}')`,
    width: size.width + 'px',
    height: size.height + 'px',
  };

  const regions = zones.filter((el) => el.parent_zone_id === floorMap.id);

  const location = useLocation();
  const { floor, region: currentRegion } = findSearch(location.search);

  return (
    <TransformComponent
      wrapperStyle={{
        width: '100%',
        height: '100%',
      }}
    >
      <div className="svgMap" style={css}>
        {regions.map((region) => {
          return (
            <Link
              key={region.trassir_name}
              to={`/?floor=${floor}&region=${region.trassir_name}`}
              onClick={(e) => zoomToElement(region.trassir_name, undefined, 0, 'linear')}
            >
              <div
                className={
                  'regions ' +
                  (!!workload && convertingNumberToClass(workload[region.trassir_name])) +
                  (currentRegion === region.trassir_name && 'active')
                }
                id={region.trassir_name}
                style={{
                  top: `${region.coordinates.split(' ')[1]}px`,
                  left: `${region.coordinates.split(' ')[0]}px`,
                }}
              >
                <SVG
                  src={`https://storage.yandexcloud.net/cctv-media/${region.plan}` ?? ' '}
                  description={region.humanreadable_name}
                />
                <div className="aboutSvg_container">
                  <div className="aboutSvg">{region.humanreadable_name}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </TransformComponent>
  );
};

export default Floor;
