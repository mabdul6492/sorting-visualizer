import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BubbleSortService {
  isComparingEvent = new EventEmitter();
  isSwappingEvent = new EventEmitter();
  isSortedEvent = new EventEmitter();

  constructor() { }

   async sort(array: number[]): Promise<void> {
    const n = array.length;
    let swapped: boolean;

    for(let i = 0; i < n-1; i++){
      swapped = false;

      for(let j = 0; j < n-i-1; j++){
        this.isComparingEvent.emit(j);
        await this.delay(50);
        
        if(array[j] > array[j+1]){
          this.isSwappingEvent.emit(j);
          await this.delay(50);
          
          const temp = array[j];
          array[j] = array[j+1];
          array[j+1] = temp;
          swapped = true;
          
          await this.delay(50);
          this.isSwappingEvent.emit(null);
        }
        this.isComparingEvent.emit(null);
      }
      this.isSortedEvent.emit(n-i-1);
      
      if(!swapped){
        this.isSortedEvent.emit(0);
        break;
      }
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
