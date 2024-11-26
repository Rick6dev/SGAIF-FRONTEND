import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-list-modalhllz',
  templateUrl: './list-modalhllz.component.html',
  styleUrls: ['./list-modalhllz.component.css'],
})
export class ListModalhllzComponent implements OnInit {
  @Input() hllz: any = {};
  @Input() id_informe_auditoria: number = 0;
  @Input() flagNodata: boolean = false;
  @Input() ishllz: boolean = false;
  @Input() estatus: any = '';
  @Input() rsg_asc: any = {};
  @Input() coments: any = {};
  @Input() informe_audit: any = {
    cod_informe: 'xcv',
  };
  nvl_rsg: any = {};
  gerencia: any = {
    id_gerencia: 0,
    id_vp: 0,
    intra_vp: {},
    nombre_gerencia: '',
    status: 0,
  };
  auditor: any = {
    nombre: '',
    apellido: '',
  };
  nivelRiesgo: string = '';
  severity: string = '';
  flagClose: boolean = false;
  constructor() {}
  ngOnInit(): void {}
  closehllz() {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['hllz']) {
      this.estatus = this.hllz.estatus_Plan_Accion;
      if (this.estatus === 'Cerrado' || this.estatus === 'cerrado') {
        this.estatus = '100%';
      }
      this.gerencia = this.hllz.gerencia_responsable_historico;
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.rsg_asc = this.hllz.Riesgo_Asociado;
      this.auditor = this.hllz.usuario;
      this.estatus = this.hllz.estatus_Plan_Accion;
      this.flagClose = this.hllz.cerrado;
      if (this.estatus === 'Cerrado' || this.estatus === 'cerrado') {
        this.estatus = '100%';
      }
    }, 1000);
  }
}
