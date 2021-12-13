import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router) {
  }

  ngOnInit() { }

  hasRoute(route: string, route2: string) {
    return this.router.url.includes(route) || this.router.url.includes(route2);
  }
  hasRouteActivate(route: string,){
    return this.router.url.includes(route)
  }

}
