import { Component } from '@angular/core';
import { ElectronService } from '../../core/services';
import { GroupingService } from '../grouping.service';
import { IRoomInsight } from '../sensor-model';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent {
  roomInsights: IRoomInsight[];
  constructor(
    private electron: ElectronService,
    private grouping: GroupingService
  ) {}

  openSensorFileBtn() {
    this.electron
      .openFileDialog()
      .then((res) => {
        this.grouping.successReadNotif(res.path);
        return this.grouping.isSensorData(res.data);
      })
      .then((sensorDatas) => {
        if (sensorDatas) {
          this.roomInsights = this.grouping.getAllInsights(
            sensorDatas
          );
        } else {
          this.grouping.wrongFileNotif();
        }
      });
  }
}
