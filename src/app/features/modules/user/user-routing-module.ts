import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from '../../../shared/components/dashboard/dashboard';
import { TakeTest } from './components/take-test/take-test';

const routes: Routes = [
  {path: 'dashboard', component: Dashboard},
  {path: 'take-test/:id', component: TakeTest},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
