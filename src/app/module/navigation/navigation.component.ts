import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Router, RouterEvent, RoutesRecognized } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login.guards';
import { MessageService } from 'src/app/services/Message/message.service';
import jwtDecode from 'jwt-decode';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/Login/auth.service';
import { User } from 'src/app/models/interface';
import { PlanificacionService } from 'src/app/services/Planificacion/planificacion.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css', './awasome.component.css'],
})
export class NavigationComponent implements OnInit {
  activeItem: string = 'Inicio';
  constructor(
    private appComponent: AppComponent,
    private elementRef: ElementRef,
    private router: Router,
    public userLogged: LoginGuard,
    public messageAlert: MessageService,
    public authService: AuthService,
    public login: PlanificacionService
  ) {
    this.sidebar = this.elementRef.nativeElement.querySelector('.sidebar');
  }
  @Output() routerOnActivate = new EventEmitter();
  setActiveItem(item: string) {
    this.obtenerFecha();
    this.activeItem = item;
  }
  flagAlert: boolean = false;
  flagPanel: boolean = true;
  Islogged: boolean = false;
  isSup: boolean = false;
  user: any = {
    userId: 0,
    userNombre: '',
    areaTrabajo: '',
    rol: '',
    token: '',
  };
  mode: string | null = 'ligth';
  time: any = '';
  @ViewChildren('sideMenuItem') sideMenuItems: QueryList<ElementRef> =
    new QueryList<ElementRef>();
  @ViewChild('sidebar') sidebar: any;
  isOpen: boolean = false;
  toggleSidebar() {
    this.isOpen = !this.isOpen;
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content2');
    this.obtenerFecha();
    if (!this.isOpen) {
      content!.classList.add('contenthide');
      sidebar!.classList.add('hide');
    } else {
      sidebar!.classList.remove('hide');
      content!.classList.remove('contenthide');
    }
  }

  ngOnInit(): void {
    this.flagPanel = false;
    this.authService.loginUserGet().subscribe((res) => {
      this.Islogged = res;
      this.user = this.userLogged.extractUser() as User;
    });
    this.Islogged = this.userLogged.isLoggedIn();
    this.user = this.userLogged.extractUser();

    this.updateIsSup();

    this.obtenerFecha();
    localStorage.getItem('dark');
    this.checkMode();
    this.flagPanel = false;
    this.updateNav();
    setInterval(() => {
      this.obtenerFecha();
    }, 36001);
  }
  private updateIsSup(): void {
    if (this.Islogged) {
      this.isSup = this.user.role !== 3;
    }
  }

  isDarkMode = false;
  checkMode() {
    this.mode = localStorage.getItem('dark');
    this.mode == 'dark' ? (this.isDarkMode = true) : (this.isDarkMode = false);
    if (this.mode == 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
  toggleDarkMode() {
    this.obtenerFecha();
    this.isDarkMode = !this.isDarkMode;
    const token = localStorage.getItem('token');
    if (this.isDarkMode) {
      window.localStorage.setItem('dark', 'dark');
    } else {
      window.localStorage.setItem('dark', 'ligth');
    }
    document.body.classList.toggle('dark');
  }
  onClickLogut() {
    this.login.logOut().subscribe({
      next: (res) => {
        console.log(res);
        this.flagPanel = false;
        const sidebar = document.getElementById('sidebar');
        const content = document.getElementById('content2');
        sidebar!.classList.remove('hide');
        content!.classList.remove('contenthide');

        this.authService._isLogged.next(false);
        this.Islogged = false;
        this.activeItem = '';
        localStorage.removeItem('token'),
          this.messageAlert.MessageAlertSuccess(
            'Esperamos ser de utilidad',
            'Estimado Usuario Hasta Luego !'
          );
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.messageAlert.MessageAlertFloatError(err.error.message);
      },
    });
  }
  updateNav() {
    this.obtenerFecha();
    this.Islogged = this.userLogged.isLoggedIn();
    this.user = this.userLogged.extractUser();
    if (this.Islogged) {
      this.isSup = this.user.role != 3 ? true : false;
    }
  }
  obtenerFecha() {
    const token = localStorage.getItem('token');
    if (token && typeof token === 'string') {
      const decodedUser: any = jwtDecode(token);
      const diferencia =
        decodedUser.exp - Math.floor(new Date().getTime() / 1000);
      const haPasadoUnaHora = diferencia < 56;
      if (haPasadoUnaHora) {
        this.authService._isLogged.next(false);
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
        this.messageAlert.MessageAlertWarning(
          'El token ha expirado',
          'Estimado usuario !'
        );
        location.reload();
      }
      this.time = (diferencia / 60).toFixed(0);
      if (!this.flagAlert) {
        if (diferencia < 300) {
          this.messageAlert.MessageAlertWarning(
            'El acceso al sistema esta por agotarse.Para evitar la pérdida de datos, guarde su trabajo y vuelva a iniciar sesión ',
            'Estimado usuario !'
          );
          this.flagAlert = true;
        }
      }
    }
  }
  mostrarPanel() {
    this.updateNav();
    this.flagPanel = !this.flagPanel;
  }
}
