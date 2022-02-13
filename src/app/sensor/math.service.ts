import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MathService {
  minimum(arr: number[]) {
    return this.round(arr[0]);
  }
  maximum(arr: number[]) {
    return this.round(arr[arr.length - 1]);
  }
  median(arr: number[]) {
    return this.round(
      arr.length % 2 === 0
        ? (arr[arr.length / 2] + arr[arr.length / 2 + 1]) / 2
        : arr[(arr.length + 1) / 2]
    );
  }
  average(arr: number[]) {
    return this.round(arr.reduce((a, b) => a + b, 0) / arr.length);
  }

  round(num: number) {
    const dec = 1000;
    return Math.round(num * dec) / dec;
  }
}
