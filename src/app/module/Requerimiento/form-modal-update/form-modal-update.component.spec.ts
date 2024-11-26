import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModalUpdateComponent } from './form-modal-update.component';

describe('FormModalUpdateComponent', () => {
  let component: FormModalUpdateComponent;
  let fixture: ComponentFixture<FormModalUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormModalUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormModalUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
