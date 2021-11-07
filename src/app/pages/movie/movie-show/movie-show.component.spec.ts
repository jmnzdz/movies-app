import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieShowComponent } from './movie-show.component';

import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MaterialModule } from 'src/app/material/material.module';

describe('MovieShowComponent', () => {
  let component: MovieShowComponent;
  let fixture: ComponentFixture<MovieShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieShowComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, MaterialModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
