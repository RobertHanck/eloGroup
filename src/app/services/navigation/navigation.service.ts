import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  public pageTitleSubject = new Subject<string>();

  constructor() {}
}
