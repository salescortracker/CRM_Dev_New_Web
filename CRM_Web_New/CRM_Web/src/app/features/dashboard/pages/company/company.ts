import { Component } from '@angular/core';
import { AuthService } from '../../../../core/authentication/services/auth.service';
import { Spinnerservice } from '../../../../core/services/spinnerservice';
import { Alertservice } from '../../../../core/services/alertservice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule,
    FormsModule],
  templateUrl: './company.html',
  styleUrl: './company.css',
})
export class Company {
   companies: any[] = [];

  company: any = {
    companyId: 0,
    companyName: '',
    companyCode: '',
    industryType: '',
    headquarters: '',
    companyEmail: '',
    companyContact: '',
    companyAddress: '',
    companyLogo: '',
    planId: null,
    planStartDate: '',
    expiryDate: '',
    isDefault: 0,
    isActive: true
  };

  isEdit = false;

  constructor(
    private authService: AuthService,
    private spinner: Spinnerservice,
    private alert: Alertservice
  ) { }

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies() {

    this.spinner.show();

    this.authService.getCompanies().subscribe({

      next: (res) => {

        this.spinner.hide();

        this.companies = res.data;
      },

      error: (err) => {

        this.spinner.hide();

        this.alert.error(err.error.message);

      }

    });

  }

  saveCompany() {

    if (!this.company.companyName) {

      this.alert.warning("Company Name Required");

      return;

    }

    this.spinner.show();

    if (!this.isEdit) {

      this.authService.createCompany(this.company)
        .subscribe({

          next: (res) => {

            this.spinner.hide();

            this.alert.success(res.message);

            this.loadCompanies();

            this.clear();

          },

          error: (err) => {

            this.spinner.hide();

            this.alert.error(err.error.message);

          }

        });

    }

    else {

      this.authService.updateCompany(this.company)
        .subscribe({

          next: (res) => {

            this.spinner.hide();

            this.alert.success(res.message);

            this.loadCompanies();

            this.clear();

          },

          error: (err) => {

            this.spinner.hide();

            this.alert.error(err.error.message);

          }

        });

    }

  }

  edit(id: number) {

    this.spinner.show();

    this.authService.getCompanyById(id)
      .subscribe({

        next: (res) => {

          this.spinner.hide();

          this.company = res.data;

          this.isEdit = true;

        },

        error: (err) => {

          this.spinner.hide();

          this.alert.error(err.error.message);

        }

      });

  }

  delete(id: number) {

    this.alert.deleteConfirm().then(result => {

      if (result.isConfirmed) {

        this.spinner.show();

        this.authService.deleteCompany(id)
          .subscribe({

            next: (res) => {

              this.spinner.hide();

              this.alert.success(res.message);

              this.loadCompanies();

            },

            error: (err) => {

              this.spinner.hide();

              this.alert.error(err.error.message);

            }

          });

      }

    });

  }

  clear() {

    this.company = {

      companyId: 0,
      companyName: '',
      companyCode: '',
      industryType: '',
      headquarters: '',
      companyEmail: '',
      companyContact: '',
      companyAddress: '',
      companyLogo: '',
      planId: null,
      planStartDate: '',
      expiryDate: '',
      isDefault: 0,
      isActive: true

    };

    this.isEdit = false;

  }
}
