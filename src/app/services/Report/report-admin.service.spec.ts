import { TestBed } from '@angular/core/testing';

import { ReportAdminService } from './report-admin.service';

describe('ReportAdminService', () => {
  let service: ReportAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
