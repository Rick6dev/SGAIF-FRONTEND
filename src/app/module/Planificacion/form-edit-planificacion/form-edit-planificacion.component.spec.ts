import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditPlanificacionComponent } from './form-edit-planificacion.component';

describe('FormEditPlanificacionComponent', () => {
  let component: FormEditPlanificacionComponent;
  let fixture: ComponentFixture<FormEditPlanificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEditPlanificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditPlanificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
