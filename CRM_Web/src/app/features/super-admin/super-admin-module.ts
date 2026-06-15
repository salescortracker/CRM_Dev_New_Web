import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing-module';
import { Dashboard } from './dashboard/dashboard';
import { Country } from './country/country';
import { State } from './master/state/state';
import { Organizations } from './organizations/organizations';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { Subscriptions } from './subscriptions/subscriptions';
import { Plans } from './plans/plans';
import { Roles } from './roles/roles';


@NgModule({
  declarations: [
    Dashboard,
    Country,
    State,
    Organizations,
    Subscriptions,
    Plans,
    Roles
  ],
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    SuperAdminRoutingModule
  ]
})
export class SuperAdminModule { }
