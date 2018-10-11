import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../landing-page/auth.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  profile: any
  constructor(public auth: AuthService) {
    console.log(auth.isAuthenticated)
    document.body.style.backgroundColor = "rgb(27,39,59)";
  }

  ngOnInit() {
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
