import {Injectable} from '@angular/core';
import {IPuzzlePiece} from './puzzle-piece.model';

@Injectable({
  providedIn: 'root'
})
export class PuzzleBoardService {

  constructor() {
  }

  shuffle(puzzleMatrix): IPuzzlePiece[][] {
    const copy = [...puzzleMatrix];
    for (const item of copy) {
      for (let j = 0; j < item.length; j++) {
        const i1 = Math.floor(Math.random() * (copy.length));
        const j1 = Math.floor(Math.random() * (copy.length));

        const temp = item[j];
        item[j] = copy[i1][j1];
        copy[i1][j1] = temp;
      }
    }
    return copy;
  }

  shuffleWhileNotSolvable(puzzlePieceMatrix: IPuzzlePiece[][]) {
    let solvable = false;
    while (!solvable) {
      puzzlePieceMatrix = this.shuffle(puzzlePieceMatrix);
      if (this.isSolvable(puzzlePieceMatrix)) {
        solvable = true;
      }
    }
  }

  isSolvable(puzzleMatrix: IPuzzlePiece[][]) {
    let numberOfInversions = 0;
    for (let i = 0; i < puzzleMatrix.length; i++) {
      for (let j = i + 1; j < puzzleMatrix.length; j++) {
        if ((puzzleMatrix[i] && puzzleMatrix[j]) && puzzleMatrix[i] > puzzleMatrix[j]) {
          numberOfInversions++;
        }
      }
    }
    return (numberOfInversions % 2 === 0);
  }

  checkSolved(puzzlePieceMatrix: IPuzzlePiece[][]): boolean {
    for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
      const upperCol = (rowIndex < 3 ? 4 : 3);
      for (let columnIndex = 0; columnIndex < upperCol; columnIndex++) {
        if (puzzlePieceMatrix[rowIndex][columnIndex]?.pieceNumber !== (4 * rowIndex + columnIndex + 1)) {
          return false;
        }
      }
    }
    return true;
  }

  getPuzzlePieceMatrix(blankPiece: IPuzzlePiece): IPuzzlePiece[][] {
    return [
      [
        {imageSrc: 'assets/img/row1col1.jpg', pieceNumber: 1},
        {imageSrc: 'assets/img/row1col2.jpg', pieceNumber: 2},
        {imageSrc: 'assets/img/row1col3.jpg', pieceNumber: 3},
        {imageSrc: 'assets/img/row1col4.jpg', pieceNumber: 4}
      ],
      [
        {imageSrc: 'assets/img/row2col1.jpg', pieceNumber: 5},
        {imageSrc: 'assets/img/row2col2.jpg', pieceNumber: 6},
        {imageSrc: 'assets/img/row2col3.jpg', pieceNumber: 7},
        {imageSrc: 'assets/img/row2col4.jpg', pieceNumber: 8}
      ],
      [
        {imageSrc: 'assets/img/row3col1.jpg', pieceNumber: 9},
        {imageSrc: 'assets/img/row3col2.jpg', pieceNumber: 10},
        {imageSrc: 'assets/img/row3col3.jpg', pieceNumber: 11},
        {imageSrc: 'assets/img/row3col4.jpg', pieceNumber: 12}
      ],
      [
        {imageSrc: 'assets/img/row4col1.jpg', pieceNumber: 13},
        {imageSrc: 'assets/img/row4col2.jpg', pieceNumber: 14},
        {imageSrc: 'assets/img/row4col3.jpg', pieceNumber: 15},
        blankPiece
      ]
    ];
  }
}
