export interface IUser {
  // id, name, username, email, address, phone, salary in IDR, and salary in USD
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone: string;
  salaryInIDR?: number;
  salaryInUSD?: number;
}

export interface ISalaryInIDR {
  id: number;
  salaryInIDR: number;
}
