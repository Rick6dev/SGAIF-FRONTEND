import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInformeComponent } from './form-informe.component';

describe('FormInformeComponent', () => {
  let component: FormInformeComponent;
  let fixture: ComponentFixture<FormInformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInformeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
