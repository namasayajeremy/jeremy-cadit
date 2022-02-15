import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectronService } from '../core/services';

import { ContainerComponent } from './container/container.component';
import { ChartComponent } from './chart/chart.component';

import { NgChartsModule } from 'ng2-charts';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { GroupingService } from './grouping.service';
import { SimulationService } from './simulation.service';
import { MathService } from './math.service';

@NgModule({
  declarations: [ContainerComponent, ChartComponent],
  imports: [CommonModule, NgChartsModule, MatButtonModule, MatButtonToggleModule],
  providers: [ElectronService, GroupingService, MathService, SimulationService],
})
export class SensorModule {}
