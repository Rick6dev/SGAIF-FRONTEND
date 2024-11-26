import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Informe, TipoAuditoria, User } from "src/app/models/interface";
import { DeterminarTrimestreService } from "src/app/services/Register/timestre/determinar-trimestre.service";
import { TipoAuditService } from "src/app/services/Register/tipoAuditoria/tipo-audit.service";
import { InformeAudService } from "src/app/services/Register/Informe/informe-aud.service";
import { MessageService } from "src/app/services/Message/message.service";
import { LoginGuard } from "src/app/guards/login.guards";
import { NavigationService } from "src/app/services/Navigation/navigation.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { SelectAdminService } from "src/app/services/Register/select-Admin/select-admin.service";
import { PlanificacionService } from "src/app/services/Planificacion/planificacion.service";
// import { jwtDecode } from '@auth0/angular-jwt';
@Component({
  selector: "app-form-informe",
  templateUrl: "./form-informe.component.html",
  styleUrls: [
    "./form-informe.component.css",
    "./button.component.css",
    "./button-select.component.css",
  ],
})
export class FormInformeComponent implements OnInit {
  user: User = {
    userId: 0,
    userNombre: "",
    areaTrabajo: "",
    rol: "",
    role: 0,
    token: "",
  };
  forma: any;
  grcsAud: any = [];
  tiposAud: any = [];
  informe: Informe = {
    code: "",
    nombre_informe: "",
    select_one_tipoGrc: "",
    timestre: "",
    fk_tipoAud: 0,
    currentYear: 0,
    currentMounth: 0,
  };
  // Bandera
  isOpen: boolean = false;
  flagInformePlanificado: any = null;
  flagInformeNoPlanificado: any = null;
  // Fecha
  currentDate: Date = new Date();
  // Strings
  digit: string = "";
  message: string = "";

  constructor(
    private fb: FormBuilder,
    public tipoAuditService: TipoAuditService,
    private router: Router,
    public userLogged: LoginGuard,
    private determineTrimestreService: DeterminarTrimestreService,
    private informeAudService: InformeAudService,
    public messageAlert: MessageService,
    public navigationService: NavigationService,
    public selectOptionAdminComponent: SelectAdminService,
    public planificacionService: PlanificacionService
  ) {}

  ngOnInit(): void {
    this.user = this.userLogged.extractUser() as User;
    this.informe.select_one_tipoGrc = this.user.areaTrabajo;
    this.informe.currentYear = this.currentDate.getFullYear();
    this.informe.currentMounth = this.currentDate.getMonth() + 1;
    this.informe.timestre = this.determineTrimestreService.determineTrimestre(
      this.informe.currentMounth
    );
    this.getPlanificacion();
    this.getGrcAudit();

    this.tipoAuditService.get_TipoAud().subscribe(
      (res) => {
        this.tiposAud = res;
      },
      (err) => {
        this.message = err.error.message;
        this.messageAlert.MessageAlertError(this.message, "Estimado usuario!");
      }
    );
    this.crearFormulario();
  }
  getGrcAudit() {
    this.selectOptionAdminComponent.getGrcAud().subscribe(
      (res) => {
        this.grcsAud = res;
      },
      (err) => {
        this.messageAlert.MessageAlertFloatError(err.error.message);
      }
    );
  }

  planificacion: any = [];
  uniqueData: any = [];

  getPlanificacion() {
    this.planificacionService.getPlanificacionInforme().subscribe(
      (res: any) => {
        this.planificacion = res;

        const auditorIds = new Set();

        this.planificacion.forEach((item: any) => {
          const auditorId = item.subproceso.proceso.nombre_proceso;

          if (!auditorIds.has(auditorId)) {
            auditorIds.add(auditorId);
            this.uniqueData.push(item);
          }
        });
        this.planificacion = this.uniqueData;
      },
      (err) => {
        this.messageAlert.MessageAlertFloatError(err.error.message);
      }
    );
  }

  crearFormulario() {
    this.informe.select_one_tipoGrc =
      this.user.areaTrabajo == "GAT/GAOF" ? "" : this.user.areaTrabajo;
    this.forma = this.fb.group({
      nombre_informe: ["", [Validators.required, Validators.minLength(7)]],
      tipo_auditoria: ["", Validators.required],
      tipoGrc: [this.informe.select_one_tipoGrc, Validators.required],
    });
  }

  guardarInforme(): void {
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach((control) => {
        if (control instanceof FormControl || control instanceof FormGroup) {
          control.markAsTouched();
        }
      });
      this.message = "Todos los campos son obligatorios";
      this.messageAlert.MessageAlertError(this.message, "Estimado usuario!");
      return;
    }
    this.generateCod();
    this.informeAudService.createInforme(this.informe).subscribe(
      (res: any) => {
        this.informe.select_one_tipoGrc = "";
        this.messageAlert.MessageAlertFloatSucces(
          "Informe Guardado con exito!"
        );

        this.router.navigate(["register/informes"], { replaceUrl: true });
      },
      (err: any) => {
        this.message = err.error.message;
        this.messageAlert.MessageAlertError(this.message, "Estimado usuario!");
      }
    );
  }
  generateCod() {
    this.digit = this.informe.currentMounth < 10 ? "0" : "";
    this.informe.nombre_informe = this.forma.get("nombre_informe").value;
    this.informe.select_one_tipoGrc = this.forma.get("tipoGrc").value;
    const tipoAuditoriaSeleccionada =
      this.tiposAud.find((auditoria: any) => {
        return (
          auditoria.id_tipo_auditoria ===
          parseInt(this.forma.get("tipo_auditoria").value, 10)
        );
      }) || null;

    this.informe.fk_tipoAud = tipoAuditoriaSeleccionada.id_tipo_auditoria;
    this.informe.code =
      `CCR-VPA-${this.informe.select_one_tipoGrc}` +
      `-${tipoAuditoriaSeleccionada.cod_tipo_auditoria}` +
      `-01-` +
      `${this.digit}` +
      `${this.informe.currentMounth}` +
      `2020`;
    // ${this.informe.currentYear};
  }
  toggledSideBar() {
    this.navigationService.toggleSidebar(this.isOpen);
  }

  handleInformePlanificado() {
    this.flagInformePlanificado = true;
  }

  handleInformeNoPlanificado() {
    this.flagInformeNoPlanificado = true;
  }
  resetInforme() {
    this.flagInformeNoPlanificado = false;
    this.flagInformePlanificado = false;
    this.crearFormulario();
  }
  // Validaciones de Formularios
  get nombreInformeNoValido() {
    return (
      this.forma.get("nombre_informe").invalid &&
      this.forma.get("nombre_informe").touched
    );
  }
  get nombreInformeValido() {
    return (
      this.forma.get("nombre_informe").valid &&
      this.forma.get("nombre_informe").touched
    );
  }
  get tipoInformeValido() {
    return (
      this.forma.get("tipo_auditoria").valid &&
      this.forma.get("tipo_auditoria").touched
    );
  }
  get tipoInformeNoValido() {
    return (
      this.forma.get("tipo_auditoria").invalid &&
      this.forma.get("tipo_auditoria").touched
    );
  }
  get grcInformeValido() {
    return this.forma.get("tipoGrc").valid && this.forma.get("tipoGrc").touched;
  }
  get grcInformeNoValido() {
    return (
      this.forma.get("tipoGrc").invalid && this.forma.get("tipoGrc").touched
    );
  }
}
