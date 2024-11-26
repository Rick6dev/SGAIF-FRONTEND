import { Component, OnInit } from '@angular/core';
import { InformeAudService } from 'src/app/services/Register/Informe/informe-aud.service';
// import { setTimeout } from 'timers';
import { LoginGuard } from 'src/app/guards/login.guards';
import { MessageService } from 'src/app/services/Message/message.service';
import { HallazgoService } from 'src/app/services/Register/hallazgo/hallazgo.service';
import { NavigationService } from 'src/app/services/Navigation/navigation.service';
import { UpdateInforme, User } from 'src/app/models/interface';

@Component({
  selector: 'app-list-informe',
  templateUrl: './list-informe.component.html',
  styleUrls: [
    './pagination.component.css',
    './buttonswr.component.css',
    '../styles/modal-styles.css',
    '../styles/button-styles.css',
    './list-informe.component.css',
    '../styles/button-styles.css',
  ],
})
export class ListInformeComponent implements OnInit {
  // String
  checkedItem: string = '';

  areaTrabajo: string = '0';

  // Numeros
  yearInf: number = 0;
  totalpaginas: number = 0;
  pagina: number = 1;
  edit: number = 0;
  cantidad = 10;
  id_informe_auditoria: number = 0;
  user: User = {
    userId: 0,
    userNombre: '',
    areaTrabajo: '',
    rol: '',
    role: 0,
    token: '',
  };
  // Bandera
  flagNodata: boolean = false;
  ishllz: boolean = false;
  flagHallazgo: boolean = false;

  fecha: any = 0;

  // Arrays
  nrmPaginas: number[] = [];
  years: any = [];

  results: any = null;
  resultsAll: any = [];

  updateInforme: UpdateInforme = {
    cod_informe: '',
    created_mounth: '',
    created_year: 0,
    id_gerencia_encargada: 0,
    id_informe_auditoria: 0,
    id_tipo_auditoria: 0,
    nombre_informe: '',
    trimestre: '',
  };
  resultshllz: any = null;
  constructor(
    private hallazgoService: HallazgoService,
    private informeAudService: InformeAudService,
    public userLogged: LoginGuard,
    private messageAlert: MessageService,
    private navigationService: NavigationService
  ) {}
  ngOnInit(): void {
    this.getYearArray();
    this.user = this.userLogged.extractUser() as User;
    this.getInforme(this.pagina, this.yearInf);
    this.gerenciaEncargada();
  }
  currentYear: number = 0;

  getYearArray() {
    this.fecha = new Date();
    this.currentYear = new Date().getFullYear();
    this.yearInf = this.currentYear;
    const years = Array.from(
      { length: this.currentYear - 2018 + 1 },
      (_, i) => i + 2018
    );
    this.years = years;
  }

  getInforme(pagina: number, yearInf: number) {
    this.informeAudService
      .listInforme(pagina, this.yearInf, this.areaTrabajo)
      .subscribe(
        (res) => {
          setTimeout(() => {
            this.results = res;
            this.resultsAll = res;
            this.totalpaginas = this.results.total_paginas;
            this.pagina = this.results.pagina;
            this.messageAlert.MessageAlertFloatInfo(this.results.message);
            if (this.results.data) {
              this.results = this.results.data;
              if (this.user.areaTrabajo === 'GAT') {
                this.results.sort((a: any, b: any) => {
                  return a.id_gerencia_encargada - b.id_gerencia_encargada;
                });
              }
              this.pagination(this.totalpaginas);
            }
          }, 50);
        },
        (err) => console.log(err)
      );
  }

  isHllz: boolean = false;
  extraerInforme(id: number) {
    this.id_informe_auditoria = id;
    this.isHllz = false;
  }
  extraerInformeAll(data: any) {
    this.informeAudService.setData(data);
  }
  extraerCodigoInforme(code: string, fechaInforme: Date) {
    this.informeAudService.getOneCod(code).subscribe(
      (res) => {
        this.updateInforme = res as UpdateInforme;
      },
      (err) => console.log(err)
    );
  }
  actualizarInforme() {
    console.log(this.updateInforme);
    this.informeAudService.updateInforme(this.updateInforme).subscribe(
      (res) => {
        this.messageAlert.MessageAlertSuccess(
          'Hallazgo Actualizado Exitosamente!',
          'Estimado usuario !'
        );
        this.getInforme(this.pagina, this.yearInf);
      },
      (err) => {
        console.log(err);
        this.messageAlert.MessageAlertError(
          err.error.message,
          'Estimado usuario !'
        );
      }
    );
  }
  pagination(numeros: number) {
    this.nrmPaginas = [];
    for (var i: number = 0; i < numeros; i++) {
      this.nrmPaginas.push(i);
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
  setActiveItem(id: string) {
    const id_inf = Number(id);
    const buttonWraps = document.querySelectorAll('.hidden-trigger');
    buttonWraps.forEach((buttonWrap) => {
      buttonWrap.id == id
        ? buttonWrap!.classList.add('checked')
        : buttonWrap!.classList.remove('checked');
    });
    this.checkedItem = this.checkedItem === id ? '' : id;
    this.filterInforme(id_inf);
  }
  filterInforme(id: number) {
    this.id_informe_auditoria = id;
    this.getHallazgofilter(this.id_informe_auditoria);
  }
  filterArea(areaTrabajo: string) {
    this.pagina = 1;
    this.getInforme(this.pagina, this.yearInf);
  }

  public async getHallazgofilter(id: number) {
    if (id != 0) {
      this.hallazgoService
        .listHallazgofilter(this.id_informe_auditoria)
        .subscribe(
          (res) => {
            setTimeout(() => {
              this.resultshllz = res;
              this.flagNodata = false;
            }, 100);
          },
          (err) => {
            this.flagNodata = true;
          }
        );
    }
  }
  change_Year(yearInf: number) {
    this.getInforme(1, yearInf);
  }
  filterAreaTrabajo(areaTrabajo: string) {
    const term = parseInt(areaTrabajo);
    if (term === 0) {
      this.results = this.resultsAll;
      return;
    }
  }
  mostrarhllz() {
    this.navigationService.toggleSidebar(false);
    setTimeout(() => {
      this.ishllz = !this.ishllz;
    }, 100);
  }
}
