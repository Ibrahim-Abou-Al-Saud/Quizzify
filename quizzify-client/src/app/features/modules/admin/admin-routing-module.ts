import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from '../../../shared/components/dashboard/dashboard';
import { CreateTest } from './components/create-test/create-test';
import { AddQuestion } from './components/add-question/add-question';
import { ViewTest } from './components/view-test/view-test';
import { ViewResults } from './components/view-results/view-results';

const routes: Routes = [
  {path: 'dashboard', component: Dashboard},
  {path: 'create-test', component: CreateTest},
  {path: 'add-question/:id', component: AddQuestion},
  {path: 'view-test/:id', component: ViewTest},
  {path: 'view-results', component: ViewResults},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
