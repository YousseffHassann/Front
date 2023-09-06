import { TestBed } from '@angular/core/testing';

import { MDService } from './md.service';

describe('MDService', () => {
  let service: MDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
