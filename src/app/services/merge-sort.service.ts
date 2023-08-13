import { Injectable } from '@angular/core';
import { ArrayWithColor } from '../interface';
import { delay } from './utilityFunctions';
import { ServiceNotifierService } from './service-notifier.service';

@Injectable({
  providedIn: 'root',
})
export class MergeSortService {
  pause = async () => {};
  array: ArrayWithColor[] = [];

  speed = 500;
  isEnd = false;

  constructor(private serviceNotifierService: ServiceNotifierService) {
    serviceNotifierService.speedValue$.subscribe((value) => {
      this.speed = value;
    });
    serviceNotifierService.isEndValue$.subscribe((value) => {
      this.isEnd = value;
    });
  }

  private async merge(
    left: number,
    mid: number,
    right: number,
    last: boolean
  ): Promise<void> {
    let i = left;
    let j = mid + 1;

    while (i <= mid && j <= right) {
      if (!this.isEnd) {
        this.array[i].color = 'green';
        this.array[j].color = 'green';
        await delay(this.speed);
        await this.pause();
        this.array[i].color = 'blue';
        this.array[j].color = 'blue';
      }

      if (this.array[i].value <= this.array[j].value) {
        if (last) this.array[i].color = 'purple';
        i++;
      } else {
        if (!this.isEnd) {
          this.array[i].color = 'red';
          this.array[j].color = 'red';
          await delay(this.speed);
          await this.pause();
        }

        let temp = this.array[j];
        for (let k = j; k > i; k--) this.array[k] = this.array[k - 1];
        this.array[i] = temp;

        if (!this.isEnd) {
          await delay(this.speed);
          await this.pause();

          this.array[i].color = 'blue';
          this.array[i + 1].color = 'blue';
        }

        if (last) {
          this.array[i].color = 'purple';
        }

        i++;
        j++;
        mid++;
      }
    }

    if (last) {
      while (i <= right) this.array[i++].color = 'purple';
    }
  }

  private async mergeSort(left: number, right: number): Promise<void> {
    if (left == right) return;

    let mid = Math.floor(left + (right - left) / 2);
    await this.mergeSort(left, mid);
    await this.mergeSort(mid + 1, right);
    await this.merge(left, mid, right, false);
  }

  async sort(
    array: ArrayWithColor[],
    pause: () => Promise<void>
  ): Promise<void> {
    let n = array.length - 1;
    this.array = array;
    this.pause = pause;

    let mid = Math.floor(n / 2);
    await this.mergeSort(0, mid);
    await this.mergeSort(mid + 1, n);
    await this.merge(0, mid, n, true);
  }
}
