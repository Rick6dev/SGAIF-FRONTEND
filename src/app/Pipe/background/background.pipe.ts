import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'background'
})
export class BackgroundPipe implements PipeTransform {

  transform(value: any[], count: number): string[] {
    if (!value || count <= 0) {
      return [];
    }

    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      colors.push(this.getRandomColor());
    }
    return colors;
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
