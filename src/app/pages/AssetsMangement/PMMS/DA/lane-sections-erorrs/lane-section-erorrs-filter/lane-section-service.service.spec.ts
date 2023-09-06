import { TestBed } from '@angular/core/testing';

import { LaneSectionServiceService } from '../lane-section-service.service';

describe('LaneSectionServiceService', () => {
  let service: LaneSectionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaneSectionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
