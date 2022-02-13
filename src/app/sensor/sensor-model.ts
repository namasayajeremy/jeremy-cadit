export interface IRawData {
  id: number;
  humidity: number;
  temperature: number;
  roomArea: string;
  timestamp: number | string | Date;
}

export interface IGroupedInsights {
  group: string | Date;
  temperature: IInsights;
  humidity: IInsights;
}

interface IInsights {
  min: number;
  max: number;
  median: number;
  average: number;
}

export interface IGroupHelper {
  [id: string]: IRawData[];
}
