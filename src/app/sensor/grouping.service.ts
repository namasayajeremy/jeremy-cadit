import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { MathService } from './math.service';
import {
  IGroupedInsights,
  IGroupHelper,
  IInsight,
  IInsightsContainer,
  IRawData,
} from './sensor-model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class GroupingService {
  constructor(private math: MathService, private snackbar: MatSnackBar) {}

  getAllInsights(sensorDatas: IRawData[]): IInsightsContainer {
    return {
      room: this.groupbyRoom(sensorDatas),
      day: this.groupbyDay(sensorDatas),
    };
  }

  /**
   * Calls grouping function with an argument to group by 'roomArea'
   *
   * @param sensorDatas
   * @returns Grouped room data insights
   */
  groupbyRoom(sensorDatas: IRawData[]): IGroupedInsights[] {
    const groupBy = 'roomArea';
    const groupedData = this.groupData(sensorDatas, groupBy);
    const groupedDataInsights = this.getInsights(groupedData);
    return groupedDataInsights;
  }

  /**
   * Calls grouping function with an argument of 'timestamp' from a formatted sensor data.
   *
   * @param sensorDatas raw datas from json file
   * @returns Formatted grouped day data insights
   */
  groupbyDay(sensorDatas: IRawData[]): IGroupedInsights[] {
    const newSensorDatas = sensorDatas.map(this.dateAsString);
    const groupBy = 'timestamp';
    const groupedData = this.groupData(newSensorDatas, groupBy);
    const groupedDataInsights = this.getInsights(groupedData).map(
      this.dateAsDate
    );
    return groupedDataInsights.sort(
      (a, b) => +new Date(a.group) - +new Date(b.group)
    );
  }

  /**
   * Group data to a helper object containing arrays of sensor data objects.
   * Expected object structures are as example:
   * {
   *  "roomArea1": [
   *    rawData1, //IRawData object
   *    rawData2
   *  ],
   *  "roomArea2": [
   *    rawData3,
   *    rawData4,
   *  ]
   *}
   *
   * @param sensorDatas
   * @param groupBy grouping parameter (roomarea/timestamp)
   * @returns grouped data object
   */
  groupData(sensorDatas: IRawData[], groupBy: string): IGroupHelper {
    const groupedData: IGroupHelper = {};
    sensorDatas.forEach((sensorData) => {
      const group = sensorData[groupBy];
      return groupedData[group] // checks if the specific group name had existed (ex: roomArea1, 12/20/2021)
        ? groupedData[group].push(sensorData) // push sensor data to the array
        : (groupedData[group] = [sensorData]); // else, initialize the array
    });
    return groupedData;
  }

  /**
   * Iterates through the grouped data to get its insight.
   *
   * @param groupedData
   * @param groupBy
   * @returns array of grouped data insights
   */
  getInsights(groupedData: IGroupHelper): IGroupedInsights[] {
    const groupedInsights: IGroupedInsights[] = [];
    //loop through every group
    for (const group in groupedData) {
      //avoid processing object's prototype
      if (!groupedData.hasOwnProperty(group)) {
        continue;
      }

      //create helper arrays for each sensor's parameter
      const tempArray = groupedData[group]
        .map((data) => data.temperature)
        .sort((a, b) => a - b); //sort ascending
      const humArray = groupedData[group]
        .map((data) => data.humidity)
        .sort((a, b) => a - b);

      //calls the helper function to calculate the insight
      groupedInsights.push({
        group,
        temperature: this.calcInsight(tempArray),
        humidity: this.calcInsight(humArray),
      });
    }
    return groupedInsights;
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
  dateAsString(sensorData: IRawData) {
    return {
      ...sensorData,
      timestamp: formatDate(
        sensorData.timestamp as number,
        'MM/dd/yyyy',
        'en-US'
      ),
    } as IRawData;
  }

  dateAsDate(groupedData: IGroupedInsights) {
    return {
      ...groupedData,
      group: new Date(groupedData.group),
    } as IGroupedInsights;
  }

  isSensorData(sensorDatas: IRawData[]): IRawData[] {
    return sensorDatas[0].temperature ? sensorDatas : null;
  }

  openSuccess(path?: string) {
    if (path) {
      this.snackbar.open(`File path: ${path}`, 'close');
    }
  }

  wrongFile() {
    this.snackbar.open(
      'Wrong file! Please try again and make sure its the sensor file.',
      'close'
    );
  }

  hintNotif() {
    this.snackbar.open(
      'Please choose the grouping criteria by clicking "Room" or "Day" toggle.',
      'close'
    );
  }

  //#endregion
}
