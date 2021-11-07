import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movie.interface';

const API_URL = 'http://localhost:3000/movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(API_URL);
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(API_URL + '/' + id);
  }

  createMovie(movie: Movie): Observable<any> {
    return this.http.post<any>(API_URL, movie);
  }

  editMovie(id: number, movie: Movie): Observable<any> {
    return this.http.put<any>(API_URL + '/' + id, movie);
  }

  deleteMovie(id: number): Observable<any> {
    return this.http.delete<any>(API_URL + '/' + id);
  }
}
