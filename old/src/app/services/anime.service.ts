import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, of } from 'rxjs';
import { IAnimeData, ITopAnimeResponse } from '../types/apiResponse';

const environment = {
  apiUrl: 'https://api.jikan.moe/v4',
};

export interface IAnimeResponse {
  lastPage: number;
  data: IAnimeData[];
  loading: boolean;
}

const initialValue: IAnimeResponse = { lastPage: 0, data: [], loading: false };

@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  topAnime = signal<IAnimeResponse>(initialValue);

  constructor(private http: HttpClient) {}

  fetchTopAnime(offset = 0): void {
    const url = `${environment.apiUrl}/top/anime?limit=25&offset=${offset}`;
    this.topAnime.update((state) => ({
      ...state,
      loading: true,
    }));
    this.http
      .get<ITopAnimeResponse>(url)
      .pipe(
        catchError((error) => {
          console.error('Error fetching top anime:', error);
          return of(initialValue);
        }),
      )
      .subscribe((response) => {
        const lastPage =
          'pagination' in response && response.pagination
            ? response.pagination.current_page
            : 0;
        console.log('response.data:', response.data);
        this.topAnime.set({
          lastPage: lastPage,
          data: response.data,
          loading: false,
        });
      });
  }
}
