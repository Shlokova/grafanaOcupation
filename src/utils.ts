import { PanelData } from "@grafana/data";

export const findSearch = (search: string) => {
  const result = {
    floor: "",
    region: "",
  };
  const floor = search.match(/[&?]floor=([^&]+)/);
  const region = search.match(/[&?]region=([^&]+)/);
  result.floor = floor ? floor[1] : "1";
  result.region = region ? region[1] : "";
  return result;
};

export const parseZonesData = (data: PanelData) =>
  data.series[0].fields.reduce((res, prev, i) => {
    if (i == 0) {
      for (let j = 0; j < prev.values.length; j++) {
        //@ts-ignore
        res.push({ [prev.name]: prev.values.get(j) });
      }
    } else {
      for (let j = 0; j < prev.values.length; j++) {
        //@ts-ignore
        res[j][prev.name] = prev.values.get(j);
      }
    }

    return res;
  }, []);

export const parseZonesRelativeWorkload = (data: PanelData) => {
  const zonesName = data.series[1].fields
    .find((el) => el.name === "Zone")
    ?.values.toArray();

  return zonesName
    ? zonesName.reduce((res, prev, i) => {
        //@ts-ignore
        res[prev] = data.series[1].fields
          .find((el) => el.name === "Relative workload")
          ?.values.get(i);

        return res;
      }, {})
    : {};
};

export const convertingNumberToClass = (num: number) => {
  if (num > 0.8) {
    return " red ";
  }
  if (num > 0.6) {
    return " orange ";
  }
  if (num > 0.4) {
    return " yellow ";
  }
  if (num > 0.2) {
    return " lightGreen ";
  }
  return " green ";
};

export const convertingNumberToColor = (num: number) => {
  if (num > 0.8) {
    return "#eb5757";
  }
  if (num > 0.6) {
    return "#ff7010";
  }
  if (num > 0.4) {
    return "#f7b500";
  }
  if (num > 0.2) {
    return "#00a911";
  }
  return "#008d6b";
};

export const convertingNumberToDescription = (num: number) => {
  if (num > 0.8) {
    return "Максимальная загруженность";
  }
  if (num > 0.6) {
    return "Высокая загруженность";
  }
  if (num > 0.4) {
    return "Средняя загруженность";
  }
  if (num > 0.2) {
    return "Низкая загруженность";
  }
  return "Минимальная загруженность";
};
