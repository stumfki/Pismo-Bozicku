import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  public currentRoute: string;

  constructor(private router: Router) {
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd) {
          this.currentRoute = this.router.url;
      }
  });
}

}