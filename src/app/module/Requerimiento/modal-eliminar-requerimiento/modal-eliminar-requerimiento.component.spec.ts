import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarRequerimientoComponent } from './modal-eliminar-requerimiento.component';

describe('ModalEliminarRequerimientoComponent', () => {
  let component: ModalEliminarRequerimientoComponent;
  let fixture: ComponentFixture<ModalEliminarRequerimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEliminarRequerimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEliminarRequerimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
