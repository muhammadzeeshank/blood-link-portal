import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { AppButton } from '../../shared/components/app-button/app-button';
@Component({
  selector: 'app-donors',
  imports: [BreadcrumbModule, AppButton],
  templateUrl: './donors.html',
  styleUrl: './donors.css',
})
export class Donors implements OnInit {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  ngOnInit(): void {
    this.items = [{ label: 'Donor List' }];
    this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
  }
}
