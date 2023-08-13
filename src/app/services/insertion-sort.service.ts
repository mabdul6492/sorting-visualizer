import { Injectable } from '@angular/core';
import { ServiceNotifierService } from './service-notifier.service';
import { ArrayWithColor } from '../interface';
import { delay } from './utilityFunctions';

@Injectable({
  providedIn: 'root',
})
export class InsertionSortService {
  speed = 500;
  isEnd = false;
  pause = async () => {};

  constructor(private serviceNotifierService: ServiceNotifierService) {
    serviceNotifierService.speedValue$.subscribe(
      (value) => (this.speed = value)
    );
    serviceNotifierService.isEndValue$.subscribe(
      (value) => (this.isEnd = value)
    );
  }

  async sort(
    array: ArrayWithColor[],
    pause: () => Promise<void>
  ): Promise<void> {
    this.pause = pause;
    let n = array.length;

    array[0].color = 'purple';
    for (let i = 1; i < n; i++) {
      if (!this.isEnd) {
        array[i].color = 'yellow';
        await delay(this.speed);
        await pause();
      }

      let j = i - 1;
      while (j >= 0 && array[j].value > array[j + 1].value) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        j--;
        if (!this.isEnd) {
          await delay(this.speed);
          await pause();
        }
      }

      array[j + 1].color = 'purple';
      if (!this.isEnd) {
        await delay(this.speed);
        await pause();
      }
    }
  }
}
