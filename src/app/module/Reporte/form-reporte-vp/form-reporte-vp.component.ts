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
  selector: 'app-form-reporte-vp',
  templateUrl: './form-reporte-vp.component.html',
  styleUrls: ['./form-reporte-vp.component.css'],
})
export class FormReporteVPComponent implements OnInit {
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
  VPEs: any = [];
  Grcs: any = [];
  VPs: any = [];
  results: any = [];
  // Banderas
  flagVp: boolean = false;
  flagGrc: boolean = false;
  // Fecha
  currentDate: Date = new Date();
  // Strings
  nameVpe: string = '';
  nameVp: string = '';
  name: string = '';
  cod_informe: string | null = '';
  forma: any;
  message: string = '';

  crearFormulario() {
    this.forma = this.fb.group({
      id_vpe: ['', [Validators.required]],
      id_vp: ['', [Validators.required]],
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
  findNameVpes() {
    for (let i = 0; i < this.VPEs.length; i++) {
      if (this.VPEs[i].id_vpe === parseInt(this.forma.get('id_vp').value)) {
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
    this.findNameVp();
    this.findNameVpes();
    this.reportService.reportVP(this.forma.get('id_vp').value).subscribe(
      (res) => {
        this.results = res;
        this.flagLoading = true;
        setTimeout(() => {
          this.flagLoading = false;
          this.flagReporte = true;
          this.resetAll();
        }, 5000);
        if (this.results) {
          this.name = `Reporte-${this.nameVp}-${
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
    this.resetAll();
  }

  get VpResponsableNoValido() {
    return this.forma.get('id_vp').invalid && this.forma.get('id_vp').touched;
  }
  get VpResponsableValido() {
    return this.forma.get('id_vp').valid && this.forma.get('id_vp').touched;
  }
  resetAll() {
    this.Grcs = [];
    this.VPs = [];
    this.flagVp = false;
    this.flagGrc = false;
    this.crearFormulario();
  }
}
