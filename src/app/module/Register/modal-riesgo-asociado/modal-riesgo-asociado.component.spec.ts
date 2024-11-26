import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRiesgoAsociadoComponent } from './modal-riesgo-asociado.component';

describe('ModalRiesgoAsociadoComponent', () => {
  let component: ModalRiesgoAsociadoComponent;
  let fixture: ComponentFixture<ModalRiesgoAsociadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRiesgoAsociadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRiesgoAsociadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
