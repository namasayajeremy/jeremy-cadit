import { Component, OnInit } from '@angular/core';
import { interval, Observable, takeWhile } from 'rxjs';
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
  roomInsights: IRoomInsight[];
  numRoom = 1;
  disableNumRoom = true;
  filePath: string;
  simActive = false;
  counter$ = interval(2000).pipe(takeWhile(() => this.simActive));
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
    console.log(simData);
    this.counter$.subscribe((x) => {
      this.simulateData(simData,x);
    });
  }

  stopSimulation() {
    this.simActive = false;
    this.grouping.simulationComplete(this.filePath);
  }

  simulateData = (simData: IRawData[], x: number) => {
    const newDummyDatas = this.simulation.getDummyDatas(
      x * this.numRoom,
      this.numRoom
    );
    simData.push(...newDummyDatas);
    this.roomInsights = this.grouping.getAllInsights(simData);
    this.electron.appendToJSONFile(this.filePath, newDummyDatas);
  };
}
