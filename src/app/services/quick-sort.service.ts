import { ServiceNotifierService } from './service-notifier.service';
import { Injectable } from '@angular/core';
import { ArrayWithColor } from '../interface';
import { delay } from './delay.utility';

@Injectable({
  providedIn: 'root',
})
export class QuickSortService {
  pause = async () => {};
  speed = 500;

  constructor(private serviceNotifierService: ServiceNotifierService) {
    serviceNotifierService.speedValue$.subscribe(
      (value) => (this.speed = value)
    );
  }

  async sort(arr: ArrayWithColor[], pause: () => Promise<void>): Promise<void> {
    this.pause = pause;
    await this.quickSort(arr, 0, arr.length - 1);
  }

  async quickSort(
    arr: ArrayWithColor[],
    low: number,
    high: number
  ): Promise<void> {
    if (low == high) {
      arr[low].color = 'purple';
      return;
    }
    if (low < high) {
      const pivotIndex = await this.partition(arr, low, high);
      arr[pivotIndex].color = 'purple';
      await this.quickSort(arr, low, pivotIndex - 1);
      await this.quickSort(arr, pivotIndex + 1, high);
    }
  }

  private async partition( arr: ArrayWithColor[], low: number, high: number): Promise<number> {
    const pivot = arr[high].value;

    arr[high].color = 'yellow';
    await delay(this.speed);
    await this.pause();
    
    let i = low;
    for (let j = low; j < high; j++) {
      if(arr[i] != arr[j]){
        arr[i].color = 'green';
        arr[j].color = 'green';
        await delay(this.speed);
        await this.pause();
        arr[i].color = 'blue';
        arr[j].color = 'blue';
      }

      if (arr[j].value < pivot && arr[i] != arr[j]) {
        await this.swap(arr, i, j);
        i++;
      }
    }
    
    await this.swap(arr, i, high);
    arr[high].color = 'blue';
    return i;
  }

  private async swap( arr: ArrayWithColor[], i: number, j: number): Promise<void> {
    arr[i].color = 'red';
    arr[j].color = 'red';
    await delay(this.speed);
    await this.pause();

    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;

    await delay(this.speed);
    await this.pause();
    arr[i].color = 'blue';
    arr[j].color = 'blue';
  }
}
