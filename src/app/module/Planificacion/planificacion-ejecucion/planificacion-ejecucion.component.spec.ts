import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificacionEjecucionComponent } from './planificacion-ejecucion.component';

describe('PlanificacionEjecucionComponent', () => {
  let component: PlanificacionEjecucionComponent;
  let fixture: ComponentFixture<PlanificacionEjecucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanificacionEjecucionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanificacionEjecucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
