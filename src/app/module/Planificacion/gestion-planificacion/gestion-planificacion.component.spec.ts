import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPlanificacionComponent } from './gestion-planificacion.component';

describe('GestionPlanificacionComponent', () => {
  let component: GestionPlanificacionComponent;
  let fixture: ComponentFixture<GestionPlanificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionPlanificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionPlanificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
