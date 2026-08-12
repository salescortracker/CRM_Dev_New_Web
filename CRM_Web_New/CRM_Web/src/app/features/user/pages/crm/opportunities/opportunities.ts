import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pagination } from '../../../../../shared/pagination/pagination';
import { Alertservice } from '../../../../../core/services/alertservice';
import { Spinnerservice } from '../../../../../core/services/spinnerservice';

@Component({
  selector: 'app-opportunities',
  standalone: true,
  imports: [CommonModule,FormsModule,Pagination],
  templateUrl: './opportunities.html',
  styleUrl: './opportunities.css',
})
export class Opportunities {
   submitted = false;
  isEdit = false;

  page = 1;
  pageSize = 5;
  totalRecords = 0;
  searchText = '';

  opportunities: any[] = [];

  opportunity: any = {

    opportunityId: 0,
    opportunityName: '',
    opportunityNumber: '',
    account: '',
    contact: '',
    owner: '',
    stage: '',
    expectedRevenue: '',
    probability: '',
    closeDate: '',
    leadSource: '',
    priority: '',
    followUpDate: '',
    description: '',
    status: '',
    isActive: true

  };

  constructor(
    private alert: Alertservice,
    private spinner: Spinnerservice,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.loadOpportunities();

  }

  loadOpportunities() {

    this.spinner.show();

    setTimeout(() => {

      this.opportunities = [

        {
          opportunityId: 1,
          opportunityName: 'CRM Implementation',
          opportunityNumber: 'OPP1001',
          account: 'ABC Technologies',
          contact: 'Rahul Sharma',
          owner: 'Karishma',
          stage: 'Proposal',
          expectedRevenue: 250000,
          probability: 75,
          closeDate: '2026-08-10',
          leadSource: 'Website',
          priority: 'High',
          followUpDate: '2026-08-02',
          description: 'CRM implementation for enterprise customer.',
          status: 'Open',
          isActive: true
        },

        {
          opportunityId: 2,
          opportunityName: 'HRMS Upgrade',
          opportunityNumber: 'OPP1002',
          account: 'XYZ Solutions',
          contact: 'Priya Reddy',
          owner: 'Rahul',
          stage: 'Negotiation',
          expectedRevenue: 180000,
          probability: 90,
          closeDate: '2026-08-15',
          leadSource: 'Referral',
          priority: 'High',
          followUpDate: '2026-08-05',
          description: 'Upgrade HRMS with payroll module.',
          status: 'Open',
          isActive: true
        },

        {
          opportunityId: 3,
          opportunityName: 'ERP Integration',
          opportunityNumber: 'OPP1003',
          account: 'Future Vision',
          contact: 'Arjun Kumar',
          owner: 'Sneha',
          stage: 'Qualification',
          expectedRevenue: 320000,
          probability: 55,
          closeDate: '2026-08-25',
          leadSource: 'LinkedIn',
          priority: 'Medium',
          followUpDate: '2026-08-07',
          description: 'ERP integration with CRM.',
          status: 'Open',
          isActive: true
        },

        {
          opportunityId: 4,
          opportunityName: 'Digital Marketing Package',
          opportunityNumber: 'OPP1004',
          account: 'Global InfoTech',
          contact: 'Sneha Patel',
          owner: 'Arun',
          stage: 'Closed Won',
          expectedRevenue: 150000,
          probability: 100,
          closeDate: '2026-07-28',
          leadSource: 'Google',
          priority: 'Low',
          followUpDate: '2026-07-25',
          description: 'SEO + Social Media package.',
          status: 'Won',
          isActive: true
        },

        {
          opportunityId: 5,
          opportunityName: 'Cloud Migration',
          opportunityNumber: 'OPP1005',
          account: 'NextGen Pvt Ltd',
          contact: 'Kiran Verma',
          owner: 'Durga',
          stage: 'Prospecting',
          expectedRevenue: 450000,
          probability: 35,
          closeDate: '2026-09-05',
          leadSource: 'Facebook',
          priority: 'High',
          followUpDate: '2026-08-03',
          description: 'Migration from on-premise to Azure cloud.',
          status: 'Open',
          isActive: true
        }

      ];

      this.opportunities.sort(
        (a, b) => b.opportunityId - a.opportunityId
      );

      this.totalRecords = this.opportunities.length;

      this.spinner.hide();

      this.cd.detectChanges();

    }, 500);

  }

