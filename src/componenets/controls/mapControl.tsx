import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { findSearch } from '../../utils';
// import { FloorType } from '../../types';

type MapControlProps = {
  zoomIn: (step?: number, animationTime?: number, animationName?: string) => void;
  zoomOut: (step?: number, animationTime?: number, animationName?: string) => void;
  resetTransform: (animationTime?: number, animationName?: string) => void;
};

function MapControl({ zoomIn, zoomOut, resetTransform }: MapControlProps) {
  const location = useLocation();
  const { floor } = findSearch(location.search);

  return (
    <>
      <div className="zoomButtonsBox">
        <button onClick={() => zoomIn(0.2, 10)} className={'buttonsItem '}>
          <div className="btnIconPlus" />
        </button>
        <button onClick={() => zoomOut(0.2, 10)} className="buttonsItem">
          <div className="btnIconMinus" />
        </button>
      </div>
      <div className="resetButtonBox">
        <Link to={`/?floor=${floor}`} className={'buttonsItem '} onClick={() => resetTransform(0)}>
          <div className="btnIconReset" />
        </Link>
      </div>
    </>
  );
}

export default MapControl;
