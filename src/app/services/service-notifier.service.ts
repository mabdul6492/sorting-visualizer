import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceNotifierService {
  private speed = new Subject<number>();
  speedValue$ = this.speed.asObservable();

  private isEnd = new Subject<boolean>();
  isEndValue$ = this.isEnd.asObservable();

  speedChange(newSpeed: number): void {
    this.speed.next(newSpeed);
  }

  endSort(flag: boolean): void {
    this.isEnd.next(flag);
  }
}
