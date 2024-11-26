import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReporteGrcComponent } from './form-reporte-grc.component';

describe('FormReporteGrcComponent', () => {
  let component: FormReporteGrcComponent;
  let fixture: ComponentFixture<FormReporteGrcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormReporteGrcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormReporteGrcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
