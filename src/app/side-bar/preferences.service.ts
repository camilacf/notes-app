import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Pref {
  filter: 'text' | 'tag',
  grid: {
    row: number,
    size: '1:1' | '1:2' | '3:4' | '4:5'
  }
}
@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  preferences: BehaviorSubject<Pref> = new BehaviorSubject<Pref>({
    filter: 'text',
    grid: {
      row: 3,
      size: '4:5'
    }
  });
  constructor() { }

  setPreferences(pref: Pref) {
    this.preferences.next(pref);
  }
}
