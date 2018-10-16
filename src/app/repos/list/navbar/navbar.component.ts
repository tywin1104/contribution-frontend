import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../landing-page/auth.service'
import { UserService } from '../../../_services/user.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() profile;
  @Input() favoriteRepos;

  @Output() favRepoDeleted = new EventEmitter<string>();

  isVisible = false;
  currentUserName: string

  constructor(public auth: AuthService, private userService: UserService) {
    document.body.style.backgroundColor = "rgb(27,39,59)"
  }

  ngOnInit() {
    if (this.profile) {
      this.currentUserName = this.profile.sub
      console.log(this.currentUserName)
    }
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

  tryToDeleteFav(repoName) {
    this.favRepoDeleted.emit(repoName)
    console.log('Emitted to delete a repo!')
    this.userService.deleteFavRepo(this.profile.sub, repoName)
      .subscribe(res => {
        console.log(res)
      })
  }
}
