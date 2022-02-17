import { Injectable } from '@angular/core';
import { IRawData } from './sensor-model';

@Injectable({
  providedIn: 'root',
})
export class SimulationService {
  constructor() {}

  getDummyDatas(prevID: number, numRoomArea: number): IRawData[] {
    const dummyDatas: IRawData[] = [];
    for (let i = 0; i < numRoomArea; i++) {
      dummyDatas.push(this.createDummyData(prevID + i, i + 1));
    }
    return dummyDatas;
  }

  createDummyData(prevID: number, roomIndex: number): IRawData {
    return {
      id: prevID + 1,
      roomArea: `roomArea${roomIndex}`,
      timestamp: +new Date(),
      temperature: this.getRnd(17, 27),
      humidity: this.getRnd(87, 97),
    };
  }
  getRnd(min: number, max: number) {
    return (Math.random() * (max - min + 1)) + min;
  }
}
