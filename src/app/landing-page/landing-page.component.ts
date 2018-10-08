import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: [
    '../../assets/css/animate.min.css',
    '../../assets/css/etline-font.css',
    '../../assets/css/flexslider.css',
    '../../assets/css/ie.css',
    '../../assets/css/normalize.min.css',
    '../../assets/css/print.css',
    './landing-page.component.css',
    '../../assets/css/styles.css',
    '../../assets/css/queries.css',
    '../../assets/css/jquery.fancybox.css'
  ]
})
export class LandingPageComponent implements OnInit {

  constructor(public auth: AuthService) {
  }

  ngOnInit() {
  }

}
