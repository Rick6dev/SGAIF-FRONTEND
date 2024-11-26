import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
// import { Label } from '@mui/icons-material';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);
import { LoginGuard } from "src/app/guards/login.guards";
import { DashboardService } from "src/app/services/Dashboard/dashboard.service";
import { NavigationService } from "src/app/services/Navigation/navigation.service";
import { HallazgoService } from "src/app/services/Register/hallazgo/hallazgo.service";
import { VacacionesService } from "src/app/services/Vacaciones/vacaciones/vacaciones.service";

@Component({
  selector: "app-dashboard-auditoria",
  templateUrl: "./dashboard-auditoria.component.html",
  styleUrls: ["./dashboard-auditoria.component.css"],
})
export class DashboardAuditoriaComponent implements OnInit {
  constructor(
    private hallazgoService: HallazgoService,
    public navigationService: NavigationService,
    private userLogged: LoginGuard,
    public vacation: VacacionesService,
    private cdr: ChangeDetectorRef,
    private dasborad: DashboardService
  ) {}
  years: number[] = [];
  dataGAOF: any = [];
  dataGAT: any = [];
  currentYear: any = 0;
  results: any = [];
  totales: any = [];
  myChart1: Chart | any = null;
  myChart2: Chart | any = null;
  muChart4: Chart | any = null;
  myChart5: Chart | any = null;
  myChart6: Chart | any = null;
  myChart8: Chart | any = null;
  myChart9: Chart | any = null;
  cerradoGAOF: any = [];
  cerradoGAT: any = [];
  totalesGAOF: any = [];
  totalesGAT: any = [];

