import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Movie } from 'src/app/core/interfaces/movie.interface';
import { Actor } from 'src/app/core/interfaces/actor.interface';
import { Company } from 'src/app/core/interfaces/company.interface';
import { MovieService } from 'src/app/core/services/movie.service';
import { ActorService } from 'src/app/core/services/actor.service';
import { CompanyService } from 'src/app/core/services/company.service';
import { ConfirmModalComponent } from 'src/app/core/components/confirm-modal/confirm-modal.component';
import { HomeService } from 'src/app/core/services/home.service';

@Component({
  selector: 'app-movie-show',
  templateUrl: './movie-show.component.html',
  styleUrls: ['./movie-show.component.css']
})
export class MovieShowComponent implements OnInit {

  id!: number;
  movie!: Movie;
  actors!: Actor[];
  company!: Company;

  constructor(private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private actorService: ActorService,
    private companyService: CompanyService,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog,
    private router: Router,
    private homeService: HomeService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id }) => this.id = id);

    combineLatest([this.movieService.getMovie(this.id), this.actorService.getActors(), this.companyService.getCompanies()])
      .subscribe(([movie, actors, companies]) => {
        this.homeService.title$.next(movie.title);
        this.actors = actors.filter(actor => movie.actors.find((id) => id === actor.id));
        this.company = companies.find(company => company.id == movie.company)!;
        this.movie = movie;
      });
  }

  confirmDelete() {
    const dialog = this.matDialog.open(ConfirmModalComponent, {
      data: $localize`:Warning message when movie is deleted@@movie.delete.warning:Do you want to remove the movie?`
    });

    dialog.afterClosed().subscribe((result: Boolean) => {
      if (result) { this.deleteMovie(); }
    });
  }

  deleteMovie() {
    this.movieService.deleteMovie(this.movie.id).subscribe(() => {
      this.showMessage($localize`:Success message when movie is deleted@@movie.delete.success:Movie was deleted successfully`);
      this.router.navigateByUrl('');
    }, error => this.showMessage($localize`:Error message when movie is deleted@@movie.delete.error:Movie could not be deleted`));
  }

  showMessage(message: string) {
    this.snackBar.open(message, 'x', { duration: 2500 });
  }
}
