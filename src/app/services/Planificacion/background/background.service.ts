import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {

  generateRandomDarkColor(): string {
    const r = this.getRandomInt(0, 128); // Rango para colores oscuros (0-128)
    const g = this.getRandomInt(0, 128);
    const b = this.getRandomInt(0, 128);
    return `rgb(${r}, ${g}, ${b})`; // Devuelve en formato RGB
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
