import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login.guards';
import { User } from 'src/app/models/interface';
import { MessageService } from 'src/app/services/Message/message.service';
import { NavigationService } from 'src/app/services/Navigation/navigation.service';
import { InformeAudService } from 'src/app/services/Register/Informe/informe-aud.service';
import { HallazgoService } from 'src/app/services/Register/hallazgo/hallazgo.service';
import { ListModalhllzComponent } from '../list-modalhllz/list-modalhllz.component';

@Component({
  selector: 'app-list-onehallazgo',
  templateUrl: './list-onehallazgo.component.html',
  styleUrls: ['./list-onehallazgo.component.css'],
})
export class ListOnehallazgoComponent implements OnInit {
  @Input() resultshllz: any = [];
  @Input() id_informe_auditoria: number = 0;
  @Input() flagNodata: boolean = false;
  @Input() ishllz: boolean = false;
  @Output() ishllzChange = new EventEmitter<boolean>();
  @Output() resultshllzOutput: EventEmitter<any[]> = new EventEmitter();
  messages: string = '';
  checkedItem: string = '';
  message: string = '';

  user: User = {
    userId: 0,
    userNombre: '',
    areaTrabajo: '',
    rol: '',
    token: '',
    role: 0,
  };
  // Numeros
  id: number = 0;
  items: number = 10;
  cantidad = 10;
  nrmPaginas: number[] = [];
  totalpaginas: number = 0;
  pagina: number = 1;
  // Strings
  severity: string = '';
  cod_informe: string | null = '';
  accion: string = '';
  name: string = '';
  informe: any = {
    cod_informe: '',
    created_mounth: '',
    created_year: '',
    gerencia_encargada: '',
    id_informe_auditoria: 0,
    id_tipo_auditoria: 0,
    nombre_informe: '',
    trimestre: '',
  };
  // Banderas
  isOpen = false;
  hide: boolean = false;
  flagNoData: boolean = false;
  flagClose: boolean = false;
  flagUpdate: boolean = true;
  flagHallazgo: boolean = true;
  ismodal: boolean = true;
  ismodalInfr: boolean = true;
  results: any = null;
  hllz: any = [
    {
      accion_correctiva: null,
      cerrado: false,
      estatus_Plan_Accion: '50%',
      fecha_cierre: null,
      fecha_compromiso: null,
      fecha_creacion: null,
      hallazgo_reportado: '',
      id_auditor_responsable: 0,
      id_gerencia: 0,
      id_hallazgo: 0,
      id_informe_auditoria: 0,
      id_nivel_riesgo: 0,
      id_riesgo_asociado: 0,
      informe_auditorium: { nombre_informe: '', cod_informe: '' },
      recomendacion: '',
      Nivel_Riesgo: { nombre_nivel_riesgo: '' },
    },
  ];
  informe_audit: any = {
    cod_informe: '',
    nombre_informe: '',
  };
  nvl_rsg: any = {};
  rsg_asc: any = {};
  estatus: string = '';
  coments: any = [
    {
      comentario: '',
      fecha_comentario: '',
      id_auditor_responsable: 0,
      id_comentario: '',
      id_hallazgo: '',
    },
  ];
  Nivel_Riesgo: any = {
    nombre_nivel_riesgo: '',
  };
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
  GrcsAud: any = [];
  id_hallazgo: number = 0;
  edit: number = 0;
  constructor(
    private hallazgoService: HallazgoService,
    private messageAlert: MessageService,
    private activatedRoute: ActivatedRoute,
    private userLogged: LoginGuard,
    private informeAudService: InformeAudService,
    private navigationService: NavigationService
  ) {}
  ngOnInit(): void {
    this.resultshllz = null;
    this.user = this.userLogged.extractUser() as User;
    this.gerenciaEncargada();
    this.resultshllzOutput.emit(this.resultshllz);
  }
  public async getHallazgofilter() {
    this.hallazgoService
      .listHallazgofilter(this.id_informe_auditoria)
      .subscribe(
        (res) => {
          this.resultshllz = res;
        },
        (err) =>
          this.messageAlert.MessageAlertError(
            err.error.message,
            'Estimado usuario !'
          )
      );
  }
  gerenciaEncargada() {
    if (this.user.areaTrabajo === 'GAT') {
      this.edit = 1;
    } else if (this.user.areaTrabajo === 'GAOF') {
      this.edit = 2;
    } else {
      this.edit = 0;
    }
  }

  seguimiento(id: number) {
    this.ismodalInfr = false;
    this.ismodal = true;
    this.navigationService.toggleSidebar(this.isOpen);
    this.hallazgoService.getOneHllz(id).subscribe(
      (res) => {
        this.hllz = res;
        this.getComent();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  closeModal() {
    const elementoSeleccionado = document.querySelector('.modal-backdrop.show');
    elementoSeleccionado?.remove();
    this.ismodal = false;
    this.ismodalInfr = false;
  }
  flagPdf: boolean = false;
  openPdf() {
    this.flagPdf = true;
    this.name = this.resultshllz[0].informe_auditorium.cod_informe;
  }
  actualizarElemento() {
    // this.getHallazgofilter();
  }
  changeIshllz() {
    this.ishllz = !this.ishllz;
    this.ishllzChange.emit(this.ishllz);
  }

  delete(id: number) {
    this.hallazgoService.deleteHllz(id).subscribe(
      (res) => {
        location.reload();
      },
      (err) =>
        this.messageAlert.MessageAlertError(
          err.error.message,
          'Estimado usuario !'
        )
    );
  }
  mostrar: boolean = false;
  extraerHallazgo(id: number) {
    this.id_hallazgo = id;
    this.mostrar = true;
  }
  ocultarModal() {
    this.mostrar = false;
  }
  closeInf() {
    this.ismodalInfr = false;
  }
  buscarComentarios() {}
  getComent() {
    this.hallazgoService.listComent(this.hllz.id_hallazgo).subscribe(
      (res) => {
        this.coments = res;
      },
      (err) => console.log(err)
    );
  }
  pagination(numeros: number) {
    this.nrmPaginas = [];
    for (var i: number = 0; i < numeros; i++) {
      this.nrmPaginas.push(i);
    }
  }
  setActiveItem(id: string) {
    const buttonWraps = document.querySelectorAll('.hidden-trigger');
    buttonWraps.forEach((buttonWrap) => {
      if (buttonWrap.id === id) {
        buttonWrap!.classList.add('checked');
      } else {
        buttonWrap!.classList.remove('checked');
      }
    });
    this.checkedItem = this.checkedItem === id ? '' : id;
  }
  aprobarHallazgo(id: string, aprobar: boolean) {
    const aprobarHllz = {
      id_hallazgo: id,
      aprobar: !aprobar,
    };
    this.getHallazgofilter();
    this.hallazgoService.aprobarHllz(aprobarHllz).subscribe(
      (res) => {
        this.messageAlert.MessageAlertSuccess(
          'Hallazgo Actualizado Exitosamente!',
          'Estimado usuario !'
        );
        this.getHallazgofilter();
      },
      (err) => {
        console.log(err);
        this.messageAlert.MessageAlertError(
          err.error.message,
          'Estimado usuario !'
        );
      }
    );
    this.getHallazgofilter();
  }
  closehllz() {
    this.ishllz = !this.ishllz;
    this.ishllzChange.emit(this.ishllz);
  }
}
