import { ServiceNotifierService } from './service-notifier.service';
import { Injectable } from '@angular/core';
import { ArrayWithColor } from '../interface';
import { delay } from './utilityFunctions';

@Injectable({
  providedIn: 'root',
})
export class QuickSortService {
  pause = async () => {};
  speed = 500;
  isEnd = false;

  constructor(private serviceNotifierService: ServiceNotifierService) {
    serviceNotifierService.speedValue$.subscribe(
      (value) => (this.speed = value)
    );
    serviceNotifierService.isEndValue$.subscribe(
      (value) => (this.isEnd = value)
    );
  }

  async sort(arr: ArrayWithColor[], pause: () => Promise<void>): Promise<void> {
    this.pause = pause;
    await this.quickSort(arr, 0, arr.length - 1);
  }

  private async quickSort(
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

  private async partition(
    arr: ArrayWithColor[],
    low: number,
    high: number
  ): Promise<number> {
    const pivot = arr[high].value;
    let i = low;
    let j = high - 1;
    if (!this.isEnd) {
      arr[high].color = 'yellow';
      await delay(this.speed);
      await this.pause();
    }

    while (true) {
      while (arr[i].value < pivot) {
        if (!this.isEnd) {
          arr[i].color = 'green';
          arr[j].color = 'green';
          await delay(this.speed);
          await this.pause();
          arr[i].color = 'blue';
          arr[j].color = 'blue';
        }
        i++;
      }
      while (j >= low && arr[j].value > pivot) {
        if (!this.isEnd) {
          arr[i].color = 'green';
          arr[j].color = 'green';
          await delay(this.speed);
          await this.pause();
          arr[i].color = 'blue';
          arr[j].color = 'blue';
        }
        j--;
      }

      if (i >= j) {
        await this.swap(arr, i, high);
        return i;
      }

      if (!this.isEnd) {
        arr[i].color = 'green';
        arr[j].color = 'green';
        await delay(this.speed);
        await this.pause();
        arr[i].color = 'blue';
        arr[j].color = 'blue';
      }
      await this.swap(arr, i, j);
      i++;
      j--;
    }
  }

  private async swap(
    arr: ArrayWithColor[],
    i: number,
    j: number
  ): Promise<void> {
    if (i == j) return;

    if (!this.isEnd) {
      arr[i].color = 'red';
      arr[j].color = 'red';
      await delay(this.speed);
      await this.pause();
    }

    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;

    if (!this.isEnd) {
      await delay(this.speed);
      await this.pause();
      arr[i].color = 'blue';
      arr[j].color = 'blue';
    }
  }
}
