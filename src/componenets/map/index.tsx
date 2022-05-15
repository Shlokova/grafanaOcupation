import './index.scss';
import React from 'react';
import FloorControls from '../controls/FloorControls';
import Floor from '../floor/Floor';
import MapControl from '../controls/mapControl';
import RegionsControls from '../controls/regionsControls';
// import { useSearchParams } from 'react-router-dom';
import { ZoneObject} from '../../types';
import { TransformWrapper } from 'react-zoom-pan-pinch';
import {useLocation} from "react-router-dom";
import {findSearch} from "../../utils";

type CampusMapProps = {
  campusName: string;
  floors: ZoneObject[];
  mapHeight: number;
  width: number;
  height: number;
};

// CampusMap
function Map({ campusName, floors, width, height }: CampusMapProps) {
    const location = useLocation()
    const dataFloors:ZoneObject[] = floors.filter((el:ZoneObject) => el.type === 'FLOOR').sort((a, b) => {
       return parseInt(a.description) - parseInt(b.description)
    })
    const {floor} = findSearch(location.search)

  return (
    <TransformWrapper
      // initialScale={height / floors[+floor -1].floorMap.height}
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
              <div className={'map'}>
                  <Floor floorMap={dataFloors[+floor -1]} number={floor} zones = {floors}/>
              </div>

            <div className={'mapControls'}>
              <MapControl zoomIn={zoomIn} zoomOut={zoomOut} resetTransform={resetTransform} />
            </div>
            <div className={'sideMenu'}>
              <FloorControls floors={dataFloors} />
              <RegionsControls zoomToElement={zoomToElement} floors={floors} floorId={dataFloors[+floor -1].id}/>
            </div>
          </div>
        </React.Fragment>
      )}
    </TransformWrapper>
  );
}

export default Map;
