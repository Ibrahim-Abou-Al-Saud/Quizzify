import { Routes } from '@angular/router';
import { Signup } from './features/signup/signup';
import { Login } from './features/login/login';
import { Dashboard } from './features/dashboard/dashboard';

export const routes: Routes = [
  {path: 'signup', component: Signup},
  {path: 'login', component: Login},
  {path: 'dashboard', component: Dashboard}
];
