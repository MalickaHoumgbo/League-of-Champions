import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Champion } from './champion';

@Injectable({
  providedIn: 'root',
})
export class ChampionService {
  private championsUrl = 'api/champions'; // URL API

  constructor(private http: HttpClient) {}

  getChampions(): Observable<Champion[]> {
    return this.http.get<Champion[]>(this.championsUrl);
  }

  addChampion(champion: Champion): Observable<Champion> {
    return this.http.post<Champion>(this.championsUrl, champion);
  }

  deleteChampion(id: number): Observable<Champion> {
    const url = `${this.championsUrl}/${id}`;
    return this.http.delete<Champion>(url);
  }
}
