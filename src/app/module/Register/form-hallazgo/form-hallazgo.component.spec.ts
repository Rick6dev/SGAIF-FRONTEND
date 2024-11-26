import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHallazgoComponent } from './form-hallazgo.component';

describe('FormHallazgoComponent', () => {
  let component: FormHallazgoComponent;
  let fixture: ComponentFixture<FormHallazgoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormHallazgoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHallazgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
