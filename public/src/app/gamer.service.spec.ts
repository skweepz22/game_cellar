import { TestBed } from '@angular/core/testing';

import { GamerService } from './gamer.service';

describe('GamerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GamerService = TestBed.get(GamerService);
    expect(service).toBeTruthy();
  });
});
