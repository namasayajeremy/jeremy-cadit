import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ElectronService } from '../../core/services';
import { IRoomInsight } from '../sensor-model';

interface IChartHelper {
  room: string;
  temp: ChartConfiguration;
  hum: ChartConfiguration;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() dataSources: IRoomInsight[];
  chartDatas: IChartHelper[];

  constructor(private electron: ElectronService) {}
  ngOnInit(): void {
    if (this.dataSources) {
      this.chartDatas = this.formatDatas(this.dataSources);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dataSources) {
      this.chartDatas = this.formatDatas(changes.dataSources.currentValue);
    }
  }

  formatDatas(roomInsights: IRoomInsight[]): IChartHelper[] {
    const chartDatas: IChartHelper[] = [];
    roomInsights.forEach((roomInsight) => {
      const room = roomInsight.roomArea;
      const temp = this.formatData(roomInsight, 'temperature');
      const hum = this.formatData(roomInsight, 'humidity');
      chartDatas.push({ room, temp, hum });
    });
    return chartDatas;
  }

  formatData(
    roomInsight: IRoomInsight,
    sensorParam: string
  ): ChartConfiguration {
    return {
      type: 'line',
      data: {
        labels: roomInsight.dayInsights.map((data) =>
          data.date.toLocaleDateString('id-ID')
        ),
        datasets: [
          {
            label: 'Minimum',
            data: roomInsight.dayInsights.map((data) => data[sensorParam].min),
          },
          {
            label: 'Maximum',
            data: roomInsight.dayInsights.map((data) => data[sensorParam].max),
          },
          {
            label: 'Median',
            data: roomInsight.dayInsights.map(
              (data) => data[sensorParam].median
            ),
          },
          {
            label: 'Average',
            data: roomInsight.dayInsights.map(
              (data) => data[sensorParam].average
            ),
          },
        ],
      },
      options: {
        responsive: true,
      },
    };
  }
  saveInsights() {
    this.electron.saveDatatoDir(this.dataSources);
  }
}
