import { ServiceNotifierService } from './service-notifier.service';
import { Injectable } from '@angular/core';
import { ArrayWithColor } from '../interface';
import { delay } from './utilityFunctions';

@Injectable({
  providedIn: 'root',
})
export class HeapSortService {
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

  async swap(pIndex: number, minIndex: number): Promise<void> {
    if (!this.isEnd) {
      this.array[pIndex].color = 'red';
      this.array[minIndex].color = 'red';
      await delay(this.speed);
      await this.pause();
    }

    let temp = this.array[pIndex];
    this.array[pIndex] = this.array[minIndex];
    this.array[minIndex] = temp;

    if (!this.isEnd) {
      await delay(this.speed);
      await this.pause();
      this.array[pIndex].color = 'blue';
      this.array[minIndex].color = 'blue';
    }
  }

  async downHeapify(pIndex: number, arrSize: number): Promise<void> {
    let lIndex = 2 * pIndex + 1;
    let rIndex = 2 * pIndex + 2;
    let minIndex = pIndex;

    if (!this.isEnd) {
      if (lIndex < arrSize) {
        this.array[pIndex].color = 'green';
        this.array[lIndex].color = 'green';
      } else return;
      if (rIndex < arrSize) this.array[rIndex].color = 'green';
    }

    if (
      lIndex < arrSize &&
      this.array[lIndex].value > this.array[minIndex].value
    ) {
      minIndex = lIndex;
    }

    if (
      rIndex < arrSize &&
      this.array[rIndex].value > this.array[minIndex].value
    ) {
      minIndex = rIndex;
    }
    if (!this.isEnd) {
      await delay(this.speed);
      await this.pause();
      if (lIndex < arrSize) this.array[lIndex].color = 'blue';
      this.array[pIndex].color = 'blue';
      if (rIndex < arrSize) this.array[rIndex].color = 'blue';
    }

    if (pIndex != minIndex) {
      await this.swap(pIndex, minIndex);
      await this.downHeapify(minIndex, arrSize);
    }
  }

  async sort(
    array: ArrayWithColor[],
    pause: () => Promise<void>
  ): Promise<void> {
    this.pause = pause;
    this.array = array;
    let n = array.length;
    let pIndex = Math.floor(n / 2) - 1;

    for (let i = pIndex; i >= 0; i--) await this.downHeapify(i, n);

    for (let i = n - 1; i > 0; i--) {
      await this.swap(0, i);
      await this.downHeapify(0, i);
      this.array[i].color = 'purple';
    }
    this.array[0].color = 'purple';
  }
}
