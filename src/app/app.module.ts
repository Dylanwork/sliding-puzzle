import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PuzzleBoardModule} from './puzzle-board/puzzle-board.module';

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        PuzzleBoardModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
