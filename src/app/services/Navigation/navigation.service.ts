import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor() {}
  toggleSidebar(isOpen: boolean) {
    isOpen = !isOpen;
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content2');
    if (isOpen) {
      content!.classList.add('contenthide');
      sidebar!.classList.add('hide'); // Accediendo a nativeElement
    } else {
      sidebar!.classList.remove('hide'); // Accediendo a nativeElement
      content!.classList.remove('contenthide');
    }
  }
}
