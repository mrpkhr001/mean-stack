import { TestBed } from '@angular/core/testing';

import { PackDataService } from './pack-data.service';

describe('PackDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PackDataService = TestBed.get(PackDataService);
    expect(service).toBeTruthy();
  });
});
