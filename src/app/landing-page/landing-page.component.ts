import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: [
    '../../assets/css/normalize.min.css',
    './landing-page.component.css',
    '../../assets/css/styles.css',
  ]
})
export class LandingPageComponent implements OnInit {

  profile: any;

  constructor(public auth: AuthService) {
    // console.log(auth.isAuthenticated())
    // auth.handleAuthentication();
  }

  ngOnInit() {
    console.log(this.auth.isAuthenticated())
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
    console.log(this.profile)
  }

}
