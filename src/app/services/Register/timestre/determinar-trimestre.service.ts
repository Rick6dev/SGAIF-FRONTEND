import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeterminarTrimestreService {
  constructor() {}

  determineTrimestre(currentMonth: number): string {
    if (currentMonth > 0 && currentMonth <= 3) {
      return '1er Trimestre ';
    } else if (currentMonth > 3 && currentMonth <= 6) {
      return '2do Trimestre';
    } else if (currentMonth > 6 && currentMonth <= 9) {
      return '3er Trimestre';
    } else if (currentMonth > 9 && currentMonth <= 12) {
      return '4to Trimestre ';
    } else {
      return 'Invalid month';
    }
  }
}
