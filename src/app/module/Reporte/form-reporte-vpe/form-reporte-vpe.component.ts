import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/models/interface';
import { MessageService } from 'src/app/services/Message/message.service';
import { HallazgoService } from 'src/app/services/Register/hallazgo/hallazgo.service';
import { SelectAdminService } from 'src/app/services/Register/select-Admin/select-admin.service';
import { ReportAdminService } from 'src/app/services/Report/report-admin.service';

@Component({
  selector: 'app-form-reporte-vpe',
  templateUrl: './form-reporte-vpe.component.html',
  styleUrls: ['./form-reporte-vpe.component.css'],
})
export class FormReporteVPEComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public selectOptionAdminComponent: SelectAdminService,
    public messageAlert: MessageService,
    private hallazgoService: HallazgoService,
    private reportService: ReportAdminService
  ) {}
  @Input() flagRGrc: boolean = false;
  flagLoading: boolean = false;
  flagReporte: boolean = false;
  user: User = {
    userId: 0,
    userNombre: '',
    areaTrabajo: '',
    rol: '',
    role: 0,
    token: '',
  };
  // Number
  id_Vpe: number = 0;
  id_vp: number = 0;
  // Arrays
  VPEs: any = [];
  Grcs: any = [];
  VPs: any = [];
  nivelesRiesgo: any = [];
  riesgos: any = [];
  informe: any = [];
  forma: any;
  results: any = [];
  // Banderas
  flagVp: boolean = false;
  flagGrc: boolean = false;
  // String
  cod_informe: string | null = '';
  nameVpe: string = '';
  message: string = '';
  estatus: string[] = [];
  name: string = '';
  // Fecha
  currentDate: Date = new Date();

  crearFormulario() {
    this.forma = this.fb.group({
      id_vpe: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getVPE();
    this.crearFormulario();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['flagRGrc']) {
      this.getVPE();
    }
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
  getVP(id_VPE: number) {
    this.flagVp = true;
    this.flagGrc = false;
    this.VPs = [];
    this.selectOptionAdminComponent.getVP(id_VPE).subscribe(
      (res) => {
        this.VPs = res;
      },
      (err) => this.messageAlert.MessageAlertFloatError(err.error.message)
    );
  }
  getGrc(id_vp: number) {
    this.flagVp = true;
    this.flagGrc = true;
    this.Grcs = [];
    this.selectOptionAdminComponent.getGrc(id_vp).subscribe(
      (res) => {
        this.Grcs = res;
      },
      (err) => this.messageAlert.MessageAlertFloatError(err.error.message)
    );
  }
  findNameVpes() {
    for (let i = 0; i < this.VPEs.length; i++) {
      if (this.VPEs[i].id_vpe === parseInt(this.forma.get('id_vpe').value)) {
        this.nameVpe = this.VPEs[i].nombre_vpe;
      }
    }
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
    this.reportService.reportVPE(this.forma.get('id_vpe').value).subscribe(
      (res) => {
        this.results = res;
        this.flagLoading = true;
        setTimeout(() => {
          this.flagLoading = false;
          this.flagReporte = true;
          this.resetAll();
        }, 5000);
        if (this.results) {
          this.name = `Reporte-${this.nameVpe}-${this.currentDate.getDay()}-${
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
    this.forma.reset();
  }

  get VpResponsableNoValido() {
    return this.forma.get('id_vpe').invalid && this.forma.get('id_vpe').touched;
  }
  get VpResponsableValido() {
    return this.forma.get('id_vpe').valid && this.forma.get('id_vpe').touched;
  }

  resetAll() {
    this.id_vp = 0;
    this.Grcs = [];
    this.VPs = [];
    this.id_Vpe = 0;
    this.flagVp = false;
    this.flagGrc = false;
    this.crearFormulario();
  }
}
