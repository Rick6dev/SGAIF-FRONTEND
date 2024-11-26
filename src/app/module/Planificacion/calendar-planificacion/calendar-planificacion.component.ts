
import esLocale from '@fullcalendar/core/locales/es';
import timeGridWeek from '@fullcalendar/timegrid';
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { PlanificacionService } from 'src/app/services/Planificacion/planificacion.service';
import { BackgroundService } from 'src/app/services/Planificacion/background/background.service';
// import interactionPlugin from '@fullcalendar/interaction';
@Component({
  selector: 'app-calendar-planificacion',
  templateUrl: './calendar-planificacion.component.html',
  styleUrls: ['./calendar-planificacion.component.css']
})

export class CalendarPlanificacionComponent implements OnInit {
  planvacation:any=[];
ngOnInit(){
  this.calendarOptions={
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,bootstrap5Plugin
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek,'
    },
  
    locale: esLocale,

    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, 
    weekends: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    events: this.planvacation
  };
  this.planificacionService.getPlanificacionCalendar().subscribe(
    (res:any) => {
      this.planvacation=res
      const rest:any=res
      rest.forEach((planification:any) => {
        const {end,start,id,cantidad_procesos,auditorResponsable,auditorSecundario,auditorTerciario,subproceso}=planification
        const {nombre_subproceso} =subproceso;
        this.planvacation.push({
          id:id,
          title:  `${nombre_subproceso}  - (${auditorResponsable.nombre} ${auditorResponsable.apellido})`, // a property!
          start: start,
          end: end,
          backgroundColor: this.colorService.generateRandomDarkColor(),
          borderColor: "black",
          auditorPrimario:`${auditorResponsable.nombre} ${auditorResponsable.apellido}`,
          auditorSecundario:`${auditorSecundario.nombre} ${auditorSecundario.apellido}`,
          auditorTerciario:`${auditorTerciario.nombre} ${auditorTerciario.apellido}`,
        })
      });
      const filteredData = this.planvacation.filter((item:any) => item.title);

      this.calendarOptions.events=filteredData
    
    },
    (err) => {
      // this.messageAlert.MessageAlertFloatError(err.error.message);
    }
  );
}
ngOnAfterView(){
  this.calendarOptions.events= this.planvacation
}
  calendarVisible = true;
  calendarOptions: CalendarOptions ={} 
  currentEvents: EventApi[] = [];
  constructor(private changeDetector: ChangeDetectorRef, public planificacionService:PlanificacionService,public colorService:BackgroundService) {
  }
  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }
  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); 
    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }



  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

object:any={}

}
