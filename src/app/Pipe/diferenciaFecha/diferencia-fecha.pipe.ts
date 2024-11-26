import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diferenciaFecha',
})
export class DiferenciaFechaPipe implements PipeTransform {
  transform(fechaInicio: Date, fechaFin: Date): number {
    const fI = new Date(fechaInicio);
    const fC = new Date(fechaFin);
    const diferenciaEnMilisegundos = fC.getTime() - fI.getTime();
    return Math.ceil(diferenciaEnMilisegundos / (1000 * 3600 * 24));
  }
}
