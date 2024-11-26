import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaInforme'
})
export class FechaInformePipe implements PipeTransform {

  transform(value: string): Date {
    const date = new Date(value); // Convierte la cadena a un objeto Date



    // Devuelve la fecha en formato día-mes-año
    const a: any = date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });

    return a;
  }

}
