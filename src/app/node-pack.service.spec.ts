import { TestBed } from '@angular/core/testing';

import { NodePackService } from './node-pack.service';

describe('NodePackService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NodePackService = TestBed.get(NodePackService);
    expect(service).toBeTruthy();
  });
});
