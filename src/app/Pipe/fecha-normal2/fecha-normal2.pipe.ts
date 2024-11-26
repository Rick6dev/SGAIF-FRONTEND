import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaNormal2'
})
export class FechaNormal2Pipe implements PipeTransform {

  transform(dateString: any): any {
    // // const fechaMoment = moment(dateString);
    // const fechaFormateada = fechaMoment.format('DD-MM-YYYY');
    // return fechaFormateada;
    const fculminacion=dateString
    const [year2,month2,day2] :any=fculminacion.split("-");
    const fechaNewFin =`${day2}-${month2}-${year2}`
    return fechaNewFin;

  }

}
