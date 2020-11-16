import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IPuzzlePiece} from './shared/puzzle-piece.model';
import {IGridIndex} from './shared/grid-index.model';
import {PuzzleBoardConstants} from './puzzle-board.constants';
import {wrapGrid} from 'animate-css-grid';
import {PuzzleBoardService} from './shared/puzzle-board.service';

@Component({
  selector: 'app-puzzle-board',
  templateUrl: './puzzle-board.component.html',
  styleUrls: ['./puzzle-board.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PuzzleBoardComponent implements OnInit {
  puzzlePieceMatrix: IPuzzlePiece[][];
  puzzlePieceAltText: string = PuzzleBoardConstants.PUZZLE_IMG_ALT_TEXT;
  pieceBeingDragged: IGridIndex;
  numberOfMoves: number;
  puzzleState = PuzzleBoardConstants.PUZZLE_UNSOLVED;
  private blankPuzzlePiece: IPuzzlePiece;
  private blankPuzzlePieceIndexes: IGridIndex;

  constructor(private puzzleBoardService: PuzzleBoardService) {
  }

  private static setupAnimations() {
    const grid = document.querySelector('.puzzle-pieces');
    wrapGrid(grid as HTMLElement);
  }

  ngOnInit(): void {
    this.initializePuzzleState();
    this.puzzleBoardService.shuffleWhileNotSolvable(this.puzzlePieceMatrix);
    PuzzleBoardComponent.setupAnimations();
  }

  movePuzzlePiece(indexes: IGridIndex): void {
    if (this.checkIfPuzzleIsSolved()) {
      return;
    }
    if (!this.canMovePuzzlePiece(indexes)) {
      return;
    }
    this.swapPieceWithBlank(indexes);
    this.updatePuzzleState();
    this.numberOfMoves += 1;
  }

  isBlankPiece(indexes: IGridIndex): boolean {
    if (!this.indexesExistInPuzzlePieceMatrix(indexes)) {
      return false;
    }
    if (this.puzzlePieceMatrix[indexes.row][indexes.column] === this.blankPuzzlePiece) {
      this.setBlankPieceIndexes(indexes);
      return true;
    }
    return false;
  }

  dragStart(rowIndex: number, columnIndex: number) {
    this.pieceBeingDragged = {row: rowIndex, column: columnIndex};
  }

  restartGame(): void {
    this.numberOfMoves = 0;
    this.puzzleBoardService.shuffleWhileNotSolvable(this.puzzlePieceMatrix);
  }

  private canMovePuzzlePiece(indexes: IGridIndex): boolean {
    return this.isBlankPieceTopOfPiece(indexes)
      || this.isBlankPieceBottomOfPiece(indexes)
      || this.isBlankPieceRightOfPiece(indexes)
      || this.isBlankPieceLeftOfPiece(indexes);
  }

  private isBlankPieceTopOfPiece(indexes: IGridIndex): boolean {
    return this.isBlankPiece({row: indexes.row - 1, column: indexes.column});
  }

  private isBlankPieceRightOfPiece(indexes: IGridIndex): boolean {
    return this.isBlankPiece({row: indexes.row, column: indexes.column + 1});
  }

  private setBlankPieceIndexes(indexes: IGridIndex) {
    this.blankPuzzlePieceIndexes = {row: indexes.row, column: indexes.column};
  }

  private isBlankPieceBottomOfPiece(indexes: IGridIndex): boolean {
    return this.isBlankPiece({row: indexes.row + 1, column: indexes.column});
  }

  private isBlankPieceLeftOfPiece(indexes: IGridIndex): boolean {
    return this.isBlankPiece({row: indexes.row, column: indexes.column - 1});
  }

  private swapPieceWithBlank(pieceToSwap: IGridIndex): void {
    const temp = this.puzzlePieceMatrix[pieceToSwap.row][pieceToSwap.column];
    this.puzzlePieceMatrix[pieceToSwap.row][pieceToSwap.column]
      = this.blankPuzzlePiece;
    this.puzzlePieceMatrix[this.blankPuzzlePieceIndexes.row][this.blankPuzzlePieceIndexes.column] = temp;
  }

  private initializePuzzleState() {
    this.numberOfMoves = 0;
    this.blankPuzzlePiece = {imageSrc: '', pieceNumber: null};
    this.puzzlePieceMatrix = this.puzzleBoardService.getPuzzlePieceMatrix(this.blankPuzzlePiece);
  }

  private indexesExistInPuzzlePieceMatrix(indexes: IGridIndex): boolean {
    return !!(this.puzzlePieceMatrix[indexes.row] && this.puzzlePieceMatrix[indexes.row][indexes.column]);
  }

  private updatePuzzleState() {
    if (this.puzzleBoardService.checkSolved(this.puzzlePieceMatrix)) {
      this.puzzleState = PuzzleBoardConstants.PUZZLE_SOLVED;
    }
  }

  private checkIfPuzzleIsSolved(): boolean {
    return this.puzzleState === PuzzleBoardConstants.PUZZLE_SOLVED;
  }
}
