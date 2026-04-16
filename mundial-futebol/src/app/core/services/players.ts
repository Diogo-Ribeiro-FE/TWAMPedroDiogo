import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../models/players';

@Injectable({
  providedIn: 'root',
})
export class PlayersServices {
  private readonly API_URL = 'https://69df4ca9d6de26e1192910c6.mockapi.io/Players';

  constructor(private http: HttpClient) {}

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.API_URL);
  }

  getPlayerById(id: string): Observable<Player> {
    return this.http.get<Player>(`${this.API_URL}/${id}`);
  }

  getPlayersByTeam(teamId: string): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.API_URL}?teamId=${teamId}`);
  }

  createPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(this.API_URL, player);
  }

  updatePlayer(id: string, player: Player): Observable<Player> {
    return this.http.put<Player>(`${this.API_URL}/${id}`, player);
  }

  deletePlayer(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}