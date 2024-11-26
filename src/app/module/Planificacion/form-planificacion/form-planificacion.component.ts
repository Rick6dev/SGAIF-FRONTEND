import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { LoginGuard } from "src/app/guards/login.guards";
import { User, macroproceso } from "src/app/models/interface";
import { MessageService } from "src/app/services/Message/message.service";
import { NavigationService } from "src/app/services/Navigation/navigation.service";
import { PlanificacionService } from "src/app/services/Planificacion/planificacion.service";
import { SelectAdminService } from "src/app/services/Register/select-Admin/select-admin.service";
import { VacacionesService } from "src/app/services/Vacaciones/vacaciones/vacaciones.service";

@Component({
  selector: "app-form-planificacion",
  templateUrl: "./form-planificacion.component.html",
  styleUrls: [
    "./form-planificacion.component.css",
    "./checkbox-style.component.css",
  ],
})
export class FormPlanificacionComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public userLogged: LoginGuard,
    public messageAlert: MessageService,
    public planificacionService: PlanificacionService,
    public navigationService: NavigationService,
    public vacation: VacacionesService,
    public selectOptionAdminComponent: SelectAdminService
  ) {}
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
  // String
  message: string = "";

  // Bandera
  vacationOne: any = {};
  // Fecha
  currentDate: Date = new Date();
  currentYear: number = 0;
  // Array
  macroprocesos: any = [];
  procesos: any = [];
  subprocesos: any = [];
  auditores: any = [];
  auditoresSecundarios: any = [];
  // Boolean
  flagProceso: boolean = false;
  flagSubProceso: boolean = false;
  flagFechas1: any = null;
  flagFechas2: any = null;
  flagEdicion: boolean = false;
  flagData: any = false;
  isOpen: boolean = false;
  flagModal: boolean = false;
  flagAuditorSecundario: boolean = false;
  flagAuditorTerciario: boolean = false;
  flagSelectAuditorSecundario: boolean = false;
  flagSelectAuditorTerciario: boolean = false;

  ngOnInit(): void {
    this.user = this.userLogged.extractUser() as User;
    this.crearFormulario();
    this.getGrcAudit();
    this.getMacroproceso();
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
  validarFechaInicio() {
    const fechaInicio = new Date(this.forma.get("fecha_inicio").value);
    const fechaActual = new Date();
    if (fechaInicio) {
      const fechaInicioMilisegundos = fechaInicio.getTime();
      const fechaActualMilisegundos = fechaActual.getTime();

      if (fechaActualMilisegundos > fechaInicioMilisegundos) {
        this.flagFechas2 = false;
        this.flagAuditorPrimario = false;
        this.flagAuditorSecundario = false;
        this.flagAuditorTerciario = false;
        this.messageAlert.MessageAlertFloatError(
          "La fecha inicial de una  planificación debe ser mayor a la actual"
        );

        return true;
      }

      if (
        fechaActual.getFullYear() < fechaInicio.getFullYear() &&
        fechaInicio.getMonth() < 12
      ) {
        this.flagFechas2 = false;
        this.flagAuditorPrimario = false;
        this.flagAuditorSecundario = false;
        this.flagAuditorTerciario = false;
        this.messageAlert.MessageAlertFloatError(
          "La fecha inicial debe ser la del año vigente"
        );
        return true;
      }
    }
    return false;
  }

  compararFecha() {
    this.vacationOne = [];

    const valid = this.validarFechaInicio();

    if (valid) return;
    const fechaInicio = new Date(this.forma.get("fecha_inicio").value);
    const fechaCulminacion = new Date(
      this.forma.get("fecha_culminacion").value
    );
    const fechaReintegro = new Date(this.vacationOne.fecha_reintegro);

    const fechaInicioMilisegundos = fechaInicio.getTime();
    const fechaCulminacionMilisegundos = fechaCulminacion.getTime();
    const fechaReintegroMilisegundos = fechaReintegro.getTime();
    if (this.flagFechas1) {
      if (fechaReintegroMilisegundos < fechaCulminacionMilisegundos) {
        this.messageAlert.MessageAlertFloatError(
          "La fecha de culminación no puede ser mayor a la fecha a la fecha de Reintegro"
        );
        this.flagFechas2 = false;
      } else if (fechaReintegroMilisegundos === fechaCulminacionMilisegundos) {
        this.messageAlert.MessageAlertFloatError(
          "Las fechas no pueden ser  iguales"
        );
        this.flagFechas2 = false;
      } else {
        this.flagFechas2 = true;
      }
    }
    if (fechaInicioMilisegundos > fechaCulminacionMilisegundos) {
      this.messageAlert.MessageAlertFloatError(
        "La fecha de inicio no puede ser mayor a la fecha de culminación"
      );
      this.flagFechas1 = false;
      this.flagFechas2 = false;
    } else if (fechaInicioMilisegundos === fechaCulminacionMilisegundos) {
      this.messageAlert.MessageAlertFloatError(
        "Las fechas no pueden ser  iguales"
      );
      this.flagFechas1 = false;
      this.flagFechas2 = false;
    } else {
      this.flagFechas1 = true;
      this.vacation
        .getfilterSingleVacation(
          this.forma.get("fecha_inicio").value,
          this.forma.get("fecha_culminacion").value
        )
        .subscribe(
          (res) => {
            this.auditores = res;
            this.flagAuditorPrimario = true;
          },
          (err) => {
            this.messageAlert.MessageAlertFloatError(err.error.message);
          }
        );
    }
  }
  flagAuditorPrimario: boolean = false;

  comprobarAuditores() {
    this.flagAuditorSecundario = this.auditores.length - 1 >= 1 ? true : false;
    this.flagAuditorTerciario =
      this.auditoresSecundarios.length - 1 >= 1 ? true : false;
    this.auditoresSecundarios = this.auditores.filter(
      (vacacion: any) =>
        vacacion.id_auditor_responsable !==
        parseInt(this.forma.get("id_auditor_responsable").value)
    );
    this.auditoresTerciarios = this.auditoresSecundarios.filter(
      (vacacion: any) =>
        vacacion.id_auditor_responsable !==
        parseInt(this.forma.get("id_auditor_secundario").value)
    );
  }

  crearFormulario() {
    this.forma = this.fb.group({
      id_gerencia_encargada: [null, [Validators.required]],
      id_auditor_responsable: [null, [Validators.required]],
      id_auditor_secundario: [0],
      id_auditor_terciario: [0],
      id_macroproceso: [null, Validators.required],
      id_proceso: [null, [Validators.required]],
      id_subproceso: [null, [Validators.required]],
      fecha_inicio: [null, [Validators.required]],
      fecha_culminacion: [null, Validators.required],
      cantidad_subprocesos: [1],
      flagAS400: [false],
      flagSAP: [false],
      flagISTCLEAR: [false],
      flagIST77: [false],
      flagIST73: [false],
      flagNAIGUATA: [false],
      flagDA: [false],
      flagFULL: [false],
      created_year: [this.currentYear, Validators.required],
      mount_end: [null, Validators.required],
      estado: ["Asignado"],
    });
  }

  guardarInforme() {
    this.handleAplicativo();

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
    this.flagModal = true;
    const data = this.forma.value;
    this.planificacionService.postPlanificacion(data).subscribe(
      (res) => {
        this.messageAlert.MessageAlertFloatSucces(
          "Planificación agregada exitosamente!"
        );
      },
      (err) => {
        this.messageAlert.MessageAlertFloatError(err.error.message);
      }
    );
  }

  cantidadAplicativos: number = 0;

  handleAplicativo() {
    this.currentYear = this.currentDate.getFullYear();
    const flagAS400 = this.forma.get("flagAS400").value ? 1 : 0;
    const flagSAP = this.forma.get("flagSAP").value ? 1 : 0;
    const flagISTCLEAR = this.forma.get("flagISTCLEAR").value ? 1 : 0;
    const flagIST77 = this.forma.get("flagIST77").value ? 1 : 0;
    const flagIST73 = this.forma.get("flagIST73").value ? 1 : 0;
    const flagNAIGUATA = this.forma.get("flagNAIGUATA").value ? 1 : 0;
    const flagDA = this.forma.get("flagDA").value ? 1 : 0;
    const flagFULL = this.forma.get("flagFULL").value ? 1 : 0;
    this.cantidadAplicativos =
      flagAS400 +
      flagSAP +
      flagIST77 +
      flagFULL +
      flagDA +
      flagNAIGUATA +
      flagIST73 +
      flagISTCLEAR;
    this.cantidadAplicativos =
      this.cantidadAplicativos === 0 ? 1 : this.cantidadAplicativos;
    this.forma.get("cantidad_subprocesos").setValue(this.cantidadAplicativos);
    this.forma.get("created_year").setValue(this.currentYear);
    const fechaCulminacion = new Date(
      this.forma.get("fecha_culminacion").value
    );
    const fechaMesCulminacion = fechaCulminacion.getMonth() + 1;
    this.forma.get("mount_end").setValue(fechaMesCulminacion);
  }

  getMacroproceso() {
    this.planificacionService.getMacroproceso().subscribe(
      (res) => {
        this.macroprocesos = res as macroproceso;
      },
      (err) => {
        this.messageAlert.MessageAlertFloatError(err.error.message);
      }
    );
  }

  getProceso() {
    this.procesos = [];
    this.subprocesos = [];
    this.flagSubProceso = false;
    this.flagProceso = false;
    let idMacroproceso = this.forma.get("id_macroproceso").value;
    this.planificacionService.getProcesoGroup(idMacroproceso).subscribe(
      (res) => {
        this.procesos = res;
        this.flagProceso = true;
      },
      (err) => {
        this.messageAlert.MessageAlertFloatError(err.error.message);
      }
    );
  }

  getSubProceso() {
    this.subprocesos = [];
    let idProceso = this.forma.get("id_proceso").value;
    this.planificacionService.getSubProcesoGroup(idProceso).subscribe(
      (res) => {
        this.subprocesos = res;
        this.flagSubProceso = true;
      },
      (err) => {
        this.messageAlert.MessageAlertFloatError(err.error.message);
      }
    );
  }

  getComprobar() {
    let idsubProceso = this.forma.get("id_subproceso").value;
  }

  agregarAuditorSecundario() {
    const idAuditorPrimario = parseInt(
      this.forma.get("id_auditor_responsable").value
    );
    this.flagSelectAuditorSecundario = true;
    this.flagAuditorTerciario = this.auditores.length - 1 > 2 ? true : false;
    const vacacionesFiltradas = this.auditores.filter(
      (vacacion: any) => vacacion.id_auditor_responsable !== idAuditorPrimario
    );
    this.auditoresSecundarios = vacacionesFiltradas;
  }
  auditoresTerciarios: any = [];

  agregarAuditorTerciario() {
    const idAuditorPrimario = parseInt(
      this.forma.get("id_auditor_secundario").value
    );
    this.flagSelectAuditorTerciario = true;
    const vacacionesFiltradas = this.auditoresSecundarios.filter(
      (vacacion: any) => vacacion.id_auditor_responsable !== idAuditorPrimario
    );
    this.auditoresTerciarios = vacacionesFiltradas;
  }
  get grcInformeValido() {
    return (
      this.forma.get("id_gerencia_encargada").valid &&
      this.forma.get("id_gerencia_encargada").touched
    );
  }
  get grcInformeNoValido() {
    return (
      this.forma.get("id_gerencia_encargada").invalid &&
      this.forma.get("id_gerencia_encargada").touched
    );
  }

  resetAuditores() {
    // this.flagAuditorSecundario=false;
    this.flagAuditorTerciario = false;
    this.flagSelectAuditorSecundario = false;
    this.flagSelectAuditorTerciario = false;
    this.auditoresSecundarios = [];
    this.auditoresTerciarios = [];
  }

  resetForm() {
    this.router.navigate(["/gestion-planificacion"], {
      skipLocationChange: false,
    });
    this.resetAuditores();
    this.forma.reset();
    this.crearFormulario();
    this.flagAuditorPrimario = false;
    this.flagAuditorSecundario = false;
    this.flagAuditorPrimario = false;
  }
  resturarForm() {
    const idSubproceso = parseInt(this.forma.get("id_subproceso").value);
    const subprocesosFilter = this.subprocesos.filter(
      (vacacion: any) => vacacion.id_subproceso !== idSubproceso
    );
    this.subprocesos = subprocesosFilter;
    this.forma.get("id_subproceso").setValue(null);
    if (this.subprocesos.length === 0) {
      this.subprocesos = [
        {
          id_subproceso: null,
          nombre_subproceso: "Subproceso Agotados",
        },
      ];
    }
    this.flagModal = false;
  }

  subproceso1NoValido() {
    return (
      this.forma.get("id_subproceso").invalid &&
      this.forma.get("id_subproceso").touched
    );
  }
  get fechaInicioNoValido() {
    return (
      this.forma.get("fecha_inicio").invalid &&
      this.forma.get("fecha_inicio").touched
    );
  }
  get procesoValido() {
    return (
      this.forma.get("id_proceso").valid && this.forma.get("id_proceso").touched
    );
  }
  get procesoNoValido() {
    return (
      this.forma.get("id_proceso").invalid &&
      this.forma.get("id_proceso").touched
    );
  }

  get subprocesoValido() {
    return (
      this.forma.get("id_subproceso").valid &&
      this.forma.get("id_subproceso").touched
    );
  }
  get subprocesoNoValido() {
    return (
      this.forma.get("id_subproceso").invalid &&
      this.forma.get("id_subproceso").touched
    );
  }

  get macroProcesoValido() {
    return (
      this.forma.get("id_macroproceso").valid &&
      this.forma.get("id_macroproceso").touched
    );
  }
  get macroProcesoNoValido() {
    return (
      this.forma.get("id_macroproceso").invalid &&
      this.forma.get("id_macroproceso").touched
    );
  }
  get fechaInicioValido() {
    return (
      this.forma.get("fecha_inicio").valid &&
      this.forma.get("fecha_inicio").touched
    );
  }
  get fechaCompromisoValido() {
    return (
      this.forma.get("fecha_culminacion").valid &&
      this.forma.get("fecha_culminacion").touched
    );
  }
  get fechaCompromisoNoValido() {
    return (
      this.forma.get("fecha_culminacion").invalid &&
      this.forma.get("fecha_culminacion").touched
    );
  }
  get fechaReintegroValido() {
    return (
      this.forma.get("fecha_reintegro").valid &&
      this.forma.get("fecha_reintegro").touched
    );
  }
  get fechaReintegroNoValido() {
    return (
      this.forma.get("fecha_reintegro").invalid &&
      this.forma.get("fecha_reintegro").touched
    );
  }

  get auditorResponsableValido() {
    return (
      this.forma.get("id_auditor_responsable").valid &&
      this.forma.get("id_auditor_responsable").touched
    );
  }
  get auditorResponsableNoValido() {
    return (
      this.forma.get("id_auditor_responsable").invalid &&
      this.forma.get("id_auditor_responsable").touched
    );
  }

  get auditorSecundarioValido() {
    return (
      this.forma.get("id_auditor_secundario").valid &&
      this.forma.get("id_auditor_secundario").touched
    );
  }
  get auditorSecundarioNoValido() {
    return (
      this.forma.get("id_auditor_secundario").invalid &&
      this.forma.get("id_auditor_secundario").touched
    );
  }
  get auditorTerciarioValido() {
    return (
      this.forma.get("id_auditor_terciario").valid &&
      this.forma.get("id_auditor_terciario").touched
    );
  }
  get auditorTerciarioNoValido() {
    return (
      this.forma.get("id_auditor_terciario").invalid &&
      this.forma.get("id_auditor_terciario").touched
    );
  }
}
