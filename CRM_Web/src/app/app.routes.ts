import { Routes } from '@angular/router';

export const routes: Routes = [
   
{
    path: '',
    redirectTo: 'super-admin',
    pathMatch: 'full'
  },

  {
    path: 'super-admin',
    loadChildren: () =>
      import('./features/super-admin/super-admin-module')
        .then(m => m.SuperAdminModule)
  },
   {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin-module')
        .then(m => m.AdminModule)
  }
];
