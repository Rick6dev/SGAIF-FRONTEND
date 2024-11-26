import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { LoginGuard } from 'src/app/guards/login.guards';
import { MessageService } from 'src/app/services/Message/message.service';
import { PlanificacionService } from 'src/app/services/Planificacion/planificacion.service';

@Component({
  selector: 'app-modal-planificacion',
  templateUrl: './modal-planificacion.component.html',
  styleUrls: ['./modal-planificacion.component.css','./check-planificacion.component.css']
})
export class ModalPlanificacionComponent implements OnInit {
  constructor(public planificacionService:PlanificacionService,public userLogged: LoginGuard,public messageAlert: MessageService,) { }
  @Input() data: any = [];
   @Input() comentarios:any=[]
  ngOnInit(): void {

  


  }

  ngOnChanges(changes:SimpleChanges){
    if(changes['data']){
    }
    }

}
