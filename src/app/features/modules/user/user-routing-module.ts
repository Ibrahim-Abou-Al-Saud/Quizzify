import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from '../../../shared/components/dashboard/dashboard';
import { TakeTest } from './components/take-test/take-test';
import { ViewResults } from './components/view-results/view-results';

const routes: Routes = [
  {path: 'dashboard', component: Dashboard},
  {path: 'take-test/:id', component: TakeTest},
  {path: 'view-results', component: ViewResults},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
