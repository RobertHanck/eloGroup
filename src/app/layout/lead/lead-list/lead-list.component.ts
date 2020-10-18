import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Component, OnInit } from '@angular/core';
import { LeadService } from 'src/app/services/lead/lead.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { Board } from 'src/app/models/board';
import { Column } from 'src/app/models/column';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Lead } from 'src/app/models/lead';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lead-list',
  templateUrl: './lead-list.component.html',
  styleUrls: ['./lead-list.component.css'],
})
export class LeadListComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  board = new Board('', []);
  statusClienteEmPotencial = 1;
  statusDadosConfirmados = 2;
  statusReuniaoAgendada = 3;

  constructor(
    private navigationService: NavigationService,
    private leadService: LeadService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.navigationService.pageTitleSubject.next('Painel de Leads');
    this.getAllLeads();
  }

  getAllLeads() {
    this.blockUI.start('Aguarde...');
    this.leadService.getLeads().subscribe(
      (response) => {
        this.blockUI.stop();
        this.createBoard(response.payload);
      },
      () => this.blockUI.stop()
    );
  }

  createBoard(items: any[]) {
    this.board = new Board('Leads', [
      this.getNewColumn(
        'Cliente em Potencial',
        this.statusClienteEmPotencial,
        items.filter((l) => l.statusId === this.statusClienteEmPotencial)
      ),
      this.getNewColumn(
        'Dados Confirmados',
        this.statusDadosConfirmados,
        items.filter((l) => l.statusId === this.statusDadosConfirmados)
      ),
      this.getNewColumn(
        'Reunião Agendada',
        this.statusReuniaoAgendada,
        items.filter((l) => l.statusId === this.statusReuniaoAgendada)
      ),
    ]);
  }

  getNewColumn(name: string, id: number, items: any[]) {
    return new Column(name, id, items);
  }

  dropGrid(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.board.columns, event.previousIndex, event.currentIndex);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const item = event.previousContainer.data[event.previousIndex];
      if (String(item['statusId'] + 1) === event.container.id) {
        item['statusId'] = parseInt(event.container.id);
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        this.updateleadStatus(Object.assign(new Lead(), item));
      }
    }
  }

  updateleadStatus(lead: Lead) {
    this.blockUI.start('Aguarde...');
    this.leadService.updateStatus(lead).subscribe(
      () => {
        this.blockUI.stop();
      },
      (err) => {
        this.blockUI.stop();
        this.toastr.error(err.error.payload.message);
      }
    );
  }
}
