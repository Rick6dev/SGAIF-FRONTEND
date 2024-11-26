import { TestBed } from '@angular/core/testing';

import { InformeAudService } from './informe-aud.service';

describe('InformeAudService', () => {
  let service: InformeAudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformeAudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
