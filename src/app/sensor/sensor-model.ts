export interface IRawData {
  id: number;
  humidity: number;
  temperature: number;
  roomArea: string;
  timestamp: number | string | Date;
}

export interface IInsightsContainer {
  room: IGroupedInsights[];
  day: IGroupedInsights[];
}

export interface IGroupedInsights {
  group: string | Date;
  temperature: IInsight;
  humidity: IInsight;
}

export interface IInsight {
  min: number;
  max: number;
  median: number;
  average: number;
}

export interface IGroupHelper {
  [id: string]: IRawData[];
}
