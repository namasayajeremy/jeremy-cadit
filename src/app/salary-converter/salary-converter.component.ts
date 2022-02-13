import { Component } from '@angular/core';
import { ElectronService } from '../core/services/electron/electron.service';
import { SalaryService } from './salary.service';
import { ISalaryInIDR, IUser } from './salary-model';

@Component({
  selector: 'app-salary-converter',
  templateUrl: './salary-converter.component.html',
  styleUrls: ['./salary-converter.component.scss'],
})
export class SalaryConverterComponent {
  userDatas: IUser[] | null;
  dataSourceLink = 'http://jsonplaceholder.typicode.com/users';
  disableFetchBtn = false;
  disableAddSlryBtn = true;
  displayedColumns: string[] = [
    'id',
    'name',
    'username',
    'email',
    'address',
    'phone',
  ];
  constructor(
    private salary: SalaryService,
    private electron: ElectronService
  ) {}

  fetchUserBtn(dataSourceLink: string) {
    this.salary
      .getUserData(dataSourceLink)
      .then((res) => (this.userDatas = res))
      .then(() => {
        this.disableFetchBtn = true;
        this.disableAddSlryBtn = false;
      });
  }
  async addSalaryBtn() {
    const salaries = await this.electron //get salary data from file dialog
      .openDialog()
      .then(this.isSalaryData);// returns the data if it contains salary data
    if (salaries) {
      //appends salary data to user data
      const modifiedUsers = await this.salary.addSalaries(salaries, this.userDatas);
      this.userDatas = modifiedUsers;
      //display data
      if (!this.displayedColumns.includes('salaryInIDR')) {
        this.displayedColumns.push('salaryInIDR', 'salaryInUSD');
      }
    } else {
      this.salary.wrongFile();
    }
  }

  isSalaryData(salaries: ISalaryInIDR[]): ISalaryInIDR[] {
    return salaries[0].salaryInIDR ? salaries : null;
  }
}
