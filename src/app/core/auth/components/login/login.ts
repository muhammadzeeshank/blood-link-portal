import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { ThemeService } from '../../../../core/layout/services/theme.service';
import { PasswordModule } from 'primeng/password';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { FloatLabelModule } from 'primeng/floatlabel';
import { LoginRequest } from '../../models/auth-response.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PasswordModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    InputTextModule,
    MessageModule,
    FloatLabelModule,
  ],
  templateUrl: './login.html',
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  isLoading = signal(false);
  showPassword = signal(false);
  errorMessage = signal('');
  public themeService = inject(ThemeService);

  loginForm = this.fb.group({
    email: ['admin@bloodlink.com', [Validators.required, Validators.email]],
    password: ['password123', [Validators.required, Validators.minLength(6)]],
  });

  constructor() {
    // Sync local theme state with DOM
    // this.isDarkMode.set(document.documentElement.classList.contains('dark'));
  }

  togglePassword() {
    this.showPassword.update((v) => !v);
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const { email, password } = this.loginForm.value;

    try {
      let body: LoginRequest = { emailId: email!, password: password! };

      console.log('Logging in with', body);
      this.authService.login(body).subscribe({
        next: (data) => {
          console.log('Login successful:', data);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Login error:', error);
          this.errorMessage.set('Invalid email or password. Please try again.');
        },
      });

      // if (success) {
      //   this.router.navigate(['/dashboard']);
      // } else {
      //   this.errorMessage.set('Invalid email or password. Please try again.');
      //   this.isLoading.set(false);
      // }
    } catch (error) {
      this.errorMessage.set('An unexpected error occurred.');
      this.isLoading.set(false);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}
