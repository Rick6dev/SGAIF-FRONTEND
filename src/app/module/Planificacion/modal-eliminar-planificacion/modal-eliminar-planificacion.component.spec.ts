import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarPlanificacionComponent } from './modal-eliminar-planificacion.component';

describe('ModalEliminarPlanificacionComponent', () => {
  let component: ModalEliminarPlanificacionComponent;
  let fixture: ComponentFixture<ModalEliminarPlanificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEliminarPlanificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEliminarPlanificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
