import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { OnInit } from '@angular/core';
import { AuthService } from '../../../core/authentication/services/auth.service';
// import { AuthService } from '../../core/authentication/services/auth.service';

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

  constructor(private router: Router, private authService: AuthService) { }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarToggle.emit(this.isCollapsed);
  }

  ngOnInit() {

    this.loadMenus();

  }
  loadMenus() {

    const role = this.authService.getCurrentUser()?.role;

    switch (role) {

      case 'Super Admin':

        this.menus = this.superAdminMenus;

        break;

      case 'Admin':

        this.menus = this.companyAdminMenus;

        break;

      case 'User':

        this.menus = this.userMenus;

        break;

      default:

        this.menus = [];

    }

  }
  menus: SidebarMenu[] = [];
  superAdminMenus: SidebarMenu[] = [

    {
      label: 'Dashboard',
      icon: 'fa-chart-line',
      route: '/dashboard',
      group: 'CRM'
    },

    {
      label: 'Organizations',
      icon: 'fa-user-shield',
      group: 'Administration',
      expanded: false,
      children: [
        {
          label: 'Organizations',
          icon: 'fa-users',
          route: '/organizations',
          group: 'Administration'
        },

        {
          label: 'Companys',
          icon: 'fa-building',
          route: '/company',
          group: 'Administration'
        },
        {
          label: 'Regions',
          icon: 'fa-building',
          route: '/region',
          group: 'Administration'
        },
        {
          label: 'Branches',
          icon: 'fa-building',
          route: '/branches',
          group: 'Administration'
        },

      ]

    },
    {
      label: 'Subscription Management',
      icon: 'fa-building',
      group: 'Administration',
      expanded: false,
      children: [
        {
          label: 'Plans',
          icon: 'fa-building',
          route: '/plans',
          group: 'Administration'
        },
        {
          label: ' Company Subscriptions',
          icon: 'fa-code-branch',
          route: '/subscriptions',
          group: 'Administration'
        },
        {
          label: 'Subscription Renewals',
          icon: 'fa-code-branch',
          //route: '/subscriptions',
          group: 'Administration'
        },
        {
          label: ' Payment Tracking',
          icon: 'fa-map-location-dot',
          // route: '/regions',
          group: 'Administration'
        },
        {
          label: 'Billing',
          icon: 'fa-map-location-dot',
          // route: '/regions',
          group: 'Administration'
        },
        {
          label: 'Invoices',
          icon: 'fa-map-location-dot',
          // route: '/regions',
          group: 'Administration'
        }
      ]
    },
    {
      label: 'User Management',
      icon: 'fa-building',
      group: 'Administration',
      expanded: false,
      children: [
        {
          label: 'Departments',
          icon: 'fa-building',
          // route: '/plans',
          group: 'Administration'
        },
        {
          label: 'Designations',
          icon: 'fa-code-branch',
          // route: '/branches',
          group: 'Administration'
        },
        {
          label: 'Menu Access',
          icon: 'fa-map-location-dot',
          route: '/menu-access',
          group: 'Administration'
        },
        {
          label: 'Roles And Permissions',
          icon: 'fa-map-location-dot',
          // route: '/regions',
          group: 'Administration'
        },
        {
          label: 'Users',
          icon: 'fa-map-location-dot',
          // route: '/regions',
          group: 'Administration'
        },
        {
          label: 'Teams',
          icon: 'fa-map-location-dot',
          // route: '/regions',
          group: 'Administration'
        }
      ]
    },
    {
      label: 'CRM Module Configuration',
      icon: 'fa-chart-line',
      group: 'Administration'
    },
    {
      label: 'Integration Management',
      icon: 'fa-plug',
      group: 'Administration',
      expanded: false,
      children: [
        {
          label: 'Email Configuration',
          icon: 'fa-building',
          // route: '/plans',
          group: 'Administration'
        },
        {
          label: 'SMS Configuration',
          icon: 'fa-code-branch',
          // route: '/branches',
          group: 'Administration'
        },
        {
          label: 'WhatsApp Configuration',
          icon: 'fa-map-location-dot',
          // route: '/regions',
          group: 'Administration'
        },
        {
          label: 'Telephony Configuration',
          icon: 'fa-map-location-dot',
          // route: '/regions',
          group: 'Administration'
        },
        {
          label: 'API Configuration',
          icon: 'fa-map-location-dot',
          // route: '/regions',
          group: 'Administration'
        },
        {
          label: 'Webhooks',
          icon: 'fa-map-location-dot',
          // route: '/regions',
          group: 'Administration'
        },
        {
          label: 'Third Party Integrations',
          icon: 'fa-map-location-dot',
          // route: '/regions',
          group: 'Administration'
        }

      ]
    },
    {
      label: 'Workflow & Automation',
      icon: 'fa-chart-line',

      group: 'Administration',
      expanded: false,

      children: [

        {
          label: ' Workflow Rules',
          icon: 'fa-building',
          // route: '/backup-recovery',
          group: 'Administration'
        },
        {
          label: 'Approval Workflow',
          icon: 'fa-building',
          // route: '/backup-recovery',
          group: 'Administration'
        },
        {
          label: 'Auto Assignment',
          icon: 'fa-building',
          // route: '/backup-recovery',
          group: 'Administration'
        },
        {
          label: 'Escalation Rules',
          icon: 'fa-building',
          // route: '/backup-recovery',
          group: 'Administration'
        }
      ]
    },
    {
      label: 'Security Center',
      icon: 'fa-chart-line',

      group: 'Administration',
      expanded: false,

      children: [
        {
          label: 'Login Sessions',
          icon: 'fa-building',
          route: '/login-sessions',
          group: 'Administration'
        }
      ]
    },
    {
      label: 'Notification Management',
      icon: 'fa-chart-line',
      route: '/notifications',
      group: 'Administration'
    },
    {
      label: 'Audit & Monitoring',
      icon: 'fa-chart-line',
      route: '/audit-logs',
      group: 'Administration'
    },
    {
      label: 'Data Management',
      icon: 'fa-chart-line',

      group: 'Administration',
      expanded: false,

      children: [

        {
          label: 'Automated Backup',
          icon: 'fa-building',
          route: '/backup-recovery',
          group: 'Administration'
        }
      ]
    },

    {
      label: 'Reports & Analytics',
      icon: 'fa-chart-line',
      group: 'Administration'
    },
    {
      label: 'System Settings',
      icon: 'fa-chart-line',
      group: 'Administration'
    },

    {
      label: 'Setup',
      icon: 'fa-gears',
      group: 'Setup',

    }

  ];
  companyAdminMenus: SidebarMenu[] = [

    {
      label: 'Dashboard',
      icon: 'fa-chart-line',
      route: '/dashboard',
      group: 'CRM'
    },

   

    {
      label: 'Sales',
      icon: 'fa-money-bill',
      group: 'CRM',
      expanded: false,
      children: [
        {
          label: 'Leads',
          icon: 'fa-user-plus',
          route: '/leads',
          group: 'CRM'
        },
        {
          label: 'Opportunities',
          icon: 'fa-handshake',
          route: '/opportunities',
          group: 'CRM'
        },
        {
          label: 'Deals',
          icon: 'fa-deals',
          group: 'CRM'
        },

        {
          label: 'Quotes',
          icon: 'fa-file-lines',
          route: '/quotes',
          group: 'CRM'
        },
        {
          label: 'Orders',
          icon: 'fa-cart-shopping',
          route: '/orders',
          group: 'CRM'
        },
        {
          label: 'Invoices',
          icon: 'fa-file-invoice',
          route: '/invoices',
          group: 'CRM'
        },
        {
          label: 'Sales Pipeline',
          icon: 'fa-sales',
          group: 'CRM'
        }

      ]

    },
     {
      label: 'Customer',
      icon: 'fa-users',
      group: 'CRM',
      expanded: false,
      children: [


        {
          label: 'Contacts',
          icon: 'fa-address-book',
          route: '/contacts',
          group: 'CRM'
        },

        {
          label: 'Accounts',
          icon: 'fa-building',
          route: '/accounts',
          group: 'CRM'
        },



      ]
    },

    {
      label: 'Activities',
      icon: 'fa-calendar-days',
      group: 'CRM',
      expanded: false,
      children: [

        {
          label: 'Tasks',
          icon: 'fa-list-check',
          route: '/tasks',
          group: 'CRM'
        },

        {
          label: 'Meetings',
          icon: 'fa-handshake',
          route: '/meetings',
          group: 'CRM'
        },

        {
          label: 'Calls',
          icon: 'fa-phone',
          route: '/calls',
          group: 'CRM'
        },
        {
          label: 'Calendar',
          icon: 'fa-calendar',
          route: '/calendar',
          group: 'CRM'
        },
        {
           label:'Reminders',
           icon: 'fa-notes',
           group:'CRM'
        }

      ]

    },
    {
      label: 'Marketing',
      icon: 'fa-money-bill',
      group: 'CRM',
      expanded: false,
      children: [
        {
          label: 'Campaigns',
          icon: 'fa-user-plus',
          route: '/leads',
          group: 'CRM'
        },
        {
          label: 'Email Campaigns',
          icon: 'fa-handshake',
          route: '/opportunities',
          group: 'CRM'
        },
        {
          label: 'SMS Campaigns',
          icon: 'fa-deals',
          group: 'CRM'
        },

        {
          label: 'Social Media Campaign',
          icon: 'fa-file-lines',
          route: '/quotes',
          group: 'CRM'
        },
        {
          label: 'Orders',
          icon: 'fa-cart-shopping',
          route: '/orders',
          group: 'CRM'
        },
        {
          label: 'Invoices',
          icon: 'fa-file-invoice',
          route: '/invoices',
          group: 'CRM'
        },
        {
          label: 'Sales Pipeline',
          icon: 'fa-sales',
          group: 'CRM'
        }

      ]

    },

    {
      label: 'Products & Services',
      icon: 'fa-boxes',
      route: '/products',
      group: 'CRM'
    },
    {
      label: 'Customer Management',
      icon: 'fa-users',
      route: '/customer-management',
      group: 'CRM'
    },
    {
      label: 'Employee Management',
      icon: 'fa-users',
      route: '/employee-management',
      group: 'CRM'
    },
    {
      label: 'Workflow & Automation',
      icon: 'fa-code-branch',
      route: '/workflow-automation',
      group: 'CRM'
    },
    {
      label: 'Notification Management',
      icon: 'fa-bell',
      route: '/notifications',
      group: 'CRM'
    },
    {
      label: 'Reports',
      icon: 'fa-chart-column',
      route: '/reports',
      group: 'CRM'
    },
    {
      label: 'Settings',
      icon: 'fa-gears',
      route: '/settings',
      group: 'CRM'
    },
    {
      label: 'Setup',
      icon: 'fa-gears',
      route: '/setup',
      group: 'CRM'
    }

  ];
  userMenus: SidebarMenu[] = [

    {
      label: 'Dashboard',
      icon: 'fa-chart-line',
      route: '/dashboard',
      group: 'CRM'
    },
    {
      label: 'My Workspace ',
      icon: 'fa-users',
      group: 'CRM',
      expanded: false,
      children: [
        {
          label: 'My Leads',
          icon: 'fa-user-plus',
          route: '/my-leads',
          group: 'CRM'
        },
        {
          label: 'My Opportunities',
          icon: 'fa-handshake',
          route: '/my-opportunities',
          group: 'CRM'
        },
        {
          label: 'My Deals',
          icon: 'fa-handshake',
          route: '/my-deals',
          group: 'CRM'
        },
      ]
    },

    {
      label: 'Customers',
      icon: 'fa-users',
      group: 'CRM',
      expanded: false,
      children: [
        {
          label: 'My Contacts',
          icon: 'fa-address-book',
          route: '/my-contacts',
          group: 'CRM'
        },
        {
          label: 'My Accounts',
          icon: 'fa-building',
          route: '/my-accounts',
          group: 'CRM'
        },
        {
          label: 'Customer Notes',
          icon: 'fa-building',
          group: 'CRM'
        },
        {
          label: 'Customer Documents',
          icon: 'fa-building',
          group: 'CRM'
        }

      ]
    },



    {
      label: 'Activities',
      icon: 'fa-calendar-days',
      route: '/meetings',
      group: 'CRM',
      children: [
        {
          label: 'My Tasks',
          icon: 'fa-list-check',
          route: '/my-tasks',
          group: 'CRM'
        },
        {
          label: 'My Targets',
          icon: 'fa-bullseye',
          route: '/my-targets',
          group: 'CRM'
        },
        {
          label: 'My Meetings',
          icon: 'fa-handshake',
          route: '/my-meetings',
          group: 'CRM'
        },
        {
          label: 'My Calls',
          icon: 'fa-phone',
          route: '/my-calls',
          group: 'CRM'
        },
        {
          label: 'My Calendar',
          icon: 'fa-calendar',
          route: '/my-calendar',
          group: 'CRM'
        },
        {
          label: 'My Follow Ups',
          icon: 'fa-building',
          group: 'CRM'
        },
        {
          label: 'My Notes',
          icon: 'fa-notes',
          group: 'CRM'

        }
      ]
    },
    {
      label: 'sales',
      icon: 'fa-file-lines',
      route: '/my-quotes',
      group: 'CRM',
      expanded: false,
      children: [
        {
          label: 'My Quotations',
          icon: 'fa-address-book',
          route: '/my-contacts',
          group: 'CRM'
        },
        {
          label: 'My Orders',
          icon: 'fa-building',
          route: '/my-accounts',
          group: 'CRM'
        },
        {
          label: 'My Invoices',
          icon: 'fa-building',
          group: 'CRM'
        },
        {
          label: 'Sales Pipeline',
          icon: 'fa-building',
          group: 'CRM'
        }

      ]
    },



    {
      label: 'Reports',
      icon: 'fa-chart-column',
      route: '/my-reports',
      group: 'CRM',
      expanded: false,
      children: [
        {
          label: 'My Performance',
          icon: 'fa-address-book',
          route: '/my-contacts',
          group: 'CRM'
        },
        {
          label: 'My Sales',
          icon: 'fa-building',
          route: '/my-accounts',
          group: 'CRM'
        },
        {
          label: 'My Leads',
          icon: 'fa-building',
          group: 'CRM'
        },
        {
          label: 'My Activities',
          icon: 'fa-building',
          group: 'CRM'
        }

      ]
    },
    {
      label: 'Profile',
      icon: 'fa-chart-column',
      route: '/my-reports',
      group: 'CRM',
      expanded: false,
      children: [
        {
          label: 'My Profile',
          icon: 'fa-address-book',
          route: '/my-contacts',
          group: 'CRM'
        },
        {
          label: 'Change Password',
          icon: 'fa-building',
          route: '/my-accounts',
          group: 'CRM'
        },
        {
          label: 'Notifications',
          icon: 'fa-building',
          group: 'CRM'
        },
        {
          label: 'Preferences',
          icon: 'fa-building',
          group: 'CRM'
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

  // onMenuClick(menu: SidebarMenu) {

  //   if (menu.children?.length) {

  //     menu.expanded = !menu.expanded;
  //     return;

  //   }

  //   if (menu.route) {

  //     this.router.navigate([menu.route]);

  //   }

  // }
  onMenuClick(menu: SidebarMenu) {

    if (menu.children && menu.children.length > 0) {

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
