import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRequerimientoComponent } from './form-requerimiento.component';

describe('FormRequerimientoComponent', () => {
  let component: FormRequerimientoComponent;
  let fixture: ComponentFixture<FormRequerimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRequerimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRequerimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
