import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppConstants} from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'shifiting-puzzle-game';
  readonly gameTitle: string = AppConstants.GAME_TITLE;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }
}
