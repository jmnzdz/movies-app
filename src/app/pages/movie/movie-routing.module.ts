import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieShowComponent } from './movie-show/movie-show.component';
import { MovieComponent } from './movie/movie.component';

const routes: Routes = [
  {
    path: '',
    component: MovieComponent,
    children: [
      {
        path: '',
        component: MovieListComponent,
      },
      {
        path: 'new',
        component: MovieFormComponent
      },
      {
        path: 'edit/:id',
        component: MovieFormComponent
      },
      {
        path: ':id',
        component: MovieShowComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
