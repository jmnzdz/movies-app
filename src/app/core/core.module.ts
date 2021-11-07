import { NgModule } from '@angular/core';
import { DurationPipe } from './pipes/duration.pipe';
import { FullNamePipe } from './pipes/fullname.pipe';
import { GenrePipe } from './pipes/genre.pipe';
import { ImagePipe } from './pipes/image.pipe';

@NgModule({
  declarations: [
    DurationPipe,
    FullNamePipe,
    GenrePipe,
    ImagePipe
  ],
  exports: [
    DurationPipe,
    FullNamePipe,
    GenrePipe,
    ImagePipe
  ]
})
export class CoreModule { }
