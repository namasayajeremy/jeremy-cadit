import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { MathService } from './math.service';
import { IGroupedInsights, IGroupHelper, IRawData } from './sensor-model';

@Injectable({
  providedIn: 'root',
})
export class GroupingService {
  constructor(private math: MathService) {}

  groupbyRoom(sensorDatas: IRawData[]) {
    const groupBy = 'roomArea';
    const groupedData = this.groupData(sensorDatas, groupBy);
    return this.calculateInsights(groupedData, groupBy);
  }

  /**
   * Format each sensor data to include its date(as a string).
   * Date is formatted as a string to support grouping function.
   * the date-containing property will be mapped back to Date later to enable proper sorting.
   *
   * @param sensorDatas raw datas from json file
   * @returns Calculated grouped data insights
   */
  groupbyDay(sensorDatas: IRawData[]): IGroupedInsights[] {
    const newSensorDatas = sensorDatas.map(this.convertDatetoString);
    const groupBy = 'timestamp';
    const groupedData = this.groupData(newSensorDatas, groupBy);
    return this.calculateInsights(groupedData, groupBy);
  }

  /**
   * Group data to a helper object consisted of arrays of sensor data objects.
   * Each array contains all data objects related to its roomArea/day group
   * Expected object structure example:
   * {
   *  "roomArea1": [
   *    rawData1,
   *    rawData2
   *  ],
   *  "roomArea2": [
   *    rawData3,
   *    rawData4,
   *  ]
   *}
   *
   * @param sensorDatas passed sensor data that may have been mapped
   * @param groupBy grouping parameter (roomarea/timestamp)
   * @returns grouped data object
   */
  groupData(sensorDatas: IRawData[], groupBy: string): IGroupHelper {
    const groupedData: IGroupHelper = {};
    sensorDatas.forEach((sensorData) => {
      const group = sensorData[groupBy];
      return groupedData[group] // checks if the specific group(area/date) array had existed
        ? groupedData[group].push(sensorData) // if true, push sensor data to the array
        : (groupedData[group] = [sensorData]); // if false, initialize the array
    });
    return groupedData;
  }

  /**
   * Calculate the data insights(min, max, avg, median) of each group.
   *
   * @param groupedData
   * @param groupBy
   * @returns
   */
  calculateInsights(
    groupedData: IGroupHelper,
    groupBy: string
  ): IGroupedInsights[] {
    const groupedInsights: IGroupedInsights[] = [];
    for (const group in groupedData) {
      if (!groupedData.hasOwnProperty(group)) {
        //avoid processing object's prototype
        continue;
      }
      const tempArray = groupedData[group] //create helper array consisting of temperature datas
        .map((data) => data.temperature)
        .sort((a, b) => a - b); //sort ascending to help calculation
      const humArray = groupedData[group]//similar to tempArray but for humidity
        .map((data) => data.humidity)
        .sort((a, b) => a - b);
      groupedInsights.push({
        group: groupBy === 'roomArea' ? group : new Date(group), //assign group name (ex: roomArea1, 20/01/2022).
        temperature: {
          min: this.math.minimum(tempArray),//calculation in math service
          max: this.math.maximum(tempArray),
          average: this.math.average(tempArray),
          median: this.math.median(tempArray),
        },
        humidity: {
          min: this.math.minimum(humArray),
          max: this.math.maximum(humArray),
          average: this.math.average(humArray),
          median: this.math.median(humArray),
        },
      });
    }
    return groupedInsights;
  }

  convertDatetoString(sensorData: IRawData) {
    return {
      ...sensorData,
      timestamp: formatDate(
        sensorData.timestamp as number,
        'MM/dd/yyyy',
        'en-US'
      ),
    } as IRawData;
  }
}
