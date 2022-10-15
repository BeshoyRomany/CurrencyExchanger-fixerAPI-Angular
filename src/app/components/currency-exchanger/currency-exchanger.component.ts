import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CURRENCIES_DATA } from './data/currencies.data';
import { ConvertRequest } from './models/convert.model';
import { Currencies } from './models/currencies.model';
import { SelectedCurrencies } from './models/selectedCurrencies.model';

@Component({
  selector: 'currency-exchanger',
  templateUrl: './currency-exchanger.component.html',
  styleUrls: ['./currency-exchanger.component.scss']
})
export class CurrencyExchangerComponent implements OnInit {
  selectedCurrencies!: SelectedCurrencies;
  from: Currencies = CURRENCIES_DATA[0];
  to: Currencies = CURRENCIES_DATA[1];
  amount: number = 1;
  initialConversion: ConvertRequest = {
    amount: 1,
    from: 'EUR',
    to: 'USD',
  };
  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {

  }

  onSelectedCurrencies(selectedCurrencies: SelectedCurrencies){
    this.selectedCurrencies = selectedCurrencies;
    this.changeDetectorRef.detectChanges();
  }

}
