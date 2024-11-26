import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaFormat2'
})
export class FechaFormat2Pipe implements PipeTransform {


  transform(value: string): string {
    const date = new Date(value);

    return `${date.getDate()+1 }-${date.getMonth() + 1}-${date.getFullYear()}`;}

}