  saveOpportunity() {

    this.submitted = true;

    if (
      !this.opportunity.opportunityName ||
      !this.opportunity.opportunityNumber ||
      !this.opportunity.account ||
      !this.opportunity.contact ||
      !this.opportunity.stage ||
      !this.opportunity.status
    ) {
      return;
    }

    this.spinner.show();

    setTimeout(() => {

      if (!this.isEdit) {

        const newOpportunity = {

          ...this.opportunity,

          opportunityId: this.opportunities.length
            ? Math.max(...this.opportunities.map(x => x.opportunityId)) + 1
            : 1

        };

        this.opportunities.unshift(newOpportunity);

      } else {

        const index = this.opportunities.findIndex(
          x => x.opportunityId === this.opportunity.opportunityId
        );

        if (index !== -1) {

          this.opportunities[index] = {

            ...this.opportunity

          };

        }

      }

      this.opportunities = [...this.opportunities];

      this.totalRecords = this.opportunities.length;

      this.page = 1;

      this.clear();

      this.spinner.hide();

      this.cd.detectChanges();

      this.alert.success(
        this.isEdit
          ? 'Opportunity updated successfully.'
          : 'Opportunity created successfully.'
      );

    }, 500);

  }
    edit(id: number) {

    this.spinner.show();

    setTimeout(() => {

      const selected = this.opportunities.find(
        x => x.opportunityId === id
      );

      if (selected) {

        this.opportunity = {
          ...selected
        };

        this.isEdit = true;

        this.submitted = false;

        this.cd.detectChanges();

      }

      this.spinner.hide();

    }, 300);

  }

  delete(id: number) {

    this.alert.deleteConfirm().then(result => {

      if (result.isConfirmed) {

        this.spinner.show();

        setTimeout(() => {

          this.opportunities = this.opportunities.filter(
            x => x.opportunityId !== id
          );

          this.totalRecords = this.opportunities.length;

          if (
            this.page > 1 &&
            this.pagedOpportunities.length === 0
          ) {

            this.page--;

          }

          this.opportunities = [...this.opportunities];

          this.spinner.hide();

          this.cd.detectChanges();

          this.alert.success(
            'Opportunity deleted successfully.'
          );

        }, 500);

      }

    });

  }

  clear() {

    this.opportunity = {

      opportunityId: 0,
      opportunityName: '',
      opportunityNumber: '',
      account: '',
      contact: '',
      owner: '',
      stage: '',
      expectedRevenue: '',
      probability: '',
      closeDate: '',
      leadSource: '',
      priority: '',
      followUpDate: '',
      description: '',
      status: '',
      isActive: true

    };

    this.isEdit = false;

    this.submitted = false;

    this.cd.detectChanges();

  }

  get filteredOpportunities() {

    return this.opportunities.filter(x =>

      x.opportunityName
        .toLowerCase()
        .includes(this.searchText.toLowerCase())

      ||

      x.opportunityNumber
        .toLowerCase()
        .includes(this.searchText.toLowerCase())

      ||

      x.account
        .toLowerCase()
        .includes(this.searchText.toLowerCase())

      ||

      x.contact
        .toLowerCase()
        .includes(this.searchText.toLowerCase())

      ||

      x.owner
        .toLowerCase()
        .includes(this.searchText.toLowerCase())

      ||

      x.stage
        .toLowerCase()
        .includes(this.searchText.toLowerCase())

      ||

      x.status
        .toLowerCase()
        .includes(this.searchText.toLowerCase())

    );

  }

  get pagedOpportunities() {

    const start = (this.page - 1) * this.pageSize;

    return this.filteredOpportunities.slice(
      start,
      start + this.pageSize
    );

  }

  changePage(page: number) {

    this.page = page;

  }

  changePageSize(size: number) {

    this.pageSize = size;

    this.page = 1;

  }


}
