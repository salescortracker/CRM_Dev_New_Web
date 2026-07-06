import { Routes } from '@angular/router';
import { authGuard } from './core/authentication/guards/auth-guard';
import { roleGuard } from './core/authentication/guards/role-guard';


export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./features/auth/login/login').then(m => m.Login) },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./features/auth/forgot-password/forgot-password')
        .then(m => m.ForgotPassword)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layouts/admin-layout/admin-layout').then(m => m.AdminLayout),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard-home/dashboard-home')
            .then(m => m.DashboardHome)
      },
      {
        path: 'menu-access',
        canActivate: [roleGuard],
        data: { role: 'Super Admin' },
        loadComponent: () =>
          import('./features/super-admin/menu-access/menu-access')
            .then(m => m.MenuAccess)
      },
      { path: '**', redirectTo: 'dashboard' }
    ]
  },
  { path: '**', redirectTo: 'login' }

];
