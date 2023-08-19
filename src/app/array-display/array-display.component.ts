import { QuickSortService } from './../services/quick-sort.service';
import { HeapSortService } from './../services/heap-sort.service';
import { ServiceNotifierService } from './../services/service-notifier.service';
import { MergeSortService } from './../services/merge-sort.service';
import { Component, HostListener } from '@angular/core';

import { SelectionSortService } from './../services/selection-sort.service';
import { BubbleSortService } from '../services/bubble-sort.service';
import { ArrayWithColor } from '../interface';
import {
  delay,
  generateUserArray,
  getRandomArray,
} from '../services/utilityFunctions';
import { InsertionSortService } from '../services/insertion-sort.service';

@Component({
  selector: 'app-array-display',
  templateUrl: './array-display.component.html',
  styleUrls: ['./array-display.component.css'],
})
export class ArrayDisplayComponent {
  public myArray: ArrayWithColor[] = [];
  public size = 10;
  public speed = 500;
  private originalSpeed = this.speed;
  private stepSpeed = 995;
  public isSorting = false;
  private isEnd = false;
  private isPause = false;
  public algoName: string = 'Algorithm';
  public userArray = '10, 20, 30, 40, 50';

  private pause = async () => {
    while (this.isPause) {
      await delay(this.stepSpeed);
    }
  };

  constructor(
    private serviceNotifierService: ServiceNotifierService,
    private bubbleSortService: BubbleSortService,
    private selectionSortService: SelectionSortService,
    private mergeSortService: MergeSortService,
    private heapSortService: HeapSortService,
    private quickSortService: QuickSortService,
    private insertionSortService: InsertionSortService
  ) {
    this.generateArray();
  }

  public userInputArray(): void {
    this.myArray = generateUserArray(this.userArray);
  }

  public generateArray(): void {
    this.myArray = getRandomArray(this.size);
  }

  public endSort(): void {
    if (this.isSorting) this.isEnd = true;
    else this.isEnd = false;
    this.serviceNotifierService.endSort(this.isEnd);
  }

  public changeSpeed(newSpeed?: number): void {
    if (newSpeed) this.speed = newSpeed;
    else this.originalSpeed = this.speed;
    this.serviceNotifierService.speedChange(this.speed);
  }

  @HostListener('document: keydown', ['$event'])
  async pauseOrResume(event: KeyboardEvent): Promise<void> {
    if (event.key === ' ') {
      if (!this.isPause) this.originalSpeed = this.speed;
      else this.changeSpeed(this.originalSpeed);

      this.isPause = !this.isPause;
    } else if (event.key.toLowerCase() === 'n' && this.isPause) {
      this.changeSpeed(this.stepSpeed);
      this.isPause = !this.isPause;
      await delay(this.stepSpeed);
      this.isPause = !this.isPause;
    }
  }

  async sort(algo: string): Promise<void> {
    this.algoName = algo;
    this.isSorting = true;
    this.isPause = false;
    for (let i = 0; i < this.myArray.length; i++)
      this.myArray[i].color = 'blue';

    let algorithm;
    switch (algo) {
      case 'bubble sort':
        algorithm = this.bubbleSortService;
        break;
      case 'selection sort':
        algorithm = this.selectionSortService;
        break;
      case 'merge sort':
        algorithm = this.mergeSortService;
        break;
      case 'heap sort':
        algorithm = this.heapSortService;
        break;
      case 'quick sort':
        algorithm = this.quickSortService;
        break;
      case 'insertion sort':
        algorithm = this.insertionSortService;
        break;
    }

    if (algorithm) await algorithm.sort(this.myArray, this.pause);

    this.isSorting = false;
    this.endSort();
  }
}
