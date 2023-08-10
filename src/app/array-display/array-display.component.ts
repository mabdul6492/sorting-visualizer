import { Component } from '@angular/core';

import { SelectionSortService } from './../services/selection-sort.service';
import { ArrayGeneratorService } from '../services/array-generator.service';
import { BubbleSortService } from '../services/bubble-sort.service';
import { ArrayWithColor } from '../interface';

@Component({
  selector: 'app-array-display',
  templateUrl: './array-display.component.html',
  styleUrls: ['./array-display.component.css'],
})
export class ArrayDisplayComponent {
  public myArray: ArrayWithColor[] = [];
  public size = 15;
  public speed = 500;
  public isSorting = false;

  constructor(
    private randomArrayGenerator: ArrayGeneratorService,
    private bubbleSortService: BubbleSortService,
    private selectionSortService: SelectionSortService
  ) {
    this.generateArray();
  }

  public generateArray(): void {
    this.myArray = this.randomArrayGenerator.getRandomArray(this.size);
  }

  async sort(algo: string): Promise<void> {
    this.isSorting = true;
    for(let i = 0; i < this.myArray.length; i++) this.myArray[i].color = "blue";
    if(algo == "bubble-sort") await this.bubbleSortService.sort(this.myArray, this.speed);
    else if(algo == "selection-sort") await this.selectionSortService.sort(this.myArray, this.speed);
    this.isSorting = false;
  }

}
