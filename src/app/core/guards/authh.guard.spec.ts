import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authhGuard } from './authh.guard';

describe('authhGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authhGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
