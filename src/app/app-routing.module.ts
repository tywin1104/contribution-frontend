import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component'
import { CallbackComponent } from './callback/callback.component'


const routes: Routes = [
  { path: 'home', component: LandingPageComponent },
  { path: 'callback', component: CallbackComponent },
  {
    path: 'open-source-projects',
    loadChildren: './repos/repos.module#ReposModule'
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '**', redirectTo: 'home' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
