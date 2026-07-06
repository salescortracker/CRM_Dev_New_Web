import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../../../core/authentication/services/auth.service';
import { LoginResponse } from '../../../../core/authentication/models/login-response.model';

interface StatCard {
  title: string;
  value: string;
  note: string;
  icon: string;
  tone: 'success' | 'muted' | 'danger';
}

@Component({
  selector: 'app-dashboard-home',
  imports: [CommonModule],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.css',
})
export class DashboardHome {
  private currentUser: LoginResponse | null = null;

  stats: StatCard[] = [
    { title: 'Pipeline Value', value: '$500K', note: '12% this month', icon: 'fa-chart-line', tone: 'success' },
    { title: 'Expected Revenue', value: '$350K', note: '8% increase', icon: 'fa-dollar-sign', tone: 'success' },
    { title: 'Deals This Month', value: '12', note: '45% win rate', icon: 'fa-handshake', tone: 'muted' },
    { title: 'Hot Leads (80+)', value: '45', note: 'Needs immediate action', icon: 'fa-star', tone: 'danger' }
  ];

  pipelineBars = [50, 42, 72, 36, 88];
  leadSources = [
    { label: 'Website', color: '#c8103e' },
    { label: 'Referral', color: '#334155' },
    { label: 'Outbound', color: '#94a3b8' },
    { label: 'Events', color: '#cbd5e1' },
    { label: 'LinkedIn', color: '#f59e0b' }
  ];

  constructor(private authService: AuthService) {
    this.currentUser = this.authService.getCurrentUser();
  }

  get displayName(): string {
    return this.currentUser?.userName || 'John';
  }

  get todayLabel(): string {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date());
  }
}
