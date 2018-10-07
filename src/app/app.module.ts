import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component'
import { ReposModule } from './repos/repos.module'


// const appRoutes: Routes = [
//   { path: 'open-source-projects', component: ListComponent },
//   { path: '', component: LandingPageComponent}
// ];

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
  ],
  imports: [
    BrowserModule,
    ReposModule
    // RouterModule.forRoot(
    //   appRoutes
    // )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
