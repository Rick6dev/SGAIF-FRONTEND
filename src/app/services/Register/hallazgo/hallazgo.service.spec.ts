import { TestBed } from '@angular/core/testing';

import { HallazgoService } from './hallazgo.service';

describe('HallazgoService', () => {
  let service: HallazgoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HallazgoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
