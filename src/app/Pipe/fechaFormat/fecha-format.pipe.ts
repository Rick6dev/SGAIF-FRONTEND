import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaFormat'
})
export class FechaFormatPipe implements PipeTransform {

  transform(value: string): string {
    const date = new Date(value);

    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  }

}
