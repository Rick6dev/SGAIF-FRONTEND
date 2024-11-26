                                                              import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login.guards';
import { macroproceso, User } from 'src/app/models/interface';
import { MessageService } from 'src/app/services/Message/message.service';
import { NavigationService } from 'src/app/services/Navigation/navigation.service';
import { PlanificacionService } from 'src/app/services/Planificacion/planificacion.service';
import { SelectAdminService } from 'src/app/services/Register/select-Admin/select-admin.service';
import { VacacionesService } from 'src/app/services/Vacaciones/vacaciones/vacaciones.service';

@Component({
  selector: 'app-form-edit-planificacion',
  templateUrl: './form-edit-planificacion.component.html',
  styleUrls: ['./form-edit-planificacion.component.css','./checkbox-style.component.css']
})
export class FormEditPlanificacionComponent implements OnInit {
  @Input() data:any={}
  @Output() datosEliminados = new EventEmitter<any>();


  constructor(private fb: FormBuilder,private router: Router,
    private navigation:NavigationService,
    public userLogged: LoginGuard,public messageAlert: MessageService,
    public planificacionService:PlanificacionService,
    public navigationService: NavigationService,public vacation:VacacionesService,public selectOptionAdminComponent: SelectAdminService) { }
    user: User = {
      userId: 0,
      userNombre: '',
      areaTrabajo: '',
      rol: '',
      role: 0,
      token: '',
    };
    forma: any;
    grcsAud: any = [];
      // Bandera
  isOpen: boolean = false;
  flagFechas1:any=null
  flagFechas2:any=null
  flagEdicion:boolean=false;
  flagData:any=false;
  flagAuditorPrimario:boolean=false;
  flagAuditorSecundario:boolean=false;
  flagAuditorTerciario:boolean=false;
  flagSelectAuditorSecundario:boolean=false;
  flagSelectAuditorTerciario:boolean=false;

  vacationOne:any={};
    // Fecha
    currentDate: Date = new Date();
    currentYear:number =0;
    results:any=[]

    macroprocesos:any=[]
    procesos:any=[];
    subprocesos:any=[];
    flagProceso:boolean=false;
    flagSubProceso:boolean=false;
    message:string='';
    flagModal:boolean=false;
  cantidadAplicativos:number=0;


  ngOnInit(): void {
    this.user=this.userLogged.extractUser() as User;
    this.crearFormulario();
    this.getGrcAudit()
    this.getMacroproceso()
  }

  getGrcAudit() {
    this.selectOptionAdminComponent.getGrcAud().subscribe({
      next:(res) => {
        this.grcsAud = res;
      },
      error:(err) => {
        this.messageAlert.MessageAlertFloatError(err.error.message);
      }
  });
  }

  compararFecha(){
    this.vacationOne=[]
    const fechaInicio = new Date(this.forma.get('fecha_inicio').value);
    const fechaCulminacion = new Date(this.forma.get('fecha_culminacion').value);
    const  fechaReintegro =new Date(this.vacationOne.fecha_reintegro)
    const fechaInicioMilisegundos = fechaInicio.getTime();
    const fechaCulminacionMilisegundos = fechaCulminacion.getTime();
    const fechaReintegroMilisegundos = fechaReintegro.getTime();
      if(this.flagFechas1){
        if (fechaReintegroMilisegundos < fechaCulminacionMilisegundos) {
          this.messageAlert.MessageAlertFloatError("La fecha de culminación no puede ser mayor a la fecha a la fecha de Reintegro");
          this.flagFechas2=false;
        } else if(fechaReintegroMilisegundos === fechaCulminacionMilisegundos) {
          this.messageAlert.MessageAlertFloatError("Las fechas no pueden ser  iguales");
          this.flagFechas2=false;
        }else{
          this.flagFechas2=true
        }
}
if (fechaInicioMilisegundos > fechaCulminacionMilisegundos) {
  this.messageAlert.MessageAlertFloatError("La fecha de inicio no puede ser mayor a la fecha de culminación");
  this.flagFechas1=false;
  this.flagFechas2=false;
} else if(fechaInicioMilisegundos === fechaCulminacionMilisegundos) {
  this.messageAlert.MessageAlertFloatError("Las fechas no pueden ser  iguales");
  this.flagFechas1=false;
  this.flagFechas2=false;

}else{
  this.flagFechas1=true
  this.getFilterSingleVacation();
}
  }


