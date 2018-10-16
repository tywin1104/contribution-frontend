import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../landing-page/auth.service'
import { UserService } from '../../_services/user.service'
import { Repo } from '../../_modal/repo'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  favoriteRepos: any
  profile;

  constructor(public auth: AuthService, private userService: UserService) {
    document.body.style.backgroundColor = "rgb(27,39,59)";
  }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      if (this.auth.userProfile) {
        this.profile = this.auth.userProfile;
        this.populateFavReops()
      } else {
        this.auth.getProfile((err, profile) => {
          this.profile = profile
          this.populateFavReops()
        });
      }
    } else {
      this.profile = null;
      this.favoriteRepos = []
    }
  }

  populateFavReops() {
    let userName = this.profile.sub
    this.userService.getFavRepos(userName)
      .subscribe(repos => {
        this.favoriteRepos = repos.favorite_repos
        console.log(this.favoriteRepos)
      })
  }

  onFavRepoAdded(newRepo: Repo) {
    this.favoriteRepos.push(newRepo)
  }

  onFavRepoDeleted(repoName: string) {
    this.favoriteRepos.some((item, index) => {
      if (this.favoriteRepos[index]['name'] === repoName) {
        this.favoriteRepos.splice(index, 1);
      }
    })
  }
}
