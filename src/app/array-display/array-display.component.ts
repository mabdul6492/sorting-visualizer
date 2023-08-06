import { Component } from '@angular/core';
import { ArrayGeneratorService } from '../services/array-generator.service';
import { BubbleSortService } from '../services/bubble-sort.service';

@Component({
  selector: 'app-array-display',
  templateUrl: './array-display.component.html',
  styleUrls: ['./array-display.component.css']
})


export class ArrayDisplayComponent {
  public myArray: number[] = [];
  public size = 20;

  constructor(private randomArrayGenerator: ArrayGeneratorService, private bubbleSortService: BubbleSortService){
    this.generateArray();
  }

  public generateArray(): void {
    this.myArray = this.randomArrayGenerator.getRandomArray(this.size);
  }

  public sort(): void {
    this.bubbleSortService.sort(this.myArray);
  }
}
