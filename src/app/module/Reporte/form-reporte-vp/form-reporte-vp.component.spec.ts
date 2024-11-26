import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReporteVPComponent } from './form-reporte-vp.component';

describe('FormReporteVPComponent', () => {
  let component: FormReporteVPComponent;
  let fixture: ComponentFixture<FormReporteVPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormReporteVPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormReporteVPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
