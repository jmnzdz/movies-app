import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/core/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title!: string;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.title$.subscribe((title: string) => this.title = title);
  }
}
