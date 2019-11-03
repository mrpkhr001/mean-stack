import { TestBed } from '@angular/core/testing';

import { CompanyEnrollmentService } from './company-enrollment.service';

describe('CompanyEnrollmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanyEnrollmentService = TestBed.get(CompanyEnrollmentService);
    expect(service).toBeTruthy();
  });
});
