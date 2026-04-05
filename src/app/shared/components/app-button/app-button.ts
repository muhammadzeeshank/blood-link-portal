import { NgTemplateOutlet } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [RouterLink, NgTemplateOutlet],
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

  click = output<Event>();

  computedClasses() {
    const base =
      'px-4 py-2.5 rounded-xl font-medium transition-all text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed border';

    const primary =
      'bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-200 dark:shadow-none border-transparent';
    const secondary =
      'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 border-slate-200 dark:border-slate-700 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700/50';

    const variantClasses = this.variant() === 'primary' ? primary : secondary;
    const widthClass = this.fullWidth() ? 'w-full' : '';

    return `${base} ${variantClasses} ${widthClass}`;
  }

  onClick(event: Event) {
    if (!this.disabled() && !this.loading()) {
      this.click.emit(event);
    }
  }
}
