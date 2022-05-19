import { Progress } from 'antd';
import React from 'react';
import { ZoneObject } from 'types';
import { convertingNumberToColor, convertingNumberToDescription } from 'utils';

type AboutRegionProps = {
  region: ZoneObject | undefined;
  workload: number;
};

export const AboutRegion = ({ region, workload }: AboutRegionProps) => {
  if (region)
    return (
      <div className="regionWorkloadContainer">
        <div className="title">{region.description}</div>
        <Progress
          className="workloadBar"
          percent={workload * 100}
          showInfo={false}
          strokeColor={convertingNumberToColor(workload)}
          strokeWidth={24}
        />
        <div className="description">
          {convertingNumberToDescription(workload)}
        </div>
      </div>
    );
  return <div></div>;
};
