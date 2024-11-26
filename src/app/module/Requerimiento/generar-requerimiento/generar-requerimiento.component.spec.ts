import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarRequerimientoComponent } from './generar-requerimiento.component';

describe('GenerarRequerimientoComponent', () => {
  let component: GenerarRequerimientoComponent;
  let fixture: ComponentFixture<GenerarRequerimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarRequerimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarRequerimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
