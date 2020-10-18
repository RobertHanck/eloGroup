import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Lead } from 'src/app/models/lead';
import { LeadService } from 'src/app/services/lead/lead.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-lead-registration',
  templateUrl: './lead-registration.component.html',
  styleUrls: ['./lead-registration.component.css'],
})
export class LeadRegistrationComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  formGroup: FormGroup;
  lead = new Lead();

  constructor(
    private leadService: LeadService,
    private toastr: ToastrService,
    public formBuilder: FormBuilder,
    private navigationService: NavigationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.navigationService.pageTitleSubject.next('Novo Lead');
    this.createFormGroup();
  }

  createFormGroup() {
    this.formGroup = this.formBuilder.group({
      customerName: ['', [Validators.required, Validators.maxLength(120), Validators.pattern(/[a-zA-Z\u00C0-\u00FF ]+/i)]],
      customerPhone: ['', [Validators.required, Validators.maxLength(12)]],
      customerEmail: ['', [Validators.required, Validators.maxLength(255)]],
      customerOpportunities: ['', [Validators.required]]
    });
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

  checkAllOpportunities = { id: 0, description: '', isSelected: false }

  checkOpportunities = [
    { id: 0, description: 'RPA', isSelected: false },
    { id: 1, description: 'Produto Digital', isSelected: false },
    { id: 2, description: 'Analytics', isSelected: false },
    { id: 3, description: 'BPM', isSelected: false }
  ];

  checkAll(check) {
    this.checkAllOpportunities.isSelected = check;
    if(this.checkAllOpportunities.isSelected) {
      this.checkOpportunities.map(item => {
        item.isSelected = true;
      })
    } else {
      this.checkOpportunities.map(item => {
        item.isSelected = false;
      })
    }
  }

  checkCheck(item, check) {
    this.checkOpportunities[item.id].isSelected = check;
    if(this.checkOpportunities[item.id].isSelected) {
      this.checkOpportunities[item.id].isSelected = true;
    } else {
      this.checkOpportunities[item.id].isSelected = false;
    }
  }

}