  getFilterSingleVacation(){
    this.vacation.getfilterSingleVacation(this.forma.get('fecha_inicio').value,this.forma.get('fecha_culminacion').value).subscribe(
      (res) => {
        this.auditores=res;
        this.flagAuditorPrimario=true;
      },
      (err) => {
        this.messageAlert.MessageAlertFloatError(err.error.message);
      }
    );
  }

  comprobarAuditores(){
    this.flagAuditorSecundario=this.auditores.length-1>=1?true:false;
    this.flagAuditorTerciario=this.auditoresSecundarios.length-1>=1?true:false;
    this.auditoresSecundarios = this.auditores.filter((vacacion:any) => vacacion.id_auditor_responsable !==parseInt( this.forma.get('id_auditor_responsable').value));
    this.auditoresTerciarios = this.auditoresSecundarios.filter((vacacion:any) => vacacion.id_auditor_responsable !==parseInt( this.forma.get('id_auditor_secundario').value));
  }
  auditores:any=[];
  auditoresSecundarios:any=[];
  ngOnChanges(){
    this.crearFormulario()
  }

  crearFormulario() {
    const edit=this.data;
    this.forma = this.fb.group({
      id_planificacion_auditoria:[edit.id_planificacion_auditoria,[Validators.required]],
      id_gerencia_encargada: [edit.id_gerencia_encargada, [Validators.required,]],
      id_auditor_responsable: [edit.id_auditor_responsable, [Validators.required,]],
      id_auditor_secundario: [edit.id_auditor_secundario, ],
      id_auditor_terciario: [edit.id_auditor_terciario, ],
      id_macroproceso:[edit.subproceso.proceso.macroproceso.id_macroproceso,Validators.required],
      id_proceso: [edit.subproceso.proceso.id_proceso, [Validators.required,]],
      id_subproceso: [edit.subproceso.id_subproceso, [Validators.required,]],
      fecha_inicio: [edit.fecha_inicio, [Validators.required,]],
      fecha_culminacion: [edit.fecha_culminacion, Validators.required],
      cantidad_subprocesos: [edit.cantidad_subprocesos],
      flagAS400:[edit.flagAS400],
      flagSAP:[edit.flagSAP],
      flagISTCLEAR:[edit.flagISTCLEAR],
      flagIST77:[edit.flagIST77],
      flagIST73:[edit.flagIST77],
      flagNAIGUATA:[edit.flagNAIGUATA],
      flagDA:[edit.flagDA],
      flagFULL:[edit.flagFULL],
      created_year:[edit.created_year,Validators.required],
      mount_end:[edit.mount_end,Validators.required]

    });
  }
  getPlanificacion(){
    this.planificacionService.getProceso()

    this.planificacionService.getPlanificacion().subscribe({
      next:(res) => {
        this.results = res ;
        this.datosEliminados.emit(this.results);
      },
      error:(err) => {
        this.messageAlert.MessageAlertFloatError(err.error.message);
      }
  });
  }


