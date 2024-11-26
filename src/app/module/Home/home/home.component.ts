import { LoginGuard } from 'src/app/guards/login.guards';
import { User } from 'src/app/models/interface';
import { NavigationService } from 'src/app/services/Navigation/navigation.service';
import { HallazgoService } from 'src/app/services/Register/hallazgo/hallazgo.service';
import { VacacionesService } from 'src/app/services/Vacaciones/vacaciones/vacaciones.service';
import { Subject, takeUntil } from 'rxjs';

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', 'buttons.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private hallazgoService: HallazgoService,
    public navigationService: NavigationService,
    private userLogged: LoginGuard,
    public vacation: VacacionesService,
    private cdr: ChangeDetectorRef
  ) {}
  results: any = [];
  totales: any = [];
  cerrados: any = [];
  abiertos: any = [];
  // Bandera
  flagAbierto: boolean = false;
  flagCerrado: boolean = false;
  flagTodo: boolean = false;
  flagData: boolean = false;
  isOpen: boolean = false;
  cerradoGAOF: any = [];
  cerradoGAT: any = [];
  isloading: boolean = false;

  years: number[] = [];
  private destroy$ = new Subject<void>();

  public getHallazgo() {
    this.hallazgoService
      .groupHallazgo()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.results = res;
          this.totales = this.results.totales;
          this.cerrados = this.results.cerrados;
          this.abiertos = this.results.abiertos;
          this.flagData = true;
          this.iterarHallazgo();
          this.createChart();
        },
        (err) => {}
      );
  }

  totalesGAOF: any = [];
  totalesGAT: any = [];
  iterarHallazgo() {
    const rest: any = this.totales;
    rest.forEach((planification: any) => {
      if (planification.id_gerencia_encargada === 2) {
        this.totalesGAOF.unshift(planification.total_casos);
        this.cerradoGAOF.unshift(planification.casos_cerrados);
      } else {
        this.totalesGAT.unshift(planification.total_casos);
        this.cerradoGAT.unshift(planification.casos_cerrados);
      }
    });
  }

  public flagAbiertos() {
    this.resetFlag();
    this.flagAbierto = true;
  }
  public flagCerrados() {
    this.resetFlag();
    this.flagCerrado = true;
  }
  public flagTodos() {
    this.resetFlag();
    this.flagTodo = true;
  }

  public resetFlag() {
    this.flagAbierto = false;
    this.flagCerrado = false;
    this.flagTodo = false;
  }
  user: any = [];
  ngOnInit(): void {
    this.destroyGrafic();
    this.getYearArray();
    this.getHallazgo();
    this.flagTodo = true;
    this.user = this.userLogged.extractUser() as User;
  }

  toggledSideBar() {
    this.navigationService.toggleSidebar(this.isOpen);
  }
  flagPDF: boolean = false;
  generarPDF() {
    this.flagPDF = true;
  }

  private myChart: Chart | null = null;

  getYearArray() {
    const currentYear = new Date().getFullYear();
    const years = Array.from(
      { length: currentYear - 2018 + 1 },
      (_, i) => i + 2018
    );
    this.years = years;
  }
  public createChart() {
    const ctx = <HTMLCanvasElement>document.getElementById('myChart4');

    // const mixedChart = new Chart(ctx, {
    //   data: {
    //     datasets: [
    //       {
    //         data: this.cerradoGAT,
    //         type: 'bar',
    //         label: 'Progreso de GAT',
    //         // borderColor: '#C06014',
    //       },
    //       {
    //         type: 'bar',
    //         label: 'Progreso de GAOF',
    //         data: this.cerradoGAOF,
    //       },
    //       {
    //         type: 'line',
    //         label: 'Total Casos de GAOF',
    //         data: this.totalesGAOF,
    //       },
    //       {
    //         type: 'line',
    //         label: 'Total Casos de GAT',
    //         data: this.totalesGAT,
    //       },
    //     ],
    //     labels: this.years,
    //   },
    // });
    this.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.years,
        datasets: [
          {
            label: 'Total Hallazgos GAOF',
            data: this.totalesGAOF,
            fill: false,
            // borderColor: '#1B7B34',
            borderColor: '#C06014',
            tension: 0.1, // Aquí es donde debe ir
            borderWidth: 2,
          },
          {
            label: 'Progreso de GAOF',
            data: this.cerradoGAOF,
            fill: false,
            borderColor: '#B82601',
            // borderColor: '#88D317',
            tension: 0.1, // Aquí es donde debe ir
            borderWidth: 2,
          },

          {
            label: 'Total Hallazgos GAT',
            data: this.totalesGAT,
            fill: false,
            borderColor: '#4484CE',
            tension: 0.1, // Aquí es donde debe ir
            borderWidth: 2,
          },
          {
            label: 'Progreso de GAT',
            data: this.cerradoGAT,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1, // Aquí es donde debe ir
            borderWidth: 2,
          },
        ],
      },

      options: {
        animations: {
          tension: {
            duration: 2000,
            easing: 'linear',
            from: 0.3,
            to: 0,
            loop: true,
          },
        },
        scales: {
          y: {
            // defining min and max so hiding the dataset does not change scale range
            min: 0,
            max: 160,
          },
        },
      },
    });
    this.isloading = true;
  }
  ngOnDestroy(): void {
    // Destruir los gráficos si existen
    this.destroyGrafic();
  }
  destroyGrafic() {
    if (this.myChart) {
      this.myChart.destroy();
      this.destroy$.next();
      this.destroy$.complete(); // Completa el Subject
      this.myChart = null; // Limpiar referencia
    }
  }
}
