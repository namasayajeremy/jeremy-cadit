import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SalaryConverterComponent } from './salary-converter/salary-converter.component';
import { FileComponent } from './sensor/file/file.component';
import { SimulationComponent } from './sensor/simulation/simulation.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'salary',
    component: SalaryConverterComponent,
  },
  {
    path: 'sensor',
    children: [
      {
        path: 'file',
        component: FileComponent,
      },
      {
        path: 'simulation',
        component: SimulationComponent,
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
