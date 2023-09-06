import { TestBed } from '@angular/core/testing';

import { AssetsSettingsService } from './assets-settings.service';

describe('AssetsSettingsService', () => {
  let service: AssetsSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetsSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
