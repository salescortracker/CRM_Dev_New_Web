import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/authentication/services/auth.service';
import { Output, EventEmitter } from '@angular/core';

interface SidebarMenu {
  label: string;
  icon: string;
  route?: string;
  roles: string[];
  group: string;
  children?: SidebarMenu[];
  expanded?: boolean;
  orderNo?: number;
}

interface MenuAccessItem {
  menuId: number;
  menuName: string;
  parentMenuId: number | null;
  url?: string;
  icon?: string;
  orderNo?: number;
  menuType?: string;
  isActive: boolean;
  canView: boolean;
  roles?: string[] | string;
  role?: string;
  roleName?: string;
  allowedRoles?: string[] | string;
  visibleRoles?: string[] | string;
  userRole?: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  @Output()
sidebarToggle = new EventEmitter<boolean>();
   isCollapsed = false;
  toggleSidebar() {
  this.isCollapsed = !this.isCollapsed;
  this.sidebarToggle.emit(this.isCollapsed);
}

  private readonly dashboardMenu: SidebarMenu = {
    label: 'Dashboard',
    icon: 'fa-chart-line',
    route: '/dashboard',
    roles: ['Super Admin', 'Admin', 'User'],
    group: 'CRM Flow',
    orderNo: 0
  };

  private readonly menuAccessMenu: SidebarMenu = {
    label: 'Menu Access',
    icon: 'fa-unlock-keyhole',
    route: '/menu-access',
    roles: ['Super Admin'],
    group: 'Administration'
  };

  menus: SidebarMenu[] = [];

  userRole = 'User';

  constructor(private authService: AuthService) {
    this.userRole = this.getCurrentUserRole();
    this.menus = this.getFallbackMenus();
  }

  ngOnInit(): void {
    this.loadSidebarMenus();
  }

  get menuGroups(): { heading: string; menus: SidebarMenu[] }[] {
    const groups = new Map<string, SidebarMenu[]>();

    for (const menu of this.visibleMenus) {
      if (!groups.has(menu.group)) {
        groups.set(menu.group, []);
      }

      groups.get(menu.group)?.push(menu);
    }

    return Array.from(groups.entries()).map(([heading, menus]) => ({
      heading,
      menus
    }));
  }

  private get visibleMenus(): SidebarMenu[] {
    const role = this.normalizeRole(this.userRole);

    return this.menus.filter(menu =>
      menu.roles.some(allowedRole => this.normalizeRole(allowedRole) === role)
    );
  }

  private loadSidebarMenus(): void {
    this.authService.getMenus().subscribe({
      next: (response) => {
        const configuredMenus = this.mapConfiguredMenus(
          Array.isArray(response) ? response : response?.data || []
        );

        this.menus = configuredMenus.length
          ? configuredMenus
          : this.getFallbackMenus();
      },
      error: (err) => {
        console.error('Unable to load sidebar menus', err);
        this.menus = this.getFallbackMenus();
      }
    });
  }

  private mapConfiguredMenus(items: MenuAccessItem[]): SidebarMenu[] {
    const role = this.normalizeRole(this.userRole);
    const dashboardItem = items.find(item => this.isDashboardMenu(item));
    const activeMenus = items
      .filter(item =>
        !this.isDashboardMenu(item) &&
        !this.isMenuAccessMenu(item) &&
        this.isActive(item) &&
        this.canView(item) &&
        this.isAllowedForRole(item, role)
      )
      .sort((a, b) => (a.orderNo || 0) - (b.orderNo || 0));

    const menuMap = new Map<number, SidebarMenu>();

    for (const item of activeMenus) {
      menuMap.set(item.menuId, {
        label: item.menuName,
        icon: item.icon || 'fa-circle',
        route: item.url || undefined,
        roles: [this.userRole],
        group: this.getMenuGroup(item),
        orderNo: item.orderNo,
        children: []
      });
    }

    const parentMenus: SidebarMenu[] = [];

    for (const item of activeMenus) {
      const menu = menuMap.get(item.menuId);

      if (!menu) {
        continue;
      }

      if (item.parentMenuId && menuMap.has(item.parentMenuId)) {
        menuMap.get(item.parentMenuId)?.children?.push(menu);
      } else {
        parentMenus.push(menu);
      }
    }

    const configuredMenus = parentMenus.map(menu => ({
      ...menu,
      children: menu.children?.length ? menu.children : undefined
    }));

    return [
      this.mapDashboardMenu(dashboardItem),
      ...configuredMenus,
      ...this.getSuperAdminMenus(items)
    ];
  }

