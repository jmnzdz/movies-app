import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { MaterialModule } from '../../material/material.module';
import { MovieShowComponent } from './movie-show/movie-show.component';
import { MovieRoutingModule } from './movie-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MovieCardComponent } from '../../core/components/movie-card/movie-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputSelectComponent } from '../../core/components/input-select/input-select.component';
import { MovieComponent } from './movie/movie.component';
import { ConfirmModalComponent } from 'src/app/core/components/confirm-modal/confirm-modal.component';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
    MovieComponent,
    MovieListComponent,
    MovieFormComponent,
    MovieShowComponent,
    MovieCardComponent,
    InputSelectComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class MovieModule { }
