import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Country } from './country/country';
import { Dashboard } from './dashboard/dashboard';
import { State } from './master/state/state';
import { Organizations } from './organizations/organizations';
import { Subscriptions } from './subscriptions/subscriptions';
import { Plans } from './plans/plans';
import { Roles } from './roles/roles';

const routes: Routes = [
  {
    path: '',
    component: Dashboard
  },
  {
    path: 'country',
    component: Country
  },
  {
    path: 'state',
    component: State
  },
  {
    path: 'organizations',
    component: Organizations
  },
   {
    path: 'subscriptions',
    component: Subscriptions
  },
  {
    path: 'plans',
    component: Plans
  },
  {
    path: 'roles',
    component: Roles
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
