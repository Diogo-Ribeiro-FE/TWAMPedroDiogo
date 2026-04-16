import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models/teams';

@Injectable({
  providedIn: 'root'
})

export class TeamService {
  private readonly API_URL='https://69df4ca9d6de26e1192910c6.mockapi.io/Teams';  //Isto é a nossa API onde está guardado todos os dados

  constructor(private http: HttpClient) {}

 getTeams(): Observable<Team[]> {
  const headers = new HttpHeaders({
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  });
  return this.http.get<Team[]>(this.API_URL, { headers });
}

  getTeamById(id: string): Observable<Team> {
    return this.http.get<Team>(`${this.API_URL}/${id}`);
  }

  createTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(this.API_URL, team);
  }

  updateTeam(id: string, team: Team): Observable<Team> {
    return this.http.put<Team>(`${this.API_URL}/${id}`, team);
  }

  deleteTeam(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}

