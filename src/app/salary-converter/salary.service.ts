import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISalaryInIDR, IUser } from './salary-model';

@Injectable({
  providedIn: 'root',
})
export class SalaryService {
  constructor(private snackbar: MatSnackBar) {}
  async getUserData(link: string) {
    return await fetch(link)
      .then((res) => res.json())
      .catch((error) => console.error(error));
  }

  async getUSDCurrencyRate() {
    return await fetch(
      'https://freecurrencyapi.net/api/v2/latest?apikey=87d1c6f0-8a36-11ec-b37d-d790b142c27c'
    )
      .then((res) => res.json())
      .catch((error) => console.log(error));
  }

  async addSalaries(salaries: ISalaryInIDR[], userDatas: IUser[]) {
    //get usd currency rate
    let usdCurrencyRate: number;
    await this.getUSDCurrencyRate().then((res) => {
      usdCurrencyRate = res.data.IDR;
    });
    return userDatas.map((userData) => {
      //find salary data of user using their ids
      const salaryInIDRObj = salaries.find(
        (salary) => salary.id === userData.id
      );
      //if such salary exist
      if (salaryInIDRObj) {
        //add salary data to the user object
        return {
          ...userData,
          salaryInIDR: this.round(salaryInIDRObj.salaryInIDR),
          salaryInUSD: this.round(salaryInIDRObj.salaryInIDR / usdCurrencyRate),
        };
      } else {
        return userData;
      }
    });
  }


  //#region other functions
  round(num: number) {
    const dec = 100;
    return Math.round(num * dec) / dec;
  }

  isSalaryData(salaries: ISalaryInIDR[]): ISalaryInIDR[] {
    return salaries[0].salaryInIDR ? salaries : null;
  }

  openSuccess(path?: string) {
    if(path){
      this.snackbar.open(`File path: ${path}`, 'Close');
    }
  }

  wrongFile() {
    this.snackbar.open(
      'Wrong file! Please try again and make sure its the salary file.',
      'Close',
      { duration: 3000 }
    );
  }
  //#endregion
}
