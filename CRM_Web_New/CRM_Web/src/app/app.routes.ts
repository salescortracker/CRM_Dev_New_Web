import { Routes } from '@angular/router';
import { authGuard } from './core/authentication/guards/auth-guard';
import { roleGuard } from './core/authentication/guards/role-guard';


export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./features/auth/login/login').then(m => m.Login) },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./features/auth/forgot-password/forgot-password')
        .then(m => m.ForgotPassword)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layouts/admin-layout/admin-layout').then(m => m.AdminLayout),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard-home/dashboard-home')
            .then(m => m.DashboardHome)
      },
      {
        path: 'company',
        loadComponent: () =>
          import('./features/dashboard/pages/company/company')
            .then(m => m.Company)
      },
      {
        path: 'master-data',
        loadComponent: () =>
          import('./features/super-admin/master-data/master-data')
            .then(m => m.MasterData)
      },
       
      {
         path: 'region',
         loadComponent: () =>
          import('./features/pages/region/region').then(m => m.Region)
      },
      {
        path: 'menu-access',
        canActivate: [roleGuard],
        data: { role: 'Super Admin' },
        loadComponent: () =>
          import('./features/super-admin/menu-access/menu-access')
            .then(m => m.MenuAccess)
      },
      {
        path: 'user',
        canActivate: [roleGuard],
        data: { role: 'Super Admin' },
        loadComponent: () =>
          import('./features/super-admin/users/users')
            .then(m => m.Users)
      },
      {
        path: 'roles',
        loadComponent: () => import('./features/dashboard/pages/roles/roles')
          .then(m => m.Roles)
      },
      {
        path: 'branches',
        loadComponent: () => import('./features/dashboard/pages/organizations/branches/branches')
          .then(m => m.Branches)
      },
      {
        path: 'plans',
        loadComponent: () => import('./features/super-admin/plans/plans')
          .then(m => m.Plans)
      },
      {
        path: 'organizations',
        loadComponent: () => import('./features/super-admin/organizations/organizations')
          .then(m => m.Organizations)
      },
     
      {
        path: 'subscriptions',
        loadComponent: () => import('./features/super-admin/subscriptions/subscriptions')
          .then(m => m.Subscriptions)
      },
      {
        path: 'audit-logs',
        loadComponent: () => import('./features/super-admin/audit-logs/audit-logs')
          .then(m => m.AuditLogs)
      },
       {
        path: 'login-history',
        loadComponent: () => import('./features/super-admin/login-history/login-history')
          .then(m => m.LoginHistory)
      },
        {
        path: 'api-logs',
        loadComponent: () => import('./features/super-admin/api-logs/api-logs')
          .then(m => m.ApiLogs)
      },
       {
        path: 'error-logs',
        loadComponent: () => import('./features/super-admin/error-logs/error-logs')
          .then(m => m.ErrorLogs)
      },
       {
        path: 'user-activities',
        loadComponent: () => import('./features/super-admin/user-activities/user-activities')
          .then(m => m.UserActivities)
      },
      {
        path: 'login-sessions',
        loadComponent: () => import('./features/super-admin/login-sessions/login-sessions')
          .then(m => m.LoginSessions)
      },
      {
        path: 'backup-recovery',
        loadComponent: () => import('./features/super-admin/backup-recovery/backup-recovery')
          .then(m => m.BackupRecovery)
      },
      {
        path: 'notifications',
        loadComponent: () => import('./features/super-admin/notifications/notifications')
          .then(m => m.Notifications)
      },
       {
        path: 'email-configuration',
        loadComponent: () => import('./features/super-admin/email-configuration/email-configuration')
          .then(m => m.EmailConfiguration)
      },
      
       {
        path: 'workflow-rules',
        loadComponent: () => import('./features/super-admin/workflow-rules/workflow-rules')
          .then(m => m.WorkflowRules)
      },
       {
        path: 'approval-workflow',
        loadComponent: () => import('./features/super-admin/approval-workflow/approval-workflow')
          .then(m => m.ApprovalWorkflow)
      },
      {
        path: 'auto-assignment',
        loadComponent: () => import('./features/super-admin/auto-assignment/auto-assignment')
          .then(m => m.AutoAssignment)
      },
      {
        path: 'escalation-rules',
        loadComponent: () => import('./features/super-admin/escalation-rules/escalation-rules')
          .then(m => m.EscalationRules)
      },
      {
        path: 'sla-rules',
        loadComponent: () => import('./features/super-admin/sla-rules/sla-rules')
          .then(m => m.SlaRules)
      },
       {
        path: 'email-automation',
        loadComponent: () => import('./features/super-admin/email-automation/email-automation')
          .then(m => m.EmailAutomation)
      },
       {
        path: 'scheduled-jobs',
        loadComponent: () => import('./features/super-admin/scheduled-jobs/scheduled-jobs')
          .then(m => m.ScheduledJobs)
      },
      {
        path: 'password-policy',
        loadComponent: () => import('./features/super-admin/password-policy/password-policy')
          .then(m => m.PasswordPolicy)
      },
      {
        path: 'mfa',
        loadComponent: () => import('./features/super-admin/mfa/mfa')
          .then(m => m.Mfa)
      },
       {
        path: 'ip-restrictions',
        loadComponent: () => import('./features/super-admin/ip-restrictions/ip-restrictions')
          .then(m => m.IpRestrictions)
      },
       {
        path: 'device-management',
        loadComponent: () => import('./features/super-admin/device-management/device-management')
          .then(m => m.DeviceManagement)
      },
       {
        path: 'security-logs',
        loadComponent: () => import('./features/super-admin/security-logs/security-logs')
          .then(m => m.SecurityLogs)
      },
       {
        path: 'email-notification',
        loadComponent: () => import('./features/super-admin/email-notification/email-notification')
          .then(m => m.EmailNotification)
      },
       {
        path: 'sms-notification',
        loadComponent: () => import('./features/super-admin/sms-notification/sms-notification')
          .then(m => m.SmsNotification)
      },
      
       {
        path: 'whatsapp-notification',
        loadComponent: () => import('./features/super-admin/whatsapp-notification/whatsapp-notification')
          .then(m => m.WhatsappNotification)
      },
       {
        path: 'push-notification',
        loadComponent: () => import('./features/super-admin/push-notifications/push-notifications')
          .then(m => m.PushNotifications)
      },
       {
        path: 'notification-rules',
        loadComponent: () => import('./features/super-admin/notification-rules/notification-rules')
          .then(m => m.NotificationRules)
      },
        {
        path: 'platform-reports',
        loadComponent: () => import('./features/super-admin/platform-reports/platform-reports')
          .then(m => m.PlatformReports)
      },
      {
        path: 'company-reports',
        loadComponent: () => import('./features/super-admin/company-reports/company-reports')
          .then(m => m.CompanyReports)
      },
       {
        path: 'revenue-reports',
        loadComponent: () => import('./features/super-admin/revenue-reports/revenue-reports')
          .then(m => m.RevenueReports)
      },
      {
        path: 'subscription-reports',
        loadComponent: () => import('./features/super-admin/subscription-reports/subscription-reports')
          .then(m => m.SubscriptionReports)
      },
       {
        path: 'user-reports',
        loadComponent: () => import('./features/super-admin/user-reports/user-reports')
          .then(m => m.UserReports)
      },
       {
        path: 'audit-reports',
        loadComponent: () => import('./features/super-admin/audit-reports/audit-reports')
          .then(m => m.AuditReports)
      },
       {
        path: 'custom-reports',
        loadComponent: () => import('./features/super-admin/custom-reports/custom-reports')
          .then(m => m.CustomReports)
      },
      {
        path: 'general-settings',
        loadComponent: () => import('./features/super-admin/general-settings/general-settings')
          .then(m => m.GeneralSettings)
      },
       {
        path: 'brands',
        loadComponent: () => import('./features/super-admin/brands/brands')
          .then(m => m.Brands)
      },
       {
        path: 'localization',
        loadComponent: () => import('./features/super-admin/localization/localization')
          .then(m => m.Localization)
      },
       {
        path: 'time-zones',
        loadComponent: () => import('./features/super-admin/time-zones/time-zones')
          .then(m => m.TimeZones)
      },
       {
        path: 'currency',
        loadComponent: () => import('./features/super-admin/currency/currency')
          .then(m => m.Currency)
      },
      {
        path: 'fiscal-year',
        loadComponent: () => import('./features/super-admin/fiscal-year/fiscal-year')
          .then(m => m.FiscalYear)
      },
      {
        path: 'number-formats',
        loadComponent: () => import('./features/super-admin/number-formats/number-formats')
          .then(m => m.NumberFormats)
      },
       {
        path: 'file-storage',
        loadComponent: () => import('./features/super-admin/file-storage/file-storage')
          .then(m => m.FileStorage)
      },
       {
        path: 'license',
        loadComponent: () => import('./features/super-admin/license/license')
          .then(m => m.License)
      },
        {
        path: 'fileupload-document',
        loadComponent: () => import('./features/super-admin/fileupload-document/fileupload-document')
          .then(m => m.FileuploadDocument)
      },
      
      { path: '**', redirectTo: 'dashboard' }
    ]
  },
  { path: '**', redirectTo: 'login' }

];
