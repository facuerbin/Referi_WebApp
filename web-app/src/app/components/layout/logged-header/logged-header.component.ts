import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-logged-header',
  templateUrl: './logged-header.component.html',
  styleUrls: ['./logged-header.component.css']
})
export class LoggedHeaderComponent implements OnInit {
  @Output() sidebarToggle = new EventEmitter<any>();
  bar = faBars;
  profileButton = false;

  constructor(private router: Router, private auth: AuthService) {
  }

  async ngOnInit() {
  }

  toggleButton () {
    this.sidebarToggle.emit('');
  }

  toggleProfile () {
    this.profileButton = ! this.profileButton;
  }

  logout () {
    this.auth.logout();
  }
}

