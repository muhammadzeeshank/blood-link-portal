import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';

// PrimeNG Modules
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';

// Custom Components & Services
import { AppButton } from '../../shared/components/app-button/app-button';
import { DonorService } from './services/donor.service';
import { Donor, BloodGroup, DonorStatus } from './models/donor.model';

@Component({
  selector: 'app-donors',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BreadcrumbModule,
    TableModule,
    TagModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    MultiSelectModule,
    AppButton
  ],
  templateUrl: './donors.html',
  styleUrl: './donors.css',
})
export class Donors implements OnInit {
  private donorService = inject(DonorService);

  // Signals for state management
  donors = signal<Donor[]>([]);
  loading = signal<boolean>(true);

  // Breadcrumb state
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  // Filter Options
  bloodGroups: { label: string; value: BloodGroup }[] = [
    { label: 'A+', value: 'A+' }, { label: 'A-', value: 'A-' },
    { label: 'B+', value: 'B+' }, { label: 'B-', value: 'B-' },
    { label: 'AB+', value: 'AB+' }, { label: 'AB-', value: 'AB-' },
    { label: 'O+', value: 'O+' }, { label: 'O-', value: 'O-' }
  ];

  statuses: { label: string; value: DonorStatus }[] = [
    { label: 'Eligible', value: 'Eligible' },
    { label: 'Deferred', value: 'Deferred' },
    { label: 'Ineligible', value: 'Ineligible' }
  ];

  ngOnInit(): void {
    this.items = [{ label: 'Donor List' }];
    this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
    
    this.fetchDonors();
  }

  fetchDonors() {
    this.loading.set(true);
    this.donorService.getDonors().subscribe({
      next: (data) => {
        this.donors.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load donors', err);
        this.loading.set(false);
      }
    });
  }

  getSeverity(status: DonorStatus): 'success' | 'warn' | 'danger' | 'info' {
    switch (status) {
      case 'Eligible': return 'success';
      case 'Deferred': return 'warn';
      case 'Ineligible': return 'danger';
      default: return 'info';
    }
  }

  // Global search handler for PrimeNG table
  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}