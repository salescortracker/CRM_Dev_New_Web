import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/authentication/services/auth.service';

interface SidebarMenu {
  label: string;
  icon: string;
  route: string;
  roles: string[];
  group: 'CRM Flow' | 'Administration';
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private readonly menus: SidebarMenu[] = [
    { label: 'Dashboard', icon: 'fa-chart-line', route: '/dashboard', roles: ['Super Admin', 'Admin', 'User'], group: 'CRM Flow' },
    { label: 'Leads', icon: 'fa-star', route: '/leads', roles: ['Super Admin', 'Admin', 'User'], group: 'CRM Flow' },
    { label: 'Contacts', icon: 'fa-users', route: '/contacts', roles: ['Super Admin', 'Admin', 'User'], group: 'CRM Flow' },
    { label: 'Companies', icon: 'fa-building', route: '/companies', roles: ['Super Admin', 'Admin'], group: 'CRM Flow' },
    { label: 'Deals', icon: 'fa-handshake', route: '/deals', roles: ['Super Admin', 'Admin', 'User'], group: 'CRM Flow' },
    { label: 'Pipeline', icon: 'fa-bars-progress', route: '/pipeline', roles: ['Super Admin', 'Admin'], group: 'CRM Flow' },
    { label: 'Tasks', icon: 'fa-list-check', route: '/tasks', roles: ['Super Admin', 'Admin', 'User'], group: 'CRM Flow' },
    { label: 'Activity', icon: 'fa-list', route: '/activity', roles: ['Super Admin', 'Admin'], group: 'CRM Flow' },
    { label: 'Lead Sources', icon: 'fa-filter-circle-dollar', route: '/lead-sources', roles: ['Super Admin', 'Admin'], group: 'CRM Flow' },
    { label: 'Workflows', icon: 'fa-diagram-project', route: '/workflows', roles: ['Super Admin', 'Admin'], group: 'CRM Flow' },
    { label: 'Calendar', icon: 'fa-calendar-days', route: '/calendar', roles: ['Super Admin', 'Admin', 'User'], group: 'CRM Flow' },
    { label: 'Email', icon: 'fa-envelope-open-text', route: '/email', roles: ['Super Admin', 'Admin', 'User'], group: 'CRM Flow' },
    { label: 'Telephony', icon: 'fa-phone-volume', route: '/telephony', roles: ['Super Admin', 'Admin'], group: 'CRM Flow' },
    { label: 'WhatsApp/SMS', icon: 'fa-message', route: '/messages', roles: ['Super Admin', 'Admin', 'User'], group: 'CRM Flow' },
    { label: 'Menu Access', icon: 'fa-unlock-keyhole', route: '/menu-access', roles: ['Super Admin'], group: 'Administration' }
  ];

  userRole = 'User';

  constructor(private authService: AuthService) {
    this.userRole = this.authService.getCurrentUser()?.role || 'User';
  }

  get crmMenus(): SidebarMenu[] {
    return this.visibleMenus.filter(menu => menu.group === 'CRM Flow');
  }

  get adminMenus(): SidebarMenu[] {
    return this.visibleMenus.filter(menu => menu.group === 'Administration');
  }

  private get visibleMenus(): SidebarMenu[] {
    const role = this.normalizeRole(this.userRole);

    return this.menus.filter(menu =>
      menu.roles.some(allowedRole => this.normalizeRole(allowedRole) === role)
    );
  }

  private normalizeRole(role: string): string {
    return role.replace(/[-_]/g, ' ').trim().toLowerCase();
  }
}
