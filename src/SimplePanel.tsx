import React from "react";
import { PanelProps } from "@grafana/data";
import { SimpleOptions } from "types";
import "./App.css";
import Map from "./componenets/map";
import { HashRouter as Router } from "react-router-dom";
import { parseZonesData, parseZonesRelativeWorkload } from "utils";

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({
  options,
  data,
  width,
  height,
}) => {
  // const theme = useTheme();

  const dataZones = parseZonesData(data);
  const zonesRelativeWorkload = parseZonesRelativeWorkload(data);

  const MAP_HEIGHT = 961;
  return (
    <div
      className="App"
      style={{
        width: width,
        height: height,
        // background: theme.isDark ? 'gray' : 'white'
      }}
    >
      <Router>
        <Map
          width={width}
          height={height}
          mapHeight={MAP_HEIGHT}
          floors={dataZones}
          workload={zonesRelativeWorkload}
        />
      </Router>
    </div>
  );
};
