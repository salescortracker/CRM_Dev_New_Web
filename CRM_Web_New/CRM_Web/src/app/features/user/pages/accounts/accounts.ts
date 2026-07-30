import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Spinnerservice } from '../../../../core/services/spinnerservice';
import { Alertservice } from '../../../../core/services/alertservice';
import { Pagination } from '../../../../shared/pagination/pagination';



@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule,FormsModule,Pagination],
  templateUrl: './accounts.html',
  styleUrl: './accounts.css',
})
export class Accounts {
  submitted = false;
  isEdit = false;

  page = 1;
  pageSize = 5;
  totalRecords = 0;
  searchText = '';

  accounts: any[] = [];

  account: any = {
    accountId: 0,
    accountName: '',
    accountNumber: '',
    accountType: '',
    industry: '',
    website: '',
    email: '',
    phone: '',
    owner: '',
    employees: '',
    revenue: '',
    rating: '',
    billingAddress: '',
    shippingAddress: '',
    status: '',
    isActive: true
  };

  constructor(
    private alert: Alertservice
  ) { }

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts() {

    this.accounts = [

      {
        accountId: 1,
        accountName: 'ABC Technologies',
        accountNumber: 'ACC1001',
        accountType: 'Customer',
        industry: 'Software',
        website: 'www.abctech.com',
        email: 'info@abctech.com',
        phone: '9876543210',
        owner: 'Karishma',
        employees: 220,
        revenue: 2500000,
        rating: 'Hot',
        billingAddress: 'Hyderabad',
        shippingAddress: 'Hyderabad',
        status: 'Active',
        isActive: true
      },

      {
        accountId: 2,
        accountName: 'XYZ Solutions',
        accountNumber: 'ACC1002',
        accountType: 'Partner',
        industry: 'IT Services',
        website: 'www.xyzsolutions.com',
        email: 'contact@xyzsolutions.com',
        phone: '9988776655',
        owner: 'Rahul',
        employees: 140,
        revenue: 1800000,
        rating: 'Warm',
        billingAddress: 'Bangalore',
        shippingAddress: 'Bangalore',
        status: 'Active',
        isActive: true
      },

      {
        accountId: 3,
        accountName: 'NextGen Pvt Ltd',
        accountNumber: 'ACC1003',
        accountType: 'Vendor',
        industry: 'Manufacturing',
        website: 'www.nextgen.com',
        email: 'sales@nextgen.com',
        phone: '9123456780',
        owner: 'Priya',
        employees: 320,
        revenue: 4200000,
        rating: 'Hot',
        billingAddress: 'Chennai',
        shippingAddress: 'Chennai',
        status: 'Inactive',
        isActive: false
      },

      {
        accountId: 4,
        accountName: 'Future Vision',
        accountNumber: 'ACC1004',
        accountType: 'Prospect',
        industry: 'Healthcare',
        website: 'www.futurevision.com',
        email: 'support@futurevision.com',
        phone: '9000011111',
        owner: 'Arun',
        employees: 95,
        revenue: 950000,
        rating: 'Cold',
        billingAddress: 'Pune',
        shippingAddress: 'Pune',
        status: 'Active',
        isActive: true
      },

      {
        accountId: 5,
        accountName: 'Global InfoTech',
        accountNumber: 'ACC1005',
        accountType: 'Customer',
        industry: 'Finance',
        website: 'www.globalinfo.com',
        email: 'info@globalinfo.com',
        phone: '9876501234',
        owner: 'Sneha',
        employees: 410,
        revenue: 5200000,
        rating: 'Hot',
        billingAddress: 'Mumbai',
        shippingAddress: 'Mumbai',
        status: 'Active',
        isActive: true
      }

    ];

    this.accounts.sort((a, b) => b.accountId - a.accountId);

    this.totalRecords = this.accounts.length;
  }

  saveAccount() {

    this.submitted = true;

    if (
      !this.account.accountName ||
      !this.account.accountNumber ||
      !this.account.accountType ||
      !this.account.status
    ) {
      return;
    }

    if (!this.isEdit) {

      const newAccount = {

        ...this.account,

        accountId: this.accounts.length
          ? Math.max(...this.accounts.map(x => x.accountId)) + 1
          : 1

      };

      this.accounts.unshift(newAccount);

      this.totalRecords = this.accounts.length;

      this.alert.success('Account created successfully.');

      this.clear();

    }
    else {

      const index = this.accounts.findIndex(
        x => x.accountId === this.account.accountId
      );

      if (index !== -1) {

        this.accounts[index] = {
          ...this.account
        };

      }

      this.alert.success('Account updated successfully.');

      this.clear();

    }

  }
    edit(id: number) {

    const selected = this.accounts.find(
      x => x.accountId === id
    );

    if (selected) {

      this.account = {
        ...selected
      };

      this.isEdit = true;

      this.submitted = false;

    }

  }

  delete(id: number) {

    this.alert.deleteConfirm().then(result => {

      if (result.isConfirmed) {

        this.accounts = this.accounts.filter(
          x => x.accountId !== id
        );

        this.totalRecords = this.accounts.length;

        // Adjust page if current page becomes empty
        if (
          this.page > 1 &&
          this.pagedAccounts.length === 0
        ) {
          this.page--;
        }

        this.alert.success('Account deleted successfully.');

      }

    });

  }

  clear() {

    this.account = {

      accountId: 0,
      accountName: '',
      accountNumber: '',
      accountType: '',
      industry: '',
      website: '',
      email: '',
      phone: '',
      owner: '',
      employees: '',
      revenue: '',
      rating: '',
      billingAddress: '',
      shippingAddress: '',
      status: '',
      isActive: true

    };

    this.isEdit = false;

    this.submitted = false;

  }

  get filteredAccounts() {

    return this.accounts.filter(x =>

      x.accountName
        .toLowerCase()
        .includes(this.searchText.toLowerCase())

      ||

      x.accountNumber
        .toLowerCase()
        .includes(this.searchText.toLowerCase())

      ||

      x.accountType
        .toLowerCase()
        .includes(this.searchText.toLowerCase())

      ||

      x.owner
        .toLowerCase()
        .includes(this.searchText.toLowerCase())

    );

  }

  get pagedAccounts() {

    const start = (this.page - 1) * this.pageSize;

    return this.filteredAccounts.slice(
      start,
      start + this.pageSize
    );

  }

  changePage(page: number) {

    this.page = page;

  }

  changePageSize(size: number) {

    this.pageSize = size;

    this.page = 1;

  }


}
