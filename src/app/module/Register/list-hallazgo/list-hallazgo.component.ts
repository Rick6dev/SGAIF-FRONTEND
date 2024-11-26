import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login.guards';
import {
  Comentario,
  FlagFilter,
  HallazgoOne,
  HallazgoUnico,
  User,
} from 'src/app/models/interface';
import { MessageService } from 'src/app/services/Message/message.service';
import { NavigationService } from 'src/app/services/Navigation/navigation.service';
import { InformeAudService } from 'src/app/services/Register/Informe/informe-aud.service';
import { HallazgoService } from 'src/app/services/Register/hallazgo/hallazgo.service';
import { LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-list-hallazgo',
  templateUrl: './list-hallazgo.component.html',
  styleUrls: [
    './pagination.component.css',
    './list-hallazgo.component.css',
    './buttonswr.component.css',
  ],
})
export class ListHallazgoComponent implements OnInit {
  user: User = {
    userId: 0,
    userNombre: '',
    areaTrabajo: '',
    rol: '',
    role: 0,
    token: '',
  };
  // Banderas
  isHllz: boolean = true;
  isloading: boolean = true;
  flagNoData: boolean = false;
  isOpen = false;
  flagClose: boolean = false;
  flagHallazgo: boolean = false;
  flagFilter: FlagFilter = {
    estatus: false,
    previoEstado: '0%',
    filter: false,
    filterGrc: false,
    actualEstado: '',
    flagGrc: false,
  };

  // Strings
  checkedItem: string = '';
  message: string = '';
  messages: string = '';
  accion: string = '';
  FlagAllHllz: string = 'Todos los hallazgos';
  // Number
  id: number = 0;
  id_informe_auditoria: number = 1;
  id_hallazgo: number = 0;
  yearInf: number = new Date().getFullYear();
  totalpaginas: number = 0;
  pagina: number = 1;

  // Arrays
  years: number[] = [];
  estatusarry: string[] = [];
  GrcsAud: string[] = [];
  nrmPaginas: number[] = [];
  cod_informe: string | null = '';
  informe: any = {
    cod_informe: '',
    created_mounth: '',
    created_year: '',
    gerencia_encargada: '',
    id_informe_auditoria: 0,
    id_tipo_auditoria: 0,
    nombre_informe: '',
    trimestre: '',
  };
  results: any = null;
  coments: Comentario[] = [
    {
      comentario: '',
      fecha_comentario: new Date(),
      id_auditor_responsable: 0,
      id_comentario: 0,
      id_hallazgo: 0,
    },
  ];
  hallazgo: any = {
    estatus: '0%',
    areaTrabajo: '',
  };
  edit: number = 0;
  hllz: any = [
    {
      accion_correctiva: null,
      cerrado: false,
      estatus_Plan_Accion: '0',
      fecha_cierre: null,
      fecha_compromiso: new Date(),
      fecha_creacion: null,
      hallazgo_reportado: '',
      id_auditor_responsable: 0,
      id_gerencia: 0,
      id_hallazgo: 0,
      id_informe_auditoria: 0,
      id_nivel_riesgo: 0,
      id_riesgo_asociado: 0,
      recomendacion: '',
      areaTrabajo: '',
    },
  ];

  allHllz: any = [];
  flagAllHllz: boolean = false;

  searchTerm: any = {
    searchInforme: '',
    searchAuditor: '',
    searchNivel: '',
    searchRiesgo: '',
    search: '',
    searchYear: '',
  };
  constructor(
    private hallazgoService: HallazgoService,
    private messageAlert: MessageService,
    private activatedRoute: ActivatedRoute,
    private userLogged: LoginGuard,
    private informeAudService: InformeAudService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.incializa();
    this.getData();
    this.gerenciaEncargada();
    this.getYearArray();
  }
  public async incializa() {
    this.user = this.userLogged.extractUser() as User;
    this.cod_informe = this.activatedRoute.snapshot.paramMap.get('cod_informe');
    this.estatusarry = [
      'Selecciona',
      '0%',
      '25%',
      '50%',
      '75%',
      '99%',
      'Cerrado',
    ];
    this.GrcsAud = ['GAT', 'GAOF'];
  }
  public async getData() {
    this.getHallazgo();
  }
  public async getHallazgofilter() {
    if (this.informe.id_informe_auditoria != 0) {
      this.hallazgoService
        .listHallazgofilter(this.informe.id_informe_auditoria)
        .subscribe({
          next: (res) => {
            this.results = res;
            if (this.results.id_informe_auditoria != null) {
              this.id_informe_auditoria = this.results.id_informe_auditoria;
            }
          },
          error: (err) =>
            this.messageAlert.MessageAlertError(
              err.error.message,
              'Estimado usuario !'
            ),
        });
    }
  }
  public getHallazgo() {
    this.hallazgoService.listHallazgo(this.pagina, this.yearInf).subscribe(
      (res) => {
        setTimeout(() => {
          this.results = res;
          this.totalpaginas = this.results.total_paginas;
          this.pagina = this.results.pagina;
          this.isloading = false;
          this.flagNoData = false;
          this.pagination(this.totalpaginas);
          if (this.results.data) {
            this.results = this.results.data;
            console.log(this.edit);
            if (this.edit === 1) {
              this.results.sort((a: any, b: any) => {
                return a.id_gerencia_encargada - b.id_gerencia_encargada;
              });
            }
          }
        }, 200);
      },
      (err) => {
        this.flagNoData = true;
        this.isloading = false;
        this.messages = 'No fueron encontrados hallazgo error en el servidor ';
        this.messageAlert.MessageAlertFloatInfo(err.error.message);
      }
    );
  }

