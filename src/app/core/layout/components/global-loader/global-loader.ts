import { Component, inject } from '@angular/core';
import { LoaderService } from '../../../../core/layout/services/loader.service';

@Component({
  selector: 'app-global-loader',
  standalone: true,
  template: `
    @if (loaderService.isLoading()) {
      <div class="fixed inset-0 z-100 flex items-center justify-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm transition-all duration-300">
        <div class="flex flex-col items-center gap-4 p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 animate-in fade-in zoom-in duration-200">
           <!-- Modern Spinner -->
           <div class="relative w-12 h-12">
             <div class="absolute inset-0 rounded-full border-4 border-slate-100 dark:border-slate-700"></div>
             <div class="absolute inset-0 rounded-full border-4 border-rose-600 border-t-transparent animate-spin"></div>
             
             <!-- Inner Dot -->
             <div class="absolute inset-[18px] bg-rose-600 rounded-full animate-pulse"></div>
           </div>
           
           <div class="flex flex-col items-center gap-1">
             <p class="text-sm font-bold text-slate-800 dark:text-white">Please wait</p>
             <p class="text-xs font-medium text-slate-500 dark:text-slate-400">Processing request...</p>
           </div>
        </div>
      </div>
    }
  `
})
export class GlobalLoader {
  loaderService = inject(LoaderService);
}