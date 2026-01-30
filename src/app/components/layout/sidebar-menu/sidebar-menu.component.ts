import { Component, inject, output, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

export interface NavItem {
  label: string;
  icon: string;
  route?: string;
  queryParams?: Record<string, any>;
  children?: NavItem[];
}

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-menu.component.html',
  host: {
    class: 'contents'
  }
})
export class SidebarMenuComponent {
  private router = inject(Router);
  
  linkClicked = output<void>();

  expandedMenus = signal<string[]>(['Donation Management']);

  navItems: NavItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: 'fa-solid fa-chart-pie' },
    {
      label: 'Donation Management',
      icon: 'fa-solid fa-hand-holding-heart',
      children: [
        { label: 'Donor List', route: '/donors', icon: 'fa-solid fa-users' },
        { label: 'Appointments', route: '/donors', queryParams: { tab: 'appointments' }, icon: 'fa-solid fa-calendar-check' },
        { label: 'Eligibility Check', route: '/donors', queryParams: { tab: 'eligibility' }, icon: 'fa-solid fa-stethoscope' }
      ]
    },
    { label: 'Campaign Assistant', route: '/assistant', icon: 'fa-solid fa-wand-magic-sparkles' },
    {
      label: 'Analytics',
      icon: 'fa-solid fa-chart-simple',
      children: [
        { label: 'Stock Reports', route: '/dashboard', queryParams: { tab: 'stock' }, icon: 'fa-solid fa-boxes-stacked' },
        { label: 'Performance', route: '/dashboard', queryParams: { tab: 'performance' }, icon: 'fa-solid fa-arrow-trend-up' }
      ]
    },
    { label: 'Settings', route: '/dashboard', queryParams: { tab: 'settings' }, icon: 'fa-solid fa-gear' },
  ];

  toggleMenu(label: string) {
    this.expandedMenus.update(current => {
      if (current.includes(label)) {
        return current.filter(l => l !== label);
      } else {
        return [...current, label];
      }
    });
  }

  isExpanded(label: string) {
    return this.expandedMenus().includes(label);
  }

  hasActiveChild(item: NavItem): boolean {
    if (!item.children) return false;
    return item.children.some(child => {
      if (!child.route) return false;
      const urlTree = this.router.createUrlTree([child.route], { queryParams: child.queryParams });
      return this.router.isActive(urlTree, {
        paths: 'exact',
        queryParams: 'exact',
        fragment: 'ignored',
        matrixParams: 'ignored'
      });
    });
  }

  onLinkClick() {
    this.linkClicked.emit();
  }
}