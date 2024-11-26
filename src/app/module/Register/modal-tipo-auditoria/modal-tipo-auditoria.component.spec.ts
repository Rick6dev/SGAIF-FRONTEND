import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTipoAuditoriaComponent } from './modal-tipo-auditoria.component';

describe('ModalTipoAuditoriaComponent', () => {
  let component: ModalTipoAuditoriaComponent;
  let fixture: ComponentFixture<ModalTipoAuditoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTipoAuditoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTipoAuditoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
