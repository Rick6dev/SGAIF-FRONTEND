import { TestBed } from '@angular/core/testing';

import { TipoAuditService } from './tipo-audit.service';

describe('TipoAuditService', () => {
  let service: TipoAuditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoAuditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
