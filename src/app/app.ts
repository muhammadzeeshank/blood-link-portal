import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { GlobalLoader } from './components/layout/global-loader/global-loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlobalLoader],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  public themeService = inject(ThemeService);

  ngOnInit() {
    this.themeService.init();
  }
}
