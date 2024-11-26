import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'several'
})
export class SeveralPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'Bajo':
        return `color: #2676ef`;
      case 'Medio':
        return `color: #4e13a0`;
      case 'Crítico':
        return `color: #a01a13`;
      case 'Alto':
          return `color: #ef4426`;
      default:
        return '';
    }
  }
}
