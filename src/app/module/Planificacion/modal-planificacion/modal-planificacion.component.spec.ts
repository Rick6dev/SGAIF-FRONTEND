import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPlanificacionComponent } from './modal-planificacion.component';

describe('ModalPlanificacionComponent', () => {
  let component: ModalPlanificacionComponent;
  let fixture: ComponentFixture<ModalPlanificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPlanificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPlanificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
