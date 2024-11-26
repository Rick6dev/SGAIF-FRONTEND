import { TestBed } from '@angular/core/testing';

import { GestionTiempoEntregaService } from './gestion-tiempo-entrega.service';

describe('GestionTiempoEntregaService', () => {
  let service: GestionTiempoEntregaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionTiempoEntregaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
