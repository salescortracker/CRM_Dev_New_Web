import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/authentication/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
    private router: Router
  ) {}

  login(): void {

    this.loading = true;

    this.errorMessage = '';

    this.authService.login({userName: this.username,password: this.password}).subscribe({

      next: (response) => {

        this.loading = false;

        console.log(
          'Login Success',
          response
        );

        this.router.navigate(['/dashboard']);
      },

      error: (error) => { this.loading = false;

        console.error(error);

        this.errorMessage = error?.error?.message || 'Invalid Username or Password';
      }

    });

  }
}
