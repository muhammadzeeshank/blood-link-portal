import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  toggle() {
    const html = document.documentElement;
    html.classList.toggle('dark');

    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
  }
  init() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }
}
