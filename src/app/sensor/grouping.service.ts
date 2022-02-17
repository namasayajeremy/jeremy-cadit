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
    const roomDayContainer = roomDatas.map(this.groupByDay,this);
    const roomDayInsights = roomDayContainer.map(this.getDayInsights,this);
    return roomDayInsights;
  }

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

  getDayInsights(roomDayData: IRoomDayContainer): IRoomInsight {
    const dayInsights = roomDayData.dayDatas.map(this.getDayInsight,this);
    return {
      roomArea: roomDayData.roomArea,
      dayInsights,
    };
  }

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
      this.snackbar.open(`File path: ${path}`, 'close',{duration:10000});
    }
  }

  wrongFileNotif() {
    this.snackbar.open(
      'Wrong file! Please try again and make sure its the sensor file.',
      'close'
    );
  }
  //#endregion
}
