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
   * Featch games
   * @param room_id 
   */
  public requestGames() {
    return this.http.get(environment.apiEndpoint + "/games").pipe(
      tap(null, this.process_error.bind(this))
    );
  }

  public process_error(req) {
    console.error("HTTP error", req)
  }
}
