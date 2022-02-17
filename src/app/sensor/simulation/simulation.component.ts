import { Component } from '@angular/core';
import { ElectronService } from '../../core/services';
import { GroupingService } from '../grouping.service';
import { IRawData, IRoomInsight } from '../sensor-model';
import { SimulationService } from '../simulation.service';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss'],
})
export class SimulationComponent {
  counter: number;
  roomInsights: IRoomInsight[];
  numRoom = 1;
  period = 2;
  disableNumRoom = true;
  filePath: string;
  simActive = false;
  constructor(
    private electron: ElectronService,
    private simulation: SimulationService,
    private grouping: GroupingService
  ) {}

  selectFileDirBtn() {
    this.electron
      .selectFileDir()
      .then((res) => {
        this.filePath = res.filePath;
      })
      .catch(() => {});
  }

  startSimulation() {
    this.simActive = true;
    const simData: IRawData[] = [];
    this.roomInsights = [];
    this.electron.createJSONFile(this.filePath);
    let i = 0;
    this.counter = window.setInterval(() => {
      this.simulateData(simData,i);
      i++;
    }, this.period*1000);
  }

  stopSimulation() {
    this.simActive = false;
    window.clearInterval(this.counter);
    this.grouping.simulationComplete(this.filePath);
  }

  simulateData = (simData: IRawData[], x: number) => {
    const newDummyDatas = this.simulation.getDummyDatas(
      x * this.numRoom,
      this.numRoom,
      new Date()
    );
    simData.push(...newDummyDatas);
    this.roomInsights = this.grouping.getAllInsights(simData);
    this.electron.appendToJSONFile(this.filePath, newDummyDatas);
  };
}
