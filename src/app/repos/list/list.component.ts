import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor() {
    document.body.style.backgroundColor="rgb(27,39,59)";
  }

  ngOnInit() {
  }

}
