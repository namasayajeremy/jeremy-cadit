import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectronService } from '../core/services';

import { FileComponent } from './file/file.component';
import { SimulationComponent } from './simulation/simulation.component';
import { ChartComponent } from './chart/chart.component';

import { NgChartsModule } from 'ng2-charts';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';

import { GroupingService } from './grouping.service';
import { SimulationService } from './simulation.service';
import { MathService } from './math.service';

@NgModule({
  declarations: [ChartComponent, FileComponent, SimulationComponent],
  imports: [CommonModule, NgChartsModule, MatButtonModule, MatButtonToggleModule, MatCardModule],
  providers: [ElectronService, GroupingService, MathService, SimulationService],
})
export class SensorModule {}
