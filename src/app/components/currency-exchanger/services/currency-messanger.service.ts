import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SelectedCurrencies } from '../models/selectedCurrencies.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyMessangerService {
  private selectedCurrencies = new Subject<SelectedCurrencies>();
  constructor() { }

  //Setter
  sendSelectedCurrencies(selectedCurrencies: SelectedCurrencies) {
    this.selectedCurrencies.next(selectedCurrencies);
  }

  //Getter
  getSelectedCurrencies(): Observable<SelectedCurrencies> {
    return this.selectedCurrencies.asObservable();
  }

}
