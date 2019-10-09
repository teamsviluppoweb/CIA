import { TestBed } from '@angular/core/testing';

import { DomandaService } from './domanda.service';

describe('DomandaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DomandaService = TestBed.get(DomandaService);
    expect(service).toBeTruthy();
  });
});
