import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  /**
   * Fetch games
   * @param room_id 
   */
  public requestGames(sortField?: string, limit: number = 5, offset: number = 1) {
    return this.http.get(environment.apiEndpoint + "/games", 
      { 
        params: {
          sort: sortField, 
          limit: limit.toString(),
          offset: offset.toString()
      } 
    }).pipe(
      tap(null, this.process_error.bind(this))
    );
  }

  /**
   * Error handler
   * @param error
   */
  public process_error(error) {
    console.error("HTTP error", error.message)
  }
}
