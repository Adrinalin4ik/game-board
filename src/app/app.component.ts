import { Component, ContentChild, OnInit } from '@angular/core';
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
  public current_sort_field: string;
  public pagination_current_page: number = 0;
  public pagination_items_count:number = 4;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadGames();
  }

  /**
   * Load games
   * @param sort
   * @param limit 
   * @param offset 
   */
  private loadGames() {
    this.api.requestGames(this.current_sort_field, this.pagination_items_count, this.pagination_current_page)
    .subscribe((res: IGame[]) => {
      this.games = plainToClass(GameModel, res)
      console.log(this.games)
      this.dataSource = new MatTableDataSource(this.games);
    })
  }


  /**
   * Filter data
   * @param filterValue 
   */
  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Sort data
   * @param field 
   */
  public sort(field: string) {
    this.pagination_current_page = 1;
    if (!this.current_sort_field){
      this.current_sort_field = field;
    } else {
      this.current_sort_field = null;
    }
    this.loadGames()
  }
  
  /**
   * Go to next page
   */
  public nextPage() {
    this.pagination_current_page++
    this.loadGames()
  }

  /**
   * Go to previous page
   */
  public prevPage() {
    this.pagination_current_page = this.pagination_current_page > 0 ? this.pagination_current_page-1 : 0;
    this.loadGames()
  }
  
}
