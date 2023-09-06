import { TestBed } from '@angular/core/testing';

import { SideWalkChartService } from './side-walk-chart.service';

describe('SideWalkChartService', () => {
  let service: SideWalkChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SideWalkChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
