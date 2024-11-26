
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaCompare'
})
export class FechaComparePipe implements PipeTransform {

  transform(value: string): Date {
    const date = new Date(value); // Convierte la cadena a un objeto Date

    // Ajusta la fecha sumando 3 días
    date.setDate(date.getDate() + 3);

    // Devuelve la fecha en formato día-mes-año
    const a: any = date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });

    return a
  }
}