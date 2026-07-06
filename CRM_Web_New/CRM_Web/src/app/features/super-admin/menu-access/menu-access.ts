import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/authentication/services/auth.service';


interface Permission {
  view: boolean;
  add: boolean;
  edit: boolean;
  delete: boolean;
  approve: boolean;
}
// interface Menu {
//   menuId: number;
//   menuName: string;
//   parentMenuId?: number;
//   url?: string;
//   icon?: string;
//   orderNo?: number;
//   menuType: string;
//   isActive: boolean;
//   canView: boolean;
//   canAdd: boolean;
//   canEdit: boolean;
//   canDelete: boolean;
//   canApprove: boolean;
// }

export interface Menu {
  menuId: number;
  menuName: string;
  parentMenuId: number | null;
  url?: string;
  icon?: string;
  orderNo?: number;
  menuType: string;
  isActive: boolean;
  canView: boolean;
  canAdd: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canApprove: boolean;
}
@Component({
  selector: 'app-menu-access',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './menu-access.html',
  styleUrl: './menu-access.css',
})
export class MenuAccess implements OnInit{
    roles: string[] = [
    'Super Admin',
    'Admin',
    'User'
  ];

  selectedRole = 'Super Admin';

  menus: Menu[] = [];

  selectedMenu!: Menu;

  isNew = false;
constructor(
  private authService: AuthService
) {}
  ngOnInit(): void {

    this.loadMenus();

    // this.selectedMenu = JSON.parse(JSON.stringify(this.menus[0]));

  }

loadMenus(): void {

  this.authService
    .getMenus()
    .subscribe({

      next: (response) => {

        this.menus = response.data;

        if (this.menus.length > 0) {

          this.selectedMenu =
            JSON.parse(
              JSON.stringify(this.menus[0])
            );
        }
      },

      error: (err) => {

        console.error(err);

      }
    });
}

 selectMenu(menu: Menu): void {

  this.authService
      .getMenuById(menu.menuId)
      .subscribe({

        next: (response) => {

          this.selectedMenu =
            response.data;

        }
      });

}

 addNewMenu(): void {

  this.selectedMenu = {

    menuId: 0,

    menuName: '',

    parentMenuId: null,

    url: '',

    icon: '',

    orderNo: 1,

    menuType: 'Common',

    isActive: true,

    canView: true,

    canAdd: false,

    canEdit: false,

    canDelete: false,

    canApprove: false
  };

}

 saveMenu(): void {

  if (this.selectedMenu.menuId === 0) {

    this.authService
      .createMenu(this.selectedMenu)
      .subscribe({

        next: (res) => {

          alert(res.message);

          this.loadMenus();

        }
      });

  }
  else {

    this.authService
      .updateMenu(this.selectedMenu)
      .subscribe({

        next: (res) => {

          alert(res.message);

          this.loadMenus();

        }
      });

  }

}

 deleteMenu(): void {

  if (!confirm('Delete Menu ?')) {

    return;

  }

  this.authService
    .deleteMenu(this.selectedMenu.menuId)
    .subscribe({

      next: (res) => {

        alert(res.message);

        this.loadMenus();

      }
    });

}

 toggleStatus() {

  this.selectedMenu.isActive =
    !this.selectedMenu.isActive;

  const index =
    this.menus.findIndex(
      x => x.menuId === this.selectedMenu.menuId
    );

  if (index !== -1) {

    this.menus[index].isActive =
      this.selectedMenu.isActive;

  }
}

  resetForm(){

    if(this.isNew){

      this.addNewMenu();

      return;

    }

    const menu=this.menus.find(x=>x.menuId == this.selectedMenu.menuId);

    if(menu){

      this.selectedMenu=JSON.parse(JSON.stringify(menu));

    }

  }

  moveUp(){

    const index =
  this.menus.findIndex(
    x => x.menuId === this.selectedMenu.menuId
  );

    if(index>0){

      const temp=this.menus[index];

      this.menus[index]=this.menus[index-1];

      this.menus[index-1]=temp;

    }

  }

  moveDown(){

   const index =
  this.menus.findIndex(
    x => x.menuId === this.selectedMenu.menuId
  );

    if(index<this.menus.length-1){

      const temp=this.menus[index];

      this.menus[index]=this.menus[index+1];

      this.menus[index+1]=temp;

    }

  }
}
