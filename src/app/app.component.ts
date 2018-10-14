import { Component, OnInit } from '@angular/core';
import { AuthService } from './landing-page/auth.service';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  profile;
  constructor(public auth: AuthService, private userService: UserService) {
    auth.handleAuthentication();
  }

  ngOnInit() {
  }
}
