import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/core/interfaces/movie.interface';
import { HomeService } from 'src/app/core/services/home.service';
import { MovieService } from 'src/app/core/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies!: Movie[];

  constructor(private movieService: MovieService,
    private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.title$.next($localize`:Movies text@@movies.text:Movies`);
    this.movieService.getMovies().subscribe(movies => this.movies = movies);
  }
}
