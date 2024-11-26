import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { LoginGuard } from 'src/app/guards/login.guards';
import { Hallazgo, User } from 'src/app/models/interface';
import { MessageService } from 'src/app/services/Message/message.service';
import { NavigationService } from 'src/app/services/Navigation/navigation.service';
import { InformeAudService } from 'src/app/services/Register/Informe/informe-aud.service';
import { HallazgoService } from 'src/app/services/Register/hallazgo/hallazgo.service';
import { RiesgoService } from 'src/app/services/Register/riesgo/riesgo.service';
import { SelectAdminService } from 'src/app/services/Register/select-Admin/select-admin.service';

@Component({
  selector: 'app-form-hallazgo',
  templateUrl: './form-hallazgo.component.html',
  styleUrls: ['./form-hallazgo.component.css', './button.component.css'],
})
export class FormHallazgoComponent implements OnInit {
  user: User = {
    userId: 0,
    userNombre: '',
    areaTrabajo: '',
    rol: '',
    role: 0,
    token: '',
  };
  // String
  cod_informe: string | null = '';
  message: string = '';
  estatus: string[] = [];

  // Numeros
  id_Vpe: number = 0;
  id_vp: number = 0;
  VPEs: any = [];
  Grcs: any = [];
  VPs: any = [];
  // Banderas
  flagVp: boolean = false;
  flagGrc: boolean = false;

  nivelesRiesgo: any = [];
  riesgos: any = [];
  informe: any = [];
  forma: any;
  constructor(
    private fb: FormBuilder,
    private riesgoAsociado: RiesgoService,
    private router: Router,
    private userLogged: LoginGuard,
    private activatedRoute: ActivatedRoute,
    private informeAudService: InformeAudService,
    private hallazgoService: HallazgoService,
    public selectOptionAdminComponent: SelectAdminService,
    public messageAlert: MessageService,
    public navigationService: NavigationService
  ) {}
  ngOnInit(): void {
    this.incializacion();
  }
  incializacion() {
    this.cod_informe = this.activatedRoute.snapshot.paramMap.get('cod');
    if (this.cod_informe != null) {
      this.getData(this.cod_informe);
    }
    this.user = this.userLogged.extractUser() as User;
    this.estatus = ['0%', '25%', '50%', '75%', '99%', 'Cerrado'];
    this.getVPE();
    this.crearFormulario();
  }

