import { TestBed } from '@angular/core/testing';

import { CardMaleService } from '../card-male/card-male.service';

describe('CardMaleService', () => {
  let service: CardMaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardMaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
