import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Component, OnInit } from '@angular/core';
import { LeadService } from 'src/app/services/lead/lead.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-lead-list',
  templateUrl: './lead-list.component.html',
  styleUrls: ['./lead-list.component.css'],
})
export class LeadListComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  leads: any[];

  constructor(private navigationService: NavigationService, private leadService: LeadService) {}

  ngOnInit() {
    this.navigationService.pageTitleSubject.next('Painel de Leads');
    this.getAllLeads();
  }

  getAllLeads() {
    this.blockUI.start('Aguarde...');
    this.leadService.getLeads().subscribe(
      (response) => {
        this.blockUI.stop();
      },
      () => this.blockUI.stop()
    );
  }
}
