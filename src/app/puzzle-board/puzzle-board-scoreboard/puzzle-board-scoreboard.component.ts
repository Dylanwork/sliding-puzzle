import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {PuzzleBoardConstants} from '../puzzle-board.constants';

@Component({
  selector: 'app-puzzle-board-scoreboard',
  templateUrl: './puzzle-board-scoreboard.component.html',
  styleUrls: ['./puzzle-board-scoreboard.component.css']
})
export class PuzzleBoardScoreboardComponent implements OnInit {

  @Input() numberOfMoves: number;
  @Input() puzzleState: string;
  @Output() restartHappened: EventEmitter<void>;
  readonly numberOfMovesText: string;
  readonly restartText: string;
  readonly puzzleSolvedText: string;

  constructor() {
    this.restartHappened = new EventEmitter<void>();
    this.numberOfMovesText = PuzzleBoardConstants.NUMBER_OF_MOVES_TEXT;
    this.restartText = PuzzleBoardConstants.RESTART_BUTTON_TEXT;
    this.puzzleSolvedText = PuzzleBoardConstants.PUZZLE_STATE_TEXT;
  }

  ngOnInit(): void {
  }

  restart(): void {
    this.restartHappened.emit();
  }

}
