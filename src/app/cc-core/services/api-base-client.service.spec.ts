import { TestBed } from '@angular/core/testing';

import { ApiBaseClientService } from './api-base-client.service';

describe('ApiBaseClientService', () => {
  let service: ApiBaseClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiBaseClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
