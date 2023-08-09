import { Component } from '@angular/core';

import { SelectionSortService } from './../services/selection-sort.service';
import { ArrayGeneratorService } from '../services/array-generator.service';
import { BubbleSortService } from '../services/bubble-sort.service';

@Component({
  selector: 'app-array-display',
  templateUrl: './array-display.component.html',
  styleUrls: ['./array-display.component.css'],
})
export class ArrayDisplayComponent {
  public myArray: number[] = [];
  isComparing: number | null = null;
  isSwapping: number | null = null;
  isSorted: number | null = null;
  isSorting = false;
  public size = 10;

  constructor(
    private randomArrayGenerator: ArrayGeneratorService,
    private bubbleSortService: BubbleSortService,
    private selectionSortService: SelectionSortService
  ) {
    bubbleSortService.isComparingEvent.subscribe((index) => {
      this.isComparing = index;
    });
    bubbleSortService.isSwappingEvent.subscribe((index) => {
      this.isSwapping = index;
    });
    bubbleSortService.isSortedEvent.subscribe((index) => {
      this.isSorted = index;
    });

    selectionSortService.isComparingEvent.subscribe((index) => {
      this.isComparing = index;
    });
    selectionSortService.isSwappingEvent.subscribe((index) => {
      this.isSwapping = index;
    });
    selectionSortService.isSortedEvent.subscribe((index) => {
      this.isSorted = index;
    });

    this.generateArray();
  }

  public generateArray(): void {
    this.isSorted = null;
    this.myArray = this.randomArrayGenerator.getRandomArray(this.size);
  }

  public sort(): void {
    this.isSorted = null;
    this.bubbleSortService.sort(this.myArray);
  }

  public selectionSort(): void {
    this.isSorted = null;
    this.selectionSortService.sort(this.myArray);
  }
}
