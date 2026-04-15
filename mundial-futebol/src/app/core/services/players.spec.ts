import { TestBed } from '@angular/core/testing';

import { PlayersServices } from './players';

describe('Players', () => {
  let service: PlayersServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayersServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
