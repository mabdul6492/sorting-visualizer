import { EventEmitter, Injectable } from '@angular/core';
import { ArrayWithColor } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class SelectionSortService {
  
  constructor() {}

  async sort(array: ArrayWithColor[], speed: number): Promise<void> {
    const n = array.length;
    speed = 1001-speed;

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;

      for (let j = i + 1; j < n; j++) {
        array[j].color = "green";
        array[minIndex].color = "green";
        await this.delay(speed);

        array[j].color = "blue";
        array[minIndex].color = "blue";
        if (array[j].value < array[minIndex].value) {
          minIndex = j;
        }
      }
      
      if (minIndex != i) {
        array[i].color = "red";
        array[minIndex].color = "red";
        await this.delay(speed);

        const temp = array[i].value;
        array[i].value = array[minIndex].value;
        array[minIndex].value = temp;
        await this.delay(speed);
      }

      array[minIndex].color = "blue";
      array[i].color = "purple";
      await this.delay(speed);
    }
    array[n-1].color = "purple";
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