  private isAllowedForRole(menu: MenuAccessItem, normalizedRole: string): boolean {
    const roleValue =
      menu.roles ||
      menu.allowedRoles ||
      menu.visibleRoles ||
      menu.role ||
      menu.roleName ||
      menu.userRole ||
      this.getRoleFromMenuType(menu.menuType);

    if (!roleValue) {
      return true;
    }

    const allowedRoles = Array.isArray(roleValue)
      ? roleValue
      : roleValue.split(',');

    return allowedRoles.some(role => this.normalizeRole(role) === normalizedRole);
  }

  private getFallbackMenus(): SidebarMenu[] {
    return [
      this.dashboardMenu,
      ...(this.isSuperAdmin() ? [this.menuAccessMenu] : [])
    ];
  }

  private getSuperAdminMenus(items: MenuAccessItem[]): SidebarMenu[] {
    if (!this.isSuperAdmin()) {
      return [];
    }

    const configuredMenuAccess = items.find(item =>
      this.isMenuAccessMenu(item) &&
      this.isActive(item) &&
      this.canView(item)
    );

    return [
      configuredMenuAccess
        ? this.mapMenuItem(configuredMenuAccess, 'Administration')
        : this.menuAccessMenu
    ];
  }

  private mapDashboardMenu(item?: MenuAccessItem): SidebarMenu {
    return item && this.isActive(item) && this.canView(item)
      ? this.mapMenuItem(item, 'CRM Flow', this.dashboardMenu)
      : this.dashboardMenu;
  }

  private mapMenuItem(
    item: MenuAccessItem,
    fallbackGroup: string,
    fallback?: SidebarMenu
  ): SidebarMenu {
    return {
      label: item.menuName || fallback?.label || '',
      icon: item.icon || fallback?.icon || 'fa-circle',
      route: item.url || fallback?.route || undefined,
      roles: [this.userRole],
      group: this.getMenuGroup(item) || fallback?.group || fallbackGroup,
      orderNo: item.orderNo
    };
  }

  private isActive(menu: MenuAccessItem): boolean {
    return menu.isActive !== false;
  }

  private canView(menu: MenuAccessItem): boolean {
    return menu.canView !== false;
  }

  private isDashboardMenu(menu: MenuAccessItem): boolean {
    return this.normalizeMenuName(menu.menuName) === 'dashboard' ||
      this.normalizeRoute(menu.url) === '/dashboard';
  }

  private isMenuAccessMenu(menu: MenuAccessItem): boolean {
    return this.normalizeMenuName(menu.menuName) === 'menu access' ||
      this.normalizeRoute(menu.url) === '/menu-access';
  }

  private isSuperAdmin(): boolean {
    return this.normalizeRole(this.userRole) === 'super admin';
  }

  private getRoleFromMenuType(menuType?: string): string | null {
    const normalizedMenuType = this.normalizeRole(menuType || '');

    if (normalizedMenuType === 'superadmin' || normalizedMenuType === 'super admin') {
      return 'Super Admin';
    }

    if (normalizedMenuType === 'admin') {
      return 'Admin';
    }

    if (normalizedMenuType === 'user') {
      return 'User';
    }

    return null;
  }

  private getMenuGroup(item: MenuAccessItem): string {
    const roleFromMenuType = this.getRoleFromMenuType(item.menuType);

    if (roleFromMenuType) {
      return roleFromMenuType;
    }

    return item.menuType || 'CRM Flow';
  }

  private getCurrentUserRole(): string {
    const user = this.authService.getCurrentUser() as any;

    return user?.role ||
      user?.roleName ||
      user?.userRole ||
      user?.user?.role ||
      user?.user?.roleName ||
      'User';
  }

  private normalizeRole(role: string): string {
    const normalizedRole = (role || '').replace(/[-_]/g, ' ').trim().toLowerCase();

    return normalizedRole === 'superadmin'
      ? 'super admin'
      : normalizedRole;
  }

  private normalizeMenuName(name: string): string {
    return (name || '').replace(/[-_]/g, ' ').trim().toLowerCase();
  }

  private normalizeRoute(route?: string): string {
    const normalizedRoute = (route || '').trim().toLowerCase();

    return normalizedRoute.startsWith('/')
      ? normalizedRoute
      : `/${normalizedRoute}`;
  }
  toggleMenu(menu: SidebarMenu): void {

  if (!menu.children) {
    return;
  }

  menu.expanded = !menu.expanded;
}
  
}
