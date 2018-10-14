import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../landing-page/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() profile;
  @Input() favoriteRepos;

  isVisible = false;
  currentUserName: string

  constructor(public auth: AuthService) {
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
}
