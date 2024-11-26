import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { LoginGuard } from 'src/app/guards/login.guards';
import { User } from 'src/app/models/interface';
import { MessageService } from 'src/app/services/Message/message.service';
import { NavigationService } from 'src/app/services/Navigation/navigation.service';
import { InformeAudService } from 'src/app/services/Register/Informe/informe-aud.service';
import { SelectAdminService } from 'src/app/services/Register/select-Admin/select-admin.service';
import { RequerimientoService } from 'src/app/services/Requerimiento/requerimiento.service';

@Component({
  selector: 'app-form-requerimiento',
  templateUrl: './form-requerimiento.component.html',
  styleUrls: ['./form-requerimiento.component.css'],
})
export class FormRequerimientoComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public selectOptionAdminComponent: SelectAdminService,
    public messageAlert: MessageService,
    public navigationService: NavigationService,
    private userLogged: LoginGuard,
    public requerimientoService: RequerimientoService,
    private informeAudService: InformeAudService
  ) {}
  VPEs: any = [];
  VPs: any = [];
  Grcs: any = [];
  statesReqs: any = [];
  id_Vpe: number = 0;
  id_vp: number = 0;
  flagGrc: boolean = false;
  user: User = {
    userId: 0,
    userNombre: '',
    areaTrabajo: '',
    rol: '',
    role: 0,
    token: '',
  };

  ngOnInit(): void {
    this.getVPE();
    this.getEstadoReq();
    this.user = this.userLogged.extractUser() as User;
    this.extractInforme();
    this.createFormulario();
  }
  informeData: any = null;
  closeModal() {}
  validarActualizacion() {
    this.guardarRequerimiento();
  }
  extractInforme() {
    this.informeAudService.getData().subscribe((data) => {
      this.informeData = data;
    });
  }

  getVPE() {
    this.selectOptionAdminComponent.getVPE().subscribe({
      next: (res) => {
        this.VPEs = res;
      },
      error: (err) => {
        this.messageAlert.MessageAlertFloatError(err.error.message);
      },
    });
  }
  getVP(id_Vpe: any) {
    if (id_Vpe == '') {
      this.id_Vpe == null;
      this.flagGrc = false;
      return;
    }
    this.selectOptionAdminComponent.getVP(id_Vpe).subscribe({
      next: (res) => {
        this.VPs = res;
      },
      error: (err) => {
        this.messageAlert.MessageAlertFloatError(err.error.message);
      },
    });
  }
  getGrc(id_VP: any) {
    if (id_VP == '') {
      this.flagGrc = false;
      this.forma.get('id_gerencia_responsable').setValue('');
      return;
    }
    this.flagGrc = true;
    this.selectOptionAdminComponent.getGrc(id_VP).subscribe({
      next: (res) => {
        this.Grcs = res;
      },
      error: (err) => {
        this.messageAlert.MessageAlertFloatError(err.error.message);
      },
    });
  }

  getEstadoReq() {
    this.requerimientoService.listEstadoRequerimiento().subscribe({
      next: (res) => {
        this.statesReqs = res;
      },
      error: (err) => {
        this.messageAlert.MessageAlertFloatError(err.error.message);
      },
    });
  }
  forma: any;

  createFormulario() {
    this.forma = null;
    this.forma = this.fb.group({
      id_informe_auditoria: ['', Validators.required],
      detalle_requerimiento: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ],
      ],
      id_auditor_responsable: [this.user.userId, Validators.required],
      id_gerencia_responsable: ['', Validators.required],
      id_gerencia_encargada: ['', Validators.required],
      nombre_responsable: ['', [Validators.required, Validators.minLength(3)]],
      apellido_responsable: ['', Validators.required],
    });
  }
  guardarRequerimiento() {
    this.forma.get('id_auditor_responsable').setValue(this.user.userId);
    this.forma
      .get('id_informe_auditoria')
      .setValue(this.informeData.id_informe_auditoria);

    this.forma
      .get('id_gerencia_encargada')
      .setValue(this.informeData.id_gerencia_encargada);

    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach((control) => {
        if (control instanceof FormControl || control instanceof FormGroup) {
          control.markAsTouched();
        }
      });
      console.log(this.forma.value);
      this.messageAlert.MessageAlertError(
        'Todos los campos son obligatorios!',
        ` Estimado Usuario  ${this.user.userNombre} !`
      );
      return;
    } else {
      this.id_Vpe = 0;
      this.enviarData();
    }
  }
  enviarData() {
    this.requerimientoService.createRequerimiento(this.forma.value).subscribe({
      next: (res: any) => {
        this.messageAlert.MessageAlertFloatSucces(res.text);

        this.resetForm();
      },
      error: (error) => {
        this.messageAlert.MessageAlertFloatError(error.error.message);
      },
    });
  }
  resetForm() {
    this.forma.reset();
    this.id_Vpe == null;
    this.flagGrc = false;
    this.forma
      .get('id_informe_auditoria')
      .setValue(this.informeData.id_informe_auditoria);

    this.forma
      .get('id_gerencia_encargada')
      .setValue(this.informeData.id_gerencia_encargada);

    this.forma
      .get('id_auditor_responsable')
      .setValue(this.informeData.id_auditor_responsable);
  }

  getRequerimientoValido() {
    return (
      this.forma.get('detalle_requerimiento').valid &&
      this.forma.get('detalle_requerimiento').touched
    );
  }

  getRequerimientoNoValido() {
    return (
      this.forma.get('detalle_requerimiento').invalid &&
      this.forma.get('detalle_requerimiento').touched
    );
  }

  getGerenciaResponsableNoValido() {
    return (
      this.forma.get('id_gerencia_responsable').invalid &&
      this.forma.get('id_gerencia_responsable').touched
    );
  }

  getGerenciaResponsableValido() {
    return (
      this.forma.get('id_gerencia_responsable').valid &&
      this.forma.get('id_gerencia_responsable').touched
    );
  }
  getNombreNoValido() {
    return (
      this.forma.get('nombre_responsable').invalid &&
      this.forma.get('nombre_responsable').touched
    );
  }
  getNombreValido() {
    return (
      this.forma.get('apellido_responsable').valid &&
      this.forma.get('apellido_responsable').touched
    );
  }

  getApellidoNoValido() {
    return (
      this.forma.get('apellido_responsable').invalid &&
      this.forma.get('apellido_responsable').touched
    );
  }
  getApellidoValido() {
    return (
      this.forma.get('apellido_responsable').valid &&
      this.forma.get('apellido_responsable').touched
    );
  }
}
