import { TestBed } from '@angular/core/testing';

import { PuzzleBoardService } from './puzzle-board.service';

describe('PuzzleBoardService', () => {
  let service: PuzzleBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuzzleBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
