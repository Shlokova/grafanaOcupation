import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ZoneObject } from "../../types";
import { findSearch } from "../../utils";

type RegionsControlsProps = {
  floors: ZoneObject[];
  floorId: number;
  zoomToElement: (
    node: HTMLElement | string,
    customScale: number | undefined,
    animationTime: number,
    animationName: string
  ) => void;
};

function RegionsControls({
  zoomToElement,
  floors,
  floorId,
}: RegionsControlsProps) {
  const location = useLocation();
  const { floor, region } = findSearch(location.search);
  const regions = floors.filter((el) => el.parent_zone_id === floorId);

  return (
    <div>
      <h1 className={"title"}>Место</h1>
      <div className="regionsList">
        {regions.map((el) => {
          return (
            <Link
              key={el.trassir_name}
              to={`/?floor=${floor}&region=${el.trassir_name}`}
              className={"regionsListItem " + (region === el.trassir_name && "active")}
              onClick={(e) => zoomToElement(el.trassir_name, undefined, 0, "linear")}
            >
              {el.humanreadable_name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default RegionsControls;
