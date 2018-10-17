import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-community-repos',
  templateUrl: './community-repos.component.html',
  styleUrls: ['./community-repos.component.css']
})
export class CommunityReposComponent implements OnInit {

  constructor() { }
  @Input() profile;
  personal_repos = []
  isVisible = false;
  isOkLoading = false;

  data = [
    {
      title: 'Ant Design Title 1'
    },
    {
      title: 'Ant Design Title 2'
    },
    {
      title: 'Ant Design Title 3'
    },
    {
      title: 'Ant Design Title 4'
    }
  ];
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    window.setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  getGithubAccessToken() {

  }

  ngOnInit() {
  }

}
