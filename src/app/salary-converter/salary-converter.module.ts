import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

import { SalaryConverterComponent } from './salary-converter.component';
import { ElectronService } from '../core/services';
import { SalaryService } from './salary.service';

@NgModule({
  declarations: [SalaryConverterComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
  ],
  providers: [ElectronService, SalaryService],
})
export class SalaryConverterModule {}
