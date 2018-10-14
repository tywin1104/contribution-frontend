import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

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

  constructor(public auth: AuthService, private router: Router) {
    auth.handleAuthentication();
  }

  ngOnInit() {
    console.log(`Result: ${this.auth.isAuthenticated()}`)
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
    console.log(this.profile)
  }

  navigate() {
    this.router.navigateByUrl('/open-source-projects');
  }
}
