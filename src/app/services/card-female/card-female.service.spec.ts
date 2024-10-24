import { TestBed } from '@angular/core/testing';

import { CardFemaleService } from './card-female.service';

describe('CardFemaleService', () => {
  let service: CardFemaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardFemaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
