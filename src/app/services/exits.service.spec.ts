import { TestBed } from '@angular/core/testing';

import { ExitsService } from './exits.service';

describe('ExitsService', () => {
  let service: ExitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
