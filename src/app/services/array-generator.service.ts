import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ArrayGeneratorService {
  private randomArray: number[] = [];

  constructor() {}

  private generateRandomArray(size: number): void {
    this.randomArray = [];
    for(let i = 0; i < size; i++){
      const randomNumber = this.getRandomNumber();
      this.randomArray.push(randomNumber);
    }
  }
  private getRandomNumber() {
    return (Math.floor(Math.random() * 200) + 10);
  }

  public getRandomArray(size: number): number[] {
    this.generateRandomArray(size);
    return this.randomArray;
  }
}

