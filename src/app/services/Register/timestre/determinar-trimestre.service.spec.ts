import { TestBed } from '@angular/core/testing';

import { DeterminarTrimestreService } from './determinar-trimestre.service';

describe('DeterminarTrimestreService', () => {
  let service: DeterminarTrimestreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeterminarTrimestreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
