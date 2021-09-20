import { TestBed } from '@angular/core/testing';

import { ProdavacService } from './prodavac.service';

describe('ProdavacService', () => {
  let service: ProdavacService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdavacService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
