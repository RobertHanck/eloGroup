import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Lead } from 'src/app/models/lead';
import { LeadService } from 'src/app/services/lead/lead.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { OpportunityService } from 'src/app/services/opportunity/opportunity.service';

@Component({
  selector: 'app-lead-registration',
  templateUrl: './lead-registration.component.html',
  styleUrls: ['./lead-registration.component.css'],
})
export class LeadRegistrationComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  formGroup: FormGroup;
  lead = new Lead();
  opportunities: any[];

  constructor(
    private leadService: LeadService,
    private toastr: ToastrService,
    public formBuilder: FormBuilder,
    private navigationService: NavigationService,
    private router: Router,
    private opportunityService: OpportunityService
  ) {}

  ngOnInit() {
    this.navigationService.pageTitleSubject.next('Novo Lead');
    this.createFormGroup();
    this.getOpportunities();
  }

  createFormGroup() {
    this.formGroup = this.formBuilder.group({
      customerName: ['', [Validators.required, Validators.maxLength(120), Validators.pattern(/[a-zA-Z\u00C0-\u00FF ]+/i)]],
      customerPhone: ['', [Validators.required, Validators.maxLength(12)]],
      customerEmail: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  getOpportunities() {
    this.blockUI.start('Aguarde...');
    this.opportunityService.getOpportunities().subscribe(
      (response) => {
        this.blockUI.stop();
        this.opportunities = response.payload || [];
      },
      () => this.blockUI.stop()
    );
  }

  save() {
    if (this.formGroup.invalid) {
      return;
    }

    this.blockUI.start('Aguarde...');
    this.leadService.save(this.lead).subscribe(
      () => {
        this.blockUI.stop();
        this.router.navigate(['/leads']);
        this.toastr.success('Lead salvo com sucesso!');
      },
      (err) => {
        this.blockUI.stop();
        this.toastr.error(err.error.payload.message);
      }
    );
  }
}
