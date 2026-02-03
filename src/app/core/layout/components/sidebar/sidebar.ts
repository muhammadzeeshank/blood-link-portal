import { Component, inject, input, output } from '@angular/core';
import { SidebarMenu } from '../sidebar-menu/sidebar-menu';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarMenu],
  templateUrl: './sidebar.html',
  host: {
    class: 'contents',
  },
})
export class Sidebar {
  isOpen = input.required<boolean>();
  isDesktopOpen = input.required<boolean>();
  closeMobile = output<void>();

  authService = inject(AuthService);

  onMenuClick() {
    this.closeMobile.emit();
  }
  logout() {
    this.authService.logout();
  }
}
