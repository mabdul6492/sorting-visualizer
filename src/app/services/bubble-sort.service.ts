import { Injectable } from '@angular/core';
import { ArrayWithColor } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class BubbleSortService {

  constructor() { }

   async sort(array: ArrayWithColor[], speed: number): Promise<void> {
    const n = array.length;
    let swapped: boolean;
    speed = 1001-speed;

    for(let i = 0; i < n-1; i++){
      swapped = false;

      for(let j = 0; j < n-i-1; j++){
        array[j].color = 'green';
        array[j+1].color = 'green';
        await this.delay(speed);
        
        if(array[j].value > array[j+1].value){
          array[j].color = 'red';
          array[j+1].color = 'red';
          await this.delay(speed);
          
          const temp = array[j].value;
          array[j].value = array[j+1].value;
          array[j+1].value = temp;
          swapped = true;
          
          await this.delay(speed);
        }
        array[j].color = 'blue';
        array[j+1].color = 'blue';
      }
      array[n-i-1].color = 'purple';
      
      if(!swapped){
        for(let k = 0; k < n; k++) array[k].color = 'purple';
        break;
      }
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
