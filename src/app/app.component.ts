import { Component, OnInit } from '@angular/core';
import { AuthService } from './landing-page/auth.service';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  profile: any
  constructor(public auth: AuthService, private userService: UserService) {
    auth.handleAuthentication();
  }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      if (this.auth.userProfile) {
        this.profile = this.auth.userProfile;
        this.userService.findOrCreate(this.profile.sub)
      } else {
        this.auth.getProfile((err, profile) => {
          this.profile = profile;
          this.userService.findOrCreate(this.profile.sub)
        });
      }
    }
  }
}
