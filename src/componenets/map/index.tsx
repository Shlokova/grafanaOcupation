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
      return parseInt(a.humanreadable_name, 10) - parseInt(b.humanreadable_name, 10);
    });
  const { floor, region } = findSearch(location.search);
  const regionObject = floors.find((el: ZoneObject) => el.trassir_name === region);

  const [size, setSize] = useState({ width: '', height: '3200' });

  useEffect(() => {
    const parser = new XMLParser({
      ignoreAttributes: false,
    });
    axios.get(`https://storage.yandexcloud.net/cctv-media/${dataFloors[+floor - 1].plan}`).then((response) => {
      const output = parser.parse(response.data);
      setSize({
        width: output.svg['@_width'],
        height: output.svg['@_height'],
      });
    });
  }, [floor, dataFloors]);

  return (
    <TransformWrapper
      initialScale={height / (+size.height + 200)}
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
                zoomToElement={zoomToElement}
              />
            </div>

            <div className={'mapControls'}>
              <MapControl zoomIn={zoomIn} zoomOut={zoomOut} resetTransform={resetTransform} />
            </div>
            <div className={'sideMenu'}>
              <FloorControls floors={dataFloors} resetTransform={resetTransform} />
              <RegionsControls zoomToElement={zoomToElement} floors={floors} floorId={dataFloors[+floor - 1].id} />
              <AboutRegion region={regionObject} workload={workload[region]} />
            </div>
          </div>
        </React.Fragment>
      )}
    </TransformWrapper>
  );
}

export default Map;
