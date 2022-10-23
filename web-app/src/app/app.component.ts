import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Referi';
  logged = false;
  toggle = false;

  constructor (private router: Router, library: FaIconLibrary) {
    this.logged = router.url.includes("dashboard");
    library.addIcons(faChartPie);
  }

  ngOnInit() {
    this.router.events.subscribe( event => {
      if (event instanceof NavigationEnd) this.logged = event.url.includes("login") || event.url.includes("register") || event.url.includes("verify");
    })
  }

  toggleSidebar (event: Event) {
    this.toggle = ! this.toggle;
  }
}
