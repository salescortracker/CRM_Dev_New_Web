import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

interface SidebarMenu {
  label: string;
  icon: string;
  route?: string;
  group: string;
  expanded?: boolean;
  children?: SidebarMenu[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar {

  @Output()
  sidebarToggle = new EventEmitter<boolean>();

  isCollapsed = false;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarToggle.emit(this.isCollapsed);
  }

  menus: SidebarMenu[] = [

    //-----------------------------------
    // CRM FLOW
    //-----------------------------------

    {
      label: 'Dashboard',
      icon: 'fa-chart-line',
      route: '/dashboard',
      group: 'CRM Flow'
    },

    // {
    //   label: 'CRM',
    //   icon: 'fa-users',
    //   group: 'CRM Flow',
    //   expanded: false,
    //   children: [

    //     {
    //       label: 'Leads',
    //       icon: 'fa-user-plus',
    //       route: '/leads',
    //       group: 'CRM Flow'
    //     },

    //     {
    //       label: 'Contacts',
    //       icon: 'fa-address-book',
    //       route: '/contacts',
    //       group: 'CRM Flow'
    //     },

    //     {
    //       label: 'Accounts',
    //       icon: 'fa-building',
    //       route: '/accounts',
    //       group: 'CRM Flow'
    //     },

    //     {
    //       label: 'Opportunities',
    //       icon: 'fa-handshake',
    //       route: '/opportunities',
    //       group: 'CRM Flow'
    //     }

    //   ]
    // },

    //-----------------------------------
    // ADMINISTRATION
    //-----------------------------------

    {
      label: 'Administration',
      icon: 'fa-user-shield',
      group: 'Administration',
      expanded: false,
      children: [

        {
          label: 'Menu Access',
          icon: 'fa-unlock-keyhole',
          route: '/menu-access',
          group: 'Administration'
        },

        {
          label: 'Role Management',
          icon: 'fa-user-tag',
          route: '/roles',
          group: 'Administration'
        },

        {
          label: 'User Management',
          icon: 'fa-users-gear',
          route: '/user',
          group: 'Administration'
        },
        {
          label: 'Plans',
          icon: 'fa-list',
          route: '/plans',
          group: 'Administration' 
        },
        {
           label: 'Organizations',
            icon: 'fa-building',
            route: '/organizations',
            group: 'Administration'
        },
        {
          label: 'Subscriptions',
          icon: 'fa-receipt',
          route: '/subscriptions',
          group: 'Administration'
        },
        {
          label: 'Audit Logs',
          icon: 'fa-file-alt',
          route: '/audit-logs',
          group: 'Administration'
        }

      ]
    },

    //-----------------------------------
    // SETUP
    //-----------------------------------

    {
      label: 'Setup',
      icon: 'fa-gears',
      route: '/master-data',
      group: 'Setup',
      expanded: false,
      children: [

        {
          label: 'Company',
          icon: 'fa-building',
          route: '/company',
          group: 'Setup'
        },
        {
          label: 'Region',
          icon: 'fa-map',
          route: '/region',
          group: 'Setup'
        },
        {
          label: 'Department',
          icon: 'fa-sitemap',
          route: '/department',
          group: 'Setup'
        },

        {
          label: 'Designation',
          icon: 'fa-id-badge',
          route: '/designation',
          group: 'Setup'
        },
        {
          label: 'Master Data',
          icon: 'fa-database',
          route: '/master-data',
          group: 'Setup'
        }

      ]
    }

  ];

  get menuGroups() {

    const groups = new Map<string, SidebarMenu[]>();

    this.menus.forEach(menu => {

      if (!groups.has(menu.group)) {
        groups.set(menu.group, []);
      }

      groups.get(menu.group)?.push(menu);

    });

    return Array.from(groups.entries()).map(([heading, menus]) => ({
      heading,
      menus
    }));

  }

  onMenuClick(menu: SidebarMenu) {

    if (menu.children?.length) {

      menu.expanded = !menu.expanded;
      return;

    }

    if (menu.route) {

      this.router.navigate([menu.route]);

    }

  }

  onChildClick(menu: SidebarMenu) {

    if (menu.route) {

      this.router.navigate([menu.route]);

    }

  }

}
