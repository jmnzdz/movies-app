import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CoreModule } from '../../core.module';
import { Movie } from '../../interfaces/movie.interface';

import { MovieCardComponent } from './movie-card.component';

describe('MovieCardComponent', () => {

  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

  let movie: Movie;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieCardComponent],
      imports: [CoreModule]
    })
      .compileComponents();
  });

  beforeEach(() => {

    movie = {
      title: "Dancing Lady",
      poster: "",
      genre: [
        "Comedy",
        "Musical",
        "Romance"
      ],
      actors: [
        4,
        5,
        6
      ],
      company: 2,
      year: 2006,
      duration: 161,
      imdbRating: 8.27,
      id: 1
    };

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    component.movie = movie;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('title is shown in card header', () => {
    const element = fixture.debugElement.query(By.css('mat-card-title'));
    const result = element.nativeElement;
    expect(result.textContent).toContain(movie.title);
  });

  it('genre is shown in card content', () => {
    const expected: string = '#comedy  #musical  #romance';
    const element = fixture.debugElement.query(By.css('mat-card-content'));
    const result = element.nativeElement;
    expect(result.textContent).toContain(expected);
  });

  it('image default is charge for movies without posters', () => {
    const expected: string = '/assets/no-image.png';
    const element = fixture.debugElement.query(By.css('img'));
    const result = element.nativeNode;
    expect(result.src).toContain(expected);
  });
});
