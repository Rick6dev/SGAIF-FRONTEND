import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'saltoLinea',
})
export class SaltoLineaPipe implements PipeTransform {
  transform(value: string): string {
    // Implementar la lógica del pipe
    let resultado = '';
    const palabras = value.split(' ');
    let isFechaSiguiente = false;

    for (const palabra of palabras) {
      const regexPunto = /\./;
      const regexFecha = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
      const isPunto = regexPunto.test(palabra);
      const isFecha = regexFecha.test(palabra);

      if (isPunto && !isFechaSiguiente) {
        resultado += '\n';
      }

      if (isFecha) {
        resultado += '\n';
        isFechaSiguiente = true;
      } else {
        isFechaSiguiente = false;
      }

      resultado += palabra + ' ';
    }

    return resultado.trim();
  }
}
