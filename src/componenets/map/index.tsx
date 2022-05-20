import './index.scss';
import React, { useEffect, useState } from 'react';
import FloorControls from '../controls/FloorControls';
import Floor from '../floor/Floor';
import MapControl from '../controls/mapControl';
import RegionsControls from '../controls/regionsControls';
import { ZoneObject } from '../../types';
import { TransformWrapper } from 'react-zoom-pan-pinch';
import { useLocation } from 'react-router-dom';
import { findSearch } from '../../utils';
import { XMLParser } from 'fast-xml-parser';
import axios from 'axios';
import { AboutRegion } from 'componenets/controls/AboutRegion';

type CampusMapProps = {
  floors: ZoneObject[];
  mapHeight: number;
  width: number;
  height: number;
  workload: { [key: string]: number };
};

function Map({ workload, floors, width, height }: CampusMapProps) {
  const location = useLocation();
  const dataFloors: ZoneObject[] = floors
    .filter((el: ZoneObject) => el.type === 'FLOOR')
    .sort((a, b) => {
      return parseInt(a.description) - parseInt(b.description);
    });
  const { floor, region } = findSearch(location.search);
  const regionObject = floors.find((el: ZoneObject) => el.name === region);
  const options = {
    ignoreAttributes: false,
  };

  const [size, setSize] = useState({ width: '', height: '3000' });

  useEffect(() => {
    const parser = new XMLParser(options);
    axios
      .get(
        `https://storage.yandexcloud.net/cctv-media/${
          dataFloors[+floor - 1].plan
        }`
      )
      .then((response) => {
        const output = parser.parse(response.data);
        setSize({
          width: output.svg['@_width'],
          height: output.svg['@_height'],
        });
      });
  }, [floor]);

  return (
    <TransformWrapper
      initialScale={height / +size.height}
      minScale={0.1}
      maxScale={1.8}
      centerOnInit={true}
      wheel={{
        disabled: true,
      }}
      alignmentAnimation={{ sizeX: 1000 }}
      doubleClick={{
        step: 0.4,
        animationTime: 1,
      }}
    >
      {({ zoomIn, zoomOut, resetTransform, zoomToElement, ...rest }: any) => (
        <React.Fragment>
          <div
            className={'map'}
            style={{
              width,
              height,
            }}
          >
            <div className={'floor'}>
              <Floor
                workload={workload}
                size={size}
                floorMap={dataFloors[+floor - 1]}
                zones={floors}
              />
            </div>

            <div className={'mapControls'}>
              <MapControl
                zoomIn={zoomIn}
                zoomOut={zoomOut}
                resetTransform={resetTransform}
              />
            </div>
            <div className={'sideMenu'}>
              <FloorControls
                floors={dataFloors}
                resetTransform={resetTransform}
              />
              <RegionsControls
                zoomToElement={zoomToElement}
                floors={floors}
                floorId={dataFloors[+floor - 1].id}
              />
              <AboutRegion region={regionObject} workload={workload[region]} />
            </div>
          </div>
        </React.Fragment>
      )}
    </TransformWrapper>
  );
}

export default Map;
