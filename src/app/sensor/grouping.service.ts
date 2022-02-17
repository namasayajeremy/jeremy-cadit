import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { MathService } from './math.service';
import {
  IDayInsight,
  IDayData,
  IRoomDatas,
  IInsight,
  IRawData,
  IRoomInsight,
  IRoomDayContainer,
} from './sensor-model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class GroupingService {
  constructor(private math: MathService, private snackbar: MatSnackBar) {}

  public getAllInsights(sensorDatas: IRawData[]) {
    const roomDatas = this.groupByRoom(sensorDatas);
    const roomDayContainer = roomDatas.map(this.groupByDay, this);
    const roomDayInsights = roomDayContainer.map(this.getDayInsights, this);
    return roomDayInsights;
  }

  /**
   * Group datas by room
   *
   * @param sensorDatas
   * @returns
   * expected return example: (rawDataObj refers to object of IRawData)
   * [
   *  {
   *    "roomArea": roomArea1,
   *     "sensorDatas": [rawDataObj1, rawDataObj3]
   *  },
   *  {
   *    "roomArea": roomArea2,
   *     "sensorDatas": [rawDataObj2, rawDataObj4, rawDataObj5]
   *  },
   * ]
   *
   */
  groupByRoom(sensorDatas: IRawData[]): IRoomDatas[] {
    const roomHelperGroup: IRoomDatas[] = [];
    sensorDatas.forEach((sensorData) => {
      const i = roomHelperGroup.findIndex(
        (data) => data.roomArea === sensorData.roomArea
      );
      return i !== -1 // checks if the specific room area had existed
        ? roomHelperGroup[i].sensorDatas.push(sensorData) // push sensor data to the array
        : roomHelperGroup.push({
            roomArea: sensorData.roomArea,
            sensorDatas: [sensorData],
          }); // else, initialize the array
    });
    return roomHelperGroup;
  }

  /**
   * Groups the data by day for a single room
   *
   * @param roomDatas
   * @returns a helper container which contains daydatas
   *
   * expected return example: (dayDataObj refers to object of IDayData)
   * [
   *  {
   *    "roomArea": roomArea1,
   *     "dayDatas": [dayDataObj1, dayDataObj3]
   *  },
   *  {
   *    "roomArea": roomArea2,
   *     "dayDatas": [dayDataObj2, dayDataObj4, dayDataObj5]
   *  },
   * ]
   *
   * object of IDayData example
   * {
   *   "date": "18/02/2022",
   *   "sensorDatas": [rawDataObj1, rawDataObj2]
   * },
   */
  groupByDay(roomDatas: IRoomDatas): IRoomDayContainer {
    const dayDatas: IDayData[] = [];
    roomDatas.sensorDatas.forEach((sensorData) => {
      const date = formatDate(
        sensorData.timestamp as number,
        'MM/dd/yyyy',
        'en-US'
      );
      const i = dayDatas.findIndex((data) => data.date === date);
      return i !== -1 // checks if the specific room area had existed
        ? dayDatas[i].sensorDatas.push(sensorData) // push sensor data to the array
        : dayDatas.push({
            date,
            sensorDatas: [sensorData],
          }); // else, initialize the array
    });
    return {
      roomArea: roomDatas.roomArea,
      dayDatas,
    };
  }

  /**
   * Abstracts the container to get the day insights of each room.
   *
   * @param roomDayData
   * @returns all day insights of the room in a single object
   * expected return example: (dayInsightObj refers to object of IDayInsight)
   * [
   *  {
   *    "roomArea": roomArea1,
   *     "dayInsights": [dayInsightObj1, dayInsightObj2]
   *  },
   *  {
   *    "roomArea": roomArea2,
   *     "dayInsights": [dayInsightObj3, dayInsightObj4, dayInsightObj5]
   *  },
   * ]
   * object of IDayInsight example
   * {
   *   "date": "18/02/2022",
   *   "temperature" : {
   *                      min: 17,
   *                      max: 25,
   *                      median: 21,
   *                      average: 20
   *                   },
   *   "humidity" : {
   *                      min: 87,
   *                      max: 95,
   *                      median: 91,
   *                      average: 90
   *                   }
   * },
   */
  getDayInsights(roomDayData: IRoomDayContainer): IRoomInsight {
    const dayInsights = roomDayData.dayDatas.map(this.getDayInsight, this);
    return {
      roomArea: roomDayData.roomArea,
      dayInsights,
    };
  }

  /**
   * Abstract datas of a single day to get its insight
   *
   * @param dayData
   * @returns insight of the day
   */
  getDayInsight(dayData: IDayData): IDayInsight {
    const tempArray = dayData.sensorDatas
      .map((data) => data.temperature)
      .sort((a, b) => a - b);
    const humArray = dayData.sensorDatas
      .map((data) => data.humidity)
      .sort((a, b) => a - b);

    return {
      date: new Date(dayData.date),
      temperature: this.calcInsight(tempArray),
      humidity: this.calcInsight(humArray),
    };
  }

  /**
   * Calls the math service to calculate the min, max, average, and median of the array
   *
   * @param dataArray datasource for insight calculation
   * @returns IInsight object
   */
  calcInsight(dataArray: number[]): IInsight {
    return {
      min: this.math.minimum(dataArray),
      max: this.math.maximum(dataArray),
      average: this.math.average(dataArray),
      median: this.math.median(dataArray),
    };
  }

  //#region other functions
  isSensorData(sensorDatas: IRawData[]): IRawData[] {
    return sensorDatas[0].temperature ? sensorDatas : null;
  }

  successReadNotif(path?: string) {
    if (path) {
      this.snackbar.open(`File path: ${path}`, 'close', { duration: 5000 });
    }
  }

  simulationComplete(path: string) {
    this.snackbar.open(`Simulation datas is saved in: ${path}`, 'close', {
      duration: 5000,
    });
  }

  wrongFileNotif() {
    this.snackbar.open(
      'Wrong file! Please try again and make sure its the sensor file.',
      'close'
    );
  }
  //#endregion
}
