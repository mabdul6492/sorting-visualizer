import { Injectable } from '@angular/core';
import { ArrayWithColor } from '../interface';

@Injectable({
  providedIn: 'root'
})

export class ArrayGeneratorService {
  private randomArray: ArrayWithColor[] = [];

  constructor() {}

  private generateRandomArray(size: number): void {
    this.randomArray = [];
    for(let i = 0; i < size; i++){
      const randomNumber = this.getRandomNumber();
      this.randomArray.push({value: randomNumber, color: 'blue'});
    }
  }
  
  private getRandomNumber() {
    return (Math.floor(Math.random() * 200) + 10);
  }

  public getRandomArray(size: number): ArrayWithColor[] {
    this.generateRandomArray(size);
    return this.randomArray;
  }
}

