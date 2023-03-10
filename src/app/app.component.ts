import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public currentRoute: string;

  constructor(private router: Router) {
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd) {
          this.currentRoute = this.router.url;
      }
  });
  
}
}



