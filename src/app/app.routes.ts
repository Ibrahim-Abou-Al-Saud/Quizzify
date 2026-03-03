import { Routes } from '@angular/router';
import { Signup } from './features/signup/signup';
import { Login } from './features/login/login';
import { Layout } from './layout/layout';
import { authGuard } from './core/guards/auth-guard';
import { Home } from './features/home/home';

export const routes: Routes = [
  {path: 'login', component: Login},
  {path: 'signup', component: Signup},
  {path: 'layout', component: Layout,
    canActivate: [authGuard],
    children: [
      {path: 'home', component: Home},
      {path: 'admin', loadChildren: () => import('./features/modules/admin/admin-routing-module').then(m => m.AdminRoutingModule)},
      {path: 'user', loadChildren: () => import('./features/modules/user/user-routing-module').then(m => m.UserRoutingModule)},
      {path: 'not-found', loadComponent: () => import('./shared/components/not-found/not-found').then(m => m.NotFound)},
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: '**', redirectTo: 'not-found', pathMatch: 'full'}
  ]},
  {path: '', redirectTo: 'layout/home', pathMatch: 'full'},
];
