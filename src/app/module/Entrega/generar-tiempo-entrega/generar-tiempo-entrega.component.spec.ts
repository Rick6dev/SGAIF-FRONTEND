import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarTiempoEntregaComponent } from './generar-tiempo-entrega.component';

describe('GenerarTiempoEntregaComponent', () => {
  let component: GenerarTiempoEntregaComponent;
  let fixture: ComponentFixture<GenerarTiempoEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarTiempoEntregaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarTiempoEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
