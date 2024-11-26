import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReporteVPEComponent } from './form-reporte-vpe.component';

describe('FormReporteVPEComponent', () => {
  let component: FormReporteVPEComponent;
  let fixture: ComponentFixture<FormReporteVPEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormReporteVPEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormReporteVPEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
