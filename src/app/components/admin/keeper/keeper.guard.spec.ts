import { TestBed } from '@angular/core/testing';

import { KeeperGuard } from './keeper.guard';

describe('KeeperGuard', () => {
  let guard: KeeperGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(KeeperGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
