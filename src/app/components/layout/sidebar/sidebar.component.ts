import { Component, input, output } from '@angular/core';
import { SidebarMenuComponent } from '../sidebar-menu/sidebar-menu.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarMenuComponent],
  templateUrl: './sidebar.component.html',
  host: {
    class: 'contents'
  }
})
export class SidebarComponent {
  isOpen = input.required<boolean>();
  isDesktopOpen = input.required<boolean>();
  closeMobile = output<void>();

  onMenuClick() {
    this.closeMobile.emit();
  }
}