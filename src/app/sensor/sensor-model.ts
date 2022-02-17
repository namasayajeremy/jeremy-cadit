export interface IRawData {
  id: number;
  humidity: number;
  temperature: number;
  roomArea: string;
  timestamp: number | string | Date;
}

export interface IInsight {
  min: number;
  max: number;
  median: number;
  average: number;
}

export interface IRoomDatas {
  roomArea: string;
  sensorDatas: IRawData[];
}

export interface IRoomDayContainer {
  roomArea: string;
  dayDatas: IDayData[];
}

export interface IDayData {
  date: string;
  sensorDatas: IRawData[];
}

export interface IRoomInsight {
  roomArea: string;
  dayInsights: IDayInsight[];
}

export interface IDayInsight {
  date: Date;
  temperature: IInsight;
  humidity: IInsight;
}
