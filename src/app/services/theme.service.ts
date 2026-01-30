import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkMode = signal(false);

  toggle() {
    this.isDarkMode.update(d => !d);
    const html = document.documentElement;
    html.classList.toggle('dark');

    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
  }
  init() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      this.isDarkMode.set(true);
      document.documentElement.classList.add('dark');
    }
  }
}
