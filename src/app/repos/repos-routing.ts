import { ListComponent } from './list/list.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  { path: '', component: ListComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);