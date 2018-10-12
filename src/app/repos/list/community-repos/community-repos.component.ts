import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-community-repos',
  templateUrl: './community-repos.component.html',
  styleUrls: ['./community-repos.component.css']
})
export class CommunityReposComponent implements OnInit {

  constructor() { }
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

  ngOnInit() {
  }

}
