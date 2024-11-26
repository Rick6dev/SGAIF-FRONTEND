import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTiempoEntregaComponent } from './gestion-tiempo-entrega.component';

describe('GestionTiempoEntregaComponent', () => {
  let component: GestionTiempoEntregaComponent;
  let fixture: ComponentFixture<GestionTiempoEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionTiempoEntregaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionTiempoEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
