import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileComponent } from './file/file.component';
import { SimulationComponent } from './simulation/simulation.component';



@NgModule({
  declarations: [
    FileComponent,
    SimulationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SensorModule { }