  guardarInforme(){
    this.handleAplicativo();
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach((control) => {
        if (control instanceof FormControl || control instanceof FormGroup) {
          control.markAsTouched();
        }
      });
      this.message = 'Todos los campos son obligatorios';
      this.messageAlert.MessageAlertError(this.message, 'Estimado usuario!');
      return;
    }
    const data =this.forma.value;
    this.planificacionService.updatePlanificacion(data).subscribe({
      next:(res) => {
          this.messageAlert.MessageAlertFloatSucces("Planificación actualizada exitosamente!")     
          this.getPlanificacion();   
      },
      error:(err) => {
        this.messageAlert.MessageAlertFloatError(err.error.message);
      }
   } );
  }


  handleAplicativo(){
    this.currentYear=this.currentDate.getFullYear();
    const flagAS400=this.forma.get('flagAS400').value?1:0;
    const flagSAP=this.forma.get('flagSAP').value?1:0;
    const flagISTCLEAR=this.forma.get('flagISTCLEAR').value?1:0;
    const flagIST77=this.forma.get('flagIST77').value?1:0;
    const flagIST73=this.forma.get('flagIST73').value?1:0;
    const flagNAIGUATA=this.forma.get('flagNAIGUATA').value?1:0;
    const flagDA=this.forma.get('flagDA').value?1:0;
    const flagFULL=this.forma.get('flagFULL').value?1:0;
    this.cantidadAplicativos =flagAS400+flagSAP+flagIST77+flagFULL+flagDA+flagNAIGUATA+flagIST73+flagISTCLEAR;
    this.cantidadAplicativos=this.cantidadAplicativos===0?1:this.cantidadAplicativos;
    this.forma
    .get('cantidad_subprocesos')
    .setValue(this.cantidadAplicativos);
    this.forma
    .get('created_year')
    .setValue(this.currentYear);
    const fechaCulminacion = new Date(this.forma.get('fecha_culminacion').value);
    const fechaMesCulminacion= fechaCulminacion.getMonth()+1;
    this.forma
    .get('mount_end')
    .setValue(fechaMesCulminacion);
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

  getProceso(){
    let idMacroproceso = this.forma.get('id_macroproceso').value;
    this.planificacionService.getProcesoGroup(idMacroproceso).subscribe({
      next:(res)=>{
        this.procesos =res;
        this.flagProceso=true;
      },
      error:(err)=>{
        this.messageAlert.MessageAlertFloatError(err.error.message)
      }
  })
  }

  getSubProceso(){
    let idProceso = this.forma.get('id_proceso').value;
    this.planificacionService.getSubProcesoGroup(idProceso).subscribe(
      (res)=>{
        this.subprocesos =res;
        this.flagSubProceso=true;
      },
      (err)=>{
        this.messageAlert.MessageAlertFloatError(err.error.message)
      }
    )
  }

  getComprobar(){
    let idsubProceso = this.forma.get('id_subproceso').value;
  }

  agregarAuditorSecundario(){
    const idAuditorPrimario=parseInt(this.forma.get('id_auditor_responsable').value)
    this.flagSelectAuditorSecundario=true;
    this.flagAuditorTerciario= this.auditores.length-1>2?true:false;
    const vacacionesFiltradas = this.auditores.filter((vacacion:any) => vacacion.id_auditor_responsable !== idAuditorPrimario);
    this.auditoresSecundarios=vacacionesFiltradas
  }
auditoresTerciarios:any=[]
  
agregarAuditorTerciario(){
    const idAuditorPrimario=parseInt(this.forma.get('id_auditor_secundario').value)
    this.flagSelectAuditorTerciario=true;
    const vacacionesFiltradas = this.auditoresSecundarios.filter((vacacion:any) => vacacion.id_auditor_responsable !== idAuditorPrimario);
    this.auditoresTerciarios=vacacionesFiltradas
  }


  resetAuditores(){
    // this.flagAuditorSecundario=false;
    this.flagAuditorTerciario=false;
    this.flagSelectAuditorSecundario=false;
    this.flagSelectAuditorTerciario=false;
    this.auditoresSecundarios=[];
    this.auditoresTerciarios=[];
  }


  resetForm() {
    this.router.navigate(['/gestion-planificacion'], {
      skipLocationChange: false,
    });
    this.resetAuditores()
    this.forma.reset();
    this.crearFormulario()
    this.flagAuditorPrimario=false;
    this.flagAuditorSecundario=false;
    this.flagAuditorPrimario=false;
   
  }
   resturarForm(){
        const idSubproceso=parseInt(this.forma.get('id_subproceso').value)
        const subprocesosFilter =  this.subprocesos.filter((vacacion:any) =>
          vacacion.id_subproceso !== idSubproceso);
        this.subprocesos=subprocesosFilter;
        this.forma
        .get('id_subproceso')
        .setValue(null);
        if(this.subprocesos.length===0){
          this.subprocesos=[{
                id_subproceso: null,
                nombre_subproceso: 'Subproceso Agotados',
            }]
        }
        this.flagModal=false;
  }

    subproceso1NoValido() {
      return (
        this.forma.get('id_subproceso').invalid &&
        this.forma.get('id_subproceso').touched
      );}
    get fechaInicioNoValido() {
      return (
        this.forma.get('fecha_inicio').invalid &&
        this.forma.get('fecha_inicio').touched
      );
    }
    get procesoValido() {
      return (
        this.forma.get('id_proceso').valid &&
        this.forma.get('id_proceso').touched
      );
    }
    get procesoNoValido() {
      return (
        this.forma.get('id_proceso').invalid &&
        this.forma.get('id_proceso').touched
      );
    }

    get subprocesoValido() {
      return (
        this.forma.get('id_subproceso').valid &&
        this.forma.get('id_subproceso').touched
      );
    }
    get subprocesoNoValido() {
      return (
        this.forma.get('id_subproceso').invalid &&
        this.forma.get('id_subproceso').touched
      );
    }

    get macroProcesoValido() {
      return (
        this.forma.get('id_macroproceso').valid &&
        this.forma.get('id_macroproceso').touched
      );
    }
    get macroProcesoNoValido() {
      return (
        this.forma.get('id_macroproceso').invalid &&
        this.forma.get('id_macroproceso').touched
      );
    }
    get fechaInicioValido() {
      return (
        this.forma.get('fecha_inicio').valid &&
        this.forma.get('fecha_inicio').touched
      );
    }
    get fechaCompromisoValido() {
      return (
        this.forma.get('fecha_culminacion').valid &&
        this.forma.get('fecha_culminacion').touched
      );
    }
    get fechaCompromisoNoValido() {
      return (
        this.forma.get('fecha_culminacion').invalid &&
        this.forma.get('fecha_culminacion').touched
      );
    }
    get fechaReintegroValido() {
      return this.forma.get('fecha_reintegro').valid && this.forma.get('fecha_reintegro').touched;
    }
    get fechaReintegroNoValido() {
      return (
        this.forma.get('fecha_reintegro').invalid && this.forma.get('fecha_reintegro').touched
      );
    }

    get auditorResponsableValido() {
      return this.forma.get('id_auditor_responsable').valid && this.forma.get('id_auditor_responsable').touched;
    }
    get auditorResponsableNoValido() {
      return (
        this.forma.get('id_auditor_responsable').invalid && this.forma.get('id_auditor_responsable').touched
      );
    }

    get auditorSecundarioValido() {
      return this.forma.get('id_auditor_secundario').valid && this.forma.get('id_auditor_secundario').touched;
    }
    get auditorSecundarioNoValido() {
      return (
        this.forma.get('id_auditor_secundario').invalid && this.forma.get('id_auditor_secundario').touched
      );
    }
    get auditorTerciarioValido() {
      return this.forma.get('id_auditor_terciario').valid && this.forma.get('id_auditor_terciario').touched;
    }
    get auditorTerciarioNoValido() {
      return (
        this.forma.get('id_auditor_terciario').invalid && this.forma.get('id_auditor_terciario').touched
      );
    }
  

    get grcInformeValido() {
      return this.forma.get('id_gerencia_encargada').valid && this.forma.get('id_gerencia_encargada').touched;
    }
    get grcInformeNoValido() {
      return (
        this.forma.get('id_gerencia_encargada').invalid && this.forma.get('id_gerencia_encargada').touched
      );
    }
}
