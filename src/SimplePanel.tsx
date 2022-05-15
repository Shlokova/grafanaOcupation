import React, { useRef } from 'react';
import { PanelProps } from '@grafana/data';
import {SimpleOptions, ZoneObject} from 'types';
import './App.css'
//
// import floor1 from '../public/img/1floor.svg';
// import floor2 from '../public/img/2floor.svg';
// import floor3 from '../public/img/3floor.svg';
// import diningRoom from '../public/img/floor1/diningRoom.svg'
// import hallway from '../public/img/floor2/hallway.svg'
// import hall from '../public/img/floor2/hall.svg'
// import office1208 from '../public/img/floor3/office1208.svg'
// import ladder from '../public/img/floor3/ladder.svg'
// import { css, cx } from 'emotion';
// import { stylesFactory, useTheme } from '@grafana/ui';
import Map from './componenets/map';
import {HashRouter as Router} from 'react-router-dom'
// import {useTheme} from "@grafana/ui";

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  // const theme = useTheme();
  // const styles = getStyles();
// data.series[0].fields[0] - доступ к названиям
  //@ts-ignore
  const dataZones = data.series[0].fields.reduce((res, prev, i) => {
    //@ts-ignore

      if(i == 0) {
      for (let j = 0; j<prev.values.length; j++)
      {
        //@ts-ignore
        res.push({[prev.name]: prev.values.get(j)})
      }

    }
    else{
      for (let j = 0; j<prev.values.length; j++)
      {
        //@ts-ignore
        res[j][prev.name]= prev.values.get(j)
      }
    }



  return res
  }, [])



  // const floors = [
  //   {
  //     number: '1',
  //     regions: [
  //       {
  //         name: 'diningRoom',
  //         description: 'Столовая',
  //         ref: useRef<SVGSVGElement>(null),
  //         cameraIds: ['', ''],
  //         // src: '/img/floor1/diningRoom.svg',
  //         src: diningRoom,
  //         width: 465,
  //         height: 1417,
  //         x: 88.5,
  //         y: 1255,
  //       },
  //     ],
  //     ref: useRef<HTMLDivElement>(null),
  //     floorMap: {
  //       // src: '/img/2floor.svg',
  //       src: floor1,
  //       width: 1235,
  //       height: 3027,
  //     },
  //   },
  //   {
  //     number: '2',
  //     regions: [
  //       {
  //         name: 'hallway',
  //         description: 'коридор',
  //         cameraIds: ['', ''],
  //         ref: useRef<SVGSVGElement>(null),
  //         // src: '/img/floor2/hallway.svg',
  //         src: hallway,
  //         width: 110,
  //         height: 502,
  //         x: 179.5,
  //         y: 1497,
  //       },
  //       {
  //         name: 'hall',
  //         description: 'холл',
  //         cameraIds: ['', ''],
  //         ref: useRef<SVGSVGElement>(null),
  //         // src: `/img/floor2/hall.svg`,
  //         src: hall,
  //         width: 271.5,
  //         height: 289,
  //         x: 201,
  //         y: 2652.5,
  //       },
  //     ],
  //     ref: useRef<HTMLDivElement>(null),
  //     floorMap: {
  //       // src: '/img/2floor.svg',
  //       src: floor2,
  //       width: 2515,
  //       height: 3121,
  //     },
  //   },
  //   {
  //     number: '3',
  //     regions: [
  //       {
  //         name: 'hallway',
  //         description: 'Коридор',
  //         cameraIds: ['', ''],
  //         src: hallway,
  //         // src: '/img/floor3/hallway.svg',
  //         ref: useRef<SVGSVGElement>(null),
  //         width: 110,
  //         height: 502,
  //         x: 179.5,
  //         y: 1502,
  //       },
  //       {
  //         name: 'office1208',
  //         description: '1208 кабинет',
  //         cameraIds: ['', ''],
  //         // src: '/img/floor3/office1208.svg',
  //         src: office1208,
  //         ref: useRef<SVGSVGElement>(null),
  //         width: 140,
  //         height: 119,
  //         x: 640,
  //         y: 112,
  //       },
  //       {
  //         name: 'ladder',
  //         description: 'Лестница',
  //         cameraIds: ['', ''],
  //         // src: `/img/floor3/ladder.svg`,
  //         src: ladder,
  //         ref: useRef<SVGSVGElement>(null),
  //         width: 293,
  //         height: 267,
  //         x: 371,
  //         y: 1254,
  //       },
  //     ],
  //     ref: useRef<HTMLDivElement>(null),
  //     floorMap: {
  //       // src: '/img/3floor.svg',
  //       src: floor3,
  //       width: 2524,
  //       height: 3137,
  //     },
  //   },
  // ];
  const campusName = 'ITMO';

  const MAP_HEIGHT = 961;
  return (
    <div className="App" style={
      {
        width: width,
        height:height,
        // background: theme.isDark ? 'gray' : 'white'
      }
    }>
      {/*<div>{JSON.stringify(dataFloors)}</div>*/}
      <Router >
      <Map width={width} height={height} mapHeight={MAP_HEIGHT} campusName={campusName} floors={dataZones} />
      </Router>
    </div>
  );
};

// const getStyles = stylesFactory(() => {
//   return {
//     wrapper: css`
//       position: relative;
//     `,
//     svg: css`
//       position: absolute;
//       top: 0;
//       left: 0;
//     `,
//     textBox: css`
//       position: absolute;
//       bottom: 0;
//       left: 0;
//       padding: 20px;
//     `,
//   };
// });
