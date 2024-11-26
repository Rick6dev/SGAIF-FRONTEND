import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNivelAsociadoComponent } from './modal-nivel-asociado.component';

describe('ModalNivelAsociadoComponent', () => {
  let component: ModalNivelAsociadoComponent;
  let fixture: ComponentFixture<ModalNivelAsociadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNivelAsociadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNivelAsociadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
