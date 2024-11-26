import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarOptions, DateSelectArg, EventApi } from '@fullcalendar/core';
import { LoginGuard } from 'src/app/guards/login.guards';
import { User } from 'src/app/models/interface';
import { MessageService } from 'src/app/services/Message/message.service';
import { NavigationService } from 'src/app/services/Navigation/navigation.service';
import { VacacionesService } from 'src/app/services/Vacaciones/vacaciones/vacaciones.service';
import { PlanificacionService } from 'src/app/services/Planificacion/planificacion.service';
import { BackgroundService } from 'src/app/services/Planificacion/background/background.service';

import esLocale from '@fullcalendar/core/locales/es';
import timeGridWeek from '@fullcalendar/timegrid';

import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

// import * as moment from 'moment';
@Component({
  selector: 'app-gestion-vacacion',
  templateUrl: './gestion-vacacion.component.html',
  styleUrls: [
    './gestion-vacacion.component.css',
    './boton-vacacion.component.css',
    './buttonswr.component.css',
    './boton-switch.component.css',
  ],
})
export class GestionVacacionComponent implements OnInit {
  user: any = {
    userId: 0,
    userNombre: '',
    areaTrabajo: '',
    rol: '',
    role: 0,
    token: '',
  };
  forma: any;

  // Bandera
  isOpen: boolean = false;
  flagFechas1: any = null;
  flagFechas2: any = null;
  flagEdicion: boolean = false;
  flagData: any = false;
  // Fecha
  currentDate: Date = new Date();
  currentYear: number = 0;

  // Strings
  message: string = '';
  objectVacation: any = {
    flagVacation: null,
    message: '',
    numeroVacaciones: 0,
  };
  vacationUser: any = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public userLogged: LoginGuard,
    public messageAlert: MessageService,
    public navigationService: NavigationService,
    public vacation: VacacionesService,
    private changeDetector: ChangeDetectorRef,
    public planificacionService: PlanificacionService,
    public colorService: BackgroundService
  ) {}

  calendarVisible = true;
  currentEvents: EventApi[] = [];

  updteVacation() {
    this.vacation
      .getIntraVacacion(this.user.ci_empleado, this.user.userId)
      .subscribe({
        next: (res) => {
          this.messageAlert.MessageAlertFloatSucces('Vacaciones Actualizadas');
          this.getAllVacation();
        },
        error: (err) => {
          this.messageAlert.MessageAlertFloatError(err.message);
        },
      });
  }

  ngOnInit(): void {
    this.getAllVacation();

    this.calendarOptions = {
      plugins: [
        interactionPlugin,
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
        bootstrap5Plugin,
      ],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek,',
      },

      locale: esLocale,

      initialView: 'dayGridMonth',
      initialEvents: [],
      weekends: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      events: this.planvacation,
    };

    this.user = this.userLogged.extractUser() as User;
    this.currentYear = this.currentDate.getFullYear();
    this.getAllVacation();
  }

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr);
  }
  getAllVacation() {
    this.vacation.getVacacion().subscribe(
      (res) => {
        this.vacationUser = res;

        const rest: any = res;
        rest.forEach((planification: any) => {
          const { id_vacacion, usuario, fecha_inicio, fecha_culminacion } =
            planification;
          this.planvacation.push({
            id: id_vacacion,
            title: `${usuario.nombre}  - ${usuario.apellido} `, // a property!
            start: fecha_inicio,
            end: fecha_culminacion,
            backgroundColor: this.colorService.generateRandomDarkColor(),
            borderColor: 'black',
          });
        });

        const filteredData = this.planvacation.filter(
          (item: any) => item.title
        );
        this.planvacation = filteredData;
      },
      (err) => {
        this.messageAlert.MessageAlertFloatError(err.error.message);
      }
    );
  }
  results: any = [];
  flagList: boolean = false;
  changeList() {
    this.flagList = !this.flagList;
  }

  vacationOne: any = {};

  toggledSideBar() {
    this.navigationService.toggleSidebar(this.isOpen);
  }

  calcularDiferenciaDias(fechaIn: string, fechaCulminacion: string): number {
    const fechaInicio: Date = new Date(fechaIn);
    const fechaFin: Date = new Date(fechaCulminacion);
    let diferencia = fechaFin.getTime() - fechaInicio.getTime();
    let diasFinDeSemana = 0;
    let current = new Date(fechaInicio);

    // Iterate through days between start and end date (inclusive)
    while (current <= fechaFin) {
      if (current.getDay() === 0 || current.getDay() === 6) {
        // Check for Saturday (0) and Sunday (6)
        diasFinDeSemana++;
      }
      current.setDate(current.getDate() + 1);
    }

    diferencia -= diasFinDeSemana * 1000 * 60 * 60 * 24;
    return Math.floor(diferencia / (1000 * 60 * 60 * 24));
  }

  ngAfterViewInit() {
    // setInterval(() => {
    //   this.calcularDiferenciaDiasHabiles();
    // }, 1000);
  }
  planvacation: any = [];

  ngOnAfterView() {
    // setTimeout(() => {
    //   this.calendarOptions.events = this.planvacation;
    // }, 100);
  }

  object: any = {};

  calendarOptions: CalendarOptions = {};

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }
}
