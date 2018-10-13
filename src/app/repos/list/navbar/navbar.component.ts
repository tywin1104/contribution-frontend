import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../landing-page/auth.service'
import { UserService } from '../../../_services/user.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  profile: any
  isVisible = false;
  favoriteRepos: any
  currentUserName: string


  constructor(public auth: AuthService, private userService: UserService) {
    document.body.style.backgroundColor = "rgb(27,39,59)";
  }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      if (this.auth.userProfile) {
        this.profile = this.auth.userProfile;
        this.userService.getFavRepos(this.profile.sub)
          .subscribe(repos => {
            this.favoriteRepos = repos.favorite_repos
            console.log(this.favoriteRepos)
          })
      } else {
        this.auth.getProfile((err, profile) => {
          this.profile = profile;
        });
      }
    }
    // if(this.auth.isAuthenticated()) {
    //   this.profile = this.auth.returnProfile()
    //   this.currentUserName = this.profile.sub
    //   this.userService.getFavRepos(this.profile.sub)
    //       .subscribe(repos => {
    //         this.favoriteRepos = repos.favorite_repos
    //         console.log(this.favoriteRepos)
    //       })

    // }
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
