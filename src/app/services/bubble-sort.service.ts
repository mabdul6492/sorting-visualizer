import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BubbleSortService {

  constructor() { }

   async sort(array: number[]): Promise<void> {
    const n = array.length;
    let swapped: boolean;

    for(let i = 0; i < n-1; i++){
      swapped = false;

      for(let j = 0; j < n-i-1; j++){
        if(array[j] > array[j+1]){
          const temp = array[j];
          array[j] = array[j+1];
          array[j+1] = temp;
          swapped = true;
        }

        await this.delay(50);
      }

      if(!swapped) break;
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
