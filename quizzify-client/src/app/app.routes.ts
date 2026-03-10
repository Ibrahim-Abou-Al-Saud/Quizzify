import { Routes } from '@angular/router';
import { Signup } from './features/signup/signup';
import { Login } from './features/login/login';
import { Layout } from './layout/layout';
import { authGuard } from './core/guards/auth.guard';
import { Home } from './features/home/home';
import { adminGuard } from './core/guards/admin.guard';
import { userGuard } from './core/guards/user.guard';
import { NotFound } from './shared/components/not-found/not-found';
import { NotAuthorized } from './shared/components/not-authorized/not-authorized';

export const routes: Routes = [
  {path: 'login', component: Login},
  {path: 'signup', component: Signup},
  {path: 'layout', component: Layout,
    canActivate: [authGuard],
    children: [
      {path: 'home', component: Home},
      {path: 'admin', loadChildren: () => import('./features/modules/admin/admin-routing-module').then(m => m.AdminRoutingModule), canActivate: [adminGuard]},
      {path: 'user', loadChildren: () => import('./features/modules/user/user-routing-module').then(m => m.UserRoutingModule), canActivate: [userGuard]},
      {path: 'not-found', component: NotFound},
      {path: 'not-authorized', component: NotAuthorized},
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: '**', redirectTo: 'not-found', pathMatch: 'full'}
  ]},
  {path: '', redirectTo: 'layout/home', pathMatch: 'full'},
  {path: '**', redirectTo: 'layout/not-found', pathMatch: 'full'}
];
