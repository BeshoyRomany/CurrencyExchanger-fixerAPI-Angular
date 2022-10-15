import { Component, OnInit } from '@angular/core';
import { CURRENCIES_DATA } from '../../data/currencies.data';
import { ButtonActions } from '../../enum/buttonActions.enum';
import { CurrenciesRoutes } from '../../enum/currencies-routes.enum';
import { SharedMethods } from '../../extends/shared-methods';
import { SelectedCurrencies } from '../../models/selectedCurrencies.model';

@Component({
  selector: 'currency-exchanger-header',
  templateUrl: './currency-exchanger-header.component.html',
  styleUrls: ['./currency-exchanger-header.component.scss']
})
export class CurrencyExchangerHeaderComponent extends SharedMethods implements OnInit {
  buttonActions = ButtonActions;
  detailsRoute = CurrenciesRoutes.CurrencyDetailsPage;
  eurToUsdLabel: string = '';
  eurToGbpLabel: string = '';
  currencyFrom: SelectedCurrencies = {
    selectedFrom: CURRENCIES_DATA[0],
    selectedTo: CURRENCIES_DATA[1],
    amount: 1,
    convertedCurrency: 0
  };
  currencyTo: SelectedCurrencies = {
    selectedFrom: CURRENCIES_DATA[0],
    selectedTo: CURRENCIES_DATA[2],
    amount: 1,
    convertedCurrency: 0
  }

  constructor() { 
    super();
  }

  ngOnInit(): void {
    this.getLabels();
  }
  getLabels(){
    this.eurToUsdLabel = this.concateStrings( '-', this.currencyFrom.selectedFrom.shortName, this.currencyFrom.selectedTo.shortName);
    this.eurToGbpLabel = this.concateStrings( '-', this.currencyTo.selectedFrom.shortName, this.currencyTo.selectedTo.shortName);
  }
}
