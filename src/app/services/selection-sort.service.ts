import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SelectionSortService {
  isComparingEvent = new EventEmitter();
  isSwappingEvent = new EventEmitter();
  isSortedEvent = new EventEmitter();
  constructor() {}

  async sort(arr: number[]): Promise<void> {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;

      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      this.isComparingEvent.emit(minIndex);
      await this.delay(2000);
      if (minIndex !== i) {
        await this.delay(2000);
        this.isSwappingEvent.emit(minIndex);
        const temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
      }
      this.isComparingEvent.emit(null);
      this.isSortedEvent.emit(n - i);
    }
    this.isSwappingEvent.emit(null);
    this.isSortedEvent.emit(0);
    await this.delay(2000);
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
