import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'src/app/services/Message/message.service';
import { NavigationService } from 'src/app/services/Navigation/navigation.service';
import { PlanificacionService } from 'src/app/services/Planificacion/planificacion.service';

@Component({
  selector: 'app-modal-subprocesos',
  templateUrl: './modal-subprocesos.component.html',
  styleUrls: ['./modal-subprocesos.component.css','../styles/modal-styles.css',
    '../styles/button-styles.css']
})
export class ModalSubprocesosComponent implements OnInit {

  constructor(private fb: FormBuilder,  public messageAlert: MessageService,
    public navigationService: NavigationService, public planificacionService:PlanificacionService,) { }
   macroprocesos: any = [];
    @Output() datosActualizados = new EventEmitter<any>();
    // Boolean
    flagValid:boolean=false;
    flagVProcesoValid:boolean=false;
  ngOnInit(): void {
    this.crearFormulario();
    this.getMacroProceso();
    this.getTipoProceso();
  }
forma:any=[]

  crearFormulario() {
    this.forma = this.fb.group({
      id_macroproceso:[null,[Validators.required]],
      id_proceso:[null,[Validators.required]],
      subproceso:[null,[Validators.required]]
    });
  }

  guardarProceso(){
    this.planificacionService.postSubProceso(this.forma.value).subscribe(
      (res)=>{
        this.messageAlert.MessageAlertFloatSucces("Subproceso creado correctamente")
        this.forma.reset()
      },
      (err)=>{
        this.messageAlert.MessageAlertFloatError(err.error.message)
      }
    )
  }
  validarForm(){
    console.log( this.forma.get('subproceso').valid )
    this.flagValid=(
      this.forma.get('subproceso').valid 
    );
  }
  procesoValidarForm(){
    this.flagVProcesoValid=(
      this.forma.get('id_proceso').valid &&
      this.forma.get('id_proceso').touched
    );;
  }


  getMacroProceso() {
    this.planificacionService.getMacroproceso().subscribe({
      next:(res) => {
        this.macroprocesos = res ;
      },
      error:(err) => {
        this.messageAlert.MessageAlertFloatError(err.error.message);
      }
  });
  }
tipoProcesos:any=[];
  getTipoProceso(){
    this.planificacionService.getTipoProceso().subscribe({
      next:(res)=>{
        this.tipoProcesos=res;
      },error:(err)=>{
        this.messageAlert.MessageAlertFloatError(err.error.message);

      }
  })
  }

  procesos:any=[];
  flagProceso:boolean=false;

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
  
  get macroprocesoNoValido() {
    return (
      this.forma.get('id_macroproceso').invalid &&
      this.forma.get('id_macroproceso').touched
    );
  }
  get macroprocesoValido() {
    return (
      this.forma.get('id_macroproceso').valid &&
      this.forma.get('id_macroproceso').touched
    );
  }
  get procesoNoValido() {
    return (
      this.forma.get('id_proceso').invalid &&
      this.forma.get('id_proceso').touched
    );
  }
  get procesoValido() {
    return (
      this.forma.get('id_proceso').valid &&
      this.forma.get('id_proceso').touched
    );
  }


  get SubprocesoNoValido() {
    return (
      this.forma.get('subproceso').invalid &&
      this.forma.get('subproceso').touched
    );
  }
  get SubprocesoValido() {
    return (
      this.forma.get('subproceso').valid &&
      this.forma.get('subproceso').touched
    );
  }

  
  get TipoProcesoNoValido() {
    return (
      this.forma.get('id_tipo_proceso').invalid &&
      this.forma.get('id_tipo_proceso').touched
    );
  }
  get TipoProcesoValido() {
    return (
      this.forma.get('id_tipo_proceso').valid &&
      this.forma.get('id_tipo_proceso').touched
    );
  }


}