  public searchHllz(event: any) {
    this.searchTerm.searchAuditor = '';
    this.searchTerm.searchNivel = '';
    this.searchTerm.searchRiesgo = '';
    const searchTerm = this.searchTerm.searchInforme.toLowerCase();
    this.searchTerm.search = searchTerm;

    if (searchTerm.length > 2) {
      this.results = this.allHllz.filter((hllz: any) =>
        hllz.informe_auditorium.cod_informe.toLowerCase().includes(searchTerm)
      );
    }
  }
  public resetSearch() {
    this.searchTerm.searchNivel = '';
    this.searchTerm.searchRiesgo = '';
    this.searchTerm.searchAuditor = '';
  }

  public searchYear() {
    this.searchTerm.searchNivel = '';
    this.searchTerm.searchRiesgo = '';
    if (this.searchTerm.searchAuditor != '') {
      this.searchHllzAuditorYear();
    } else {
      this.flagAllHllz = false;
      this.getHallazgoAll();
    }
  }

  newArray: any = [];
  public searchHllzAuditor(event: any) {
    this.searchTerm.searchInforme = '';
    const searchTerm2 = this.searchTerm.searchYear;
    this.searchTerm.searchNivel = '';
    const searchTerm = event.target.value.toLowerCase();
    this.searchTerm.search = searchTerm;
    this.results = this.allHllz.filter(
      (hllz: any) =>
        hllz.usuario.nombre.toLowerCase().includes(searchTerm) ||
        hllz.usuario.apellido.toLowerCase().includes(searchTerm)
    );
    this.newArray = this.results;
    if (this.searchTerm.searchYear != 'Todos los hallazgos') {
      this.results = this.newArray.filter((hllz: any) =>
        hllz.informe_auditorium.cod_informe
          .toLowerCase()
          .includes(this.searchTerm.searchYear)
      );
    }
  }

  public searchHllzAuditorYear() {
    // this.searchTerm.searchInforme = '';
    const searchTerm2 = this.searchTerm.searchYear;
    this.searchTerm.searchNivel = '';
    const searchTerm = this.searchTerm.search;
    this.searchTerm.search = searchTerm;
    this.results = this.allHllz.filter(
      (hllz: any) =>
        hllz.usuario.nombre.toLowerCase().includes(searchTerm) ||
        hllz.usuario.apellido.toLowerCase().includes(searchTerm)
    );
    this.newArray = this.results;
    if (this.searchTerm.searchYear != 'Todos los hallazgos') {
      this.results = this.newArray.filter((hllz: any) =>
        hllz.informe_auditorium.cod_informe
          .toLowerCase()
          .includes(this.searchTerm.searchYear)
      );
    }
  }

  public searchHllzNivel(event: any) {
    this.searchTerm.searchInforme = '';
    this.searchTerm.searchAuditor = '';
    this.searchTerm.searchRiesgo = '';
    const searchTerm = event.target.value.toLowerCase();
    this.searchTerm.search = searchTerm;
    this.results = this.allHllz.filter((hllz: any) =>
      hllz.nivel_riesgo.nombre_nivel_riesgo.toLowerCase().includes(searchTerm)
    );

    this.newArray = this.results;
    if (this.searchTerm.searchInforme != '') {
      this.results = this.newArray.filter((hllz: any) =>
        hllz.informe_auditorium.cod_informe
          .toLowerCase()
          .includes(this.searchTerm.searchYear)
      );
    }
  }

