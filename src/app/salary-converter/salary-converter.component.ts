import { Component } from '@angular/core';
import { ElectronService } from '../core/services/electron/electron.service';
import { SalaryService } from './salary.service';
import { IUser } from './salary-model';

@Component({
  selector: 'app-salary-converter',
  templateUrl: './salary-converter.component.html',
  styleUrls: ['./salary-converter.component.scss'],
})
export class SalaryConverterComponent {
  userDatas: IUser[] | null;
  dataSourceLink = 'http://jsonplaceholder.typicode.com/users';
  disableFetchBtn = false;
  disableOpenSlryBtn = true;
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
        this.disableOpenSlryBtn = false;
      });
  }
  openSalaryBtn() {
    this.electron //get salary data from file dialog
      .openFileDialog()
      .then((res) => {
        //send file path notification and checks data model
        this.salary.successReadNotif(res.path);
        return this.salary.isSalaryData(res.data);
      })
      .then((salaries) => {
        //isSalaryData() returns null if false
        if (salaries) {
          //appends salary data to user data
          this.salary
            .assignSalaries(salaries, this.userDatas)
            .then((modifiedUsers) => {
              this.userDatas = modifiedUsers;
              //if this is the first time adding salaries, push salary column
              if (!this.displayedColumns.includes('salaryInIDR')) {
                this.displayedColumns.push('salaryInIDR', 'salaryInUSD');
              }
            });
        } else {
          this.salary.wrongFileNotif();
        }
      });
  }
}
