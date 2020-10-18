import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css'],
})
export class TopnavComponent implements OnInit {
  title: string;

  constructor(public router: Router, private navigationService: NavigationService) {}

  ngOnInit(): void {
    // this.navigationService.pageTitleSubject.next('Painel de Leads');
    this.navigationService.pageTitleSubject.subscribe((value) => this.title = value);
  }

  onLoggedout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
