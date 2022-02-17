import { Component, OnInit } from '@angular/core';
import { IRoomInsight } from '../sensor-model';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent implements OnInit {
  roomInsights: IRoomInsight[];
  constructor() { }

  ngOnInit(): void {
  }

}
