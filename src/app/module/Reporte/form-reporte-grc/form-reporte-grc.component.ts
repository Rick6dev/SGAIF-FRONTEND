import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginGuard } from 'src/app/guards/login.guards';
import { MessageService } from 'src/app/services/Message/message.service';
import { HallazgoService } from 'src/app/services/Register/hallazgo/hallazgo.service';
import { SelectAdminService } from 'src/app/services/Register/select-Admin/select-admin.service';
import { ReportAdminService } from 'src/app/services/Report/report-admin.service';

@Component({
  selector: 'app-form-reporte-grc',
  templateUrl: './form-reporte-grc.component.html',
  styleUrls: ['./form-reporte-grc.component.css'],
})
export class FormReporteGrcComponent implements OnInit {
  @Input() flagRGrc: boolean = false;
  flagLoading: boolean = false;
  flagReporte: boolean = false;
  user: any = {
    userId: 0,
    userNombre: '',
    areaTrabajo: '',
    rol: '',
    token: '',
  };
  id_Vpe: number | string = 0;
  id_vp: number = 0;
  VPEs: any = [];
  Grcs: any = [];
  VPs: any = [];
  flagVp: boolean = false;
  flagGrc: boolean = false;
  cod_informe: string | null = '';
  nivelesRiesgo: any = [];
  riesgos: any = [];
  estatus: any = [];
  informe: any = [];
  forma: any;
  message: string = '';
  nameVpe: string = '';
  nameVp: string = '';
  results: any = [];
  currentDate: Date = new Date();
  constructor(
    private fb: FormBuilder,
    public selectOptionAdminComponent: SelectAdminService,
    public messageAlert: MessageService,
    private hallazgoService: HallazgoService,
    private reportService: ReportAdminService,
    private userLogged: LoginGuard
  ) {}
  crearFormulario() {
    this.informe.select_one_tipoGrc =
      this.user.areaTrabajo == 'all' ? '' : this.user.areaTrabajo;

    this.forma = this.fb.group({
      id_vpe: ['', [Validators.required]],
      id_vp: ['', [Validators.required]],
      id_gerencia: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getVPE();
    this.crearFormulario();
    this.incializa();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['flagRGrc']) {
      this.getVPE();
    }
  }

  public async incializa() {
    this.user = this.userLogged.extractUser();
  }

  getVPE() {
    this.selectOptionAdminComponent.getVPE().subscribe(
      (res) => {
        this.VPEs = res;
      },
      (err) => {
        this.messageAlert.MessageAlertFloatError(err.error.message);
      }
    );
  }
  getVP() {
    this.flagVp = true;
    this.flagGrc = false;
    this.VPs = [];
    this.selectOptionAdminComponent
      .getVP(parseInt(this.forma.get('id_vpe').value))
      .subscribe(
        (res) => {
          this.VPs = res;
        },
        (err) => this.messageAlert.MessageAlertFloatError(err.error.message)
      );
  }
  name: string = '';
  getGrc() {
    this.flagVp = true;
    this.flagGrc = true;
    this.Grcs = [];
    this.selectOptionAdminComponent
      .getGrc(parseInt(this.forma.get('id_vp').value))
      .subscribe(
        (res) => {
          this.Grcs = res;
        },
        (err) => this.messageAlert.MessageAlertFloatError(err.error.message)
      );
  }

  realizarReporte() {
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach((control) => {
        if (control instanceof FormControl || control instanceof FormGroup) {
          control.markAsTouched();
        }
      });
      this.message = 'Todos los campos son obligatorios!';
      this.messageAlert.MessageAlertError(this.message, 'Estimado Usuario !');
      return;
    }
    this.findNameVpes();
    this.reportService
      .reportGerencia(this.forma.get('id_gerencia').value)
      .subscribe(
        (res) => {
          this.results = res;
          this.flagLoading = true;
          setTimeout(() => {
            this.flagLoading = false;
            this.flagReporte = true;
            this.resetAll();
          }, 5000);
          if (this.results) {
            this.name = `Reporte-${
              this.results[0].gerencia_responsable_historico.gerencia_historico
            }-${this.currentDate.getDay()}-${
              this.currentDate.getMonth() + 1
            }-${this.currentDate.getFullYear()} `;
          }
        },
        (err) =>
          this.messageAlert.MessageAlertError(
            err.error.message,
            'Estimado usuario !'
          )
      );
  }


  findNameVpes() {
    for (let i = 0; i < this.VPEs.length; i++) {
      const id = this.id_Vpe;
      if (this.VPEs[i].id_vpe === parseInt(this.forma.get('id_vpe').value)) {
        const auxVPE = this.VPEs[i].nombre_vpe;
        this.nameVpe = auxVPE;
      }
    }
  }
  findNameVp() {
    for (let i = 0; i < this.VPs.length; i++) {
      if (this.VPs[i].id_vp === parseInt(this.forma.get('id_vp').value)) {
        this.nameVp = this.VPs[i].nombre_vp;
      }
    }
  }

  get gerenciaResponsableNoValido() {
    return (
      this.forma.get('id_gerencia').invalid &&
      this.forma.get('id_gerencia').touched
    );
  }
  get gerenciaResponsableValido() {
    return (
      this.forma.get('id_gerencia').valid &&
      this.forma.get('id_gerencia').touched
    );
  }

  resetAll() {
    this.Grcs = [];
    this.VPs = [];
    this.id_Vpe = 0;
    this.flagVp = false;
    this.flagGrc = false;
    this.crearFormulario();
  }
}
