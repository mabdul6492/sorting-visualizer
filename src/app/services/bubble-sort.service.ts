import { ServiceNotifierService } from './service-notifier.service';
import { Injectable } from '@angular/core';
import { ArrayWithColor } from '../interface';
import { delay } from './delay.utility';

@Injectable({
  providedIn: 'root',
})
export class BubbleSortService {

  speed = 500;
  isEnd = false;

  constructor( private serviceNotifierService: ServiceNotifierService) {
    serviceNotifierService.speedValue$.subscribe((value) => {this.speed = value});
    serviceNotifierService.isEndValue$.subscribe((value) => {this.isEnd = value});
  }

  async sort(array: ArrayWithColor[], pause: () => Promise<void>): Promise<void> {
    const n = array.length;
    let swapped: boolean;

    for (let i = 0; i < n - 1; i++) {
      swapped = false;

      for (let j = 0; j < n - i - 1; j++) {
        if(!this.isEnd){
          array[j].color = 'green';
          array[j + 1].color = 'green';
          await delay(this.speed);
          await pause();
        }
        
        if (array[j].value > array[j + 1].value) {
          if(!this.isEnd){
            array[j].color = 'red';
            array[j + 1].color = 'red';
            await delay(this.speed);
            await pause();
          }
          
          const temp = array[j].value;
          array[j].value = array[j + 1].value;
          array[j + 1].value = temp;
          swapped = true;
          
          if(!this.isEnd){
            await delay(this.speed);
            await pause();
          }
        }

        if(!this.isEnd){
          array[j].color = 'blue';
          array[j + 1].color = 'blue';
        }
      }
      array[n - i - 1].color = 'purple';

      if (!swapped) {
        for (let k = 0; k < n; k++) array[k].color = 'purple';
        break;
      }
    }
    array[0].color = 'purple';
  }
}
