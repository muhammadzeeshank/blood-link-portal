import { NgTemplateOutlet } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-button',
  imports: [RouterLink, NgTemplateOutlet, Button],
  templateUrl: './app-button.html',
  styleUrl: './app-button.css',
})
export class AppButton {
  variant = input<'primary' | 'secondary'>('primary');
  type = input<'button' | 'submit'>('button');
  routerLink = input<string | any[] | null>(null);
  icon = input<string | null>(null);
  disabled = input(false);
  loading = input(false);
  fullWidth = input(false);
  size = input<'small' | 'large'>('large');

  click = output<Event>();

  computedClasses() {
    // Base: Switched border-slate-200 to border-surface-200 for theme consistency
    const base =
      'px-4 py-2.5 rounded-xl font-medium transition-all text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed border';

    // Primary: Uses 'primary' and 'primary-emphasis' (the hover shade defined in the theme)
    const primary =
      'bg-primary hover:bg-primary-emphasis text-primary-contrast shadow-lg shadow-primary-500/20 dark:shadow-none border-transparent';

    // Secondary: Uses 'surface' tokens which automatically flip between Zinc (Light) and Slate (Dark)
    const secondary =
      'bg-surface-0 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-400 border-surface-200 dark:border-surface-700 shadow-sm hover:bg-surface-50 dark:hover:bg-surface-700/50';

    const variantClasses = this.variant() === 'primary' ? primary : secondary;
    const widthClass = this.fullWidth() ? 'w-full' : '';

    const sizeMap = {
      small: 'p-button-sm',
      large: 'p-button-lg',
    };

    return `${base} ${variantClasses} ${widthClass} ${sizeMap[this.size()]}`;
  }

  onClick(event: Event) {
    if (!this.disabled() && !this.loading()) {
      this.click.emit(event);
    }
  }
}
