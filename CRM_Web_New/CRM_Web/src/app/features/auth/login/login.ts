import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/authentication/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Spinnerservice } from '../../../core/services/spinnerservice';
import { Alertservice } from '../../../core/services/alertservice';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {


  username = '';

  password = '';

  loading = false;

  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: Spinnerservice,
    private alertService: Alertservice
  ) { }

  login(): void {
    if (!this.username || !this.password) {

      this.alertService.warning(
        'Please enter Username and Password'
      );

      return;
    }

    this.loading = true;
    this.spinner.show();
    this.errorMessage = '';

    this.authService.login({ userName: this.username, password: this.password }).subscribe({

      next: (response) => {

        this.loading = false;
        this.spinner.hide();

        // console.log(
        //   'Login Success',
        //   response
        // );

        // this.router.navigate(['/dashboard']);
        this.alertService
          .success('Login Successful')
          .then(() => {
            this.router.navigate(['/dashboard']);
          });
      },

      error: (error) => {
        this.loading = false;
        this.spinner.hide();

        console.error(error);

        const message =
          error?.error?.message || 'Invalid Username or Password';

        this.alertService.error(message);
      }

    });

  }
}
