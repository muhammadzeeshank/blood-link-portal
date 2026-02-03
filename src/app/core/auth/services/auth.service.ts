import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../../layout/services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private loaderService = inject(LoaderService);
  
  // Dummy credentials
  private readonly MOCK_USER = {
    email: 'admin@bloodlink.com',
    password: 'password123'
  };

  isAuthenticated = signal<boolean>(this.checkInitialAuth());

  private checkInitialAuth(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  async login(email: string, pass: string): Promise<boolean> {
    this.loaderService.show();
    
    try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (email === this.MOCK_USER.email && pass === this.MOCK_USER.password) {
        localStorage.setItem('auth_token', 'fake-jwt-token-123456');
        this.isAuthenticated.set(true);
        return true;
        }
        
        return false;
    } finally {
        this.loaderService.hide();
    }
  }

  logout() {
    this.loaderService.show();
    // Simulate short delay for logout
    setTimeout(() => {
        localStorage.removeItem('auth_token');
        this.isAuthenticated.set(false);
        this.loaderService.hide();
        this.router.navigate(['/login']);
    }, 500);
  }
}