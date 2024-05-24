import { Component } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StagiaireService } from '../../core/service';
import { AuthService } from '../../core/service/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', Validators.required);
  errorMessage: string = '';

  constructor(
    private router: Router,
    private stagiaireService: StagiaireService,
    private authService: AuthService
  ) { }

  login() {
    if (this.emailControl.invalid || this.passwordControl.invalid) {
      this.emailControl.markAsTouched();
      this.passwordControl.markAsTouched();
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    this.authService.Login(this.emailControl.value!, this.passwordControl.value!).subscribe(
      (data) => {
        if (data) {
          this.router.navigate(['/home']);
          alert('Login success!');
        } else {
          this.errorMessage = 'Invalid email or password';
        }
      },
      (error) => {
        console.error(error);
        this.errorMessage = 'An error occurred. Please try again later.';
      }
    );
  }

  onSubmit() {
    this.router.navigate(['/registre']);
  }
  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
