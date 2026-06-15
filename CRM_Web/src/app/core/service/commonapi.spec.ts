import { TestBed } from '@angular/core/testing';

import { Commonapi } from './commonapi';

describe('Commonapi', () => {
  let service: Commonapi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Commonapi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