  crearFormulario() {
    this.forma = this.fb.group({
      detalle: ['', [Validators.required, Validators.minLength(50)]],
      fecha_compromiso: [0],
      estatus: ['', Validators.required],
      recomendacion: [
        '',
        [
          Validators.required,
          Validators.maxLength(1000),
          Validators.minLength(50),
        ],
      ],
      accion: [
        '',
        [
          Validators.required,
          Validators.maxLength(1000),
          Validators.minLength(50),
        ],
      ],
      id_riesgo: ['', Validators.required],
      id_nivel: ['', Validators.required],
      id_informe: ['', Validators.required],
      id_gerencia: ['', Validators.required],
      id_auditor: [''],
      id_gerencia_encargada: [0, Validators.required],
    });
    setTimeout(() => {
      this.forma.get('id_informe').setValue(this.informe.id_informe_auditoria);
      this.forma
        .get('id_gerencia_encargada')
        .setValue(this.informe.id_gerencia_encargada);
      this.forma.get('id_auditor').setValue(this.user.userId);
    }, 2000);
  }
  guardarHllz() {
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach((control) => {
        if (control instanceof FormControl || control instanceof FormGroup) {
          control.markAsTouched();
        }
      });
    console.log()
      this.messageAlert.MessageAlertError('Todos los campos son obligatorios!', ` Estimado Usuario  ${this.user.userNombre} !`);
      return;
    }
    this.guardarHallazgo();
  }
  getData(cod: string) {
    this.informeAudService.getOneCod(cod).subscribe(
      (res) => {
        this.informe = res;
      },
      (err) => {
        this.informe = err;
        this.messageAlert.MessageAlertFloatError(err.error.message);
      }
    );

    this.riesgoAsociado.getRiesgoAsociado().subscribe(
      (res) => {
        this.riesgos = res;
      },
      (err) => {
        this.messageAlert.MessageAlertFloatError(err.error.message);
      }
    );
    this.riesgoAsociado.getNivelRiesgo().subscribe(
      (res) => {
        this.nivelesRiesgo = res;
      },
      (err) => {
        this.messageAlert.MessageAlertFloatError(err.error.message);
      }
    );
  }
  guardarHallazgo(): void {
    this.hallazgoService.createHallazgo(this.forma.value).subscribe({
        next: (res: any) => {
            this.messageAlert.MessageAlertFloatSucces(res.text);
            this.router.navigate(['/register/hallazgos/', this.cod_informe]);
        },
        error: (err: any) => {
            const errorMessage = err.error?.message || 'Error al guardar el hallazgo';
            this.messageAlert.MessageAlertFloatError(errorMessage);
        }
    });
}


  getVPE() {
    this.selectOptionAdminComponent.getVPE().subscribe({
      next:(res) => {
        this.VPEs = res;
      },
      error:(err) => {
        this.messageAlert.MessageAlertFloatError(err.error.message);
      }
  });
  }
  getVP(id_VPE: number) {
    this.flagVp = true;
    this.flagGrc = false;

    this.forma.get('id_gerencia').reset();
    this.selectOptionAdminComponent.getVP(id_VPE).subscribe({
      next:(res) => {
        this.VPs = res;
      },
      error:(err) => this.messageAlert.MessageAlertFloatError(err.error.message)
  });
  }
  getGrc(id_vp: number) {
    this.flagVp = true;
    this.flagGrc = true;

    this.selectOptionAdminComponent.getGrc(id_vp).subscribe({
        next: (res) => {
            this.Grcs = res;
        },
        error: (err) => {
            this.messageAlert.MessageAlertFloatError(err.error.message);
        }
    });
}

  isOpen: boolean = false;
  toggledsideBar() {
    this.navigationService.toggleSidebar(this.isOpen);
  }
  // Validaciones de Formulario
  get hallazgoNoValido() {
    return (
      this.forma.get('detalle').invalid && this.forma.get('detalle').touched
    );
  }
  get hallazgoValido() {
    return this.forma.get('detalle').valid && this.forma.get('detalle').touched;
  }
  get recomendacionNoValido() {
    return (
      this.forma.get('recomendacion').invalid &&
      this.forma.get('recomendacion').touched
    );
  }
  get recomendacionValido() {
    return (
      this.forma.get('recomendacion').valid &&
      this.forma.get('recomendacion').touched
    );
  }
  get accionCorrectivaNoValido() {
    return this.forma.get('accion').invalid && this.forma.get('accion').touched;
  }
  get accionCorrectivaValido() {
    return this.forma.get('accion').valid && this.forma.get('accion').touched;
  }
  get riesgoAsociadoNoValido() {
    return (
      this.forma.get('id_riesgo').invalid && this.forma.get('id_riesgo').touched
    );
  }
  get riesgoAsociadoValido() {
    return (
      this.forma.get('id_riesgo').valid && this.forma.get('id_riesgo').touched
    );
  }
  get nivelRiesgoNoValido() {
    return (
      this.forma.get('id_nivel').invalid && this.forma.get('id_nivel').touched
    );
  }
  get nivelRiesgoValido() {
    return (
      this.forma.get('id_nivel').valid && this.forma.get('id_nivel').touched
    );
  }
  get estatusPlanAccionNoValido() {
    return (
      this.forma.get('estatus').invalid && this.forma.get('estatus').touched
    );
  }
  get estatusPlanAccionValido() {
    return this.forma.get('estatus').valid && this.forma.get('estatus').touched;
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
}