  public searchHllzRsgAsociado(event: any) {
    this.searchTerm.searchInforme = '';
    this.searchTerm.searchAuditor = '';
    this.searchTerm.searchNivel = '';
    const searchTerm = event.target.value.toLowerCase();
    this.searchTerm.search = searchTerm;
    this.results = this.allHllz.filter((hllz: any) =>
      hllz.riesgo_asociado.nombre_riesgo_asociado
        .toLowerCase()
        .includes(searchTerm)
    );

    this.newArray = this.results;
    if (this.searchTerm.searchInforme != '') {
      this.results = this.newArray.filter((hllz: any) =>
        hllz.informe_auditorium.cod_informe
          .toLowerCase()
          .includes(this.searchTerm.searchYear)
      );
    }
  }

  public getHallazgoAll() {
    this.resetSearch();
    this.searchTerm.searchYear = 'Todos los hallazgos';

    this.flagAllHllz = !this.flagAllHllz;
    if (this.flagAllHllz) {
      this.hallazgoService.listHallazgoAll().subscribe(
        (res) => {
          this.allHllz = res;
          this.results = res;
          this.searchTerm.search = '-';
          this.totalpaginas = 0;
          this.pagina = 0;
          this.pagination(this.totalpaginas);
        },
        (err) => {
          this.flagNoData = true;
          this.isloading = false;
          this.messages =
            'No fueron encontrados hallazgo error en el servidor ';
          this.messageAlert.MessageAlertFloatInfo(err.error.message);
        }
      );
    } else {
      this.searchTerm.search = '';
      this.pagina = 1;
      this.yearInf = 2024;
      this.getHallazgo();
    }
  }
  gerenciaEncargada() {
    if (this.user.areaTrabajo === 'GAT') {
      this.edit = 1;
    } else if (this.user.areaTrabajo === 'GAOF') {
      this.edit = 2;
    } else {
      this.edit = 0;
    }
  }
  seguimiento(id: number) {
    this.pagina = this.pagina == 0 ? 1 : this.pagina;
    this.navigationService.toggleSidebar(this.isOpen);
    this.hallazgoService.getOneHllz(id).subscribe(
      (res) => {
        this.hllz = res as HallazgoUnico;
        this.getComent();
      },
      (err) => console.log(err)
    );
  }

  actualizarElemento() {
    if (this.searchTerm.search == '') {
      this.getHallazgo();
    }
  }
  delete(id: number) {
    console.log(id);
    this.hallazgoService.deleteHllz(id).subscribe(
      (res) => {
        location.reload();
      },
      (err) =>
        this.messageAlert.MessageAlertError(
          err.error.message,
          'Estimado usuario !'
        )
    );
  }
  extraerHallazgo(id: number) {
    this.id_hallazgo = id;
    this.isHllz = true;
  }

  getComent() {
    this.hallazgoService.listComent(this.hllz.id_hallazgo).subscribe(
      (res) => {
        this.coments = res as Comentario[];
      },
      (err) => console.log(err)
    );
  }
  pagination(numeros: number) {
    this.nrmPaginas = [];
    for (var i: number = 0; i < numeros; i++) {
      this.nrmPaginas.push(i);
    }
  }
  actualizarPagina(page: number) {
    this.pagina = page;
    if (this.flagFilter.filterGrc) {
      this.filter_Area(this.hllz.areaTrabajo);
    } else if (this.flagFilter.estatus) {
      this.filter_estatus(this.flagFilter.actualEstado);
    } else {
      this.getHallazgo();
    }
  }
  filter_estatus(estatus: string) {
    this.resetFilter();
    this.flagFilter.estatus = true;
    let newEstatus = this.hallazgo.estatus;
    if (estatus != 'Cerrado') {
      newEstatus = estatus.slice(0, -1);
    } else if (estatus === 'Cerrado') {
      newEstatus = estatus;
    } else {
      newEstatus = this.flagFilter.previoEstado;
    }
    this.flagFilter.actualEstado = estatus;
    this.hallazgoService
      .filterHallazgoEstatus(newEstatus, this.pagina, this.yearInf)
      .subscribe({
        next: (res) => {
          this.results = res;
          this.nrmPaginas = [];
          this.totalpaginas = 0;
          this.pagina = 0;

          this.comprobacion();
          this.pagination(this.totalpaginas);

          if (this.results.data) {
            this.results = this.results.data;
            this.pagination(this.totalpaginas);
          }
        },
        error: (err) =>
          this.messageAlert.MessageAlertFloatInfo(err.error.message),
      });
  }

