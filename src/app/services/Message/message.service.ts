import { Injectable } from '@angular/core';
import { NavigationComponent } from 'src/app/module/navigation/navigation.component';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor() {}

  MessageAlertQuestion(message: string, title: string) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'question',
      confirmButtonText: 'Cerrar',
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    });
  }

  MessageAlertError(message: string, title: string) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      confirmButtonText: 'Cerrar',
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    });
  }

  MessageAlertSuccess(message: string, title: string) {
    // this.navigationComponent.updateNav();
    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonText: 'Cerrar',
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    });
  }

  MessageAlertWarning(message: string, title: string) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      confirmButtonText: 'Cerrar',
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    });
  }

  MessageAlertFloatSucces(message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: 'success',
      title: message,
    });
  }

  MessageAlertFloatError(message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: 'error',
      title: message,
    });
  }

  MessageAlertFloatInfo(message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: 'info',
      title: message,
    });
  }
}
