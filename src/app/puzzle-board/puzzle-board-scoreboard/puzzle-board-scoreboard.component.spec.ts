import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleBoardScoreboardComponent } from './puzzle-board-scoreboard.component';

describe('PuzzleBoardScoreboardComponent', () => {
  let component: PuzzleBoardScoreboardComponent;
  let fixture: ComponentFixture<PuzzleBoardScoreboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuzzleBoardScoreboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleBoardScoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
