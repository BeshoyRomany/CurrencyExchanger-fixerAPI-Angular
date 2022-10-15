import { TestBed } from '@angular/core/testing';

import { CurrencyMessangerService } from './currency-messanger.service';

describe('CurrencyMessangerService', () => {
  let service: CurrencyMessangerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyMessangerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
