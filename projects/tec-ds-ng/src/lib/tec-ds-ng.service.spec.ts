import { TestBed } from '@angular/core/testing';

import { TecDsNgService } from './tec-ds-ng.service';

describe('TecDsNgService', () => {
  let service: TecDsNgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TecDsNgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
