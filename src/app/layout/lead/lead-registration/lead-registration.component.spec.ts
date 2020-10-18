import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadRegistrationComponent } from './lead-registration.component';

describe('LeadRegistrationComponent', () => {
  let component: LeadRegistrationComponent;
  let fixture: ComponentFixture<LeadRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
