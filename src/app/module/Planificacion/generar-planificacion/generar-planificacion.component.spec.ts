import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarPlanificacionComponent } from './generar-planificacion.component';

describe('GenerarPlanificacionComponent', () => {
  let component: GenerarPlanificacionComponent;
  let fixture: ComponentFixture<GenerarPlanificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarPlanificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarPlanificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
