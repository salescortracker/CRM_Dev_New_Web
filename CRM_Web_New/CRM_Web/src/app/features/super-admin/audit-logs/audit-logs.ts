import { ChangeDetectorRef, Component } from '@angular/core';
import { ControlsystemService } from '../services/controlsystem-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface AuditLogEntry {
  id: string;
  module: string;
  action: string;
  severity: AuditSeverity;
  user: string;
  detail: string;
  relatedRoute?: string;
  createdAt: string;
}
export type AuditSeverity = 'Info' | 'Warning' | 'Critical';

@Component({
  selector: 'app-audit-logs',
  imports: [CommonModule,FormsModule],
  templateUrl: './audit-logs.html',
  styleUrl: './audit-logs.css',
})
export class AuditLogs {
  activityMessage = '';
  logs: AuditLogEntry[] = [];
  searchTerm = '';
  selectedModule = '';
  selectedSeverity: AuditSeverity | '' = '';

  constructor(private audit: ControlsystemService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.refreshLogs(false);
  }

  get moduleOptions(): string[] {
    return Array.from(new Set(this.logs.map((log) => log.module))).sort();
  }

  get filteredLogs(): AuditLogEntry[] {
    const query = this.searchTerm.trim().toLowerCase();
    return this.logs.filter((log) => {
      const matchesModule = !this.selectedModule || log.module === this.selectedModule;
      const matchesSeverity = !this.selectedSeverity || log.severity === this.selectedSeverity;
      const matchesQuery = !query ||
        log.action.toLowerCase().includes(query) ||
        log.detail.toLowerCase().includes(query) ||
        log.user.toLowerCase().includes(query) ||
        log.module.toLowerCase().includes(query);
      return matchesModule && matchesSeverity && matchesQuery;
    });
  }

  get totalEvents(): number {
    return this.logs.length;
  }

  get criticalEvents(): number {
    return this.logs.filter((log) => log.severity === 'Critical').length;
  }

  get securityEvents(): number {
    return this.logs.filter((log) => ['Security', 'Login Sessions'].includes(log.module)).length;
  }

  get approvalEvents(): number {
    return this.logs.filter((log) => log.module === 'Approvals').length;
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedModule = '';
    this.selectedSeverity = '';
  }

  refreshLogs(showMessage = true): void {
    this.audit.getAuditLogs().subscribe({
      next: (res: any) => {

        if (res.success) {

          this.logs = res.data.map((x: any) => ({

            id: x.auditId,

            module: x.tableName,

            action: x.actionType,

            user: x.createdBy?.toString() || '-',

            severity: this.getSeverity(x.actionType),

            detail: this.getDetails(x),

            createdAt: x.createdDate,

            relatedRoute: ''

          }));
          this.cdr.detectChanges();

          if (showMessage) {
            this.showActivity('Audit logs refreshed.');
          }

        }

      },

      error: (err) => {
        console.error(err);
      }
    });
  }

runMonitorCheck(): void {

  this.refreshLogs(false);

  this.showActivity('Monitor check completed.');

}

  openRelated(log: AuditLogEntry): void {
    // this.audit.open(log);
  }

  getSeverityClass(severity: AuditSeverity): string {
    return severity.toLowerCase();
  }

  trackByLog(_: number, log: AuditLogEntry): string {
    return log.id;
  }

  private showActivity(message: string): void {
    this.activityMessage = message;
    setTimeout(() => this.activityMessage = '', 3500);
  }
  getSeverity(action: string): 'Info' | 'Warning' | 'Critical' {

    switch (action?.toUpperCase()) {

      case 'DELETE':
        return 'Critical';

      case 'UPDATE':
        return 'Warning';

      default:
        return 'Info';
    }

  }
  getDetails(log: any): string {

    return `${log.actionType} performed on ${log.tableName} (Record Id : ${log.recordId})`;

  }
}
