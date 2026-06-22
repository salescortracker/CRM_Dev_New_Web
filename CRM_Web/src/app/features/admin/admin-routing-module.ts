import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from '../super-admin/dashboard/dashboard';
import { Leads } from './leads/leads';

const routes: Routes = [
   {
      path: '',
      component: Dashboard
    },
    {
      path: 'leads',
      component: Leads
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
