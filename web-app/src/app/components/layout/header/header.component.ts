import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidebarToggle = new EventEmitter<any>;
  bar = faBars;
  logged = false;

  constructor(private router: Router, private cookieService: CookieService) {
    this.logged = router.url.includes("login") || router.url.includes("register");;
  }

  async ngOnInit() {
    this.router.events.subscribe( event => {
      if (event instanceof NavigationEnd) this.logged = event.url.includes("login") || event.url.includes("register");
    })
  }
}
