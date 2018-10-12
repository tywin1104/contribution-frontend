import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../landing-page/auth.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  constructor() {
    document.body.style.backgroundColor = "rgb(27,39,59)";
  }
}