  restDataRsgGAOF: any = {};
  restDataRsgGAT: any = {};
  ngOnInit(): void {
    this.getCurrentYear();
    this.getYearArray();
    this.getHallazgo();
    this.getTipoNivelRiesgo();
    this.getRiesgoAsociadoGAOF();
    this.getRiesgoAsociadoGAT();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createChartTipoRiesgoGAOF();
      this.createChartTipoRiesgoGAT();
      this.createChartRiesgoGAOF();
      this.createChartRiesgoGAT();
    }, 1000);

    this.createChart();

    this.cdr.detectChanges();
  }

  getCurrentYear() {
    const fecha = new Date();
    this.currentYear = fecha.getFullYear();
  }
  change_Year() {
    this.currentYear = parseInt(this.currentYear);
    this.dataGAT = [];
    this.dataGAOF = [];
    this.updateGrafics();
  }

  getYearArray() {
    const currentYear = new Date().getFullYear();
    const years = Array.from(
      { length: currentYear - 2018 + 1 },
      (_, i) => i + 2018
    );
    this.years = years;
  }
  getGraficsGAOF() {
    const ctx = document.getElementById("myChart11") as HTMLCanvasElement;

    if (!ctx || this.dataGAOF.length === 0) return; // Verifica que el canvas y los datos existan
    this.myChart2 = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Casos Abiertos", "Casos Cerrados"],
        datasets: [
          {
            label: "# de Casos",
            data: this.dataGAOF, // Asegúrate de que esto sea correcto
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(161, 214, 226, 1)",
            ],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(161, 214, 226, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,

        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "rgba(100, 100, 100, 1)", // Color de los labels de la leyenda

              font: {
                size: 16,
                family: "tahoma",
                weight: "bold",
                style: "italic",
              },
            },
          },
          title: {
            display: true,
            text: "Gerencia deAuditoría Operativa y Financiera",
            color: "orange",
            font: {
              size: 20,
              family: "tahoma",
              weight: "bold",
              style: "italic",
            },
          },
        },
      },
    });
  }

  getGraficsGAT() {
    const ctx2 = document.getElementById("myChart2") as HTMLCanvasElement;
    // if (!ctx2 || this.dataGAT.length === 0) return; // Verifica que el canvas y los datos existan
    this.myChart1 = new Chart(ctx2, {
      type: "doughnut",
      data: {
        labels: ["Casos Abiertos", "Casos Cerrados"],
        datasets: [
          {
            label: "# de Casos",
            data: [this.dataGAT[0], this.dataGAT[1]], // Asegúrate de que esto sea correcto
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(161, 214, 226, 1)",
            ],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(161, 214, 226, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,

        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "rgba(100, 100, 100, 1)", // Color de los labels de la leyenda

              font: {
                size: 16,
                family: "tahoma",
                weight: "bold",
                style: "italic",
              },
            },
          },
          title: {
            display: true,
            text: "Gerencia de Auditoría de Tecnología",
            color: "blue",
            font: {
              size: 20,
              family: "tahoma",
              weight: "bold",
              style: "italic",
            },
          },
        },
      },
    });
  }

  public getHallazgo() {
    this.hallazgoService.groupHallazgo().subscribe(
      (res) => {
        this.results = res;
        this.totales = this.results.totales;
        this.dataGAT = [];
        this.dataGAOF = [];
        const rest: any = this.totales;

        rest.forEach((planification: any) => {
          if (this.currentYear == planification.created_year) {
            if (planification.id_gerencia_encargada === 1) {
              this.dataGAT.push(planification.casos_abiertos);
              this.dataGAT.push(planification.casos_cerrados);
            } else {
              this.dataGAOF.push(planification.casos_abiertos);
              this.dataGAOF.push(planification.casos_cerrados);
            }
          }
          if (planification.id_gerencia_encargada === 2) {
            this.totalesGAOF.unshift(planification.total_casos);
            this.cerradoGAOF.unshift(planification.casos_cerrados);
          } else {
            this.totalesGAT.unshift(planification.total_casos);
            this.cerradoGAT.unshift(planification.casos_cerrados);
          }
        });
        this.getGraficsGAOF();
        this.getGraficsGAT();
        this.upadateChart();
      },
      (err) => {}
    );
  }
  upadateChart() {
    if (this.myChart1) {
      this.myChart1.update();
    }
    if (this.myChart2) {
      this.myChart2.update();
    }

    if (this.myChart3) {
      this.myChart3.update();
    }
    if (this.myChart5) {
      this.myChart5.update();
    }
    if (this.myChart6) {
      this.myChart6.update();
    }

    if (this.myChart8) {
      this.myChart8.update();
    }
    if (this.myChart9) {
      this.myChart9.update();
    }
  }

  getTipoNivelRiesgo() {
    this.getTipoNivelRiesgoGAT();
    this.getTipoNivelRiesgoGAOF();
  }

  dataGATNvlR: any = [];
  restDataNvlFGAT: any = [];
  dataGAOFNvlR: any = {};
  restDataNvlFGAOF: any = [];

  getTipoNivelRiesgoGAT() {
    this.dasborad.getTipoNivelRiesgoGAT().subscribe({
      next: (res) => {
        this.restDataNvlFGAT = res;
        this.clasificacionNvlGAT();
      },
      error: (error) => {},
    });
  }

  getTipoNivelRiesgoGAOF() {
    this.dasborad.getTipoNivelRiesgoGAOF().subscribe({
      next: (res) => {
        // this.dataGATNvlR = res;
        this.restDataNvlFGAOF = res;
        this.clasificacionNvlGAOF();
      },
      error: (error) => {},
    });
  }

  getRiesgoAsociadoGAOF() {
    this.dasborad.getRiesgoAsociadoGAOF().subscribe({
      next: (res) => {
        this.restDataRsgGAOF = res;
        this.clasificacionRsgGAOF();
        this.updateRenderGraficsRsg();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getRiesgoAsociadoGAT() {
    this.dasborad.getRiesgoAsociadoGAT().subscribe({
      next: (res) => {
        this.restDataRsgGAT = res;
        this.clasificacionRsgGAT();
        this.updateRenderGraficsRsg();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  dataGATRsg: any = null;
  dataGAOFRsg: any = null;
  clasificacionRsgGAT() {
    const rest: any = this.restDataRsgGAT;
    rest.forEach((planification: any) => {
      if (this.currentYear === planification.created_year) {
        this.dataGATRsg = planification;
      }
    });
    if (!this.myChart9) {
      this.createChartRiesgoGAT();
    }
    this.updateRenderGraficsRsg();
  }

  clasificacionRsgGAOF() {
    const rest: any = this.restDataRsgGAOF;
    rest.forEach((planification: any) => {
      if (this.currentYear === planification.created_year) {
        this.dataGAOFRsg = planification;
      }
    });

    if (!this.myChart8) {
      this.createChartRiesgoGAOF();
    }
    this.updateRenderGraficsRsg();
  }

  clasificacionNvlGAT() {
    const rest: any = this.restDataNvlFGAT;
    rest.forEach((planification: any) => {
      if (this.currentYear === planification.created_year) {
        this.dataGATNvlR = planification;
      }
    });
  }
  clasificacionNvlGAOF() {
    const rest: any = this.restDataNvlFGAOF;
    rest.forEach((planification: any) => {
      if (this.currentYear === planification.created_year) {
        this.dataGAOFNvlR = planification;
      }
    });
    this.updateRenderGrafics();
  }

  updateRenderGrafics() {
    if (this.myChart5 || this.myChart5) {
      this.myChart5.data.datasets[0].data = [
        this.dataGAOFNvlR.bajo,
        this.dataGAOFNvlR.medio,
        this.dataGAOFNvlR.alto,
        this.dataGAOFNvlR.critico,
      ];

      this.myChart6.data.datasets[0].data = [
        this.dataGATNvlR.bajo,
        this.dataGATNvlR.medio,
        this.dataGATNvlR.alto,
        this.dataGATNvlR.critico,
      ];
    }
    this.upadateChart();
  }

  updateRenderGraficsRsg() {
    if (this.myChart8 || this.myChart5) {
      this.myChart8.data.datasets[0].data = [
        this.dataGAOFRsg.operacional,
        this.dataGAOFRsg.tecnologico,
        this.dataGAOFRsg.liquidez,
        this.dataGAOFRsg.credito,
        this.dataGAOFRsg.reputacional,
        this.dataGAOFRsg.legal,
        this.dataGAOFRsg.estrategicos,
        this.dataGAOFRsg.financiero,
      ];
    }

    if (this.myChart9) {
      this.myChart9.data.datasets[0].data = [
        this.dataGATRsg.operacional,
        this.dataGATRsg.tecnologico,
        this.dataGATRsg.liquidez,
        this.dataGATRsg.credito,
        this.dataGATRsg.reputacional,
        this.dataGATRsg.legal,
        this.dataGATRsg.estrategicos,
        this.dataGATRsg.financiero,
      ];
    }
    this.upadateChart();
  }

  updateGrafics() {
    const year = parseInt(this.currentYear);

    const rest: any = this.totales;
    rest.forEach((planification: any) => {
      if (year == planification.created_year) {
        if (planification.id_gerencia_encargada === 1) {
          this.dataGAT.push(planification.casos_abiertos);
          this.dataGAT.push(planification.casos_cerrados);
        } else {
          this.dataGAOF.push(planification.casos_abiertos);
          this.dataGAOF.push(planification.casos_cerrados);
        }
      }
    });

    if (this.myChart2 || this.myChart1) {
      this.myChart2.data.datasets[0].data = [
        this.dataGAOF[0],
        this.dataGAOF[1],
      ];
      this.myChart1.data.datasets[0].data = [this.dataGAT[0], this.dataGAT[1]];

      this.clasificacionNvlGAOF();
      this.clasificacionNvlGAT();
      this.clasificacionRsgGAT();
      this.clasificacionRsgGAOF();

      this.updateRenderGrafics();
      this.upadateChart();
    }
  }
  myChart3: any = [];
  private createChart() {
    const ctx = <HTMLCanvasElement>document.getElementById("myChart3");
    const data: any = [
      {
        label: "Total Casos de GAOF",
        data: this.totalesGAOF,
        fill: false,
        // borderColor: '#1B7B34',
        borderColor: "#C06014",
        tension: 0.1, // Aquí es donde debe ir
        borderWidth: 2,
      },
      {
        label: "Progreso de GAOF",
        data: this.cerradoGAOF,
        fill: false,
        borderColor: "#B82601",
        // borderColor: '#88D317',
        tension: 0.1, // Aquí es donde debe ir
        borderWidth: 2,
      },

      {
        label: "Total Casos GAT",
        data: this.totalesGAT,
        fill: false,
        borderColor: "#4484CE",
        tension: 0.1, // Aquí es donde debe ir
        borderWidth: 2,
      },
      {
        label: "Progreso de GAT",
        data: this.cerradoGAT,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1, // Aquí es donde debe ir
        borderWidth: 2,
      },
    ];
    const option: any = {
      animations: {
        tension: {
          duration: 2000,
          easing: "linear",
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
    };
    this.myChart3 = new Chart(ctx, {
      type: "line",
      data: {
        labels: this.years,
        datasets: data,
      },
      options: option,
    });
  }

  private createChartTipoRiesgoGAOF() {
    const ctx = <HTMLCanvasElement>document.getElementById("myChart5");

    this.myChart5 = new Chart(ctx, {
      type: "bar",

      data: {
        labels: ["Bajo", "Medio", "Alto", "Crítico"],
        datasets: [
          {
            label: "GAOF",
            data: [
              this.dataGAOFNvlR.bajo,
              this.dataGAOFNvlR.medio,
              this.dataGAOFNvlR.alto,
              this.dataGAOFNvlR.critico,
            ],
            backgroundColor: [
              "rgba(40, 255, 100, 0.5)",
              "rgba(200, 200, 2, 1)",
              "rgba(255, 126, 20, 1)",
              "rgba(255, 5, 6, 1)",
            ],
            // borderColor: '#1B7B34',
            borderColor: [
              "rgba(40, 255, 110, 0.5)",
              "rgba(200, 200, 12, 0.4)",
              "rgba(255, 126, 30, 0.6)",
              "rgba(255, 5, 10, 1)",
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        indexAxis: "y",
        scales: {
          y: {
            // defining min and max so hiding the dataset does not change scale range
            min: 0,
            max: 160,
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Gerencia de Auditoría Operativa y Financiera", // Aquí pones tu título
            color: "orange",
            font: {
              size: 16,
              family: "tahoma",
              weight: "bold",
              style: "italic",
            },
          },
        },
      },
    });
  }

  private createChartTipoRiesgoGAT() {
    const ctx = <HTMLCanvasElement>document.getElementById("myChart6");

    this.myChart6 = new Chart(ctx, {
      type: "bar",

      data: {
        labels: ["Bajo", "Medio", "Alto", "Crítico"],
        datasets: [
          {
            label: "GAT",

            data: [
              this.dataGATNvlR.bajo,
              this.dataGATNvlR.medio,
              this.dataGATNvlR.alto,
              this.dataGATNvlR.critico,
            ],
            backgroundColor: [
              "rgba(40, 255, 100, 0.5)",
              "rgba(200, 200, 2, 1)",
              "rgba(255, 126, 20, 1)",
              "rgba(255, 5, 6, 1)",
            ],
            // borderColor: '#1B7B34',
            borderColor: [
              "rgba(40, 255, 110, 0.5)",
              "rgba(200, 200, 12, 0.4)",
              "rgba(255, 126, 30, 0.6)",
              "rgba(255, 5, 10, 1)",
            ],
            borderWidth: 2,
          },
        ],
      },

      options: {
        indexAxis: "y",
        scales: {
          y: {
            // defining min and max so hiding the dataset does not change scale range
            min: 0,
            max: 160,
          },
        },

        plugins: {
          title: {
            display: true,
            text: "Gerencia de Auditoría de Tecnología", // Aquí pones tu título
            color: "blue",
            font: {
              size: 16,
              family: "tahoma",
              weight: "bold",
              style: "italic",
            },
          },
        },
      },
    });
  }

  private createChartRiesgoGAOF() {
    if (this.myChart8) {
      this.myChart8.destroy();
      this.myChart8 = null;
    }
    const ctx = <HTMLCanvasElement>document.getElementById("myChart12");

    this.myChart8 = new Chart(ctx, {
      type: "pie",

      data: {
        labels: [
          "Operacional",
          "Tecnológico",
          "Liquidez",
          "Crédito",
          "Reputacional",
          "Legal",
          "Estratégicos",
          "Financiero",
        ],
        datasets: [
          {
            label: "GAOF",
            data: [
              this.dataGAOFRsg.operacional,
              this.dataGAOFRsg.tecnologico,
              this.dataGAOFRsg.liquidez,
              this.dataGAOFRsg.credito,
              this.dataGAOFRsg.reputacional,
              this.dataGAOFRsg.legal,
              this.dataGAOFRsg.estrategicos,
              this.dataGAOFRsg.financiero,
              ,
            ],
            backgroundColor: [
              "rgba(164, 200, 225, 0.3)", // #A4C8E1
              "rgba(57, 255, 20, 0.3)", // #39FF14
              "rgba(255, 215, 0, 0.3)", // #FFD700
              "rgba(255, 185, 0, 0.6)", // #FFA500
              "rgba(255, 69, 0, 0.3)", // #FF4500
              "rgba(169, 169, 189, 0.7)", // #A9A9A9
              "rgba(128, 0, 128, 0.3)", // #800080
              "rgba(0, 100, 0, 0.3)", // #006400
            ],
            // borderColor: '#1B7B34',
            borderColor: [
              "rgba(164, 200, 225, 0.4)", // #A4C8E1
              "rgba(57, 255, 20, 0.4)", // #39FF14
              "rgba(255, 215, 0, 0.4)", // #FFD700
              "rgba(255, 165, 0, 0.4)", // #FFA500
              "rgba(255, 69, 0, 0.4)", // #FF4500
              "rgba(169, 169, 169, 0.4)", // #A9A9A9
              "rgba(128, 0, 128, 0.4)", // #800080
              "rgba(0, 100, 0, 0.4)", // #006400
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Gerencia de Auditoría Operativa y Financiera", // Aquí pones tu título
            color: "orange",
            font: {
              size: 16,
              family: "tahoma",
              weight: "bold",
              style: "italic",
            },
          },
        },
      },
    });
  }

  private createChartRiesgoGAT() {
    if (this.myChart9) {
      this.myChart9.destroy();
      this.myChart9 = null;
    }
    const ctx = <HTMLCanvasElement>document.getElementById("myChart13");

    this.myChart9 = new Chart(ctx, {
      type: "pie",

      data: {
        labels: [
          "Operacional",
          "Tecnológico",
          "Liquidez",
          "Crédito",
          "Reputacional",
          "Legal",
          "Estratégicos",
          "Financiero",
        ],
        datasets: [
          {
            label: "GAT",
            data: [
              this.dataGATRsg.operacional,
              this.dataGATRsg.tecnologico,
              this.dataGATRsg.liquidez,
              this.dataGATRsg.credito,
              this.dataGATRsg.reputacional,
              this.dataGATRsg.legal,
              this.dataGATRsg.estrategicos,
              this.dataGATRsg.financiero,
              ,
            ],
            backgroundColor: [
              "rgba(164, 200, 225, 0.3)", // #A4C8E1
              "rgba(57, 255, 20, 0.3)", // #39FF14
              "rgba(255, 215, 0, 0.3)", // #FFD700
              "rgba(255, 185, 0, 0.6)", // #FFA500
              "rgba(255, 69, 0, 0.3)", // #FF4500
              "rgba(169, 169, 189, 0.7)", // #A9A9A9
              "rgba(128, 0, 128, 0.3)", // #800080
              "rgba(0, 100, 0, 0.3)", // #006400
            ],
            // borderColor: '#1B7B34',
            borderColor: [
              "rgba(164, 200, 225, 0.4)", // #A4C8E1
              "rgba(57, 255, 20, 0.4)", // #39FF14
              "rgba(255, 215, 0, 0.4)", // #FFD700
              "rgba(255, 165, 0, 0.4)", // #FFA500
              "rgba(255, 69, 0, 0.4)", // #FF4500
              "rgba(169, 169, 169, 0.4)", // #A9A9A9
              "rgba(128, 0, 128, 0.4)", // #800080
              "rgba(0, 100, 0, 0.4)", // #006400
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        indexAxis: "y",
        plugins: {
          title: {
            display: true,
            text: "Gerencia de Auditoría de Tecnología", // Aquí pones tu título
            color: "blue",
            font: {
              size: 16,
              family: "tahoma",
              weight: "bold",
              style: "italic",
            },
          },
        },
      },
    });
    console.clear();
  }

  ngOnDestroy(): void {
    // Destruir los gráficos si existen
    this.destroyGrafics();
  }

  destroyGrafics() {
    if (this.myChart1) {
      this.myChart1.destroy();
      this.myChart1 = null;
    }

    if (this.myChart2) {
      this.myChart2.destroy();
      this.myChart2 = null;
    }
    if (this.myChart3) {
      this.myChart3.destroy();
      this.myChart3 = null;
    }
    if (this.myChart5) {
      this.myChart5.destroy();
      this.myChart5 = null;
    }
    if (this.myChart6) {
      this.myChart6.destroy();
      this.myChart6 = null;
    }
    if (this.myChart8) {
      this.myChart8.destroy();
      this.myChart8 = null;
    }
    if (this.myChart9) {
      this.myChart9?.destroy();
      this.myChart9 = null;
    }
  }
}
