import { EventEmitter, Injectable } from '@angular/core';
import { ArrayWithColor } from '../interface';
import { delay } from './delay.utility';
import { ServiceNotifierService } from './service-notifier.service';

@Injectable({
  providedIn: 'root',
})
export class SelectionSortService {
  
  speed = 500;
  isEnd = false;

  constructor( private serviceNotifierService: ServiceNotifierService) {
    serviceNotifierService.speedValue$.subscribe((value) => {this.speed = value});
    serviceNotifierService.isEndValue$.subscribe((value) => {this.isEnd = value});
  }

  async sort(array: ArrayWithColor[], pause: () => Promise<void>): Promise<void> {
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;

      for (let j = i + 1; j < n; j++) {
        if(!this.isEnd){
          array[j].color = "green";
          array[minIndex].color = "green";
          await delay(this.speed);
          await pause();
          array[j].color = "blue";
          array[minIndex].color = "blue";
        }
        
        if (array[j].value < array[minIndex].value) {
          minIndex = j;
        }
      }
      
      if (minIndex != i) {
        if(!this.isEnd){
          array[i].color = "red";
          array[minIndex].color = "red";
          await delay(this.speed);
          await pause();
        }
        
        const temp = array[i].value;
        array[i].value = array[minIndex].value;
        array[minIndex].value = temp;
        if(!this.isEnd){
          await delay(this.speed);
          await pause();
        }
      }
      
      if(!this.isEnd) array[minIndex].color = "blue";
      array[i].color = "purple";
      if(!this.isEnd){
        await delay(this.speed);
        await pause();
      }
    }
    array[n-1].color = "purple";
  }
}
