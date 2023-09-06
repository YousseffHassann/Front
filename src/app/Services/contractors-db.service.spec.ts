import { TestBed } from '@angular/core/testing';

import { ContractorsDBService } from '../pages/Services/contractors-db.service';

describe('ContractorsDBService', () => {
  let service: ContractorsDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractorsDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
