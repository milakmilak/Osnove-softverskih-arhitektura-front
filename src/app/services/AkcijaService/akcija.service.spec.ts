import { TestBed } from '@angular/core/testing';

import { AkcijaService } from './akcija.service';

describe('AkcijaService', () => {
  let service: AkcijaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AkcijaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
