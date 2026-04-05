import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// import { LoaderService } from '../../services/loader.service';
import { AppButton } from '../../shared/components/app-button/app-button';

type NotificationSettings = {
  emailAlerts: boolean;
  smsAlerts: boolean;
  weeklyReport: boolean;
  stockLowAlert: boolean;
  newDonorAlert: boolean;
};

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule, AppButton, ],
  templateUrl: './settings.html'
})
export class Settings {
  private fb: FormBuilder = inject(FormBuilder);
  // private loaderService = inject(LoaderService);

  activeTab = signal<'profile' | 'notifications' | 'security'>('profile');
  isSaving = signal(false);

  // Profile Form
  profileForm = this.fb.group({
    fullName: ['Dr. Alex Doe', Validators.required],
    email: ['admin@bloodlink.com', [Validators.required, Validators.email]],
    role: [{value: 'Chief Administrator', disabled: true}],
    phone: ['+1 (555) 123-4567']
  });

  // Password Form
  passwordForm = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required]
  });

  // Notifications State (Mock)
  notifications = signal<NotificationSettings>({
    emailAlerts: true,
    smsAlerts: false,
    weeklyReport: true,
    stockLowAlert: true,
    newDonorAlert: false
  });

  setActiveTab(tab: 'profile' | 'notifications' | 'security') {
    this.activeTab.set(tab);
  }

  toggleNotification(key: keyof NotificationSettings) {
    this.notifications.update(n => ({ ...n, [key]: !n[key] }));
  }

  async saveProfile() {
    if (this.profileForm.invalid) return;
    
    this.isSaving.set(true);
    // this.loaderService.show();
    
    // Simulate API
    await new Promise(r => setTimeout(r, 1000));
    
    // this.loaderService.hide();
    this.isSaving.set(false);
    // In a real app, show a toast here
  }

  async updatePassword() {
    if (this.passwordForm.invalid) return;

    this.isSaving.set(true);
    // this.loaderService.show();

    // Simulate API
    await new Promise(r => setTimeout(r, 1500));

    // this.loaderService.hide();
    this.isSaving.set(false);
    this.passwordForm.reset();
  }
}