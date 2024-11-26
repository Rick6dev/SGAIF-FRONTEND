import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSubprocesosComponent } from './modal-subprocesos.component';

describe('ModalSubprocesosComponent', () => {
  let component: ModalSubprocesosComponent;
  let fixture: ComponentFixture<ModalSubprocesosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSubprocesosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSubprocesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
