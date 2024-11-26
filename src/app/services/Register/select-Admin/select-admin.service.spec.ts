import { TestBed } from '@angular/core/testing';

import { SelectAdminService } from './select-admin.service';

describe('SelectAdminService', () => {
  let service: SelectAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
