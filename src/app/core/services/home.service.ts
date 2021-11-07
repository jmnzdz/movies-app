import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  title$!: BehaviorSubject<string>;
  title: string = $localize`:Movies text@@movies.text:Movies`;

  constructor() {
    this.title$ = new BehaviorSubject(this.title);
  }
}
