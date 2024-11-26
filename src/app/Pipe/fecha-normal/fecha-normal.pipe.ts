import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
// import * as moment from 'moment';

@Pipe({
  name: 'fechaNormal'
})
export class FechaNormalPipe implements PipeTransform {


  transform(dateString: any, format: string): string {
    // // const fechaMoment = moment(dateString);
    // const fechaFormateada = fechaMoment.format('DD-MM-YYYY');
    // return fechaFormateada;
    const fculminacion=dateString
    const [year2,month2,day2] :any=fculminacion.split("-");
    const fechaNewFin =`${day2}/${month2}/${year2}`
    return fechaNewFin;

  }

  
}
