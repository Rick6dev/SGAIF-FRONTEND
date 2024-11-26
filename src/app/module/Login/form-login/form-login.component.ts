import { Component, OnInit, Optional, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { request } from 'http';
import { LoginGuard } from 'src/app/guards/login.guards';
import { AuthService } from 'src/app/services/Login/auth.service';
import { MessageService } from 'src/app/services/Message/message.service';
import { NavigationComponent } from '../../navigation/navigation.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css'],
  animations: [
    trigger('miAnimacion', [
      state('in', style({ opacity: 1 })),
      state('out', style({ opacity: 0.2 })),
      transition('in => out', animate('200ms ease-in')),
      transition('out => in', animate('200ms ease-out')),
    ]),
    trigger('text-apparence', [
      state('in', style({ opacity: 1, transform: 'scale(0.9)' })),
      state('out', style({ opacity: 0.5, transform: 'scale(0.9)' })),
      transition('in => out', animate('400ms ease-in')),
      transition('out => in', animate('400ms ease-out')),
    ]),

    trigger('trigger', [
      state('initial', style({ opacity: 0 })),
      state('final', style({ opacity: 1 })),
      transition('initial <=> final', animate('500ms')),
    ]),
  ],
})
export class FormLoginComponent implements OnInit {
  estado: string = 'out';
  user: any = {
    username: '',
    password: '',
  };
  flags: any = {
    flagError: false,
    flagSuccess: false,
  };
  messageBlock: string = '';
  countError: number = 0;
  passwordInput: any;
  isPasswordVisible = false;
  results: any = [];
  forma: any;
  message: string = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public messageAlert: MessageService,
    public router: Router,
    public userLogged: LoginGuard
  ) {}
  Islogged: boolean = false;
  ngOnInit(): void {
    this.message = 'Registrate para continuar';
    this.authService._isLogged.next(false);
    this.crearFormulario();

    setTimeout(() => {
      this.estado = this.estado === 'in' ? 'out' : 'in';
    }, 10);
  }
  ngAfterViewInit() {}
  crearFormulario() {
    this.forma = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(7)]],
    });
  }
  validarUsuario() {
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach((control) => {
        if (control instanceof FormControl || control instanceof FormGroup) {
          control.markAsTouched();
        }
      });
      this.message = 'Todos los campos son obligatorios!';
      this.messageAlert.MessageAlertError(this.message, 'Estimado Usuario !');
      return;
    }
    this.enviarDatos();
  }

  togglePasswordType() {
    const password = document.getElementById('password');
    this.passwordInput = password;
    this.isPasswordVisible = !this.isPasswordVisible;
    this.passwordInput.type = this.isPasswordVisible ? 'text' : 'password';
  }
  enviarDatos() {
    this.authService.loginUser(this.forma.value).subscribe(
      (res) => {
        this.results = res;
        this.message = this.results.message;
        this.flags.flagSuccess = !this.results.noAccess;
        this.flags.flagError = this.results.noAccess;
        this.messageAlert.MessageAlertSuccess(
          this.results.message,
          'Estimado usuario!'
        );
        if (!this.flags.flagError) {
          window.localStorage.setItem('token', this.results);
          this.Islogged = this.userLogged.isLoggedIn();
          this.user = this.userLogged.extractUser();
          this.router.navigate(['inicio'], { replaceUrl: true });
          this.messageAlert.MessageAlertSuccess(
            this.user.message,
            'Estimado usuario!'
          );
        } else {
          this.messageAlert.MessageAlertWarning(
            this.message,
            'Estimado usuario!'
          );
        }
      },
      (err) => {
        this.changeMessage();
        this.flags.flagError = true;
        this.messageAlert.MessageAlertError(
          this.messageBlock,
          'Algo a Fallado Usuario!'
        );
      }
    );
    setTimeout(() => {
      this.flags.flagSuccess = false;
      this.message = 'Registrate para continuar';
    }, 4000);
  }
  changeMessage() {
    this.countError++;
    if (this.countError == 1) {
      this.messageBlock =
        'Usuario los datos son invalidos cuenta con 2 intentos';
    } else if (this.countError == 2) {
      this.messageBlock =
        'Usuario los datos son invalidos cuenta con 1 intentos';
    } else {
      this.messageBlock = 'El Usuario fue bloqueado ';
    }
  }
  get nombreNoValido() {
    return (
      this.forma.get('username').invalid && this.forma.get('username').touched
    );
  }
  get nombreValido() {
    return (
      this.forma.get('username').valid && this.forma.get('username').touched
    );
  }
  get passwordNoValido() {
    return (
      this.forma.get('password').invalid && this.forma.get('password').touched
    );
  }
  get passwordValido() {
    return (
      this.forma.get('password').valid && this.forma.get('password').touched
    );
  }
}
