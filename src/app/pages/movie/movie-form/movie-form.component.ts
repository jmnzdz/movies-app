import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { HomeService } from 'src/app/core/services/home.service';
import { Actor } from '../../../core/interfaces/actor.interface';
import { Company } from '../../../core/interfaces/company.interface';
import { Movie } from '../../../core/interfaces/movie.interface';
import { ActorService } from '../../../core/services/actor.service';
import { CompanyService } from '../../../core/services/company.service';
import { MovieService } from '../../../core/services/movie.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {

  back: string = $localize`:Back text@@back.text:Back`;
  button!: string;
  form!: FormGroup;
  actors!: Actor[];
  companies!: Company[];
  movie!: Movie;

  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private actorService: ActorService,
    private companyService: CompanyService,
    private snackBar: MatSnackBar,
    private router: Router,
    private homeService: HomeService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => id ? this.startEdit(id) : this.startCreate());
  }

  startCreate() {
    this.button = $localize`:Create button text@@create.text:Create`;
    this.homeService.title$.next($localize`:New movie text@@new.movie.text:New movie`);
    combineLatest([this.actorService.getActors(), this.companyService.getCompanies()])
      .subscribe(([actors, companies]) => {
        this.actors = actors;
        this.companies = companies;
        this.createForm();
      });
  }

  startEdit(id: number) {
    this.button = $localize`:Edit button text@@create.edit:Edit`;
    this.homeService.title$.next($localize`:Edit movie text@@edit.movie.text:Edit movie`);
    combineLatest([this.movieService.getMovie(id), this.actorService.getActors(), this.companyService.getCompanies()])
      .subscribe(([movie, actors, companies]) => {
        this.movie = movie;
        this.actors = actors;
        this.companies = companies;
        this.createForm();
      });
  }

  createForm() {
    this.form = this.formBuilder.group({
      title: [this.movie?.title, Validators.required],
      poster: [this.movie?.poster, Validators.required],
      genre: [this.movie?.genre],
      actors: [this.movie?.actors, Validators.required],
      company: [this.movie?.company],
      year: [this.movie?.year, [Validators.required, Validators.pattern('[0-9]*')]],
      duration: [this.movie?.duration, [Validators.required, Validators.pattern('[0-9]*')]],
      imdbRating: [this.movie?.imdbRating, [Validators.required, Validators.pattern('^[0-9]+([.][0-9]+)?$')
        , Validators.min(0), Validators.max(10)]]
    });
  }

  submit() {
    if (this.form.valid) {
      if (this.movie) {
        this.editMovie();
      } else {
        this.createMovie();
      }
    }
  }

  createMovie() {
    this.movieService.createMovie(this.form.value).subscribe((value: Movie) => {
      this.showMessage($localize`:Success message when movie is created@@movie.create.success:Movie was created successfully`);
      this.router.navigateByUrl('/movies/' + value.id);
    }, error => this.showMessage($localize`:Error message when movie is created@@movie.create.error:Movie coud not be created`));
  }

  editMovie() {
    this.movieService.editMovie(this.movie.id, this.form.value).subscribe((value: any) => {
      this.showMessage($localize`:Success message when movie is edited@@movie.edit.success:Movie was edited successfully`);
      this.goBack();
    }, error => this.showMessage($localize`:Error message when movie is edited@@movie.edit.error:Movie coud not be edited`));
  }

  showMessage(message: string) {
    this.snackBar.open(message, 'x', { duration: 2500 });
  }

  goBack() {
    this.router.navigateByUrl('/movies/' + this.movie.id);
  }
}
