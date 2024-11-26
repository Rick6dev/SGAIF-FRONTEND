import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GestionTiempoEntregaService {
  calcularDiferenciaEnDias(fechaInicio: Date, fechaFin: Date): number {
    const fI = new Date(fechaInicio);
    const fC = new Date(fechaFin);
    const diferenciaEnMilisegundos = fC.getTime() - fI.getTime();

    return Math.ceil(diferenciaEnMilisegundos / (1000 * 3600 * 24));
  }
}
