import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string | undefined {
    if (value === undefined || value === null) {
      return undefined; // No devuelvas nada para cadenas faltantes
    }
    value = value.trimEnd();
    const words = value.split(' '); // Divide la cadena en palabras

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].slice(1).toLowerCase(); // Convierte la primera letra y deja el resto en minúsculas
    }
    return words.join(' '); // Une las palabras
  }
}
