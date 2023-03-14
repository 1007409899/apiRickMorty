import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Character, Episode, Favoritos, markToFavorite, markToFavoriteResponse, resultEpisode } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class EpisodiosService {
  private baseUrl: string = environment.baseUrlRickMorty;
  private urlSelecion: string = environment.baseUrl;
  private _episodios!: Episode[];

  get episodios(): Episode[] {
    return { ...this._episodios };
  }
  public cantidadFavoritos: number =0;

  constructor(private http: HttpClient) { }

  getEpisodios() {
    return this.http.get<Episode[]>(`${this.baseUrl}/episode/`).pipe(
      tap((data) => console.log(data)), // log data to console
      tap((data) => (this._episodios = data)) // assign results to episodes property

    )
  }

  getEpisodio(id: number) {
    return this.http.get<resultEpisode>(`${this.baseUrl}/episode/${id}`);
  }

  getCharactersById(id: any) {
    return this.http.get<Character>(`${this.baseUrl}/character/${id}`);
  }

  getEpisodiosByPage(page: number) {
    return this.http.get<Episode>(`${this.baseUrl}/episode/?page=${page}`).pipe(
      map(res => res),
      catchError(error => error.error.error)

    )
  }

  getFavoritos() {
    return this.http.get<Favoritos[]>(`${this.urlSelecion}/Seleccion/api/Favoritos`)
  }

  //cantidad de favoritos
  getFavoritosLength() {
    return this.http.get<Favoritos[]>(`${this.urlSelecion}/Seleccion/api/Favoritos`).pipe(
      tap(res =>  this.cantidadFavoritos = res.length ),
      map((res) => res.length),
      catchError(error => error.error.error)
    )

  }

  //markToFavorite
  markToFavorite(idPersonaje: number, observaciones: string) {
    const body: markToFavorite = {
      id_caracter: idPersonaje,
      observaciones: observaciones,

    }
    return this.http.post<markToFavoriteResponse>(`${this.urlSelecion}/Seleccion/api/Favoritos`,  body ).pipe(
      tap((res) => of(res.description)),
      catchError(error => of(error.error.Message) )
    )
  }
  getEpisodiosByQuery(query: string) {
    return this.http.get<Episode>(`${this.baseUrl}/episode/?name=${query}`);
  }

  getEpisodiosByQueryAndPage(query: string, page: number) {
    return this.http.get<Episode>(`${this.baseUrl}/episode/?name=${query}&page=${page}`);
  }


}
