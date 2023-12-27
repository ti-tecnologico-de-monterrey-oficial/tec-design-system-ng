import { TestBed } from '@angular/core/testing';

import { DsNgService } from './ds-ng.service';

describe('DsNgService', () => {
  let service: DsNgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DsNgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