  filter_Area(GrcAud: string) {
    this.resetFilter();

    this.flagFilter.filterGrc = true;
    this.hllz.areaTrabajo = GrcAud;
    let GrcEncargada: number = GrcAud === 'GAT' ? 1 : 2;
    this.hallazgoService
      .filterHallazgoArea(GrcEncargada, this.pagina, this.yearInf)
      .subscribe({
        next: (res) => {
          this.results = res;
          this.nrmPaginas = [];
          this.totalpaginas = this.results.total_paginas;
          this.pagination(this.totalpaginas);

          this.pagina = this.results.pagina;
          // this.comprobacion()
          if (this.results.data) {
            this.results = this.results.data;
          }
        },
        error: (err) =>
          this.messageAlert.MessageAlertFloatInfo(err.error.message),
      });
  }
  resetFilter() {
    this.hllz.areaTrabajo = '';
    this.hllz.estatus = '';
    (this.flagFilter.estatus = false), (this.flagFilter.filter = false);
    this.flagFilter.flagGrc = false;
  }
  resetAll() {
    (this.flagFilter.estatus = false), (this.flagFilter.filter = false);
    this.flagFilter.flagGrc = false;
    this.flagFilter.filterGrc = false;
    this.getHallazgo();
  }

  comprobacion() {
    if (this.results.message === 'Data') {
      this.flagNoData = false;
      this.message = '';
    } else {
      this.message = 'No hemos encontrado Hallazgos con este Filtro';
      this.messageAlert.MessageAlertFloatInfo(this.message);
      this.resetAll();
      setTimeout(() => {
        this.messages =
          'El Informe de Auditoría  no cuenta  con hallazgos  asociados';
        this.flagNoData = false;
        this.isloading = false;
      }, 1000);
    }
  }
  setActiveItem(id: string) {
    const buttonWraps = document.querySelectorAll('.hidden-trigger');

    buttonWraps.forEach((buttonWrap) => {
      if (buttonWrap.id === id) {
        buttonWrap!.classList.add('checked');
      } else {
        buttonWrap!.classList.remove('checked');
      }
    });
    this.checkedItem = this.checkedItem === id ? '' : id;
  }
  aprobarHallazgo(id: string, aprobar: boolean) {
    const aprobarHllz = {
      id_hallazgo: id,
      aprobar: !aprobar,
    };

    this.hallazgoService.aprobarHllz(aprobarHllz).subscribe({
      next: (res) => {
        this.messageAlert.MessageAlertSuccess(
          'Hallazgo Actualizado Exitosamente!',
          'Estimado usuario !'
        );
        if (this.flagFilter.filterGrc) {
          this.filter_Area(this.hllz.areaTrabajo);
        } else if (this.flagFilter.estatus) {
          this.filter_estatus(this.flagFilter.actualEstado);
        } else {
          this.getHallazgo();
        }
      },
      error: (err) => {
        this.messageAlert.MessageAlertError(
          err.error.message,
          'Estimado usuario !'
        );
      },
    });
  }

  aperturarHallazgo(id: string, status: string) {
    const updateHllz = {
      id_hallazgo: id,
      status: status,
      fecha_cierre: null,
      cerrado: false,
    };

    this.hallazgoService.aperturarHllz(updateHllz).subscribe(
      (res) => {
        this.messageAlert.MessageAlertSuccess(
          'Hallazgo Actualizado Exitosamente!',
          'Estimado usuario !'
        );
        if (this.flagFilter.filterGrc) {
          this.filter_Area(this.hllz.areaTrabajo);
        } else if (this.flagFilter.estatus) {
          this.filter_estatus(this.flagFilter.actualEstado);
        } else {
          this.getHallazgo();
        }
      },
      (err) => {
        this.messageAlert.MessageAlertError(
          err.error.message,
          'Estimado usuario !'
        );
      }
    );
  }

  change_Year(yearInfs: number | string) {
    this.pagina = 1;
    if (this.flagFilter.filterGrc) {
      this.filter_Area(this.hllz.areaTrabajo);
    } else if (this.flagFilter.estatus) {
      this.filter_estatus(this.flagFilter.actualEstado);
    } else {
      this.getHallazgo();
    }
  }
  getYearArray() {
    const currentYear = new Date().getFullYear();
    this.yearInf = currentYear;
    const years = Array.from(
      { length: currentYear - 2018 + 1 },
      (_, i) => i + 2018
    );
    this.years = years;
  }
}
