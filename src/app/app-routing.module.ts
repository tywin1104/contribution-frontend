import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component'


const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'open-source-projects',
    loadChildren: '../repos/repos.module#ReposModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
