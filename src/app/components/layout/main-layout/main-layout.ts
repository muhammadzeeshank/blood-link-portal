import { Component, inject, signal } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  protected readonly title = signal('bloodlink-portal');
  public themeService = inject(ThemeService);
  isSidebarOpen = signal(false);
  isDesktopSidebarOpen = signal(true);

  toggleSidebar() {
    this.isSidebarOpen.update((v) => !v);
  }

  toggleDesktopSidebar() {
    this.isDesktopSidebarOpen.update((v) => !v);
  }
  closeSidebarOnMobile() {
    if (window.innerWidth < 1024) {
      this.isSidebarOpen.set(false);
    }
  }
}
