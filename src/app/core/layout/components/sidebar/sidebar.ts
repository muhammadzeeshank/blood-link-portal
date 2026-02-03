import { Component, input, output } from '@angular/core';
import { SidebarMenu } from '../sidebar-menu/sidebar-menu';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarMenu],
  templateUrl: './sidebar.html',
  host: {
    class: 'contents'
  }
})
export class Sidebar {
  isOpen = input.required<boolean>();
  isDesktopOpen = input.required<boolean>();
  closeMobile = output<void>();

  onMenuClick() {
    this.closeMobile.emit();
  }
}