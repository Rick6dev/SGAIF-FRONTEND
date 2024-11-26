import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComentariosComponent } from './form-comentarios.component';

describe('FormComentariosComponent', () => {
  let component: FormComentariosComponent;
  let fixture: ComponentFixture<FormComentariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormComentariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
