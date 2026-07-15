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
        path: 'company',
        loadComponent: () =>
          import('./features/dashboard/pages/company/company')
            .then(m => m.Company)
      },
       
      {
         path: 'region',
         loadComponent: () =>
          import('./features/pages/region/region').then(m => m.Region)
      },
      {
        path: 'menu-access',
        canActivate: [roleGuard],
        data: { role: 'Super Admin' },
        loadComponent: () =>
          import('./features/super-admin/menu-access/menu-access')
            .then(m => m.MenuAccess)
      },
      {
        path: 'user',
        canActivate: [roleGuard],
        data: { role: 'Super Admin' },
        loadComponent: () =>
          import('./features/super-admin/users/users')
            .then(m => m.Users)
      },
      {
        path: 'roles',
        loadComponent: () => import('./features/dashboard/pages/roles/roles')
          .then(m => m.Roles)
      },
      {
        path: 'organizations/branches',
        loadComponent: () => import('./features/dashboard/pages/organizations/branches/branches')
          .then(m => m.Branches)
      },
      {
        path: 'plans',
        loadComponent: () => import('./features/super-admin/plans/plans')
          .then(m => m.Plans)
      },
      {
        path: 'organizations',
        loadComponent: () => import('./features/super-admin/organizations/organizations')
          .then(m => m.Organizations)
      },
     
      {
        path: 'subscriptions',
        loadComponent: () => import('./features/super-admin/subscriptions/subscriptions')
          .then(m => m.Subscriptions)
      },
      { path: '**', redirectTo: 'dashboard' }
    ]
  },
  { path: '**', redirectTo: 'login' }

];
