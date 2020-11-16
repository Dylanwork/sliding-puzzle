import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuzzleBoardComponent } from './puzzle-board.component';
import { PuzzleBoardScoreboardComponent } from './puzzle-board-scoreboard/puzzle-board-scoreboard.component';



@NgModule({
  declarations: [PuzzleBoardComponent, PuzzleBoardScoreboardComponent],
  exports: [
    PuzzleBoardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PuzzleBoardModule { }
