import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ZoneObject } from '../../types';
import { findSearch } from '../../utils';

type FloorControlsPropsI = {
  floors: ZoneObject[];
  resetTransform: (
    x?: number,
    y?: number,
    scale?: number,
    animationTime?: number,
    animationName?: string
  ) => void;
};

const FloorControls = ({ floors, resetTransform }: FloorControlsPropsI) => {
  const floorsNumber = floors.map((el) => parseInt(el.description));
  const location = useLocation();
  const search = findSearch(location.search);
  const floor = search.floor;
  return (
    <>
      <h1 className={'title'}>Этаж</h1>
      <div className="floorButtonsBox">
        {floorsNumber.map((val) => (
          <Link
            onClick={() => resetTransform(0)}
            to={`?floor=${val}`}
            key={val}
            className={'buttonsItem ' + (+floor === val ? 'active' : '')}
          >
            <div>{val}</div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default FloorControls;
