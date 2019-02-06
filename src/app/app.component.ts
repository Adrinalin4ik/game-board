import { Component, OnInit, ViewChild, ContentChild } from '@angular/core';
import { ApiService } from './services/api.service';
import { GameModel } from './models/game';
import { IGame } from './interfaces/game'
import { plainToClass } from 'class-transformer';;
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public games: GameModel[] = [];
  public dataSource: MatTableDataSource<GameModel>;
  public displayedColumns: string[] = ['photo', 'title', 'playersMax', 'playersMin', 'creationDate', 'rating', 'link'];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.requestGames().subscribe((res: IGame[]) => {
      this.games = plainToClass(GameModel, res)
      console.log(this.games)
      this.dataSource = new MatTableDataSource(this.games);
    })
  }

  /**
   * Filter data
   * @param filterValue 
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  
}
