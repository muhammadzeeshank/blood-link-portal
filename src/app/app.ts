import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ThemeService } from './services/theme.service';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('bloodlink-portal');
  public themeService = inject(ThemeService);
  isSidebarOpen = signal(false);
  isDesktopSidebarOpen = signal(true);

  ngOnInit() {
    this.themeService.init();
  }
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
