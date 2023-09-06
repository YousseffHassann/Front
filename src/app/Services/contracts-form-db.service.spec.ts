import { TestBed } from '@angular/core/testing';

import { ContractsFormDbService } from './contracts-form-db.service';

describe('ContractsFormDbService', () => {
  let service: ContractsFormDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractsFormDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
