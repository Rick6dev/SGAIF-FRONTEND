import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { LoginGuard } from "src/app/guards/login.guards";
import { User } from "src/app/models/interface";
import { MessageService } from "src/app/services/Message/message.service";
import { NavigationService } from "src/app/services/Navigation/navigation.service";
import { InformeAudService } from "src/app/services/Register/Informe/informe-aud.service";
import { SelectAdminService } from "src/app/services/Register/select-Admin/select-admin.service";
import { RequerimientoService } from "src/app/services/Requerimiento/requerimiento.service";

@Component({
  selector: "app-form-modal-update",
  templateUrl: "./form-modal-update.component.html",
  styleUrls: ["./form-modal-update.component.css"],
})
export class FormModalUpdateComponent implements OnInit, OnChanges {
  constructor(
    private fb: FormBuilder,
    public selectOptionAdminComponent: SelectAdminService,
    public messageAlert: MessageService,
    public navigationService: NavigationService,
    private userLogged: LoginGuard,
    public requerimientoService: RequerimientoService,
    private informeAudService: InformeAudService
  ) {}

  @Input() updateData: any = {
    detalle_requerimiento: "uuuu",
    nombre_responsable: "",
    apellido_responsable: "",
  };
  @Output() datosActualizados = new EventEmitter<any>();

  VPEs: any = [];
  VPs: any = [];
  Grcs: any = [];
  statesReqs: any = [];
  id_Vpe: number = 0;
  id_vp: number = 0;
  flagGrc: boolean = false;
  user: User = {
    userId: 0,
    userNombre: "",
    areaTrabajo: "",
    rol: "",
    role: 0,
    token: "",
  };

  ngOnChanges(changes: SimpleChanges) {
    // Aquí se ejecuta el código cuando miPropiedad cambia
    if (changes["updateData"]) {
      const cambio = changes["updateData"];
      if (cambio.previousValue) {
        this.forma
          .get("id_requerimiento")
          .setValue(cambio.currentValue.id_requerimiento);
        this.forma
          .get("detalle_requerimiento")
          .setValue(cambio.currentValue.detalle_requerimiento);
        this.forma
          .get("nombre_responsable")
          .setValue(cambio.currentValue.nombre_responsable);
        this.forma
          .get("apellido_responsable")
          .setValue(cambio.currentValue.apellido_responsable);
      }
    }
  }
  ngOnInit(): void {
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

  forma: any;

  createFormulario() {
    this.forma = null;
    this.forma = this.fb.group({
      id_requerimiento: [0],
      detalle_requerimiento: [
        this.updateData.detalle_requerimiento,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ],
      ],

      nombre_responsable: [
        this.updateData.nombre_responsable,
        [Validators.required, Validators.minLength(3)],
      ],
      apellido_responsable: [
        this.updateData.apellido_responsable,
        Validators.required,
      ],
    });
  }

  requerimientos: any = [];
  public getRequerimiento() {
    this.requerimientoService.listRequerimiento().subscribe({
      next: (res) => {
        this.requerimientos = res;
        this.datosActualizados.emit(this.requerimientos);
      },
      error: (err) =>
        this.messageAlert.MessageAlertFloatError(err.error.message),
    });
  }

  guardarRequerimiento() {
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach((control) => {
        if (control instanceof FormControl || control instanceof FormGroup) {
          control.markAsTouched();
        }
      });
      console.log(this.forma.value);
      this.messageAlert.MessageAlertError(
        "Todos los campos son obligatorios!",
        ` Estimado Usuario  ${this.user.userNombre} !`
      );
      return;
    } else {
      this.enviarData();
    }
  }
  enviarData() {
    this.requerimientoService
      .updateRequerimientoSolicitud(this.forma.value)
      .subscribe({
        next: (res: any) => {
          this.messageAlert.MessageAlertFloatSucces(res.text);
          this.getRequerimiento();
          // this.resetForm();
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
      .get("id_informe_auditoria")
      .setValue(this.informeData.id_informe_auditoria);

    this.forma
      .get("id_gerencia_encargada")
      .setValue(this.informeData.id_gerencia_encargada);

    this.forma
      .get("id_auditor_responsable")
      .setValue(this.informeData.id_auditor_responsable);
  }

  getRequerimientoNoValido() {
    return (
      this.forma.get("detalle_requerimiento").invalid &&
      this.forma.get("detalle_requerimiento").touched
    );
  }

  getNombreNoValido() {
    return (
      this.forma.get("nombre_responsable").invalid &&
      this.forma.get("nombre_responsable").touched
    );
  }
  getNombreValido() {
    return (
      this.forma.get("apellido_responsable").valid &&
      this.forma.get("apellido_responsable").touched
    );
  }

  getApellidoNoValido() {
    return (
      this.forma.get("apellido_responsable").invalid &&
      this.forma.get("apellido_responsable").touched
    );
  }
  getApellidoValido() {
    return (
      this.forma.get("apellido_responsable").valid &&
      this.forma.get("apellido_responsable").touched
    );
  }
}
