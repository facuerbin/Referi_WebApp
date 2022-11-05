import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { from } from 'rxjs';
import { GetUserResponseDto } from 'src/app/interfaces/get.user.response.dto';
import { User } from 'src/app/interfaces/login.response.dto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-logged-header',
  templateUrl: './logged-header.component.html',
  styleUrls: ['./logged-header.component.css']
})
export class LoggedHeaderComponent implements OnInit {
  @Output() sidebarToggle = new EventEmitter<any>();
  bar = faBars;
  profileButton = false;
  profileImg = environment.appUrl + environment.apiVersionUri + "/uploads/profile.jpeg";
  user: GetUserResponseDto | null = null;

  constructor(private router: Router, private auth: AuthService) {
  }

  async ngOnInit() {
    const obs = from(this.auth.getUser());
    obs.subscribe( result => {
      if (result.data.data.fotoPerfil) this.profileImg =  environment.appUrl + environment.apiVersionUri + '/' + result.data.data.fotoPerfil;
    });

    const user = await this.auth.getUser();
    this.user = user.data;
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

