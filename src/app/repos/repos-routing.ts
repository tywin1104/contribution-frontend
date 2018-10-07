import { ListComponent } from './list/list.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    // children: [
    //   { path: '', redirectTo: 'page1', pathMatch: 'full' },
    //   { path: 'page1', component: Module1Page1Component },
    //   { path: 'page2', component: Module1Page2Component }
    // ]
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);