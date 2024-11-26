import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/Message/message.service';
import { NavigationService } from 'src/app/services/Navigation/navigation.service';
import { SelectAdminService } from 'src/app/services/Register/select-Admin/select-admin.service';

@Component({
  selector: 'app-form-reporte',
  templateUrl: './form-reporte.component.html',
  styleUrls: [
    './form-reporte.component.css',
    'form-reporte-button.component.css',
    'button.component.css',
    'loader.component.css',
  ],
})
export class FormReporteComponent implements OnInit {
  constructor(
    public messageAlert: MessageService,
    public navigationService: NavigationService,
    public selectOptionAdminComponent: SelectAdminService
  ) {}

  ngOnInit(): void {}
  flagRVPE: boolean = false;
  flagRVP: boolean = false;
  flagRGrc: boolean = false;
  isOpen: boolean = false;
  @Input() VPEs: any = [];
  toggledSideBar() {
    this.navigationService.toggleSidebar(this.isOpen);
  }
  reset() {
    this.flagRVPE = false;
    this.flagRVP = false;
    this.flagRGrc = false;
  }
  flagReportVPE() {
    this.reset();
    this.flagRVPE = true;
  }

  flagReportVP() {
    this.reset();
    this.flagRVP = true;
  }
  flagReportGrc() {
    this.reset();
    this.flagRGrc = true;
  }

  getVPE() {
    this.selectOptionAdminComponent.getVPE().subscribe({
        next: (res) => {
            this.VPEs = res;
        },
        error: (err) => {
            const errorMessage = err.error?.message || 'Error al obtener VPEs';
            this.messageAlert.MessageAlertFloatError(errorMessage);
        }
    });
}

}
