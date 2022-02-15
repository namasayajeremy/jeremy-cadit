import { Component } from '@angular/core';
import { ElectronService } from '../../core/services';
import { GroupingService } from '../grouping.service';
import { IInsightsContainer } from '../sensor-model';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent {
  allInsights: IInsightsContainer | null;
  roomDayToggle: string | null;
  constructor(
    private electron: ElectronService,
    private grouping: GroupingService
  ) {}

  openSensorFileBtn() {
    this.electron
      .openDialog()
      .then((res) => {
        this.grouping.openSuccess(res.path);
        return this.grouping.isSensorData(res.data);
      })
      .then((sensorDatas) => {
        if (sensorDatas) {
          this.allInsights = this.grouping.getAllInsights(sensorDatas);
          if (!this.roomDayToggle) {
            this.grouping.hintNotif();
          }
        } else {
          this.grouping.wrongFile();
        }
      });
  }

  startSimulationBtn() {}

  stopSimulationBtn() {}
}
